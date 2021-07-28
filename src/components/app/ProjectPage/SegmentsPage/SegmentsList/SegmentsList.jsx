import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import useHorizontalPagination from 'core/hooks/useHorizontalPagination';
import {
    PROJECT_TYPES,
    PREDICTION_TYPE_YES_NO,
} from 'constants/project.constants';

import { useStyles } from './SegmentsList.styles';

const SegmentsList = ({ segments, selectedSegment, setSelectedSegment, targetVariable, projectType }) => {
    const classes = useStyles();
    const listRef = useRef(null);
    const handlePaginationChange = useHorizontalPagination(listRef);

    const targetValueKey = useMemo(() => (projectType === PREDICTION_TYPE_YES_NO ? 'percentage' : 'average'), [projectType]);

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.barContainer}>
                    <Typography variant="overline">Segments</Typography>
                    <div>
                        <KeyboardArrowLeftIcon
                            onClick={() => handlePaginationChange('left')}
                            className={clsx(classes.icon, classes.leftIcon)}
                        />
                        <KeyboardArrowRightIcon
                            className={clsx(classes.icon)}
                            onClick={() => handlePaginationChange('right')}
                        />
                    </div>
                </div>
                <div
                    className={classes.listContainer}
                    ref={listRef}
                >
                    {
                        segments && segments.length && segments.map((segment) => (
                            <Card
                                key={segment.name}
                                className={clsx(classes.root, {
                                    [classes.selectedCard]: selectedSegment.id === segment.id,
                                })}
                                onClick={() => setSelectedSegment(segment)}
                            >
                                {
                                    selectedSegment.id === segment.id && (
                                        <div className={classes.selectedSegmentOverlay} />
                                    )
                                }
                                <CardHeader
                                    title={(
                                        <div className={classes.titleContainer}>
                                            <Typography variant="subtitle2" className={classes.headerTitle}>{segment.name}</Typography>
                                        </div>
                                    )}
                                    classes={{
                                        root: classes.cardHeader,
                                    }}
                                />
                                <Divider />
                                <CardContent className={classes.cardContent}>
                                    <div>
                                        <Typography variant="h6" className={classes.count}>
                                            {segment.count}
                                        </Typography>
                                        <Typography className={classes.count} variant="overline">COUNT</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" className={classes.accuracy}>
                                            {segment.accuracy}
                                            %
                                        </Typography>
                                        <Typography variant="overline" className={classes.accuracy}>
                                            ACCURACY
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" className={classes.target} title={segment[targetValueKey]}>
                                            {segment[targetValueKey]}
                                            {projectType === PREDICTION_TYPE_YES_NO ? '%' : ''}
                                        </Typography>
                                        <Typography variant="overline" className={classes.target} title={targetVariable}>
                                            {targetVariable.toUpperCase()}
                                        </Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </Paper>
            <div className={classes.selectedSegmentContainer}>
                <span className={classes.selectedSegmentText}>Selected Segment:</span>
                <Typography variant="subtitle1">{selectedSegment.name}</Typography>
            </div>
        </>
    );
};

SegmentsList.propTypes = {
    segments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        accuracy: PropTypes.string,
        count: PropTypes.number,
        percentage: PropTypes.string,
        average: PropTypes.string,
    })),
    selectedSegment: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
    }),
    setSelectedSegment: PropTypes.func.isRequired,
    targetVariable: PropTypes.string,
    projectType: PropTypes.oneOf(PROJECT_TYPES),
};

SegmentsList.defaultProps = {
    segments: [],
    selectedSegment: {},
};

export default SegmentsList;
