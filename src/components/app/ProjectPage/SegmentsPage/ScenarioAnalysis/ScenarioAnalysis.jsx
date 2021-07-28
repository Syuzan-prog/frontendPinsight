import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import CachedIcon from '@material-ui/icons/Cached';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Tooltip from 'components/common/Tooltip';

import { useStyles } from './ScenarioAnalysis.styles';

const ScenarioAnalysis = () => {
    const classes = useStyles();
    return (
        <Paper className={classes.container} data-tip="Upgrade to unlock Scenario Analysis feature!" data-for="ScenarioAnalysis">
            <div className={classes.overlay} />
            <div className={classes.barContainer}>
                <Typography variant="overline" className={classes.greyText}>SCENARIO ANALYSIS</Typography>
                <div className={classes.reset}>
                    <CachedIcon />
                    <Typography variant="overline" className={classes.resetText}>RESET</Typography>
                </div>
            </div>
            <div>
                <div className={classes.sliderContainer}>
                    <Typography variant="caption" className={classes.sliderLabel}>
                        monthly_spendings
                    </Typography>
                    <Slider value={20} disabled />
                </div>
                <div className={classes.sliderContainer}>
                    <Typography variant="caption" className={classes.sliderLabel}>
                        monthly_visits
                    </Typography>
                    <Slider value={15} disabled />
                </div>
                <div className={classes.sliderContainer}>
                    <Typography variant="caption" className={classes.sliderLabel}>
                        monthly_score
                    </Typography>
                    <Slider value={10} disabled />
                </div>
                <FormControl variant="outlined" className={classes.select}>
                    <InputLabel id="scenario-analysis-label">State</InputLabel>
                    <Select labelId="scenario-analysis-label" value="CA" label="State" disabled>
                        <MenuItem value="CA">CA</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.sliderContainer}>
                    <Typography variant="caption" className={classes.sliderLabel}>
                        review_score
                    </Typography>
                    <Slider value={10} disabled />
                </div>
            </div>
            <Tooltip name="ScenarioAnalysis" isActive={false} />
        </Paper>
    );
};

export default ScenarioAnalysis;
