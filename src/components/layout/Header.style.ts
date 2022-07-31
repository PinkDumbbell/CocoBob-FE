import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  color: #222;
  background: white;
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
export const LeftMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: absolute;
  left: 0.5rem;
`;
export const BackButton = styled.button`
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;
