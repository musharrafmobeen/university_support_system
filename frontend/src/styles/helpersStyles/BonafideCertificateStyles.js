

const styles = theme => ({
    root: {
        padding: "1em",
        width: "98%",
        textAlign:"center",
    },
    pageHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1em",

    },
    pageHeaderLogo: {
        // position: "absolute",
        // left: "1%"
        marginRight: "2rem",
        float: "left"
    },
    headerText: {
        // marginLeft:"auto"
        // position:"fixed"
    },
    headerDivider: {
        border: `1px solid black`
    },
    contactInfo: {
        fontSize: "0.8em",
        // margin: `1% 0`,
        // padding: "none",
        margin: "0",
        padding: "0",
        border: "0",
        // fontSize: "100%",
        font: "inherit",
        verticalAlign: "baseline",

    },
    letterInfo: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1em",
        "& *": {
            marginTop: "1%",
            marginBottom: "1%"
        },
    },
    studentInfo: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "1em",
    },
    infoTable: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "left",
        padding: "1em",
        textAlign: "left",
        "& *": {
            // textIndent: "6px"
            textAlign: "left"
        },
    },
    letterBottom: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    liner: {
        // border:`0.1em solid black`,
        backgroundColor: "black"
    },
    statement:{
        fontFamily: 'Roboto',
        fontWeight:"normal",
        textIndent:"6em",
        wordWrap:"break-word"
    },
});

export default styles;