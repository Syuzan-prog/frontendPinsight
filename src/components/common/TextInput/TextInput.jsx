import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import isInvalid from 'core/utils/isInvalid';

import styles from './TextInput.scss';

const TextInput = ({ id, type, input, meta, label, isRequired, helperText, className, fullWidth, ...props }) => {
    const error = useMemo(() => meta && isInvalid(meta) && meta.error, [meta]);

    return (
        <FormControl variant="outlined" className={clsx(className, { 'full-width': fullWidth })}>
            <TextField
                {...props}
                {...input}
                id={id || `field-${input?.name}`}
                error={!!error}
                helperText={error || helperText}
                type={type}
                variant="outlined"
                label={(
                    <span>
                        {isRequired ? <span className={styles.requiredColor}>* </span> : ''}
                        {label}
                    </span>
                )}
                FormHelperTextProps={{
                    variant: 'standard',
                }}
            />
        </FormControl>
    );
};

TextInput.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    input: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
    }),
    meta: PropTypes.shape({
        error: PropTypes.node,
        invalid: PropTypes.bool,
        submitFailed: PropTypes.bool,
        submitting: PropTypes.bool,
        touched: PropTypes.bool,
    }),
    helperText: PropTypes.node,
    className: PropTypes.string,
    fullWidth: PropTypes.bool,
    inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

TextInput.defaultProps = {
    type: 'text',
    isRequired: false,
    className: '',
    helperText: ' ',
    fullWidth: false,
};

export default TextInput;
