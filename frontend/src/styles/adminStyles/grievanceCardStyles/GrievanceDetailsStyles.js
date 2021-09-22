import { fade } from '@material-ui/core/styles/colorManipulator';

const lightThemeBgColor = "#E5E5E5";
const appThemeMainColor = "#674FFF";

const styles = theme => ({
    infoRowContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em"
    },
    tableContainer: {
        width: "95%",
        margin: "1%",
        padding: "1em",
    },
    table: {
        borderCollapse: "separate",
        borderSpacing: `0 0.4em`
    },
    tableHeading: {
        "& th": {
            color: fade("#006838", 0.65),
            fontWeight: "bold",
        }
    },
    infoHead: {
        "& th": {
            color: fade("#006838", 0.95),
        }
    },
    infoDataRow: {
        padding: "1em",
        borderRadius: "8px",
        backgroundColor: fade(theme.palette.common.white, 0.85),
        "&:hover": {
            boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
            backgroundColor: fade(theme.palette.common.white, 0.98),
        },
        "& td:first-child": {
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px"
        },
        "& td:last-child": {
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px"
        },
    },
    capitalized: {
        textTransform: "capitalize"
    },
    descriptionContainer: {
        borderRadius: "12px",
        width: "96%",
        marginLeft: "2%",
        marginRight: "2%",
        padding: "1em"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    delayedGrievance: {
        border: `0.75px solid ${fade("#FF0000", 0.85)}`,
        borderRadius: "12px",
        width: "95%",
        backgroundColor: fade("#FF0000", 0.06),
        marginLeft: "auto",
        marginRight: "auto",
        color: fade(theme.palette.common.black, 0.98),
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
            backgroundColor: fade(theme.palette.common.white, 0.98),
            color: fade("#FF0000", 0.98),
        },
    },
    delayMsg: {
        marginTop: "0.75em",
        marginBottom: "0.75em",
        fontWeight: "bolder",
        color: "inherit"
    },
    solvedGrievance: {
        border: `0.75px solid ${fade("#006838", 0.85)}`,
        borderRadius: "12px",
        width: "95%",
        backgroundColor: fade("#006838", 0.06),
        marginLeft: "auto",
        marginRight: "auto",
        color: fade(theme.palette.common.black, 0.98),
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
            backgroundColor: fade(theme.palette.common.white, 0.98),
            color: fade("#006838", 0.98),
        },
    },
    solveMsg: {
        marginTop: "0.75em",
        marginBottom: "0.75em",
        fontWeight: "bolder",
        color: "inherit"
    },
    pausedGrievance: {
        border: `0.75px solid ${fade("#d9a300", 0.85)}`,
        borderRadius: "12px",
        width: "95%",
        backgroundColor: fade("#d9a300", 0.06),
        marginLeft: "auto",
        marginRight: "auto",
        color: fade(theme.palette.common.black, 0.98),
        textAlign: "center",
        "&:hover": {
            cursor: "pointer",
            boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
            backgroundColor: fade(theme.palette.common.white, 0.98),
            color: fade("#d9a300", 0.98),
        },
    },
    pauseMsg: {
        marginTop: "0.75em",
        marginBottom: "0.75em",
        fontWeight: "bolder",
        color: "inherit"
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
    btnUpdateGrievance: {
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