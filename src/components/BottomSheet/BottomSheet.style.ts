import tw from 'tailwind-styled-components';

export const BottomSheetContentWrapper = tw.div`
  p-4 flex flex-col gap-2
`;
export const Title = tw.h4`
  text-lg font-bold
`;
export const Description = tw.p`
  text-md
`;

export const SelectDateWrapper = tw.div`
  py-3 w-full flex  items-center justify-center gap-3
`;
export const DatePicker = tw.input`
  text-gray-600 relative w-full text-center bg-primary-light rounded-md text-md py-1
`;

export const BreedListContainer = tw.div`
  h-[50vh] px-2 py-3 overflow-y-scroll
`;
