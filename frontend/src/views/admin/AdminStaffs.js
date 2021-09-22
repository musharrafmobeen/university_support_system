import {
    Avatar,
    Backdrop, Breadcrumbs, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link,
    Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, Tooltip, Typography, withStyles
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { addStaff, deleteStaff, loadStaffs } from "../../store/users/staffs";
import styles from "../../styles/adminStyles/AdminStaffsStyles";
import configData from '../../config.json';
import ApproveIcon from "../../resources/design-icons/ApproveIcon";
import RemoveIcon from "../../resources/design-icons/RemoveIcon";
import ToolTipStyles from "../helpers/ToolTipStyles";
import AlertMesssageDialog from '../helpers/AlertMessageDialog';
import useToggleState from '../../hooks/useToggleState';
import StaffForm from "../helpers/StaffForm";
import { errorOccured, errorReset } from "../../store/ui/error";
import { loadCategories } from "../../store/categories/categories";
import ScheduleIcon from "../../resources/design-icons/ScheduleIcon";
import { withRouter } from "react-router-dom";
import { loadRatings } from "../../store/staffRatings/staffRatings";
import StarIcon from "../../resources/design-icons/StarIcon";


function AdminStafffs(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [renderComponent, setRenderComponent] = useState("active");

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [openStaffForm, toggleStaffForm] = useToggleState(false);

    const [alert, toggleAlert] = useToggleState(false);

    const [staffToRemove, setStaffToRemove] = useState("");

    const [employee, setEmployee] = useState("");
    const [staffCategory, setStaffCategory] = useState("");
    const [isAvailable, setIsAvailable] = useState("true");

    const dispatch = useDispatch();
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);

    const staffRatings = useSelector(state => state.entities.ratings.list);
    const staffRatingsLoading = useSelector(state => state.entities.ratings.loading);
    const staffRatingsErr = useSelector(state => state.entities.ratings.isError);
    const staffRatingsErrMsg = useSelector(state => state.entities.ratings.errorMessage);

    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrorMsg = useSelector(state => state.ui.error.errorMessage);

    const isLoading = staffLoading || staffRatingsLoading
    const isError = staffErr || uiError || staffRatingsErr
    const errorMsg = staffErrMsg || uiErrorMsg || staffRatingsErrMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Staff"));
        if (staff.length === 0) dispatch(loadStaffs());
        if (staffRatings.length === 0) dispatch(loadRatings());
    }, []);

    const getCount = () => {
        const inActiveStaff = staff.filter(user => user.isAvailable === false);
        const activeStaff = staff.filter(user => user.isAvailable === true);
        let renderingStaff = [];
        if (renderComponent === "active") renderingStaff = activeStaff;
        if (renderComponent === "outOfOffice") renderingStaff = inActiveStaff;
        return renderingStaff.length;
    };

    const handleClick = e => {
        if (e.target.innerHTML === "Active") setRenderComponent("active");
        if (e.target.innerHTML === "Out of Office") setRenderComponent("outOfOffice");
    };

    const getAverage = ratings => {
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
            sum = sum + ratings[i];
        }
        let average = sum / ratings.length
        return average;
    };

    const getRating = id => {
        const idx = staffRatings.findIndex(rating => rating.staff === id);
        if (staffRatings[idx]) return <div className={classes.ratingStar}>
            <StarIcon className={classes.starIcon}/>
            <Typography>{getAverage(staffRatings[idx].rating)} out of {staffRatings[idx].ratingCount} rating(s)</Typography>
        </div>
        return "No ratings yet!"
    };

    const renderStaff = () => {
        let count = page * rowsPerPage;
        const inActiveStaff = staff.filter(user => user.isAvailable === false);
        const activeStaff = staff.filter(user => user.isAvailable === true);
        let renderingStaff = [];
        if (renderComponent === "active") renderingStaff = activeStaff;
        if (renderComponent === "outOfOffice") renderingStaff = inActiveStaff;
        const list = renderingStaff.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(user => (
            <TableRow key={user.employee._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">
                    <Avatar
                        src={user.employee.employeeImage ? `${configData.url.baseUrl}/${user.employee.employeeImage}` : ""}
                        alt={user.employee.name}
                    />
                </TableCell>
                <TableCell align="center">{user.employee.employee_ID}</TableCell>
                <TableCell align="center"
                    className={classes.clickAble}
                    onClick={
                        () => {
                            props.history.push(`/admin/staff/${user._id}`);
                        }
                    }
                >{user.employee.name}</TableCell>
                <TableCell align="center">{user.employee.department}</TableCell>
                <TableCell align="center">{user.employee.designation}</TableCell>
                <TableCell align="center">{user.inChargeOf}</TableCell>
                <TableCell align="center">{user.employee.email}</TableCell>
                <TableCell align="center">{getRating(user._id)}</TableCell>
                <TableCell align="right" >
                    <Tooltip arrow title="View Schedule" classes={toolTipClasses}>
                        <IconButton
                            className={classes.timeTableButton}
                            onClick={() => {
                                props.history.push(`/admin/staff/${user._id}/schedule`);
                            }}
                        >
                            <ScheduleIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Delete" classes={toolTipClasses}>
                        <IconButton
                            className={classes.deleteButton}
                            onClick={
                                () => {
                                    setStaffToRemove(user);
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

    const validateStaff = () => {
        if (employee === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate employee!",
                statusCode: 502
            }));
            return false;
        }
        if (staffCategory === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate category!",
                statusCode: 502
            }));
            return false;
        }
        dispatch(errorReset());
        return true;
    };

    const handleStaffFormClose = () => {
        setEmployee("");
        setStaffCategory("");
        setIsAvailable("true");
        toggleStaffForm();
    };

    const handleSaveStaff = () => {
        if (!validateStaff()) return;
        const staff = {
            employee,
            inChargeOf: staffCategory,
            isAvailable: isAvailable === "true"
        };
        dispatch(errorReset())
            .then(
                () => {
                    dispatch(addStaff(staff))
                        .then(
                            () => {
                                if (isError) {
                                    setSnackMsg("Staff addition failed!");
                                    setSnack(true);
                                    return;
                                }
                                setSnackMsg("Staff added Successfully!");
                                setSnack(true)
                                handleStaffFormClose();
                                return;
                            }
                        );
                }
            ).then(
                dispatch(loadCategories())
            );
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const getUserInfo = () => {
        const user = staffToRemove.employee;
        if (user) return `Saff: ${user.name}`;
        return "Staff info can't be found :("
    };

    const handleAlertClose = () => {
        setStaffToRemove("");
        toggleAlert();
    };

    const handleAlertYes = () => {
        // dispatch(deleteStudent(userToBeActedOn))
        //     .then(
        //         () => {
        //             dispatch(loadRejectedStudents())
        //         }
        //     )
        //     .then(
        //         () => {
        //             dispatch(loadUnApprovedStudents())
        //         }
        //     );

        dispatch(errorReset())
            .then(
                dispatch(deleteStaff(staffToRemove._id))
            )
            .then(
                () => {
                    if (isError) {
                        setSnackMsg("Staff deletion failed! " + "\n" + errorMsg);
                        setSnack(true);
                        return;
                    }
                    setSnackMsg("Staff deleted Successfully!");
                    setSnack(true);
                    handleAlertClose();
                    return;
                }
            );
        return;
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
                    Staff
                </Typography>
                <Typography color="textPrimary">{renderComponent === "active" ?
                    "Active Staff"
                    :
                    "Out of Office Staff"
                }</Typography>
            </Breadcrumbs>
            <Paper
                className={classes.toggleButtonContainer}
                elevation={0}
            >
                <Button
                    className={renderComponent === "active" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Active
                </Button>
                <Button
                    className={renderComponent === "outOfOffice" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Out of Office
                </Button>
            </Paper>
            <div className={classes.pageHeading}>
                <h1>Staff</h1>
                <Button
                    className={classes.btnAddNewStaff}
                    onClick={() => {
                        toggleStaffForm();
                    }}
                >Add new Staff</Button>
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">Employee ID</TableCell>
                                <TableCell align="center">Full name</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="center">Designation</TableCell>
                                <TableCell align="center">Incharge of</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Rating</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderStaff()}
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
                    title: `Do you really want to Delete this User?`,
                    content: getUserInfo(),
                }}
                handleCancel={handleAlertClose}
                handleYes={handleAlertYes}
            />
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                open={openStaffForm}
            >
                <DialogTitle>
                    <Typography
                        className={classes.dialogTitleText}
                    >New Staff</Typography>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    {isError && <div className={classes.error}>
                        <Typography>{errorMsg}</Typography>
                    </div>}
                    <StaffForm
                        values={{
                            employee,
                            setEmployee,
                            staffCategory,
                            setStaffCategory,
                            isAvailable,
                            setIsAvailable
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleStaffFormClose}
                    >
                        BackPage
                    </Button>
                    <Button
                        onClick={handleSaveStaff}
                        className={classes.formBtnSave}
                    >
                        Save Staff
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

export default withRouter(withStyles(styles)(AdminStafffs));