import React from 'react';
import PropTypes from 'prop-types';

import CreatePasswordForm from 'components/common/CreatePasswordForm';
import styles from './CreatePassword.scss';
import Modal from '../Modal';

const CreatePassword = ({ onClose }) => (
    <Modal onClose={onClose} className={styles.modal}>
        <div className={styles.container}>
            <CreatePasswordForm />
        </div>
    </Modal>
);

CreatePassword.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default CreatePassword;
