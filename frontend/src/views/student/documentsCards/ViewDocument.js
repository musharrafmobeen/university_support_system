import { Backdrop, Button, CircularProgress, withStyles, Snackbar, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { drawerSelectionChanged } from "../../../store/ui/drawer";
import styles from "../../../styles/adminStyles/DocumentsRequestsStyles";

import BonafideCertificate from "../../helpers/BonafideCertificate";
import { loadStudents } from "../../../store/users/students";
import { loadDocumentsRequests } from "../../../store/documentsRequests/documentsRequests";
import { Preview, print } from 'react-html2pdf';
import { errorReset } from "../../../store/ui/error";
import RefrenceLetter from "../../helpers/RefrenceLetter";
import { loadStaffs } from "../../../store/users/staffs";


function ViewDocument(props) {
    const { classes } = props;
    const reqId = props.match.params.id;

    const dispatch = useDispatch();
    const staffs = useSelector(state => state.entities.users.staffs.list);
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
        if (staffs.length === 0) dispatch(loadStaffs());
    }, []);

    const getRequest = () => {
        const indx = documentRequests.findIndex(req => req._id === reqId);
        if (documentRequests[indx]) return documentRequests[indx];
    };

    const request = getRequest();
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

    const getStaff = () => {
        if (request) {
            const index = staffs.findIndex(user => user._id === request.staff);
            if (staffs[index]) return staffs[index].employee
        }
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
                (requestee && request) && <>
                    {
                        request.documentType === "bonafied certificate" && <>
                            <div className={classes.btnContainer}>
                                <Button
                                    className={classes.btnGrantDoc}
                                    onClick={() => print(`bonafide_certificate_for_${requestee.name.replace(/\s/g, "_")}`, 'jsx-template')}
                                >Print Document</Button>
                            </div>
                            <Preview id={'jsx-template'} >
                                <BonafideCertificate requestee={requestee} grantedDate={request.dateGranted} />
                            </Preview>
                        </>
                    }
                    {
                        request.documentType === "refrenceLetter" && <> <div className={classes.btnContainer}>
                            <Button
                                className={classes.btnGrantDoc}
                                onClick={() => print(`reference_letter_for_${requestee.desiredUni.replace(/\s/g, "_")}_for_${requestee.reg}`, 'jsx-template')}
                            >Print Document</Button>
                        </div>
                            <Preview id={'jsx-template'} >
                                <RefrenceLetter requestee={requestee} staff={getStaff()} grantedDate={request.dateGranted} />
                            </Preview>
                        </>
                    }
                </>
            }
        </div>
    );
}

export default withStyles(styles)(ViewDocument);