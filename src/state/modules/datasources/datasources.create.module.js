import { createAction } from 'redux-act';
import { takeEvery, put, call, take } from 'redux-saga/effects';
import { zipSync } from 'fflate';

import * as api from 'core/api';
import { processUploadMeta } from 'core/models/datasources';

import { uploadData, uploadDataSuccess } from './datasources.upload.module';
import { fetchDatasources } from './datasources.fetch.module';

const namespace = 'datasources';

export const createData = createAction(
    `${namespace} | create data`,
    ({ name, description, files, type = 'CSV' }) => ({ name, description, files, type })
);

export const createDatasourceSuccess = createAction(
    `${namespace} | create datasource success`,
    (meta) => meta
);

const fetchUploadMetaSuccess = createAction(
    `${namespace} | fetch upload links success`,
    (links) => links
);

export const createDataSuccess = createAction(`${namespace} | create data success`);

export const createDataFail = createAction(
    `${namespace} | create data fail`,
    (error) => error
);

export const reducer = {
    [createData.getType()]: (state) => ({
        ...state,
        error: null,
    }),
    [createDatasourceSuccess.getType()]: (state, meta) => ({
        ...state,
        meta,
    }),
    [createData.getType()]: (state) => ({
        ...state,
        meta: {
            progress: null,
        },
    }),
    [createDataFail.getType()]: (state, error) => ({
        ...state,
        error,
    }),
};

async function filesToBufferMap(files) {
    const bufferMap = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        const buffer = await file.arrayBuffer();
        bufferMap[file.name] = new Uint8Array(buffer);
    }

    return bufferMap;
}

function* fetchUploadMetaSaga(storageId, files) {
    const body = { fileList: files.map((file) => file.path) };
    const { success, data, error } = yield call(api.datasources.uploadLinks, storageId, body);

    if (success) {
        yield put(fetchUploadMetaSuccess());

        const fileMap = yield call(filesToBufferMap, files);
        const compressedFile = zipSync(fileMap, { level: 1, mem: 6 });

        const { archiveName, ...meta } = data;

        yield put(uploadData(new File([compressedFile.buffer], archiveName), meta));

        yield take(uploadDataSuccess.getType());

        yield put(fetchDatasources(10, 0, true));
        yield put(createDataSuccess());
    }
    yield put(createDataFail(error));

}

function* createDataSaga({ payload: { files, ...body } }) {
    const { success, data, error } = yield call(api.datasources.createData, body);

    if (success) {
        const meta = processUploadMeta(data);
        yield put(createDatasourceSuccess(meta));
        yield call(fetchUploadMetaSaga, meta.storageId, files);
    } else {
        yield put(createDataFail(error));
    }
}

export function* watchDatasourceCreate() {
    yield takeEvery(createData.getType(), createDataSaga);
}
