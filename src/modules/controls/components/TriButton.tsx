import styled from 'styled-components';

interface $Props {
  up: boolean;
}
export default styled.button`
  opacity: 0.6;
  pointer-events: all;
  padding: 1rem;
  transition: transform 0.5s ease-in-out;
  ${(props: $Props) => props.up && 'transform: rotate(180deg)'};

  :before {
    content: '';
    border-top: 0.5rem solid white;
    border-left: 0.45rem solid transparent;
    border-right: 0.45rem solid transparent;
    position: relative;
    top: 0.625rem;
  }

  :hover {
    opacity: 1;
  }
`;
