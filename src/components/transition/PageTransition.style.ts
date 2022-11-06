import styled, { css } from 'styled-components';

export const PageTransitionGroup = styled.div<{ timeout?: number; type?: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .container {
    height: 100%;
    position: absolute;
  }

  ${({ timeout = 300, type = 'fade' }) => {
    if (type === 'fade') {
      return css`
        .fade-enter {
          opacity: 0;
        }

        .fade-enter-active {
          opacity: 1;
          transition: opacity ${timeout}ms ease;
        }

        .fade-exit {
          opacity: 1;
        }

        .fade-exit-active {
          opacity: 0;
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
        transition: transform ${timeout}ms ease;
      }
      .slideLeft-exit {
        opacity: 1;
      }
      .slideLeft-exit-active {
        opacity: 0;
      }

      .slideRight-enter {
        z-index: 1;
        transform: translateX(-100%);
      }
      .slideRight-enter-active {
        transform: translateX(0%);
        transition: transform ${timeout}ms ease;
      }
      .slideRight-exit {
        opacity: 1;
        transform: translateX(0%);
      }
      .slideRight-exit-active {
        opacity: 0;
        transform: translateX(0%);
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
  height: 100%;
  width: 100%;
`;
