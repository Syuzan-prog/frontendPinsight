import {
    getApiRequest,
    postApiRequest,
    putApiRequest,
    deleteApiRequest,
} from './_tools';

import { projects as routes } from './routes';

export const createProject = (body) => postApiRequest(routes.list(), body);
export const getProjects = (limit = 20, offset = 0, filters = {}) =>
    getApiRequest(routes.list(), { query: { limit, offset, ...filters } });
export const getProject = (projectId) => getApiRequest(routes.one(projectId));
export const getProjectMeta = (projectId) => getApiRequest(routes.meta(projectId), {
    query: { filter: ['overview', 'pdp', 'importance'] },
});
export const putProject = (projectId, body) => putApiRequest(routes.one(projectId), body);
export const deleteProject = (projectId, deleteReferences) =>
    deleteApiRequest(routes.one(projectId), { query: { deleteReferences, force: true } });
export const trainProject = (projectId) => postApiRequest(routes.train(projectId));
export const getProjectReferences = (projectId) => getApiRequest(routes.references(projectId));

export const fetchEvaluateThresholds = (projectId) => getApiRequest(routes._evaluate.threshold(projectId));
export const fetchEvaluateData = (projectId, threshold) =>
    getApiRequest(routes._evaluate.data(projectId), { query: { threshold } });
export const fetchInfo = (projectId) => getApiRequest(routes.info(projectId), {
    query: { filter: ['model_info', 'data_overview', 'project_info'] },
});
export const fetchSegments = (projectId) => getApiRequest(routes.segments(projectId));
export const fetchSuggestions = (projectId) => getApiRequest(routes.suggestions(projectId));
