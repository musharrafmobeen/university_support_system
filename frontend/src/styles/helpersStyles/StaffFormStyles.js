
const iconColor = "#C4C4C4";

const styles = theme => ({
    margin: {
        marginTop: "2%",
        marginBottom: "2%",
    },
    radioGroup: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    radioButton: {
        padding: "0.6em",
        marginLeft:"0.75%",
            marginRight:"0.75%",
        border: `1px solid ${iconColor}`,
        borderRadius: "4px",
        whiteSpace:"nowrap",
        "&:hover": {
            border: `1px solid #674FFF`,
            cursor: "pointer"
        },
    },
});

export default styles;