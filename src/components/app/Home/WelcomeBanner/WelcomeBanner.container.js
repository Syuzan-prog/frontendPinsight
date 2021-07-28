import { connect } from 'react-redux';

import { getFullName } from 'state/selectors/account.selectors';

import WelcomeBanner from './WelcomeBanner';

const mapStateToProps = (state) => ({
    fullName: getFullName(state),
});

export default connect(mapStateToProps)(WelcomeBanner);
