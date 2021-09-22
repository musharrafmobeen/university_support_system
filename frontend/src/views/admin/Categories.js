import React, { useEffect, useState } from "react";
import {
    Breadcrumbs, Button, IconButton, Link, Paper, Snackbar, Table, TableBody,
    TableCell, TableContainer, TableHead, TablePagination, TableRow, Dialog,
    DialogTitle, DialogContent, DialogActions, Tooltip, Typography, withStyles, Backdrop, CircularProgress
} from "@material-ui/core";
import useToggleState from '../../hooks/useToggleState';
import styles from "../../styles/adminStyles/CategoriesStyles";
import ToolTipStyles from "../helpers/ToolTipStyles";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../store/ui/drawer";
import { withRouter } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from "../../resources/design-icons/RemoveIcon";
import CategoryForm from './CategoriesCards/CategoryForm';
import AlertMessageDialog from '../helpers/AlertMessageDialog';
import { addCategory, deleteCategory, loadCategories } from "../../store/categories/categories";
import { addStaff, loadStaffs } from "../../store/users/staffs";
import { errorOccured, errorReset } from "../../store/ui/error";


function Categories(props) {
    const { classes } = props;
    const toolTipClasses = ToolTipStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openCategoryForm, toggleCategoryForm] = useToggleState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [openAlert, toggleAlert] = useToggleState(false);

    const [categoryTitle, setCategoryTitle] = useState("");
    const [categoryIncharge, setCategoryIncharge] = useState(null);
    const [createWithoutEmp, toggleCreateWithoutEmp] = useToggleState();

    const [categoryToEdit, setCategoryToEdit] = useState("");
    const [catToRemove, setCatToRemove] = useState("");

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const categories = useSelector(state => state.entities.categories.list);
    const categoriesLoading = useSelector(state => state.entities.categories.loading);
    const categoriesErrMsg = useSelector(state => state.entities.categories.errorMessage);
    const categoriesErr = useSelector(state => state.entities.categories.isError);
    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);
    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrorMsg = useSelector(state => state.ui.error.errorMessage);
    const dispatch = useDispatch();

    const isLoading = categoriesLoading || staffLoading
    const isError = staffErr || uiError || categoriesErr
    const errorMsg = staffErrMsg || uiErrorMsg || categoriesErrMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Categories"));
        dispatch(loadCategories());
        if (staff.length === 0) dispatch(loadStaffs());
    }, []);

    const getInchargeName = inchargeId => {
        const index = staff.findIndex(user => user.employee._id === inchargeId);
        if (staff[index]) return staff[index].employee.name;
        return "Incharge Name can't be found!"
    };


    const getStaffId = empId => {
        const index = staff.findIndex(staff => staff.employee._id === empId);
        if (staff[index]) return staff[index]._id;
        return null;
    };


    const renderCategories = () => {
        let count = page * rowsPerPage;
        const list = categories.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        ).map(category => (
            <TableRow key={category._id} component={Paper} className={classes.infoDataRow}>
                <TableCell align="left">{++count}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">{
                    category.incharge ?
                        category.incharge.employee ?
                            category.incharge.employee.name
                            :
                            "Incharge Name can't be found!"
                        :
                        "Not assigned yet"
                }</TableCell>
                <TableCell align="right" >
                    {/* <Tooltip arrow title="Edit" classes={toolTipClasses}>
                        <IconButton

                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip arrow title="Delete" classes={toolTipClasses}>
                        <IconButton
                            className={classes.deleteButton}
                            onClick={
                                () => {
                                    setCatToRemove(category._id);
                                    toggleAlert();
                                }
                            }
                        >
                            <RemoveIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow >
        )
        );

        return list;
    };

    const validateCategory = () => {
        if (categoryTitle === "") {
            dispatch(errorOccured({
                message: "Please set an appropriate title!",
                statusCode: 502
            }));
            return false;
        }
        // if (!createWithoutEmp && (categoryIncharge === null || categoryIncharge === undefined)) {
        //     dispatch(errorOccured({
        //         message: "Please select an employee or check 'Create without employeee' box!",
        //         statusCode: 502
        //     }));
        //     return false;
        // }
        dispatch(errorReset());
        return true;
    };

    const handleCategoryFormClose = () => {

        // dispatch(errorReset());
        setCategoryTitle("");
        setCategoryIncharge(null);
        setIsEdit(false);
        toggleCategoryForm();
    };

    const handleEditCategory = () => { };

    const handleSaveCategory = () => {
        if (!validateCategory()) return;
        const category = {
            name: categoryTitle,
            incharge: null
        };
        dispatch(errorReset())
            .then(
                dispatch(addCategory(category))
            )
            .then(
                () => {
                    if (isError) {
                        setSnackMsg("Category addition failed!");
                        setSnack(true);
                        return;
                    }
                    setSnackMsg("Category added Successfully!");
                    setSnack(true);
                    handleCategoryFormClose();
                    return;
                }
            );

    };

    const getCategoryTitle = () => {
        const idx = categories.findIndex(category => category._id === catToRemove);
        if (categories[idx]) return categories[idx].name;
        return "Can't find title :("
    };

    const handleAlertClose = () => {
        setCatToRemove("");
        toggleAlert();
    };

    const removeCategory = () => {
        dispatch(errorReset())
            .then(
                dispatch(deleteCategory(catToRemove))
            )
            .then(
                () => {
                    if (isError) {
                        setSnackMsg(errorMsg);
                        setSnack(true);
                        return;
                    }
                    setSnackMsg("Category deleted successfully!");
                    setSnack(true);
                    handleAlertClose();
                    return;
                }
            );
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
                    Admin Home
                </Typography>
                <Typography color="textPrimary">Categories</Typography>
            </Breadcrumbs>
            {/* <Paper
                className={classes.toggleButtonContainer}
                elevation={0}
            >
                <Button
                    className={classes.selectedButton}
                >
                    Students Accounts
                </Button>
                <Button
                    className={classes.unSelectedButton}
                    onClick={() => {
                        props.history.push("/admin/pending-requests/employees-requests");
                    }}
                >
                    Employees accounts
                </Button>
            </Paper> */}
            <div className={classes.pageHeading}>
                <h1>Categories</h1>
                <Button
                    className={classes.btnAddNewCategory}
                    onClick={() => {
                        toggleCategoryForm();
                    }}
                >Add new Category</Button>
            </div>
            <div className={classes.tableContainer}>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.tableHeading}>
                                <TableCell align="left">No.</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Incharge</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderCategories()}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25]}
                    component='div'
                    count={categories.length}//{staff.length}
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
                        title: "Do you really want to Delete this category?",
                        content: `Category: ${getCategoryTitle()}`
                    }
                }
                handleCancel={handleAlertClose}
                handleYes={removeCategory}
            />
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                open={openCategoryForm}
            >
                <DialogTitle>
                    <Typography
                        className={classes.dialogTitleText}
                    >{isEdit ? 'Edit' : 'New'} Category</Typography>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    {isError && <div className={classes.error}>
                        <Typography>{errorMsg}</Typography>
                    </div>}
                    <CategoryForm
                        values={{
                            categoryTitle,
                            setCategoryTitle,
                            categoryIncharge,
                            setCategoryIncharge,
                            createWithoutEmp,
                            toggleCreateWithoutEmp
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCategoryFormClose}
                    >
                        BackPage
                    </Button>
                    <Button
                        onClick={
                            isEdit ? handleEditCategory
                                : handleSaveCategory}
                        className={classes.formBtnSave}
                    >
                        Save Category
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
        </div >
    );
}

export default withStyles(styles)(Categories);