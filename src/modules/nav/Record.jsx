import {device} from '../../styles/utilities/device';
import styled from 'styled-components';

export default styled.div`
	background: rgba(255, 255, 255, 0.01);
	border-radius: 50%;
	border: 1px solid white;
	height: 2rem;
	margin-right: 0.5rem;
	min-width: 2rem;
	position: relative;
	transition: all 0.1s;

	::after {
		content: '';
		background: transparent;
		border: 0.425rem solid white;
		border-radius: 50%;
		height: 0.125rem;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 0.125rem;
	}
`;
