import NotFound from '../../resources/design-images/NotFound.png';
const styles = theme => ({
    root:{
        backgroundColor:"#015927",
        backgroundImage:`url(${NotFound})`,
        backgroundPosition:`center`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        height:"100vh",
        [theme.breakpoints.down('sm')]: {
            // backgroundSize:"cover",
            // height:"15vh",
        },
    },
    homeIcon:{
        position:"absolute",
        top:"1%",
        left:"1%",
        textAlign:"center",
        fontWeight:"bolder",
        color:"white",
        "&:hover":{
            cursor:"pointer",
            color:"#006838"
        },
    },
});

export default styles;