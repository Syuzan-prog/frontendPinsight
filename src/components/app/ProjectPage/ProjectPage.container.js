import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { PROJECT_PAGE_FORM_NAME, PROJECT_PAGE_PROJECT_FIELD_NAME } from 'constants/projectPage.constants';
import { selectProject, setTargetVariable, setProjectType } from 'state/modules/projects';

import ProjectPage from './ProjectPage';

const form = {
    form: PROJECT_PAGE_FORM_NAME,
    onChange: (values, dispatch) => dispatch(selectProject(values[PROJECT_PAGE_PROJECT_FIELD_NAME])),
};

const mapDispatchToProps = {
    setTargetVariable,
    setProjectType,
};

export default connect(null, mapDispatchToProps)(reduxForm(form)(ProjectPage));
