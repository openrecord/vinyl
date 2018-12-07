import * as React from 'react';
import * as ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import zindex from '../../common/zindex';

interface $Props {
	isOpen: boolean;
	toggleSearch(isOpen?: boolean): any;
	clearSearch(): any;
	children: React.ReactNode;
}

export default function SearchBackground({isOpen, toggleSearch, clearSearch, children}: $Props) {
	const target = document.getElementById('search-results-target');
	if (target) {
		return ReactDOM.createPortal(
			<VelocityTransitionGroup>
				{isOpen && (
					<Background isOpen={isOpen} toggleSearch={toggleSearch} clearSearch={clearSearch}>
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
	isOpen: boolean;
	toggleSearch(isOpen?: boolean): any;
	clearSearch(): any;
	children: React.ReactNode;
	style?: Object;
	className?: string;
}

class OnClickOutsideBackground extends React.Component<$OnClickOutsideBackgroundProps> {
	handleClickOutside({target}: React.MouseEvent<HTMLElement>) {
		if (this.props.isOpen && target instanceof HTMLElement) {
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
	background: white;
	border-radius: 5rem;
	width: 80%;
	height: 80%;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: ${zindex('search-background')};
`;
