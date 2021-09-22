import { Divider, Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import styles from "../../styles/helpersStyles/RefrenceLetterStyles";


function RefrenecLetter(props) {
    const { classes } = props;

    const { requestee, staff, grantedDate } = props;

    const getFirstName = (name) => {
        return name.split(" ")[0];
    };

    const getYears = date => {
        return moment().diff(moment(date),'years')
    };

    return (
        <div>
            <div className={classes.root}>
                <div className={classes.letterHeading}>
                    <Typography type="h1" component="h1">
                        Letter of Recommendation
                    </Typography>
                    <Typography type="h1" component="h1">For Student</Typography>
                </div>
                <Divider className={classes.headerDivider} />
                <br />
                <div className={classes.letterStart}>
                    <Typography>{grantedDate?  moment(grantedDate).format("MMMM Do, YYYY") : moment().format("MMMM Do, YYYY")}</Typography>
                    <br />
                    <Typography>Admissions Office</Typography>
                    <Typography>{requestee.desiredUni}</Typography>
                    <br />
                    <Typography>Dear Admissions Committee,</Typography>
                    <br />
                </div>
                <div className={classes.letterBody}>
                    <Typography className={classes.paraText}>
                        It is my great pleasure to recommend {requestee.name} for admission to {requestee.desiredUni}. I have known {getFirstName(requestee.name)} for {getYears(requestee.initialDateOfJoining)} years and was delighted to serve as his teacher at International Islamic University, Islamabad. During that time, I watched {getFirstName(requestee.name)} grow into an outstanding individual who excels in both his academic and personal pursuits.

                        <Typography
                            className={classes.paraText}
                        >
                            As {getFirstName(requestee.name)} teacher, I witnessed his extraordinary ability to quickly understand advanced concepts and then adeptly apply them to real world situations first hand. His senior year project was particularly impressive.
                        </Typography>

                        <Typography
                            className={classes.paraText}
                        >
                            {getFirstName(requestee.name)}'s academic accomplishments are rivaled only by his personal strengths. His compassion and charisma are beyond his years and he is well-loved by his peers, as well as all those who had the pleasure of teaching him. Whenever any of his fellow students are having a difficult time or feeling down, he never fails to step in with an encouraging word and a smile.
                        </Typography>

                        <Typography
                            className={classes.paraText}
                        >
                            I highly recommend you accept {requestee.name} for {requestee.desiredUni}. I am confident he will make an excellent addition to your university's community. Please feel free to contact me if you have any questions regarding his character or past academic work.
                        </Typography>

                    </Typography>
                </div>
                <br />
                <div className={classes.letterBottom}>
                    <Typography>Sincerely,</Typography>
                    <br />
                    <Typography>________________</Typography>
                    <Typography>{staff.name}</Typography>
                    <Typography>{staff.designation}</Typography>
                    <Typography>Internatioal Islamic University, Islamabad</Typography>

                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(RefrenecLetter);