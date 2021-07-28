import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';

import { Router, Switch, Route } from 'react-router-dom';

import Loader, { LoaderContainer } from 'components/common/Loader';

import appHistory from 'configs/app.history';
import { routes } from 'configs/app.routes';

const LandingContainer = lazy(() => import(
    /* webpackChunkName: "landing" */
    /* webpackMode: "lazy" */
    'components/app/LandingContainer'
));

const AppContainer = lazy(() => import(
    /* webpackChunkName: "app" */
    /* webpackMode: "lazy" */
    'components/app/AppContainer'
));

const Root = () => {
    const isReady = useSelector((state) => state.app.isReady);

    return (
        <LoaderContainer isLoading={!isReady} className="page-loader">
            <Suspense fallback={<Loader className="page-loader" />}>
                <Router history={appHistory}>
                    <Switch>
                        <Route path={routes.app} component={AppContainer} />
                        <Route path={routes.landing} component={LandingContainer} />
                    </Switch>
                </Router>
            </Suspense>
        </LoaderContainer>
    );
};

export default Root;
