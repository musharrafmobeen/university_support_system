import { FormControl, InputLabel, Select, TextField, withStyles } from "@material-ui/core";
import styles from '../../styles/helpersStyles/AnnouncementFormStyles';



function AnnouncementForm(props) {
    const { classes } = props;
    const {
        announcement,
        setAnnouncement,
        announcementFor,
        setAnnouncementFor
    } = props.values;

    const handleAnnouncementChange = e => {
        setAnnouncement(e.target.value);
    };

    const handleAnnouncementForChange = e => {
        setAnnouncementFor(e.target.value);
    }

    return (
        <div>
            <form>
                <TextField
                    className={classes.margin}
                    required
                    fullWidth
                    type="text"
                    id="announcement"
                    label="Announcement"
                    variant="outlined"
                    defaultValue=""
                    value={announcement}
                    onChange={handleAnnouncementChange}
                />
                <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                >
                    <InputLabel htmlFor="outlined-audience-native-simple">
                        Announcement Intended Audience
                    </InputLabel>
                    <Select
                        native
                        value={announcementFor}
                        onChange={handleAnnouncementForChange}
                        label="Announcement Intended Audience"
                        inputProps={{
                            name: "Announcement Intended Audience",
                            id: "outlined-Announcement-Intended-Audience-native-simple",
                        }}
                    >
                        <option aria-label="None" value="" />
                        <option value={"All"}>All Users</option>
                        <option value={"Staff"}>Staff Only</option>
                        <option value={"Student"}>Students and Employees</option>
                    </Select>
                </FormControl>
            </form>
        </div>
    );
}

export default withStyles(styles)(AnnouncementForm)