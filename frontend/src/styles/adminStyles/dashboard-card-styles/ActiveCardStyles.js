const styles = theme => ({
    root:{
        padding:"4px",
        margin:"4px",
    },
    cardAvatar:{
        [theme.breakpoints.down("sm")]:{
            width:"30px",
            height:"30px",
        },
    },
    button:{
        display:"block",
        widht:"auto",
        height:"auto",
        backgroundColor:"#E5E5E5",
    },
});

export default styles;