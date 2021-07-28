import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import ModalContext from './context';

const ModalProvider = ({ children }) => {
    const defaultContextValues = useContext(ModalContext);
    const [contextValues, setContextValues] = useState(defaultContextValues);

    const setModal = (modalName = null, data = {}) => {
        setContextValues({ modalName, data });
    };

    return (
        <ModalContext.Provider value={{ ...contextValues, setModal }}>
            {children}
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ModalProvider;
