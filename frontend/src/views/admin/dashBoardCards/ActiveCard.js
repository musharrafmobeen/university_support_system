import { Badge, Card, IconButton, Paper, Button, withStyles, Typography, CardHeader } from '@material-ui/core';
import React from 'react';

import styles from '../../../styles/adminStyles/dashboard-card-styles/ActiveCardStyles';

function ActivCard(props) {
    const { classes } = props;
    const title = props.title;
    const value = props.value;
    const icon = props.icon;
    const onButtonClick = props.onButtonClick;
    const { isButtonDisabled } = props;
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <img src={icon} className={classes.cardAvatar} />
                }
                title={title}
                subheader={value}
            />
            <div className={classes.button}>
                <Button
                    style={{ width: "100%" }}
                    onClick={onButtonClick}
                    disabled={isButtonDisabled}
                >Read More</Button>
            </div>
        </Card>
    );
}
export default withStyles(styles)(ActivCard);