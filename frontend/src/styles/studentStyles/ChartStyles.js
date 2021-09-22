
const styles = theme => ({
    chartContianer: {
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItmes: "center",
        flexDirection: "column",
        [theme.breakpoints.down("sm")]: {
            marginTop: "4%"
        },
    },
    graphParent: {
        position: 'relative',
        height: '250px',
        width: '350px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down("sm")]: {
            paddingBottom:"2em"
        },
    },
    graph: {
        position: 'absolute',
        top: "4em",
        // left: 0,
        [theme.breakpoints.down("sm")]: {
            marginLeft: "auto",
            marginRight: "auto",
            alignSelf:"center",
            bottom:"6em",
            top:"2em"
        },
    },
    graphHeading: {
        position: "relative",
        top: "4em",
        margin: '0 5px',
        padding: 0,
        color: 'inherit'
    },
});

export default styles;