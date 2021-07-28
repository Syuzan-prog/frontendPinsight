import React, { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import { format } from 'date-and-time';

import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
// import LinearProgress from '@material-ui/core/LinearProgress';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CircularProgress from '@material-ui/core/CircularProgress';

import history from 'configs/app.history';
import { routes } from 'configs/app.routes';
import Button from 'components/common/Button';
import { withModalControls } from 'components/app/Modals';
import {
    PROJECT_STATUS_TO_LABEL,
    PREDICTION_TYPE_TO_LABEL,
    PROJECT_STATUS_NOT_TRAINED,
    PROJECT_STATUS_IN_TRAINING,
    PROJECT_STATUS_READY,
    PROJECT_STATUS_FAILED,
} from 'constants/project.constants';
import {
    PREDICTION_STATUS_TO_LABEL,
    PREDICTION_STATUS_NOT_PREDICTED,
    PREDICTION_STATUS_IN_PREDICTING,
    PREDICTION_STATUS_READY,
    PREDICTION_STATUS_FAILED,
} from 'constants/prediction.constants';
import { CHECK_LATER_MODAL_NAME } from 'constants/modal.constants';

import { useStyles } from './EntityCard.styles';
import DotMenu from '../DotMenu';

const EntityCard = ({
    openModal, project, prediction, isProjectCard,
    onDelete, onUpdate, onTrain, onPredict, onDownload,
}) => {
    const classes = useStyles();

    const cardDetails = useMemo(() => (
        isProjectCard ? project : prediction
    ), [project, prediction, isProjectCard]);

    const cardDate = format(new Date(cardDetails.createdAt), 'DD MMM YYYY').toUpperCase();

    const isIdle = useMemo(() =>
        [PROJECT_STATUS_NOT_TRAINED, PREDICTION_STATUS_NOT_PREDICTED].includes(cardDetails.status),
    [cardDetails.status]);

    const isInProgress = useMemo(() =>
        [PROJECT_STATUS_IN_TRAINING, PREDICTION_STATUS_IN_PREDICTING].includes(cardDetails.status),
    [cardDetails.status]);

    const isReady = useMemo(() =>
        [PROJECT_STATUS_READY, PREDICTION_STATUS_READY].includes(cardDetails.status),
    [cardDetails.status]);

    const isFailed = useMemo(() =>
        [PROJECT_STATUS_FAILED, PREDICTION_STATUS_FAILED].includes(cardDetails.status),
    [cardDetails.status]);

    const onClickActionSuccess = useCallback(() => openModal(CHECK_LATER_MODAL_NAME), [openModal]);

    const handleClick = useCallback(() => {
        if (isProjectCard) {
            switch (cardDetails.status) {
                case PROJECT_STATUS_FAILED:
                case PROJECT_STATUS_NOT_TRAINED:
                    onTrain(cardDetails.id, onClickActionSuccess);
                    break;
                case PROJECT_STATUS_READY:
                    history.push(generatePath(routes._app._project.overview, { id: cardDetails.id }));
                    break;
                default:
            }

            return;
        }

        switch (cardDetails.status) {
            case PREDICTION_STATUS_FAILED:
            case PREDICTION_STATUS_NOT_PREDICTED:
                onPredict(cardDetails.id, onClickActionSuccess);
                break;
            case PREDICTION_STATUS_READY:
                onDownload(cardDetails.id);
                break;
            default:
        }
    }, [cardDetails.status, cardDetails.id, isProjectCard, onTrain, onPredict, onDownload, onClickActionSuccess]);

    const actionButtonColor = useMemo(() => {
        if (isReady) {
            if (isProjectCard) { return 'inherit'; }

            return 'secondary';
        }

        return 'primary';
    }, [isProjectCard, isReady]);

    return (
        <Card className={clsx(classes.root, {
                [classes.activeBorder]: isInProgress,
            })}
        >
            <CardHeader
                action={(
                    <DotMenu
                        isProjectCard={isProjectCard}
                        entityId={cardDetails.id}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                )}
                title={(
                    <div className={classes.titleContainer}>
                        <Typography variant="h6" className={classes.headerTitle}>{cardDetails.name}</Typography>
                        {!!cardDetails.isDemo && <span className="demoBlob">Demo</span>}
                    </div>
                  )}
                subheader={(
                    <Tooltip
                        title={cardDetails.description || ''}
                        placement="bottom"
                        classes={{
                            tooltip: classes.toolTip,
                        }}
                    >
                        <span>{cardDetails.description}</span>
                    </Tooltip>
                  )}
                classes={{
                    subheader: classes.headerSub,
                    root: classes.cardHeader,
                }}
            />
            <CardContent className={classes.cardContent}>
                <div className={clsx(classes.infoContainer, 'm-t-11')}>
                    <CalendarTodayIcon className={classes.calendarIcon} />
                    <Typography variant="overline" className={classes.date}>{cardDate}</Typography>
                </div>
                <div className={clsx(classes.infoContainer, 'm-t-21')}>
                    <span className={classes.dot} />
                    <span className={classes.infoContainerText}>
                        {PREDICTION_TYPE_TO_LABEL[cardDetails.type] || cardDetails.project?.name}
                    </span>
                </div>
                <div className={classes.infoContainer}>
                    <span className={classes.dot} />
                    <span className={classes.infoContainerText}>
                        {cardDetails.fileName || cardDetails.datasource?.name}
                    </span>
                </div>
                <div className={clsx(classes.infoContainer, 'm-t-24 m-b-16')}>
                    <span className={clsx(classes.infoContainerText, 'light-black')}>Status:</span>
                    <span
                        className={clsx(classes.infoContainerText, 'black m-l-6', {
                            [classes.activeTextColor]: isInProgress,
                            [classes.completeTextColor]: isReady,
                            [classes.failedTextColor]: isFailed,
                        })}
                    >
                        {isProjectCard
                        ? PROJECT_STATUS_TO_LABEL[cardDetails.status]
                        : PREDICTION_STATUS_TO_LABEL[cardDetails.status]}
                    </span>
                </div>
                {/* <LinearProgress
                    variant="determinate"
                    value={cardDetails.load}
                    classes={{
                        root: classes.progressBar,
                        barColorPrimary: cardDetails.load === 100 ? classes.completedColor : classes.loadColor,
                    }}
                    color="primary"
                />
                <div className={clsx(classes.infoContainer, 'm-t-2')}>
                    <span className={clsx(classes.infoContainerText, 'light-black')}>Load:</span>
                    <span className={clsx(classes.infoContainerText, 'black m-l-6')}>
                        {cardDetails.load}
                        %
                    </span>
                </div> */}
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    color={actionButtonColor}
                    disabled={!!cardDetails.isBusy}
                    className={clsx(classes.cardButton, {
                        [classes.startTrainingButton]: isIdle,
                        [classes.trainingButton]: isInProgress,
                        [classes.completedButton]: isReady,
                        [classes.downloadButton]: !isProjectCard && isReady,
                    })}
                    onClick={handleClick}
                >
                    {
                        isProjectCard
                            ? (
                                <>
                                    {
                                        isReady && <VisibilityIcon className={classes.viewIcon} />
                                    }
                                    {
                                        isInProgress
                                        && (
                                            <CircularProgress
                                                disableShrink
                                                classes={{ root: classes.cardLoader }}
                                                size={17}
                                            />
                                        )
                                    }
                                    {
                                        // eslint-disable-next-line no-nested-ternary
                                        isReady ? 'View' : isInProgress ? 'Training' : 'Train'
                                    }
                                </>
                            ) : (
                                <>
                                    {
                                        isReady && <ArrowDownwardIcon className={classes.arrowDown} />
                                    }
                                    {
                                        isInProgress
                                        && (
                                            <CircularProgress
                                                disableShrink
                                                classes={{ root: classes.cardLoader }}
                                                size={17}
                                            />
                                        )
                                    }
                                    {
                                        // eslint-disable-next-line no-nested-ternary
                                        isReady ? 'Download' : isInProgress ? 'Predicting' : 'Predict'
                                    }
                                </>
                            )
                    }
                </Button>
            </CardContent>
        </Card>
    );
};

EntityCard.propTypes = {
    openModal: PropTypes.func.isRequired,
    project: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        createdAt: PropTypes.string,
        type: PropTypes.string,
        fileName: PropTypes.string,
        status: PropTypes.string,
        load: PropTypes.number,
        isDemo: PropTypes.bool,
        datasource: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        }),
        id: PropTypes.string,
        isBusy: PropTypes.bool,
    }),
    prediction: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        datasource: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        }),
        project: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        }),
        status: PropTypes.string,
        load: PropTypes.number,
        id: PropTypes.string,
    }),
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func,
    onTrain: PropTypes.func,
    onPredict: PropTypes.func,
    onDownload: PropTypes.func,
    isProjectCard: PropTypes.bool.isRequired,
};

EntityCard.defaultProps = {
    project: null,
    prediction: null,
};

export default withModalControls(EntityCard);
