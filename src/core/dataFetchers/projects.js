import memoizeOne from 'memoize-one';

import {
    getProjects,
    getProject,
} from 'core/api/projects';

export const fetchProjects = memoizeOne(async (limit, offset) => {
    const { success, data, error } = await getProjects(limit, offset);

    if (success) {
        return {
            hasMore: (limit + offset) < data.count,
            data: data.payload.map(({ id, name }) => ({ label: name, value: id })),
        };
    }

    throw Error(error);
});

export const fetchProject = async (id) => {
    const { success, data, error } = await getProject(id);

    if (success) {
        return data;
    }

    throw Error(error);
};

export const fetchTrainedProjects = memoizeOne(async (limit, offset) => {
    const { success, data, error } = await getProjects(limit, offset, { 'filter[status]': 'READY' });

    if (success) {
        return {
            hasMore: (limit + offset) < data.count,
            data: data.payload.map(({ id, name }) => ({ label: name, value: id })),
        };
    }

    throw Error(error);
});
