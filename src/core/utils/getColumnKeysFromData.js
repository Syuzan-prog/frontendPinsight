export const getColumnKeysFromData = (data, keysToIgnore) => {
    if (!data) return [];

    const columnKeys = Object.keys(data);

    return columnKeys.filter((key) => !keysToIgnore.includes(key));
};
