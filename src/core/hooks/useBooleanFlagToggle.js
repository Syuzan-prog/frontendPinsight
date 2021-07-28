import { useState, useCallback } from 'react';

const useBooleanFlagToggle = (defaultState = false) => {
    const [flag, setFlag] = useState(defaultState);

    const onSetTrue = useCallback(() => {
        setFlag(true);
    }, []);

    const onSetFalse = useCallback(() => {
        setFlag(false);
    }, []);

    return [flag, onSetTrue, onSetFalse];
};

export default useBooleanFlagToggle;
