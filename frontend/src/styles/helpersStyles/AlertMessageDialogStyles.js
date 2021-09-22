import {fade} from '@material-ui/core/styles/colorManipulator';

const lightThemeBgColor = "#E5E5E5";

const styles = theme => ({
    dialogTitle:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
    },
    dialogTitleText:{
        marginRight:"auto",
        float:"left",
        fontWeight:"bold",
    },
    dialogCloseIcon:{
        borderRadius:"4px",
        backgroundColor:fade(lightThemeBgColor, 0.20),
        "&:hover":{
            backgroundColor:fade(lightThemeBgColor, 0.30),
        },
    },
});

export default styles;