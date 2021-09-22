import { Backdrop, Breadcrumbs, Button, CircularProgress, Paper, Typography, withStyles } from "@material-ui/core";
import styles from '../../styles/staffStyles/StaffTimeTableStyles';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { loadTimeTable } from "../../store/timeTable/appointments";
import { loadStaffs } from "../../store/users/staffs";
import { loadStudents } from "../../store/users/students";
import Try from "./Try";
import { loadAppointmentsRequests } from "../../store/appointmentsRequests/appointmentsRequsets";


function StaffTimeTable(props) {
    const { classes } = props;

    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);
    const dispatch = useDispatch();
    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const timeTables = useSelector(state => state.entities.appointments.list);
    const timeTablesLoading = useSelector(state => state.entities.appointments.loading);
    const timeTablesErr = useSelector(state => state.entities.appointments.isError);
    const timeTablesErrMsg = useSelector(state => state.entities.appointments.errorMessage);
    const appointmentRequests = useSelector(state => state.entities.appointmentsRquest.list);
    const appointmentRequestsLoading = useSelector(state => state.entities.appointmentsRquest.loading);
    const appointmentRequestsErr = useSelector(state => state.entities.appointmentsRquest.isError);
    const appointmentRequestsErrMsg = useSelector(state => state.entities.appointmentsRquest.errorMessage);

    const isLoading = studentsLodaing || staffLoading || timeTablesLoading || appointmentRequestsLoading

    useEffect(() => {
        dispatch(drawerSelectionChanged("Time-Table"));
        if (students.length === 0) dispatch(loadStudents());
        if (staff.length === 0) dispatch(loadStaffs());
        if (timeTables.length === 0) dispatch(loadTimeTable());
        if (appointmentRequests.length === 0) dispatch(loadAppointmentsRequests());
    }, []);



    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Typography color="inherit" >
                    Staff Home
                </Typography>
                <Typography color="inherit" >
                    Time Table
                </Typography>
                <Typography color="textPrimary">Time-Table</Typography>
            </Breadcrumbs>
            <div className={classes.pageHeading}>
                <h1>Staff</h1>
            </div>
            <div>
                {!isLoading && <Try />}
            </div>
        </div >
    );
}

export default withStyles(styles)(StaffTimeTable);