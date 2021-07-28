import {
    getApiRequest,
    putApiRequest,
    postApiRequest,
    deleteApiRequest,
} from './_tools';

import { datasources as routes } from './routes';

export const createData = (body) => postApiRequest(routes.list(), body);
export const getDatasource = (id) => getApiRequest(routes.one(id));

export const getDatasourceSchema = (id, limit, offset) =>
    getApiRequest(routes.schema(id), { query: { limit, offset } });

export const getDatasources = (limit = 20, offset = 0, filters = {}) =>
    getApiRequest(routes.list(), { query: { limit, offset, ...filters } });

export const getDatasourceVariables = (datasourceId, limit = 20, offset = 0, type) =>
    getApiRequest(routes.variables(datasourceId), { query: { limit, offset, 'filter[data_type]': type } });

export const uploadLinks = (storageId, body) => putApiRequest(routes.uploadLinks(storageId), body);

export const deleteDatasource = (datasourceId, deleteReferences) =>
    deleteApiRequest(routes.one(datasourceId), { query: { deleteReferences, force: true } });

export const getDatasourceReferences = (datasourceId) => getApiRequest(routes.references(datasourceId));
