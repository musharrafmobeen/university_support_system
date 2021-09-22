import { AppBar, IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import styles from '../../styles/homeStyles/NavbarStyles';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';

function Navbar(props) {
    const { classes } = props;
    const {
        signInClick,
        signUpClick
    } = props.values;

    return (
        <div>
            <AppBar
                position="static"
                className={classes.navAppBar}>
                <Toolbar
                    className={classes.navToolBar}
                >
                    <div className={classes.grow}></div>
                    <div className={classes.buttons}>
                        <div
                            className={classes.clickAbleText}
                            onClick={signUpClick}
                        >
                            <GroupAddIcon />
                            <Typography className={classes.text}>Sign Up</Typography>
                        </div>
                        <div
                            className={classes.clickAbleText}
                            onClick={signInClick}
                        >
                            <LockOpenIcon />
                            <Typography className={classes.text}>Sign In</Typography>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(Navbar);