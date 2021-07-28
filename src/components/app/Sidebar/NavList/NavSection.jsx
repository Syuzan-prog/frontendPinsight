import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link, generatePath } from 'react-router-dom';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import Loader from 'components/common/Loader';

import useStyles from './NavList.styles';

const FETCH_MORE_LIMIT = 3;

const NavSection = ({
    label, SectionIcon, onClick, isActive, isOpen,
    data, hasMore, fetchMore, isLoading, linkPathBase,
    navigationPredicate,
}) => {
    const classes = useStyles();
    const handleFetchMoreClick = useCallback(() => {
        if (isLoading) return;

        fetchMore(FETCH_MORE_LIMIT);
    }, [isLoading, fetchMore]);

    const handleClick = useCallback((event, entity) => {
        if (!navigationPredicate(entity)) {
            event.preventDefault();
        }
    }, [navigationPredicate]);

    return (
        <>
            <ListItem
                className={classes.listItem}
                onClick={onClick}
            >
                <ListItemIcon>
                    <SectionIcon className={clsx(classes.iconColor, { [classes.activeIcon]: isActive })} />
                </ListItemIcon>
                <ListItemText
                    className={clsx(classes.listItemText, { [classes.activeText]: isActive })}
                    primaryTypographyProps={{ variant: 'subtitle2' }}
                >
                    {label}
                </ListItemText>
                {isOpen
                    ? <ExpandLess className={classes.iconColor} />
                    : <ExpandMore className={classes.iconColor} />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.nestedList}>
                    {data.map((entity) => (
                        <Link
                            key={`entity-${entity.id}`}
                            to={generatePath(linkPathBase, { id: entity.id })}
                            onClick={(event) => handleClick(event, entity)}
                        >
                            <ListItem
                                className={clsx(classes.nestedListItem, { inactive: !navigationPredicate(entity) })}
                            >
                                <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{entity.name}</ListItemText>
                            </ListItem>
                        </Link>
                    ))}
                    {hasMore && (
                        <ListItem
                            className={clsx(classes.loadMore, classes.nestedListItem, { loading: isLoading })}
                            onClick={handleFetchMoreClick}
                        >
                            {isLoading ? (
                                <Loader
                                    size={32}
                                    classes={{ root: classes.progress }}
                                />
                            ) : '. . .'}
                        </ListItem>
                    )}
                </List>
            </Collapse>
        </>
    );
};

NavSection.propTypes = {
    label: PropTypes.string.isRequired,
    SectionIcon: PropTypes.elementType.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    hasMore: PropTypes.bool.isRequired,
    fetchMore: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    linkPathBase: PropTypes.string,
    navigationPredicate: PropTypes.func.isRequired,
};

export default NavSection;
