import isPlainObject from 'lodash-es/isPlainObject';

/* eslint-disable no-param-reassign */
export default function trimStringsInObject(object) {
    return isPlainObject(object) ? Object.keys(object).reduce((result, key) => {
        const value = result[key];

        const type = typeof result[key];

        if (type === 'string') {
            result[key] = value.trim();
        } else if (Array.isArray(value)) {
            result[key] = value.map(trimStringsInObject);
        } else if (isPlainObject(value)) {
            result[key] = trimStringsInObject(value);
        }

        return result;
    }, { ...object }) : object;
}
/* eslint-enable no-param-reassign */
