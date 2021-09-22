import {
    Backdrop, Breadcrumbs, CircularProgress, Paper, Table,
    TableBody, TableCell, TableContainer, TableHead, TablePagination,
    TableRow, Tooltip, Typography, withStyles, IconButton, Snackbar
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointmentRequest, loadAppointmentsRequests, updateAppointmentRequest } from "../../store/appointmentsRequests/appointmentsRequsets";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { loadStudents } from "../../store/users/students";
import ToolTipStyles from "../helpers/ToolTipStyles";
import styles from "../../styles/staffStyles/StaffAppointmentRequestsStyles";
import AlertMesssageDialog from '../helpers/AlertMessageDialog';
import useToggleState from '../../hooks/useToggleState';
import RemoveIcon from "../../resources/design-icons/RemoveIcon";
import ApproveIcon from "../../resources/design-icons/ApproveIcon";
import { loadDocumentsRequests } from "../../store/documentsRequests/documentsRequests";
import { withRouter } from "react-router-dom";


function DocumentRequests(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [alert, toggleAlert] = useToggleState(false);

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [action, setAction] = useState("");
    const [reqToBeActedOn, setReqToBeActedOn] = useState("");

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
    const dispatch = useDispatch();

    const isLoading = studentsLodaing || documentRequestsLoading
    const isError = studentsErr || documentRequestsErr || uiErr
    const eerrorMsg = StudentErrMsg || documentRequestsErrMsg || uiErrMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Documents-Requests"));
        if (students.length === 0) dispatch(loadStudents());
        if (documentRequests.length === 0) dispatch(loadDocumentsRequests());
    }, []);

    const getCount = () => {
        const currentUserRequest = documentRequests.filter(req => req.documentType === "bonafied certificate");
        const pendeingReuests = currentUserRequest.filter(req => !req.isGranted);
        return pendeingReuests.length;
    };
    const getStudentName = (studentId) => {
        const index = students.findIndex(std => std._id === studentId);
        if (students[index]) return students[index].name;
        return "Student Name can't be found!"
    };

    const renderRequests = () => {
        let count = page * rowsPerPage;
        const currentUserRequest = documentRequests.filter(req => req.documentType === "bonafied certificate");
        const pendeingReuests = currentUserRequest.filter(req => !req.isGranted);
        const list = pendeingReuests.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(req => (
            <TableRow key={req._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">{getStudentName(req.student._id)}</TableCell>
                <TableCell align="center">Bonafide Certificate</TableCell>
                <TableCell align="right">
                    <Tooltip arrow title="Approve" classes={toolTipClasses}>
                        <IconButton
                            onClick={
                                () => {
                                    props.history.push(`/admin/documents-requests/${req._id}`);
                                }
                            }
                        >
                            <ApproveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Delete" classes={toolTipClasses}>
                        <IconButton
                            className={classes.deleteButton}
                            onClick={
                                () => {
                                    setAction("delete");
                                    setReqToBeActedOn(req._id);
                                    toggleAlert();
                                }
                            }
                        >
                            <RemoveIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        )
        );

        return list;
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const getAppointmentInfo = () => {
        const idx = documentRequests.findIndex(req => req._id === reqToBeActedOn);
        if (documentRequests[idx]) return `Student: ${getStudentName(documentRequests[idx].student)}`;
        return "Appointment info can't be found :("
    };

    const handleAlertClose = () => {
        setAction("");
        setReqToBeActedOn("");
        toggleAlert();
    };

    const handleAlertYes = () => {
        if (action === "delete") {
            dispatch(deleteAppointmentRequest(reqToBeActedOn)).then(
                () => {
                    if (isError) {
                        setSnackMsg(eerrorMsg);
                        setSnack(true);
                        return;
                    }
                    else {
                        setSnackMsg("Appointment Request Deleted Successfully!");
                        setSnack(true);
                        return;
                    }
                }
            );
        }
        else {
            const req = {
                isGranted: "true"
            }
            dispatch(updateAppointmentRequest(reqToBeActedOn, req)).then(
                () => {
                    if (isError) {
                        setSnackMsg(eerrorMsg);
                        setSnack(true);
                        return;
                    }
                    else {
                        setSnackMsg("Appointment Granted Successfully!");
                        setSnack(true);
                        return;
                    }
                }
            );
        }
        handleAlertClose();
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
                    Admin Home
                </Typography>
                <Typography color="inherit" >
                    Documents Requests
                </Typography>
            </Breadcrumbs>
            <div className={classes.pageHeading}>
                <h1>Requests</h1>
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
            <AlertMesssageDialog
                values={{
                    openAlert: alert,
                    title: `Do you really want to ${action === "delete" ? "Delete" : "grant"} this appointment?`,
                    content: getAppointmentInfo(),
                    note: `${action !== "delete" ? "Please create a suiteable meeting slot in \'Time Table\' before granting this appointmnet!" : ""}`
                }}
                handleCancel={handleAlertClose}
                handleYes={handleAlertYes}
            />
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

export default withRouter(withStyles(styles)(DocumentRequests));