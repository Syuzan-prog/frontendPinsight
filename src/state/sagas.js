import { all, fork } from 'redux-saga/effects';

import { watchInit } from './modules/init.module';
import { watchAuth } from './modules/auth.module';
import { watchLogin } from './modules/login.module';
import { watchSignup } from './modules/signup.module';
import { watchResetPassword } from './modules/resetPassword.module';
import { watchSendResetLink } from './modules/recoverPassword.module';
import { watchChangePassword } from './modules/changePassword.module';

import { watchAccount } from './modules/account';

import { watchFormSubmit } from './modules/formSubmit.module';

import { watchProjects } from './modules/projects';

import { watchDatasources } from './modules/datasources';

import { watchPredictions } from './modules/predictions';

import { watchNotifications } from './modules/notifications';

import { watchPlans } from './modules/plans';

export default function* rootSaga() {
    yield all([
        fork(watchInit),
        fork(watchAuth),
        fork(watchLogin),
        fork(watchSignup),
        fork(watchResetPassword),
        fork(watchSendResetLink),
        fork(watchChangePassword),
        fork(watchFormSubmit),
        fork(watchPredictions),
        fork(watchProjects),
        fork(watchDatasources),
        fork(watchAccount),
        fork(watchNotifications),
        fork(watchPlans),
    ]);
}
