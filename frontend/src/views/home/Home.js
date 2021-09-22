import {
    Backdrop, Button, CircularProgress, Dialog, FormControl, IconButton,
    InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography,
    DialogTitle, DialogContent, DialogActions, withStyles
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import useToggleState from '../../hooks/useToggleState';
import useInputState from '../../hooks/useInputState';
import styles from "../../styles/homeStyles/HomeStyles";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, getCurrentAuth } from "../../store/auth/auth";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import IIUI_BG_IMG from '../../resources/design-images/IIUI_BG_IMG.jfif';
import { useEffect, useState } from "react";
import SignUpForm from "../helpers/SignUpForm";
import { errorOccured, errorReset } from "../../store/ui/error";
import { addStudent } from "../../store/users/students";
import { addEmployee } from "../../store/users/employees";
import { b64toBlob } from "../helpers/functions";
import { base64StringToFile } from "react-crop-utils"
import HomeAnnouncments from "./HomeAnnouncments";
import ImageSlideShow from './ImageSlideShow';

import MuiImageSlider from 'mui-image-slider';
import IIUI_1 from '../../resources/design-images/IIUI_BG_IMGS/IIUI_1.jpg';
import IIUI_2 from '../../resources/design-images/IIUI_BG_IMGS/IIUI_2.jfif';
import IIUI_3 from '../../resources/design-images/IIUI_BG_IMGS/IIUI_3.jpg';
// import IIUI_4 from '../../resources/design-images/IIUI_BG_IMGS/chernitvsi.jpg';
// import IIUI_5 from '../../resources/design-images/IIUI_BG_IMGS/florida_uni.jpg';
// import IIUI_6 from '../../resources/design-images/IIUI_BG_IMGS/florida_uni_2.jpg';


function Home(props) {
    const { classes } = props;

    const images = [
        IIUI_1,
        IIUI_2,
        IIUI_3
    ];

    const [shownPass, togglePass] = useToggleState(false);
    const [passValue, handlePassChange, passReset] = useInputState("");
    const [emailValue, handleEmailChange, emailReset] = useInputState("");

    const [openForm, toggleForm] = useToggleState();
    const [isLogin, setLogin] = useState(false);

    const [userType, setUserType] = useState("student");
    const [userName, setUserName] = useState("");
    const [userReg, setUserReg] = useState("");
    const [userCourse, setUserCourse] = useState("");
    const [userDepartment, setUserDepartment] = useState("CS & SE");
    const [userEmail, setUserEmail] = useState("");
    const [userPass, setUserPass] = useState("");
    const [userImg, setUserImg] = useState(null);
    const [faculty, setFaculty] = useState("FBAS");
    const [batch, setBatch] = useState("F17");
    const [employeeId, setEmployeeId] = useState("");
    const [employeeDesignation, setEmployeeDesignation] = useState("");

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth.user);
    const authLoading = useSelector(state => state.auth.loading);
    const userRole = useSelector(state => state.auth.role);
    const authError = useSelector(state => state.auth.isError);
    const authErrorMsg = useSelector(state => state.auth.errorMessage);
    const isLoggedIn = useSelector(state => state.auth.loggedIn);
    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrMsg = useSelector(state => state.ui.error.errorMessage);
    const authToken = localStorage.getItem("token");

    const isError = authError || uiError;
    const errorMsg = authErrorMsg || uiErrMsg;

    const isLoading = authLoading

    useEffect(() => {
        if (authToken && authToken !== "") dispatch(getCurrentAuth(authToken));
    }, []);

    const HandleFormSubmitt = (event) => {
        event.preventDefault();
        dispatch(authenticateUser(emailValue, passValue));

    };

    const signInClick = () => {
        setLogin(true);
        dispatch(errorReset());
        toggleForm();
    };

    const signUpClick = () => {
        setLogin(false);
        dispatch(errorReset());
        toggleForm();
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormClose = () => {
        setLogin(false);
        toggleForm();
    };

    const validateStudent = () => {
        const nameRegExp = /^[a-zA-Z]+[ a-zA-Z]+$/; // /^([^0-9]*)$/;
        const regNoRegExp = /^\d+$/;
        const mailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        if (userReg === "") {
            dispatch(errorOccured({
                message: "Registration number cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!regNoRegExp.test(userReg)) {
            dispatch(errorOccured({
                message: "Registration number can contain numbers only!",
                statusCode: 502
            }));
            return false;
        }
        if (faculty === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate faculty!",
                statusCode: 502
            }));
            return false;
        }
        if (userCourse === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate course!",
                statusCode: 502
            }));
            return false;
        }
        if (batch === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate batch!",
                statusCode: 502
            }));
            return false;
        }
        if (userDepartment === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate department!",
                statusCode: 502
            }));
            return false;
        }
        if (userEmail === "") {
            dispatch(errorOccured({
                message: "Email cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!mailRegExp.test(userEmail)) {
            dispatch(errorOccured({
                message: "Email seems to be invalid!",
                statusCode: 502
            }));
            return false;
        }
        const emailDomainIdx = userEmail.lastIndexOf('@');
        // if (!emailDomainIdx > -1) return false;
        if (emailDomainIdx > -1 && userEmail.slice(emailDomainIdx + 1).toLocaleLowerCase() !== "iiu.edu.pk") {
            dispatch(errorOccured({
                message: "Please use IIUI email!",
                statusCode: 502
            }));
            return false;
        }
        if (userPass === "") {
            dispatch(errorOccured({
                message: "Password cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!passRegExp.test(userPass)) {
            dispatch(errorOccured({
                message: "Password must \nbe atleast 6 charactors long!\nhave one uppercase charactor!\nhave one lowercase character!\nhave one digit!",
                statusCode: 502
            }));
            return false;
        }
        return true;
    }

    const validateEmployee = () => {
        const nameRegExp = /^[a-zA-Z]+[ a-zA-Z]+$/; // /^([^0-9]*)$/;
        const regNoRegExp = /^\d+$/;
        const mailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
        if (employeeId === "") {
            dispatch(errorOccured({
                message: "Employee ID cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!regNoRegExp.test(employeeId)) {
            dispatch(errorOccured({
                message: "Employee ID can contain numbers only!",
                statusCode: 502
            }));
            return false;
        }
        if (employeeDesignation === "") {
            dispatch(errorOccured({
                message: "Please provide an appropriate designation!",
                statusCode: 502
            }));
            return false;
        }
        if (!nameRegExp.test(employeeDesignation)) {
            dispatch(errorOccured({
                message: "Designation can't contain digits or special characters!",
                statusCode: 502
            }));
            return false;
        }
        if (userDepartment === "") {
            dispatch(errorOccured({
                message: "Please select an appropriate department!",
                statusCode: 502
            }));
            return false;
        }
        if (userEmail === "") {
            dispatch(errorOccured({
                message: "Email cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!mailRegExp.test(userEmail)) {
            dispatch(errorOccured({
                message: "Email seems to be invalid!",
                statusCode: 502
            }));
            return false;
        }
        const emailDomainIdx = userEmail.lastIndexOf('@');
        // if (!emailDomainIdx > -1) return false;
        if (emailDomainIdx > -1 && userEmail.slice(emailDomainIdx + 1).toLocaleLowerCase() !== "iiu.edu.pk") {
            dispatch(errorOccured({
                message: "Please use IIUI email!",
                statusCode: 502
            }));
            return false;
        }
        if (userPass === "") {
            dispatch(errorOccured({
                message: "Password cannot be empty!",
                statusCode: 502
            }));
            return false;
        }
        if (!passRegExp.test(userPass)) {
            dispatch(errorOccured({
                message: "Password must \nbe atleast 6 charactors long!\nhave one uppercase charactor!\nhave one lowercase character!\nhave one digit!",
                statusCode: 502
            }));
            return false;
        }
        return true;
    };

    const handleRegisterUser = () => {
        if (userType === "student") {
            if (!validateStudent()) return;
            const student = {
                reg: `${userReg}-${faculty}/${userCourse}/${batch}`,
                department: userDepartment,
                course: userCourse,
                email: userEmail,
                password: userPass,
                studentImage: userImg,
                name: userName
            };
            dispatch(errorReset())
                .then(
                    () => {
                        dispatch(addStudent(student)).then(
                            () => {
                                if (isError) return;
                                else {
                                    dispatch(authenticateUser(userEmail, userPass));
                                    handleFormClose();
                                    return;
                                }
                            }
                        );
                    }
                );
            return;
        }
        if (userType === "employee") {
            if (!validateEmployee()) return;
            let data = new FormData();
            // data.append('employeeImage', userImg);
            var object = [];
            object.push(userImg);
            const examp = URL.createObjectURL(new Blob(object, { type: 'image/jpeg' }));
            // const examp3 = base64StringToFile(userImg, "user_img.jpeg");
            // var block = userImg.split(";");
            // Get the content type of the image
            // var contentType = block[0].split(":")[1];// In this case "image/gif"
            // get the real base64 content of the file
            // var realData = block[1].split(",")[1];
            // const examp2 = b64toBlob(realData, contentType);
            // data.append('employeeImage', examp2);
            console.log("empImg", userImg, "type", typeof (userImg));
            console.log("URL", examp);
            // console.log("URL2", examp2);
            // console.log("URL3", examp3);
            // console.log("URL32", URL.createObjectURL(examp3));
            // console.log("URL22", URL.createObjectURL(examp2));
            // return;
            console.log("img", data);
            for (var pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            // return;
            const employee = {
                employee_ID: employeeId,
                name: userName,
                department: userDepartment,
                designation: employeeDesignation,
                email: userEmail,
                password: userPass,
                employeeImage: userImg
            };
            // return;
            dispatch(errorReset())
                .then(
                    dispatch(addEmployee(employee, data))
                ).then(
                    () => {
                        if (isError) {
                            return;
                        }
                        else {
                            dispatch(authenticateUser(userEmail, userPass));
                            handleFormClose();
                            return;
                        }
                    }
                );
        }
    };

    const redirectUser = () => {
        switch (userRole) {
            case 'Admin': return <Redirect to="/admin/dashboard" />
            case 'Student': return <Redirect to="/student/dashboard" />
            case 'employee': return <Redirect to="/employee/dashboard" />
            case 'Staff': return <Redirect to="/staff/dashboard" />
        }
    };

    return (
        <div>
            {isLoggedIn && redirectUser()}
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <Navbar
                values={{
                    signInClick,
                    signUpClick,
                }}
            />
            <div className={classes.bgImg}>
            </div>
            <div >
                <HomeAnnouncments />
            </div>
            <div className={classes.slideCoverData}>
                <MuiImageSlider
                    images={images}
                    autoPlay
                    arrows={false}
                />
                <div>
                    <h1>
                        IIUI Support System
                    </h1>
                    <h4>
                        Version: 0.1.3.0
                    </h4>
                </div>
            </div>
            {/* <div className={classes.homeBackGroundContainer}>
                <div className={classes.homeBackGround}>
                </div>
            </div> */}

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                open={openForm}
            >
                <DialogTitle>
                    <Typography
                        className={classes.dialogTitleText}
                    >{isLogin ? 'Log In' : 'Register'}</Typography>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    {isError ? <Paper><pre>{errorMsg}</pre></Paper> : ""}
                    {
                        isLogin ?
                            <Paper className={classes.paper} elevation={0}>
                                {isLoggedIn && redirectUser()}
                                <form className={classes.form}
                                    onSubmit={
                                        HandleFormSubmitt
                                    }
                                >
                                    <Typography
                                        className={classes.formTitle}
                                        variant="h4"
                                    >Login</Typography>
                                    <FormControl margin='normal' fullWidth required variant="outlined">
                                        {/* <InputLabel htmlFor="phone" id="phn">{strings.phoneNumber}</InputLabel> */}
                                        <TextField
                                            variant="outlined"
                                            id="mail"
                                            type='text'
                                            value={emailValue}
                                            onChange={handleEmailChange}
                                            label="Email"
                                            error={isError}
                                            helperText={errorMsg}
                                        />
                                    </FormControl>
                                    <FormControl margin='normal' required fullWidth variant="outlined">
                                        <InputLabel htmlFor='password'>Password</InputLabel>
                                        <OutlinedInput
                                            id="password"
                                            type={shownPass ? 'text' : 'password'}
                                            value={passValue}
                                            onChange={handlePassChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={togglePass}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {shownPass ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={80}
                                        />
                                    </FormControl>
                                    {/* <div className={classes.fromBottomWraper}>
                                        <Button
                                            variant='contained'
                                            type='submit'
                                            className={classes.submit}
                                        >
                                            Continue
                                        </Button>
                                    </div> */}
                                </form>
                            </Paper>
                            :
                            <SignUpForm
                                values={{
                                    userType,
                                    setUserType,
                                    userName,
                                    setUserName,
                                    userReg,
                                    setUserReg,
                                    userCourse,
                                    setUserCourse,
                                    userDepartment,
                                    setUserDepartment,
                                    userEmail,
                                    setUserEmail,
                                    userPass,
                                    setUserPass,
                                    userImg,
                                    setUserImg,
                                    batch,
                                    setBatch,
                                    faculty,
                                    setFaculty,
                                    employeeId,
                                    setEmployeeId,
                                    employeeDesignation,
                                    setEmployeeDesignation
                                }}
                            />
                    }
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleFormClose}
                        disabled={isLoading}
                    >
                        BackPage
                    </Button>
                    <Button
                        className={classes.formBtnSave}
                        disabled={isLoading}
                        onClick={
                            isLogin ?
                                HandleFormSubmitt
                                :
                                handleRegisterUser
                        }
                    >
                        {
                            isLogin ?
                                "Log-In"
                                :
                                "Register"
                        }
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}

export default withStyles(styles)(Home);