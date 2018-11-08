import * as React from 'react';
import * as ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import zindex from '../../common/zindex';

interface $Props {
	isSearchOpen: boolean;
	toggleSearch(isOpen?: boolean): any;
	clearSearch(): any;
	children: React.ReactNode;
}

export default function SearchBackground({
	isSearchOpen,
	toggleSearch,
	clearSearch,
	children
}: $Props) {
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

interface $OnClickOutsideBackgroundProps {
	isSearchOpen: boolean;
	toggleSearch(isOpen?: boolean): any;
	clearSearch(): any;
	children: React.ReactNode;
	style?: Object;
	className?: string;
}

class OnClickOutsideBackground extends React.Component<$OnClickOutsideBackgroundProps> {
	handleClickOutside({target}: React.MouseEvent<HTMLElement>) {
		if (this.props.isSearchOpen && target instanceof HTMLElement) {
			if (!['show-hide-search', 'search-bar-target'].includes(target.dataset.id || '')) {
				this.props.toggleSearch();
			}
			if (target.dataset.id !== 'search-bar-target') {
				this.props.clearSearch();
			}
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
