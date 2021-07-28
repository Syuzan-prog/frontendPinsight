import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import { REQUEST_UPGRADE_MODAL_NAME } from 'constants/modal.constants';
import { withModalControls } from 'components/app/Modals';
import Button from 'components/common/Button';

import ActiveLabel from '../ActiveLabel';
import styles from './PlansCard.scss';

const PlansCard = ({
    isActive, title, text, className, controlClassName,
    disabled, children, openModal, requestUpgrade, isRequesting,
}) => {
    const handleClick = useCallback(() => {
        requestUpgrade(() => openModal(REQUEST_UPGRADE_MODAL_NAME));
    }, [requestUpgrade, openModal]);

    return (
        <Card className={clsx(className, styles.card)}>
            {isActive && <ActiveLabel className={controlClassName} />}
            <CardHeader
                className={styles.cardHeader}
                title={<Typography variant="h6">{title}</Typography>}
                subheader={<Typography variant="body2">{text}</Typography>}
            />
            <Divider />
            <CardContent className={styles.cardContent}>{children}</CardContent>
            <CardActions className={styles.cardActions}>
                <Button
                    color="primary"
                    className={styles.button}
                    disabled={disabled || isRequesting}
                    onClick={handleClick}
                >
                    {isRequesting && (
                        <CircularProgress
                            disableShrink
                            classes={{ root: styles.cardLoader }}
                            size={17}
                        />
                    )}
                    {disabled ? 'CURRENT PLAN' : 'REQUEST UPGRADE'}
                </Button>
            </CardActions>
        </Card>
    );
};

PlansCard.propTypes = {
    isActive: PropTypes.bool,
    className: PropTypes.string,
    controlClassName: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
    openModal: PropTypes.func.isRequired,
    requestUpgrade: PropTypes.func.isRequired,
    isRequesting: PropTypes.bool.isRequired,
};

PlansCard.defaultProps = {
    isActive: false,
    className: '',
    controlClassName: '',
};

export default withModalControls(PlansCard);
