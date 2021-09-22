import { useDispatch, useSelector } from "react-redux";
import UserProfile from '../helpers/UserProfile';
import configData from '../../config.json';
import { Backdrop, Breadcrumbs, CircularProgress, Paper, Typography, withStyles } from "@material-ui/core";
import styles from "../../styles/helpersStyles/ProfileStyles";
import { useEffect } from "react";
import { loadRatings } from "../../store/staffRatings/staffRatings";
import StarIcon from "../../resources/design-icons/StarIcon";


function StaffAccountProfile(props) {
    const { classes } = props;

    const dispatch = useDispatch();
    const currentAuth = useSelector(state => state.auth.user);
    const userRole = useSelector(state => state.auth.role);

    const staffLoading = useSelector(state => state.entities.users.staffs.loading);
    const authLoading = useSelector(state => state.auth.loading);

    const staffRatings = useSelector(state => state.entities.ratings.list);
    const staffRatingsLoading = useSelector(state => state.entities.ratings.loading);
    const staffRatingsErr = useSelector(state => state.entities.ratings.isError);
    const staffRatingsErrMsg = useSelector(state => state.entities.ratings.errorMessage);


    const isLoading = staffLoading || authLoading || staffRatingsLoading

    const baseUrl = configData.url.baseUrl;

    useEffect(() => {
        if (staffRatings.length === 0) dispatch(loadRatings());
    }, []);

    const getAverage = ratings => {
        let sum = 0;
        for (let i = 0; i < ratings.length; i++) {
            sum = sum + ratings[i];
        }
        let average = sum / ratings.length
        return average;
    };

    const getRating = id => {
        const idx = staffRatings.findIndex(rating => rating.staff === id);
        if (staffRatings[idx]) return <div className={classes.ratingStar}>
            <Typography>{getAverage(staffRatings[idx].rating)}</Typography>
            <StarIcon className={classes.starIcon} />
            <Typography> out of {staffRatings[idx].ratingCount} rating(s)</Typography>
        </div>
        return "No ratings yet!"
    };

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
                            userFirstName: currentAuth.employee.name.split(" ")[0],
                            userLastName: getSecondName(currentAuth.employee.name),
                            avatarSrc: currentAuth.employee.employeeImage ? `${baseUrl}/${currentAuth.employee.employeeImage}` : "",
                            email: currentAuth.employee.email,
                            designation: currentAuth.employee.designation,
                            department: currentAuth.employee.department,
                            isCurrentUser: true,
                            inChargeOf: currentAuth.inChargeOf,
                            isActive: currentAuth.isAvailable,
                            userType: userRole,
                        }}
                    />
                    <Paper elevation={0} className={classes.rating}>
                        <Typography className={classes.ratingText}>Rating:</Typography>
                        {getRating(currentAuth._id)}
                    </Paper>
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(StaffAccountProfile);