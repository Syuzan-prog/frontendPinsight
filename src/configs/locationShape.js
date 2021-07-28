import PropTypes from 'prop-types';

const locationShape = PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    hash: PropTypes.string,
    state: PropTypes.object, // eslint-disable-line react/forbid-prop-types
});

export default locationShape;
