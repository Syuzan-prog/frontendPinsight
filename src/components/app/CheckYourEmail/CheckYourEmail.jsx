import React from 'react';
import Paper from '@material-ui/core/Paper';

import CheckEmail from 'components/common/CheckEmail';
import styles from './CheckYourEmail.scss';

const CheckYourEmail = () => (
    <Paper className={styles.block}>
        <CheckEmail />
    </Paper>
);

export default CheckYourEmail;
