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
                animation: animations.fade.in,
                stagger: 100,
                duration: 350,
                display: 'flex'
              }}
              leave={{animation: animations.fade.out, duration: 100, display: 'flex'}}
              runOnMount
            >
              {results
                .filter(
                  result =>
                    this.state.filterFor === 'both' || result.__typename === this.state.filterFor
                )
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
                          thumbnail={result.artwork_url}
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
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;
