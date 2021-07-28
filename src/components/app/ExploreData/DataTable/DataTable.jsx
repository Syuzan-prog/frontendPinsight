import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ScrollActionContainer from 'components/app/ScrollActionContainer';
import { LoaderContainer } from 'components/common/Loader';
import { getColumnKeysFromData } from 'core/utils/getColumnKeysFromData';

import { useStyles } from './DataTable.styles';

const DataTable = ({ datasourceSchema, isLoading, isLoaded, hasMore, fetchDatasourceSchema }) => {
    const classes = useStyles();
    const [open, setOpen] = useState();
    const [showCount, setShowCount] = useState(15);
    const dataToShow = useMemo(() => {
        if (showCount === 'all') return datasourceSchema;

        return datasourceSchema?.slice(0, showCount);
    }, [showCount, datasourceSchema]);
    const columnKeys = useMemo(() => getColumnKeysFromData(datasourceSchema[0], ['id']), [datasourceSchema]);

    return (
        <Paper className={classes.container}>
            <div className={classes.paperHeader}>
                <Typography variant="overline" className={classes.dataLabel}>DATA OVERVIEW</Typography>
                <FormControl className={classes.form}>
                    <InputLabel id="table-show-count">Show:</InputLabel>
                    <Select
                        labelId="table-show-count"
                        id="table-show-select"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        value={showCount}
                        onChange={(event) => setShowCount(event.target.value)}
                        variant="standard"
                        disableUnderline
                    >
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value="all"><em>All</em></MenuItem>
                    </Select>
                </FormControl>
            </div>
            <LoaderContainer isLoading={!isLoaded}>
                <TableContainer
                    component={ScrollActionContainer}
                    className={classes.tableBody}
                    isLoading={isLoading}
                    hasMore={showCount === 'all' ? hasMore : false}
                    onScrollEnd={() => fetchDatasourceSchema(datasourceSchema.id)}
                >
                    <Table stickyHeader className={classes.table} aria-label="table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                {columnKeys.map((key) => (
                                    <TableCell key={`header-${key}`}>
                                        <Typography className={classes.headerCellText} variant="subtitle2">
                                            {key.replace('_', ' ')}
                                        </Typography>
                                    </TableCell>
                                    )
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {dataToShow.map((row) => (
                                <TableRow key={`row-${row.name}`}>
                                    {columnKeys.map((columnKey) => (
                                        <TableCell key={`cell-${columnKey}`}>
                                            <Typography
                                                className={classes.cellText}
                                                variant="body1"
                                            >
                                                {row[columnKey] !== null ? row[columnKey].toString() : '-'}
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LoaderContainer>
        </Paper>
    );
};

DataTable.propTypes = {
    datasourceSchema: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        mode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        min: PropTypes.number,
        max: PropTypes.number,
        average: PropTypes.number,
        missing: PropTypes.number,
        sensitive: PropTypes.number,
        id: PropTypes.number,
    })).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool,
    fetchDatasourceSchema: PropTypes.func.isRequired,
};

export default DataTable;
