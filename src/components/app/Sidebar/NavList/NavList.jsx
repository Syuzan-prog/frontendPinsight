import React, { useEffect, useMemo, useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import List from '@material-ui/core/List';

import { TopicIcon } from 'components/common/Icons';

import { routes } from 'configs/app.routes';
import { SIDEBAR_TAB_PROJECTS, SIDEBAR_TAB_PREDICTIONS, SIDEBAR_TAB_DATA } from 'constants/sidebar.constants';
import { PROJECT_STATUS_READY } from 'constants/project.constants';
import { DATA_STATUS_READY } from 'constants/dashboard.constants';

import NavSection from './NavSection';
import useStyles from './NavList.styles';

const NavList = ({
    isSidebarOpen,
    projects, datasources, predictions,
    projectsIsLoading, datasourcesIsLoading, predictionsIsLoading,
    hasMoreProjects, hasMoreDatasources, hasMorePredictions,
    fetchProjects, fetchDatasources, fetchPredictions,
}) => {
    const classes = useStyles();
    const [openSection, setOpenSection] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (!isSidebarOpen && !!openSection) {
            setOpenSection(null);
        }
    }, [isSidebarOpen, openSection]);

    const isInDashboardPage = useMemo(() =>
        !!matchPath(location.pathname, { path: routes._app.dashboard }), [location.pathname]);
    const isInProjectPage = useMemo(() =>
        !!matchPath(location.pathname, { path: routes._app.project }), [location.pathname]);
    const isInPredictionPage = useMemo(() =>
        !!matchPath(location.pathname, { path: routes._app.prediction }), [location.pathname]);
    const isInDataPage = useMemo(() =>
        !!matchPath(location.pathname, { path: routes._app.data }), [location.pathname]);

    const createClickHandlerForSection = useCallback((sectionName) => () =>
        setOpenSection(openSection === sectionName ? null : sectionName), [openSection]);

    const projectNavigationPredicate = useCallback((project) => project.status === PROJECT_STATUS_READY, []);

    // TODO: replace with correct predicate
    const predictionNavigationPredicate = useCallback(() => false, []);

    const datasourceNavigationPredicate = useCallback((datasource) => datasource.status === DATA_STATUS_READY, []);

    return (
        <List
            component="nav"
            className={classes.list}
        >
            <ListItem
                className={classes.listItem}
                component={NavLink}
                to={routes._app.dashboard}
            >
                <ListItemIcon>
                    <HomeIcon className={clsx(classes.iconColor, { [classes.activeIcon]: isInDashboardPage })} />
                </ListItemIcon>
                <ListItemText
                    className={clsx(classes.listItemText, { [classes.activeText]: isInDashboardPage })}
                    primaryTypographyProps={{ variant: 'subtitle2' }}
                >
                    Dashboard
                </ListItemText>
            </ListItem>
            <NavSection
                label="Projects"
                SectionIcon={TopicIcon}
                onClick={createClickHandlerForSection(SIDEBAR_TAB_PROJECTS)}
                isActive={isInProjectPage}
                isOpen={openSection === SIDEBAR_TAB_PROJECTS}
                data={projects}
                hasMore={hasMoreProjects}
                fetchMore={fetchProjects}
                isLoading={projectsIsLoading}
                linkPathBase={routes._app.project}
                navigationPredicate={projectNavigationPredicate}
            />
            <NavSection
                label="Predictions"
                SectionIcon={TimelineIcon}
                onClick={createClickHandlerForSection(SIDEBAR_TAB_PREDICTIONS)}
                isActive={isInPredictionPage}
                isOpen={openSection === SIDEBAR_TAB_PREDICTIONS}
                data={predictions}
                hasMore={hasMorePredictions}
                fetchMore={fetchPredictions}
                isLoading={predictionsIsLoading}
                linkPathBase={routes._app.prediction}
                navigationPredicate={predictionNavigationPredicate}
            />
            <NavSection
                label="Data Centre"
                SectionIcon={DataUsageIcon}
                onClick={createClickHandlerForSection(SIDEBAR_TAB_DATA)}
                isActive={isInDataPage}
                isOpen={openSection === SIDEBAR_TAB_DATA}
                data={datasources}
                hasMore={hasMoreDatasources}
                fetchMore={fetchDatasources}
                isLoading={datasourcesIsLoading}
                linkPathBase={routes._app.data}
                navigationPredicate={datasourceNavigationPredicate}
            />
        </List>
    );
};

NavList.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
    datasources: PropTypes.arrayOf(PropTypes.object).isRequired,
    predictions: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectsIsLoading: PropTypes.bool.isRequired,
    datasourcesIsLoading: PropTypes.bool.isRequired,
    predictionsIsLoading: PropTypes.bool.isRequired,
    hasMoreProjects: PropTypes.bool.isRequired,
    hasMoreDatasources: PropTypes.bool.isRequired,
    hasMorePredictions: PropTypes.bool.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    fetchDatasources: PropTypes.func.isRequired,
    fetchPredictions: PropTypes.func.isRequired,
};

export default NavList;
