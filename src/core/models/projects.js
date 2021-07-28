import { camelizeKeys } from 'humps';
import { format } from 'date-and-time';

import {
    PREDICTION_TYPE_NUMBER,
    PREDICTION_TYPE_YES_NO,
} from 'constants/project.constants';

export const processProjectMeta = ({ importance, overview, ...data }) => ({
    ...data,
    drivingFactors: Array.from({ length: importance.features.length }).map((name, index) => ({
        name: importance?.features[index],
        value: importance?.importance[index],
        sign: importance?.importance_sign[index],
    })),
    modelHealth: {
        accuracy: Math.round(overview.accuracy * 100),
        fairness: overview.fairness,
    },
});

export const processThresholdData = ({ optimal, all }) => ({
    optimal: Number(optimal),
    all: all.map(Number),
});

const segmentNameList = {
    [PREDICTION_TYPE_NUMBER]: ['Very high $', 'High $', 'Neutral', 'Low $', 'Very low $'],
    [PREDICTION_TYPE_YES_NO]: ['Very likely to $', 'Likely to $', 'Neutral', 'Unlikely to $', 'Very unlikely to $'],
};

export const processSegments = (segments, type, targetVar) => camelizeKeys(segments.map((segment, index) => ({
    ...segment,
    name: segmentNameList[type][index].replace('$', targetVar),
    createdAt: format(new Date(segment.createdAt), 'DD.MM.YYYY'),
})));

const processSuggestion = (suggestion) => ({
    diff: Number.isInteger(suggestion.diff) ? String(suggestion.diff) : suggestion.diff.toFixed(2),
    rules: suggestion.rule?.split(' & '),
});

export const processSuggestions = (suggestions) => {
    const processedSuggestions = suggestions;

    Object.keys(suggestions).forEach((key) => {
        const { increase, decrease } = suggestions[key];

        processedSuggestions[key].increase = increase
            ? increase.map((suggestion) => processSuggestion(suggestion)) : [];
        processedSuggestions[key].decrease = decrease
            ? decrease.map((suggestion) => processSuggestion(suggestion)) : [];
        processedSuggestions[key].id = key;
    });

    return processedSuggestions;
};

export const processInfo = (info) => camelizeKeys(info);
