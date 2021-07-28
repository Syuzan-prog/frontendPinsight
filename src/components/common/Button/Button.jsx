import React from 'react';
import PropTypes from 'prop-types';
import { Button as ButtonBase } from '@material-ui/core';

const Button = ({
    children,
    width,
    ...props
}) => (
    <ButtonBase
        {...props}
        style={{ width }}
    >
        {children}
    </ButtonBase>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
    className: PropTypes.string,
    variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.number,
};

Button.defaultProps = {
    color: 'default',
    type: 'button',
    className: '',
    variant: 'contained',
    fullWidth: false,
};

export default Button;
