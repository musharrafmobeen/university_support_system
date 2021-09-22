import React,{useState} from 'react';
import { Calendar, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { Paper } from '@material-ui/core';

function CalendarCard(props) {
    const [value, onChange] = useState(new Date());
    return (
        <div>
            <Paper>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Calendar
                    date={value}
                    onChange={onChange}
                />
                </MuiPickersUtilsProvider>
            </Paper>
        </div>
    );
};

export default CalendarCard;