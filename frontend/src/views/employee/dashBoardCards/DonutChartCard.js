import React from 'react';
import { Paper, Typography, withStyles } from '@material-ui/core';
import {
    PieChart, PieArcSeries, BarChart, LinearXAxis,
    LinearYAxis, LinearYAxisTickSeries, BarSeries, text
} from 'reaviz';
import * as chroma from 'chroma.ts'
import styles from '../../../styles/studentStyles/ChartStyles';

function DonutChartCard(props) {
    const { classes } = props;

    const {
        totalGrivances,
        pendingGrievances,
        pausedGrievances,
        solvedGrievances
    } = props;

    return (
        <div className={classes.chartContianer}>
            <Typography
                variant='h4'
            >
                Your Grievances Info
            </Typography>
            <div
                className={classes.graphParent}
            >
                <div className={classes.graph}>
                    <PieChart
                        height={300}
                        width={300}
                        data={[
                            // { key: 'Total Lodged Grievances', data: totalGrivances },
                            { key: 'Pending Grievances', data: pendingGrievances },
                            { key: 'Paused Grievances', data: pausedGrievances },
                            { key: 'Solved Grievances', data: solvedGrievances },
                        ]}
                        series={<PieArcSeries
                            doughnut={true}
                            padRadius={100}
                            cornerRadius={4}
                            padAngle={0.02}
                            label={null}
                            colorScheme={chroma.scale(['#674FFF', '#FBBC00', '#006838', "#F30000"])
                                .mode('hsl').colors(4)}
                        // colorScheme={chroma.scale(['#006838', '#674FFF'])
                        //     .mode('hsl').colors(4)}
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