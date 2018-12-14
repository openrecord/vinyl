import * as React from 'react';
import styled from 'styled-components';

export default function Toast({message}) {
  return <StyledToast>{message}</StyledToast>;
}
const StyledToast = styled.div`
  background: #9c4d9d;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  display: inline;
`;
