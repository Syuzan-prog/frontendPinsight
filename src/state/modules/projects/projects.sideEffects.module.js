import { deleteDatasourceSuccess } from '../datasources';

export const reducer = {
    [deleteDatasourceSuccess.getType()]: (state, { datasourceId, deleteConnectedEntities }) => {
        if (!deleteConnectedEntities) return { ...state };

        const entities = { ...state.entities };

        const idsToDelete = [];

        Object.keys(entities).forEach((entityId) => {
            if (entities[entityId].datasource.id === datasourceId) {
                idsToDelete.push(entityId);
                delete entities[entityId];
            }
        });

        return {
            ...state,
            entities,
            idMap: state.idMap.filter((id) => !idsToDelete.includes(id)),
        };
    },
};
