import { ChipButtonWrapper } from './index.style';

interface ChipButtonProps {
  content: string;
  theme?: 'primary' | 'black';
  filled?: boolean;
  border?: boolean;
  onClick?: () => void;
}
export default function ChipButton({
  content,
  theme = 'primary',
  filled,
  border = true,
  onClick,
}: ChipButtonProps) {
  return (
    <ChipButtonWrapper theme={theme} $filled={filled} $border={border} onClick={onClick}>
      {content}
    </ChipButtonWrapper>
  );
}
