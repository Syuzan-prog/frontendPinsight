import React from 'react';
import { Field } from 'redux-form';
import clsx from 'clsx';

import Select from 'components/common/Select';
import TextInput from 'components/common/TextInput';

import {
    PROJECT_PROJECT_NAME_FIELD_NAME,
    PROJECT_DESCRIPTION_FIELD_NAME,
    PROJECT_DATA_FIELD_NAME,
    PROJECT_TARGET_VARIABLE_FIELD_NAME,
    PROJECT_ID_VARIABLE_FIELD_NAME,
} from 'constants/project.constants';

import { fetchReadyDatasources, fetchDatasourceVariables } from 'core/dataFetchers/datasources';

import styles from './CreateProjectModal.scss';

// refactor this when more prediction types become available
/* eslint-disable react/prop-types */
const steps = [
    {
        heading: 'Project Information.',
        description: 'Create a project to make predictions and analize the results. Please, fill the required information.',
        getContent: () => (
            <>
                <Field
                    className={styles.formControl}
                    name={PROJECT_PROJECT_NAME_FIELD_NAME}
                    component={TextInput}
                    label="Project Name"
                    helperText="Name your project to easily identify it."
                    isRequired
                    fullWidth
                />
                <Field
                    className={styles.formControl}
                    name={PROJECT_DESCRIPTION_FIELD_NAME}
                    component={TextInput}
                    label="Project Description (Optional)"
                    helperText="Provide a short description of your project."
                />
                <Field
                    className={styles.formControl}
                    name={PROJECT_DATA_FIELD_NAME}
                    component={Select}
                    label="Data"
                    helperText="Select the data on which you want to train your model."
                    getOptions={fetchReadyDatasources}
                    isPaginated
                    isRequired
                />
            </>
        ),
        isCompleted: false,
    },
    {
        heading: 'Which variable do you want to predict?',
        description: 'From the list given below, please, choose the variable that you want to predict.',
        getContent: (datasourceId, type) => (
            <>
                <Field
                    key="target"
                    className={clsx(styles.formControl, styles.withTopMargin)}
                    name={PROJECT_TARGET_VARIABLE_FIELD_NAME}
                    component={Select}
                    label="Target Variable"
                    helperText="Select the variable that you want to predict."
                    getOptions={fetchDatasourceVariables(datasourceId, type)}
                    isPaginated
                    isRequired
                />
            </>
        ),
        isCompleted: false,
    },
    {
        heading: 'Which variable on your data is an identifier?',
        description: 'From the list given below, please, select the variable that uniquely identifies each observation of your data, e.g. Name, ID.',
        getContent: (datasourceId) => (
            <>
                <Field
                    key="id"
                    className={clsx(styles.formControl, styles.withTopMargin)}
                    name={PROJECT_ID_VARIABLE_FIELD_NAME}
                    component={Select}
                    label="ID Variable"
                    helperText="Select the variable that uniquely identifies each entity."
                    getOptions={fetchDatasourceVariables(datasourceId, 'ID')}
                    isPaginated
                    isRequired
                />
            </>
        ),
        isCompleted: false,
    },
];
/* eslint-enable react/prop-types */

export default steps;
