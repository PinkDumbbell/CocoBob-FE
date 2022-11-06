import { concatClasses } from '@/utils/libs/concatClasses';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

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
  const totalStyle = [
    'max-w-sm py-2 px-10 text-xl font-bold rounded-[10px] text-center',
    `${volume}`,
  ];
  if (primary === 'first')
    totalStyle.push(
      'text-white bg-primary-main hover:bg-gradient-to-tl from-redf to-redt shadow-md',
    );
  if (primary === 'second')
    totalStyle.push(
      'text-primary-main bg-transparent border-2 border-primary-dark hover:border-2 border-primary-light',
    );
  if (primary === 'third') totalStyle.push('text-primary-main bg-white border-2 border-[#dddddd]');
  if (primary === 'fourth') totalStyle.push('text-black bg-white border-2 border-[#efefef]');
  if (primary === 'etc') totalStyle.push('text-[#999999] font-medium underline decoration-1');

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
