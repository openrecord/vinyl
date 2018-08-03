import {connect} from 'react-redux';
import ProfileComponent from './ProfileComponent';
import * as actions from './profile';

const mapStateToProps = state => ({user: state.auth.user});

const mapDispatchToProps = dispatch => {
	return {};
};

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
export default ProfileContainer;
