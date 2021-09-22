import { FormControl, InputLabel, Select, TextField, withStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/studentStyles/appointmentCardsStyles/AppointmentFormStyles";
import { loadStaffs } from '../../../store/users/staffs';


function AppointmentForm(props) {
    const { classes } = props;
    const {
        requestedStaff,
        setRequestedStaff,
        requestDescription,
        setRequestDescription
    } = props.values;

    const staffs = useSelector(state => state.entities.users.staffs.list);
    const dispatch = useDispatch();

    useEffect(() => {
        if (staffs.length === 0) dispatch(loadStaffs());
    }, []);

    const handleStaffCahnge = e => { setRequestedStaff(e.target.value); };

    const handleDescChange = e => { setRequestDescription(e.target.value); };

    const getStaffOptions = () => {
        const list = staffs.map(user => (
            <option key={user._id} value={user._id}>{user.employee.name}</option>
        ));
        return list;
    };

    return (
        <div>
            <form>
                <FormControl
                    variant="outlined"
                    fullWidth
                    className={classes.margin}
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
                <TextField
                    className={classes.margin}
                    variant="outlined"
                    id="requestDescription"
                    label="Description"
                    type="text"
                    value={requestDescription}
                    onChange={handleDescChange}
                    fullWidth
                />
            </form>
        </div>
    );
}

export default withStyles(styles)(AppointmentForm);