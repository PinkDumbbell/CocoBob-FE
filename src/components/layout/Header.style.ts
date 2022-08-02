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
export const Title = styled.h2`
  font-size: 1.1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  /* identical to box height, or 144% */

  text-align: center;
  letter-spacing: -0.02em;
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
