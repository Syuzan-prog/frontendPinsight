import { reduxForm } from 'redux-form';

import { createProject, createProjectSuccess, createProjectFail } from 'state/modules/projects';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import { PROJECT_FORM_NAME } from 'constants/project.constants';
import validate from 'core/validators/project';

import { UPGRADE_MODAL_NAME } from 'constants/modal.constants';
import { LIMIT_REACHED } from 'constants/error.constants';

import CreateProjectModal from './CreateProjectModal';

const form = {
    form: PROJECT_FORM_NAME,
    onSubmit: onSubmitActions(createProject, createProjectSuccess, createProjectFail),
    onSubmitSuccess: (result, dispatch, props) => props.onClose(),
    onSubmitFail: (errors, disaptch, submitError, { onOpen }) => {
        if (errors?._code && errors._code === LIMIT_REACHED) {
            onOpen(UPGRADE_MODAL_NAME, { entity: 'project' });
        }
    },
    validate,
};

export default reduxForm(form)(CreateProjectModal);
