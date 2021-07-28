import React from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Button from 'components/common/Button';

import { routes } from 'configs/app.routes';
import envelopeSvg from 'resources/assets/svg/envelope.svg';

import styles from './SignUpSuccess.scss';

const SignUpSuccess = () => (
    <Paper className={styles.block}>
        <img src={envelopeSvg} alt="envelope" />
        <Typography variant="h6" className="m-t-12">
            Check your email!
        </Typography>
        <Typography variant="body2" color="textSecondary" className="m-t-12">
            Please verify your email to get started with Pinsight!
        </Typography>
        <Link to={routes.login} className={styles.link}>
            <Button className={styles.button} variant="contained" color="primary">ok, thanks</Button>
        </Link>
    </Paper>
);

export default SignUpSuccess;
