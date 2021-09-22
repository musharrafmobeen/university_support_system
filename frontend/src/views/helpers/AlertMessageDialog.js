import {
    Button, Dialog, Typography,
    IconButton,
    DialogActions, DialogContent,
    DialogTitle, withStyles, Grow, Slide
} from "@material-ui/core";
import styles from '../../styles/helpersStyles/AlertMessageDialogStyles';
import CloseIcon from '@material-ui/icons/Close';

function AlertMessage(props) {
    const { classes } = props;
    const {
        openAlert,
        title,
        content,
        note
    } = props.values;
    const handleCancel = props.handleCancel;
    const handleYes = props.handleYes;
    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={openAlert}
                TransitionComponent={Slide}
            >
                <DialogTitle>
                    <div
                        className={classes.dialogTitle}
                    >
                        <Typography
                            className={classes.dialogTitleText}
                        >{title}</Typography>
                        <IconButton
                            onClick={handleCancel}
                            className={classes.dialogCloseIcon}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Typography>{content}</Typography>
                    {(note && note !== "") && <Typography><b>Note:</b> {note}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleYes}
                        color="secondary"
                        variant="contained"
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withStyles(styles)(AlertMessage);