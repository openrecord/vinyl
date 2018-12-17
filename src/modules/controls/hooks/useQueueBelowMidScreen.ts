import * as _ from 'lodash';
import * as React from 'react';

export default function useQueueBelowMidScreen() {
  const [belowHalfway, setBelowHalfway] = React.useState(true);
  React.useEffect(
    () => {
      const handler = _.throttle(() => {
        const queue = document.querySelector('[data-id="queue"]');
        if (queue) {
          const {top} = queue.getBoundingClientRect();
          const newBelowHalfway = top > window.innerHeight / 2;
          if (newBelowHalfway !== belowHalfway) {
            setBelowHalfway(newBelowHalfway);
          }
        } else {
          console.warn(
            'No component with data-id = queue. Check to make sure the queue component still has this data-id'
          );
        }
      }, 250);
      document.addEventListener('scroll', handler);
      return () => {
        document.removeEventListener('scroll', handler);
      };
    },
    [belowHalfway]
  );

  return belowHalfway;
}
