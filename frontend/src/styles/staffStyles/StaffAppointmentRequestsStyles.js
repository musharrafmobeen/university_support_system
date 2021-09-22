
import { fade } from '@material-ui/core/styles/colorManipulator';


const lightThemeBgColor = "#E5E5E5";
const appThemeMainColor = "#674FFF";

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
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
    toggleButtonContainer: {
        padding: "0.2%",
        backgroundColor: "#E3E4E5",
        position: "absolute",
        right: "2%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "4%",
            marginTop: "4%",
            position: "relative",
            marginRight: "auto",
            marginLeft: "auto",
            zIndex: "3",
            flexDirection: "column"
        },
        "& *": {
            whiteSpace: "nowrap",
            textAlign: "center"
        },
    },
    btnAddNewStaff: {
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
    selectedButton: {
        margin: "1%",
        backgroundColor: "white",
        "&:hover": {
            backgroundColor: appThemeMainColor,
            color: "white",
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
        whiteSpace: "nowrap",
        textAlign: "center"
    },
    unSelectedButton: {
        margin: "1%",
        backgroundColor: lightThemeBgColor,
        "&:hover": {
            backgroundColor: appThemeMainColor,
            color: "white",
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
        whiteSpace: "nowrap",
        textAlign: "center"
    },
    tableContainer: {
        width: "95%",
        margin: "2%",
        padding: "1em",
    },
    table: {
        borderCollapse: "separate",
        borderSpacing: `0 0.4em`
    },
    tableHeading: {
        "& th": {
            color: "#C2C5C7",
            fontWeight: "bold",
        }
    },
    infoDataRow: {
        padding: "1em",
        borderRadius: "8px",
        backgroundColor: fade(theme.palette.common.white, 0.85),
        "&:hover": {
            cursor: "pointer",
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
    deleteButton: {
        backgroundColor: "none",
        "&:hover": {
            color: "red",
            backgroundColor: "none",
        },
    },
    timeTableButton: {
        backgroundColor: "none",
        "&:hover": {
            color: "#0945e8",
            backgroundColor: "none",
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
    clickAble: {
        textTransform: "capitalize",
        textDecoration: "underline",
        "&:hover": {
            cursor: "pointer",
            color: fade(appThemeMainColor, 0.80),
        },
    },
    btnAddNewAppointment: {
        marginTop: "8%",
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
});

export default styles;