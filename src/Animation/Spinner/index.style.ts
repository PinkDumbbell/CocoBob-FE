import tw from 'tailwind-styled-components';

export const Container = tw.div`
  absolute
  left-2/4
  top-2/4
  -translate-x-2/4
  -translate-y-2/4

  w-screen
  h-screen
  bg-[rgba(220,220,220,0.3)]
  backdrop-blur-sm
`;

export const BG = tw.div`
  absolute
  left-2/4
  top-2/4
  -translate-x-2/4
  -translate-y-2/4

  bg-[#d5e4f77d]
  backdrop-blur-md

  border-2
  border-[#f2f8ff3f]
  rounded-xl

  w-28
  h-28`;

export const Book = tw.div`
  absolute
  left-2/4
  top-2/4
  -translate-x-2/4
  -translate-y-2/4
`;
