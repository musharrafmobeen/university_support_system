import {
    // Backdrop, CircularProgress, 
    // FormControl,
    // InputLabel, Select, 
    TextField, withStyles, 
    // Switch, 
    Typography
} from "@material-ui/core";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadEmployees } from "../../../store/users/employees";
// import { loadStaffs } from "../../../store/users/staffs";
import styles from "../../../styles/adminStyles/categoryCardsStyles/CategoryFormStyles";


function CategoryForm(props) {
    const { classes } = props;
    const {
        categoryTitle,
        setCategoryTitle,
        // categoryIncharge,
        // setCategoryIncharge,
        // createWithoutEmp,
        // toggleCreateWithoutEmp
    } = props.values;


    // const dispatch = useDispatch();
    // const employees = useSelector(state => state.entities.users.employees.list);
    // const employeesLoading = useSelector(state => state.entities.users.employees.loading);
    // const employeesErr = useSelector(state => state.entities.users.employees.isError);
    // const employeesErrMsg = useSelector(state => state.entities.users.employees.errorMessage);
    // const staff = useSelector(state => state.entities.users.staffs.list);
    // const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    // const staffErr = useSelector(state => state.entities.users.staffs.isError);
    // const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);


    // const isLoading = employeesLoading || staffLoading

    // useEffect(() => {
    //     if (employees.length === 0) dispatch(loadEmployees());
    //     if (staff.length === 0) dispatch(loadStaffs());
    // }, []);

    // const getEmpOptions = () => {
    //     const approvedEmps = employees.filter(user => user.isApproved === true && user.isRejected === false);
    //     let availableEmps = [];
    //     approvedEmps.map(employee => {
    //         let isAvailable = true;
    //         for (let i = 0; i < staff.length; i++) {
    //             if (staff[i].employee._id === employee._id) isAvailable = false;
    //         }
    //         if (isAvailable) availableEmps.push(employee);
    //     });
    //     const list = availableEmps.map(user => (
    //         <option key={user._id} value={user._id}>{user.name}</option>
    //     ));
    //     return list;
    // };


    const handleCategoryTitleCahnge = e => {
        setCategoryTitle(e.target.value);
    };

    // const handleCateInchargeCahnge = e => {
    //     setCategoryIncharge(e.target.value);
    // };

    return (
        <div>
            {/* <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop> */}
            <div className={classes.container}>
                <div className={classes.toggleSwitch}>
                    <Typography className={classes.switchText}>To add incharge of categories please visit 'Staff' tab!</Typography>
                    {/* <Switch
                        checked={createWithoutEmp}
                        name="DarkMode"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={
                            () => {
                                toggleCreateWithoutEmp()
                            }
                        }
                    /> */}
                </div>
                <form className={classes.rootForm}>
                    <TextField
                        variant="outlined"
                        id="categoryTitle"
                        label="Category Title"
                        type="text"
                        value={categoryTitle}
                        onChange={handleCategoryTitleCahnge}
                        fullWidth
                    />
                    {/* <FormControl
                        variant="outlined"
                        fullWidth
                    >
                        <InputLabel>Category Incharge</InputLabel>
                        <Select
                            native
                            variant="outlined"
                            label="Category Incharge"
                            id="CategoryIncharge"
                            value={categoryIncharge}
                            onChange={handleCateInchargeCahnge}
                        >
                            <option value={undefined} />
                            {getEmpOptions()}
                        </Select>
                    </FormControl> */}
                </form>
            </div>
        </div>
    );
}

export default withStyles(styles)(CategoryForm);