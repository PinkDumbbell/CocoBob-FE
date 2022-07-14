import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ChildrenWrapper = styled.div<{ headerShown: boolean }>`
  padding-top: ${({ headerShown }) => (headerShown ? '3rem' : '0')};
  padding-bottom: 3rem;
  height: calc(100% - 3rem);
  width: 100%;
`;
