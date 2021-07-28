import memoizeOne from 'memoize-one';

import {
    getDatasource,
    getDatasources,
    getDatasourceVariables,
} from 'core/api/datasources';

export const fetchDatasource = async (id) => {
    const { success, data, error } = await getDatasource(id);

    if (success) {
        return data;
    }

    throw Error(error);
};

export const fetchDatasources = memoizeOne(async (limit, offset) => {
    const { success, data, error } = await getDatasources(limit, offset);

    if (success) {
        return {
            hasMore: (limit + offset) < data.count,
            data: data.payload.map(({ id, name }) => ({ label: name, value: id })),
        };
    }

    throw Error(error);
});

export const fetchReadyDatasources = memoizeOne(async (limit, offset) => {
    const { success, data, error } = await getDatasources(limit, offset, { 'filter[status]': 'READY' });

    if (success) {
        return {
            hasMore: (limit + offset) < data.count,
            data: data.payload.map(({ id, name }) => ({ label: name, value: id })),
        };
    }

    throw Error(error);
});

export const fetchDatasourceVariables = (datasourceId, type) => memoizeOne(async (limit, offset) => {
    const { success, data, error } = await getDatasourceVariables(datasourceId, limit, offset, type);

    if (success) {
        return {
            hasMore: (limit + offset) < data.count,
            data: data.payload.map((key) => ({ label: key, value: key })),
        };
    }

    throw Error(error);
});
