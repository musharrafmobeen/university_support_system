import React from 'react';
import { Paper, Typography, withStyles } from '@material-ui/core';
import {
    PieChart, PieArcSeries, BarChart, LinearXAxis,
    LinearYAxis, LinearYAxisTickSeries, BarSeries
} from 'reaviz';
import * as chroma from 'chroma.ts'
import styles from '../../../styles/studentStyles/ChartStyles';

function DonutChartCard(props) {
    const { classes } = props;
    const {
        totalGrivances,
        pendingGrievances,
        pausedGrievances,
        solvedGrievances,
        delayeddGrievances
    } = props;

    return (
        <div>
            <Typography
                variant='h4'
            >
                Grievances Info
            </Typography>
            <div className={classes.graphParent}>
                <div className={classes.graph}>
                    <PieChart
                        height={300}
                        width={300}
                        data={[
                            // { key: 'Total Lodged', data: totalGrivances },
                            { key: 'Pending', data: pendingGrievances },
                            { key: 'Paused', data: pausedGrievances },
                            { key: 'Solved', data: solvedGrievances },
                            { key: 'Delayed', data: delayeddGrievances },
                        ]}
                        series={<PieArcSeries
                            doughnut={true}
                            padRadius={300}
                            cornerRadius={2}
                            padAngle={0.02}
                            label={null}
                            colorScheme={chroma.scale(['#674FFF', '#FBBC00', '#006838', "#F30000"])
                                .mode('hsl').colors(4)}
                        // colorScheme={chroma.scale(['#006838', '#674FFF'])
                        //     .mode('hsl').colors(5)}
                        />}
                    />
                </div>
                <h2 className={classes.graphHeading}>
                    {totalGrivances} {"Grievances"}
                </h2>
            </div>
        </div>
    );
}

export default withStyles(styles)(DonutChartCard);