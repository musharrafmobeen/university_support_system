

const styles = theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    profileCard: {
        width: "40%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em",
        padding: "1em",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
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