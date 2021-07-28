import { connect } from 'react-redux';

import { getDatasources, getIsDatasourcesLoading, getHasMoreDatasources } from 'state/selectors/datasources.selectors';
import { fetchDatasources } from 'state/modules/datasources';

import DataTable from './DataTable';

const mapStateToProps = (state) => ({
    datasources: getDatasources(state),
    hasMore: getHasMoreDatasources(state),
    isLoading: getIsDatasourcesLoading(state),
});

const mapDispatchToProps = {
    fetchDatasources,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
