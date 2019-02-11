import * as React from 'react';
import styled from 'styled-components';

import SoundOn from './images/sound-on.svg';
import SoundOff from './images/sound-off.svg';

function SoundSwitch({expanded, ...props}) {
  console.log(expanded);
  if (expanded) {
    return <Mute {...props} />;
  } else {
    return <Unmute {...props} />;
  }
}

export default styled(SoundSwitch)``;

const Unmute = props => <img src={SoundOn} {...props} />;
const Mute = props => <img src={SoundOff} {...props} />;
