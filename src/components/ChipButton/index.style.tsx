import tw from 'tailwind-styled-components';

interface ChipButtonWrapperProps {
  $filled: boolean;
  $border: boolean;
  theme: 'primary' | 'black';
}
export const ChipButtonWrapper = tw.div<ChipButtonWrapperProps>`
  cursor-pointer
  px-[20px]
  py-[4px]
  rounded
  w-fit
  font-light
  leading-[20px]
  active:opacity-70
  ${({ $border }: ChipButtonWrapperProps) =>
    $border ? 'border border-primary' : 'border-primary-darkest'}
  ${({ $filled, theme }: ChipButtonWrapperProps) =>
    theme === 'primary'
      ? $filled
        ? 'bg-primary border-primary-darker text-white'
        : 'text-primary'
      : 'text-black border-secondary-brighter'}
`;
