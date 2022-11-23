import tw from 'tailwind-styled-components';

export const PageContainer = tw.div`
	flex flex-col space-y-4 w-full py-2
`;

export const ContentSection = tw.section`
	px-4 py-2 space-y-4
`;

export const MainContentSection = tw(ContentSection)`
relative flex flex-col gap-11 w-full
`;
export const DoctorImageWrapper = tw.div`
	absolute top-4 right-0 left-0 overflow-hidden
`;

export const VerticalBox = tw.div`
	flex flex-col
`;
export const VerticalCenterBox = tw(VerticalBox)`
	items-center
	justify-center
	flex-2 bg-white rounded
`;
export const HorizontalBox = tw.div`
	flex items-center
`;
export const HorizontalCenterBox = tw(HorizontalBox)`
	justify-center
`;

export const SectionTitle = tw.h3`
	font-bold
`;
export const SectionSubtitle = tw.p`
	font-semibold
`;
export const HighlightText = tw.span`
	text-primary
`;
