import { Divider, Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import IIUIIcon from "../../resources/design-icons/IIUIIcon";
import IIU_Arabic from '../../resources/design-images/IIUI_Arabic.svg'
import IIUI_LOGO_BLACK from '../../resources/design-images/IIUI_LOGO_IMG _BLACK.svg';
import styles from "../../styles/helpersStyles/BonafideCertificateStyles";


function BonafideCertificate(props) {
    const { classes } = props;

    const { requestee } = props;
    const { grantedDate } = props;

    const getValidityDate = (initailJoining) => {
        const completeionDate = moment(requestee.initialDateOfJoining).add(4, 'y');
        const validityDate = grantedDate ? moment(grantedDate).add(4, 'M') : moment().add(4, 'M');
        if (completeionDate < validityDate) {
            return completeionDate.format("DD-MM-YYYY");
        }
        return validityDate.format("DD-MM-YYYY")
    }

    return (
        <div>
            <div className={classes.root}>
                <div className={classes.pageHeader}>
                    {/* {/* <IIUIIcon fontSize='large' styles={{ color: "black" }} /> */}
                    <img
                        src={IIUI_LOGO_BLACK}
                        alt="IIUI Logo black"
                        className={classes.pageHeaderLogo}
                    />
                    <div className={classes.headerText}>
                        <img
                            src={IIU_Arabic}
                            alt="International Islamic University"
                        />
                        {/* <Typography type="h1"><b>الجامعة الإسلامية العالمية</b></Typography> */}
                        <Typography type="h1"><b>International Islamic University, Islamabad</b></Typography>
                        <Typography type="h1"><b>Overseas Admission Office</b></Typography>
                    </div>
                </div>
                <Divider className={classes.headerDivider} />
                <div>
                    <Typography className={classes.contactInfo}><b>P.O BOX 1243, H-10 SECTOR ISLAMABAD PAKISTAN PH +92-51-9258007, 9019565; Fax: +92-51-9257915</b></Typography>
                    <Typography className={classes.contactInfo}><b>Email: overseas.admissions@iiu.edu.pk</b></Typography>
                </div>
                <br />
                <div className={classes.letterInfo}>
                    <Typography>NO.IIU/OAS-PF/{grantedDate ?
                        moment(grantedDate).format("YYYY")
                        : moment().format("YYYY")
                    } </Typography>
                    <Typography><b>{
                        grantedDate ?
                            moment(grantedDate).format("MMMM DD, YYYY").toString()
                            :
                            moment().format("MMMM DD, YYYY").toString()}</b></Typography>
                </div>
                <div className={classes.lettterHeading}>
                    <Typography><b><u>TO WHOM IT MAY CONCERN</u></b></Typography>
                </div>
                <div className={classes.studentInfo}>
                    <div className={classes.infoTable}>
                        <Typography>Name of Student: <u>{requestee.name}</u></Typography>
                        <Typography>Nationality: <u>{requestee.nationality}</u></Typography>
                        <Typography>Degree Program: <u>{requestee.course}</u></Typography>
                        <Typography>Term/Semester: <u>{requestee.currentSmester}</u></Typography>
                        <Typography>Date of 1st Registration: <u>{moment(requestee.initialDateOfJoining).format("DD.MM.YYYY")}</u></Typography>
                    </div>
                    <div className={classes.infoTable}>
                        <Typography>Father Name: <u>{requestee.fatherName}</u></Typography>
                        <Typography>Passport No: <u>{requestee.passPortNumber}</u></Typography>
                        <Typography>Registration No: <u>{requestee.reg}</u></Typography>
                        <Typography>Faculty: <u>{requestee.faculty}</u></Typography>
                        <Typography>Expected Date of Completion: <u>{moment(requestee.initialDateOfJoining).add(4, 'y').format("DD.MM.YYYY")}</u></Typography>
                    </div>
                </div>
                <Typography><b><i>Validity of this certificate:</i></b> <u>{getValidityDate(requestee.initialDateOfJoining)}</u></Typography>
            </div>
            <br />
            <div className={classes.statement}>
                <pre className={classes.statement}>       The above named is a bonafide student of this University studying in the Degree Program mentioned above.</pre>
            </div>
            <br />
            <br />
            <br />
            <div className={classes.letterBottom}>
                <div>
                    <Typography>Specimen Signatures of student</Typography>
                    <br />
                    <div>
                        <Divider className={classes.liner} />
                        <br />
                        <br />
                        <Divider className={classes.liner} />
                    </div>
                </div>
                <div>
                    <Typography><b>(Issueing Authority name)</b></Typography>
                    <Typography>Issueing Authority Designation</Typography>
                </div>
            </div>
        </div>
    );
}

export default withStyles(styles)(BonafideCertificate);