import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CachedIcon from '@material-ui/icons/Cached';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Tooltip from 'components/common/Tooltip';

import { useStyles } from './SegmentPerformance.styles';

const SegmentPerformance = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.container} data-tip="Upgrade to unlock Scenario Analysis feature!" data-for="SegmentPerformance">
            <div className={classes.overlay} />
            <div className={classes.barContainer}>
                <Typography variant="overline" className={classes.greyText}>SEGMENT PERFORMANCE</Typography>
                <div>
                    <CachedIcon />
                    <Typography className={classes.resetText} variant="overline">RESET</Typography>
                </div>
            </div>
            <div className={classes.percentBlock}>
                <div>
                    <Typography variant="h2" className={classes.percentTextBig}>79%</Typography>
                    <span className={classes.percentIcon}><ArrowDropDownIcon /></span>
                    <Typography variant="h5" className={classes.percentTextSmall}>+4%</Typography>
                    <Typography variant="subtitle1" className={classes.percentageText}>Percentage of satisfaction</Typography>
                </div>
            </div>
            <Tooltip name="SegmentPerformance" isActive={false} />
        </Paper>
    );
};

export default SegmentPerformance;
