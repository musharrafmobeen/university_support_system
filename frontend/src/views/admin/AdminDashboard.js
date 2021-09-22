import React, { useEffect, useState } from 'react';

import ActiveCard from './dashBoardCards/ActiveCard';
import LeadsIcon from '../../resources/design-images/ActiveLeadsIcon.svg';
import DebtorsIcon from '../../resources/design-images/ActiveDebtorsIcon.svg';
import GroupsIcon from '../../resources/design-images/ActiveGroupsIcon.svg';
import StudentsIcon from '../../resources/design-images/ActiveStudentsIcon.svg';
import styles from '../../styles/adminStyles/AdminDashboardStyles';
import { Backdrop, CircularProgress, Paper, useTheme, withStyles } from '@material-ui/core';
import CalendarCard from './dashBoardCards/CalendarCard';
import mBusinessDay from 'moment-business-days';
import DonutChartCard from './dashBoardCards/DonutChartCard';
import { useDispatch, useSelector } from 'react-redux';
import { drawerSelectionChanged } from '../../store/ui/drawer';
import { withRouter } from 'react-router-dom';
import { loadStudents } from '../../store/users/students';
import { loadGrievances } from '../../store/grievances/grievances';
import { loadStaffs } from '../../store/users/staffs';
import moment from 'moment-business-days';

function AdminDashboard(props) {
    const { classes } = props;

    const dispatch = useDispatch();
    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const grievances = useSelector(state => state.entities.grievances.list);
    const grievancesErr = useSelector(state => state.entities.grievances.isError);
    const grievancesErrMsg = useSelector(state => state.entities.grievances.errorMessage);
    const grievanceLoading = useSelector(state => state.entities.grievances.loading);
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);

    const isLoading = studentsLodaing || grievanceLoading || staffLoading

    useEffect(() => {
        dispatch(drawerSelectionChanged("Dashboard"));
        if (students.length === 0) dispatch(loadStudents());
        if (grievances.length === 0) dispatch(loadGrievances());
        if (staff.length === 0) dispatch(loadStaffs());
    }, []);

    const getPendingStudents = () => {
        const pendingStudents = students.filter(std => !std.isApproved && !std.isRejected);
        return pendingStudents.length;
    };

    const grievancesReadMore = () => {
        props.history.push(`/admin/grievances`)
    };
    const staffReadMore = () => {
        props.history.push(`/admin/staff`)
    };
    const studentReadMore = () => {
        props.history.push(`/admin/pending-requests/students-requests`)
    };

    const isDelayed = (grievance) => {
        return mBusinessDay(moment(grievance.lastUpdated)).businessDiff(moment()) > 3 && !grievance.isClosed && !grievance.isPaused;
    }

    const getLodgedGrievanceCount = () => {
        return grievances.length;
    };
    const getSolvedGrievanceCount = () => {
        const solvedGrievances = grievances.filter(grievance => grievance.isClosed);
        return solvedGrievances.length;
    };
    const getPendingGrievanceCount = () => {
        const pendingGrievances = grievances.filter(grievance => !grievance.isClosed && !grievance.isPaused);
        return pendingGrievances.length;
    };
    const getPausedGrievanceCount = () => {
        const pausedGrievances = grievances.filter(grievance => grievance.isPaused);
        return pausedGrievances.length;
    };

    const getDelayedGrievanceCount = () => {
        const delayedGrievances = grievances.filter(grievance => isDelayed(grievance) === true);
        return delayedGrievances.length;
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <Paper
                className={classes.activeCardsContainer}
                elevation={0}
            >
                <div className={classes.activeCard}>
                    <ActiveCard
                        title="Staff"
                        value={staff.length}
                        icon={LeadsIcon}
                        onButtonClick={staffReadMore}
                    />
                </div>
                <div className={classes.activeCard}>
                    <ActiveCard
                        title="Grievances"
                        value={grievances.length}
                        icon={GroupsIcon}
                        onButtonClick={grievancesReadMore}
                    />
                </div>
                <div className={classes.activeCard}>
                    <ActiveCard
                        title="Pending Students Requests"
                        value={getPendingStudents()}
                        icon={StudentsIcon}
                        onButtonClick={studentReadMore}
                    />
                </div>
                <div className={classes.activeCard}>
                    <ActiveCard
                        title="Delayed Grievances"
                        value={getDelayedGrievanceCount()}
                        icon={DebtorsIcon}
                        // onButtonClick={debtorsReadMore}
                        isButtonDisabled
                    />
                </div>
            </Paper>
            <div>
                <DonutChartCard
                    totalGrivances={getLodgedGrievanceCount()}
                    pendingGrievances={getPendingGrievanceCount()}
                    pausedGrievances={getPausedGrievanceCount()}
                    solvedGrievances={getSolvedGrievanceCount()}
                    delayeddGrievances={getDelayedGrievanceCount()}
                />
            </div>
        </div>
    );
}

export default withRouter(withStyles(styles)(AdminDashboard));