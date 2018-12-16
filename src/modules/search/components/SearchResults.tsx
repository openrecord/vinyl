import * as React from 'react';
import styled from 'styled-components';
import {VelocityTransitionGroup} from 'velocity-react';

import * as animations from '../../common/animations';
import ArrowNavigation from '../../common/components/ArrowNavigation';
import zindex from '../../common/zindex';
import Track from './Track';
import {$Result} from './types';

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
      </div>
    );
  }
}

const StyledSearchResults = styled.div`
  position: relative;
  z-index: ${zindex('search-results')};
  background: none;
  display: block;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;
