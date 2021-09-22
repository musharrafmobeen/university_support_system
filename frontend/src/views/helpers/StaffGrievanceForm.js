import { TextField, Typography, Switch, withStyles } from "@material-ui/core";
import styles from '../../styles/helpersStyles/StaffGrievanceFormStyles';

function StaffGrievanceForm(props) {
    const { classes } = props;
    const {
        setClose,
        toggleSetClose,
        status,
        setStatus,
        setPause,
        toggleSetPause
    } = props.values;

    const handleStatusCahnge = e => {
        setStatus(e.target.value);
    };

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.toggleSwitch}>
                    <Typography className={classes.switchText}>Mark Grievance as Solved! (i.e Close)</Typography>
                    <Switch
                        checked={setClose}
                        name="MarkSolved"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={
                            () => {
                                toggleSetClose()
                            }
                        }
                    />
                </div>
                <div className={classes.toggleSwitch}>
                    <Typography className={classes.switchText}>Pause grievance resolution process</Typography>
                    <Switch
                        checked={setPause}
                        name="MarkSolved"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onClick={
                            () => {
                                toggleSetPause(setPause ? false : true)
                            }
                        }
                    />
                </div>
                <form className={classes.rootForm}>
                    <TextField
                        variant="outlined"
                        id="grievanceStatus"
                        label="Grievance Status"
                        type="text"
                        value={status}
                        onChange={handleStatusCahnge}
                        fullWidth
                    />
                </form>
            </div>
        </div>
    );
}

export default withStyles(styles)(StaffGrievanceForm);