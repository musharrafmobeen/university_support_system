import React, { useEffect, useState } from "react";
import {
    Avatar,
    Backdrop,
    Breadcrumbs, Button, CircularProgress, IconButton, Link, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow,
    Tooltip, Typography, withStyles
} from "@material-ui/core";
import styles from "../../styles/adminStyles/PendingRequestsStyles";
import ToolTipStyles from "../helpers/ToolTipStyles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { withRouter } from "react-router-dom";
import ApproveIcon from "../../resources/design-icons/ApproveIcon";
import DisApproveIcon from "../../resources/design-icons/DisApproveIcon";
import { deleteStudent, loadRejectedStudents, loadUnApprovedStudents, updateStudent } from "../../store/users/students";
import AlertMesssageDialog from '../helpers/AlertMessageDialog';
import useToggleState from '../../hooks/useToggleState';
import configData from '../../config.json';
import RemoveIcon from "../../resources/design-icons/RemoveIcon";


function RejectedAccounts(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [alert, toggleAlert] = useToggleState(false);

    const [action, setAction] = useState("");
    const [userToBeActedOn, setUserToBeActedOn] = useState("");

    const students = useSelector(state => state.entities.users.students.rejectedStudents);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const dispatch = useDispatch();

    const isLoading = studentsLodaing;

    useEffect(() => {
        dispatch(drawerSelectionChanged("Rejected-Accounts"));
        if (students.length === 0) dispatch(loadRejectedStudents());
    }, []);

    const renderRejectedAccounts = () => {
        let count = page * rowsPerPage;
        const rejectedStudents = students;
        const list = rejectedStudents.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(user => (
            <TableRow key={user._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">
                    <Avatar
                        src={user.studentImage ? `${configData.url.baseUrl}/${user.studentImage}` : ""}
                        alt={user.name}
                    />
                </TableCell>
                <TableCell align="center">{user.reg}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.department}</TableCell>
                <TableCell align="center">{user.course}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="right" >
                    <Tooltip arrow title="Approve" classes={toolTipClasses}>
                        <IconButton
                            onClick={
                                () => {
                                    setAction("Approve");
                                    setUserToBeActedOn(user._id);
                                    toggleAlert();
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
                                    setAction("Delete");
                                    setUserToBeActedOn(user._id);
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


    const getUserInfo = () => {
        const idx = students.findIndex(student => student._id === userToBeActedOn);
        if (students[idx]) return `Student: ${students[idx].name}`;
        return "Student info can't be found :("
    };

    const handleAlertClose = () => {
        setAction("");
        setUserToBeActedOn("");
        toggleAlert();
    };

    const handleAlertYes = () => {
        // const bodyFormData = new FormData();
        // bodyFormData.append('updateBy', '_id');
        // if (action === 'Approve') bodyFormData.append('isApproved', 'true');
        // if (action === "DisApprove") bodyFormData.append('isApproved', 'false');
        // console.log("bodyFormData", bodyFormData);
        // for (var key of bodyFormData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
        // console.log(...bodyFormData.entries())
        if (action === "Approve") {
            const formData = {
                "isApproved": action === "Approve",
                "isRejected": action === "DisApprove"
            };
            dispatch(updateStudent(userToBeActedOn, formData)).then(
                () => {
                    dispatch(loadUnApprovedStudents());
                    dispatch(loadRejectedStudents());
                }
            ).then(
                () => {
                    handleAlertClose();
                }
            );
            return;
        }
        if (action === "Delete") {
            dispatch(deleteStudent(userToBeActedOn))
                .then(
                    () => {
                        dispatch(loadRejectedStudents())
                    }
                )
                .then(
                    () => {
                        dispatch(loadUnApprovedStudents())
                    }
                );
            handleAlertClose();
            return;
        }
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
                <Typography color="inherit">
                    Rejected Accounts
                </Typography>
                <Typography color="textPrimary">Students Rejected Accounts</Typography>
            </Breadcrumbs>
            <Paper
                className={classes.toggleButtonContainer}
                elevation={0}
            >
                <Button
                    className={classes.selectedButton}
                >
                    Students Accounts
                </Button>
                <Button
                    className={classes.unSelectedButton}
                    onClick={() => {
                        props.history.push("/admin/rejected-accounts/employees-accounts");
                    }}
                >
                    Employees accounts
                </Button>
            </Paper>
            <div className={classes.pageHeading}>
                <h1>Rejected Accounts</h1>
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">REG#</TableCell>
                                <TableCell align="center">Full name</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="center">Course</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderRejectedAccounts()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25]}
                    component='div'
                    count={students.length}//{staff.length}
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
                    title: `Do you really want to ${action === 'Approve' ? 'Approve' : 'Delete'} this User?`,
                    content: getUserInfo(),
                }}
                handleCancel={handleAlertClose}
                handleYes={handleAlertYes}
            />
        </div>
    );
}

export default withRouter(withStyles(styles)(RejectedAccounts));