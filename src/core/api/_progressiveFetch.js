import { HTTP_STATUS_BAD_REQUEST } from 'constants/http.constants';

import formatValidationErrors from './_errors';

export default function fetchWithProgressAndCancel(url, opts = {}, onProgress) {
    const xhr = new XMLHttpRequest();

    let cancelled = false;

    const cancel = () => {
        if (xhr.readyState !== XMLHttpRequest.DONE) {
            cancelled = true;
            xhr.abort();
        }
    };

    const promise = new Promise((resolve, reject) => {
        xhr.open(opts.method || 'get', url);

        if (opts.headers) {
            Array.from(opts.headers.entries()).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 0) {
                    resolve({
                        ok: false,
                        status: 0,
                        cancelled,
                        error: cancelled ? 'Request cancelled' : 'Failed to fetch',
                    });
                } else if (xhr.status >= 200 && xhr.status < 300) {
                    const contentType = xhr.getResponseHeader('Content-Type');
                    const isJson = contentType && contentType.indexOf('application/json') !== -1;
                    const response = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
                    resolve({ response, ok: true, status: xhr.status });
                } else {
                    let error = xhr.responseText || xhr.statusText;

                    const contentType = xhr.getResponseHeader('Content-Type');
                    const isJson = contentType && contentType.indexOf('application/json') !== -1;

                    if (isJson && xhr.status === HTTP_STATUS_BAD_REQUEST) {
                        error = formatValidationErrors(JSON.parse(error));
                        error.validation = true;
                    }

                    resolve({ error, ok: false, status: xhr.status });
                }
            }

        };

        xhr.onerror = () => {
            reject(new Error('Failed to fetch'));
        };

        if (xhr.upload && onProgress) {
            xhr.upload.onprogress = onProgress;
        }

        xhr.send(opts.body);
    });

    return {
        promise,
        cancel,
    };
}
