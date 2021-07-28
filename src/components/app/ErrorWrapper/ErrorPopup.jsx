import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorPopup({ message }) {
    return (
        <div>{message}</div>
    );
}

ErrorPopup.propTypes = {
    message: PropTypes.string.isRequired,
};
