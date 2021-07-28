import { postApiRequest, putApiRequest } from './_tools';
import { account as routes } from './routes';

export const accountUpdate = (id, body) =>
    putApiRequest(routes.updateAccount(id), body);

export const changePassword = (password) => postApiRequest(routes.changePassword(), { password });
