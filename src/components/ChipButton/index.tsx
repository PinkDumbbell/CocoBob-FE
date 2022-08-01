import { ChipButtonWrapper } from './index.style';

interface ChipButtonProps {
  content: string;
  theme?: 'primary' | 'black';
  filled?: boolean;
  border?: boolean;
}
export default function ChipButton({
  content,
  theme = 'primary',
  filled,
  border = true,
}: ChipButtonProps) {
  return (
    <ChipButtonWrapper theme={theme} filled={filled} border={border}>
      {content}
    </ChipButtonWrapper>
  );
}
