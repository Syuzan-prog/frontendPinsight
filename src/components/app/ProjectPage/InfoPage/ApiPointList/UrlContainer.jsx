import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import InsertLinkIcon from '@material-ui/icons/InsertLink';

import Button from 'components/common/Button';

import styles from './ApiPointList.scss';

const UrlContainer = ({ url }) => {
    const [copyValue, setCopyValue] = useState(url);
    const [isCopied, setIsCopied] = useState(false);

    const copyValueHandler = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(copyValue);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        } catch (e) {
            console.error(e, 'Permission denied to copy to clipboard');
        }
    }, [copyValue]);

    return (
        <div className={styles.endPointUrlContainer}>
            <div className={styles.iconContainer}>
                <InsertLinkIcon className={styles.insertIcon} />
            </div>
            <input
                className={styles.url}
                value={copyValue}
                onChange={() => setCopyValue(copyValue)}
            />
            <Button
                type="button"
                variant="contained"
                fullWidth
                color="primary"
                className={clsx(styles.copyButton, {
                    [styles.disabledButton]: isCopied,
                })}
                onClick={copyValueHandler}
                disabled
            >
                {isCopied ? 'COPIED' : 'COPY'}
            </Button>
        </div>
    );
};

UrlContainer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default UrlContainer;
