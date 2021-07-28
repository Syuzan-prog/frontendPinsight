import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Loader.scss';

const Loader = ({ size, classes, container: Container, ...rest }) => (
    <Container className={styles.container}>
        <CircularProgress
            {...rest}
            size={size}
            classes={classes}
        />
    </Container>
);

Loader.propTypes = {
    classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    size: PropTypes.number,
    container: PropTypes.elementType,
};

Loader.defaultProps = {
    container: 'div',
};

export default Loader;
