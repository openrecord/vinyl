import {connect} from 'react-redux';
import React from 'react';

import Queue from './Queue';
import WithActions from '../../common/components/WithActions';
import * as queueActions from '../state';

const mapStateToProps = ({queue}) => queue;

export default connect(mapStateToProps)(({isOpen, isExpand, queue}) => (
	<WithActions actions={queueActions}>
		{({set}) => (
			<Queue
				isOpen={isOpen}
				isExpand={isExpand}
				queue={queue}
				toggleOpen={() => set.isOpen(!isOpen)}
				toggleExpand={() => set.isExpand(!isExpand)}
			/>
		)}
	</WithActions>
));
