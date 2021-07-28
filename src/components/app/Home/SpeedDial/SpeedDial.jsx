import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import SpeedDialBase from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import TimelineIcon from '@material-ui/icons/Timeline';

import { TopicIcon } from 'components/common/Icons';
import { withModalControls } from 'components/app/Modals';
import {
    PREDICTION_MODAL_NAME,
    CREATE_PROJECT_MODAL_NAME,
    ADD_DATA_MODAL_NAME,
} from 'constants/modal.constants';

const useStyles = makeStyles((theme) => ({
    speedDial: {
        position: 'fixed',
        '&.MuiSpeedDial-directionUp': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    },
    tooltip: {
        ...theme.typography.subtitle2,
        backgroundColor: theme.palette.text.primary,
        borderRadius: 50,
        padding: '11px 16px',
    },
    actionFab: {
        color: theme.palette.secondary.main,
        fill: theme.palette.secondary.main,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#FFFFFF',
            fill: '#FFFFFF',
        },
    },
}));

const actions = [
    { icon: <TimelineIcon />, name: 'Add Prediction', modalName: PREDICTION_MODAL_NAME },
    { icon: <TopicIcon />, name: 'Create Project', modalName: CREATE_PROJECT_MODAL_NAME },
    { icon: <DataUsageIcon />, name: 'Add Data', modalName: ADD_DATA_MODAL_NAME },
];

const SpeedDial = ({ openModal }) => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleOpen = useCallback((event, reason) => {
        if (reason === 'focus') {
            // material-ui has a bug which keeps the focus on the speed dial action after it has been hidden
            document.activeElement.blur();
            return;
        }

        setIsOpen(true);
    }, []);

    const handleActionClick = useCallback((modalName) => {
        handleClose();
        openModal(modalName);
    }, [handleClose, openModal]);

    return (
        <SpeedDialBase
            ariaLabel="Actions"
            className={classes.speedDial}
            FabProps={{
                color: 'secondary',
            }}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={isOpen}
        >
            {actions.map(({ name, icon, modalName }) => (
                <SpeedDialAction
                    key={name}
                    icon={icon}
                    tooltipTitle={name}
                    onClick={() => handleActionClick(modalName)}
                    TooltipClasses={{
                        tooltip: classes.tooltip,
                    }}
                    classes={{
                        fab: classes.actionFab,
                    }}
                />
            ))}
        </SpeedDialBase>
    );
};

SpeedDial.propTypes = {
    openModal: PropTypes.func.isRequired,
};

export default withModalControls(SpeedDial);
