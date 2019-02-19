import * as React from 'react';
import styled from 'styled-components';

export default function Spinner() {
  return (
    <Loader>
      <Main />
      <Sidebar />
    </Loader>
  );
}

const Loader = styled.div`
  bottom: 0;
  display: flex;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

const Main = styled.div`
  width: 80%;
`;

const Sidebar = styled.div`
  background: rgba(34, 34, 34, 0.4);
  height: 100%;
  max-width: 30rem;
  width: 50%;
`;
