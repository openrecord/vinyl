import {compose} from 'redux';
import {connect} from 'react-redux';
import {map, identity} from 'shades';

const bindActionCreators = dispatch => actionCreator =>
	typeof actionCreator === 'object'
		? bindObject(dispatch)(actionCreator)
		: compose(
				dispatch,
				actionCreator
		  );

const bindObject = dispatch => map(bindActionCreators(dispatch));

/*
Component that takes a map of actions and a render prop and renders
the children with those actions bound to dispatch. Eliminates the 
need to fuddle with dispatch and allows lazy actions

Usage:
assuming todoActions has `setTodo` and `deleteTodo`
  <WithActions actions={todoActions}>
    {({setTodo, deleteTodo}) =>
      <Todo>
        <EditTodo onChange={setTodo} />
        <XIcon onClick={deleteTodo} />
      </Todo>
    }
  </WithActions>
*/
function WithActions({actions, dispatch = identity, children}) {
	return children(bindActionCreators(dispatch)(actions));
}

export default connect(null)(WithActions);
