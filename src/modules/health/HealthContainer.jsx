import {connect} from 'react-redux';
import HealthComponent from './HealthComponent';
import * as actions from './health';

const mapStateToProps = state => ({health: state.health});

const mapDispatchToProps = dispatch => {
  const checkApiHealth = () => {
    dispatch(actions.checkApiHealth());
  };

  return {checkApiHealth};
};

const HealthContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HealthComponent);
export default HealthContainer;
