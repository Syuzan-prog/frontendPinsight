import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link, generatePath } from 'react-router-dom';
import { format } from 'date-and-time';

import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { withModalControls } from 'components/app/Modals';
import { routes } from 'configs/app.routes';
import {
    DATA_STATUS_READY,
    DATA_STATUS_ANALYZING,
    DATA_STATUS_FAILED,
    DATA_COLUMN_NAME,
    DATA_COLUMN_DATE,
    DATA_COLUMN_STATUS,
    DATA_COLUMN_OPTIONS,
    DATA_COLUMN_ANALYTICS,
} from 'constants/dashboard.constants';
import { DELETE_ENTITY_MODAL_NAME } from 'constants/modal.constants';

import { useStyles } from '../DataTable.styles';

const DataTableCell = ({ columnKey, row, deleteDatasource, openModal }) => {
    const classes = useStyles();

    const handleDelete = useCallback(() => {
        openModal(DELETE_ENTITY_MODAL_NAME, {
            id: row.id,
            entity: 'datasource',
            onDelete: deleteDatasource,
        });
    }, [deleteDatasource, openModal, row.id]);

    return useMemo(() => {
        switch (columnKey) {
            case DATA_COLUMN_NAME:
                return (
                    <TableCell
                        className={classes.bodyCell}
                        key={`${columnKey}-${row.name}`}
                    >
                        {row[columnKey]}
                    </TableCell>
                );
            case DATA_COLUMN_DATE:
                return (
                    <TableCell
                        className={classes.bodyCell}
                        key={`${columnKey}-${row.name}`}
                    >
                        {format(new Date(row[columnKey]), 'DD.MM.YYYY')}
                    </TableCell>
                );
            case DATA_COLUMN_STATUS:
                return (
                    <TableCell
                        className={classes.bodyCell}
                        key={`${columnKey}-${row.name}`}
                    >
                        <span
                            className={clsx(classes.chip, {
                                [classes.readyChip]: row[columnKey] === DATA_STATUS_READY,
                                [classes.analyzingChip]: row[columnKey] === DATA_STATUS_ANALYZING,
                                [classes.failedChip]: row[columnKey] === DATA_STATUS_FAILED,
                            })}
                        >
                            {row[columnKey].toLowerCase()}
                        </span>
                    </TableCell>
                );
            case DATA_COLUMN_OPTIONS:
                return (
                    <TableCell
                        className={clsx(classes.bodyCell, 'light-blue')}
                        key={`${columnKey}-${row.name}`}
                    >
                        {row.status !== DATA_STATUS_ANALYZING ? (
                            <IconButton onClick={handleDelete} size="small">
                                <DeleteIcon className={classes.optionIcon} />
                            </IconButton>
                        ) : null}
                    </TableCell>
                );
            case DATA_COLUMN_ANALYTICS:
                return (
                    <TableCell
                        className={classes.bodyCell}
                        key={`${columnKey}-${row.name}`}
                    >
                        {row.status === DATA_STATUS_READY ? (
                            <Link to={generatePath(routes._app.data, { id: row.id })} className="light-blue">
                                Explore
                            </Link>
                        ) : null}
                    </TableCell>
                );
            default:
                return (
                    <TableCell
                        className={classes.bodyCell}
                        key={`${columnKey}-${row.name}`}
                    >
                        {row[columnKey]}
                    </TableCell>
                );
        }
    }, [row, columnKey, classes, handleDelete]);
};

DataTableCell.propTypes = {
    columnKey: PropTypes.string,
    row: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        date: PropTypes.number,
        description: PropTypes.string,
        dataType: PropTypes.string,
        size: PropTypes.string,
        status: PropTypes.string,
        analytics: PropTypes.string,
        options: PropTypes.string,
        isDemo: PropTypes.bool,
    }),
    deleteDatasource: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

export default withModalControls(DataTableCell);
