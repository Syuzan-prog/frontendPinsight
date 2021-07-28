import { createSelector } from 'reselect';

const getPlansState = (state) => state.plans;
const getPlanFromProps = (state, props) => props.title;

const getPlanRequesting = createSelector(
    getPlansState,
    (plans) => plans.requesting
);

export const getCurrentPlanMeta = createSelector(
    getPlansState,
    (plans) => plans.meta
);

export const getPlanIsActive = createSelector(
    getPlanFromProps,
    getCurrentPlanMeta,
    (plan, meta) => plan === meta?.title
);

export const getPlanIsRequesting = createSelector(
    getPlanFromProps,
    getPlanRequesting,
    (plan, pendingPlan) => plan === pendingPlan
);
