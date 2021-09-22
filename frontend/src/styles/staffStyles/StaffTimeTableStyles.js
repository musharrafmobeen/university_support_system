import { fade } from '@material-ui/core/styles/colorManipulator';


const lightThemeBgColor = "#E5E5E5";
const appThemeMainColor = "#674FFF";

const styles = theme => ({
    // rootPaper:{
    //     "&::scrollbar":{
    //         width:"200px",
    //     },
    //     "&::webkitScrollbarTrack":{
    //         borderRadius:"10px",
    //         boxShadow:`inset 0 0 5px grey`,
    //     },
    //     "&::webkitScrollbarThumb":{
    //         backgroundColor:"red",
    //         borderRadius:"10px",
    //         "&:hover":{
    //             backgroundColor:"#b30000"
    //         },
    //     },
    // },
    rootPaper: {
        // backgroundColor: fade(lightThemeBgColor, 0.60),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    pageHeading: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em"
    },
    toggleButtonContainer: {
        padding: "0.2%",
        // backgroundColor: "#E3E4E5",
        position: "absolute",
        right: "2%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "4%",
            position: "relative",
            marginRight: "auto",
            marginLeft: "auto",
            zIndex: "3"
        },
        "& *": {
            whiteSpace: "nowrap",
            textAlign: "center"
        },
    },
    toggleButtonContainerSchedule: {
        padding: "0.2%",
        // backgroundColor: "#E3E4E5",
        // position: "absolute",
        // right: "2%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "4%",
            position: "relative",
            marginRight: "auto",
            marginLeft: "auto",
            zIndex: "3"
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
    alert: {
        textAlign: "center",
        border: `0.75px solid ${fade(appThemeMainColor, 0.85)}`,
        borderRadius: "12px",
        width: "95%",
        backgroundColor: fade(appThemeMainColor, 0.06),
        marginLeft: "auto",
        marginRight: "auto",
        color: fade(theme.palette.common.black, 0.98),
        "&:hover": {
            cursor: "pointer",
            boxShadow: `0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)`,
            backgroundColor: fade(theme.palette.common.white, 0.98),
            color: fade(appThemeMainColor, 0.98),
        },
    },
    messageText: {
        marginTop: "0.75em",
        marginBottom: "0.75em",
        fontWeight: "bolder",
        color: "inherit"
    },
});

export default styles;