import * as React from 'react';
import {VelocityTransitionGroup} from 'velocity-react';
import styled from 'styled-components';

import ArrowNavigation from '../../common/components/ArrowNavigation';
import Track from './Track';
import {$Result} from './types';
import zindex from '../../common/zindex';
import * as animations from '../../common/animations';
const scIcon = require('./images/soundcloud.svg');
const ytIcon = require('./images/youtube.svg');

interface $Props {
	results: $Result[];
	enqueue(song: $Result): any;
}

export default function SearchResults({results, enqueue}: $Props) {
	return (
		<div>
			<ResultsFilter>
				<div>
					<input type="radio" id="youtube" name="filter" />
					<label htmlFor="youtube">
						<div />
						<img src={ytIcon} />
					</label>
				</div>
				<div>
					<input type="radio" id="soundcloud" name="filter" />
					<label htmlFor="soundcloud">
						<div />
						<img src={scIcon} />
					</label>
				</div>
				<div>
					<input type="radio" id="both" name="filter" defaultChecked />
					<label htmlFor="both">
						<div />
						<h5>Both</h5>
					</label>
				</div>
			</ResultsFilter>
			<StyledSearchResults>
				<ArrowNavigation priority={ArrowNavigation.PRIORITY_MAP.SEARCH} childIsWrapped>
					<VelocityTransitionGroup
						enter={{
							animation: animations.rotate3d.in,
							stagger: 200,
							duration: 750,
							display: 'flex'
						}}
						leave={{animation: animations.rotate3d.out, duration: 200, display: 'flex'}}
						runOnMount
					>
						{results.map(result => {
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
		</div>
	);
}

const StyledSearchResults = styled.div`
	position: absolute;
	z-index: ${zindex('search-results')};
	background: rgb(25, 25, 25);
	display: block;
	max-height: 30rem;
	overflow: hidden;
	overflow-y: scroll;
	width: 100%;
	box-shadow: 0px 12px 6px 4px rgba(0, 0, 0, 0.2);
	::-webkit-scrollbar {
		display: none;
	}
`;
const ResultsFilter = styled.div`
  display:flex;
  justify-content: flex-end; align-items: center;
  padding: .5rem 1rem .5rem;
  font-family: 'Haas Reg', Arial, sans-serif;
  box-shadow: 0px 5px 6px 4px rgba(0, 0, 0, 0.1);

  /* hide radio buttons */
  input[type="radio"]{
    position:absolute; left: -2000%;
  }

  /* custom buttons */
  label{
    cursor:pointer;
    margin-left: 1rem;
    display:flex;
    align-items: center;
    h5{
      color:white;
    }
    div{
      width: 12px;
      height: 12px;
      border-radius: 7px;
      background white;
      margin: 0 .2rem 0 0;
      background: white;
    }
    h5, div, img{
      opacity: 0.3;
      transition: .4s;
    }
  }

  /* hover and checked styles */
  label:hover div,
  input:checked + label div{
    opacity: 1;
  }
  label[for="youtube"]:hover div,
  #youtube:checked + label div{
      background: red;
  }
  label[for="soundcloud"]:hover div,
  #soundcloud:checked + label div{
      background: rgb(255,184,107);
  }
  label[for="both"]:hover div,
  #both:checked + label div{
      background: rgba(255,255,255,0.8);;
  }

`;
