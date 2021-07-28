import { createAction } from 'redux-act';
import { SubmissionError } from 'redux-form';
import { put, race, take, takeEvery } from 'redux-saga/effects';

import trimStringsInObject from 'core/utils/trimStringsInObject';

const formSubmit = createAction(
    'form-submit-state/FORM_SUBMIT',
    (
        submitAction,
        successAction,
        failureAction,
        values,
        resolve,
        reject,
        options = { trim: true }
    ) => ({
        submitAction,
        successAction,
        failureAction,
        values,
        resolve,
        reject,
        options,
    })
);

export function onSubmitActions(
    submitAction,
    successAction,
    failureAction,
    options = { trim: true }
) {
    return (values, dispatch) => new Promise((resolve, reject) => {
        dispatch(formSubmit(submitAction, successAction, failureAction, values, resolve, reject, options));
    });
}

function* formSubmitSaga({
    payload: {
        submitAction,
        successAction,
        failureAction,
        values,
        resolve,
        reject,
        options,
    },
}) {
    yield put(submitAction(
        options.trim
            ? trimStringsInObject(values)
            : values
    ));

    const { success, failure } = yield race({
        success: take(successAction.getType()),
        failure: take(failureAction.getType()),
    });

    if (success) {
        resolve(values);
    } else if (failure.payload?.validation || failure.payload?.error?.validation) {
        reject(new SubmissionError(failure.payload.error || failure.payload));
    } else {
        reject(failure.payload);
    }
}

export function* watchFormSubmit() {
    yield takeEvery(formSubmit.getType(), formSubmitSaga);
}
