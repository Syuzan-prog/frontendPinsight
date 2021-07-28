import { useCallback } from 'react';
import { HORIZONTAL_PAGINATION_OFFSET } from 'constants/global.constants';

const useHorizontalPagination = (elementRef) => useCallback((direction) => {
    if (elementRef?.current) {
        const { current } = elementRef;

        if (direction === 'left') {
            current.scroll({
                left: current.scrollLeft - HORIZONTAL_PAGINATION_OFFSET,
                behavior: 'smooth',
            });
        } else {
            current.scroll({
                left: current.scrollLeft + HORIZONTAL_PAGINATION_OFFSET,
                behavior: 'smooth',
            });
        }
    }
}, [elementRef]);

export default useHorizontalPagination;
