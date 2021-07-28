import React from 'react';
import PropTypes from 'prop-types';

import AvatarBase from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const Avatar = ({ src, size, wrapperClassName }) => (
    <div className={wrapperClassName}>
        <AvatarBase
            src={src}
            className={size}
        >
            {!src && <PersonIcon fontSize={size} />}
        </AvatarBase>
    </div>
);

Avatar.propTypes = {
    src: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    wrapperClassName: PropTypes.string,
};

Avatar.defaultProps = {
    size: 'medium',
    wrapperClassName: '',
};

export default Avatar;
