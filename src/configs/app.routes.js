export const routes = {
    landing: '/',
    login: '/',
    signup: '/signup',
    signupSuccess: '/signup/success',
    forgotPassword: '/reset-password',
    passwordResetSuccess: '/reset-password/success',
    createPassword: '/create-password',
    termsConditions: '/terms-and-conditions',
    app: '/app',
    _app: {
        dashboard: '/app/dashboard',
        project: '/app/project/:id',
        _project: {
            overview: '/app/project/:id/overview',
            segments: '/app/project/:id/segments',
            info: '/app/project/:id/info',
            advanced: '/app/project/:id/advanced',
            _advanced: {
                evaluate: '/app/project/:id/advanced/evaluate',
                fairness: '/app/project/:id/advanced/fairness',
            },
        },
        prediction: '/app/prediction/:id',
        data: '/app/data/:id',
        settings: '/app/settings',
        _settings: {
            account: '/app/settings/account',
            plansAndBilling: '/app/settings/plans-and-billing',
        },
    },
};
