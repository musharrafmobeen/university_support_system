
const iconColor = "#C4C4C4";

const styles = theme => ({
    profileCredentials: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1em",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    leftFields: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1%",
        width: "50%",
        "& *": {
            marginTop: "1%",
            marginBottom: "1%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "95%"
        },
    },
    rightFields: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1%",
        width: "50%",
        padding: "0.5em",
        [theme.breakpoints.down("sm")]: {
            width: "95%"
        },
        "& *": {
            marginTop: "1%",
            marginBottom: "1%",
        },
    },
    radioGroup: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    radioButton: {
        padding: "0.4em",
        border: `1px solid ${iconColor}`,
        borderRadius: "4px",
        "&:hover": {
            border: `1px solid #674FFF`,
            cursor: "pointer"
        },
    },
    profileInfoForm: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    margin: {
        marginTop: "4%",
        marginBottom: "4%",
    },
    avatarContainer: {
        minHeight: "8.5rem",
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "4%"
    },
    avatar: {
        // width:"50%",
        // height:"50%"
        minWidth: "8rem",
        minHeight: "8rem",
    },
    badgeIcon: {
        backgroundColor: "#C4C4C4",
        color: "white",
        border: `1px solid white`,
        borderRadius: "50%",
        "&:hover": {
            cursor: "pointer"
        },
    },
    accountCredentials: {

    },
    accountInfoFields: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "0.5em",
        marginTop: "2%",
        marginBottom: "2%",
        transition: "all 0.3s",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            "& *": {
                marginTop: "1%",
                marginBottom: "1%",
            },
        },
    },
    lowerDivHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "0.2em",
        "&:hover": {
            cursor: "pointer",
        },
    },
    lowerDivHeading: {
        fontWeight: "bold",

    },
    toggleSwitch: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1%",
        marginTop: "1%",
        marginBottom: "1%",
        "& *": {
            marginLeft: "0.75%",
            marginRight: "0.75%"
        },

    },
    switchText: {
        whiteSpace: "nowrap",

    },
});

export default styles;