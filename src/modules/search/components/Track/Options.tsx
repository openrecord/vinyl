import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';

import {device} from '../../../../styles/utilities/device';

interface $Props {
  deleteTrack(): void;
}

class Options extends React.Component<$Props> {
  state = {
    isOpen: false
  };

  handleClickOutside() {
    this.setState({isOpen: false});
  }

  toggleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    return (
      <StyledOptions className="options" isOpen={this.state.isOpen}>
        <SongDots onClick={this.toggleOpen}>
          <Dot />
          <Dot />
          <Dot />
          <Menu isOpen={this.state.isOpen}>
            <li onClick={this.props.deleteTrack}>Delete</li>
          </Menu>
        </SongDots>
      </StyledOptions>
    );
  }
}

export default styled(onClickOutside(Options))``;

const StyledOptions = styled.div`
  padding: 0 0.5rem;
  margin-left: auto;
`;

const SongDots = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  position: relative;
`;

const Dot = styled.span`
  background: white;
  border-radius: 50%;
  height: 0.25rem;
  margin: 0.0625rem;
  width: 0.25rem;

  @media ${device.small} {
    height: 0.1875rem;
    margin: 0.0625rem;
    width: 0.1875rem;
  }
`;

interface $MenuProps {
  isOpen: boolean;
}

const Menu = styled.ul`
  position: absolute;
  top: 1.375rem;
  background: rgb(32, 32, 32);
  border-radius: 0.25rem;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
  right: 0;
  opacity: ${({isOpen}: $MenuProps) => (isOpen ? '1' : '0')};
  transition: all 0.1s;

  li {
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    display: block;
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem 0.375rem 0.75rem;
    text-align: left;

    &:hover {
      background: rgb(64, 64, 64);
    }
  }
`;
