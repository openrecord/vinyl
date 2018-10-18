import * as React from 'react';
import {get} from 'shades';

const DIR = {
	UP: 'up',
	DOWN: 'down'
};

export default class ArrowNavigation extends React.PureComponent {
	static PRIORITY_MAP = {
		QUEUE: 0,
		SEARCH: 1
	};

	$wrapper = React.createRef();

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown);
	}

	moveFocus(dir) {
		if (this.isHighestPriority()) this.findNodeToFocus(dir).focus();
	}

	getChildren() {
		if (this.$wrapper.current) {
			const children = this.$wrapper.current.children;
			if (this.props.childIsWrapped) {
				return children[0].children;
			}
			return children;
		}
		return [];
	}

	findNodeToFocus(dir) {
		const goingUp = dir === DIR.UP;
		const goingDown = dir === DIR.DOWN;
		const activeElement = document.activeElement;
		const children = this.getChildren();
		const childInFocus = Array.prototype.includes.call(children, activeElement);

		const wrappingDown = activeElement && activeElement === children[0] && goingUp;
		const wrappingUp =
			activeElement && activeElement === children[children.length - 1] && goingDown;

		if (!activeElement || !childInFocus || wrappingUp) {
			return children[0];
		}

		if (wrappingDown) {
			return children[children.length - 1];
		}

		if (goingDown) {
			return activeElement.nextElementSibling;
		} else {
			return activeElement.previousElementSibling;
		}
	}

	isHighestPriority() {
		const activeArrowComponents = Array(...document.querySelectorAll('.arrow-key'));
		const priorities = activeArrowComponents.map(get('dataset', 'priorityIndex')).map(Number);
		const maxPriority = Math.max(...priorities);

		return maxPriority === this.props.priority;
	}

	handleKeyDown = event => {
		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault();
				return this.moveFocus(DIR.UP);

			case 'ArrowDown':
				event.preventDefault();
				return this.moveFocus(DIR.DOWN);
		}
	};

	render() {
		const {priority, childIsWrapped, ...wrapperProps} = this.props;
		return (
			<div
				{...wrapperProps}
				ref={this.$wrapper}
				data-priority-index={priority}
				className="arrow-key"
			>
				{this.props.children}
			</div>
		);
	}
}
