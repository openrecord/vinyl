import React from 'react';

export default function HealthComponent({health, checkApiHealth}) {
	return (
		<div>
			<p>Welcome to the Storyblocks Staging API!</p>
			<ApiHealth healthy={health.api} />
			<button onClick={checkApiHealth}>Check API Health</button>
		</div>
	);
}

function ApiHealth({healthy}) {
	let healthElement;

	switch (healthy) {
		case true:
			healthElement = <span>Healthy ✨</span>;
			break;
		case false:
			healthElement = <span>Unhealthy 🚨</span>;
			break;
		default:
			healthElement = <span>Unknown 🤷‍️‍</span>;
	}

	return (
		<div>
			<p>API Health: {healthElement}</p>
		</div>
	);
}
