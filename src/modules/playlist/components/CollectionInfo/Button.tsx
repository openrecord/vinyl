import styled from 'styled-components';

interface $Props {
	active?: boolean;
}

const FILL = '#9c4d9d';

export default styled.button`
	background: ${({active}: $Props) => (active ? FILL : 'transparent')};
	border: 0.125rem solid #9c4d9d;
	border-radius: 1.125rem;
	color: #9c4d9d;
	cursor: pointer;
	font-size: 1.125rem;
	line-height: 1rem;
	outline: none;
	padding: 0.5rem 3rem;
	transition: all 0.1s;

	span {
		font-size: 1rem;
		line-height: 0.875rem;
	}

	&:hover {
		color: rgba(255, 255, 255, 1);
		background: ${FILL};
	}
`;
