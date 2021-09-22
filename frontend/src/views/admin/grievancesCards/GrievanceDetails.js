import {
    Backdrop, Breadcrumbs, CircularProgress, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Typography, withStyles,
    Link
} from "@material-ui/core";
import styles from "../../../styles/adminStyles/grievanceCardStyles/GrievanceDetailsStyles";
import MUIRichTextEditor from "mui-rte";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { loadGrievances } from "../../../store/grievances/grievances";
import { loadStudents } from "../../../store/users/students";
import { loadStaffs } from "../../../store/users/staffs";
import { loadEmployees } from "../../../store/users/employees";
import { useEffect } from "react";
import moment from "moment";
import mBusinessDay from 'moment-business-days';


function GrievanceDetails(props) {
    const { classes } = props;

    const currentGrievanceId = props.match.params.id;

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

    const isLoading = grievancesLoading || staffLoading || studentsLodaing || employeesLoading;

    useEffect(() => {
        dispatch(drawerSelectionChanged("Grievances"));
        if (grievances.length === 0) dispatch(loadGrievances());
        if (students.length === 0) dispatch(loadStudents());
        if (staff.length === 0) dispatch(loadStaffs());
        if (employees.length === 0) dispatch(loadEmployees());
    }, []);


    const save = (data) => {
        console.log(data);
    };

    const getInchargeName = inchargeId => {
        const index = staff.findIndex(user => user._id === inchargeId);
        if (staff[index]) return staff[index].employee.name;
        return "Incharge Name can't be found!"
    };

    const getLodgerName = lodgerId => {
        const lodgers = [...students, ...employees];
        const index = lodgers.findIndex(user => user._id === lodgerId);
        if (lodgers[index]) return lodgers[index].name
        return "Lodger name can't be found!";
    };

    const getCurrentGrievance = () => {
        const index = grievances.findIndex(grievance => grievance._id === currentGrievanceId);
        if (grievances[index]) return grievances[index];

    };

    const currentGrievance = getCurrentGrievance();


    const renderHistory = () => {
        if (currentGrievance) {
            if (currentGrievance.history.length === 0) return <Paper className={classes.noHistory}><Typography>No history found !</Typography></Paper>
            return currentGrievance.history.map((historyItem, index) => (
                <TableRow key={index} component={Paper} className={classes.infoDataRow}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="center">{historyItem.message}</TableCell>
                    <TableCell align="center">{historyItem.status}</TableCell>
                    <TableCell align="center">{`${moment(historyItem.date).format("DD.MM.YYYY @ HH:mm")}`}</TableCell>
                </TableRow>
            ));
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
                <Typography color="inherit">
                    Admin Home
                </Typography>
                <Typography color="inherit">
                    Grievances
                </Typography>
                <Typography color="textPrimary">Grievance Details</Typography>
            </Breadcrumbs>
            {currentGrievance && <>
                {
                    mBusinessDay(moment(currentGrievance.lastUpdated)).businessDiff(moment()) > 3 && !currentGrievance.isClosed && !currentGrievance.isPaused ?
                        <Paper elevation={0}
                            className={classes.delayedGrievance}
                        >
                            <Typography className={classes.delayMsg}>This grievance is Being Delayed!</Typography>
                        </Paper>
                        :
                        ''
                }
                {
                    currentGrievance.isClosed ?
                        <Paper elevation={0}
                            className={classes.solvedGrievance}
                        >
                            <Typography className={classes.solveMsg}>This grievance has been marked as Solved!</Typography>
                        </Paper>
                        :
                        ''
                }
                {
                    currentGrievance.isPaused ?
                        <Paper elevation={0}
                            className={classes.pausedGrievance}
                        >
                            <Typography className={classes.pauseMsg}>This grievance has been Paused!</Typography>
                        </Paper>
                        :
                        ''
                }
                <div className={classes.infoRowContainer}>
                    <Typography type="h4">Ticket# {currentGrievance.ticket}</Typography>
                    <div className={classes.tableContainer}>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow className={`${classes.tableHeading} ${classes.infoHead}`}>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Category</TableCell>
                                        <TableCell align="center">Incharge</TableCell>
                                        <TableCell align="center">Date Lodged</TableCell>
                                        <TableCell align="center">Lodged By</TableCell>
                                        <TableCell align="center">Current Status</TableCell>
                                        <TableCell align="center">Last Updated</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow component={Paper} className={classes.infoDataRow}>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >{currentGrievance.title}</TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >{currentGrievance.category.name}</TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >{getInchargeName(currentGrievance.category.incharge)}</TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >{
                                                moment(currentGrievance.lodgingDate).format("DD.MM.YYYY @ HH:mm")
                                            }</TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >{getLodgerName(currentGrievance.lodgedBy)}</TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >
                                            {
                                                currentGrievance.status
                                            } {currentGrievance.isClosed && "(Closed)"}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.capitalized}
                                        >{
                                                moment(currentGrievance.lastUpdated).format("DD.MM.YYYY @ HH:mm")
                                            }</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <div>
                    <Paper elevation={0} className={classes.descriptionContainer}>
                        <Typography><b>Grievance Description:</b></Typography>
                        <MUIRichTextEditor
                            // label="Type something here..."
                            // onSave={save}
                            inlineToolbar={false}
                            defaultValue={currentGrievance.description}
                            readOnly
                        />
                    </Paper>
                </div>
                <div className={classes.tableContainer}>
                    <Typography><b>Grievance History:</b></Typography>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.tableHeading}>
                                    <TableCell align="left">No.</TableCell>
                                    <TableCell align="center">Message</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Dated</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderHistory()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </>}
        </div>
    );
}

export default withRouter(withStyles(styles)(GrievanceDetails));