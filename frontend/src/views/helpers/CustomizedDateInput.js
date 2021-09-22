import React, { useState } from 'react';
import useToggleState from '../../hooks/useToggleState';
import { Button, Menu, Paper, Typography, withStyles } from "@material-ui/core";
import styles from '../../styles/helpersStyles/CustomizedDateInputStyles';
import CalenderIcon from "../../resources/design-icons/CalenderIcon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { List,ListItem } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';

function CustomizedDateInput(props) {
    const { classes } = props;
    const [isOpen, toggleOpen] = useToggleState(false);
    const [dateMenuAcnhor, setAnchor] = useState(null);
    const {selectedDate, handleDateChange, isEdit, label} = props.values;
    const [eventDate, setEventDate] = useState(isEdit?`${moment(selectedDate).format("DD.MM.YYYY").toString()}`: "No date selected");

    const handleClick = (e) => {
        toggleOpen();
        setAnchor(e.currentTarget);
    };

    const saveDate = () => {
        setEventDate(moment(selectedDate).format("DD.MM.YYYY").toString());
        toggleOpen();
        setAnchor(null);
    };

    return (
        <div>
            {/* <Typography classes={classes.title}>Creat at</Typography> */}
           <fieldset
            className={classes.inputField}
            onClick={handleClick}
           >
                <CalenderIcon className={classes.icon} />
                    {eventDate}
                {
                    isOpen ?
                        <ExpandLessIcon className={classes.icon} />
                        :
                        <ExpandMoreIcon />
                }
           {/* <Paper
                className={classes.inputField}
                elevation={0}
                onClick={handleClick}
            >
                <CalenderIcon className={classes.icon} />
                    {eventDate}
                {
                    isOpen ?
                        <ExpandLessIcon className={classes.icon} />
                        :
                        <ExpandMoreIcon />
                }
            </Paper> */}
            <legend>{label}</legend>
           </fieldset>
            <Menu
                anchorEl={dateMenuAcnhor}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom" , horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                keepMounted
                open={Boolean(dateMenuAcnhor)}
                onClose={() => { setAnchor(null); toggleOpen() }}
            >
                <List>
                    <ListItem>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                value={selectedDate}
                                label="Select Date"
                                onChange={handleDateChange}
                            />
                            </MuiPickersUtilsProvider>
                    </ListItem>
                    <ListItem>
                        <Button
                            onClick={saveDate}
                            className={classes.btnSave}
                        >Save Date</Button>
                    </ListItem>
                </List>
            </Menu>
        </div>
    );
}

export default withStyles(styles)(CustomizedDateInput)