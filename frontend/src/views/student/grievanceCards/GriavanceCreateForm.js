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

    const createGrievance = grievance => new Promise((resolve, reject) => {
        dispatch(errorReset()).then(
            dispatch(addGrievance(grievance))
        );
        if (isError) {
            setSnackMsg("Grievance addition failed!");
            setSnack(true);
            return reject();
        }
        else {
            resolve();
        }
    });

    const saveGrievance = async () => {
        if (!validateGrievance()) return;
        const grievance = {
            lodgedBy: currentUser._id,
            title: grievanceTitle,
            category: grievanceCategory,
            description: grievanceDescription,
            status: "Newly created Grievance"
        };
        const showResult = () => {
            console.log("Show result called!");
            console.log("GrievanceLaoding",grievancesLoading);
            console.log("Is Laoding",isLoading);
            console.log("GrievanceError",grievancesErr);
            console.log("GrievanceErrorMsg",grievancesErrMsg);
            while (grievancesLoading || isLoading) { 
                console.log("waiting....");
            }
            if (grievancesErr) {
                setSnackMsg("Grievance addition failed!");
                setSnack(true);
                return;
            }
            else {
                setSnackMsg("Grievance added successfully!");
                setSnack(true);
                // props.history.push(`/student/grievances`);
            }
        };
        dispatch(errorReset())
            .then(
                () => {
                    dispatch(addGrievance(grievance))
                        .then(
                            // () => {
                            //     if (grievancesErr) {
                            //         setSnackMsg("Grievance addition failed!");
                            //         setSnack(true);
                            //         return;
                            //     }
                            //     else {
                            //         setSnackMsg("Grievance added successfully!");
                            //         setSnack(true);
                            //         props.history.push(`/student/grievances`);
                            //     }
                            // }
                            // showResult()
                        )
                }
            );
            showResult();
        // try {
        //     await createGrievance(grievance);
        //     setSnackMsg("Grievance added successfully!");
        //     setSnack(true);
        //     props.history.push(`/student/grievances`);
        // }
        // catch (err) {
        //     // setSnackMsg("Grievance addition failed!");
        //     // setSnack(true);
        //     // return;
        // }
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
                        >Save Grievance</Button>
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