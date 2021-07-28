import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import AddIcon from '@material-ui/icons/Add';

import { DEFAULT_AVATAR_LIST } from 'constants/settings.constants';
import fileToBase64 from 'core/utils/fileToBase64';

import styles from './AvatarList.scss';

const AvatarList = ({ input: { value, onChange } }) => {
    const inputRef = useRef();
    const [avatarList, setAvatarList] = useState([]);

    const handleClick = useCallback((url) => onChange(url), [onChange]);

    const handleAddClick = useCallback(() => {
        inputRef?.current.click();
    }, [inputRef]);

    const handleInputChange = useCallback((event) => {
        (async function convertFile() {
            const dataUrl = await fileToBase64(event.target.files[0]);

            onChange(dataUrl);
            setAvatarList([{ src: dataUrl }, ...DEFAULT_AVATAR_LIST]);
        }());
    }, [onChange]);

    const hasCustomAvatar = useMemo(() => value && DEFAULT_AVATAR_LIST.every(({ src }) => src !== value), [value]);

    useEffect(() => {
        if (hasCustomAvatar) {
            setAvatarList([{ src: value }, ...DEFAULT_AVATAR_LIST]);
            return;
        }

        setAvatarList(DEFAULT_AVATAR_LIST);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ul className={styles.list}>
            <li>
                <input
                    ref={inputRef}
                    type="file"
                    style={{ display: 'none' }}
                    accept=".jpg,.jpeg,.png"
                    onChange={handleInputChange}
                />
                <div className={styles.addAvatar} onClick={handleAddClick}>
                    <AddIcon className={styles.addIcon} />
                </div>
            </li>
            {avatarList.map(({ src, id }) => (
                <li key={id || src} onClick={() => handleClick(src)}>
                    <img src={src} alt="avatar" className={clsx({ [styles.active]: value === src })} />
                </li>
            ))}
        </ul>
    );
};

AvatarList.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
    }),
};

export default AvatarList;
