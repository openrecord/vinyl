import * as React from 'react';
import styled from 'styled-components';

export default function Spinner() {
  return (
    <Loader>
      <div className="loading-record">
        <div className="record-ring outer" />
        <div className="record-ring inner" />
        <div className="record-pinhole" />
      </div>
    </Loader>
  );
}

const Loader = styled.div`
  align-items: center;
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  background: rgb(25, 25, 25);
`;
