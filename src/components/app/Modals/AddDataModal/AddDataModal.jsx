import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import Modal from '../Modal';
import Option from './Option';
import OptionCarousel from './OptionCarousel';
import options from './options';

import styles from './AddDataModal.scss';

const AddDataModal = ({ onClose, onOpen }) => {
    const [dataSource, setDataSource] = useState(null);

    return (
        <Modal onClose={onClose} className={styles.modal}>
            <div className={styles.header}>
                <Typography variant="h5" color="textPrimary">What is your data source?</Typography>
                <Typography variant="body2" color="textSecondary" classes={{ root: styles.description }}>
                    The data will be used to build a model, make analysis and predictions.
                    Please, choose your data source.
                </Typography>
            </div>
            {dataSource ? (
                <div className={styles.dataFormContainer}>
                    <OptionCarousel
                        selectedDataSource={dataSource}
                        setDataSource={setDataSource}
                        onCloseModal={onClose}
                        onOpenModal={onOpen}
                    />
                </div>
            ) : (
                <div className={styles.optionGrid}>
                    {options.map((option) => <Option key={`option-${option.name}`} {...option} onClick={setDataSource} />)}
                </div>
            )}
        </Modal>
    );
};

AddDataModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default AddDataModal;
