
const styles = theme => ({
    studentName: {
        padding: "0 1%",
        marginTop: "1em",
        marginBottom: "1em",
        display: "flex",
        justifyContent: "center",
        "& *": {
            // width: "20%",
        },
    },
    certificate:{
        margin:"2%",
        padding:"1% 2%",
        justifyContent:"center",
        textAlign:"center"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    btnContainer:{
        padding:"1em",
        marginTop:"1em",
        marginBottom:"1em",
        width:"100%",
        display:"flex",
        justifyContent:"flex-end",
    },
    btnGrantDoc: {
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