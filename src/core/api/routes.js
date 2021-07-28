export const auth = {
    login: () => `${APP_API_URL}/auth/sign-in`,
    signup: () => `${APP_API_URL}/auth/sign-up`,
    sendResetLink: () => `${APP_API_URL}/auth/reset-password`,
    resetPassword: (token) => `${APP_API_URL}/auth/reset-password/${token}`,
    verify: (token) => `${APP_API_URL}/auth/verify/${token}`,
};

export const account = {
    fetch: () => `${APP_API_URL}/users/me`,
    updateAccount: (id) => `${APP_API_URL}/users/${id}`,
    changePassword: (id) => `${APP_API_URL}/users/${id}/password`,
};

export const prediction = {
    list: () => `${APP_API_URL}/predictions`,
    one: (id) => `${APP_API_URL}/predictions/${id}`,
    predict: (id) => `${APP_API_URL}/predictions/${id}/predict`,
    download: (id) => `${APP_API_URL}/predictions/${id}/download`,
};

export const projects = {
    list: () => `${APP_API_URL}/projects`,
    one: (id) => `${APP_API_URL}/projects/${id}`,
    train: (id) => `${APP_API_URL}/projects/${id}/train`,
    meta: (id) => `${APP_API_URL}/projects/${id}/scores`,
    references: (id) => `${APP_API_URL}/projects/${id}/references`,
    info: (id) => `${APP_API_URL}/projects/${id}/info`,
    segments: (id) => `${APP_API_URL}/projects/${id}/segments`,
    suggestions: (id) => `${APP_API_URL}/projects/${id}/suggestions`,
    _evaluate: {
        threshold: (id) => `${APP_API_URL}/projects/${id}/evaluation/thresholds`,
        data: (id) => `${APP_API_URL}/projects/${id}/evaluation/data`,
    },
};

export const datasources = {
    list: () => `${APP_API_URL}/datasources`,
    one: (id) => `${APP_API_URL}/datasources/${id}`,
    schema: (id) => `${APP_API_URL}/datasources/${id}/schema`,
    variables: (datasourceId) => `${APP_API_URL}/datasources/${datasourceId}/variables`,
    uploadLinks: (storageId) => `${APP_API_URL}/storages/${storageId}/upload`,
    references: (id) => `${APP_API_URL}/datasources/${id}/references`,
};

export const notifications = {
    list: () => `${APP_API_URL}/activities`,
    markAsRead: () => `${APP_API_URL}/activities/mark`,
};

export const plans = {
    current: () => `${APP_API_URL}/users/me/subscription`,
    raw: () => `${APP_API_URL}/users/me/subscription/upgrade`,
};
