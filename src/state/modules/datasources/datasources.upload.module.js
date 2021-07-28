import { createAction } from 'redux-act';
import { takeEvery, take, put, call } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import progressiveFetch from 'core/api/_progressiveFetch';

const namespace = 'datasources';

export const uploadData = createAction(
    `${namespace} | upload data`,
    (file, meta) => ({ file, meta })
);

const uploadDataProgress = createAction(
    `${namespace} | upload data progress`,
    (progress) => progress
);

export const uploadDataSuccess = createAction(`${namespace} | upload data success`);

const uploadDataFail = createAction(
    `${namespace} | upload data fail`,
    (error) => error
);

export const reducer = {
    [uploadData.getType()]: (state) => ({
        ...state,
        meta: {
            ...state.meta,
            progress: 0,
        },
    }),
    [uploadDataProgress.getType()]: (state, progress) => ({
        ...state,
        meta: {
            ...state.meta,
            progress,
        },
    }),
    [uploadDataSuccess.getType()]: (state) => ({
        ...state,
        meta: {
            ...state.meta,
            progress: 100,
        },
    }),
    [uploadDataFail.getType()]: (state, error) => ({
        ...state,
        meta: {
            ...state.meta,
            progress: null,
            error,
        },
    }),
};

function* uploadDatasourceSaga({ payload: {
    file,
    meta: {
        url,
        method,
        fields,
    } },
}) {
    const headers = new Headers();
    const formData = new FormData();

    Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key]);
    });

    formData.append('Content-Type', 'application/zip');
    formData.append('file', file);

    try {
        const progressiveFetchChannel = () => eventChannel((emit) => {
            progressiveFetch(url, { method, headers, body: formData, redirect: 'follow' }, ({ loaded, total }) => {
                if (loaded === total) {
                    emit(END);
                } else {
                    emit(Math.round((loaded / total) * 100));
                }
            });

            return () => {};
        });

        const channel = yield call(progressiveFetchChannel);

        try {
            while (true) {
                const progress = yield take(channel);
                yield put(uploadDataProgress(progress));
            }
        } finally {
            yield put(uploadDataSuccess());
        }
    } catch (error) {
        yield put(uploadDataFail(error));
    }
}

export function* watchDatasourceUpload() {
    yield takeEvery(uploadData.getType(), uploadDatasourceSaga);
}
