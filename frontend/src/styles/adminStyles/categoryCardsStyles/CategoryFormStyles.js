

const styles = theme => ({
    constainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
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
    switchText:{
        whiteSpace:"nowrap",
        
    },
    rootForm: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 1%",
        "& *": {
            marginLeft: "0.75%",
            marginRight: "0.75%"
        },
    },
});

export default styles;