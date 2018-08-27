import {connect} from 'react-redux';
import QueueComponent from './QueueComponent.jsx';

const mapStateToProps = state => ({user: state.auth.user});

const mapDispatchToProps = dispatch => {
	return {};
};

const QueueContainer = connect(mapStateToProps, mapDispatchToProps)(QueueComponent);
export default QueueContainer;
