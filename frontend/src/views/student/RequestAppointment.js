import {
    Backdrop, Breadcrumbs, CircularProgress, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead, TablePagination,
    TableRow, Tooltip, Typography, withStyles, IconButton, Snackbar, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAppointmentRequest, deleteAppointmentRequest, loadAppointmentsRequests, updateAppointmentRequest } from "../../store/appointmentsRequests/appointmentsRequsets";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { loadStudents } from "../../store/users/students";
import ToolTipStyles from "../helpers/ToolTipStyles";
import styles from "../../styles/staffStyles/StaffAppointmentRequestsStyles";
import AlertMesssageDialog from '../helpers/AlertMessageDialog';
import useToggleState from '../../hooks/useToggleState';
import RemoveIcon from "../../resources/design-icons/RemoveIcon";
import ApproveIcon from "../../resources/design-icons/ApproveIcon";
import { errorOccured, errorReset } from "../../store/ui/error";
import AppointmentForm from "./appointmentsCard/AppointmentForm";
import { loadTimeTable } from "../../store/timeTable/appointments";
import { loadStaffs } from "../../store/users/staffs";
import moment from "moment";
// import styles from "../../styles/studentStyles/RequestAppointmentStyles";


function RequestAppointment(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [alert, toggleAlert] = useToggleState(false);

    const [requestedStaff, setRequestedStaff] = useState("");
    const [requestDescription, setRequestDescription] = useState("");

    const [openAppointmentForm, toggleAppointmentForm] = useToggleState(false);

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [renderComponent, setRenderComponet] = useState("pending");

    const staffs = useSelector(state => state.entities.users.staffs.list);
    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const appointmentRequests = useSelector(state => state.entities.appointmentsRquest.list);
    const appointmentRequestsLoading = useSelector(state => state.entities.appointmentsRquest.loading);
    const appointmentRequestsErr = useSelector(state => state.entities.appointmentsRquest.isError);
    const appointmentRequestsErrMsg = useSelector(state => state.entities.appointmentsRquest.errorMessage);
    const currentAuth = useSelector(state => state.auth.user);
    const uiErr = useSelector(state => state.ui.error.isError);
    const uiErrMsg = useSelector(state => state.ui.error.errorMessage);
    const timeTables = useSelector(state => state.entities.appointments.list);
    const timeTablesLoading = useSelector(state => state.entities.appointments.loading);
    const timeTablesErr = useSelector(state => state.entities.appointments.isError);
    const timeTablesErrMsg = useSelector(state => state.entities.appointments.errorMessage);
    const dispatch = useDispatch();

    const isLoading = studentsLodaing || appointmentRequestsLoading || timeTablesLoading
    const isError = studentsErr || appointmentRequestsErr || uiErr
    const errorMsg = StudentErrMsg || appointmentRequestsErrMsg || uiErrMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Request-Appointments"));
        if (students.length === 0) dispatch(loadStudents());
        if (appointmentRequests.length === 0) dispatch(loadAppointmentsRequests());
        if (timeTables.length === 0) dispatch(loadTimeTable());
        if (staffs.length === 0) dispatch(loadStaffs());
    }, []);

    const handleClick = e => {
        if (e.target.innerHTML === "Approved Appointments") setRenderComponet("approved");
        if (e.target.innerHTML === "Pending Approval") setRenderComponet("pending");
    };

    const getEmpId = staff => {
        const idx = staffs.findIndex(user => user._id === staff);
        if (staffs[idx]) return staffs[idx].employee._id;
    };

    const getMeetingDetails = req => {
        const ttIndex = timeTables.findIndex(tt => tt.employee === getEmpId(req.staff));
        const meetings = timeTables[ttIndex] ? timeTables[ttIndex].timetable : [];
        const meetingIndex = meetings.findIndex(meet => meet.attendee === req.student);
        const details = meetings[meetingIndex] ? meetings[meetingIndex] : {};
        if (Object.keys(details).length !== 0) {
            const startDate = details.startDate;
            const endDate = details.endDate
            const title = details.title;
            const output = <div>
                <Typography>Meeting Scheduled under title '{title}'</Typography>
                <Typography> From {moment(startDate).format("DD MMM, YYYY")} at {moment(startDate).format("HH:mm a")}</Typography>
                <Typography> Upto {moment(endDate).format("DD MMM, YYYY")} at {moment(endDate).format("HH:mm a")}</Typography>
            </div>
            return output;
        }
        return ":( Details seem to be broken"
    }

    const getCount = () => {
        const currentUserRequest = appointmentRequests.filter(req => req.student === currentAuth._id);
        const pendingReuests = currentUserRequest.filter(req => !req.isGranted);
        const approvedReuests = currentUserRequest.filter(req => req.isGranted);
        let renderingReqs = [];
        if (renderComponent === "approved") renderingReqs = approvedReuests;
        if (renderComponent === "pending") renderingReqs = pendingReuests;
        return renderingReqs.length;
    };
    const getStudentName = (studentId) => {
        const index = students.findIndex(std => std._id === studentId);
        if (students[index]) return students[index].name;
        return "Student Name can't be found!"
    };

    const renderRequests = () => {
        let count = page * rowsPerPage;
        const currentUserRequest = appointmentRequests.filter(req => req.student === currentAuth._id);
        const pendingReuests = currentUserRequest.filter(req => !req.isGranted);
        const approvedReuests = currentUserRequest.filter(req => req.isGranted);
        let renderingReqs = [];
        if (renderComponent === "approved") renderingReqs = approvedReuests;
        if (renderComponent === "pending") renderingReqs = pendingReuests;
        const list = renderingReqs.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(req => (
            <TableRow key={req._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">{getStudentName(req.student)}</TableCell>
                <TableCell align="center">{req.appointmentDescription}</TableCell>
                <TableCell align="right">
                    {
                        req.isGranted && <>
                            {getMeetingDetails(req)}
                        </>
                    }
                </TableCell>
            </TableRow>
        )
        );

        return list;
    };

    const validateRequest = () => {
        if (requestedStaff === "") {
            dispatch(errorOccured({
                message: "Please choose a Staff member to get Appointment from!",
                statusCode: 502
            }));
            return false;
        }
        if (requestDescription === "") {
            dispatch(errorOccured({
                message: "Please provide a vauluable description!",
                statusCode: 502
            }));
            return false;
        }
        // if (!createWithoutEmp && (categoryIncharge === null || categoryIncharge === undefined)) {
        //     dispatch(errorOccured({
        //         message: "Please select an employee or check 'Create without employeee' box!",
        //         statusCode: 502
        //     }));
        //     return false;
        // }
        dispatch(errorReset());
        return true;
    };

    const handleAppointmentFormClose = () => {

        // dispatch(errorReset());
        setRequestedStaff("");
        setRequestDescription("");
        toggleAppointmentForm();
    };

    const handleSaveRequest = () => {
        if (!validateRequest()) return;
        const appointRequest = {
            staff: requestedStaff,
            appointmentDescription: requestDescription,
            student: currentAuth._id
        };
        dispatch(errorReset())
            .then(
                dispatch(addAppointmentRequest(appointRequest))
            )
            .then(
                () => {
                    if (isError) {
                        setSnackMsg("Appointment Request addition failed!");
                        setSnack(true);
                        return;
                    }
                    else {
                        setSnackMsg("Appointment Request added Successfully!");
                        setSnack(true);
                        handleAppointmentFormClose();
                        return;
                    }
                }
            );

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackMsg("");
        setSnack(false);
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Typography color="inherit" >
                    Student Home
                </Typography>
                <Typography color="inherit" >
                    Appointment Requests
                </Typography>
                {renderComponent === "approved" && <Typography color="textPrimary">Approved Appointments</Typography>}
                {renderComponent === "pending" && <Typography color="textPrimary">Pending Approval</Typography>}
            </Breadcrumbs>
            <div className={classes.pageHeading}>
                <h1>Requests</h1>
                <Button
                    className={classes.btnAddNewAppointment}
                    onClick={() => {
                        toggleAppointmentForm()
                    }}
                >Request an Appointmnet</Button>
                <Paper
                    className={classes.toggleButtonContainer}
                    elevation={0}
                >
                    <Button
                        className={renderComponent === "pending" ? classes.selectedButton : classes.unSelectedButton}
                        onClick={handleClick}
                    >
                        Pending Approval
                    </Button>
                    <Button
                        className={renderComponent === "approved" ? classes.selectedButton : classes.unSelectedButton}
                        onClick={handleClick}
                    >
                        Approved Appointments
                    </Button>
                </Paper>
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center">Request By</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderRequests()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25]}
                    component='div'
                    count={getCount()}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    class={classes.Pagination}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                open={openAppointmentForm}
            >
                <DialogTitle>
                    <Typography
                        className={classes.dialogTitleText}
                    >Request new Appointment</Typography>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    {isError && <div className={classes.error}>
                        <Typography>{errorMsg}</Typography>
                    </div>}
                    <AppointmentForm
                        values={{
                            requestedStaff,
                            setRequestedStaff,
                            requestDescription,
                            setRequestDescription
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleAppointmentFormClose}
                    >
                        BackPage
                    </Button>
                    <Button
                        onClick={handleSaveRequest}
                        className={classes.formBtnSave}
                    >
                        Save Request
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                message={snackMsg}
            />
        </div>
    );
}

export default withStyles(styles)(RequestAppointment);