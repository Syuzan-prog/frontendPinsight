import { createSelector } from 'reselect';

const getDatasourcesState = (state) => state.datasources;

const getDatasourcesIdMap = createSelector(
    getDatasourcesState,
    (datasources) => datasources.idMap
);

const getDatasourcesEntities = createSelector(
    getDatasourcesState,
    (datasources) => datasources.entities
);

export const getDatasources = createSelector(
    getDatasourcesIdMap,
    getDatasourcesEntities,
    (idMap, entities) => idMap.map((id) => entities[id])
);

export const getDatasourcesCount = createSelector(
    getDatasources,
    (datasources) => datasources.length
);

const getDatasourcesMeta = createSelector(
    getDatasourcesState,
    (datasources) => datasources.meta
);

export const getUploadProgress = createSelector(
    getDatasourcesMeta,
    (meta) => meta?.progress
);

export const getHasMoreDatasources = createSelector(
    getDatasourcesState,
    (datasources) => datasources.hasMore
);

export const getIsDatasourcesLoading = createSelector(
    getDatasourcesState,
    (datasources) => datasources.isLoading
);

export const getSelectedDatasource = createSelector(
    getDatasourcesState,
    (datasources) => datasources.selectedDatasource
);

export const getSelectedDatasourceSchema = createSelector(
    getSelectedDatasource,
    (datasource) => datasource?.schema
);

export const getSelectedDatasourceSchemaRowCount = createSelector(
    getSelectedDatasourceSchema,
    (schema) => schema?.length
);

export const getIsSelectedDatasourceLoading = createSelector(
    getSelectedDatasource,
    (datasource) => datasource.isLoading
);

export const getIsSelectedDatasourceLoaded = createSelector(
    getSelectedDatasource,
    (datasource) => datasource.isLoaded
);

export const getSelectedDatasourceSchemaHasMore = createSelector(
    getSelectedDatasourceSchema,
    (schema) => schema?.hasMore
);
