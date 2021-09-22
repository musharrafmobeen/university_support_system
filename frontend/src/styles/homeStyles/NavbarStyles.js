import { fade } from "@material-ui/core/styles/colorManipulator";


const styles = theme => ({
    navAppBar: {
        backgroundColor: "white",
        borderRadius: "10px",
        color: "black",
        position:"fixed",
        top:"0%",
    },
    navToolBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItmes: "center",
        padding: "0.15em 0.25em",
        [theme.breakpoints.down("sm")]: {
           justifyContent:"center"
        },
    },
    clickAbleText: {
        display: "flex",
        justifyContent: "space-between",
        alignItmes: "center",
        border: `0.25px solid ${fade(theme.palette.common.black, 0.15)}`,
        borderRadius: "12px",
        padding: "0.15em 0.25em",
        transition: "all 0.3s",
        marginLeft: "1%",
        marginRight: "1%",
        "&:hover": {
            cursor: "pointer",
            border: `0.25px solid ${fade(theme.palette.common.black, 0.85)}`,
        },
    },
    text: {
        textTransform: "capitalize",
        fontWeight: "bold",
        whiteSpace: "nowrap"
    },
    buttons: {
        display: "flex",
        justifyContent: "space-around",
        alignItmes: "center",
    },
    grow: {
        flexGrow: 1,
        [theme.breakpoints.down("sm")]: {
            flexGrow:0,
            display:"none"
        },
    },
});

export default styles;