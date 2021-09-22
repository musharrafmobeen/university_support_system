import { Breadcrumbs, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Typography, withStyles } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadChats } from "../../store/chats/chats";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { loadStudents } from "../../store/users/students";
import styles from "../../styles/staffStyles/StaffChatStyles";
import ToolTipStyles from "../helpers/ToolTipStyles";


function StaffChat(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const chats = useSelector(state => state.entities.chats.list);
    const chatsLoading = useSelector(state => state.entities.chats.loading);
    const chatsErr = useSelector(state => state.entities.chats.isError);
    const chatsErrMsg = useSelector(state => state.entities.chats.errorMessage);
    const currentUser = useSelector(state => state.auth.user);

    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);

    const isLoading = chatsLoading || studentsLodaing

    useEffect(() => {
        dispatch(drawerSelectionChanged("Messages"));
        if (chats.length === 0) dispatch(loadChats());
        if (students.length === 0) dispatch(loadStudents());
    }, []);

    const getConcernedMessages = () => {
        const concernedChats = chats.filter(chat => chat.reciever === currentUser._id);
        return concernedChats;
    };

    const getSenderName = id => {
        const index = students.findIndex(user => user._id === id);
        if (students[index]) return students[index].name
        return "Sender name can't be found!";
    };

    const getCount = () => {
        const concernedChats = getConcernedMessages();
        return concernedChats.length;
    };

    const renderChats = () => {
        const concernedChats = getConcernedMessages();
        const sorted = concernedChats.slice().sort(function (a, b) {
            var dateA = new Date(a.message[a.message.length - 1].sendTime), dateB = new Date(b.message[b.message.length - 1].sendTime);
            return dateB - dateA;
        });
        let count = page * rowsPerPage;
        const list = sorted.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(chat => (
            <TableRow key={chat._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">{getSenderName(chat.sender)}</TableCell>
                <TableCell align="right" >
                    <Tooltip arrow title="View Messages" classes={toolTipClasses}>
                        <IconButton
                            className={classes.deleteButton}
                            onClick={
                                () => {
                                    props.history.push(`/staff/messages/${chat._id}`);
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
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Typography color="inherit">
                    Staff Home
                </Typography>
                <Typography color="textPrimary">Chats</Typography>
            </Breadcrumbs>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center">Sender</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderChats()}
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

export default withRouter(withStyles(styles)(StaffChat));