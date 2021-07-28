import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from 'components/common/Tooltip';

import styles from './ApiPointList.scss';
import { apiPointList } from '../mock_data';
import UrlContainer from './UrlContainer';

const ApiPointList = () => (
    <Paper className={styles.container} data-tip="Upgrade to unlock API endpoints." data-for="ApiPointList">
        <div className={styles.overlay} />
        <div className={styles.barContainer}>
            <Typography variant="overline" className={styles.paperTitle}>API Point list</Typography>
        </div>
        <div className={styles.row}>
            <div className={styles.endPointNameContainer}>
                <Typography variant="caption" className={styles.paperTitle}>Prediction end point</Typography>
            </div>
            <UrlContainer url={apiPointList.predictionEndPoint} />
        </div>
        <div className={styles.row}>
            <div className={styles.endPointNameContainer}>
                <Typography variant="caption" className={styles.paperTitle}>Suggestion end point</Typography>
            </div>
            <UrlContainer url={apiPointList.suggestionEndPoint} />
        </div>
        <div className={styles.row}>
            <div className={styles.endPointNameContainer}>
                <Typography variant="caption" className={styles.paperTitle}>Explanation end point</Typography>
            </div>
            <UrlContainer url={apiPointList.explanationEndPoint} />
        </div>
        <Tooltip name="ApiPointList" isActive={false} />
    </Paper>
);

export default ApiPointList;
