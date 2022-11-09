import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { theme } from '@/styles/theme';

const StrongTagColor = styled.div`
  strong {
    color: ${theme.colors.primary.lightdark};
  }
`;

export const RelatedSearchKeywordContainer = tw(StrongTagColor)`
w-full
h-full
bg-gray-200
flex
flex-col
`;
