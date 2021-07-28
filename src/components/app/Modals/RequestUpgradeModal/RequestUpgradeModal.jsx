import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from 'components/common/Button';

import mailSvg from 'resources/assets/svg/mail.svg';
import Modal from '../Modal';

import styles from './RequestUpgradeModal.scss';

const RequestUpgradeModal = ({ onClose }) => (
    <Modal onClose={onClose} className={styles.modal}>
        <div align="center" className={styles.block}>
            <img src={mailSvg} alt="mail" />
            <Typography variant="h6" className={styles.title}>
                Thank you for yor request!
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Our specialist will contact you within 2 business days.
            </Typography>
            <Button
                className={styles.button}
                variant="contained"
                color="primary"
                onClick={onClose}
            >
                ok, thanks
            </Button>
        </div>
    </Modal>
);

RequestUpgradeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default RequestUpgradeModal;
