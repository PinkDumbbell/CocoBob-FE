import tw from 'tailwind-styled-components';
import { ReactComponent as petaloglogo } from './assets/Petalog-White.svg';

export const Container = tw.div`
  relative
  mb-0.5
  max-h-[28px]
`;

export const Loading = tw.div`
  absolute
  left-2/4
  top-2/4

  w-1.5
  h-1.5
  rounded-lg
  shadow-smallSpinner
  animate-spin
`;

export const Petalog = tw(petaloglogo)`
  w-1/12
  mx-auto
`;
