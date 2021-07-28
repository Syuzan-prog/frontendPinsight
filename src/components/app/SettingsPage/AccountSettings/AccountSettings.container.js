import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { SETTINGS_UPDATE_FORM } from 'constants/settings.constants';
import { accountUpdate, accountUpdateSuccess, accountUpdateFail } from 'state/modules/account';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import validate from 'core/validators/account';

import { getAccountUpdateInitialState } from 'state/selectors/account.selectors';
import AccountSettings from './AccountSettings';

const form = {
    form: SETTINGS_UPDATE_FORM,
    onSubmit: onSubmitActions(accountUpdate, accountUpdateSuccess, accountUpdateFail),
    validate,
};

const mapStateToProps = (state) => ({
    initialValues: getAccountUpdateInitialState(state),
});

export default connect(mapStateToProps)(reduxForm(form)(AccountSettings));
