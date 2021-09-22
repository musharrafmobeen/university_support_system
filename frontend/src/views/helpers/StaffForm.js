import {
    FormControl, FormControlLabel, FormLabel,
    InputLabel, RadioGroup, Select, Radio, withStyles,
    Backdrop, CircularProgress
} from "@material-ui/core";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCategories } from "../../store/categories/categories";
import { loadEmployees } from "../../store/users/employees";
import { loadStaffs } from "../../store/users/staffs";
import styles from '../../styles/helpersStyles/StaffFormStyles';


function StaffForm(props) {
    const { classes } = props;

    const {
        employee,
        setEmployee,
        staffCategory,
        setStaffCategory,
        isAvailable,
        setIsAvailable
    } = props.values;

    const dispatch = useDispatch();
    const employees = useSelector(state => state.entities.users.employees.list);
    const employeesLoading = useSelector(state => state.entities.users.employees.loading);
    const employeesErr = useSelector(state => state.entities.users.employees.isError);
    const employeesErrMsg = useSelector(state => state.entities.users.employees.errorMessage);
    const categories = useSelector(state => state.entities.categories.list);
    const categoriesLoading = useSelector(state => state.entities.categories.loading);
    const categoriesErrMsg = useSelector(state => state.entities.categories.errorMessage);
    const categoriesErr = useSelector(state => state.entities.categories.isError);
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);


    const isLoading = employeesLoading || categoriesLoading || staffLoading

    useEffect(() => {
        if (employees.length === 0) dispatch(loadEmployees());
        dispatch(loadCategories());
        if (staff.length === 0) dispatch(loadStaffs());
    }, []);

    const getEmpOptions = () => {
        const approvedEmps = employees.filter(user => user.isApproved === true && user.isRejected === false);
        let availacbleEmps = [];
        approvedEmps.map(employee => {
            let isAvailable = true;
            for (let i = 0; i < staff.length; i++) {
                if (staff[i].employee._id === employee._id) isAvailable = false;
            }
            if (isAvailable) availacbleEmps.push(employee);
        });
        const list = availacbleEmps.map(user => (
            <option key={user._id} value={user._id}>{user.name}</option>
        ));
        return list;
    };

    const getCategoriesOpts = () => {
        const availableCategories = categories.filter(category => category.incharge === null);
        const list = availableCategories.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
        ));
        return list;
    };

    const handleEmployeeChange = e => {
        setEmployee(e.target.value);
        // console.log("emp", employee);
    };

    const handleCategoryChange = e => {
        setStaffCategory(e.target.value);
    };

    const handleAvailablityChange = e => {
        setIsAvailable(e.target.value)
        console.log("isAvailable", isAvailable);
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <form>
                <FormControl
                    variant="outlined"
                    className={classes.margin}
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-employees-native-simple">
                        Employee
                    </InputLabel>
                    <Select
                        native
                        value={employee}
                        onChange={handleEmployeeChange}
                        label="Employee"
                        inputProps={{
                            name: "Employee",
                            id: "outlined-employees-native-simple",
                        }}
                    >
                        <option aria-label="None" value="" />
                        {getEmpOptions()}
                    </Select>
                </FormControl>
                <FormControl
                    variant="outlined"
                    className={classes.margin}
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-category-native-simple">
                        Category
                    </InputLabel>
                    <Select
                        native
                        value={staffCategory}
                        onChange={handleCategoryChange}
                        label="Category"
                        inputProps={{
                            name: "Category",
                            id: "outlined-category-native-simple",
                        }}
                    >
                        <option aria-label="None" value="" />
                        {getCategoriesOpts()}
                    </Select>
                </FormControl>
                <FormControl component="fieldset"
                    fullWidth
                    className={classes.margin}
                >
                    <FormLabel component="legend">Staff availability</FormLabel>
                    <RadioGroup
                        aria-label="Staff availability"
                        name="staffAvailability"
                        value={isAvailable}
                        onChange={handleAvailablityChange}
                        row={true}
                        className={classes.radioGroup}
                    >
                        <div
                            className={classes.radioButton}
                        >
                            <FormControlLabel
                                value={"true"}
                                control={<Radio />}
                                label="Available"
                            />
                        </div>
                        <div
                            className={classes.radioButton}
                        >
                            <FormControlLabel
                                value={"false"}
                                control={<Radio />}
                                label="Out of Office"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </form>
        </div>
    );
}

export default withStyles(styles)(StaffForm);