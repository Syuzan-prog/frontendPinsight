import { deleteDatasourceSuccess } from '../datasources';
import { deleteProjectSuccess } from '../projects';

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
    [deleteProjectSuccess.getType()]: (state, { projectId, deleteConnectedEntities }) => {
        if (!deleteConnectedEntities) return { ...state };

        const entities = { ...state.entities };

        const idsToDelete = [];

        Object.keys(entities).forEach((entityId) => {
            if (entities[entityId].project.id === projectId) {
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
