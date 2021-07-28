import { createSelector } from 'reselect';

import {
    CHANGE_FULL_NAME_FIELD_NAME,
    CHANGE_POSITION_FIELD_NAME,
    CHANGE_EMAIL_FIELD_NAME,
    CHANGE_COMPANY_FIELD_NAME,
    CHANGE_IMAGE_FIELD_NAME,
} from 'constants/settings.constants';

export const getAccount = (state) => state.account;

export const getIsLoggedIn = createSelector(
    getAccount,
    (account) => account.isLoaded
);

export const getFullName = createSelector(
    getAccount,
    (account) => account.fullName
);

export const getAvatarUrl = createSelector(
    getAccount,
    (account) => account.image
);

export const getEmail = createSelector(
    getAccount,
    (account) => account.email
);

export const getPosition = createSelector(
    getAccount,
    (account) => account.position
);

export const getAccountId = createSelector(
    getAccount,
    (account) => account.id
);

export const getAccountUpdateInitialState = createSelector(
    getAccount,
    (account) => ({
        [CHANGE_FULL_NAME_FIELD_NAME]: account.fullName,
        [CHANGE_POSITION_FIELD_NAME]: account.position,
        [CHANGE_COMPANY_FIELD_NAME]: account.company,
        [CHANGE_EMAIL_FIELD_NAME]: account.email,
        [CHANGE_IMAGE_FIELD_NAME]: account.image,
    })
);
