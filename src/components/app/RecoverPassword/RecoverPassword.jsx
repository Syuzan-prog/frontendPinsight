import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';

import RecoverPasswordForm from 'components/common/RecoverPasswordForm';
import styles from './RecoverPassword.scss';

const RecoverPassword = ({ handleSubmit }) => (
    <Paper className={styles.block}>
        <RecoverPasswordForm handleSubmit={handleSubmit} />
    </Paper>
);

RecoverPassword.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default RecoverPassword;
