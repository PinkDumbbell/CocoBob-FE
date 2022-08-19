import ContentsContainer from '@/components/ContentsContainer';
import { HorizontalBox, HorizontalCenterBox, SectionSubtitle, VerticalBox } from '../index.style';

interface MainContentButtonProps {
  label?: string;
  title: string;
  onClick?: () => void;
}
export default function MainContentButton({ label, title, onClick }: MainContentButtonProps) {
  return (
    <ContentsContainer>
      <div className="flex w-full items-center" onClick={onClick}>
        <HorizontalCenterBox className=" h-full aspect-square p-4">
          <HorizontalCenterBox className="text-3xl rounded-full bg-primary-bright text-white aspect-square w-full">
            +
          </HorizontalCenterBox>
        </HorizontalCenterBox>
        <HorizontalBox className="w-full gap-4 justify-evenly py-2 px-4">
          <VerticalBox className="items-start w-full">
            <p className="text-sm">{label}</p>
            <SectionSubtitle>{title}</SectionSubtitle>
          </VerticalBox>
          <div className="font-bold">{'>'}</div>
        </HorizontalBox>
      </div>
    </ContentsContainer>
  );
}
