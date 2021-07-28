import { reduxForm } from 'redux-form';

import { RECOVER_PASSWORD_FORM } from 'constants/settings.constants';
import { CHECK_EMAIL_MODAL_NAME } from 'constants/modal.constants';
import { sendResetLink, sendResetLinkSuccess, sendResetLinkFail } from 'state/modules/recoverPassword.module';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/recoverPassword';

import { withModalControls } from '../ModalContext';
import RecoverPassword from './RecoverPassword';

const form = {
    form: RECOVER_PASSWORD_FORM,
    onSubmit: onSubmitActions(sendResetLink, sendResetLinkSuccess, sendResetLinkFail),
    onSubmitSuccess: (result, dispatch, props) => props.openModal && props.openModal(CHECK_EMAIL_MODAL_NAME),
    validate,
};

export default withModalControls(reduxForm(form)(RecoverPassword));
