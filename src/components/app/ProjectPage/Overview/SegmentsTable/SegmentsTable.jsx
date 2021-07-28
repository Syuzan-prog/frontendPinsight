import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
    PROJECT_TYPES,
    PREDICTION_TYPE_YES_NO,
} from 'constants/project.constants';

import styles from '../Overview.scss';

const SegmentsTable = ({ segments, projectType }) => {
    const columnKeys = useMemo(() => (projectType === PREDICTION_TYPE_YES_NO
        ? ['name', 'createdAt', 'count', 'percentage', 'accuracy'] : ['name', 'createdAt', 'count', 'average', 'accuracy']),
    [projectType]);

    const columnLabels = useMemo(() => (projectType === PREDICTION_TYPE_YES_NO
        ? {
            name: 'Name',
            createdAt: 'Created',
            count: 'Count',
            percentage: 'Percentage',
            accuracy: 'Accuracy',
        }
        : {
            name: 'Name',
            createdAt: 'Created',
            count: 'Count',
            average: 'Average',
            accuracy: 'Accuracy',
        }), [projectType]);

    const keysWithPercentage = useMemo(() => (projectType === PREDICTION_TYPE_YES_NO ? ['percentage', 'accuracy'] : ['accuracy']), [projectType]);

    return (
        <Paper className={clsx(styles.block, styles.segmentsTable)}>
            <Typography variant="overline" className={styles.title}>Segments</Typography>
            <TableContainer component={Paper}>
                <Table aria-label="table">
                    <caption>
                        * We have identified 5 segments for you. Check segments page to find out more.
                    </caption>
                    <TableHead>
                        <TableRow>
                            {columnKeys.map((key) => (
                                <TableCell key={`header-${key}`}>
                                    <Typography variant="subtitle2">
                                        {columnLabels[key]}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {segments.map((row) => (
                            <TableRow key={`row-${row.name}`}>
                                {columnKeys.map((columnKey) => (
                                    <TableCell key={`cell-${columnKey}`}>
                                        <Typography
                                            variant="body1"
                                        >
                                            {row[columnKey]}
                                            {keysWithPercentage.includes(columnKey) && '%'}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

SegmentsTable.propTypes = {
    segments: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        createdAt: PropTypes.string,
        count: PropTypes.number,
        percentage: PropTypes.string,
        average: PropTypes.string,
        accuracy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    projectType: PropTypes.oneOf(PROJECT_TYPES),
};

SegmentsTable.defaultProps = {
    segments: [],
};

export default SegmentsTable;
