interface ButtonProps {
  primary?: 'first' | 'second' | 'third' | 'fourth' | 'etc';
  backgroundColor?: string;
  size?: 'full' | 'small';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  size = 'small',
  primary = 'first',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const volume = size === 'full' ? 'min-w-full' : 'min-w-sm';
  const totalStyle = [
    'max-w-sm py-2 px-10 text-xl font-bold rounded-[10px] text-center',
    `${volume}`,
  ];
  if (primary === 'first')
    totalStyle.push('text-white bg-[#EA5758] hover:bg-gradient-to-tl from-redf to-redt shadow-md');
  if (primary === 'second')
    totalStyle.push(
      'text-[#EA5758] bg-transparent border-2 border-[#EA5758] hover:border-2 border[#e8c2c2]',
    );
  if (primary === 'third') totalStyle.push('text-[#EA5758] bg-white border-2 border-[#dddddd]');
  if (primary === 'fourth') totalStyle.push('text-black bg-white border-2 border-[#efefef');
  if (primary === 'etc') totalStyle.push('text-[#999999] font-medium underline decoration-1');

  return (
    <button type="button" className={totalStyle.join(' ')} style={{ backgroundColor }} {...props}>
      {label}
    </button>
  );
};

export default Button;
