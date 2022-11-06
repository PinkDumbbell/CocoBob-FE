import { ReactNode } from 'react';
import ContentsContainer from '@/components/ContentsContainer';
import ArrowIcon from '@/assets/icon/go_back_btn.png';
import { HorizontalBox, HorizontalCenterBox, SectionSubtitle, VerticalBox } from '../index.style';

interface MainContentButtonProps {
  label?: string;
  title: string;
  onClick?: () => void;
  icon?: ReactNode;
}
export default function MainContentButton({ label, title, onClick, icon }: MainContentButtonProps) {
  return (
    <ContentsContainer className="p-2">
      <div className="flex w-full h-16 items-center cursor-pointer" onClick={onClick}>
        <HorizontalCenterBox className="ml-4 p-1">
          <HorizontalCenterBox className="rounded-full bg-white text-white aspect-square w-full">
            {icon}
          </HorizontalCenterBox>
        </HorizontalCenterBox>
        <HorizontalBox className="w-full gap-4 justify-evenly py-2 px-4">
          <VerticalBox className="items-start w-full">
            <p className="text-sm">{label}</p>
            <SectionSubtitle>{title}</SectionSubtitle>
          </VerticalBox>
          <div className="font-bold">
            <img src={ArrowIcon} alt="enter-icon-image" className="rotate-180" />
          </div>
        </HorizontalBox>
      </div>
    </ContentsContainer>
  );
}
