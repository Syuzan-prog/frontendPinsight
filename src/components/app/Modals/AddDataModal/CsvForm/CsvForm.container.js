import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { CSV_FORM_NAME } from 'constants/addData.constants';
import { onSubmitActions } from 'state/modules/formSubmit.module';
import { createData, createDataSuccess, createDataFail } from 'state/modules/datasources';
import { validateCSV as validate } from 'core/validators/addData';
import { getUploadProgress } from 'state/selectors/datasources.selectors';

import { UPGRADE_MODAL_NAME, CHECK_LATER_MODAL_NAME } from 'constants/modal.constants';
import { LIMIT_REACHED } from 'constants/error.constants';

import CsvForm from './CsvForm';

const form = {
    form: CSV_FORM_NAME,
    onSubmit: onSubmitActions(createData, createDataSuccess, createDataFail),
    onSubmitSuccess: (result, dispatch, props) => props.onOpenModal(CHECK_LATER_MODAL_NAME),
    onSubmitFail: (errors, disaptch, submitError, { onOpenModal }) => {
        if (errors?._code && errors._code === LIMIT_REACHED) {
            onOpenModal(UPGRADE_MODAL_NAME, { entity: 'datasource' });
        }
    },
    validate,
};

const mapStateToProps = (state) => ({
    uploadProgress: getUploadProgress(state),
});

export default connect(mapStateToProps)(reduxForm(form)(CsvForm));
