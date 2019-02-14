import styled from 'styled-components';

interface $Props {
  active?: boolean;
}

export default styled.button`
  background: ${({active}: $Props) => (active ? 'black' : 'white')};
  border-radius: 6.25rem;
  color: black;
  cursor: pointer;
  font-size: 1.125rem;
  outline: none;
  margin: 2rem;
  padding: 0.75rem 1.25rem;
  transition: all 0.1s;

  img {
    position: relative;
    top: 0.125rem;
    transition: all 0.1s;
  }

  &:hover {
    color: rgba(255, 255, 255, 1);
    background: black;

    img {
      filter: invert(100%);
    }
  }
`;
