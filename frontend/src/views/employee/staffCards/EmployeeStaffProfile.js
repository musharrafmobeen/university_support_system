import { Backdrop, Breadcrumbs, CircularProgress, Paper, Typography, withStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import configData from '../../../config.json';
import { loadAppointmentsRequests } from "../../../store/appointmentsRequests/appointmentsRequsets";
import { loadTimeTable } from "../../../store/timeTable/appointments";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { loadStaffs } from "../../../store/users/staffs";
import { loadStudents } from "../../../store/users/students";
import styles from "../../../styles/studentStyles/staffCardsStyles/StaffProfileStyles";
import UserProfile from "../../helpers/UserProfile";
import Try from "../../staff/Try";


function StaffProfile(props) {
    const { classes } = props;

    const staffId = props.match.params.id;

    const dispatch = useDispatch();
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);
    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrorMsg = useSelector(state => state.ui.error.errorMessage);
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
    const isError = staffErr || uiError
    const errorMsg = staffErrMsg || uiErrorMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Staff"));
        if (students.length === 0) dispatch(loadStudents());
        if (staff.length === 0) dispatch(loadStaffs());
        if (timeTables.length === 0) dispatch(loadTimeTable());
        if (appointmentRequests.length === 0) dispatch(loadAppointmentsRequests());
    }, []);

    const getSecondName = (fullName) => {
        let secondName = "";
        for (let i = 1; i < fullName.split(" ").length; i++) {
            secondName = secondName + fullName.split(" ")[i] + " ";
        }
        return secondName;
    };

    const getCurrentStaff = () => {
        const index = staff.findIndex(user => user._id === staffId);
        if (staff[index]) return staff[index];
    };

    const currentStaff = getCurrentStaff();

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Typography color="inherit" >
                    Emplyee Home
                </Typography>
                <Typography color="inherit" >
                    Staff
                </Typography>
                <Typography color="textPrimary">{currentStaff && currentStaff.employee.name}</Typography>
            </Breadcrumbs>
            <div className={classes.profileInfoContainer}>
                <div className={classes.profileContainer}>
                    {currentStaff && <UserProfile
                        values={{
                            id: staffId,
                            userFirstName: currentStaff.employee.name.split(" ")[0],
                            userLastName: getSecondName(currentStaff.employee.name),
                            avatarSrc: currentStaff.employee.employeeImage ? `${configData.url.baseUrl}/${currentStaff.employee.employeeImage}` : "",
                            email: currentStaff.employee.email,
                            designation: currentStaff.employee.designation,
                            department: currentStaff.employee.department,
                            inChargeOf: currentStaff.inChargeOf,
                            isActive: currentStaff.isAvailable,
                            isCurrentUser: false,
                            userType: "Staff"
                        }}
                    />}
                </div>
                <Paper className={classes.timeTableContainer}>
                    <Typography type="h4" component="h4" className={classes.paperHead}>Schedule:</Typography>
                    {
                        (timeTables.length !== 0 && currentStaff) && <Try readOnly={true} staff={currentStaff} />
                    }
                </Paper>
            </div>
        </div>
    );
}

export default withRouter(withStyles(styles)(StaffProfile));