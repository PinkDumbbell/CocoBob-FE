import tw from 'tailwind-styled-components';

export const Container = tw.div`
  fixed
  top-0
  
  w-screen
  h-screen
  max-w-full
  bg-white
  bg-opacity-60
  backdrop-blur-sm
  z-[9000]
`;

export const BG = tw.div`
  absolute
  left-2/4
  top-2/4
  -translate-x-2/4
  -translate-y-2/4

  bg-dim-blue
  backdrop-blur-md

  border-2
  border-[#f2f8ff3f]
  rounded

  w-28
  h-28
  `;

export const Book = tw.div`
  absolute
  left-2/4
  top-2/4
  -translate-x-2/4
  -translate-y-2/4
`;
