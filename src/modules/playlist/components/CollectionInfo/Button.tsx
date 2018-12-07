import styled from 'styled-components';

interface $Props {
	active?: boolean;
}

const FILL = '#9c4d9d';

export default styled.button`
	background: ${({active}: $Props) => (active ? FILL : 'white')};
	border-radius: 6.25rem;
	color: black;
	cursor: pointer;
	font-size: 1.125rem;
	outline: none;
	margin: 2rem;
	padding: 0.75rem 1.25rem;

	&:hover {
		color: rgba(255, 255, 255, 1);
		background: ${FILL};
	}
`;
