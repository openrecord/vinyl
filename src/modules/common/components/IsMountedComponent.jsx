import React from 'react';

export default class IsMountedComponent extends React.Component {
	isMounted = false;

	componentDidMount() {
		this.isMounted = true;
	}
}
