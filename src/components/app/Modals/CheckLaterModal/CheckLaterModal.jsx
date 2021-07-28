import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import Button from 'components/common/Button';
import Modal from 'components/app/Modals/Modal';

import mailSvg from 'resources/assets/svg/mail.svg';

import styles from './CheckLaterModal.scss';

const UpgradeModal = ({ onClose }) => (
    <Modal onClose={onClose}>
        <div className={styles.container}>
            <img src={mailSvg} alt="info" />
            <Typography variant="h6" className={styles.headerText}>The process may take some time.</Typography>
            <Typography variant="body2" className={styles.descText} color="textSecondary">
                To view the results, please refresh the page when you receive a confirmation email.
            </Typography>
            <div className={styles.buttonContainer}>
                <Button
                    type="button"
                    className={styles.button}
                    color="primary"
                    variant="contained"
                    onClick={onClose}
                    fullWidth
                >
                    Ok, Thanks
                </Button>
            </div>
        </div>
    </Modal>
);

UpgradeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default UpgradeModal;
