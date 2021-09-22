import { makeStyles } from "@material-ui/core";

const ToolTipStyles = makeStyles((theme) => ({
    arrow: {
        color: "#475569", //theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: "#475569",//theme.palette.common.black,
    },
}));


export const HTMLToolTipStyles = makeStyles((theme) => ({
    arrow: {
        color:theme.palette.common.white,
    },
    tooltip: {
        backgroundColor:theme.palette.common.white,
        minWidth:"20rem"
    },
}));

export default ToolTipStyles;
