export const processUploadMeta = (data) => {
    const meta = {
        bucket: data.storage.bucket,
        datasourceId: data.id,
        storageId: data.storage.id,
        storagePath: data.storage.path,
    };

    return meta;
};

export const processDatasources = (datasources) => datasources.map(({ size, ...datasource }) => ({
    ...datasource,
    size: size === 0 ? '-' : `${(size / 1048576).toFixed(1)} MB`,
}));
