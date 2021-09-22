const styles = theme => ({
    activeCardsContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: "8px",
        backgroundColor: "#E5E5E5",
        [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
            "&>*": {
                flex: `1 1 auto`,
            },
        },
    },
    contentCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
    activeCard: {
        borderRadius: "12px",
        width: "25%",
        [theme.breakpoints.down("sm")]: {
            width: "50%",
        },
        [theme.breakpoints.up("md")]: {
            width: "30%"
        },
        [theme.breakpoints.up("lg")]: {
            width: "30%"
        },
        [theme.breakpoints.up("xl")]: {
            width: "25%",
        },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 5,
        color: '#006838',
    },
    parent: {
        width: "95%",
        textAlign: "center",
        marginTop: "2%",
        margin: "1%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    heading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1%",
        borderBottom: `0.25px solid #788497`,
        marginBottom: "1%",
        color: "#788497",
    },
    headingIcon: {

    },
    headingText: {
        fontWeight: " bolder",
    },
    newsticker: {
        backgroundColor: "red"
    },
    grow:{
        display:"block",
        width:"100%",
        minHeight:"6em"
    },
});

export default styles;