import { connect } from 'react-redux';

import {
    getSelectedDatasourceSchema,
    getIsSelectedDatasourceLoading,
    getIsSelectedDatasourceLoaded,
    getSelectedDatasourceSchemaHasMore,
} from 'state/selectors/datasources.selectors';
import { fetchDatasourceSchema } from 'state/modules/datasources';

import DataTable from './DataTable';

const mapStateToProps = (state) => ({
    datasourceSchema: getSelectedDatasourceSchema(state),
    isLoading: getIsSelectedDatasourceLoading(state),
    isLoaded: getIsSelectedDatasourceLoaded(state),
    hasMore: getSelectedDatasourceSchemaHasMore(state),
});

const mapDispatchToProps = {
    fetchDatasourceSchema,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
