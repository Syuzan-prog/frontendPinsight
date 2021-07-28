import React from 'react';
import clsx from 'clsx';
import { Sector } from 'recharts';

import Typography from '@material-ui/core/Typography';

import {
    MODEL_HEALTH_BAD,
    MODEL_HEALTH_GOOD,
    MODEL_HEALTH_GREAT,
    ACCURACY_WORDING,
    FAIRNESS_WORDING,
    MODEL_SEGMENT_LABELS,
} from 'constants/project.constants';

const getModelHealth = (percentile) => {
    if (percentile > 66) return MODEL_HEALTH_GREAT;

    if (percentile > 33) return MODEL_HEALTH_GOOD;

    return MODEL_HEALTH_BAD;
};

export const getModelHealthNode = (percentile) => {
    const health = getModelHealth(percentile);

    return (
        <Typography variant="caption" className={clsx(health, 'capitalize')}>{health}</Typography>
    );
};

export const getModelHealthDescription = (entity, percentile) => {
    const health = getModelHealth(percentile);
    const dictionary = entity === 'accuracy' ? ACCURACY_WORDING : FAIRNESS_WORDING;

    return (
        <>
            <Typography variant="caption" color="textSecondary">{dictionary[health].main}</Typography>
            <Typography variant="caption" color="textSecondary">{dictionary[health].secondary}</Typography>
        </>
    );
};

const getArrowheadPoints = (cx, cy, mx, my) => {
    const dx = mx - cx;
    const dy = my - cy;
    const magnitude = Math.sqrt(dx * dx + dy * dy);
    const unitDx = dx / magnitude;
    const unitDy = dy / magnitude;

    const arrowHeadSize = 6;

    return `
        ${mx},${my} 
        ${mx - unitDx * arrowHeadSize - unitDy * arrowHeadSize},${my - unitDy * arrowHeadSize + unitDx * arrowHeadSize} 
        ${mx - unitDx * arrowHeadSize + unitDy * arrowHeadSize},${my - unitDy * arrowHeadSize - unitDx * arrowHeadSize} 
    `;
};

export const renderActiveShape = (props, percentile) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    const angle = 180 - (percentile * 180) / 100;
    const sin = Math.sin(-RADIAN * angle);
    const cos = Math.cos(-RADIAN * angle);
    const mx = cx + innerRadius * cos;
    const my = cy + innerRadius * sin;
    const points = getArrowheadPoints(cx, cy, mx, my);

    return (
        <g>
            <text x={cx} y={cy + 18} dy={8} textAnchor="middle" fill="rgba(0, 0, 0, 0.87)">
                {percentile}
                %
            </text>
            <text
                x={cx - innerRadius - (outerRadius - innerRadius) / 2}
                y={cy + 2}
                dy={10}
                textAnchor="middle"
                fill="rgba(0, 0, 0, 0.54)"
                fontSize="8"
            >
                POOR
            </text>
            <text
                x={cx + innerRadius + (outerRadius - innerRadius) / 2}
                y={cy + 2}
                dy={10}
                textAnchor="middle"
                fill="rgba(0, 0, 0, 0.54)"
                fontSize="8"
            >
                GREAT
            </text>
            <text
                x={cx + (outerRadius + 6) * Math.cos(-RADIAN * startAngle)}
                y={cy + (outerRadius + 6) * Math.sin(-RADIAN * startAngle)}
                textAnchor="middle"
                fill="rgba(0, 0, 0, 0.54)"
                fontSize="8"
            >
                {MODEL_SEGMENT_LABELS[0]}
                %
            </text>
            <text
                x={cx + (outerRadius + 6) * Math.cos(-RADIAN * endAngle)}
                y={cy + (outerRadius + 6) * Math.sin(-RADIAN * endAngle)}
                textAnchor="middle"
                fill="rgba(0, 0, 0, 0.54)"
                fontSize="8"
            >
                {MODEL_SEGMENT_LABELS[1]}
                %
            </text>
            <path
                d={`M${cx - outerRadius},${cy + 1}L${cx - (innerRadius - 2)},${cy + 1}`}
                strokeWidth="2"
                stroke="#000"
                fill="none"
                strokeLinecap="unset"
            />
            <path
                d={`M${cx + outerRadius},${cy + 1}L${cx + (innerRadius - 2)},${cy + 1}`}
                strokeWidth="2"
                stroke="#000"
                fill="none"
                strokeLinecap="unset"
            />
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                stroke="none"
            />
            <path
                d={`
                    M${cx + outerRadius * Math.cos(-RADIAN * startAngle)},${cy + outerRadius * Math.sin(-RADIAN * startAngle)}
                    L${cx + (innerRadius - 2) * Math.cos(-RADIAN * startAngle)},${cy + (innerRadius - 2) * Math.sin(-RADIAN * startAngle)}
                `}
                strokeWidth="1"
                stroke="#000"
                fill="none"
                strokeLinecap="unset"
            />
            <path
                d={`
                    M${cx + outerRadius * Math.cos(-RADIAN * endAngle)},${cy + outerRadius * Math.sin(-RADIAN * endAngle)}
                    L${cx + (innerRadius - 2) * Math.cos(-RADIAN * endAngle)},${cy + (innerRadius - 2) * Math.sin(-RADIAN * endAngle)}
                `}
                strokeWidth="1"
                stroke="#000"
                fill="none"
                strokeLinecap="unset"
            />
            <g>
                <circle cx={cx} cy={cy} r={5} fill="#000" stroke="none" />
                <path d={`M${cx},${cy}L${mx},${my}`} strokeWidth="2" stroke="#000" fill="none" strokeLinecap="unset" />
                <polygon points={points} strokeWidth="2" />
            </g>
        </g>
    );
};
