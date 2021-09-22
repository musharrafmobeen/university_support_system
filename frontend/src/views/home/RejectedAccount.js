import { Button, Typography, withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotFound from '../../resources/design-images/NotFound.png';
import { authLoggedOut } from '../../store/auth/auth';
import styles from '../../styles/homeStyles/HomeStyles';

function RejectedAccount(props) {
    const { classes } = props;

    const dispatch = useDispatch();

    const logUserOut = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("loggedIn", false);
        dispatch(authLoggedOut());
        props.history.push("/");
    };

    return (
        <div>
            <div className={classes.form}>
                <div className={classes.formTitle}>
                    <h1>Account Rejected  :(</h1>
                </div>
                <div className={classes.fromBottomWraper}>
                    <div className={classes.supportMessage}>
                        <Typography>Your account was created and needed to be verified.</Typography>
                        <Typography>It seems that admin has rejected your account approval request.</Typography>
                        <Typography>If you think it was by a mistake please contact with Program Office.</Typography>
                    </div>
                    <Button
                        className={classes.submit}
                        onClick={logUserOut}
                    >Logout</Button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(withStyles(styles)(RejectedAccount));