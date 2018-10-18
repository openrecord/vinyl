import {VelocityTransitionGroup} from 'velocity-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

import onClickOutside from 'react-onclickoutside';

import zindex from '../../common/zindex';

export default function SearchBackground({isSearchOpen, toggleSearch, clearSearch, children}) {
	const target = document.getElementById('search-results-target');
	if (target) {
		return ReactDOM.createPortal(
			<VelocityTransitionGroup
				enter={{animation: 'slideDown', delay: 200, duration: 700}}
				leave="slideUp"
			>
				{isSearchOpen && (
					<Background
						isSearchOpen={isSearchOpen}
						toggleSearch={toggleSearch}
						clearSearch={clearSearch}
					>
						{children}
					</Background>
				)}
			</VelocityTransitionGroup>,
			target
		);
	}

	return null;
}

class OnClickOutsideBackground extends React.Component {
	handleClickOutside({target: {dataset: {id} = {id: null}}}) {
		if (this.props.isSearchOpen) {
			if (id !== 'show-hide-search') {
				this.props.toggleSearch();
			}
			this.props.clearSearch();
		}
	}

	render() {
		const {style, className} = this.props;

		return (
			<div style={style} className={className}>
				{this.props.children}
			</div>
		);
	}
}

const Background = styled(onClickOutside(OnClickOutsideBackground))`
	background: rgba(25, 25, 25, 0.97);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: ${zindex('search-background')};
`;
