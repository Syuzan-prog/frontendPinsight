import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ScrollActionContainer from 'components/app/ScrollActionContainer';
import Loader from 'components/common/Loader';

import { columnKeys, headerLabels } from 'constants/dashboard.constants';

import { useStyles } from './DataTable.styles';
import DataTableCell from './DataTableCell';

const DataTable = ({
    datasources, hasMore, isLoading, fetchDatasources,
}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <Typography variant="overline" className={classes.dataLabel}>Data Centre</Typography>
            <TableContainer
                component={ScrollActionContainer}
                className={classes.tableContainer}
                hasMore={hasMore}
                isLoading={isLoading}
                hideLoader
                onScrollEnd={fetchDatasources}
            >
                <Table stickyHeader className={classes.table} aria-label="caption table">
                    <caption className={classes.caption}>
                        *  Here you can find your data you have uploaded to train models or make predictions.
                    </caption>
                    <TableHead>
                        <TableRow>
                            {headerLabels.map((label) => (
                                <TableCell key={`header-${label}`} classes={{ stickyHeader: classes.tableHead }}>
                                    <Typography className={classes.headerCellText} variant="subtitle2">
                                        {label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {datasources.map((row) => (
                            <TableRow key={row.id}>
                                {columnKeys.map((columnKey) =>
                                    <DataTableCell key={columnKey} row={row} columnKey={columnKey} />
                                )}
                            </TableRow>
                        ))}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={columnKeys.length}><Loader /></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

DataTable.propTypes = {
    datasources: PropTypes.arrayOf(PropTypes.object),
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchDatasources: PropTypes.func.isRequired,
};

export default DataTable;
