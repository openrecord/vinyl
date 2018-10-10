import {device} from '../../../styles/utilities/device';
import styled from 'styled-components';

export default styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid rgba(150, 150, 150, 1);
	height: 7rem;
	margin-right: 1rem;
	min-width: 7rem;
	position: relative;
	transition: all 0.1s;

	@media ${device.small} {
		height: 3rem;
		margin: 0.75rem 0.5rem 0.75rem 0.75rem;
		width: 3rem;
		min-width: 3rem;
	}

	::after {
		content: '';
		background: transparent;
		border: 1.25rem solid rgba(150, 150, 150, 1);
		border-radius: 50%;
		height: 0.3125rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0.3125rem;

		@media ${device.small} {
			border: 0.6125rem solid rgba(150, 150, 150, 1);
			height: 0.1875rem;
			width: 0.1875rem;
		}
	}
`;
