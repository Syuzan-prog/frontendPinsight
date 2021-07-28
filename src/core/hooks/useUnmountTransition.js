import { useState, useCallback } from 'react';

const useUnmountTransition = (action, delay) => {
    const [isShown, setIsShown] = useState(true);

    const handleAction = useCallback(() => {
        setTimeout(() => {
            setIsShown(false);
            action();
        }, delay);
    }, [action, delay]);

    return [isShown, handleAction];
};

export default useUnmountTransition;
