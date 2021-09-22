import {
    Avatar, Box, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, Divider, Fab, Hidden,
    Paper, Typography, IconButton, withStyles, Snackbar
} from '@material-ui/core';
import React, { useState } from 'react';
import useToggleState from '../../hooks/useToggleState';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import UserProfileForm from './UserProfileForm';
import styles from '../../styles/helpersStyles/UserProfileStyles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateStaff } from '../../store/users/staffs';
import { getCurrentAuth } from '../../store/auth/auth';
import { updateAdmin } from '../../store/users/admins';
import { updateStudent } from '../../store/users/students';
import { updateEmployee } from '../../store/users/employees';
import { errorOccured, errorReset } from '../../store/ui/error';



function UserProfile(props) {
    const { classes } = props;
    const [openEditForm, toggleEditForm] = useToggleState(false);
    const [userToUpdate, setuserToUpdate] = useState("");
    const {
        id,
        userFirstName,
        userLastName,
        avatarSrc,
        email,
        designation,
        department,
        isCurrentUser,
        inChargeOf,
        isActive,
        userType,
        course,
        regNo,
        adminId
    } = props.values;
    const [userName, setUserName] = useState("");
    const [userGender, setUserGender] = useState("male");
    const [userPhone, setUserPhone] = useState("");
    const [userPass, setPassword] = useState("");
    const [userBranch, setBranch] = useState("");
    const [userDateOfBirth, setDateOfBirth] = useState(moment());
    const [userMail, setEmail] = useState("");
    const [userSocial, setSocial] = useState("");
    const [userRole, setUserRole] = useState("");
    const [isEdit, setEdit] = useState(false);
    const [isAvailable, setAvailable] = useState(false);
    const [passVisible, togglePassVision] = useToggleState(false);

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    // const isStudent = roles === "Student";
    // const isTeacher = roles === "Teacher";

    const dispatch = useDispatch();
    const uiErr = useSelector(state => state.ui.error.isError);
    const uiErMsg = useSelector(state => state.ui.error.errorMessage);
    const authToken = localStorage.getItem("token");
    const auth = useSelector(state => state.auth.user);

    const isError = uiErr;
    const errorMsg = uiErMsg;

    // const isCurrentUser = id === auth._id;

    const validateUser = () => {
        const nameRegExp = /^[a-zA-Z]+[ a-zA-Z]+$/; // /^([^0-9]*)$/;
        const passRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        if (userName === "") {
            dispatch(errorOccured({
                message: "Name cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!nameRegExp.test(userName)) {
            dispatch(errorOccured({
                message: "Invalid Name!",
                statusCode: 502
            }));
            return false;
        }
        if (userPass !== "" && !passRegExp.test(userPass)) {
            dispatch(errorOccured({
                message: "Password must \nbe atleast 6 charactors long!\nhave one uppercase charactor!\nhave one lowercase character!\nhave one digit!",
                statusCode: 502
            }));
            return false;
        }
        dispatch(errorReset())
        return true;
    };

    const handleEditClick = () => {
        setUserName(`${userFirstName} ${userLastName}`);
        setEmail(email);
        setEdit(true);
        setAvailable(isActive);
        setuserToUpdate(auth._id);
        toggleEditForm();
    };
    const handleFormClose = () => {
        setuserToUpdate("");
        toggleEditForm();
    };

    const handleSvaeBtnClick = () => {
        if (!validateUser()) {
            setSnackMsg(`Error:${errorMsg}`);
            setSnack(true);
            return;
        }
        switch (userType) {
            case "Staff":
                let staff = { name: userName, isAvailable: isAvailable };
                if (userPass !== "") staff = { ...staff, password: userPass }
                dispatch(updateStaff(userToUpdate, staff)).then(
                    () => {
                        if (isError) {
                            setSnackMsg(`${userType} Record Updation failed!`);
                            setSnack(true);
                            return;
                        }
                        setUserName("");
                        setEmail("");
                        setSnackMsg(`${userType} Record Updated Successfully!`);
                        setSnack(true);
                        dispatch(getCurrentAuth(authToken));
                        handleFormClose();
                    }
                );
                break;
            case "Admin":
                let admin = { name: userName };
                if (userPass !== "") admin = { ...admin, password: userPass }
                dispatch(updateAdmin(userToUpdate, admin)).then(
                    () => {
                        if (isError) {
                            setSnackMsg(`${userType} Record Updation failed!`);
                            setSnack(true);
                            return;
                        }
                        setUserName("");
                        setEmail("");
                        setSnackMsg(`${userType} Record Updated Successfully!`);
                        setSnack(true);
                        dispatch(getCurrentAuth(authToken));
                        handleFormClose();
                    }
                );
                break;
            case "Student":
                let student = { name: userName };
                if (userPass !== "") student = { ...student, password: userPass }
                dispatch(updateStudent(userToUpdate, student)).then(
                    () => {
                        if (isError) {
                            setSnackMsg(`${userType} Record Updation failed!`);
                            setSnack(true);
                            return;
                        }
                        setUserName("");
                        setEmail("");
                        setSnackMsg(`${userType} Record Updated Successfully!`);
                        setSnack(true);
                        dispatch(getCurrentAuth(authToken));
                        handleFormClose();
                    }
                );
                break;
            case "employee":
                let employee = { name: userName };
                if (userPass !== "") employee = { ...employee, password: userPass }
                dispatch(updateEmployee(userToUpdate, employee)).then(
                    () => {
                        if (isError) {
                            setSnackMsg(`${userType} Record Updation failed!`);
                            setSnack(true);
                            return;
                        }
                        setUserName("");
                        setEmail("");
                        setSnackMsg(`${userType} Record Updated Successfully!`);
                        setSnack(true);
                        dispatch(getCurrentAuth(authToken));
                        handleFormClose();
                    }
                );
                break;
            // case "Admin":
            // dispatch(updateAdmin(authToken, userToUpdate, user)).then(
            //     () => {
            //         if (isError) {
            //             setSnackMsg(`${userRole} Record Updation failed!`);
            //             setSnack(true);
            //             return;
            //         }
            //         setUserName("");
            //         setUserGender("");
            //         setUserPhone("");
            //         setBranch("");
            //         setDateOfBirth(moment());
            //         setEmail("");
            //         setSocial("");
            //         setUserRole("");
            //         setEdit(false);
            //         setSnackMsg(`${userRole} Record Updated Successfully!`);
            //         setSnack(true);
            //         handleFormClose();
            //     }
            // );
            //     break;
            // case "CEO":

            //     break;
            // case "Student":
            // dispatch(updateStudent(authToken, userToUpdate, user)).then(
            //     () => {
            //         if (isError) {
            //             setSnackMsg(`${userRole} Record Updation failed!`);
            //             setSnack(true);
            //             return;
            //         }
            //         setUserName("");
            //         setUserGender("");
            //         setUserPhone("");
            //         setBranch("");
            //         setDateOfBirth(moment());
            //         setEmail("");
            //         setSocial("");
            //         setUserRole("");
            //         setEdit(false);
            //         setSnackMsg(`${userRole} Record Updated Successfully!`);
            //         setSnack(true);
            //         handleFormClose();
            //     }
            // );
            //             break;
        }

    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackMsg("");
        setSnack(false);
    };

    return (<>

        {
            userType === "Staff" && <div>
                <div className={classes.avatarContainer}>
                    <Box
                        borderRadius="50%"
                        className={classes.outerCircle}
                    >
                        <Avatar
                            src={avatarSrc}
                            alt={`${userFirstName} ${userLastName}`}
                            className={classes.profileAvatar}
                        />
                    </Box>
                </div>
                <Paper
                    className={classes.profileCard}
                    elevation={0}

                >
                    {
                        isCurrentUser && <Fab
                            onClick={() => {
                                setuserToUpdate(id);
                                handleEditClick();
                            }}
                            elevation={0}
                            aria-label="edit"
                            style={{
                                float: "right",
                                backgroundColor: "inherit",
                                boxShadow: "none",
                            }}
                        >
                            <EditIcon
                                style={{
                                    color: "#788497"
                                }}

                            />
                        </Fab>
                    }
                    <Hidden>
                        <br />
                        <br />
                    </Hidden>
                    <div className={classes.userName}>
                        <Typography
                            variant="h4"
                        >
                            {userFirstName}
                        </Typography>
                        <Typography
                            variant="h5"
                        >{userLastName}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Designation</Typography>
                        <Typography>{designation}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Department</Typography>
                        <Typography>{department}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>In-Charge Of</Typography>
                        <Typography>{inChargeOf}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Working Status</Typography>
                        <Typography>{isActive ? "Active" : "Out of Office"}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Email</Typography>
                        <Typography
                            component='a'
                            href={`mailto:${email}`}
                            target="_blank"
                            className={classes.links}
                        >{email}</Typography>
                    </div>
                </Paper>
            </div>
        }
        {
            userType === "employee" && <div>
                <div className={classes.avatarContainer}>
                    <Box
                        borderRadius="50%"
                        className={classes.outerCircle}
                    >
                        <Avatar
                            src={avatarSrc}
                            alt={`${userFirstName} ${userLastName}`}
                            className={classes.profileAvatar}
                        />
                    </Box>
                </div>
                <Paper
                    className={classes.profileCard}
                    elevation={0}

                >
                    {
                        isCurrentUser && <Fab
                            onClick={() => {
                                setuserToUpdate(id);
                                handleEditClick();
                            }}
                            elevation={0}
                            aria-label="edit"
                            style={{
                                float: "right",
                                backgroundColor: "inherit",
                                boxShadow: "none",
                            }}
                        >
                            <EditIcon
                                style={{
                                    color: "#788497"
                                }}

                            />
                        </Fab>
                    }
                    <Hidden>
                        <br />
                        <br />
                    </Hidden>
                    <div className={classes.userName}>
                        <Typography
                            variant="h4"
                        >
                            {userFirstName}
                        </Typography>
                        <Typography
                            variant="h5"
                        >{userLastName}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Designation</Typography>
                        <Typography>{designation}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Department</Typography>
                        <Typography>{department}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Email</Typography>
                        <Typography
                            component='a'
                            href={`mailto:${email}`}
                            target="_blank"
                            className={classes.links}
                        >{email}</Typography>
                    </div>
                </Paper>
            </div>
        }
        {
            userType === "Student" && <div>
                <div className={classes.avatarContainer}>
                    <Box
                        borderRadius="50%"
                        className={classes.outerCircle}
                    >
                        <Avatar
                            src={avatarSrc}
                            alt={`${userFirstName} ${userLastName}`}
                            className={classes.profileAvatar}
                        />
                    </Box>
                </div>
                <Paper
                    className={classes.profileCard}
                    elevation={0}

                >
                    {
                        isCurrentUser && <Fab
                            onClick={() => {
                                setuserToUpdate(id);
                                handleEditClick();
                            }}
                            elevation={0}
                            aria-label="edit"
                            style={{
                                float: "right",
                                backgroundColor: "inherit",
                                boxShadow: "none",
                            }}
                        >
                            <EditIcon
                                style={{
                                    color: "#788497"
                                }}

                            />
                        </Fab>
                    }
                    <Hidden>
                        <br />
                        <br />
                    </Hidden>
                    <div className={classes.userName}>
                        <Typography
                            variant="h4"
                        >
                            {userFirstName}
                        </Typography>
                        <Typography
                            variant="h5"
                        >{userLastName}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Registration Number</Typography>
                        <Typography>{regNo}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Department</Typography>
                        <Typography>{department}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Course</Typography>
                        <Typography>{course}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Email</Typography>
                        <Typography
                            component='a'
                            href={`mailto:${email}`}
                            target="_blank"
                            className={classes.links}
                        >{email}</Typography>
                    </div>
                </Paper>
            </div>
        }
        {
            userType === "Admin" && <div>
                <div className={classes.avatarContainer}>
                    <Box
                        borderRadius="50%"
                        className={classes.outerCircle}
                    >
                        <Avatar
                            src={avatarSrc}
                            alt={`${userFirstName} ${userLastName}`}
                            className={classes.profileAvatar}
                        />
                    </Box>
                </div>
                <Paper
                    className={classes.profileCard}
                    elevation={0}

                >
                    {
                        isCurrentUser && <Fab
                            onClick={() => {
                                setuserToUpdate(id);
                                handleEditClick();
                            }}
                            elevation={0}
                            aria-label="edit"
                            style={{
                                float: "right",
                                backgroundColor: "inherit",
                                boxShadow: "none",
                            }}
                        >
                            <EditIcon
                                style={{
                                    color: "#788497"
                                }}

                            />
                        </Fab>
                    }
                    <Hidden>
                        <br />
                        <br />
                    </Hidden>
                    <div className={classes.userName}>
                        <Typography
                            variant="h4"
                        >
                            {userFirstName}
                        </Typography>
                        <Typography
                            variant="h5"
                        >{userLastName}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Admin ID</Typography>
                        <Typography>{adminId}</Typography>
                    </div>
                    <Divider />
                    <div>
                        <Typography className={classes.infoTitle}>Email</Typography>
                        <Typography
                            component='a'
                            href={`mailto:${email}`}
                            target="_blank"
                            className={classes.links}
                        >{email}</Typography>
                    </div>
                </Paper>
            </div>
        }
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={openEditForm}
        >
            <DialogTitle>
                <div
                    className={classes.dialogTitle}
                >
                    <Typography
                        className={classes.formTitle}
                    >Edit User Profile</Typography>
                    <IconButton
                        onClick={handleFormClose}
                        className={classes.formCloseIcon}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {isError ? <Paper>{errorMsg}</Paper> : ""}
                <UserProfileForm
                    values={{
                        userName,
                        userPass,
                        userMail,
                        isEdit,
                        passVisible,
                        setName: setUserName,
                        setPassword,
                        togglePassVision,
                        isCurrentUser,
                        userType,
                        isAvailable,
                        setAvailable,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleFormClose}
                >
                    BackPage
                </Button>
                <Button
                    onClick={handleSvaeBtnClick}
                    className={classes.formSaveBtn}
                >
                    Save User
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
    </>
    );
}

export default withStyles(styles)(UserProfile);