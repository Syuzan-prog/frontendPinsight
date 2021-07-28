import React from 'react';
import PropTypes from 'prop-types';

import CheckEmail from 'components/common/CheckEmail/CheckEmail';
import Modal from '../Modal';
import styles from './CheckEmailModal.scss';

const CheckEmailModal = ({ onClose }) => (
    <Modal onClose={onClose} className={styles.modal}>
        <div className={styles.block}>
            <CheckEmail onClose={onClose} />
        </div>
    </Modal>
);

CheckEmailModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CheckEmailModal;
