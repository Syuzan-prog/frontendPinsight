import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import useHorizontalPagination from 'core/hooks/useHorizontalPagination';
import {
    SUGGESTIONS_QUESTION_OPTION_INCREASE,
    SUGGESTIONS_QUESTION_OPTION_DECREASE,
    PROJECT_TYPES,
    PREDICTION_TYPE_YES_NO,
} from 'constants/project.constants';

import { useStyles } from './Suggestions.styles';

const Suggestions = ({ suggestions, targetVariable, projectType }) => {
    const classes = useStyles();
    const [isQuestionPopupOpen, setQuestionPopupVisibility] = useState(false);
    const [questionOption, setQuestionOption] = useState(SUGGESTIONS_QUESTION_OPTION_INCREASE);
    const listRef = useRef(null);
    const handlePaginationChange = useHorizontalPagination(listRef);

    const handleSelectQuestionOption = useCallback((event, option) => {
        event.stopPropagation();
        setQuestionOption(option);
        setQuestionPopupVisibility(false);
    }, []);

    const toggleQuestionOption = useCallback(() => {
        setQuestionPopupVisibility((visibility) => !visibility);
    }, []);

    return (
        <Paper className={classes.container}>
            <div className={classes.barContainer}>
                <div>
                    <Typography variant="caption" className={classes.greyText}>
                        HOW CAN I
                    </Typography>
                    <div
                        className={classes.questionList}
                        onClick={toggleQuestionOption}
                    >
                        <span className={classes.questionOption}>
                            {questionOption.toUpperCase()}
                        </span>
                        {
                            isQuestionPopupOpen
                            ? (
                                <ArrowDropUpIcon
                                    className={classes.dropIcon}
                                />
                            )
                            : (
                                <ArrowDropDownIcon
                                    className={classes.dropIcon}
                                />
                            )
                        }
                        {
                            isQuestionPopupOpen && (
                                <ClickAwayListener onClickAway={() => setQuestionPopupVisibility(false)}>
                                    <List component="div" className={classes.list}>
                                        <ListItem
                                            button
                                            onClick={(e) =>
                                                handleSelectQuestionOption(e, SUGGESTIONS_QUESTION_OPTION_INCREASE)}
                                        >
                                            <Typography variant="body2">{SUGGESTIONS_QUESTION_OPTION_INCREASE.toUpperCase()}</Typography>
                                        </ListItem>
                                        <ListItem
                                            button
                                            onClick={(e) =>
                                                handleSelectQuestionOption(e, SUGGESTIONS_QUESTION_OPTION_DECREASE)}
                                        >
                                            <Typography variant="body2">{SUGGESTIONS_QUESTION_OPTION_DECREASE.toUpperCase()}</Typography>
                                        </ListItem>
                                    </List>
                                </ClickAwayListener>
                            )
                        }
                    </div>
                    <Typography variant="caption" className={classes.greyText}>
                        {projectType === PREDICTION_TYPE_YES_NO ? 'PROBABILITY OF ' : ''}
                        {targetVariable.toUpperCase()}
                        {' '}
                        IN THIS SEGMENT?
                    </Typography>
                </div>
                <div>
                    <KeyboardArrowLeftIcon
                        onClick={() => handlePaginationChange('left')}
                        className={clsx(classes.icon, classes.leftIcon)}
                    />
                    <KeyboardArrowRightIcon
                        className={clsx(classes.icon)}
                        onClick={() => handlePaginationChange('right')}
                    />
                </div>
            </div>
            <div
                className={classes.listContainer}
                ref={listRef}
            >
                {
                    suggestions[questionOption]?.map((suggestion) => (
                        <Card
                            key={suggestions.id}
                            className={classes.root}
                        >
                            <CardHeader
                                title={(
                                    <div className={classes.titleContainer}>
                                        <Typography variant="h4">
                                            {suggestion.diff > 0 ? '+' : ''}
                                            {suggestion.diff}
                                            %
                                        </Typography>
                                    </div>
                                )}
                                classes={{
                                    root: classes.cardHeader,
                                }}
                            />
                            <Divider />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="caption" className={classes.greyText}>
                                    CHANGE
                                </Typography>
                                {suggestion.rules.map((rule) => (
                                    <div key={`${suggestions.id}_${rule}`}>
                                        <Typography variant="caption" className={classes.greyText}>
                                            {rule}
                                        </Typography>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))
                }
                {!suggestions[questionOption]?.length && (
                    <div className={classes.noResults}>
                        <Typography variant="caption" color="textSecondary">There are no suggestions for this segment.</Typography>
                    </div>
                )}
            </div>
        </Paper>
    );
};

Suggestions.propTypes = {
    suggestions: PropTypes.shape({
        increase: PropTypes.arrayOf(PropTypes.shape({
            diff: PropTypes.string,
            rules: PropTypes.arrayOf(PropTypes.string),
        })),
        decrease: PropTypes.arrayOf(PropTypes.shape({
            diff: PropTypes.string,
            rules: PropTypes.arrayOf(PropTypes.string),
        })),
        id: PropTypes.string,
    }),
    targetVariable: PropTypes.string,
    projectType: PropTypes.oneOf(PROJECT_TYPES),
};

export default Suggestions;
