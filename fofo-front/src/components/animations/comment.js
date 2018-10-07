import { keyframes, css } from 'styled-components';

const slideToTop = keyframes`
  from {
    transform: translateY(15px);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export function appear() {
  return css`
    opacity: 0;
    transform: translateY(15px);
    animation: ${slideToTop} 0.5s forwards 0.2s;
  `;
}