import * as React from 'react';
import {set} from 'shades';

function adaptReducer(Component, [propName, Instance]) {
	return ({children}) => (
		<Component>
			{propObject => {
				const childFn = renderProp => children(set(propName)(renderProp)(propObject));

				if (typeof Instance === 'function') {
					return <Instance {...propObject} render={childFn} />;
				}
				return React.cloneElement(Instance, {}, childFn);
			}}
		</Component>
	);
}

// Extension of React-Adopt (https://github.com/pedronauck/react-adopt)
// instead of taking a single map of objects, adapt can take multiple
// maps, and passes all the props collected from the 1->nth maps
// into each function/component of the n+1th map
// Allows later components to depend on earlier ones
export default function adapt(...mappings) {
	return mappings.reduce(
		(Comp, mapping) => Object.entries(mapping).reduce(adaptReducer, Comp),
		({children, ...rest}) => children(rest)
	);
}
