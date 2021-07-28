import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from 'components/common/Button';

import { routes } from 'configs/app.routes';
import { getIsLoggedIn } from 'state/selectors/account.selectors';

import envelopeSvg from 'resources/assets/svg/envelope.svg';
import styles from './CheckEmail.scss';

const CheckEmail = ({ onClose }) => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    return (
        <div>
            <img src={envelopeSvg} alt="envelope" />
            <Typography variant="h6" className={styles.title}>
                Check your email!
            </Typography>
            <Typography variant="body2" color="textSecondary">
                We have sent you an email with a link to reset your password.
            </Typography>
            {
                isLoggedIn
                ? (
                    <Button
                        className={styles.button}
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                    >
                        ok, thanks
                    </Button>
                )
                : (
                    <Link to={routes.login} className={styles.link}>
                        <Button
                            className={styles.button}
                            variant="contained"
                            color="primary"
                        >
                            ok, thanks
                        </Button>
                    </Link>
                )
            }

        </div>
    );
};

CheckEmail.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CheckEmail;
