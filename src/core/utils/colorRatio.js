const MIN_COLOR = 'F1F1FB';
const MAX_COLOR = '2F2F9B';

export const getColorByRatio = (ratio) => {
    const hex = (color) => {
        const colorString = color.toString(16);
        return colorString.length === 1 ? `0${colorString}` : colorString;
    };

    const r = Math.ceil(
        parseInt(MAX_COLOR.substring(0, 2), 16) * ratio
        + parseInt(MIN_COLOR.substring(0, 2), 16) * (1 - ratio)
    );
    const g = Math.ceil(
        parseInt(MAX_COLOR.substring(2, 4), 16) * ratio
        + parseInt(MIN_COLOR.substring(2, 4), 16) * (1 - ratio)
    );
    const b = Math.ceil(
        parseInt(MAX_COLOR.substring(4, 6), 16) * ratio
        + parseInt(MIN_COLOR.substring(4, 6), 16) * (1 - ratio)
    );

    return `#${hex(r)}${hex(g)}${hex(b)}`;
};
