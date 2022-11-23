import styled from 'styled-components';
import tw from 'tailwind-styled-components';

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

export const PageContainer = tw.div`
  w-full h-full p-4 flex flex-col gap-4
`;
export const TitleSection = tw.div`
  w-full
`;
export const MainSection = tw.div`
  flex-1 w-full h-full flex flex-col gap-1
`;
export const TextArea = tw.textarea`
  p-2 rounded border border-gray-200 w-full h-full resize-none
`;

export const BottomSection = tw.div`
  h-28 w-full flex
`;
export const ImagesContainer = tw.div`
  flex-1 flex items-center
`;
export const ImageWrapper = tw.div`
border border-gray-500 w-full h-full rounded flex items-center justify-center overflow-hidden
`;
export const ImageContainerColumn = tw.div`
  w-1/4 aspect-square p-1
`;
export const AddImageButton = tw.button`
  border border-gray-500 border-dashed  w-full h-full rounded flex items-center justify-center
`;
