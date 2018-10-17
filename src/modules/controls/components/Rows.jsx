import {VelocityTransitionGroup} from 'velocity-react';
import React from 'react';

import IsMountedComponent from '../../common/components/IsMountedComponent';
import * as animations from '../../common/animations';

export default class Rows extends IsMountedComponent {
	render() {
		return (
			<VelocityTransitionGroup
				enter={{
					animation: animations.slideUpExpand.in,
					delay: this.isMounted ? 0 : 900
				}}
				leave={{animation: animations.slideUpExpand.out}}
				runOnMount
			>
				{this.props.children}
			</VelocityTransitionGroup>
		);
	}
}
