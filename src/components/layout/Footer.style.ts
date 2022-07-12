import styled from 'styled-components';

export const NavBar = styled.nav`
  background: white;
  width: 100%;
  height: 3rem;
  color: #555;
  border-top: 1px solid #eee;
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
`;
export const NavBarItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  align-items: center;

  button {
    color: #666;
    font-size: 0.75rem;
    width: 100%;
    height: 100%;
    border: none;
    background: white;
  }
`;
