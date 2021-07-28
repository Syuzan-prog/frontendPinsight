import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { reducer as app } from './modules/init.module';
import { reducer as account } from './modules/account';
import { reducer as datasources } from './modules/datasources';
import { reducer as projects } from './modules/projects';
import { reducer as predictions } from './modules/predictions';
import { reducer as notifications } from './modules/notifications';
import { reducer as plans } from './modules/plans';

import { logout } from './modules/auth.module';

const applicationReducer = combineReducers({
    app,
    account,
    notifications,
    datasources,
    projects,
    predictions,
    plans,
    form,
});

const rootReducer = (state, action) => {
    if (action.type === logout.getType()) {
        const { app: appReducer, form: formReducer } = state;

        // eslint-disable-next-line no-param-reassign
        state = { app: appReducer, form: formReducer };
    }

    return applicationReducer(state, action);
};

export default rootReducer;
