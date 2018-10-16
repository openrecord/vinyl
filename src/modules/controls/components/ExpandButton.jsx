import styled from 'styled-components';

export default styled.button`
	cursor: pointer;
	opacity: 0.6;
	pointer-events: all;
	height: 100%;
	padding: 1rem;
	padding-top: 2.3rem;

	:before {
		content: '';
		border-top: 0.5rem solid white;
		border-left: 0.45rem solid transparent;
		border-right: 0.45rem solid transparent;
	}
`;
