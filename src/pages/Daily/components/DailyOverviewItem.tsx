import { ReactNode } from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const ShadowCard = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const CardContainer = tw(ShadowCard)`
  w-full h-full transition-transform bg-white rounded p-2 flex flex-col items-center justify-center
`;

type DailyOverviewItemProps = {
  title: string;
  children: ReactNode;
  onClick?: () => void;
};
export default function OverviewItem({ title, children, onClick }: DailyOverviewItemProps) {
  return (
    <CardContainer className="w-full h-full p-4" onClick={onClick}>
      <div className="flex flex-col items-center space-y-1">
        <h5 className="font-semibold">{title}</h5>
        {children}
      </div>
    </CardContainer>
  );
}
