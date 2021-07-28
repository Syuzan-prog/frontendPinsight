import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { UPGRADE_MODAL_NAME } from 'constants/modal.constants';
import { withModalControls } from 'components/app/Modals';

import styles from './Home.scss';
import WelcomeBanner from './WelcomeBanner';
import EntityContainer from './EntityContainer';
import DataTable from './DataTable';
import SpeedDial from './SpeedDial';

const Home = ({ openModal }) => {
    const needUpgrade = false; // TODO replace with selector

    useEffect(() => {
        if (needUpgrade) {
            openModal(UPGRADE_MODAL_NAME);
        }
    }, [needUpgrade, openModal]);

    return (
        <div className={styles.container}>
            <WelcomeBanner />
            <EntityContainer />
            <DataTable />
            <SpeedDial />
        </div>
    );
};

Home.propTypes = {
    openModal: PropTypes.func.isRequired,
};

export default withModalControls(Home);
