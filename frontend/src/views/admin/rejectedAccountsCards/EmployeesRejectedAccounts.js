import React, { useEffect, useState } from "react";
import {
    Avatar,
    Backdrop,
    Breadcrumbs, Button, CircularProgress, IconButton, Link, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow,
    Tooltip, Typography, withStyles
} from "@material-ui/core";
import styles from "../../../styles/adminStyles/PendingRequestsStyles";
import ToolTipStyles from "../../helpers/ToolTipStyles";
import RemoveIcon from '../../../resources/design-icons/RemoveIcon';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { withRouter } from "react-router-dom";
import { deleteEmployee, loadRejectedEmployees, loadUnApprovedEmployees, updateEmployee } from "../../../store/users/employees";
import configData from '../../../config.json';
import useToggleState from '../../../hooks/useToggleState';
import AlertMesssageDialog from '../../helpers/AlertMessageDialog';
import ApproveIcon from "../../../resources/design-icons/ApproveIcon";
import DisApproveIcon from "../../../resources/design-icons/DisApproveIcon";

function EmployeesRejectedAccounts(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [alert, toggleAlert] = useToggleState(false);

    const [action, setAction] = useState("");
    const [userToBeActedOn, setUserToBeActedOn] = useState("");

    const employees = useSelector(state => state.entities.users.employees.rejectedEmployees);
    const employeesLoading = useSelector(state => state.entities.users.employees.loading);
    const employeesErr = useSelector(state => state.entities.users.employees.isError);
    const employeesErrMsg = useSelector(state => state.entities.users.employees.errorMessage);

    const dispatch = useDispatch();

    const isLoading = employeesLoading

    useEffect(() => {
        dispatch(drawerSelectionChanged("Rejected-Accounts"));
        if (employees.length === 0) dispatch(loadRejectedEmployees());
    }, []);

    const renderRejectedRequests = () => {
        let count = page * rowsPerPage;
        const list = employees.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(user => (
            <TableRow key={user._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">
                    <Avatar
                        src={user.employeeImage ? `${configData.url.baseUrl}/${user.employeeImage}` : ""}
                        alt={user.name}
                    />
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.designation}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{`${moment(user.creationTime).format("DD.MM.YYYY @ HH:mm")}`}</TableCell>
                <TableCell align="center">{user.department}</TableCell>
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
        const idx = employees.findIndex(employee => employee._id === userToBeActedOn);
        if (employees[idx]) return `Employee: ${employees[idx].name}`;
        return "Employee info can't be found :("
    };

    const handleAlertClose = () => {
        setAction("");
        setUserToBeActedOn("");
        toggleAlert();
    };

    const handleAlertYes = () => {
        if (action === "Approve") {
            const formData = {
                "isApproved": action === "Approve",
                "isRejected": action === "DisApprove"
            };
            dispatch(updateEmployee(userToBeActedOn, formData))
                .then(
                    () => {
                        dispatch(loadRejectedEmployees());
                    }
                );
            handleAlertClose();
            return;
        }
        if (action === "Delete") {
            dispatch(deleteEmployee(userToBeActedOn))
                .then(
                    () => {
                        dispatch(loadRejectedEmployees())
                    }
                )
                .then(
                    () => {
                        dispatch(loadUnApprovedEmployees())
                    }
                )
                .then(
                    () => {
                        handleAlertClose();
                    }
                );
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
                <Typography color="inherit" >
                    Rejected Accounts
                </Typography>
                <Typography color="textPrimary">Employees Rejected Accounts</Typography>
            </Breadcrumbs>
            <Paper
                className={classes.toggleButtonContainer}
                elevation={0}
            >
                <Button
                    className={classes.unSelectedButton}
                    onClick={() => {
                        props.history.push("/admin/rejected-accounts/students-accounts");
                    }}
                >
                    Students Accounts
                </Button>
                <Button
                    className={classes.selectedButton}
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
                                <TableCell align="center">Full name</TableCell>
                                <TableCell align="center">Designation</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Created at</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderRejectedRequests()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25]}
                    component='div'
                    count={employees.length}//{staff.length}
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

export default withRouter(withStyles(styles)(EmployeesRejectedAccounts));