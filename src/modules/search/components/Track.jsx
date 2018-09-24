import styled, {css} from 'styled-components';
import React from 'react';
import classname from 'classnames';

export default function Track({onClick, playing, search, thumbnail, title}) {
	return (
		<StyledResult onClick={onClick} className={classname({playing})}>
			<ImageHolder className="image-holder" search={search}>
				<img src={thumbnail} />
				<PlayBackground className="play-background" />
				{search ? <AddPlus /> : <PlayButton className="play-button" />}
			</ImageHolder>
			<h4>{title}</h4>
			<MenuTrigger className="menu-trigger">
				<SongDots>
					<span />
					<span />
					<span />
				</SongDots>
				<Menu className="menu">
					<li>Delete</li>
				</Menu>
			</MenuTrigger>
		</StyledResult>
	);
}

const StyledResult = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	padding: 0.5rem 0.75rem;
	position: relative;
	transition: background-color 0.1s linear;

	&.playing {
		background: rgba(40, 40, 40);
		.play-background {
			opacity: 1;
		}
		.play-button {
			opacity: 1;
		}
	}

	&:hover {
		background: rgba(40, 40, 40);
		.image-holder {
			span {
				opacity: 1;
			}
		}
		.menu-trigger {
			opacity: 0.5;
		}
	}

	h4 {
		overflow: hidden;
		color: rgba(255, 255, 255, 0.8);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		transition: color 0.1s linear;
	}
`;

const ImageHolder = styled.div`
	display: inline-block;
	position: relative;
	height: 4.125rem;
	overflow: hidden;
	margin-right: 0.75rem;
	min-width: 7.5rem;

	img {
		height: 5.625rem;
		position: absolute;
		top: -0.75rem;
		width: 7.5rem;
	}

	${({search}) =>
		search &&
		css`
			height: 3.3rem;
			min-width: 6rem;

			img {
				height: 4.5rem;
				top: -0.6rem;
				width: 6rem;
			}
		`};
`;

const AddPlus = styled.span`
	height: 1.5rem;
	left: 50%;
	opacity: 0;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 1.5rem;

	&:before {
		background: white;
		content: '';
		height: 1.5rem;
		left: 50%;
		position: absolute;
		width: 0.25rem;
		transform: translateX(-50%);
	}

	&:after {
		background: white;
		content: '';
		height: 1.5rem;
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%) rotate(90deg);
		width: 0.25rem;
	}
`;

const PlayBackground = styled.span`
	background: rgba(16, 16, 16, 0.8);
	height: 100%;
	position: absolute;
	opacity: 0;
	width: 100%;
	transition: all 0.1s;
`;

const PlayButton = styled.span`
	height: 1.5rem;
	left: 50%;
	opacity: 0;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	transition: all 0.1s;

	box-sizing: border-box;
	border-width: 0.75rem 0 0.75rem 1.25rem;
	border-color: transparent transparent transparent white;
	border-style: solid;
`;

const MenuTrigger = styled.div`
	height: 1.5rem;
	opacity: 0;
	position: absolute;
	right: 1rem;
	text-align: center;
	top: 50%;
	width: 2rem;
	transform: translateY(-50%);
	transition: all 0.1s;
	&:hover {
		opacity: 1 !important;

		/****** Need to Remove and Replace with Click *****/
		.menu {
			opacity: 1;
		}
	}
`;
const SongDots = styled.div`
	left: 50%;
	position: relative;
	top: 50%;
	transform: translate(-50%, -50%);
 	span {
		background: white;
		border-radius: 50%;
		box-sizing: content-box;
		display: inline-block;
		height: 0.25rem;
		margin: 0.125rem;
		position: relative;
		top: -0.0675rem
		width: 0.25rem;
	}
`;

const Menu = styled.ul`
	background: rgba(32, 32, 32);
	border-radius: 0.25rem;
	box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
	display: inline-block;
	right: 0;
	opacity: 0;
	position: absolute;
	top: 100%;
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
