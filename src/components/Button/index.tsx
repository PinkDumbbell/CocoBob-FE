import { concatClasses } from '@/utils/libs/concatClasses';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import {
  common,
  FirstStyle,
  SecondStyle,
  ThirdStyle,
  FourthStyle,
  FifthStyle,
} from './index.style';

interface ButtonProps {
  primary?: 'first' | 'second' | 'third' | 'fourth' | 'etc';
  backgroundColor?: string;
  width?: 'full' | 'small';
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

type ButtonPropsWithDefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonProps;

export const Button = ({
  width = 'small',
  primary = 'first',
  backgroundColor,
  label,
  className,
  disabled,
  type,
  ...props
}: ButtonPropsWithDefaultProps) => {
  const volume = width === 'full' ? 'min-w-full' : 'min-w-sm';
  const totalStyle = [`${volume} ${common}`];
  if (primary === 'first') totalStyle.push(FirstStyle);
  if (primary === 'second') totalStyle.push(SecondStyle);
  if (primary === 'third') totalStyle.push(ThirdStyle);
  if (primary === 'fourth') totalStyle.push(FourthStyle);
  if (primary === 'etc') totalStyle.push(FifthStyle);

  return (
    <button
      {...props}
      className={concatClasses(totalStyle.join(' '), className ?? '')}
      disabled={disabled}
      style={{ backgroundColor }}
      type={type ?? 'button'}
    >
      {label}
    </button>
  );
};

export default Button;
