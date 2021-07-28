import React from 'react';
import PropTypes from 'prop-types';

import CheckboxBase from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Checkbox = ({ input, label, className, controlClassName }) => (
    <FormControlLabel
        className={controlClassName}
        control={(
            <CheckboxBase
                className={className}
                checked={!!input.value}
                onChange={input.onChange}
            />
        )}
        label={label}
    />
);

Checkbox.propTypes = {
    label: PropTypes.node.isRequired,
    input: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
    }),
    className: PropTypes.string,
    controlClassName: PropTypes.string,
};

Checkbox.defaultProps = {
    className: '',
    controlClassName: '',
};

export default Checkbox;
