import { getApiRequest, postApiRequest } from './_tools';

import { plans as routes } from './routes';

export const fetchCurrent = () => getApiRequest(routes.current());
export const requestPlanUpgrade = (plan) => postApiRequest(routes.raw(), { plan });
