import { useSelector } from "react-redux";
import UserProfile from '../helpers/UserProfile';
import configData from '../../config.json';
import { Backdrop, Breadcrumbs, CircularProgress, Typography, withStyles } from "@material-ui/core";
import styles from "../../styles/helpersStyles/ProfileStyles";


function EmployeeAccountProfile(props) {
    const { classes } = props;
    const currentAuth = useSelector(state => state.auth.user);
    const userRole = useSelector(state => state.auth.role);

    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const authLoading = useSelector(state => state.auth.loading);
    const isLoading = staffLoading || authLoading;

    const baseUrl = configData.url.baseUrl;

    const getSecondName = (fullName) => {
        let secondName = "";
        for (let i = 1; i < fullName.split(" ").length; i++) {
            secondName = secondName + fullName.split(" ")[i] + " ";
        }
        return secondName;
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Typography color="primary" >
                    Profile
                </Typography>
            </Breadcrumbs>
            {//className={classes.profileCard}
                Object.keys(currentAuth).length !== 0 && <div className={classes.profileCard}>
                    <UserProfile
                        values={{
                            userFirstName: currentAuth.name.split(" ")[0],
                            userLastName: getSecondName(currentAuth.name),
                            avatarSrc: currentAuth.employeeImage ? `${baseUrl}/${currentAuth.employeeImage}` : "",
                            email: currentAuth.email,
                            designation: currentAuth.designation,
                            department: currentAuth.department,
                            isCurrentUser: true,
                            userType: userRole,
                            id: currentAuth._id
                        }}
                    />
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(EmployeeAccountProfile);