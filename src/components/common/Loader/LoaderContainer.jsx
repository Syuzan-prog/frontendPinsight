import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';

const LoaderContainer = ({ isLoading, render, children, Component, ...rest }) => {
    if (isLoading) {
        return <Component {...rest} />;
    }

    return render ? render() : children;
};

LoaderContainer.propTypes = {
    render: PropTypes.func,
    children: PropTypes.node,
    Component: PropTypes.elementType,
    isLoading: PropTypes.bool.isRequired,
};

LoaderContainer.defaultProps = {
    render: null,
    Component: Loader,
};

export default LoaderContainer;
