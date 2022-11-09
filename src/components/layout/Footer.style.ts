import styled, { css } from 'styled-components';
import tw from 'tailwind-styled-components';

export const NavBar = styled.nav`
  background: white;
  width: 100%;
  height: 60px;
  color: #555;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  @media (min-width: 425px) {
    width: 425px;
  }
`;
export const NavBarItem = styled.div<{ current: string }>`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  align-items: center;
  position: relative;

  button > div {
    img {
      height: 24px;
      color: var(--primary-main);
    }

    ${({ current, theme: { colors } }) =>
      css`
        background: ${current === 'true' ? colors.primary.main : 'none'};
        top: ${current === 'true' ? '-20%' : '-5px'};
        border: ${current === 'true' ? '4px solid #fff' : ''};
        box-shadow: ${current === 'true' ? '0px -5px 5px 0px rgb(0 0 0 / 10%)' : ''};
      `}
  }
`;

export const IconButton = tw.button`
  h-full p-1 flex flex-col items-center justify-end border-none w-full 
`;
export const IconWrapper = tw.div`
  flex flex-col items-center justify-center absolute rounded-full w-[44px] h-[44px]
`;
export const ButtonTitle = tw.p<{ current: string }>`
  text-sm
  ${({ current }: { current: string }) => (current === 'true' ? 'text-primary' : 'text-caption')}
`;
