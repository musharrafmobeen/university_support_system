import { Backdrop, Button, TextField, CircularProgress, withStyles, Snackbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import styles from "../../../styles/adminStyles/DocumentsRequestsStyles";

import BonafideCertificate from "../../helpers/BonafideCertificate";
import { loadStudents } from "../../../store/users/students";
import documentsRequests, { loadDocumentsRequests, updateDocumentRequest } from "../../../store/documentsRequests/documentsRequests";
import { Preview, print } from 'react-html2pdf';
import { errorReset } from "../../../store/ui/error";
// Create styles



function Certificate(props) {
    const { classes } = props;
    const reqId = props.match.params.id;

    const [openSnack, setSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");

    //const fileName = requesteeName !== "" ? `bonafide_cert_for_${requesteeName.replace(/\s/g, "_")}` : "bonafide_cert"

    const dispatch = useDispatch();
    const students = useSelector(state => state.entities.users.students.list);
    const studentsLodaing = useSelector(state => state.entities.users.students.loading);
    const studentsErr = useSelector(state => state.entities.users.students.isError);
    const StudentErrMsg = useSelector(state => state.entities.users.students.errorMessage);
    const documentRequests = useSelector(state => state.entities.documentsRequests.list);
    const documentRequestsLoading = useSelector(state => state.entities.documentsRequests.loading);
    const documentRequestsErr = useSelector(state => state.entities.documentsRequests.isError);
    const documentRequestsErrMsg = useSelector(state => state.entities.documentsRequests.errorMessage);
    const currentAuth = useSelector(state => state.auth.user);
    const uiErr = useSelector(state => state.ui.error.isError);
    const uiErrMsg = useSelector(state => state.ui.error.errorMessage);

    const isLoading = studentsLodaing || documentRequestsLoading
    const isError = studentsErr || documentRequestsErr || uiErr
    const errorMsg = StudentErrMsg || documentRequestsErrMsg || uiErrMsg


    useEffect(() => {
        dispatch(drawerSelectionChanged("Documents-Requests"));
        if (students.length === 0) dispatch(loadStudents());
        if (documentRequests.length === 0) dispatch(loadDocumentsRequests());
    }, []);

    const getStudent = () => {
        const indx = documentRequests.findIndex(req => req._id === reqId);
        let req = {};
        if (documentRequests[indx]) req = documentRequests[indx];
        if (Object.keys(req).length !== 0) {
            // const idx = students.findIndex(std => std._id === req.student._id);
            // if (students[idx]) return students[idx];
            return req.student
        }
    }

    const requestee = getStudent();

    const grantCertificate = () => {
        dispatch(errorReset());
        const docReq = {
            isGranted: "true",
        }
        dispatch(updateDocumentRequest(reqId, docReq)).then(
            () => {
                if (isError) {
                    setSnackMsg("Failed to grant document!");
                    setSnack(true);
                    return;
                }
                else {
                    setSnackMsg("Document granted Successfully!");
                    setSnack(true);
                    props.history.push("/admin/documents-requests");
                    return;
                }
            }
        );

    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackMsg("");
        setSnack(false);
    };

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            {isError && <div className={classes.error}>
                <Typography>{errorMsg}</Typography>
            </div>}
            {
                requestee && <>
                    <div className={classes.btnContainer}>
                        <Button
                            className={classes.btnGrantDoc}
                            onClick={grantCertificate}
                        >Grant Document</Button>
                    </div>
                    <Preview id={'jsx-template'} >
                        <BonafideCertificate requestee={requestee} />
                    </Preview>
                </>
            }
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={openSnack}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                message={snackMsg}
            />
        </div>
    );
}

export default withStyles(styles)(Certificate);