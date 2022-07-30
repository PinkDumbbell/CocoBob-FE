/* eslint-disable no-nested-ternary */
import tw from 'tailwind-styled-components';

interface ChipButtonWrapperProps {
  filled: boolean;
  border: boolean;
  theme: 'primary' | 'black';
}
export const ChipButtonWrapper = tw.div<ChipButtonWrapperProps>`
  px-[20px]
  rounded-[10px]
  w-fit
  font-light
  leading-[20px]
  text-[13px]
  ${({ border }: ChipButtonWrapperProps) => (border ? 'border border-primary-900' : 'border-none')}
  ${({ filled, theme }: ChipButtonWrapperProps) =>
    theme === 'primary'
      ? filled
        ? 'bg-primary-900 border-[#114786] text-white'
        : 'text-primary-900'
      : 'text-gray-400 border-gray-400'}
`;
