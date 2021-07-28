import React, { useCallback, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';

import Loader from 'components/common/Loader';

import mergeRefs from 'core/utils/mergeRefs';

const SCROLL_OFFSET = 50;

const ScrollActionContainer = forwardRef(({
    children, className, onScrollEnd, isLoading, scrollElement,
    listenGlobalScroll, isHorizontal, hasMore, hideLoader, ...props
}, forwardedRef) => {
    const containerRef = useRef(null);

    const handleFetchMore = debounce(300, true, onScrollEnd);

    const getShouldLoad = useCallback((element) => {
        if (isHorizontal) {
            return element.scrollWidth - element.scrollLeft - element.clientWidth < SCROLL_OFFSET;
        }

        return element.scrollHeight - element.scrollTop - element.clientHeight < SCROLL_OFFSET;
    }, [isHorizontal]);

    const handleScroll = useCallback(() => {
        if (isLoading || !hasMore) return;

        const element = scrollElement || containerRef.current;

        if (getShouldLoad(element)) {
            handleFetchMore();
        }
    }, [isLoading, handleFetchMore, hasMore, scrollElement, getShouldLoad]);

    useEffect(() => {
        const nodeRef = listenGlobalScroll ? window : scrollElement || containerRef.current;
        if (nodeRef) {
            nodeRef.addEventListener('scroll', handleScroll);
        }

        return () => nodeRef.removeEventListener('scroll', handleScroll);
    }, [containerRef, handleScroll, listenGlobalScroll, scrollElement]);

    return (
        <div {...props} className={className} ref={mergeRefs(containerRef, forwardedRef)}>
            {children}
            {(isLoading && !hideLoader) && <Loader />}
        </div>
    );
});

ScrollActionContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onScrollEnd: PropTypes.func.isRequired,
    scrollElement: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    listenGlobalScroll: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    hasMore: PropTypes.bool.isRequired,
    hideLoader: PropTypes.bool,
};

ScrollActionContainer.defaultProps = {
    className: '',
    scrollElement: null,
    listenGlobalScroll: false,
    isHorizontal: false,
    hideLoader: false,
};

export default ScrollActionContainer;
