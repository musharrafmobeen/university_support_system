import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { connect } from 'react-redux';
import { addTimeTable, deleteTimeTable, loadTimeTable, updateTimeTable } from '../../store/timeTable/appointments';
import { Backdrop, Breadcrumbs, Button, CircularProgress, Snackbar, Typography, withStyles } from '@material-ui/core';
import styles from '../../styles/staffStyles/StaffTimeTableStyles';
import {
    messages,
    BooleanEditor,
    TextEditor,
    BasicLayout
} from '../helpers/CustomAppointmentFormFields';
import moment from 'moment';
import { drawerSelectionChanged } from '../../store/ui/drawer';
import { loadAppointmentsRequests } from '../../store/appointmentsRequests/appointmentsRequsets';

// import { appointments } from '../../../demo-data/appointments';
class Try extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentDate: moment().format("YYYY-MM-DD").toString(),//'2021-08-16',
            currentStaff: "",
            timeTableId: "",
            snackMsg: "",
            openSnack: false,
            loading: true,
        };

        this.commitChanges = this.commitChanges.bind(this);
        this.saveTimeTable = this.saveTimeTable.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.getStudentName = this.getStudentName.bind(this);
        this.getRequesteeList = this.getRequesteeList.bind(this);
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
            let { data } = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, { id: startingAddedId, ...added }];
            }
            if (changed) {
                data = data.map(appointment => (
                    changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            return { data };
        });
        // console.log(this.state.data);
    }

    saveTimeTable() {
        const list = this.state.data.map(entery => ({
            startDate: `${moment(entery.startDate).format("YYYY-MM-DDTHH:mm")}`,
            endDate: `${moment(entery.endDate).format("YYYY-MM-DDTHH:mm")}`,
            title: entery.title,
            id: entery.id,
            attendee: entery.attendee,
            description: entery.description
        }));
        console.log("list", list);
        if (this.state.currentStaff !== "") {
            this.setState(state => ({ ...state, loading: true }));
            const timeTable = {
                timetable: list
            };
            this.props.updateTimeTable(this.state.timeTableId, timeTable).then(
                () => {
                    if (this.props.appointErr) {
                        this.setState(state => ({
                            ...state,
                            snackMsg: "Time Table could not be saved!",
                            openSnack: true,
                            loading: false
                        }));
                        return;
                    }
                    this.setState(state => ({
                        ...state,
                        snackMsg: "Time Table saved Successfully!",
                        openSnack: true,
                        loading: false
                    }));
                    return;
                }
            );
        }
        else {
            console.log("CurrentStaff", this.state.currentStaff);
        }


    }

    componentDidMount() {
        // this.props.drawerSelectionChanged("Time-Table");
        if (this.props.appointments.length === 0) this.props.loadTimeTable();
        if (this.props.appoitnmentRequests.length === 0) this.props.loadAppointmentsRequests();
        const currentStaff = this.props.currentAuth;
        if (currentStaff.employee) {
            const index = this.props.appointments.findIndex(timeTab => timeTab.employee === currentStaff.employee._id);
            const timeTable = this.props.appointments[index] ? this.props.appointments[index].timetable : [];
            const employee = this.props.appointments[index] ? this.props.appointments[index].employee : "";
            const timeTableId = this.props.appointments[index] ? this.props.appointments[index]._id : "";
            this.setState(state => ({
                ...state,
                data: timeTable,
                currentStaff: employee,
                timeTableId: timeTableId,
                loading: false
            }));
        }
        if (this.props.staff) {
            const index = this.props.appointments.findIndex(timeTab => timeTab.employee === this.props.staff.employee._id);
            const timeTable = this.props.appointments[index] ? this.props.appointments[index].timetable : [];
            const employee = this.props.appointments[index] ? this.props.appointments[index].employee : "";
            const timeTableId = this.props.appointments[index] ? this.props.appointments[index]._id : "";
            this.setState(state => ({
                ...state,
                data: timeTable,
                currentStaff: employee,
                timeTableId: timeTableId,
                loading: false
            }));
        }
    }

    // getCurrentStaffTimeTable() {
    //     const currentStaff = this.props.currentAuth;
    //     const index = this.props.appointments.findIndex(timeTab => timeTab.employee === currentStaff.employee._id);
    //     const timeTable = this.props.appointments[index] ? this.props.appointments[index].timetable : [];
    //     const employee = this.props.appointments[index] ? this.props.appointments[index].employee : "";
    //     const timeTableId = this.props.appointments[index] ? this.props.appointments[index]._id : "";
    //     this.setState(state => ({
    //         ...state,
    //         data: timeTable,
    //         currentStaff: employee,
    //         timeTableId: timeTableId,
    //         loading: false
    //     }));

    //     return timeTable;
    // }

    stopLoading() {
        this.setState(state => ({
            ...state,
            loading: false
        }))
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState(state => ({
            ...state,
            snackMsg: "",
            openSnack: false
        }));
    };

    getStudentName(studentId) {
        const index = this.props.students.findIndex(std => std._id === studentId);
        if (this.props.students[index]) return this.props.students[index].name;
        return "Student Name can't be found!"
    };
    getRequesteeList() {
        const requestees = this.props.appoitnmentRequests.filter(req => req.staff === this.props.currentAuth._id && !req.isGranted);
        const list = requestees.map(request => (
            {
                id: request.student,
                text: this.getStudentName(request.student)
            }
        ));
        return list;
    };

    render() {
        const { currentDate, data } = this.state;
        // const appointmentData = this.getCurrentStaffTimeTable();
        this.stopLoading();
        const viewMode = this.props.readOnly;
        const { classes } = this.props;
        const isLoading = this.props.appointmentsLoading || this.state.loading
        const isError = this.props.appointErr;
        const errorMsg = this.props.appointErrMsg;

        return (
            <Paper className={classes.rootPaper}>
                {
                    !viewMode && <div>
                        <Paper elevation={0} className={classes.alert}>
                            <Typography className={classes.messageText}>
                                Do Not Forget to Save timetable,<i> after editing</i>, before you leave this page!
                            </Typography>
                        </Paper>
                        <div>
                            <Typography>Appointment Requests: {this.getRequesteeList().length}</Typography>
                        </div>
                        <Paper
                            className={classes.toggleButtonContainerSchedule}
                            elevation={0}
                        >
                            <Button
                                className={classes.selectedButton}
                                onClick={this.saveTimeTable}
                            >
                                Save TimeTable
                            </Button>
                        </Paper>
                    </div>
                }
                <div>
                    <Scheduler
                        data={data}
                        height={660}
                    >
                        <ViewState
                            currentDate={currentDate}
                        />
                        <EditingState
                            onCommitChanges={this.commitChanges}
                        />
                        <IntegratedEditing />
                        <WeekView
                            startDayHour={8}
                            endDayHour={21}
                            excludedDays={[0, 6]}
                        />
                        {!viewMode && <ConfirmationDialog />}
                        <Appointments
                            readOnly={viewMode}
                        />
                        <AppointmentTooltip
                            showOpenButton={!viewMode}
                            showDeleteButton={!viewMode}
                            showCloseButton
                        />
                        <AppointmentForm
                            readOnly={viewMode}
                            booleanEditorComponent={BooleanEditor}
                            basicLayoutComponent={BasicLayout(this.getRequesteeList())}
                            textEditorComponent={TextEditor}
                            messages={messages}
                        />
                    </Scheduler>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.openSnack}
                    autoHideDuration={3000}
                    onClose={this.handleSnackClose}
                    message={this.state.snackMsg}
                />
            </Paper>
        );
    }
}

const mapStateToProps = state => ({
    appointments: state.entities.appointments.list,
    appointmentsLoading: state.entities.appointments.appointmentsLoading,
    appointErr: state.entities.appointments.isError,
    appointErrMsg: state.entities.appointments.errorMessage,
    currentAuth: state.auth.user,
    appoitnmentRequests: state.entities.appointmentsRquest.list,
    students: state.entities.users.students.list
});

const mapDispatchToProps = dispatch => ({
    deleteTimeTable: (appointmentId) => dispatch(deleteTimeTable(appointmentId)),
    updateTimeTable: (appointId, appointment) => dispatch(updateTimeTable(appointId, appointment)),
    addTimeTable: (appointment) => dispatch(addTimeTable(appointment)),
    loadTimeTable: () => dispatch(loadTimeTable()),
    drawerSelectionChanged: selection => dispatch(drawerSelectionChanged(selection)),
    loadAppointmentsRequests: () => dispatch(loadAppointmentsRequests()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Try));