import * as React from 'react';
import {withRouter} from 'react-router-dom';

import {ifEnter} from '../common/utils';

var rings = [];
for (var i = 0; i < 80; i++) {
  rings.push(<div className="ring" key={i} />);
}

class Landing extends React.Component {
  state = {
    room: ''
  };

  updateRoom = ({target: {value}}) => {
    this.setState({room: value});
  };

  routeToRoom = () => {
    this.props.history.push(`/${this.state.room}`);
  };

  render() {
    return (
      <div className="landing-inner">
        <div className="circle background" />
        <div className="circle outer" />
        {rings}
        <div className="circle center" />
        <div className="circle hole" />
        <h1 className="hero-headline">Instant Party Playlists</h1>
        <h5 className="hero-description">No ads. No downloads. No login required.</h5>
        <div className="hero-action">
          <input
            id="open-collection"
            type="text"
            placeholder="Playlist Name"
            value={this.state.room}
            onChange={this.updateRoom}
            onKeyPress={ifEnter(this.routeToRoom)}
            tabIndex={1}
          />
          <button className="hero-button" type="submit" onClick={this.routeToRoom}>
            Enter
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
