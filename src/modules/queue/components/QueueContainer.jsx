import {connect} from 'react-redux';
import Queue from './Queue';

const mapStateToProps = ({uniplayer}) => uniplayer;

export default connect(mapStateToProps)(Queue);
