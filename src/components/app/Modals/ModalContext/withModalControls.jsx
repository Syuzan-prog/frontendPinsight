import React from 'react';

import ModalContext from './context';

const withModalControls = (Component) => (props) => (
    <ModalContext.Consumer>
        {({ setModal }) => <Component {...props} openModal={setModal} />}
    </ModalContext.Consumer>
);

export default withModalControls;
