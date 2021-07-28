import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { PREDICTION_FORM } from 'constants/prediction.constants';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/prediction';

import { getPredictionModalInitialValues } from 'state/selectors/predictions.selectors';
import {
    configurePrediction,
    configurePredictionFail,
    configurePredictionSuccess,
    addPrediction,
    addPredictionFail,
    addPredictionSuccess,
} from 'state/modules/predictions';

import { UPGRADE_MODAL_NAME } from 'constants/modal.constants';
import { LIMIT_REACHED } from 'constants/error.constants';

import AddEditPredictionModal from './PredictionModal';

const form = {
    form: PREDICTION_FORM,
    onSubmit: (values, dispatch, props) => {
        if (props.entityId) {
            return onSubmitActions(
                configurePrediction,
                configurePredictionSuccess,
                configurePredictionFail)(values, dispatch);
        }

        return onSubmitActions(addPrediction, addPredictionSuccess, addPredictionFail)(values, dispatch);
    },
    onSubmitSuccess: (result, dispatch, props) => props.onClose(),
    onSubmitFail: (errors, disaptch, submitError, { onOpen }) => {
        if (errors?._code && errors._code === LIMIT_REACHED) {
            onOpen(UPGRADE_MODAL_NAME, { entity: 'prediction' });
        }
    },
    validate,
};

const mapStateToProps = (state, props) => {
    const { defaultOptions, ...initialValues } = getPredictionModalInitialValues(state, props);

    return {
        defaultOptions,
        initialValues,
    };
};

export default connect(mapStateToProps)(reduxForm(form)(AddEditPredictionModal));
