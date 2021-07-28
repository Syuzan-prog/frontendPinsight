import { connect } from 'react-redux';

import { logout } from 'state/modules/auth.module';
import { getFullName, getAvatarUrl } from 'state/selectors/account.selectors';

import AccountMenu from './AccountMenu';

const mapStateToProps = (state) => ({
    fullName: getFullName(state),
    avatarUrl: getAvatarUrl(state),
});

const mapDispatchToProps = {
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountMenu);
