import { concatClasses } from '@/utils/libs/concatClasses';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement } from 'react';
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
  label: string | ReactElement;
  onClick?: () => void | Function;
  className?: string;
  disabled?: boolean;
}

type ButtonPropsWithDefaultProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonProps;

export const Button = (props: ButtonPropsWithDefaultProps) => {
  const {
    width = 'small',
    primary = 'first',
    backgroundColor,
    label,
    className,
    disabled,
    type,
    onClick,
  } = props;

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
      onClick={onClick}
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
