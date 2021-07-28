const TOKEN_STORAGE_KEY = 'token';

export const setToken = (token, persistToken = false) => {
    const storage = persistToken ? localStorage : sessionStorage;
    storage.setItem(TOKEN_STORAGE_KEY, token);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const setUserToken = (token) => {
    removeToken();
    setToken(token);
};

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY);
