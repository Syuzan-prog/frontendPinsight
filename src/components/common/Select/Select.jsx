import React, { useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import SelectBase from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';

import isInvalid from 'core/utils/isInvalid';

import styles from './Select.scss';

const FETCH_OPTIONS_LIMIT_DEFAULT = 20;

const Select = ({
    input, meta, defaultOptions, getOptions, className, label, helperText,
    isRequired, isPaginated, noOutlines, isHeader, variant, ...props
}) => {
    const [options, setOptions] = useState(defaultOptions);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreOptions, setHasMoreOptions] = useState(false);

    const fetchOptions = useCallback(async (isInitial) => {
        const { hasMore, data } = await getOptions(FETCH_OPTIONS_LIMIT_DEFAULT, isInitial ? 0 : options.length);

        setHasMoreOptions(hasMore);

        return data;
    }, [getOptions, options, setHasMoreOptions]);

    const handleListScroll = useCallback(async (event) => {
        if (isLoading || !hasMoreOptions) return;

        const { scrollTop, scrollHeight, clientHeight } = event.target;

        if (scrollHeight - scrollTop - clientHeight < 50) {
            setIsLoading(true);
            const newOptions = await fetchOptions();
            setOptions((oldOptions) => [...oldOptions, ...newOptions]);
            setIsLoading(false);
        }
    }, [isLoading, fetchOptions, hasMoreOptions]);

    useEffect(() => {
        if (getOptions) {
            (async function initialFetch() {
                const responseOptions = await fetchOptions(true);

                setOptions(responseOptions);
            }());
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const error = useMemo(() => isInvalid(meta) && meta.error, [meta]);
    const hasError = useMemo(() => !!error, [error]);
    const labelId = useMemo(() => `select-${input.name}`, [input.name]);
    const labelElement = useMemo(() => (
        <>
            {isRequired ? <span className={styles.requiredColor}>* </span> : ''}
            {label}
        </>
    ), [isRequired, label]);

    const headerClasses = useMemo(() => (isHeader ? {
        select: styles.headerSelect,
        icon: styles.headerIcon,
    } : {}), [isHeader]);

    return (
        <FormControl variant={variant} className={className}>
            <InputLabel id={labelId} error={hasError}>{labelElement}</InputLabel>
            <SelectBase
                {...input}
                {...props}
                classes={{
                    selectMenu: clsx({ [styles.staticBackground]: noOutlines }),
                    ...headerClasses,
                }}
                labelId={labelId}
                label={labelElement}
                error={hasError}
                MenuProps={{
                    MenuListProps: {
                        onScroll: isPaginated ? handleListScroll : undefined,
                        style: { maxHeight: 320, overflowY: 'scroll' },
                    },
                }}
                disableUnderline={noOutlines}
            >
                {!options.length && <div className={styles.noOptions}>No options</div>}
                {options.map(({ label: optionLabel, value }) => (
                    <MenuItem key={`${label}_${value}`} value={value}>{optionLabel}</MenuItem>
                ))}
            </SelectBase>
            <FormHelperText variant="standard" error={hasError}>{error || helperText}</FormHelperText>
        </FormControl>
    );
};

Select.propTypes = {
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
    label: PropTypes.string,
    helperText: PropTypes.node,
    className: PropTypes.string,
    defaultOptions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
    })),
    getOptions: PropTypes.func,
    isPaginated: PropTypes.bool,
    noOutlines: PropTypes.bool,
    isHeader: PropTypes.bool,
    variant: PropTypes.string,
};

Select.defaultProps = {
    defaultOptions: [],
    isRequired: false,
    className: '',
    isPaginated: false,
    noOutlines: false,
    isHeader: false,
    variant: 'outlined',
};

export default Select;
