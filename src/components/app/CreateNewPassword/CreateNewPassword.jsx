import React from 'react';

import Paper from '@material-ui/core/Paper';

import CreatePasswordForm from 'components/common/CreatePasswordForm';
import styles from './CreateNewPassword.scss';

const CreateNewPassword = () => (
    <Paper className={styles.block}>
        <CreatePasswordForm />
    </Paper>
);

export default CreateNewPassword;
