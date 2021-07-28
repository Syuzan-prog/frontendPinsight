import { createPath, parsePath } from 'history';
import { parse, stringify } from 'query-string';

import { HTTP_STATUS_BAD_REQUEST } from 'constants/http.constants';
import { getToken } from 'core/utils/token';

import formatValidationErrors, { GENERIC_VALIDATION_ERROR_FIELD_NAME } from './_errors';
import objToFormData from './_objectToFormData';
import fetchWithProgressAndCancel from './_progressiveFetch';

const IS_API = '@@API';
const NO_HANDLE = '@@NO_HANDLE';

const buildUrl = (endpoint, query = {}) => {
    const parsed = parsePath(endpoint);
    const queryParsed = parse(parsed.search);
    const search = stringify({ ...queryParsed, ...query });

    return createPath({
        ...parsed,
        search: search ? `?${search}` : '',
    });
};

const isResponseJSON = (response) => {
    const contentType = response.headers.get('content-type');
    return contentType && contentType.indexOf('application/json') !== -1;
};

const prepareRequestHeaders = (options) => {
    const token = getToken();

    const headers = options.headers ? new Headers(options.headers) : new Headers();

    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Accept', 'application/json');

    return headers;
};

const prepareRequestOptions = (options) => ({
    credentials: 'same-origin',
    ...options,
    headers: prepareRequestHeaders(options),
});

const readResponse = (response) => {
    const isJson = isResponseJSON(response);

    return (isJson ? response.json() : response.text())
        .catch(() => null);
};

const handleError = (response, data) => {
    let error = data;

    const isJson = isResponseJSON(response);
    if (isJson && response.status === HTTP_STATUS_BAD_REQUEST) {
        const rawErrors = data.error?.fields || {};

        if (!data.error?.fields) {
            rawErrors[GENERIC_VALIDATION_ERROR_FIELD_NAME] = data.error?.message;
        }

        error = formatValidationErrors(rawErrors);
        error._code = data.error?.code;
        error.validation = true;
    }

    return { response: { error, ok: false, status: response.status } };
};

const handleSuccess = (response, data) => ({ response: data, ok: true });

const apiRequest = (endpoint, options = {}) => {
    const opts = prepareRequestOptions(options);
    const apiUrl = buildUrl(endpoint, options.query);

    return fetch(apiUrl, opts)
        .then((response) => readResponse(response)
            .then((data) => (response.ok ? handleSuccess(response, data) : handleError(response, data)))
            .then((data) => ({
                ...data.response,
                [IS_API]: true,
                [NO_HANDLE]: options.noHandle || false,
                status: response.status,
            })))
        .catch((error) => ({
            [IS_API]: false,
            error,
            ok: false,
            status: -1,
        }));
};

export const getApiRequest = apiRequest;

export const jsonApiRequest = (endpoint, body, { method = 'POST', ...options } = {}) => {
    const headers = options.headers || new Headers();
    headers.append('Content-Type', 'application/json');

    return apiRequest(endpoint, {
        ...options,
        method,
        headers,
        body: JSON.stringify(body),
    });
};

export const postApiRequest = jsonApiRequest;

export const formDataApiRequest = (endpoint, body, { method = 'POST', ...options } = {}) => {
    const headers = options.headers || new Headers();

    return apiRequest(endpoint, {
        ...options,
        method,
        headers,
        body,
    });
};

export const putApiRequest = (endpoint, body, options = {}) =>
    jsonApiRequest(endpoint, body, { ...options, method: 'PUT' });

export const patchApiRequest = (endpoint, body, options = {}) => jsonApiRequest(endpoint, body, { ...options, method: 'PATCH' });

export const postUploadRequest = (endpoint, files) => {
    const data = new FormData();
    data.append('files', files);

    return apiRequest(endpoint, {
        method: 'POST',
        body: data,
    });
};

export const deleteApiRequest = (endpoint, options = {}) => apiRequest(endpoint, {
    ...options,
    method: 'DELETE',
    headers: options.headers,
});

export const apiRequestCancelable = (endpoint, options = { method: 'POST', onProgress: null }) => {
    const opts = prepareRequestOptions({
        ...options,
        method: options.method,
    });

    const apiUrl = buildUrl(endpoint, options.query);

    return fetchWithProgressAndCancel(apiUrl, opts, options.onProgress);
};

export const multipartApiRequest = (endpoint, body, onProgress, options = { method: 'POST' }) => apiRequestCancelable(endpoint, { ...options, body: objToFormData(body), onProgress });
