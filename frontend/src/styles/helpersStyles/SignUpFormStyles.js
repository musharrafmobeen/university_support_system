
const iconColor = "#C4C4C4";

const styles = theme => ({
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
    studentRegNo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1%",
        "& *": {
            marginLeft: "0.75%",
            marginRight: "0.75%"
        },
    },
    margin: {
        marginTop: "2%",
        marginBottom: "2%",
    },
});

export default styles;