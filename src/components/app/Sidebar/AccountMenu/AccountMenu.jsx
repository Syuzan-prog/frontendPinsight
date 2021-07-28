import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import PaymentIcon from '@material-ui/icons/Payment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Avatar from 'components/common/Avatar';
import { routes } from 'configs/app.routes';
import useBooleanFlagToggle from 'core/hooks/useBooleanFlagToggle';

import useStyles from './AccountMent.styles';

const AccountMenu = ({ fullName, avatarUrl, logout }) => {
    const [isOpen, onOpenMenu, onCloseMenu] = useBooleanFlagToggle();
    const anchorRef = useRef();

    const classes = useStyles();

    return (
        <>
            <div className={clsx(classes.info, 'pointer')} onClick={onOpenMenu} ref={anchorRef}>
                <div className={classes.avatarContainer}>
                    <Avatar size="small" src={avatarUrl} />
                </div>
                <Typography variant="subtitle1" className={classes.label}>{fullName}</Typography>
            </div>
            <Menu
                id="account-menu"
                anchorEl={anchorRef?.current}
                keepMounted
                open={isOpen}
                onClose={onCloseMenu}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Link to={routes._app._settings.account}>
                    <MenuItem onClick={onCloseMenu}>
                        <PersonIcon className={classes.menuIcon} />
                        <Typography variant="body1">Settings</Typography>
                    </MenuItem>
                </Link>
                <Link to={routes._app._settings.plansAndBilling}>
                    <MenuItem onClick={onCloseMenu}>
                        <PaymentIcon className={classes.menuIcon} />
                        <Typography variant="body1">Plans & Billing</Typography>
                    </MenuItem>
                </Link>
                <MenuItem onClick={logout}>
                    <ExitToAppIcon className={classes.menuIcon} />
                    <Typography variant="body1">Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

AccountMenu.propTypes = {
    fullName: PropTypes.string,
    avatarUrl: PropTypes.string,
    logout: PropTypes.func.isRequired,
};

export default AccountMenu;
