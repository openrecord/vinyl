import {velocityHelpers} from 'velocity-react';
import 'velocity-animate';
import 'velocity-animate/velocity.ui';

export const fade = {
  in: velocityHelpers.registerEffect({
    calls: [
      [
        {
          opacity: [1, 0]
        },
        1,
        {
          easing: [300, 25],
          display: 'block'
        }
      ]
    ]
  }),

  out: velocityHelpers.registerEffect({
    calls: [
      [
        {
          opacity: [0, 1]
        },
        1,
        {
          easing: 'linear',
          display: 'block'
        }
      ]
    ]
  })
};

export const slideDownExpand = {
  in: velocityHelpers.registerEffect({
    defaultDuration: 300,
    calls: [
      [
        {
          height: fromCached('height'),
          minHeight: fromCached('minHeight'),
          paddingTop: fromCached('paddingTop'),
          paddingBottom: fromCached('paddingBottom'),
          marginTop: fromCached('marginTop'),
          marginBottom: fromCached('marginBottom')
        },
        1,
        {easing: 'linear'}
      ]
    ]
  }),

  out: velocityHelpers.registerEffect({
    defaultDuration: 300,
    calls: [
      [
        {
          height: cacheProp('height'),
          minHeight: cacheProp('minHeight'),
          paddingTop: cacheProp('paddingTop'),
          paddingBottom: cacheProp('paddingBottom'),
          marginTop: cacheProp('marginTop'),
          marginBottom: cacheProp('marginBottom')
        }
      ]
    ]
  })
};

export const slideUpExpand = {
  in: velocityHelpers.registerEffect({
    defaultDuration: 300,
    calls: [
      [
        {
          height: fromCached('height'),
          minHeight: fromCached('minHeight'),
          paddingTop: fromCached('paddingTop'),
          paddingBottom: fromCached('paddingBottom'),
          marginTop: fromCached('marginTop'),
          marginBottom: fromCached('marginBottom')
        },
        1,
        {easing: 'linear'}
      ]
    ]
  }),

  out: velocityHelpers.registerEffect({
    defaultDuration: 300,
    calls: [
      [
        {
          height: cacheProp('height'),
          minHeight: cacheProp('minHeight'),
          paddingTop: cacheProp('paddingTop'),
          paddingBottom: cacheProp('paddingBottom'),
          marginTop: cacheProp('marginTop'),
          marginBottom: cacheProp('marginBottom')
        }
      ]
    ]
  })
};
function cacheProp(property) {
  return function() {
    this.cache = this.cache || {};
    let currentProp;
    if (property == 'height') {
      currentProp = this.offsetHeight;
    } else {
      currentProp = getComputedStyle(this)[property];
    }
    if (!this.cache[property] && currentProp) {
      this.cache[property] = getComputedStyle(this)[property];
    }
    return 0;
  };
}

function fromCached(property) {
  return function() {
    if (this.cache && this.cache[property]) {
      if (property === 'height' && this.cache[property] === 0) {
        return ['auto', 0];
      } else {
        return [this.cache[property], 0];
      }
    } else {
      if (property == 'height') {
        return this.offsetHeight;
      } else {
        return getComputedStyle(this)[property];
      }
    }
  };
}
