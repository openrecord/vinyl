import styled from 'styled-components';

export default styled.button`
	cursor: pointer;
	opacity: 0.6;
	pointer-events: all;
	transform: translateY(0.7rem);
	height: 100%;
	padding: 1rem;
	position: relative;
	top: -0.675rem;

	:before {
		content: '';
		border-top: 0.5rem solid white;
		border-left: 0.45rem solid transparent;
		border-right: 0.45rem solid transparent;
		position: relative;
		top: 0.675rem;
	}
`;
