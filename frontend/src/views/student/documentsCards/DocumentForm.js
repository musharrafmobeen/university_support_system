import { FormControl, InputLabel, Select, TextField, withStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/studentStyles/docRequestsCards/DocRequestFormStyles";
import { loadStaffs } from '../../../store/users/staffs';
import CustomizedDateInput from "../../helpers/CustomizedDateInput";


function DocumentForm(props) {
    const { classes } = props;
    const {
        requestedStaff,
        setRequestedStaff,
        docType,
        setDocType,
        userReg,
        setUserReg,
        userCourse,
        setUserCourse,
        userDepartment,
        setUserDepartment,
        batch,
        setBatch,
        faculty,
        setFaculty,
        userFatherName,
        setFatherName,
        userName,
        dateOfJoining,
        setDateOfJoining,
        userPassPort,
        setUserPassPort,
        userSemester,
        setSemester,
        userNationality,
        setNationality,
        userDesiredUniName,
        setDesiredUniName
    } = props.values;

    const staffs = useSelector(state => state.entities.users.staffs.list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (staffs.length === 0) dispatch(loadStaffs());
    }, []);

    const handleStaffCahnge = e => { setRequestedStaff(e.target.value); };

    const handleTypeChange = e => { setDocType(e.target.value); };

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

    const handleFatherNAmeChange = e => {
        setFatherName(e.target.value);
    };

    const handlePassportChange = e => {
        setUserPassPort(e.target.value);
    };

    const handleSemesterChange = e => {
        setSemester(e.target.value);
    };

    const handleDesiredUniNameChange = e => {
        setDesiredUniName(e.target.value);
    };

    const handleNationalityChange = e => {
        setNationality(e.target.value);
    };

    const getStaffOptions = () => {
        const list = staffs.map(user => (
            <option key={user._id} value={user._id}>{user.employee.name}</option>
        ));
        return list;
    };

    return (
        <div>
            <form>
                <br />
                <br />
                <div className={classes.row}>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.margin}
                    >
                        <InputLabel>Document Type</InputLabel>
                        <Select
                            native
                            variant="outlined"
                            label="Document Type"
                            id="documentType"
                            value={docType}
                            onChange={handleTypeChange}
                        >
                            <option value={""} />
                            <option value={"refrenceLetter"}>Reference Letter</option>
                            <option value={"bonafied certificate"}>Bonafide Certificate</option>
                        </Select>
                    </FormControl>
                    {
                        docType === "bonafied certificate" && <TextField
                            required
                            fullWidth
                            type="text"
                            id="passportNo"
                            label="Passport No."
                            variant="outlined"
                            defaultValue=""
                            value={userPassPort}
                            onChange={handlePassportChange}
                        />
                    }
                    {
                        docType !== "bonafied certificate" && <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.margin}
                            disabled={docType === "bonafied certificate"}
                        >
                            <InputLabel>Staff member</InputLabel>
                            <Select
                                native
                                variant="outlined"
                                label="Staff member"
                                id="staffMemeber"
                                value={requestedStaff}
                                onChange={handleStaffCahnge}
                            >
                                <option value={""} />
                                {getStaffOptions()}
                            </Select>
                        </FormControl>
                    }
                </div>
                <div className={classes.row}>
                    <TextField
                        className={classes.margin}
                        fullWidth
                        label="Student name"
                        required
                        variant="outlined"
                        value={userName}
                        // onChange={handleFatherNAmeChange}
                        disabled
                    />
                    {
                        docType === "bonafied certificate" && <TextField
                            className={classes.margin}
                            fullWidth
                            label="Father name"
                            required
                            variant="outlined"
                            value={userFatherName}
                            onChange={handleFatherNAmeChange}
                        />
                    }
                    {
                        docType === "refrenceLetter" && <TextField
                            className={classes.margin}
                            fullWidth
                            label="Desired Institue Name"
                            required
                            variant="outlined"
                            value={userDesiredUniName}
                            onChange={handleDesiredUniNameChange}
                        />
                    }
                </div>

                {
                    docType === "bonafied certificate" && <TextField
                        required
                        fullWidth
                        type="text"
                        id="nationality"
                        label="Nationality"
                        variant="outlined"
                        defaultValue=""
                        value={userNationality}
                        onChange={handleNationalityChange}
                        placeholder={"Pakistani"}
                    />
                }
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
                        disabled={userReg !== ""}
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
                            <option aria-label="None" value="" />
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
                        <option aria-label="None" value="" />
                        <option value={"CS & SE"}>CS & SE</option>
                        <option value={"IT"}>IT</option>
                    </Select>
                </FormControl>
                <div className={classes.dateInput}>
                    <CustomizedDateInput

                        values={{
                            selectedDate: dateOfJoining,
                            handleDateChange: setDateOfJoining,
                            label: "Initial Date of Joining"
                        }}
                    />
                </div>
                <FormControl
                    variant="outlined"
                    className={classes.margin}
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Current Semester
                    </InputLabel>
                    <Select
                        native
                        value={userSemester}
                        onChange={handleSemesterChange}
                        label="Current Semester"
                        inputProps={{
                            name: "Current Semester",
                            id: "outlined-CurrentSemester-native-simple",
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                        <option value={"6"}>6</option>
                        <option value={"7"}>7</option>
                        <option value={"8"}>8</option>
                    </Select>
                </FormControl>
                <br />
            </form>
        </div>
    );
}

export default withStyles(styles)(DocumentForm);