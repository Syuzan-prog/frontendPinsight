import isObject from 'lodash-es/isObject';

const objectToFormData = (obj, formData = new FormData(), prefix) => {
    Object.keys(obj).forEach((prop) => {
        const key = prefix ? `${prefix}[${prop}]` : prop;

        if (isObject(obj[prop]) && !(obj[prop] instanceof File)) {
            objectToFormData(obj[prop], formData, key);
        } else {
            formData.append(key, obj[prop]);
        }
    });

    return formData;
};

export default objectToFormData;
