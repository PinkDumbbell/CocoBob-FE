interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'full' | 'small';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  size = 'full',
  primary = false,
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-grey';
  const volume = size === 'full' ? 'min-w-full' : 'min-w-sm';

  return (
    <button
      type="button"
      className={[
        'max-w-sm py-3 px-8 font-bold rounded-lg shadow-md text-center',
        `${volume} ${mode}`,
      ].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
