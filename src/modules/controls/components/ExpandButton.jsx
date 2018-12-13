import styled from 'styled-components';

export default styled.button`
	cursor: pointer;
	opacity: 0.6;
	pointer-events: all;
	padding: 1rem;

	:before {
		content: '';
		border-top: 0.5rem solid white;
		border-left: 0.45rem solid transparent;
		border-right: 0.45rem solid transparent;
		position: relative;
		top: 0.625rem;
	}
`;
