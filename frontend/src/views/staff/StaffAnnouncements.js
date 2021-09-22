import { Backdrop, Breadcrumbs, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, withStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MakeAnnouncementIcon from "../../resources/design-icons/MakeAnnouncementIcon";
import { addAnnouncement, deleteAnnouncement, loadAnnouncements } from "../../store/announcements/announcements";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { loadStaffs } from "../../store/users/staffs";
import ToolTipStyles from "../helpers/ToolTipStyles";
import styles from "../../styles/adminStyles/AdminAnnouncementsStyles";
import RemoveIcon from "../../resources/design-icons/RemoveIcon";
import useToggleState from '../../hooks/useToggleState';
import AlertMessageDialog from "../helpers/AlertMessageDialog";
import AnnouncementForm from "../helpers/AnnouncementForm";
import { errorOccured, errorReset } from "../../store/ui/error";
import moment from "moment";


function AdminAnnouncements(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openAnnouncementForm, toggleAnnouncementForm] = useToggleState(false);

    const [announcement, setAnnouncement] = useState("");
    const [announcementFor, setAnnouncementFor] = useState("");

    const [openAlert, toggleAlert] = useToggleState(false);

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const [announToRemove, setAnnounToRemove] = useState("");

    const [renderComponent, setRenderComponet] = useState("all");

    const dispatch = useDispatch();
    const announcements = useSelector(state => state.entities.announcements.list);
    const announcmentsLoading = useSelector(state => state.entities.announcements.loading);
    const announcmentsErr = useSelector(state => state.entities.announcements.isError);
    const announcmentsErrMsg = useSelector(state => state.entities.announcements.errorMessage);
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);
    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrorMsg = useSelector(state => state.ui.error.errorMessage);

    useEffect(() => {
        dispatch(drawerSelectionChanged("Announcements"));
        if (announcements.length === 0) dispatch(loadAnnouncements());
        if (staff.length === 0) dispatch(loadStaffs());
    }, []);

    const handleClick = e => {
        if (e.target.innerHTML === "All Announcements") setRenderComponet("all");
        if (e.target.innerHTML === "Staff Specific Announcments") setRenderComponet("staff");
    };

    const isLoading = announcmentsLoading || staffLoading;
    const isError = staffErr || uiError
    const errorMsg = staffErrMsg || uiErrorMsg


    const getAnnounceDets = () => {
        const idx = announcements.findIndex(announ => announ._id === announToRemove);
        if (announcements[idx]) return announcements[idx].announcement;
        return "can't find details!";
    };

    const getCount = () => {
        const sorted = announcements.slice().sort(function (a, b) {
            var dateA = new Date(a.dateCreated), dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
        const allowed = sorted.filter(announ => announ.visibleTo === "All");
        const StaffOnlyAnnoun = sorted.filter(announ => announ.visibleTo === "Staff");
        let concernedAnnoun = [];
        if (renderComponent === "all") concernedAnnoun = [...allowed, ...StaffOnlyAnnoun];
        if (renderComponent === "staff") concernedAnnoun = StaffOnlyAnnoun;
        return concernedAnnoun.length;
    };

    const renderAnnouncements = () => {
        const sorted = announcements.slice().sort(function (a, b) {
            var dateA = new Date(a.dateCreated), dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
        const allowed = sorted.filter(announ => announ.visibleTo === "All");
        const StaffOnlyAnnoun = sorted.filter(announ => announ.visibleTo === "Staff");
        let concernedAnnoun = [];
        if (renderComponent === "all") concernedAnnoun = [...allowed, ...StaffOnlyAnnoun];
        if (renderComponent === "staff") concernedAnnoun = StaffOnlyAnnoun;

        const concernedSorted = concernedAnnoun.slice().sort(function (a, b) {
            var dateA = new Date(a.dateCreated), dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });

        let count = page * rowsPerPage;
        const list = concernedSorted.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(announ => (
            <TableRow key={announ._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">{announ.announcement}</TableCell>
                <TableCell align="center">{announ.announcerType}</TableCell>
                <TableCell align="center">{moment(announ.dateCreated).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                <TableCell align="right" >
                </TableCell>
            </TableRow >));
        return list
    };

    const validateAnnouncement = () => {
        if (announcement === "") {
            dispatch(errorOccured({
                message: "Please provide an appropriate announcement!",
                statusCode: 502
            }));
            return false;
        }
        if (announcementFor === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate announcement audience!",
                statusCode: 502
            }));
            return false;
        }
        dispatch(errorReset());
        return true;
    };

    const handleAnnouncementFormClose = () => {
        setAnnouncement("");
        setAnnouncementFor("");
        toggleAnnouncementForm();
    };

    const saveAnnouncement = () => {
        if (!validateAnnouncement()) return;
        dispatch(errorReset());
        const announcementObj = {
            announcement,
            announcerType: "Staff member",
            visibleTo: announcementFor
        };
        dispatch(addAnnouncement(announcementObj)).then(
            () => {
                if (isError) {
                    setSnackMsg("Failed to create Announcement!");
                    setSnack(true);
                    return;
                }
                else {
                    setSnackMsg("Announcement created Successfully!");
                    setSnack(true);
                }
            }
        );
        handleAnnouncementFormClose();
    };

    const handleAlertClose = () => {
        setAnnounToRemove("");
        toggleAlert();
    };

    const removeAnnouncement = () => {
        if (announToRemove !== "") {
            dispatch(deleteAnnouncement(announToRemove)).then(
                () => {
                    if (isError) {
                        setSnackMsg("Failed to Delete Announcement!");
                        setSnack(true);
                        return;
                    }
                    else {
                        setSnackMsg("Announcement deleted Successfully!");
                        setSnack(true);
                    }
                }
            );
        }
        handleAlertClose();
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
                <Typography color="inherit">
                    Staff Home
                </Typography>
                <Typography color="textPrimary">Announcements</Typography>
            </Breadcrumbs>
            <Paper
                className={classes.toggleButtonContainer}
                elevation={0}
            >
                <Button
                    className={renderComponent === "all" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    All Announcements
                </Button>
                <Button
                    className={renderComponent === "staff" ? classes.selectedButton : classes.unSelectedButton}
                    onClick={handleClick}
                >
                    Staff Specific Announcments
                </Button>
            </Paper>
            <div className={classes.pageHeading}>
                <h1>Announcements</h1>
                <Button
                    className={classes.btnAddNewAnnouncement}
                    onClick={() => {
                        toggleAnnouncementForm();
                    }}
                >Add new Announcement</Button>
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center">Announcement</TableCell>
                                <TableCell align="center">Announcer</TableCell>
                                <TableCell align="center">Date created</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderAnnouncements()}
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
            <AlertMessageDialog
                values={
                    {
                        openAlert,
                        title: "Do you really want to Delete this Announcement?",
                        content: `Announcement: ${getAnnounceDets()}`
                    }
                }
                handleCancel={handleAlertClose}
                handleYes={removeAnnouncement}
            />
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                open={openAnnouncementForm}
            >
                <DialogTitle>
                    <Typography
                        className={classes.dialogTitleText}
                    >New Announcement</Typography>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    {isError && <div className={classes.error}>
                        <Typography>{errorMsg}</Typography>
                    </div>}
                    <AnnouncementForm
                        values={{
                            announcement,
                            setAnnouncement,
                            announcementFor,
                            setAnnouncementFor
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleAnnouncementFormClose}
                    >
                        BackPage
                    </Button>
                    <Button
                        onClick={saveAnnouncement}
                        className={classes.formBtnSave}
                    >
                        Save Announcement
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

export default withStyles(styles)(AdminAnnouncements)