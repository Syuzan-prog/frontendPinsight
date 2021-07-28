import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getSelectedProjectType } from 'state/selectors/projects.selectors';

import { PREDICTION_TYPE_YES_NO, PREDICTION_TYPE_NUMBER } from 'constants/project.constants';

import CategoricalEvaluate from './CategoricalEvaluate';
import NumericEvaluate from './NumericEvaluate';

const EvaluatePage = ({ match: { params: { id } } }) => {
    const projectType = useSelector((state) => getSelectedProjectType(state, id));

    switch (projectType) {
        case PREDICTION_TYPE_YES_NO:
            return <CategoricalEvaluate />;
        case PREDICTION_TYPE_NUMBER:
            return <NumericEvaluate />;
        default:
            return null;
    }
};

EvaluatePage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default EvaluatePage;
