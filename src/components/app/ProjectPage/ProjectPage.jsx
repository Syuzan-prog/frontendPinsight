import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { generatePath } from 'react-router';
import { NavLink, Switch, Route, Redirect, useLocation, matchPath } from 'react-router-dom';
import { Field } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import AddIcon from '@material-ui/icons/Add';

import Button from 'components/common/Button';
import Select from 'components/common/Select';
import { LoaderContainer } from 'components/common/Loader';

import { fetchTrainedProjects, fetchProject } from 'core/dataFetchers/projects';
import { routes } from 'configs/app.routes';
import { PROJECT_PAGE_PROJECT_FIELD_NAME } from 'constants/projectPage.constants';

import Overview from './Overview';
import SegmentsPage from './SegmentsPage';
import InfoPage from './InfoPage';
import Advanced from './Advanced';
import styles from './ProjectPage.scss';

const ProjectPage = ({ match: { params }, history, change, setTargetVariable, setProjectType }) => {
    const [defaultOptions, setDefaultOptions] = useState(null);
    const [advancedOpen, setAdvancedOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        change(PROJECT_PAGE_PROJECT_FIELD_NAME, params.id);

        (async function getDefaultOption() {
            const { id, name, targetVar, type } = await fetchProject(params.id);

            setTargetVariable(targetVar);
            setProjectType(type);
            setDefaultOptions([{ value: id, label: name }]);
        }());
    }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = useCallback((event) => {
        history.push(generatePath(routes._app._project.overview, { id: event.target.value }));
    }, [history]);

    const toggleQuestionOption = useCallback(() => {
        setAdvancedOpen((visibility) => !visibility);
    }, []);

    const navigateToAdvancedPath = useCallback((route) => {
        history.push(generatePath(route, { id: params.id }));
    }, [params.id, history]);

    const isInAdvancedPage = useMemo(() =>
        !!matchPath(location.pathname, { path: routes._app._project.advanced }), [location.pathname]);

    return (
        <div className={styles.container}>
            <LoaderContainer isLoading={!defaultOptions}>
                <div className={clsx(styles.header, { [styles.withBorder]: isInAdvancedPage })}>
                    <form className={styles.nameList}>
                        <Field
                            component={Select}
                            name={PROJECT_PAGE_PROJECT_FIELD_NAME}
                            getOptions={fetchTrainedProjects}
                            onChange={handleChange}
                            variant="standard"
                            defaultOptions={defaultOptions}
                            noOutlines
                            isHeader
                        />
                    </form>
                    <div className={styles.links}>
                        <NavLink to={generatePath(routes._app._project.overview, { id: params.id })}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Overview</Typography>
                        </NavLink>
                        <NavLink to={generatePath(routes._app._project.segments, { id: params.id })}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Segments</Typography>
                        </NavLink>
                        <NavLink to={generatePath(routes._app._project.info, { id: params.id })}>
                            <Typography component="span" variant="subtitle2" color="textSecondary">Info</Typography>
                        </NavLink>
                        <div
                            className={styles.advancedList}
                            onClick={toggleQuestionOption}
                        >
                            <Typography
                                component="span"
                                variant="subtitle2"
                                color="textSecondary"
                                className={clsx(styles.anchor, { [styles.active]: isInAdvancedPage })}
                            >
                                Advanced
                                {advancedOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </Typography>
                            {advancedOpen && (
                                <ClickAwayListener onClickAway={() => setAdvancedOpen(false)}>
                                    <List component="div" className={styles.advancedListMenu}>
                                        <ListItem
                                            button
                                            onClick={() =>
                                                navigateToAdvancedPath(routes._app._project._advanced.evaluate)}
                                        >
                                            <Typography variant="body1">Evaluate</Typography>
                                        </ListItem>
                                        <ListItem button disabled>
                                            <Typography variant="body1">Fairness</Typography>
                                        </ListItem>
                                    </List>
                                </ClickAwayListener>
                            )}
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        color="secondary"
                        className={styles.exportButton}
                    >
                        <ArrowDownwardIcon className="m-r-12 iif-left-8" />
                        export
                    </Button>
                    {/* {
                        location.pathname.endsWith('segments') && (
                            <Button
                                type="button"
                                variant="contained"
                                fullWidth
                                color="primary"
                                className={styles.addSegment}
                            >
                                <AddIcon className="m-r-12 iif-left-8" />
                                add segment
                            </Button>
                        )
                    } */}
                </div>
                <div className={styles.contentContainer}>
                    <Switch>
                        <Route path={routes._app._project.overview} component={Overview} />
                        <Route path={routes._app._project.segments} component={SegmentsPage} />
                        <Route path={routes._app._project.info} component={InfoPage} />
                        <Route path={routes._app._project.advanced} component={Advanced} />
                        <Redirect
                            from={routes._app.project}
                            to={generatePath(routes._app._project.overview, { id: params.id })}
                        />
                    </Switch>
                </div>
            </LoaderContainer>
        </div>
    );
};

ProjectPage.propTypes = {
    change: PropTypes.func.isRequired,
    match: PropTypes.shape({
        isExact: PropTypes.bool.isRequired,
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
        path: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }),
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
    setTargetVariable: PropTypes.func.isRequired,
    setProjectType: PropTypes.func.isRequired,
};

export default ProjectPage;
