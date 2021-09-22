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


function StudentStaff(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [renderComponent, setRenderComponent] = useState("active");

    const dispatch = useDispatch();
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);
    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrorMsg = useSelector(state => state.ui.error.errorMessage);

    const isLoading = staffLoading
    const isError = staffErr || uiError
    const errorMsg = staffErrMsg || uiErrorMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Staff"));
        if (staff.length === 0) dispatch(loadStaffs());
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
                <TableCell align="center"
                    className={classes.clickAble}
                    onClick={
                        () => {
                            props.history.push(`/employee/staff/${user._id}`);
                        }
                    }
                >
                    {user.employee.name}
                </TableCell>
                <TableCell align="center">{user.employee.department}</TableCell>
                <TableCell align="center">{user.employee.designation}</TableCell>
                <TableCell align="center">{user.inChargeOf}</TableCell>
                <TableCell align="right">
                    <Tooltip arrow title="View Schedule" classes={toolTipClasses}>
                        <IconButton
                            className={classes.timeTableButton}
                            onClick={() => {
                                props.history.push(`/employee/staff/${user._id}/schedule`);
                            }}
                        >
                            <ScheduleIcon />
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
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">Full name</TableCell>
                                <TableCell align="center">Department</TableCell>
                                <TableCell align="center">Designation</TableCell>
                                <TableCell align="center">Incharge of</TableCell>
                                <TableCell align="center"></TableCell>
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
        </div>
    );
}

export default withRouter(withStyles(styles)(StudentStaff));