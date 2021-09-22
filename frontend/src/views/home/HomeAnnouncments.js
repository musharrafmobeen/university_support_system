import { Backdrop, CircularProgress, Divider, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAnnouncements } from '../../store/announcements/announcements';
import '../../styles/homeStyles/Announcements.css';
import AnnouncementMadeIcon from '../../resources/design-icons/AnnouncmentMadeIcon';
import useToggle from "../../hooks/useToggleState";
import moment from "moment";
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import new_logo from '../../resources/design-images/new.gif';



function HomeAnnouncments(props) {
    const classes = {
        backdrop: {
            zIndex: 1200 + 5,
            color: '#006838',
        },
    };

    const [scroll, toggleScroll] = useToggle(true);

    const dispatch = useDispatch();
    const announcements = useSelector(state => state.entities.announcements.list);
    const announcmentsLoading = useSelector(state => state.entities.announcements.loading);
    const announcmentsErr = useSelector(state => state.entities.announcements.isError);
    const announcmentsErrMsg = useSelector(state => state.entities.announcements.errorMessage);

    useEffect(() => {
        if (announcements.length === 0) dispatch(loadAnnouncements());
    }, []);

    const isLoading = announcmentsLoading;

    const renderAnnouncements = () => {
        const allowed = announcements.filter(announ => announ.visibleTo === "All");
        const sorted = allowed.slice().sort(function (a, b) {
            var dateA = new Date(a.dateCreated), dateB = new Date(b.dateCreated);
            return dateB - dateA;
        });
        const list = sorted.map(announ => (
            <NewsTicker id={announ._id} title={announ.announcement} url={`/announcements/${announ._id}`} meta={moment(announ.dateCreated).format("MMM DD, YYYY @ HH:mm:ss")} />
        ));
        return list;
    };

    return (
        <div class="parent">
            <div className={"heading"}>
                <AnnouncementMadeIcon className={"headingIcon"} />
                <Typography className={"headingText"}>Announcements</Typography>
            </div>
            <Backdrop
                className={classes.backdrop} open={isLoading}
            >
                <CircularProgress color="inherit" thickness={4.9} />
            </Backdrop>
            <div className="newsticker">
                <Ticker isNewsTicker={true}>
                    <NewsTicker id={100001} title={""} meta={""} />
                    {renderAnnouncements()}
                    <NewsTicker id={10000} title={""} meta={""} />
                </Ticker>
            </div>
        </div>
    );
}

export default HomeAnnouncments;