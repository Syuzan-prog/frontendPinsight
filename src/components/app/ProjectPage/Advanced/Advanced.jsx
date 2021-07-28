import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { routes } from 'configs/app.routes';

import Evaluate from './Evaluate';

const Advanced = () => (
    <div className="flex-container">
        <Switch>
            <Route path={routes._app._project._advanced.evaluate} component={Evaluate} />
            <Redirect from={routes._app._project.advanced} to={routes._app._project._advanced.evaluate} />
        </Switch>
    </div>
);

export default Advanced;
