import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styles from '../Evaluate.scss';

const EvaluationMetrics = ({ metrics }) => (
    <Paper className={styles.metricsContainer}>
        <Typography variant="overline">Evaluation metrics</Typography>
        <TableContainer className={styles.tableContainer}>
            <Table aria-label="table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <Typography variant="subtitle2">
                                Train
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2">
                                Test
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(metrics).map(([key, values]) => (
                        <TableRow key={`row-${key}`}>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {key}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {values[0]}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                >
                                    {values[1]}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Paper>
);

EvaluationMetrics.propTypes = {
    metrics: PropTypes.shape({
        accuracy: PropTypes.string,
        precision: PropTypes.string,
        recall: PropTypes.string,
        f1_score: PropTypes.string,
        roc_auc: PropTypes.string,
        pr_auc: PropTypes.string,
    }),
};

EvaluationMetrics.defaultProps = {
    metrics: {},
};

export default EvaluationMetrics;
