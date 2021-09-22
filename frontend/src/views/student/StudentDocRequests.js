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
import DocumentForm from "./documentsCards/DocumentForm";
import { addDocumentRequest, loadDocumentsRequests } from "../../store/documentsRequests/documentsRequests";
// import styles from "../../styles/studentStyles/RequestAppointmentStyles";


function StudentDocRequests(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [alert, toggleAlert] = useToggleState(false);

    const [requestedStaff, setRequestedStaff] = useState("");
    const [docType, setDocType] = useState("");
    const [userReg, setUserReg] = useState("");
    const [userCourse, setUserCourse] = useState("");
    const [userDepartment, setUserDepartment] = useState("");
    const [batch, setBatch] = useState("");
    const [faculty, setFaculty] = useState("");
    const [userFatherName, setFatherName] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [userPassPort, setUserPassPort] = useState("");
    const [userSemester, setSemester] = useState("");
    const [userNationality, setNationality] = useState("");
    const [userDesiredUniName, setDesiredUniName] = useState("");
    //userName,


    const [openAppointmentForm, toggleAppointmentForm] = useToggleState(false);

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [renderComponent, setRenderComponet] = useState("pending");

    const staffs = useSelector(state => state.entities.users.staffs.list);
    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const documentRequests = useSelector(state => state.entities.documentsRequests.list);
    const documentRequestsLoading = useSelector(state => state.entities.documentsRequests.loading);
    const documentRequestsErr = useSelector(state => state.entities.documentsRequests.isError);
    const documentRequestsErrMsg = useSelector(state => state.entities.documentsRequests.errorMessage);
    const currentAuth = useSelector(state => state.auth.user);
    const uiErr = useSelector(state => state.ui.error.isError);
    const uiErrMsg = useSelector(state => state.ui.error.errorMessage);
    const timeTables = useSelector(state => state.entities.appointments.list);
    const timeTablesLoading = useSelector(state => state.entities.appointments.loading);
    const timeTablesErr = useSelector(state => state.entities.appointments.isError);
    const timeTablesErrMsg = useSelector(state => state.entities.appointments.errorMessage);
    const dispatch = useDispatch();

    const isLoading = studentsLodaing || documentRequestsLoading || timeTablesLoading
    const isError = studentsErr || documentRequestsErr || uiErr
    const errorMsg = StudentErrMsg || documentRequestsErrMsg || uiErrMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Documents-Requests"));
        if (students.length === 0) dispatch(loadStudents());
        if (documentRequests.length === 0) dispatch(loadDocumentsRequests());
        if (timeTables.length === 0) dispatch(loadTimeTable());
        if (staffs.length === 0) dispatch(loadStaffs());
    }, []);

    const handleClick = e => {
        if (e.target.innerHTML === "Approved Documents") setRenderComponet("approved");
        if (e.target.innerHTML === "Pending Approval") setRenderComponet("pending");
    };

    const getEmpId = staff => {
        const idx = staffs.findIndex(user => user._id === staff);
        if (staffs[idx]) return staffs[idx].employee._id;
    };

    const getStaffName = id => {
        const index = staffs.findIndex(user => user._id === id);
        if (staffs[index]) return staffs[index].employee.name;
        return "Can't find Name!"
    };

    const getCount = () => {
        const currentUserRequest = documentRequests.filter(req => req.student._id === currentAuth._id);
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
        const currentUserRequest = documentRequests.filter(req => req.student._id === currentAuth._id);
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
                <TableCell align="center">{getStudentName(req.student._id)}</TableCell>
                <TableCell align="center">{
                    req.documentType === "refrenceLetter" ?
                        "Refrence Letter"
                        :
                        "Bonaffide Certificate"
                }</TableCell>
                <TableCell align="center">{
                    req.documentType === "refrenceLetter" ?
                        `${getStaffName(req.staff)}`
                        :
                        "Admin"
                }</TableCell>
                <TableCell align="right">
                    {
                        req.isGranted && <>
                            <Typography
                                className={classes.clickAble}
                                onClick={() => {
                                    props.history.push(`/student/documents-requests/view/${req._id}`);
                                }}
                            >View Document</Typography>
                        </>
                    }
                </TableCell>
            </TableRow>
        )
        );

        return list;
    };

    const validateRequest = () => {
        const nameRegExp = /^[a-zA-Z]+[ a-zA-Z]+$/;
        if (docType === "refrenceLetter" && requestedStaff === "") {
            dispatch(errorOccured({
                message: "Please choose a Staff member to get Document from!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "") {
            dispatch(errorOccured({
                message: "Please choose a valid document type!",
                statusCode: 502
            }));
            return false;
        }
        if (userDepartment === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate department!",
                statusCode: 502
            }));
            return false;
        }
        if (batch === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate batch!",
                statusCode: 502
            }));
            return false;
        }
        if (userCourse === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate course!",
                statusCode: 502
            }));
            return false;
        }
        if (faculty === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate faculty!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "bonafied certificate" && userPassPort === "") {
            dispatch(errorOccured({
                message: "Passport Number cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "bonafied certificate" && userFatherName === "") {
            dispatch(errorOccured({
                message: "Father Name cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "bonafied certificate" && !nameRegExp.test(userFatherName)) {
            dispatch(errorOccured({
                message: "Invalid Name!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "bonafied certificate" && userNationality === "") {
            dispatch(errorOccured({
                message: "Nationality cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "bonafied certificate" && !nameRegExp.test(userNationality)) {
            dispatch(errorOccured({
                message: "Invalid Nationality!",
                statusCode: 502
            }));
            return false;
        }
        if (dateOfJoining === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate Joining date!",
                statusCode: 502
            }));
            return false;
        }
        if (userSemester === "") {
            dispatch(errorOccured({
                message: "Please select Your current Semester!",
                statusCode: 502
            }));
            return false;
        }
        if (docType === "refrenceLetter" && userDesiredUniName === "") {
            dispatch(errorOccured({
                message: "Please provide desired institute name!",
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
        setDocType("");
        toggleAppointmentForm();
    };

    const handleSaveRequest = () => {
        if (!validateRequest()) return;
        const docRequest = {
            staff: requestedStaff,
            documentType: docType,
            student: {
                _id: currentAuth._id,
                name: currentAuth.name,
                reg: userReg,
                faculty: faculty,
                batch: batch,
                course: userCourse,
                passPortNumber: userPassPort,
                fatherName: userFatherName,
                initialDateOfJoining: dateOfJoining,
                currentSmester: userSemester,
                department: userDepartment,
                nationality: userNationality,
                desiredUni: userDesiredUniName
            }
        };
        dispatch(errorReset())
            .then(
                dispatch(addDocumentRequest(docRequest))
            )
            .then(
                () => {
                    if (isError) {
                        setSnackMsg("Document Request addition failed!");
                        setSnack(true);
                        return;
                    }
                    else {
                        setSnackMsg("Document Request added Successfully!");
                        setSnack(true);
                        handleAppointmentFormClose();
                        return;
                    }
                }
            );
        handleAppointmentFormClose();
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
                    Documents Requests
                </Typography>
                {renderComponent === "approved" && <Typography color="textPrimary">Approved Appointments</Typography>}
                {renderComponent === "pending" && <Typography color="textPrimary">Pending Approval</Typography>}
            </Breadcrumbs>
            <div className={classes.pageHeading}>
                <h1>Documents Requests</h1>
                <Button
                    className={classes.btnAddNewAppointment}
                    onClick={() => {
                        setUserReg(`${currentAuth.reg ? currentAuth.reg : ""}`)
                        toggleAppointmentForm();
                    }}
                >Request a Document</Button>
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
                        Approved Documents
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
                                <TableCell align="center">Document</TableCell>
                                <TableCell align="center">Requested From</TableCell>
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
                    <DocumentForm
                        values={{
                            requestedStaff,
                            setRequestedStaff,
                            docType,
                            setDocType,
                            userReg,
                            setUserReg,
                            userCourse,
                            setUserCourse,
                            userDepartment,
                            setUserDepartment,
                            batch,
                            setBatch,
                            faculty,
                            setFaculty,
                            userFatherName,
                            setFatherName,
                            userName: currentAuth.name,
                            dateOfJoining,
                            setDateOfJoining,
                            userPassPort,
                            setUserPassPort,
                            userSemester,
                            setSemester,
                            userNationality,
                            setNationality,
                            userDesiredUniName,
                            setDesiredUniName
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

export default withStyles(styles)(StudentDocRequests);