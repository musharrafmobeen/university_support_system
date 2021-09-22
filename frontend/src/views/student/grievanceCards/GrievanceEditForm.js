import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Paper, Select, Snackbar, TextField, Typography, withStyles } from "@material-ui/core";
import { relativeTimeRounding } from "moment";
import MUIRichTextEditor from "mui-rte";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { loadCategories } from "../../../store/categories/categories";
import { addGrievance, loadGrievances, updateGrievance } from "../../../store/grievances/grievances";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import { errorOccured, errorReset } from "../../../store/ui/error";
import { loadStaffs } from "../../../store/users/staffs";
import { addRating } from '../../../store/staffRatings/staffRatings';
import useToggleState from "../../../hooks/useToggleState";
import styles from "../../../styles/studentStyles/grievanceCardsStyles/GreiavanceCreateFormStyles";
import RatingForm from "../../helpers/RatingsForm";


function GrievanceEditForm(props) {
    const { classes } = props;

    const grievanceId = props.match.params.id;

    const [grievanceDescription, setGrievanceDescription] = useState("");

    const [rating, setRating] = useState(0);
    const [openRatingForm, toggleRatingForm] = useToggleState(false);

    const grievances = useSelector(state => state.entities.grievances.list);
    const grievancesLoading = useSelector(state => state.entities.grievances.loading);
    const grievancesErr = useSelector(state => state.entities.grievances.isError);
    const grievancesErrMsg = useSelector(state => state.entities.grievances.errorMessage);

    const staff = useSelector(state => state.entities.users.staffs.list);
    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const staffErr = useSelector(state => state.entities.users.staffs.isError);
    const staffErrMsg = useSelector(state => state.entities.users.staffs.errorMessage);

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
        if (staff.length === 0) dispatch(loadStaffs());
    }, []);

    const getCurrentGrievance = () => {
        const index = grievances.findIndex(grievance => grievance._id === grievanceId);
        if (grievances[index]) return grievances[index];
    };

    const currentGrievance = getCurrentGrievance();

    const getInchargeName = inchargeId => {
        const index = staff.findIndex(user => user._id === inchargeId);
        if (staff[index]) return staff[index].employee.name;
        return "Incharge Name can't be found!"
    };

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
                                    props.history.push(`/student/grievances`);
                                }
                            }
                        )
                }
            );
    }

    const validateRating = () => {
        if (rating === 0) {
            dispatch(errorOccured({
                message: "Please choose an appropriate rating value!",
                statusCode: 502
            }));
            return false;
        }

        dispatch(errorReset());
        return true;
    };

    const handleRatingFormClose = () => {

        // dispatch(errorReset());
        setRating(0);
        toggleRatingForm();
    };

    const handleSaveRating = () => {
        if (!validateRating()) return;
        const ratingObj = {
            staff: currentGrievance.category.incharge,
            student: currentUser._id,
            rating: rating
        };
        dispatch(errorReset())
            .then(
                dispatch(addRating(ratingObj))
            )
            .then(
                () => {
                    if (isError) {
                        setSnackMsg("Rating addition failed!");
                        setSnack(true);
                        return;
                    }
                    else {
                        setSnackMsg("Rating added Successfully!");
                        setSnack(true);
                        handleRatingFormClose();
                        return;
                    }
                }
            );
        handleRatingFormClose();
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
                        {
                            (!currentGrievance.isPaused && !currentGrievance.isClosed) && <Button
                                className={classes.btnAddNewGrievance}
                                onClick={saveGrievance}
                            >Save Grievance</Button>
                        }
                        {
                            (!currentGrievance.isPaused && currentGrievance.isClosed) && <Button
                                className={classes.btnAddNewGrievance}
                                onClick={() => { toggleRatingForm() }}
                            >Rate {getInchargeName(currentGrievance.category.incharge)}</Button>
                        }
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
                            <TextField
                                disabled
                                className={classes.margin}
                                fullWidth
                                variant="outlined"
                                label="Grievance Category Incharge"
                                type="text"
                                value={getInchargeName(currentGrievance.category.incharge)}
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
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                open={openRatingForm}
            >
                <DialogTitle>
                    <Typography
                        className={classes.dialogTitleText}
                    >Rate Incharge</Typography>
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    {isError && <div className={classes.error}>
                        <Typography>{errorMsg}</Typography>
                    </div>}
                    <RatingForm 
                    values={{ 
                        rating,
                        setRating
                     }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleRatingFormClose}
                    >
                        BackPage
                    </Button>
                    <Button
                        onClick={handleSaveRating}
                        className={classes.formBtnSave}
                    >
                        Save Rating
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
        </div>
    );
}

export default withRouter(withStyles(styles)(GrievanceEditForm));