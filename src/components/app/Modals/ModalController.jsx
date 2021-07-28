import React, { useContext, useMemo } from 'react';

import { ModalContext } from './ModalContext';
import modalMap from './modalMap';

const ModalController = () => {
    const { modalName, data, setModal } = useContext(ModalContext);

    const Modal = useMemo(() => modalMap[modalName], [modalName]);

    if (!Modal) return null;

    return <Modal {...data} onClose={setModal} onOpen={setModal} />;
};

export default ModalController;
