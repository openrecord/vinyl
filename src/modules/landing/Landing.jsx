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
				<h1 className="hero-headline">Open music collections</h1>
				<div className="hero-action">
					<div className="link-holder">
						<h3 className="link-base">openrecord.co/</h3>
						<input
							id="open-collection"
							type="text"
							placeholder="smoothvibes"
							value={this.state.room}
							onChange={this.updateRoom}
							onKeyPress={ifEnter(this.routeToRoom)}
							tabIndex={1}
						/>
					</div>
					<button className="hero-button" type="submit" onClick={this.routeToRoom}>
						Open Collection
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(Landing);
