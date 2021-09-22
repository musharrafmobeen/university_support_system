

const styles = theme => ({
    editCanvas:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        padding:"0.5em",
        "& *": {
            marginLeft: "1%",
            marginRight:"1%"
        },
        // [theme.breakpoints.up('sm')]:{
        //     flexDirection:"column",
        // },
    },
});

export default styles;