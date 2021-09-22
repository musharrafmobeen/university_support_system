
const appThemeMainColor = "#674FFF";
const appIIUIColor = "#006838";
const styles = theme => ({
    profileInfoContainer: {
        display: "flex",
        justifyContent: "space-between",
        alifnItems: "center",
        padding: "1em",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            justifyContent: "space-around"
        },
    },
    profileContainer: {
        marginTop: "5%",
        width: "25%",
        marginRight: "1.5%",
        [theme.breakpoints.down("sm")]: {
            marginTop: "6%",
            width: "100%",
        },
    },
    timeTableContainer: {
        textAlign: "center",
        width: "75%",
        marginRight: "1.5%",
        [theme.breakpoints.down("sm")]: {
            marginTop: "1%",
            width: "100%",
        },
    },
    paperHead: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1%",
        marginBottom: "2%",
        textTrnsform: "capitalize",
        letterSpacing: "1px",
        fontWeight: "bolder",

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    chatButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: appThemeMainColor,
        "&:hover": {
            cursor: "pointer",
            color: appIIUIColor
        },
        marginTop: "2%",
        marginBottom: "2%"
    },
    ratingStar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& *": {
            marginLeft: "0.75%",
            marginRight: "0.75%",
        },
    },
    starIcon: {
        color: "#d6b511",
    },
    rating: {
        marginTop: "1%",
        marginBottom: "1%",
        borderRadius: "12px",
        padding: "1em"
    },
    ratingText: {
        color: theme.palette.info.light,
    },
});

export default styles;