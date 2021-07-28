import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Tooltip from 'components/common/Tooltip';
import styles from '../CreateProjectModal.scss';

const Option = ({ name, label, description, isActive, isSelected, onClick }) => {
    const handleClick = useCallback(() => {
        if (!isActive) return;

        onClick(name);
    }, [isActive, name, onClick]);

    return (
        <Paper
            data-tip="Upgrade to unlock more Project Types!"
            data-for={name}
            className={clsx(styles.option, { disabled: !isActive, selected: isSelected })}
            onClick={handleClick}
        >
            <Typography variant="h5" className={styles.label}>
                {label}
            </Typography>
            <Typography variant="caption" className={styles.description}>
                {description}
            </Typography>
            <Tooltip name={name} isActive={isActive} />
        </Paper>
    );
};

Option.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};

export default Option;
