import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import useBooleanFlagToggle from 'core/hooks/useBooleanFlagToggle';
import { withModalControls } from 'components/app/Modals';
import { CONFIGURE_PROJECT_MODAL_NAME, PREDICTION_MODAL_NAME } from 'constants/modal.constants';
import useStyles from './DotMenu.styles';

const DotMenu = ({ isProjectCard, openModal, entityId, onDelete }) => {
    const [isOpen, onOpenMenu, onCloseMenu] = useBooleanFlagToggle();
    const anchorRef = useRef();

    const classes = useStyles();
    const handleConfigure = useCallback(() => {
        if (isProjectCard) {
            openModal(CONFIGURE_PROJECT_MODAL_NAME, { projectId: entityId });
        } else {
            openModal(PREDICTION_MODAL_NAME, { entityId });
        }
    }, [openModal, entityId, isProjectCard]);

    const handleDelete = useCallback(() => onDelete(entityId), [onDelete, entityId]);

    return (
        <>
            <IconButton onClick={onOpenMenu} ref={anchorRef}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="dot-menu"
                anchorEl={anchorRef?.current}
                keepMounted
                open={isOpen}
                onClose={onCloseMenu}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                classes={{
                    paper: classes.menuContainer,
                    list: classes.menuList,
                }}
            >
                <MenuItem onClick={handleConfigure}>
                    <SettingsIcon className={classes.menuItemIcon} />
                    <Typography variant="body2" className={classes.menuItemText}>Configure</Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteOutlineIcon className={classes.menuItemIcon} />
                    <Typography variant="body2" className={classes.menuItemText}>Delete</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

DotMenu.propTypes = {
    isProjectCard: PropTypes.bool,
    openModal: PropTypes.func.isRequired,
    entityId: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
};

DotMenu.defaultProps = {
    isProjectCard: false,
};

export default withModalControls(DotMenu);
