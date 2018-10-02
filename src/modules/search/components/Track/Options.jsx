import React from 'react';
import styled from 'styled-components';
import {device} from '../../../../styles/utilities/device';

export default class Options extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggleOpen = event => {
		event.stopPropagation();
		this.setState({isOpen: !this.state.isOpen});
	};

	render() {
		return (
			<StyledOptions className="options" isOpen={this.state.isOpen}>
				<SongDots onClick={this.toggleOpen}>
					<Dot />
					<Dot />
					<Dot />
					<Menu isOpen={this.state.isOpen}>
						<li onClick={this.props.deleteTrack}>Delete</li>
					</Menu>
				</SongDots>
			</StyledOptions>
		);
	}
}

const StyledOptions = styled.div`
	opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
	margin-left: auto;
	@media ${device.small} {
		opacity: ${({isOpen}) => (isOpen ? '1 !important' : '0.5 !important')};
	}

	&:hover {
		opacity: 1 !important;
	}
`;

const SongDots = styled.div`
	display: flex;
	padding: 0.5rem;
	position: relative;
`;

const Dot = styled.span`
	background: white;
	border-radius: 50%;
	height: 0.25rem;
	margin: 0.125rem;
	width: 0.25rem;
	@media ${device.small} {
		height: 0.1875rem;
		margin: 0.0625rem;
		width: 0.1875rem;
	}
`;

const Menu = styled.ul`
	position: absolute;
	top: 1.375rem;
	background: rgba(32, 32, 32);
	border-radius: 0.25rem;
	box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
	right: 0;
	opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
	transition: all 0.1s;

	li {
		border-radius: 0.25rem;
		color: white;
		cursor: pointer;
		display: block;
		font-size: 0.875rem;
		padding: 0.375rem 0.75rem 0.375rem 0.75rem;
		text-align: left;

		&:hover {
			background: rgb(64, 64, 64);
		}
	}
`;
