import styled from 'styled-components';

export const NoteContents = styled.div`
  overflow-y: auto;
  color: #333333;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 10px;
  }
`;
