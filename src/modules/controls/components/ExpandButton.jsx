import styled from 'styled-components';

export default styled.button`
	cursor: pointer;
	height: 0.5rem;
	opacity: 0.6;
	pointer-events: all;
	transform: translateY(0.7rem);

	:before {
		content: '';
		border-top: 0.5rem solid white;
		border-left: 0.45rem solid transparent;
		border-right: 0.45rem solid transparent;
	}

	:hover {
		opacity: 1;
	}
`;
