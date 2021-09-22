import React, { useEffect, useState } from 'react';

import ActiveCard from './dashBoardCards/ActiveCard';
import LeadsIcon from '../../resources/design-images/ActiveLeadsIcon.svg';
import DebtorsIcon from '../../resources/design-images/ActiveDebtorsIcon.svg';
import GroupsIcon from '../../resources/design-images/ActiveGroupsIcon.svg';
import StudentsIcon from '../../resources/design-images/ActiveStudentsIcon.svg';
import styles from '../../styles/adminStyles/AdminDashboardStyles';
import { Backdrop, CircularProgress, Paper, Typography, useMediaQuery, useTheme, withStyles } from '@material-ui/core';
import CalendarCard from './dashBoardCards/CalendarCard';
import DonutChartCard from './dashBoardCards/DonutChartCard';
import { useDispatch, useSelector } from 'react-redux';
import { drawerSelectionChanged } from '../../store/ui/drawer';
import { withRouter } from 'react-router-dom';
import { loadStudents } from '../../store/users/students';
import { loadGrievances } from '../../store/grievances/grievances';
import { loadStaffs } from '../../store/users/staffs';
import { loadTimeTable } from '../../store/timeTable/appointments';
import AnnouncementMadeIcon from '../../resources/design-icons/AnnouncmentMadeIcon';
import Ticker, { NewsTicker } from 'nice-react-ticker';
import { loadAnnouncements } from '../../store/announcements/announcements';
import moment from 'moment';

function StudentDashboard(props) {
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

    const timeTables = useSelector(state => state.entities.appointments.list);
    const timeTablesLoading = useSelector(state => state.entities.appointments.loading);
    const timeTablesErr = useSelector(state => state.entities.appointments.isError);
    const timeTablesErrMsg = useSelector(state => state.entities.appointments.errorMessage);

    const announcements = useSelector(state => state.entities.announcements.list);
    const announcmentsLoading = useSelector(state => state.entities.announcements.loading);
    const announcmentsErr = useSelector(state => state.entities.announcements.isError);
    const announcmentsErrMsg = useSelector(state => state.entities.announcements.errorMessage);

    const currentAuth = useSelector(state => state.auth.user);

    const isLoading = studentsLodaing || grievanceLoading || staffLoading || timeTablesLoading || announcmentsLoading;

    useEffect(() => {
        dispatch(drawerSelectionChanged("Dashboard"));
        if (students.length === 0) dispatch(loadStudents());
        if (grievances.length === 0) dispatch(loadGrievances());
        if (staff.length === 0) dispatch(loadStaffs());
        if (timeTables.length === 0) dispatch(loadTimeTable());
        if (announcements.length === 0) dispatch(loadAnnouncements());
    }, []);

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const getPendingStudents = () => {
        // const pendingStudents
    };

    const renderAnnouncements = () => {
        const allowed = announcements.filter(announ => announ.visibleTo === "Student");
        const sorted = allowed.slice().sort(function (a, b) {
            var dateA = new Date(a.dateCreated), dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
        const list = sorted.map(announ => (
            <NewsTicker id={announ._id} title={announ.announcement} url={`/announcements/${announ._id}`} meta={moment(announ.dateCreated).format("MMM DD, YYYY @ HH:mm:ss")} />
        ));
        return list;
    };

    const getLodgedGrievanceCount = () => {
        const userGrievances = grievances.filter(grievance => grievance.lodgedBy === currentAuth._id);
        return userGrievances.length;
    };
    const getSolvedGrievanceCount = () => {
        const userGrievances = grievances.filter(grievance => grievance.lodgedBy === currentAuth._id);
        const solvedGrievances = userGrievances.filter(grievance => grievance.isClosed);
        return solvedGrievances.length;
    };
    const getPendingGrievanceCount = () => {
        const userGrievances = grievances.filter(grievance => grievance.lodgedBy === currentAuth._id);
        const pendingGrievances = userGrievances.filter(grievance => !grievance.isClosed && !grievance.isPaused);
        return pendingGrievances.length;
    };
    const getPausedGrievanceCount = () => {
        const userGrievances = grievances.filter(grievance => grievance.lodgedBy === currentAuth._id);
        const pausedGrievances = userGrievances.filter(grievance => grievance.isPaused);
        return pausedGrievances.length;
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <div>
                <div className={classes.parent}>
                    <div className={classes.heading}>
                        <AnnouncementMadeIcon className={classes.headingIcon} />
                        <Typography className={classes.headingText}>Student Specific Announcements</Typography>
                    </div>
                    <div className="newsticker">
                        <Ticker isNewsTicker={true}>
                            <NewsTicker id={100001} title={""} meta={""} />
                            {renderAnnouncements()}
                        </Ticker>
                    </div>
                </div>
            </div>
            <Paper
                className={`${classes.activeCardsContainer} ${classes.contentCenter}`}
                elevation={0}
            >
                {/* <div className={classes.activeCard}>
                    <ActiveCard
                        title="Staff"
                        value={staff.length}
                        icon={LeadsIcon}
                    />
                </div> */}
                {/* <div className={classes.activeCard}>
                    <ActiveCard
                        title="Active Students"
                        value={students.length}
                        icon={StudentsIcon}
                    // onButtonClick={studentsReadMore}
                    />
                </div>
                <div className={classes.activeCard}>
                    <ActiveCard
                        title="Grievances"
                        value={grievances.length}
                        icon={GroupsIcon}
                    // onButtonClick={groupsReadMore}
                    />
                </div>
                <div className={classes.activeCard}>
                    <ActiveCard
                        title="Delayed Grievances"
                        value={2}
                        icon={DebtorsIcon}
                    // onButtonClick={debtorsReadMore}
                    />
                </div> */}
                <div className={`${isSmall ? "" : `${classes.activeCard}`}`}>
                    <DonutChartCard
                        totalGrivances={getLodgedGrievanceCount()}
                        pendingGrievances={getPendingGrievanceCount()}
                        pausedGrievances={getPausedGrievanceCount()}
                        solvedGrievances={getSolvedGrievanceCount()}
                    />
                </div>
            </Paper>
        </div>
    );
}

export default withRouter(withStyles(styles)(StudentDashboard));