import { Backdrop, Button, CircularProgress, FormControl, InputLabel, Paper, Select, Snackbar, TextField, withStyles } from "@material-ui/core";
import { relativeTimeRounding } from "moment";
import MUIRichTextEditor from "mui-rte";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCategories } from "../../../store/categories/categories";
import { addGrievance, loadGrievances, updateGrievance } from "../../../store/grievances/grievances";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { errorOccured, errorReset } from "../../../store/ui/error";
import styles from "../../../styles/studentStyles/grievanceCardsStyles/GreiavanceCreateFormStyles";


function GrievanceEditForm(props) {
    const { classes } = props;

    const grievanceId = props.match.params.id;

    const [grievanceDescription, setGrievanceDescription] = useState("");

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
        if (grievances.length === 0) dispatch(loadGrievances());
    }, []);

    const getCurrentGrievance = () => {
        const index = grievances.findIndex(grievance => grievance._id === grievanceId);
        if (grievances[index]) return grievances[index];
    };

    const currentGrievance = getCurrentGrievance();

    const save = (data) => {
        setGrievanceDescription(`${data}`);
        dispatch(errorReset());
    };

    const validateGrievance = () => {
        if (grievanceDescription === "") {
            dispatch(errorOccured({
                message: "Please provide a Description content body. If you have, press the save button from last of the toolbar and try again!",
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
            description: grievanceDescription,
        };
        dispatch(errorReset())
            .then(
                () => {
                    dispatch(updateGrievance(grievanceId, grievance))
                        .then(
                            () => {
                                if (isError) {
                                    setSnackMsg("Grievance updation failed!");
                                    setSnack(true);
                                    return;
                                }
                                else {
                                    setSnackMsg("Grievance updated Successfully!");
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
                currentGrievance && <>
                    <div className={classes.pageHeading}>
                        <h1>{currentGrievance.title}</h1>
                        <Button
                            className={classes.btnAddNewGrievacne}
                            onClick={saveGrievance}
                        >Save Grievance</Button>
                    </div>
                    <div className={classes.formRoot}>
                        <div className={classes.formFields}>
                            <TextField
                                disabled
                                className={classes.margin}
                                fullWidth
                                variant="outlined"
                                label="Grievance Titile"
                                type="text"
                                value={currentGrievance.title}
                            />
                            <TextField
                                disabled
                                className={classes.margin}
                                fullWidth
                                variant="outlined"
                                label="Grievance Category"
                                type="text"
                                value={currentGrievance.category.name}
                            />
                        </div>
                        <MUIRichTextEditor
                            label="Provide grievance description here..."
                            onSave={save}
                            inlineToolbar={true}
                            defaultValue={currentGrievance.description}
                            readOnly={currentGrievance.isClosed}
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

export default withRouter(withStyles(styles)(GrievanceEditForm));