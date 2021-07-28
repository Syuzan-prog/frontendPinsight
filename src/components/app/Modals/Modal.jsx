import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import useUnmountTransition from 'core/hooks/useUnmountTransition';

import styles from './Modal.scss';

const Modal = ({ withBackground, children, onClose, showCloseButton, className, ...props }) => {
    // alligned with material-ui screen exit transition duration
    const [isShown, handleClose] = useUnmountTransition(onClose, 195);

    return (
        <Dialog
            classes={{
                paper: clsx(styles.modal, className, { [styles.background]: withBackground }),
            }}
            {...props}
            open={isShown}
            onClose={handleClose}
            onBackdropClick={handleClose}
            maxWidth="md"
            scroll="body"
        >
            {showCloseButton && <CloseIcon className={styles.closeButton} onClick={handleClose} />}
            {children}
        </Dialog>
    );
};

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    showCloseButton: PropTypes.bool,
    className: PropTypes.string,
    withBackground: PropTypes.bool,
};

Modal.defaultProps = {
    withBackground: false,
    showCloseButton: true,
    className: '',
};

export default Modal;
