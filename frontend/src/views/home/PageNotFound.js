import { Typography, withStyles } from "@material-ui/core";
import { Redirect, withRouter } from "react-router-dom";
import styles from '../../styles/homeStyles/PageNotFoundStyles';
import home from '../../resources/design-images/home.svg';


function PageNotFound(props) {
    const { classes } = props;

    return (
        <div>
            <div className={classes.root}>
            </div>
            <div 
            className={classes.homeIcon}
            onClick={() => {props.history.push('/')}}
            >
                <img src={home} />
                <Typography>Home</Typography>
            </div>
        </div>
    );
}

export default withRouter(withStyles(styles)(PageNotFound));