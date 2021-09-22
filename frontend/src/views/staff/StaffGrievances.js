import { Backdrop, Breadcrumbs, Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { loadGrievances } from '../../store/grievances/grievances';
import styles from "../../styles/adminStyles/AdminGrievancesStyles";
import { Link, withRouter } from "react-router-dom";
import ToolTipStyles from "../helpers/ToolTipStyles";
import moment from "moment";
import ApproveIcon from "../../resources/design-icons/ApproveIcon";
import DisApproveIcon from "../../resources/design-icons/DisApproveIcon";
import { loadStudents } from "../../store/users/students";
import { loadStaffs } from "../../store/users/staffs";
import { loadEmployees } from "../../store/users/employees";
import { Visibility } from "@material-ui/icons";
import mBusinessDay from 'moment-business-days';
import SearchBar from "material-ui-search-bar";
import DelayedIcon from "../../resources/design-icons/DelayedIcon";
import PauseIcon from "../../resources/design-icons/PauseIcon";
import SolvedIcon from "../../resources/design-icons/SolvedIcon";


function StaffGrievances(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [renderComponent, setRenderComponet] = useState("all");

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();
    const grievances = useSelector(state => state.entities.grievances.list);
    const grievancesLoading = useSelector(state => state.entities.grievances.loading);
    const grievancesErr = useSelector(state => state.entities.grievances.isError);
    const grievancesErrMsg = useSelector(state => state.entities.grievances.errorMessage);
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);
    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const employees = useSelector(state => state.entities.users.employees.list);
    const employeesLoading = useSelector(state => state.entities.users.employees.loading);
    const employeesErr = useSelector(state => state.entities.users.employees.isError);
    const employeesErrMsg = useSelector(state => state.entities.users.employees.errorMessage);
    const currentUser = useSelector(state => state.auth.user);

    const isLoading = grievancesLoading || staffLoading || studentsLodaing || employeesLoading;

    useEffect(() => {
        dispatch(drawerSelectionChanged("Grievances"));
        if (grievances.length === 0) dispatch(loadGrievances());
        if (students.length === 0) dispatch(loadStudents());
        if (staff.length === 0) dispatch(loadStaffs());
        if (employees.length === 0) dispatch(loadEmployees());
    }, []);

    const handleSearchChange = e => {
        setSearch(e.target.value);
    };

    const handleClick = e => {
        if (e.target.innerHTML === "All Grievances") setRenderComponet("all");
        if (e.target.innerHTML === "Closed Grievances") setRenderComponet("closed");
        if (e.target.innerHTML === "Delayed Grievances") setRenderComponet("delayed");
        if (e.target.innerHTML === "Pending Grievances") setRenderComponet("pending");
        if (e.target.innerHTML === "Paused Grievances") setRenderComponet("paused");
    };

    const getInchargeName = inchargeId => {
        const index = staff.findIndex(user => user._id === inchargeId);
        if (staff[index]) return staff[index].employee.name;
        return "Incharge Name can't be found!"
    };

    const isDelayed = (grievance) => {
        return mBusinessDay(moment(grievance.lastUpdated)).businessDiff(moment()) > 3 && !grievance.isClosed && !grievance.isPaused;
    }

    const getLodgerName = lodgerId => {
        const lodgers = [...students, ...employees];
        const index = lodgers.findIndex(user => user._id === lodgerId);
        if (lodgers[index]) return lodgers[index].name
        return "Lodger name can't be found!";
    };

    const getCount = () => {
        const concernedGrievances = grievances.filter(grievance => grievance.category.incharge === currentUser._id);
        const pendingGrievances = concernedGrievances.filter(grievance => !grievance.isClosed);
        const closedGrievances = concernedGrievances.filter(grievance => grievance.isClosed === true);
        const delayedGrievances = concernedGrievances.filter(grievance => isDelayed(grievance) === true);
        const pausedGrievances = concernedGrievances.filter(grievance => grievance.isPaused);
        let renderingGrievances = [];
        if (renderComponent === "all") renderingGrievances = concernedGrievances;
        if (renderComponent === "closed") renderingGrievances = closedGrievances;
        if (renderComponent === "delayed") renderingGrievances = delayedGrievances;
        if (renderComponent === "pending") renderingGrievances = pendingGrievances;
        if (renderComponent === "paused") renderingGrievances = pausedGrievances;
        if (search !== "") renderingGrievances = renderingGrievances.filter(grievance => `${grievance.ticket}`.includes(search));
        return renderingGrievances.length;
    };

    const renderGrievances = () => {
        const concernedGrievances = grievances.filter(grievance => grievance.category.incharge === currentUser._id);
        const pendingGrievances = concernedGrievances.filter(grievance => !grievance.isClosed);
        const closedGrievances = concernedGrievances.filter(grievance => grievance.isClosed === true);
        const delayedGrievances = concernedGrievances.filter(grievance => isDelayed(grievance) === true);
        const pausedGrievances = concernedGrievances.filter(grievance => grievance.isPaused);
        let renderingGrievances = [];
        if (renderComponent === "all") renderingGrievances = concernedGrievances;
        if (renderComponent === "closed") renderingGrievances = closedGrievances;
        if (renderComponent === "delayed") renderingGrievances = delayedGrievances;
        if (renderComponent === "pending") renderingGrievances = pendingGrievances;
        if (renderComponent === "paused") renderingGrievances = pausedGrievances;
        if (search !== "") renderingGrievances = renderingGrievances.filter(grievance => `${grievance.ticket}`.includes(search));
        let count = page * rowsPerPage;
        const list = renderingGrievances.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(grievance => (
            <TableRow key={grievance._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">{grievance.ticket}</TableCell>
                <TableCell align="center">{grievance.title}</TableCell>
                <TableCell align="center">{grievance.category.name}</TableCell>
                <TableCell align="center">{`${moment(grievance.lodgingDate).format("DD.MM.YYYY @ HH:mm")}`}</TableCell>
                <TableCell align="center">{grievance.status}</TableCell>
                <TableCell align="center">{getInchargeName(grievance.category.incharge)}</TableCell>
                <TableCell align="center">{getLodgerName(grievance.lodgedBy)}</TableCell>
                <TableCell align="right" >
                    {
                        grievance.isClosed && <Tooltip arrow title="Closed" classes={toolTipClasses}>
                            <IconButton
                            >
                                <SolvedIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        isDelayed(grievance) && <Tooltip arrow title="Delayed" classes={toolTipClasses}>
                            <IconButton
                            >
                                <DelayedIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    {
                        grievance.isPaused && <Tooltip arrow title="Paused" classes={toolTipClasses}>
                            <IconButton
                            >
                                <PauseIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    <Tooltip arrow title="View Details" classes={toolTipClasses}>
                        <IconButton
                            className={classes.deleteButton}
                            onClick={
                                () => {
                                    props.history.push(`/staff/grievances/${grievance._id}`);
                                }
                            }
                        >
                            <Visibility />
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
                <Typography color="inherit">
                    Staff Home
                </Typography>
                <Typography color="inherit">Grievances</Typography>
                {renderComponent === "all" && <Typography color="textPrimary">All Grievances</Typography>}
                {renderComponent === "closed" && <Typography color="textPrimary">Closed Grievances</Typography>}
                {renderComponent === "pending" && <Typography color="textPrimary">Pending Grievances</Typography>}
                {renderComponent === "paused" && <Typography color="textPrimary">Paused Grievances</Typography>}
                {renderComponent === "delayed" && <Typography color="textPrimary">Delayed Grievances</Typography>}
            </Breadcrumbs>
            <Paper
                className={classes.toggleButtonContainer}
                elevation={0}
            >
                <Button
                    className={renderComponent === "all" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    All Grievances
                </Button>
                <Button
                    className={renderComponent === "pending" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Pending Grievances
                </Button>
                <Button
                    className={renderComponent === "paused" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Paused Grievances
                </Button>
                <Button
                    className={renderComponent === "closed" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Closed Grievances
                </Button>
                <Button
                    className={renderComponent === "delayed" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Delayed Grievances
                </Button>
            </Paper>
            <div className={classes.pageHeading}>
                <h1>Grievances</h1>
            </div>
            <div className={classes.searchBarContainer}>
                <SearchBar
                    className={classes.nameSearch}
                    value={search}
                    placeholder="Search by Ticket#"
                    onChange={(newValue) => { setSearch(newValue) }}
                    onCancelSearch={() => { setSearch("") }}
                />
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center">Ticket#</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Category</TableCell>
                                <TableCell align="center">Date Lodged</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Incharge</TableCell>
                                <TableCell align="center">Lodged By</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderGrievances()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25]}
                    component='div'
                    count={getCount()}//{staff.length}
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

export default withRouter(withStyles(styles)(StaffGrievances));