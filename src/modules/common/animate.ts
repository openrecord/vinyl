import Velocity from 'velocity-animate';

type $VelocityFunction = ((elem: HTMLElement) => any);
type $VelocityEffect = string | Object | $VelocityFunction;

function ensureEffect(eff?: Object | string) {
  if (!eff || (typeof eff == 'object' && Object.keys(eff).length === 0)) {
    return {fake: 'none'};
  } else {
    return eff;
  }
}

function effectIsFunction(eff: $VelocityEffect): eff is $VelocityFunction {
  return typeof eff === 'function';
}

function buildTree(effects: Array<[$VelocityEffect, Object | undefined]>): any {
  if (effects.length) {
    const [[effect, options], ...rest] = effects;
    if (effectIsFunction(effect)) {
      return (node: HTMLElement) => {
        effect(node);
        return Velocity.animate(
          node,
          {height: '100%'},
          {
            duration: 0,
            complete: buildTree(rest)
          }
        );
      };
    }
    return (node: HTMLElement) =>
      Velocity.animate(node, ensureEffect(effect), {
        ...options,
        complete: buildTree(rest)
      });
  }
}

export default function animate(
  effect: $VelocityEffect,
  options: Object | undefined = {},
  _effects: Array<[$VelocityEffect, Object | undefined]> | undefined = [[effect, options]]
) {
  const handle = {
    then(effect: $VelocityEffect, options: Object | undefined) {
      return animate(effect, options, _effects.concat([[effect, options]]));
    },

    on: (selector: string | HTMLElement) => {
      const node =
        typeof selector === 'string' ? (document.querySelector(selector) as HTMLElement) : selector;
      if (node) {
        let tree;
        if ((tree = buildTree(_effects))) {
          tree(node);
        }
      } else {
        setTimeout(handle.on.bind(null, selector), 100);
      }
    }
  };

  return handle;
}
