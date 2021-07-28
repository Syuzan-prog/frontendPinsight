import { connect } from 'react-redux';

import { deleteDatasource } from 'state/modules/datasources';

import DataTableCell from './DataTableCell';

const mapDispatchToProps = {
    deleteDatasource,
};

export default connect(null, mapDispatchToProps)(DataTableCell);
