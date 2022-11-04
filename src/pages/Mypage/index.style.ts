import tw from 'tailwind-styled-components';

export const Form = tw.form`
  pb-16 flex flex-col gap-4 relative w-full
`;

export const FlexColumn = tw.div`
  flex flex-col
`;
export const FlexColumnCenter = tw(FlexColumn)`
  justify-center items-center
`;

export const EditProfileLabel = tw.label`
  z-1 right-0 absolute opacity-4 bottom-1 bg-white flex justify-center items-center border border-gray-400 rounded-full w-8 h-8 
`;
export const RemoveProfileButton = tw.button`
  left-0 absolute opacity-4 bottom-1 bg-white flex justify-center items-center border border-gray-400 rounded-full w-8 h-8 
`;

export const AgeSelectButton = tw.button`
  text-left p-1 border rounded-md text-sm
`;
export const AgeDescription = tw.p`
text-primary-bright flex gap-2 items-center
`;

export const SexTypeContainer = tw.div`
  flex gap-1 items-center mb-2
`;
export const SexTypeButton = tw.div`
  flex-1 text-center w-1/2
`;
export const SexTypeLabel = tw.label`
  border border-primary-main rounded-md w-full block
`;

export const SaveButtonContainer = tw.div`
  p-3 fixed mx-auto bottom-0 w-full max-w-[425px] bg-white rounded-t-lg left-1/2 -translate-x-[50%]
`;

export const MainContentsContainer = tw.div`
  h-full w-full flex flex-col bg-gray-100 gap-4 py-2
`;

export const MypageMenuItem = tw.div`
p-4 border-b border-gray-200
`;
export const MainTitleWrapper = tw.div`
py-6
`;

export const MainPetListContainer = tw.div`
 w-full flex items-center overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-4 px-1 h-32
`;
export const MainPetListItem = tw.div`
  flex w-60 h-28 p-4 rounded-lg border items-center gap-3 shadow-gray-300 shadow-md cursor-pointer
`;
