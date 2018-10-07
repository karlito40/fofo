import { keyframes, css } from 'styled-components';

export function slideAnimation(transformOptions, cssAnimation = '') {
  const [from, to] = getSlideTransform(transformOptions)
  return css`
    transform: ${from.join(' ')};
    animation: ${createSlideKeyframes(from, to)} ${cssAnimation};
  `;
}

function getSlideTransform(transformOptions) {
  const fromTransform = [];
  const toTransform = [];
  
  for(const [dir, amount] of Object.entries(transformOptions)) {
    fromTransform.push(`translate${dir.toUpperCase()}(${amount})`);
    toTransform.push(`translate${dir.toUpperCase()}(0)`);
  }

  return [fromTransform, toTransform];
}


function createSlideKeyframes(fromTransform, toTransform) {
  return keyframes`
    from {
      transform: ${fromTransform.join(' ')};
    }

    to {
      transform: ${toTransform.join(' ')};
    }
  `;
}