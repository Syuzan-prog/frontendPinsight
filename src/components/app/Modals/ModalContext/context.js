import { createContext } from 'react';

const ModalContext = createContext({
    modalName: null,
    props: {},
});

ModalContext.displayName = 'ModalContext';

export default ModalContext;
