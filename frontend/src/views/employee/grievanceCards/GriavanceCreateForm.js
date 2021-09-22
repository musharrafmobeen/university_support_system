import { Backdrop, Button, CircularProgress, FormControl, InputLabel, Paper, Select, Snackbar, TextField, withStyles } from "@material-ui/core";
import { relativeTimeRounding } from "moment";
import MUIRichTextEditor from "mui-rte";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCategories } from "../../../store/categories/categories";
import { addGrievance } from "../../../store/grievances/grievances";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { errorOccured, errorReset } from "../../../store/ui/error";
import styles from "../../../styles/studentStyles/grievanceCardsStyles/GreiavanceCreateFormStyles";


function GrievanceCreateForm(props) {
    const { classes } = props;

    const [grievanceTitle, setGrievanceTitle] = useState("");
    const [grievanceDescription, setGrievanceDescription] = useState("");
    const [grievanceCategory, setGrievanceCategory] = useState("");

    const grievances = useSelector(state => state.entities.grievances.list);
    const grievancesLoading = useSelector(state => state.entities.grievances.loading);
    const grievancesErr = useSelector(state => state.entities.grievances.isError);
    const grievancesErrMsg = useSelector(state => state.entities.grievances.errorMessage);

    const categories = useSelector(state => state.entities.categories.list);
    const categoriesLoading = useSelector(state => state.entities.categories.loading);
    const categoriesErrMsg = useSelector(state => state.entities.categories.errorMessage);
    const categoriesErr = useSelector(state => state.entities.categories.isError);
    const uiError = useSelector(state => state.ui.error.isError);
    const uiErrorMsg = useSelector(state => state.ui.error.errorMessage);
    const dispatch = useDispatch();
    const authToken = localStorage.getItem("token");
    const currentUser = useSelector(state => state.auth.user);


    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    const isLoading = grievancesLoading || categoriesLoading
    const isError = grievancesErr || uiError || categoriesErr
    const errorMsg = grievancesErrMsg || uiErrorMsg || categoriesErrMsg

    useEffect(() => {
        dispatch(drawerSelectionChanged("Grievances"));
        if (categories.length === 0) dispatch(loadCategories());
    }, []);

    const handleTitileChange = e => {
        setGrievanceTitle(e.target.value);
    };
    const handleCategoryChange = e => {
        setGrievanceCategory(e.target.value);
    };

    const getCatOptions = () => {
        const avialableOpts = categories.filter(cat => cat.incharge !== null);
        const list = avialableOpts.map(category => (
            <option key={category._id} value={category._id}>{category.name}</option>
        ));
        return list;
    };

    const save = (data) => {
        setGrievanceDescription(`${data}`);
        dispatch(errorReset());
    };

    const validateGrievance = () => {
        if (grievanceTitle === "") {
            dispatch(errorOccured({
                message: "Provide a valuable title!",
                statusCode: 502
            }));
            return false;
        }
        if (grievanceDescription === "") {
            dispatch(errorOccured({
                message: "Please provide a Description content body. If you have, press the save button from last of the toolbar and try again!",
                statusCode: 502
            }));
            return false;
        }
        if (grievanceCategory === "") {
            dispatch(errorOccured({
                message: "Please select a valid category!",
                statusCode: 502
            }));
            return false;
        }
        dispatch(errorReset());
        return true;
    };

    const saveGrievance = () => {
        if (!validateGrievance()) return;
        const grievance = {
            lodgedBy: currentUser._id,
            title: grievanceTitle,
            category: grievanceCategory,
            description: grievanceDescription,
            status: "Newly created Grievance"
        };
        dispatch(errorReset())
            .then(
                () => {
                    dispatch(addGrievance(grievance))
                        .then(
                            () => {
                                if (isError) {
                                    setSnackMsg("Grievance addition failed!");
                                    setSnack(true);
                                    return;
                                }
                                else {
                                    setSnackMsg("Grievance added successfully!");
                                    setSnack(true);
                                    props.history.push(`/employee/grievances`);
                                }
                            }
                        )
                }
            );
    }

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackMsg("");
        setSnack(false);
    };

    return (
        <div>
            {isError ? <Paper>{errorMsg}</Paper> : ""}
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            {
                currentUser && <>
                    <div className={classes.pageHeading}>
                        <h1>{grievanceTitle}</h1>
                        <Button
                            className={classes.btnAddNewGrievacne}
                            onClick={saveGrievance}
                        >Save Lesson</Button>
                    </div>
                    <div className={classes.formRoot}>
                        <div className={classes.formFields}>
                            <TextField
                                className={classes.margin}
                                fullWidth
                                variant="outlined"
                                label="Grievance Titile"
                                type="text"
                                value={grievanceTitle}
                                onChange={handleTitileChange}
                            />
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
                                    value={grievanceCategory}
                                    onChange={handleCategoryChange}
                                    label="Category"
                                    inputProps={{
                                        name: "Category",
                                        id: "outlined-category-native-simple",
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    {getCatOptions()}
                                </Select>
                            </FormControl>
                        </div>
                        <MUIRichTextEditor
                            label="Provide grievance description here..."
                            onSave={save}
                            inlineToolbar={true}
                        />
                    </div>
                </>
            }
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

export default withRouter(withStyles(styles)(GrievanceCreateForm));