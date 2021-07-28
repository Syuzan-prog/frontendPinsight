import React from 'react';
import PropTypes from 'prop-types';

import RecoverPasswordForm from 'components/common/RecoverPasswordForm';
import Modal from '../Modal';
import styles from './RecoverPassword.scss';

const RecoverPassword = ({ onClose, handleSubmit }) => (
    <Modal onClose={onClose} className={styles.modal}>
        <div className={styles.container}>
            <RecoverPasswordForm handleSubmit={handleSubmit} isInAppForm />
        </div>
    </Modal>
);

RecoverPassword.propTypes = {
    onClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default RecoverPassword;
