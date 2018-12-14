import gql from 'graphql-tag';
import * as React from 'react';
import {OnSubscriptionDataOptions, Subscription} from 'react-apollo';

import TrackFragments from '../../common/fragments/TrackFragments';
import {$Track} from '../../search/components/types';
import {useStore} from '../../store';

const ON_REMOTE_CONTROL = gql`
  subscription OnRemoteControl($playlist: String!) {
    remoteControl(where: {mutation_in: [CREATED], node: {song: {playlist: {name: $playlist}}}}) {
      node {
        action
        song {
          ...AllTrack
        }
      }
    }
  }
  ${TrackFragments.all}
`;

interface $SubscriptionData {
  remoteControl: {
    node: {
      action: string;
      song: $Track;
    };
  };
}
interface $Props {
  playlist: string | null;
  currentlyPlaying: $Track | undefined;
  live: boolean;
  children(): JSX.Element;
}

export default ({playlist, currentlyPlaying, live, children}: $Props) => {
  const {
    actions: {
      player: {setter, toggle}
    }
  } = useStore();

  return (
    <Subscription<$SubscriptionData>
      subscription={ON_REMOTE_CONTROL}
      variables={{playlist}}
      onSubscriptionData={({
        subscriptionData: {data}
      }: OnSubscriptionDataOptions<$SubscriptionData>) => {
        if (data && live) {
          switch (data.remoteControl.node.action) {
            case 'PLAY':
              return toggle('playing')(true);

            case 'PAUSE':
              return toggle('playing')(false);

            case 'SET':
              if (currentlyPlaying && currentlyPlaying.id === data.remoteControl.node.song.id) {
                return;
              }
              return setter('currentlyPlaying')(data.remoteControl.node.song);
          }
        }
      }}
    >
      {children}
    </Subscription>
  );
};
