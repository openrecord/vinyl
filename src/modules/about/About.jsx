import * as React from 'react';
import {withRouter} from 'react-router-dom';
import ReactGA from 'react-ga';
import {ifEnter} from '../common/utils';

const coBlur = require('./images/co-blur.png');

class About extends React.Component {
  state = {
    room: ''
  };

  feedbackClick() {
    ReactGA.event({
      category: 'Collaborate',
      action: 'feedback'
    });
  }
  contributeClick() {
    ReactGA.event({
      category: 'Collaborate',
      action: 'contribute'
    });
  }

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
              An open source experiment for collaborative music collecting
            </h1>
            <span className="divider" />
            <h4 className="call-to-action">
              Let us know what you think or better yet, come help us build!
            </h4>
            <div className="button-box">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLScwbj_7R3jBl_m4gaK_edOyyldnT5E-RCdXmdJg3ruJLaphhA/viewform?usp=sf_link"
                target="blank"
              >
                <button onClick={this.feedbackClick}>Feedback</button>
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc7OBaGMOYAiMAuxImXUbN9TtQ9aWJOHB1TqRaFR11MGOcKYg/viewform?usp=sf_link"
                target="blank"
              >
                <button onClick={this.contributeClick}>Contribute</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(About);
