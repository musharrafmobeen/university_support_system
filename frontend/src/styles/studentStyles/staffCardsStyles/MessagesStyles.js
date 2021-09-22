

const styles = theme => ({
    chatBox:{
        display:"flex",
        flexDirection:"column",
        width:"50%",
        height:"70vh",
        marginTop:"2em",
        marginBottom:"4em",
        marginLeft:"auto",
        marginRight:"auto",
        border:`0.7px solid black`,
        borderRadius:"4px",
        justifyContent:"space-between",
        alignItems:"center" ,
        overflow:"auto"
    },
    chat:{
        display:"flex",
        flexDirection:"coumn",
        alignItems:"center",width:"90%"
    },
    leftAligned:{
        display:"flex",
        justifyContent:"left",
        flexDirection:"column",
        alignItems:"left",
        alignSelf:"left",
        width:"100%"
    },
    rightAligned:{
        display:"flex",
        justifyContent:"right",
        alignItems:"right",
        float:"right"
    },
    wraper:{
        display:"block",
    },
    messageInput:{
        backgroundColor:"white",
        color:"black",
        border:`1px solid green`,
        borderRadius:"18px",
        width:"60%",
        padding:"0 1em",
        display:"flex",
        alignItems:"center",
        position:"fixed",
        bottom:"5%"
    },
    sendIcon:{
        "&:hover":{
            cursor:"pointer",
            color:"green"
        },
    },
});

export default styles;