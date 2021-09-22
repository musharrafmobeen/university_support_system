import IIUI_BG_IMG from '../../resources/design-images/IIUI_BG_IMG_Lable.jpg';

const styles = theme => ({
    homeBackGroundContainer: {
        borderRadius: `10px`,
        transform: `rotate(60deg)`,
        overflow: "hidden",
    },
    homeBackGround: {
        backgroundColor: "green",
        minWidth: "100vw",
        minHeight: "50vh"
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "75%",
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme
            .spacing(3)}px`,
        [theme.breakpoints.up("xl")]: {
            marginTop: "auto",
            marginBottom: "auto",
            justifyContent: "center"
        },
    },
    formTitle: {
        fontWeight: "bold",
        marginLeft: "2%",
        marginBottom: "2%",
        textTransform: "capitalize",
        [theme.breakpoints.up("xl")]: {
            fontSize: "xx-large",
        },
    },
    form: {
        width: "100%",
        [theme.breakpoints.down("lg")]: {
            marginTop: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: "auto",
        },
        [theme.breakpoints.up("xl")]: {
            // marginTop: "auto",
            // marginBottom:"auto",
            "& input": {
                padding: `4% 8%`,
                fontSize: "x-large"
            },
            "& label": {
                fontSize: "x-large",
            },
        },
    },
    fromBottomWraper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        },
    },
    supportMessage: {
        color: "#788497",
        width: "75%",
        textAlign: "justify",
        marginTop: theme.spacing(3),
        "&>a": {
            color: "#26A4FF",
            textDecoration: "none",
            "&:visited": {
                color: "#26A4FF"
            }
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
    },
    submit: {
        color: "white",
        backgroundColor: "#674FFF",
        whiteSpace: "nowrap",
        border: `0.5px solid #674FFF`,
        // marginTop: theme.spacing(3),
        marginLeft: theme.spacing(6),
        borderRadius: "5px",
        paddingRight: "20px",
        paddingLeft: "20px",
        "&:hover": {
            color: "#674FFF",
            backgroundColor: "white",
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: "x-large",
        },
        [theme.breakpoints.down("sm")]: {
            marginTop:"4%",
            marginLeft:"auto",
            marginRight:"auto"
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    bgImg: {
        marginTop: "4em",
        backgroundColor: "#015927",
        backgroundImage: `url(${IIUI_BG_IMG})`,
        backgroundPosition: `center`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        height: "20vh",
        [theme.breakpoints.down('sm')]: {
            // backgroundSize:"cover",
            height: "15vh",
        },
    },
    slideCoverData: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column"
        },
    },
});

export default styles;