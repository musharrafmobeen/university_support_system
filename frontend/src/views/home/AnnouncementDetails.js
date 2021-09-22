import { Backdrop, Button, CircularProgress, Typography, withStyles } from '@material-ui/core';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadAnnouncements } from '../../store/announcements/announcements';
import styles from '../../styles/homeStyles/HomeStyles';

function AnnouncementDetails(props) {
    const { classes } = props;
    const announcementId = props.match.params.id;

    const dispatch = useDispatch();
    const announcements = useSelector(state => state.entities.announcements.list);
    const announcmentsLoading = useSelector(state => state.entities.announcements.loading);
    const announcmentsErr = useSelector(state => state.entities.announcements.isError);
    const announcmentsErrMsg = useSelector(state => state.entities.announcements.errorMessage);

    useEffect(() => {
        if (announcements.length === 0) dispatch(loadAnnouncements());
    }, []);

    const isLoading = announcmentsLoading;
    const getAnnouncment = () => {
        const idx = announcements.findIndex(announ => announ._id === announcementId);
        if (announcements[idx]) return announcements[idx];
    };

    const currentAnnouncement = getAnnouncment();

    return (
        <div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            {
               (currentAnnouncement &&  Object.keys(currentAnnouncement).length !== 0) && <>
                    <div className={classes.form}>
                        <div className={classes.formTitle}>
                            <h1>Announcement by {currentAnnouncement.announcerType}:</h1>
                        </div>
                        <div className={classes.fromBottomWraper}>
                            <div className={classes.supportMessage}>
                                <Typography>{currentAnnouncement.announcement}</Typography>
                                <br/>
                                <Typography>Dated: {moment(currentAnnouncement.dateCreated).format("MMM Do, YYYY @ HH:mm:ss")}</Typography>
                            </div>
                            <Button
                                className={classes.submit}
                                onClick={() => {
                                    props.history.push("/");
                                }}
                            >Back</Button>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default withRouter(withStyles(styles)(AnnouncementDetails));