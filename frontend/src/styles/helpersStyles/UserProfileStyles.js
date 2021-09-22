import { fade } from '@material-ui/core/styles/colorManipulator';

const appThemeMainColor = "#674FFF";
const lightThemeBgColor = "#E5E5E5";
const styles = theme => ({
    profileCard: {
        width: "100%",
        padding: "4px",
        borderRadius: "10px",
    },
    avatarContainer: {
        position: "relative",
        width: "100%",
        minWidth: "30px",
        minHeight: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        position: "absolute",
        top: "-120%",
        margin: `0 auto`,
        backgroundColor: lightThemeBgColor,
        minWidth: '5rem',
        minHeight: '5rem',
        border: `8px solid ${lightThemeBgColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2px",
    },
    profileAvatar: {
        minWidth: "6.5rem",
        minHeight: "6.5rem",
        border: `5px solid white`,
    },
    userName: {
        dispaly: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "2px",
        "& h1, h2, h3, h4, h5": {
            display: "inline-block",
            margin: "4px",
            padding: "2px",
            [theme.breakpoints.up("xl")]: {
                fontSize: "xxx-large",
            },
        },
        "& h1, h2": {
            fontSize: "bold",
            marginRight: "2.5px",
            [theme.breakpoints.up("xl")]: {
                fontSize: "xxx-large",
            },
        },
        "& h4, h5": {
            marginLeft: "2.5px",
            [theme.breakpoints.up("xl")]: {
                fontSize: "xxx-large",
            },
        },
    },
    infoTitle: {
        color: theme.palette.info.light,
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
    },
    infoText: {
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
    },
    links: {
        textAlign: "justify",
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
        color: "black",
        textDecoration: "none",
        "&:visted ,clicked , focused": {
            color: "black",
        },
    },
    message: {
        textAlign: "justify",
        [theme.breakpoints.up("xl")]: {
            fontSize: "medium",
        },
    },
    dialogTitle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    formTitle: {
        marginRight: "auto",
        float: "left",
        fontWeight: "bold",
    },
    formSaveBtn: {
        whiteSpace: "nowrap",
        backgroundColor: appThemeMainColor,
        border: `0.8px solid ${appThemeMainColor}`,
        color: "white",
        "&:hover": {
            backgroundColor: "white",
            color: appThemeMainColor,
        },
    },
    formCloseIcon: {
        borderRadius: "4px",
        backgroundColor: fade(lightThemeBgColor, 0.20),
        "&:hover": {
            backgroundColor: fade(lightThemeBgColor, 0.30),
        },
    },
});

export default styles;