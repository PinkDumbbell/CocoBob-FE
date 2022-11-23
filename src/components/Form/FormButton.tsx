import { useCallback, ReactElement } from 'react';
import { common, FirstStyle } from '@/components/Button/index.style';

interface ButtonProps {
  name: string | ReactElement;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: Function;
  className?: string;
}

export default function FormButton(props: ButtonProps) {
  const { name, disabled, onClick, className } = props;

  const onClickButton = useCallback(() => !disabled && onClick && onClick(), [onClick]);

  const total = [common, FirstStyle];

  if (className) total.push(className);
  total.push(`min-w-full`);

  return (
    <button onClick={onClickButton} className={total.join(' ')} disabled={disabled ?? false}>
      {name}
    </button>
  );
}
