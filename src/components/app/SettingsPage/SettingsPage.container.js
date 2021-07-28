import { connect } from 'react-redux';

import {
    getFullName,
    getAvatarUrl,
    getEmail,
    getPosition,
} from 'state/selectors/account.selectors';

import SettingsPage from './SettingsPage';

const mapStateToProps = (state) => ({
    fullName: getFullName(state),
    avatarUrl: getAvatarUrl(state),
    email: getEmail(state),
    position: getPosition(state),
});

export default connect(mapStateToProps)(SettingsPage);
