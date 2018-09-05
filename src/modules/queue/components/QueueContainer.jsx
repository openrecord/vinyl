import {connect} from 'react-redux';
import React from 'react';

import Queue from './Queue';
import WithActions from '../../common/components/WithActions';
import * as queueActions from '../state';

const mapStateToProps = ({queue}) => queue;

export default connect(mapStateToProps)(({isOpen, isExpand, isRecent, queue}) => (
	<WithActions actions={queueActions}>
		{({set}) => (
			<Queue
				isOpen={isOpen}
				isExpand={isExpand}
				isRecent={isRecent}
				queue={queue}
				toggleOpen={() => set.isOpen(!isOpen)}
				toggleExpand={() => set.isExpand(!isExpand)}
				toggleRecent={() => set.isRecent(!isRecent)}
			/>
		)}
	</WithActions>
));
