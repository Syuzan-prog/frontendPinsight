import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ActiveLabel.scss';

const ActiveLabel = ({ className }) => (
    <>
        <div className={clsx(styles.triangle, className)} />
        <span className={styles.most}>
            Most
        </span>
        <span className={styles.popular}>
            popular
        </span>
    </>
);

ActiveLabel.propTypes = {
    className: PropTypes.string,
};

ActiveLabel.defaultProps = {
    className: '',
};

export default ActiveLabel;
