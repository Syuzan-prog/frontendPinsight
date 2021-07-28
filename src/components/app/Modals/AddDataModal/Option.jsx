import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Tooltip from 'components/common/Tooltip';
import styles from './AddDataModal.scss';

const Option = ({ name, imgSrc, imgSrcDisabled, label, isActive, isSelected, onClick }) => {
    const handleClick = useCallback(() => {
        if (!isActive) return;

        onClick(name);
    }, [isActive, name, onClick]);
    return (
        <Paper
            data-tip="Upgrade to unlock more Data Sources!"
            data-for={name}
            className={clsx(styles.option, { disabled: !isActive, selected: isSelected })}
            onClick={handleClick}
        >
            <img src={isActive ? imgSrc : imgSrcDisabled} alt={label} />
            <Typography variant="subtitle2" className={styles.label}>
                {label}
            </Typography>
            <Tooltip name={name} isActive={isActive} />
        </Paper>
    );
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    imgSrcDisabled: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

Option.defaultProps = {
    isSelected: false,
};

export default Option;
