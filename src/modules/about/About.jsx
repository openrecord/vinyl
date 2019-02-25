import * as React from 'react';
import {withRouter} from 'react-router-dom';

import {ifEnter} from '../common/utils';

const coBlur = require('./images/co-blur.png');

class About extends React.Component {
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
      <div className="about-page" style={{backgroundImage: 'url(' + coBlur + ')'}}>
        <div className="about-background" />
        <div className="about-input">
          <input
            id="open-collection"
            type="text"
            placeholder="Collection name"
            value={this.state.room}
            onChange={this.updateRoom}
            onKeyPress={ifEnter(this.routeToRoom)}
            tabIndex={1}
          />
          <button className="go-button" type="submit" onClick={this.routeToRoom}>
            Go
          </button>
        </div>
        <div className="about-main">
          <div className="message-holder">
            <h1 className="message-header">
              An open source experiment for creating colorful music collections
            </h1>
            <span className="divider" />
            <h4 className="call-to-action">
              Let us know what you think or better yet, come help us build!
            </h4>
            <div className="button-box">
              <button>Feedback</button>
              <button>Contribute</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(About);
