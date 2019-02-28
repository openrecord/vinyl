import * as React from 'react';
import {withRouter} from 'react-router-dom';

import {ifEnter} from '../common/utils';

const picOne = require('./images/fkj.png');
const picTwo = require('./images/isolated.jpg');
const picThree = require('./images/alizzz.jpg');
const picFour = require('./images/flames.jpg');
const picFive = require('./images/undertow.jpg');

const scrollArrow = require('../common/components/images/arrow.svg');

class Landing extends React.Component {
  state = {
    room: '',
    nominate: false
  };

  nominateClick = event => {
    this.setState({nominate: true});
    ReactGA.event({
      category: 'Featured',
      action: 'nominate'
    });
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
        <h1 className="hero-headline">Open music playlists</h1>
        <h5 className="hero-description">A free way to collect and share 🔥music with others</h5>
        <div className="hero-action">
          <input
            id="open-collection"
            type="text"
            placeholder="Collection name"
            value={this.state.room}
            onChange={this.updateRoom}
            onKeyPress={ifEnter(this.routeToRoom)}
            tabIndex={1}
          />
          <button className="hero-button" type="submit" onClick={this.routeToRoom}>
            Go
          </button>
        </div>
        <div className="featured">
          <div className="featured-heading">
            <h3>Featured Collections</h3>
            <div className="scroll-featured">
              <h5>Scroll</h5>
              <img className="scroll-arrow" src={scrollArrow} />
            </div>
          </div>
          <div className="collection-cards">
            <a href="/ryan" className="swipeable-card one">
              <div className="example-record">
                <img src={picOne} />
                <span className="pinhole one" />
              </div>
              <h3 className="featured-name">/ryan</h3>
            </a>
            <a href="/ben" className="swipeable-card two">
              <div className="example-record">
                <img src={picTwo} />
                <span className="pinhole two" />
              </div>
              <h3 className="featured-name">/ben</h3>
            </a>
            <a href="/moves" className="swipeable-card three">
              <div className="example-record">
                <img src={picThree} />
                <span className="pinhole three" />
              </div>
              <h3 className="featured-name">/moves</h3>
            </a>
            <a href="/vibes" className="swipeable-card four">
              <div className="example-record">
                <img src={picFour} />
                <span className="pinhole four" />
              </div>
              <h3 className="featured-name">/vibes</h3>
            </a>
            <a href="/mickin" className="swipeable-card five">
              <div className="example-record">
                <img src={picFive} />
                <span className="pinhole five" />
              </div>
              <h3 className="featured-name">/mickin</h3>
            </a>
            <div className="swipeable-card nominate">
              {this.state.nominate ? (
                <iframe
                  id="form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdkgNuAFsEnD0opoFnVEQzkhEE1tIqR2snbPq6aGaANwsR51w/viewform?embedded=true"
                  width="280"
                  height="331"
                  frameborder="0"
                  marginheight="0"
                  marginwidth="0"
                >
                  Loading...
                </iframe>
              ) : (
                <div className="nominate-trigger" onClick={this.nominateClick}>
                  <h1>Submit collection to be featured</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
