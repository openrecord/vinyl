import * as React from 'react';
import styled from 'styled-components';

import expand from './images/expand.svg';
import minimize from './images/minimize.svg';

function ExpandSwitch({expanded, ...props}) {
  if (expanded) {
    return <Expand {...props} />;
  } else {
    return <Minimize {...props} />;
  }
}

export default styled(ExpandSwitch)``;

const Expand = props => <img src={expand} {...props} />;
const Minimize = props => <img src={minimize} {...props} />;
