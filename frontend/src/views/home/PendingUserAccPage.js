import { Button, Typography, withStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotFound from '../../resources/design-images/NotFound.png';
import { authLoggedOut } from '../../store/auth/auth';
import styles from '../../styles/homeStyles/HomeStyles';

function PendingUserAccount(props) {
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
                    <h1>Account Approval Pending:</h1>
                </div>
                <div className={classes.fromBottomWraper}>
                    <div className={classes.supportMessage}>
                        <Typography>Your account has been created and needs to be verified.</Typography>
                        <Typography>It seems that admin has not yet verified your account approval request.</Typography>
                        <Typography>You will be able to use the Support system once account is approved.</Typography>
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

export default withRouter(withStyles(styles)(PendingUserAccount));