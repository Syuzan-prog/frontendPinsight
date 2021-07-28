import { getApiRequest, putApiRequest } from './_tools';
import { account } from './routes';

export const fetch = () => getApiRequest(account.fetch());

export const changePassword = (password, newPassword, userId) =>
    putApiRequest(account.changePassword(userId), { password, newPassword });
