import * as api from 'core/api';

const getWording = (entity, hasConnectedEntities) => {
    switch (entity) {
        case 'datasource':
            return {
                title: 'Delete the Data?',
                description: hasConnectedEntities
                    ? 'Clicking DELETE will permanently erase this Data. There are Projects/Predictions built on this Data, you can delete everything or the Data only.'
                    : 'Clicking DELETE will permanently erase this data.',
                checkboxLabel: hasConnectedEntities ? 'Delete Projects/Predictions based on this Data.' : null,
            };
        case 'project':
            return {
                title: 'Delete the Project?',
                description: hasConnectedEntities
                    ? 'Clicking DELETE will permanently erase this Project. There are Predictions built on this Project, you can delete everything or the Project only.'
                    : 'Clicking DELETE will permanently erase this Project.',
                checkboxLabel: hasConnectedEntities ? 'Delete Predictions based on this Project.' : null,
            };
        case 'prediction':
        default:
            return {
                title: 'Delete the Prediction?',
                description: 'Clicking DELETE will permanently erase this Prediction.',
            };
    }
};

export const fetchWording = async (entity, id) => {
    let fetchReferencesFn;

    switch (entity) {
        case 'project':
            fetchReferencesFn = api.projects.getProjectReferences;
            break;
        case 'datasource':
            fetchReferencesFn = api.datasources.getDatasourceReferences;
            break;
        default:
            return getWording('prediction', false);
    }

    const { success, data } = await fetchReferencesFn(id);

    if (success) {
        return getWording(entity, !!data.count);
    }

    // TODO: handle error
    return {};
};
