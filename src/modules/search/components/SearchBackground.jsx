import {VelocityTransitionGroup} from 'velocity-react';
import styled from 'styled-components';
import React from 'react';
import ReactDOM from 'react-dom';

import zindex from '../../common/zindex';

export default function SearchBackground({isSearchOpen, children}) {
	const target = document.getElementById('search-results-target');
	if (target) {
		return ReactDOM.createPortal(
			<VelocityTransitionGroup
				enter={{animation: 'slideDown', delay: 200, duration: 700}}
				leave="slideUp"
			>
				{isSearchOpen && <StyledSearchBackground>{children}</StyledSearchBackground>}
			</VelocityTransitionGroup>,
			target
		);
	}

	return null;
}

const StyledSearchBackground = styled.div`
	background: rgba(25, 25, 25, 0.97);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: ${zindex('search-background')};
`;
