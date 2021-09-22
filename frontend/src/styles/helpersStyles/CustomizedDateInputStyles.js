

const iconColor = "#C4C4C4";

const styles = theme => ({
    inputField:{
        marginTop:"-3%",
        padding:"0.7em",
        backgroundColor:"transparent",
        border:`1px solid ${iconColor}`,
        borderRadius:"4px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        minHeight:"3.5rem",
        "&:hover":{
            border:`1px solid black`,
            cursor:"pointer"
        },
    },
    icon:{
        //color:iconColor,
    },
    title:{
        position:"absolute",
        top:"-10%"
    },
    btnSave:{
        backgroundColor:"#674FFF",
        color:"white",
        marginLeft:"auto",
        marginRight:"auto",
        transition:"all 0.3s",
        border:`1px solid #674FFF`,
        "&:hover":{
            backgroundColor:"white",
            color:"#674FFF",
           
        },
    },
});

export default styles;