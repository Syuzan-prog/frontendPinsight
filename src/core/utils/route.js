import { routes } from 'configs/app.routes';

export const isLandingPath = (route) => [
    routes.landing,
    routes.signup,
    routes.forgotPassword,
    routes.createPassword,
].some((path) => path === route);
