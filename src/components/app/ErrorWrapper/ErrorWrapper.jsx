import React from 'react';
import PropTypes from 'prop-types';
import ErrorPopup from './ErrorPopup';

export default function ErrorWrapper({ children, error }) {

    return (
        <div>
            {error && <ErrorPopup message={error.message} />}
            {children}
        </div>
    );
}

ErrorWrapper.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }),
    children: PropTypes.element.isRequired,
};

ErrorWrapper.defaultProps = {
    error: null,
};
