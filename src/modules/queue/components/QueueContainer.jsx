import {connect} from 'react-redux';
import React from 'react';

import Queue from './Queue';
import WithActions from '../../common/components/WithActions';
import * as queueActions from '../state';

const mapStateToProps = ({queue}) => queue;

export default connect(mapStateToProps)(({isQueueOpen, isSearchOpen, queue}) => (
	<WithActions actions={queueActions}>
		{({set}) => (
			<Queue
				isQueueOpen={isQueueOpen}
				isSearchOpen={isSearchOpen}
				queue={queue}
				toggleQueue={() => set.isQueueOpen(!isQueueOpen)}
				toggleSearch={() => set.isSearchOpen(!isSearchOpen)}
			/>
		)}
	</WithActions>
));
