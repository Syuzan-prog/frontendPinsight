import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import Button from 'components/common/Button';
import UpgradeSvg from 'resources/assets/svg/upgrade.svg';
import Modal from 'components/app/Modals/Modal';
import { routes } from 'configs/app.routes';

import useStyles from './UpgradeModal.styles';

const UpgradeModal = ({ onClose, entity }) => {
    const classes = useStyles();
    const history = useHistory();

    const handleViewClick = useCallback(() => {
        history.push(routes._app._settings.plansAndBilling);
        onClose();
    }, [onClose, history]);

    return (
        <Modal onClose={onClose}>
            <div className={classes.container}>
                <img src={UpgradeSvg} alt="Upgrade" />
                <Typography variant="h6" className={classes.headerText}>Time to upgrade!</Typography>
                <Typography variant="body2" className={classes.descText}>
                    You have reached the
                    {' '}
                    {entity}
                    {' '}
                    limit allowed with your current plan.
                    Upgrade your plan to create more
                    {' '}
                    {entity}
                    s.
                </Typography>
                <div className={classes.buttonContainer}>
                    <Button
                        type="button"
                        className={classes.button}
                        color="primary"
                        variant="outlined"
                        onClick={onClose}
                        fullWidth
                    >
                        NO, THANKS
                    </Button>
                    <Button
                        type="button"
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        onClick={handleViewClick}
                        fullWidth
                    >
                        VIEW OPTIONS
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

UpgradeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    entity: PropTypes.oneOf(['datasource', 'project', 'prediction']),
};

export default UpgradeModal;
