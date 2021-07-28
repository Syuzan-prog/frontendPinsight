import React, { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from 'components/common/Button';
import { LoaderContainer } from 'components/common/Loader';
import deleteSvg from 'resources/assets/svg/delete.svg';

import Modal from '../Modal';
import { fetchWording } from './DeleteEntityModal.utils';
import styles from './DeleteEntityModal.scss';

const DeleteEntityModal = ({ onClose, id, onDelete, entity }) => {
    const [deleteReferences, setDeleteReferences] = useState(false);
    const [wording, setWording] = useState({});

    useEffect(() => {
        (async function getWordingData() {
            const wordingData = await fetchWording(entity, id);

            setWording(wordingData);
        }());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCheckboxToggle = useCallback((event) =>
        setDeleteReferences(event.target.checked), [setDeleteReferences]);

    const handleDelete = useCallback(() => {
        onDelete(id, deleteReferences, onClose);
    }, [onDelete, id, deleteReferences, onClose]);

    return (
        <Modal onClose={onClose} className={clsx(styles.modal, { [styles.withCheckbox]: !!wording.checkboxLabel })}>
            <LoaderContainer isLoading={!Object.keys(wording).length}>
                <img src={deleteSvg} height="60px" alt="delete" />
                <Typography variant="h6" className={styles.title}>
                    {wording.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={styles.description}>
                    {wording.description}
                </Typography>
                {!!wording.checkboxLabel && (
                    <FormControlLabel
                        className={styles.checkboxGroup}
                        control={(
                            <Checkbox
                                className={styles.checkbox}
                                checked={deleteReferences}
                                onChange={handleCheckboxToggle}
                            />
                        )}
                        label={(
                            <Typography variant="body2" color="textSecondary">
                                {wording.checkboxLabel}
                            </Typography>
                        )}
                    />
                )}
                <div className={styles.actions}>
                    <Button variant="outlined" className={styles.cancelButton} onClick={onClose}>cancel</Button>
                    <Button className={styles.deleteButton} onClick={handleDelete}>delete</Button>
                </div>
            </LoaderContainer>
        </Modal>
    );
};

DeleteEntityModal.propTypes = {
    id: PropTypes.string.isRequired,
    entity: PropTypes.oneOf(['datasource', 'project', 'prediction']),
    onDelete: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DeleteEntityModal;
