import styled from 'styled-components';

interface $Props {
  arrowDown: boolean;
}

export default styled.button`
  cursor: pointer;
  opacity: 0.6;
  pointer-events: all;
  padding: 1rem;
  transition: transform 0.5s ease-in-out;
  ${(props: $Props) => !props.arrowDown && 'transform: rotate(180deg)'};

  :before {
    content: '';
    border-top: 0.45rem solid white;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    position: relative;
    top: 0.625rem;
  }

  :hover {
    opacity: 1;
  }
`;
