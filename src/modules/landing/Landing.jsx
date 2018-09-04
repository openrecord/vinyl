import React from 'react';
var rings = [];
for (var i = 0; i < 80; i++) {
	rings.push(<div className="ring" key={i} />);
}

export default function Landing() {
	return (
		<div className="landing-inner">
			<div className="circle" id="center" />
			{rings}
			<div className="circle" id="outer" />
			<div className="circle" id="background" />
			<div className="circle" id="hole" />
			<h1 className="hero-headline">Open music collections</h1>
			<div className="hero-action">
				<div className="link-holder">
					<h3 className="link-base">openrecord.co/</h3>
					<input type="text" placeholder="smoothvibes" />
				</div>
				<button className="hero-button" type="submit">
					Open Collection
				</button>
			</div>
		</div>
	);
}
