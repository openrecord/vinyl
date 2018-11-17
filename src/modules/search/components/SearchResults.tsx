import * as React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import styled from 'styled-components';
import ArrowNavigation from '../../common/components/ArrowNavigation';
import Track from './Track';
import {$Result} from './types';
import zindex from '../../common/zindex';
import * as animations from '../../common/animations';
import ResultsFilter from './ResultsFilter';

export default class SearchResults extends React.Component {
	props: {
		results: $Result[];
		enqueue(song: $Result): any;
	};
	state = {
		filterFor: 'both'
	};

	handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			filterFor: e.target.id
		});
	};

	render() {
		const {results, enqueue} = this.props;
		return (
			<div>
				<ResultsFilter handleFilter={this.handleFilter} />
				{results.length > 0 && (
					<StyledSearchResults>
						<ArrowNavigation priority={ArrowNavigation.PRIORITY_MAP.SEARCH} childIsWrapped>
							<VelocityTransitionGroup
								enter={{
									animation: animations.rotate3d.in,
									stagger: 100,
									duration: 400,
									display: 'flex'
								}}
								leave={{animation: animations.rotate3d.out, duration: 100, display: 'flex'}}
								runOnMount
							>
								{results
									.filter(result => {
										return this.state.filterFor === 'both' ||
											result.__typename === this.state.filterFor
											? result
											: null;
									})
									.map(result => {
										switch (result.__typename) {
											case 'YoutubeResult':
												return (
													<Track
														search
														thumbnail={result.snippet.thumbnails.default.url}
														title={result.snippet.title}
														key={result.id.videoId}
														onClick={() => enqueue(result)}
														youtube
													/>
												);
											case 'SoundCloudResult':
												return (
													<Track
														search
														thumbnail={result.thumbnail}
														title={result.title}
														key={result.id}
														onClick={() => enqueue(result)}
														soundcloud
													/>
												);
											default:
												return null;
										}
									})}
							</VelocityTransitionGroup>
						</ArrowNavigation>
					</StyledSearchResults>
				)}
			</div>
		);
	}
}

const StyledSearchResults = styled.div`
	background: rgba(24, 24, 24, 1);
	border: 2px solid rgb(32, 32, 32);
	box-sizing: border-box;
	box-shadow: 0px -0.75rem 0.75rem rgba(20, 20, 20, 0.8);
	position: absolute;
	z-index: ${zindex('search-results')};
	display: block;
	max-height: calc(100% - 3.5rem);
	overflow: hidden;
	overflow-y: scroll;
	pointer-events: all;
	width: 100%;
	::-webkit-scrollbar {
		display: none;
	}
`;
