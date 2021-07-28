import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import styles from './Tooltip.scss';

const Tooltip = ({ name, isActive, backgroundColor }) => (
    <ReactTooltip
        id={name}
        place="bottom"
        disable={isActive}
        arrowColor="inherit"
        className={styles.tooltip}
        backgroundColor={backgroundColor}
        offset={{ left: -135 }}
    />
);

Tooltip.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    backgroundColor: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
    backgroundColor: '#4CAF50',
};

export default Tooltip;
