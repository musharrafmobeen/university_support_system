

const styles = theme => ({
    root: {
        width: "95%",
        padding: "2em"
    },
    letterHeading: {
        textAlign: "center",
        "& *": {
            fontWeight: "bolder",
        },

    },
    headerDivider: {
        border: `1px solid black`
    },
    paraText: {
        fontFamily: 'Roboto',
        fontWeight: "normal",
        textIndent: "4em",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        textAlign: "justify"
    },
});

export default styles;