import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

import { routes } from 'configs/app.routes';

import SettingsPage from 'components/app/SettingsPage';
import ExploreData from 'components/app/ExploreData';
import ProjectPage from 'components/app/ProjectPage';

import { ModalProvider, ModalController } from 'components/app/Modals';

import Home from '../Home';
import Sidebar from '../Sidebar';

import styles from './AppContainer.scss';

TimeAgo.addDefaultLocale(en);

const AppContainer = () => (
    <ModalProvider>
        <div className={styles.container}>
            <Sidebar />
            <div className="page-container">
                <Switch>
                    <Route exact path={routes._app.dashboard} component={Home} />
                    <Route path={routes._app.settings} component={SettingsPage} />
                    <Route path={routes._app.data} component={ExploreData} />
                    <Route path={routes._app.project} component={ProjectPage} />
                    <Redirect exact from={routes.app} to={routes._app.dashboard} />
                </Switch>
            </div>
        </div>
        <ModalController />
    </ModalProvider>
);

export default AppContainer;
