import styled, { css } from 'styled-components';

export const PageTransitionGroup = styled.div<{ timeout: number; type: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    height: 100%;
  }

  ${({ timeout = 300, type = 'scale' }) => {
    if (type === 'scale') {
      return css`
        .scale-enter {
          opacity: 0;
          transform: scale(1.1);
        }

        .scale-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity ${timeout}ms, transform ${timeout}ms;
        }

        .scale-exit {
          opacity: 1;
          transform: scale(1);
        }

        .scale-exit-active {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity ${timeout}ms, transform ${timeout}ms;
        }
      `;
    }

    return css`
      .slideLeft-enter {
        z-index: 1;
        transform: translateX(100%);
      }
      .slideLeft-enter-active {
        transform: translateX(0%);
        transition: opacity ${timeout}ms, transform ${timeout}ms;
      }
      .slideLeft-exit {
        opacity: 1;
      }
      .slideLeft-exit-active {
        opacity: 0;
        transition: opacity ${timeout}ms;
      }

      .slideRight-enter {
        z-index: 1;
        transform: translateX(-100%);
      }
      .slideRight-enter-active {
        transform: translateX(0%);
        transition: opacity ${timeout}ms, transform ${timeout}ms;
      }
      .slideRight-exit {
        opacity: 1;
        transform: translateX(0%);
      }
      .slideRight-exit-active {
        opacity: 0;
        transform: translateX(0%);
        transition: opacity ${timeout}ms;
      }
    `;
  }}
`;

export const PageTransitionWrapper = styled.div`
  backface-visibility: hidden;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;
