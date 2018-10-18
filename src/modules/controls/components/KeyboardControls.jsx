import * as React from 'react';

export default class KeyboardControls extends React.PureComponent {
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = event => {
		if (document.activeElement instanceof HTMLInputElement && event.key != 'Escape') {
			return;
		}
		const {toggleExpanded, togglePlaying, toggleSearch} = this.props;

		switch (event.key) {
			case ' ':
				event.preventDefault();
				return togglePlaying();
			case 'f':
				event.preventDefault();
				return toggleExpanded();
			case 's':
				event.preventDefault();
				return toggleSearch();
			case 'Escape':
				event.preventDefault();
				return toggleSearch(false);
		}
	};

	render() {
		return this.props.children;
	}
}
