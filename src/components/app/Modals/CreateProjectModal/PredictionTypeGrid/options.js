import {
    PREDICTION_TYPE_NUMBER,
    PREDICTION_TYPE_YES_NO,
    PREDICTION_TYPE_EVENT,
    PREDICTION_TYPE_NUMBER_OVER_TIME,
    PREDICTION_TYPE_YES_NO_OVER_TIME,
    PREDICTION_TYPE_FUTURE,
} from 'constants/project.constants';

const options = [
    { name: PREDICTION_TYPE_NUMBER, label: 'Number', description: 'Example: predicting the house prices.', isActive: true },
    { name: PREDICTION_TYPE_YES_NO, label: 'Yes/No', description: 'Example: predicting whether the email is spam or not.', isActive: true },
    { name: PREDICTION_TYPE_EVENT, label: 'Event', description: 'Example: predicting whether the user will purchase the app after the free trial (each row in the data shows certain event and a timestamp).', isActive: false },
    { name: PREDICTION_TYPE_NUMBER_OVER_TIME, label: 'Number Over Time', description: 'Example: predicting revenue for each user (each row in the data is a certain timestamp of a certain user).', isActive: false },
    { name: PREDICTION_TYPE_YES_NO_OVER_TIME, label: 'Yes/No Over Time', description: 'Example: predicting whether the customer will churn or not for transactional data.', isActive: false },
    { name: PREDICTION_TYPE_FUTURE, label: 'Future', description: 'Example: forecasting Inflation rate of a certain country for the next year based on past trends.', isActive: false },
];

export default options;
