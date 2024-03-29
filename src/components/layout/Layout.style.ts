import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ChildrenWrapper = styled.div<{ headerShown?: boolean; footerShown?: boolean }>`
  padding-top: ${({ headerShown }) => (headerShown ? '50px' : '0')};
  padding-bottom: ${({ footerShown }) => (footerShown ? '60px' : '0')};
  height: 100%;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
