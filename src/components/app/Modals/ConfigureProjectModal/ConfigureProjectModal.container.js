import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { PROJECT_FORM_NAME } from 'constants/project.constants';
import { configureProject, configureProjectSuccess, configureProjectFail } from 'state/modules/projects';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import { getConfigureFormInitialValues, getSelectedDatasourceId } from 'state/selectors/projects.selectors';
import validate from 'core/validators/project';

import ConfigureProjectModal from './ConfigureProjectModal';

const mapStateToProps = (state, props) => {
    const { defaultOptions, ...initialValues } = getConfigureFormInitialValues(state, props);

    return {
        defaultOptions,
        initialValues,
        datasourceId: getSelectedDatasourceId(state),
        projectType: initialValues.type,
    };
};

const form = {
    form: PROJECT_FORM_NAME,
    onSubmit: onSubmitActions(configureProject, configureProjectSuccess, configureProjectFail),
    onSubmitSuccess: (result, dispatch, props) => props.onClose(),
    validate,
};

export default connect(mapStateToProps)(reduxForm(form)(ConfigureProjectModal));
