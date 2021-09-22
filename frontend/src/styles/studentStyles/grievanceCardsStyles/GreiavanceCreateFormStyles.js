
import { fade } from '@material-ui/core/styles/colorManipulator';


const lightThemeBgColor = "#E5E5E5";
const appThemeMainColor = "#674FFF";
const styles = theme => ({
    formRoot: {
        margin: "1%",
        padding: "1em",
        backgroundColor: "white",
        height: "100vh"
    },
    formFields: {
        display: "flex",
        // flexDirection:"column",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {

            flexDirection: "column"
        },
    },
    margin: {
        marginTop: "2%",
        marginBottom: "2%",
        maginLeft: "0.75%",
        marginRight: "0.75%"
    },
    pageHeading: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "4%",
            marginTop: "4%",
            position: "relative",
            marginRight: "auto",
            marginLeft: "auto",
            zIndex: "3",
            flexDirection: "column"
        },
    },
    btnAddNewGrievance: {
        marginTop: "3%",
        right: "2%",
        backgroundColor: '#674FFF',
        padding: "0.4em",
        color: theme.palette.common.white,
        // width:"12rem",
        borderRadius: "0.2rem",
        // height:"2em",
        transition: "all 0.3s",
        border: `1px solid #674FFF`,
        "&:hover": {
            backgroundColor: "white",
            color: "#674FFF",

        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    dialogTitleText: {
        marginRight: "auto",
        float: "left",
        fontWeight: "bold",
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    error: {
        marginLeft: "auto",
        marginRight: "auto",
        color: "red"
    },
    formBtnSave: {
        backgroundColor: appThemeMainColor,
        color: "white",
        transition: "all 0.3s",
        border: `1px solid #674FFF`,
        "&:hover": {
            backgroundColor: "white",
            color: appThemeMainColor,
        },
    },
});

export default styles;