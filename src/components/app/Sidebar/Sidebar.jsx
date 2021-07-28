import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';

import LogoSvg from 'resources/assets/svg/logo.svg';
import FullLogoSvg from 'resources/assets/svg/logo_full.svg';
import useBooleanFlagToggle from 'core/hooks/useBooleanFlagToggle';
import { routes } from 'configs/app.routes';

import NavList from './NavList';
import NotificationMenu from './NotificationMenu';
import AccountMenu from './AccountMenu';

import useStyles from './Sidebar.styles';

const Sidebar = () => {
    const classes = useStyles();
    const [isOpen, onDrawerOpen, onDrawerClose] = useBooleanFlagToggle();

    return (
        <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: isOpen,
                    [classes.drawerClose]: !isOpen,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: isOpen,
                        [classes.drawerClose]: !isOpen,
                    }),
                }}
                onMouseOver={onDrawerOpen}
                onMouseLeave={onDrawerClose}
            >
                <Link to={routes._app.dashboard} className={classes.logoContainer}>
                    <img
                        src={isOpen ? FullLogoSvg : LogoSvg}
                        className={classes.logo}
                        alt="pinsight"
                    />
                </Link>
                <NavList isSidebarOpen={isOpen} />
                <div className={classes.account}>
                    <NotificationMenu />
                    <AccountMenu />
                </div>
            </Drawer>
        </>
    );
};

export default Sidebar;
