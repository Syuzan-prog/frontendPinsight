import { reduxForm } from 'redux-form';

import { EXPLORE_DATA_FORM_NAME, EXPLORE_DATA_DATASOURCE_FIELD_NAME } from 'constants/exploreData.constants';
import { selectDatasource } from 'state/modules/datasources';

import ExploreData from './ExploreData';

const form = {
    form: EXPLORE_DATA_FORM_NAME,
    onChange: (values, dispatch) => dispatch(selectDatasource(values[EXPLORE_DATA_DATASOURCE_FIELD_NAME])),
};

export default reduxForm(form)(ExploreData);
