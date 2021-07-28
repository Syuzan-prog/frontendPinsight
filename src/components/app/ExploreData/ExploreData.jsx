import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { generatePath } from 'react-router-dom';

import Select from 'components/common/Select';
import { LoaderContainer } from 'components/common/Loader';

import { fetchReadyDatasources, fetchDatasource } from 'core/dataFetchers/datasources';
import { routes } from 'configs/app.routes';
import { EXPLORE_DATA_DATASOURCE_FIELD_NAME } from 'constants/exploreData.constants';

import DataTable from './DataTable';

import { useStyles } from './ExploreData.styles';

const ExploreData = ({ match: { params }, history, change }) => {
    const classes = useStyles();
    const [defaultOptions, setDefaultOptions] = useState(null);

    useEffect(() => {
        change(EXPLORE_DATA_DATASOURCE_FIELD_NAME, params.id);

        (async function getDefaultOption() {
            const { id, name } = await fetchDatasource(params.id);

            setDefaultOptions([{ value: id, label: name }]);
        }());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = useCallback((event) => {
        history.push(generatePath(routes._app.data, { id: event.target.value }));
    }, [history]);

    return (
        <div className={classes.container}>
            <LoaderContainer isLoading={!defaultOptions}>
                <form className={classes.nameList}>
                    <Field
                        component={Select}
                        name={EXPLORE_DATA_DATASOURCE_FIELD_NAME}
                        getOptions={fetchReadyDatasources}
                        onChange={handleChange}
                        variant="standard"
                        defaultOptions={defaultOptions}
                        noOutlines
                        isHeader
                    />
                </form>
                <DataTable />
            </LoaderContainer>
        </div>
    );
};

ExploreData.propTypes = {
    change: PropTypes.func.isRequired,
    match: PropTypes.shape({
        isExact: PropTypes.bool.isRequired,
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
        path: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func,
    }).isRequired,
};

export default ExploreData;
