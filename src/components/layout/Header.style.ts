import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  padding: 0 16px;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  color: #222;
  background: white;
  z-index: 9999;
`;
export const HeaderContents = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #eee;
`;
export const TitleWrapper = styled.div<{ isBigProfileHide: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  & > img {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    border: 1px solid ${({ theme: { colors } }) => colors.primary.main};
    position: absolute;
    left: calc(50% - 1rem);
    opacity: ${({ isBigProfileHide }) => (isBigProfileHide ? 1 : 0)};
    transform: ${({ isBigProfileHide }) => (isBigProfileHide ? 'scale(1)' : 'scale(0)')};
    transition: all 200ms ease-in-out;
  }
`;
export const ProfileWrapper = styled.div<{ isSmall: boolean }>`
  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  transform: ${({ isSmall }) => (isSmall ? 'scale(0)' : 'scale(1)')};
  opacity: ${({ isSmall }) => (isSmall ? 0 : 1)};
  transition: all 200ms ease-in-out;
`;
export const Title = styled.h2<{ isHide: boolean }>`
  font-size: 1.1rem;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  /* identical to box height, or 144% */

  letter-spacing: -0.02em;
  transform: ${({ isHide }) => (isHide ? 'scale(0)' : 'scale(1)')};
  opacity: ${({ isHide }) => (isHide ? 0 : 1)};
  transition: all 200ms ease-in-out;
`;
export const LeftMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: absolute;
  left: 16px;
`;
export const RightMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: absolute;
  right: 16px;
`;
export const BackButton = styled.button`
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
`;

export const SideMenuWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 12rem;
  height: 100vh;
  padding: 1rem;
  background: white;
  transition: transform 200ms ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
`;
