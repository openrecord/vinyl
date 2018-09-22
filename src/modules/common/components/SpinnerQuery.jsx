import React from 'react';
import {Query} from 'react-apollo';
import Spinner from './Spinner';

export default function SpinnerQuery({children, postProcess, ...props}) {
	return (
		<Query {...props}>
			{({loading, data, ...rest}) =>
				loading ? <Spinner /> : children({data: postProcess ? postProcess(data) : data, ...rest})
			}
		</Query>
	);
}
