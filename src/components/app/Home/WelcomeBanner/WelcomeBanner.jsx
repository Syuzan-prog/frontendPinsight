import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Paper, Typography } from '@material-ui/core';

import Button from 'components/common/Button';
import { routes } from 'configs/app.routes';

import FileSvg from 'resources/assets/svg/file.svg';
import WelcomeSvg from 'resources/assets/svg/welcome.svg';

import styles from './WelcomeBanner.scss';

const WelcomeBanner = ({ fullName }) => (
    <div className={styles.container}>
        <Paper className={styles.welcomeContainer}>
            <div className={styles.welcomeTextContainer}>
                <Typography variant="h4" className={styles.welcomeText}>
                    Welcome,&nbsp;
                    <span
                        className={clsx(styles.welcomeText, styles.welcomeTextBold)}
                    >
                        {fullName}
                        !
                    </span>
                </Typography>
                <Typography variant="subtitle2" className={styles.welcomeDesc}>
                    We are so excited to have you on board! Upload your data,
                    create a project and let Pinsight do the job for you!
                </Typography>
            </div>
            <img src={WelcomeSvg} alt="Welcome" />
        </Paper>
        <Paper className={styles.upgradeContainer}>
            <img src={FileSvg} alt="File" className={styles.fileSvg} />
            <span className={styles.upgradeText}>
                Upgrade to&nbsp;
                <span className={styles.upgradeTextBold}>PRO</span>
                &nbsp;for more resources.
            </span>
            <Link
                to={routes._app._settings.plansAndBilling}
            >
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    color="secondary"
                >
                    Upgrade
                </Button>
            </Link>
        </Paper>
    </div>
);

WelcomeBanner.propTypes = {
    fullName: PropTypes.string.isRequired,
};

export default WelcomeBanner;
