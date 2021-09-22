import {
    FormControl, FormLabel, RadioGroup, FormControlLabel,
    Radio, withStyles, Badge, Avatar, Typography, Button,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Select, OutlinedInput, InputLabel, InputAdornment, IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styles from "../../styles/helpersStyles/SignUpFormStyles";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import useToggle from "../../hooks/useToggleState";
import AvatarEdit from './AvatarEdit';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { errorReset } from "../../store/ui/error";


function SignUpForm(props) {
    const { classes } = props;
    const {
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
    } = props.values;

    const [isDialogOpen, toggleDialog] = useToggle(false);
    const [passVisible, togglePassVision] = useToggle();
    const inputFile = useRef(null)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(errorReset());
        return () => {
            setUserType("student");
            setUserName("");
            setUserReg("");
            setUserCourse("");
            setUserDepartment("CS & SE");
            setUserEmail("");
            setUserPass("");
            setUserImg("");
            setBatch("F17");
            setFaculty("");
            setEmployeeId("");
            setEmployeeDesignation("");
        }
    }, []);


    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const handleImageChange = e => {
        e.stopPropagation();
        e.preventDefault();
        const img = e.target.files[0];
        setUserImg(URL.createObjectURL(e.target.files[0]));
        // console.log(e.target.files[0]);
        console.log("userImg", userImg);
        // console.log("const", img);
    };

    const handleAccountTypeChange = e => {
        setUserType(e.target.value);
    };

    const handleNameChange = e => {
        setUserName(e.target.value);
    };

    const handleRegChange = e => {
        setUserReg(e.target.value);
    };

    const handleFacultyChange = e => {
        setFaculty(e.target.value);
    };

    const handleCourseChange = e => {
        setUserCourse(e.target.value);
    };

    const handleBatchChange = e => {
        setBatch(e.target.value);
    };

    const handleDepartmentChange = e => {
        setUserDepartment(e.target.value);
    };

    const handleMailChange = e => {
        setUserEmail(e.target.value);
    };

    const handlePassChange = e => {
        setUserPass(e.target.value);
    };

    const handleEmployeeIdChange = e => {
        setEmployeeId(e.target.value);
    };

    const handleEmployeeDesigChange = e => {
        setEmployeeDesignation(e.target.value);
    };

    const getUserForm = () => {
        if (userType === 'student') {
            return <>
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    type="text"
                    id="name"
                    label="Name"
                    variant="outlined"
                    defaultValue=""
                    value={userName}
                    onChange={handleNameChange}
                />
                <div className={`${classes.studentRegNo} ${classes.margin}`}>
                    <TextField
                        required
                        fullWidth
                        type="tel"
                        id="regNo"
                        label="Registration#"
                        variant="outlined"
                        defaultValue=""
                        value={userReg}
                        onChange={handleRegChange}
                    />
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        fullWidth
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Faculty
                        </InputLabel>
                        <Select
                            native
                            value={faculty}
                            onChange={handleFacultyChange}
                            label="Faculty"
                            inputProps={{
                                name: "Faculty",
                                id: "outlined-faculty-native-simple",
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"FBAS"}>FBAS</option>
                            <option value={"FET"} disabled>FET</option>
                            <option value={"FMS"} disabled>FMS</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        fullWidth
                    >
                        <InputLabel htmlFor="outlined-course-native-simple">
                            Course
                        </InputLabel>
                        <Select
                            native
                            value={userCourse}
                            onChange={handleCourseChange}
                            label="Course"
                            inputProps={{
                                name: "course",
                                id: "outlined-course-native-simple",
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"BSSE"}>BSSE</option>
                            <option value={"BSCS"}>BSCS</option>
                            <option value={"BSIT"}>BSIT</option>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        fullWidth
                    >
                        <InputLabel htmlFor="outlined-age-native-simple">
                            Batch
                        </InputLabel>
                        <Select
                            native
                            value={batch}
                            onChange={handleBatchChange}
                            label="Batch"
                            inputProps={{
                                name: "Batch",
                                id: "outlined-Batch-native-simple",
                            }}
                        >
                            <option value={"F17"}>F17</option>
                            <option value={"F18"}>F18</option>
                            <option value={"F19"}>F19</option>
                            <option value={"F20"}>F20</option>
                            <option value={"F21"}>F21</option>
                        </Select>
                    </FormControl>
                </div>
                <FormControl
                    variant="outlined"
                    className={classes.margin}
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Department
                    </InputLabel>
                    <Select
                        native
                        value={userDepartment}
                        onChange={handleDepartmentChange}
                        label="Department"
                        inputProps={{
                            name: "Department",
                            id: "outlined-Department-native-simple",
                        }}
                    >
                        <option value={"CS & SE"}>CS & SE</option>
                        <option value={"IT"}>IT</option>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.margin}
                    fullWidth
                    label="E-Mail"
                    required
                    variant="outlined"
                    value={userEmail}
                    onChange={handleMailChange}
                    placeholder={"student.1234@iiu.edu.pk"}
                />
                <FormControl
                    className={classes.margin}
                    required
                    variant="outlined"
                    fullWidth
                >
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <OutlinedInput
                        id="password"

                        type={passVisible ? "text" : "password"}
                        label="Password"
                        value={userPass}
                        onChange={handlePassChange}
                        // placeholder={isEdit ? "Unchanged" : ''}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassVision}
                                    edge="end"
                                >
                                    {passVisible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </>
        }
        if (userType === "employee") {
            return <>
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    type="text"
                    id="name"
                    label="Name"
                    variant="outlined"
                    defaultValue=""
                    value={userName}
                    onChange={handleNameChange}
                />
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    type="tel"
                    id="employeeID"
                    label="Employee ID"
                    variant="outlined"
                    defaultValue=""
                    value={employeeId}
                    onChange={handleEmployeeIdChange}
                />
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    type="text"
                    id="employeeDesig"
                    label="Designation"
                    variant="outlined"
                    defaultValue=""
                    value={employeeDesignation}
                    onChange={handleEmployeeDesigChange}
                />
                <FormControl
                    variant="outlined"
                    className={classes.margin}
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Department
                    </InputLabel>
                    <Select
                        native
                        value={userDepartment}
                        onChange={handleDepartmentChange}
                        label="Department"
                        inputProps={{
                            name: "Department",
                            id: "outlined-Department-native-simple",
                        }}
                    >
                        <option value={"CS & SE"}>CS & SE</option>
                        <option value={"IT"}>IT</option>
                    </Select>
                </FormControl>
                <TextField
                    className={classes.margin}
                    fullWidth
                    label="E-Mail"
                    required
                    variant="outlined"
                    value={userEmail}
                    onChange={handleMailChange}
                    placeholder={"user.info@iiu.edu.pk"}
                />
                <FormControl
                    className={classes.margin}
                    required
                    variant="outlined"
                    fullWidth
                >
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <OutlinedInput
                        id="password"

                        type={passVisible ? "text" : "password"}
                        label="Password"
                        value={userPass}
                        onChange={handlePassChange}
                        // placeholder={isEdit ? "Unchanged" : ''}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={togglePassVision}
                                    edge="end"
                                >
                                    {passVisible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </>
        }
    };


    return (
        <div>
            <form>
                <FormControl component="fieldset"
                    fullWidth
                >
                    <FormLabel component="legend">Account Type</FormLabel>
                    <RadioGroup
                        aria-label="Account Type"
                        name="accountType"
                        value={userType}
                        onChange={handleAccountTypeChange}
                        row={true}
                        className={classes.radioGroup}
                    >
                        <div
                            className={classes.radioButton}
                        >
                            <FormControlLabel
                                value="student"
                                control={<Radio />}
                                label="Student"
                            />
                        </div>
                        <div
                            className={classes.radioButton}
                        >
                            <FormControlLabel
                                value="employee"
                                control={<Radio />}
                                label="Employee"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
                <input type='file' id='file' ref={inputFile} onChange={handleImageChange} style={{ display: 'none' }} />
                <div
                    className={classes.avatarContainer}
                >
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            <AddRoundedIcon
                                fontSize="large"
                                className={classes.badgeIcon}
                                onClick={onButtonClick}
                            />
                        }
                    >
                        <Avatar
                            className={classes.avatar}
                            src={userImg}
                        />
                    </Badge>
                </div>
                {getUserForm()}
            </form>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="md"
                fullWidth
                open={isDialogOpen}
            >
                <DialogTitle>
                    <Typography>Edit avatar</Typography>
                </DialogTitle>
                <DialogContent>
                    <AvatarEdit
                        values={{
                            userImg,
                            setUserImg
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => toggleDialog()}
                    >
                        Back Page
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(SignUpForm);