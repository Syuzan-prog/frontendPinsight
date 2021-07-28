import {
    getApiRequest,
    postApiRequest,
    putApiRequest,
    deleteApiRequest,
} from './_tools';
import { prediction as routes } from './routes';

export const getPredictions = (limit = 20, offset = 0) => getApiRequest(routes.list(), { query: { limit, offset } });
export const createPrediction = (body) => postApiRequest(routes.list(), body);
export const putPrediction = (predictionId, body) => putApiRequest(routes.one(predictionId), body);
export const deletePrediction = (predictionId) =>
    deleteApiRequest(routes.one(predictionId), { query: { force: true } });
export const predictPrediction = (predictionId) => postApiRequest(routes.predict(predictionId));
export const downloadPrediction = (predictionId) => getApiRequest(routes.download(predictionId));
