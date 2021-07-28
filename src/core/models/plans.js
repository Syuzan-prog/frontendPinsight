import DateDiff from 'date-diff';

export const processCurrentPlan = (data) => {
    const {
        stats: {
            projectsCount,
            datasourcesCount,
            predictionsCount,
        },
        subscription: {
            plan: {
                name,
                limitations: {
                    projectsCount: projectsLimit,
                    datasourcesCount: datasourcesLimit,
                    predictionsCount: predictionsLimit,
                },
            },
            startDate,
            endDate,
            type,
        },
    } = data;

    const today = new Date();

    let daysUsed = null;

    if (startDate) {
        daysUsed = Math.abs(new DateDiff(new Date(startDate), today).days());
    }

    let daysOverall = null;

    if (endDate) {
        daysOverall = Math.abs(new DateDiff(startDate, endDate).days());
    }

    return {
        name,
        projectsUsed: projectsCount,
        datasourcesUsed: datasourcesCount,
        predictionsUsed: predictionsCount,
        projectsLimit,
        datasourcesLimit,
        predictionsLimit,
        daysUsed: daysUsed && Math.floor(daysUsed),
        daysOverall: daysOverall && Math.round(daysOverall),
        type,
    };
};
