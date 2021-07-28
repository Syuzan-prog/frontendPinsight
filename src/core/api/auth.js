import { postApiRequest, putApiRequest } from './_tools';
import { auth as routes } from './routes';

export const login = (email, password) => postApiRequest(routes.login(), { email, password });
export const signup = (body) => postApiRequest(routes.signup(), body);

export const sendResetLink = (email) => postApiRequest(routes.sendResetLink(), { email });
export const resetPassword = (body, token) => putApiRequest(routes.resetPassword(token), body);

export const verifyEmail = (token) => postApiRequest(routes.verify(token));
