import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  height: calc(100% - 1rem);
  width: calc(100% - 1rem);
  background: white;
  padding: 0.5rem;

  h1 {
    margin-bottom: 5rem;
  }
`;
export const ItemsCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;
