export const PREDICTION_TYPE_NUMBER = 'NUMERIC';
export const PREDICTION_TYPE_YES_NO = 'BINARY';
export const PREDICTION_TYPE_EVENT = 'event';
export const PREDICTION_TYPE_NUMBER_OVER_TIME = 'numberOverTime';
export const PREDICTION_TYPE_YES_NO_OVER_TIME = 'yesNoOverTime';
export const PREDICTION_TYPE_FUTURE = 'future';

export const PROJECT_TYPES = [
    PREDICTION_TYPE_NUMBER,
    PREDICTION_TYPE_YES_NO,
    PREDICTION_TYPE_EVENT,
    PREDICTION_TYPE_NUMBER_OVER_TIME,
    PREDICTION_TYPE_YES_NO_OVER_TIME,
    PREDICTION_TYPE_FUTURE,
];

export const PROJECT_FORM_NAME = 'createProject';
export const PROJECT_PREDICTION_TYPE_FIELD_NAME = 'type';
export const PROJECT_PROJECT_NAME_FIELD_NAME = 'name';
export const PROJECT_DESCRIPTION_FIELD_NAME = 'description';

export const PROJECT_DATA_FIELD_NAME = 'datasourceId';
export const PROJECT_TARGET_VARIABLE_FIELD_NAME = 'targetVar';
export const PROJECT_ID_VARIABLE_FIELD_NAME = 'idVar';

export const SUGGESTIONS_QUESTION_OPTION_INCREASE = 'increase';
export const SUGGESTIONS_QUESTION_OPTION_DECREASE = 'decrease';

export const PROJECT_STATUS_NOT_TRAINED = 'NOT_PROCESSED';
export const PROJECT_STATUS_IN_TRAINING = 'PROCESSING';
export const PROJECT_STATUS_READY = 'READY';
export const PROJECT_STATUS_FAILED = 'FAILED';

export const PROJECT_STATUS_TO_LABEL = {
    [PROJECT_STATUS_NOT_TRAINED]: 'Not Started',
    [PROJECT_STATUS_IN_TRAINING]: 'In Process',
    [PROJECT_STATUS_READY]: 'Completed',
    [PROJECT_STATUS_FAILED]: 'Failed',
};

export const PREDICTION_TYPE_TO_LABEL = {
    [PREDICTION_TYPE_NUMBER]: 'Number',
    [PREDICTION_TYPE_YES_NO]: 'Yes/No',
};

export const MODEL_HEALTH_BAD = 'bad';
export const MODEL_HEALTH_GOOD = 'good';
export const MODEL_HEALTH_GREAT = 'great';

export const MODEL_HEALTH_SEGMENTS = [
    { name: MODEL_HEALTH_BAD, value: 33.33, color: '#E31B0C' },
    { name: MODEL_HEALTH_GOOD, value: 33.33, color: '#FF9800' },
    { name: MODEL_HEALTH_GREAT, value: 33.33, color: '#3B873E' },
];

export const MODEL_SEGMENT_LABELS = ['33', '66'];

export const ACCURACY_WORDING = {
    [MODEL_HEALTH_BAD]: {
        main: 'You have a poor model.',
        secondary: 'Continue analyzing it to get more insights.',
    },
    [MODEL_HEALTH_GOOD]: {
        main: 'You have a pretty good model.',
        secondary: 'Continue analyzing it to get more insights.',
    },
    [MODEL_HEALTH_GREAT]: {
        main: 'You have a great model.',
        secondary: 'Continue analyzing it to get more insights.',
    },
};

export const FAIRNESS_WORDING = {
    [MODEL_HEALTH_BAD]: {
        main: 'You have a pretty biased model.',
        secondary: 'Dive deeper in the Fairness page.',
    },
    [MODEL_HEALTH_GOOD]: {
        main: 'You have a fairly biased model.',
        secondary: 'Dive deeper in the Fairness page.',
    },
    [MODEL_HEALTH_GREAT]: {
        main: 'You have a fair model.',
        secondary: 'Dive deeper in the Fairness page.',
    },
};
