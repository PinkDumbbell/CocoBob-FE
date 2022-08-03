import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const StrongTagColor = styled.div`
  strong {
    color: red;
  }
`;

export const RelatedWordContainer = tw(StrongTagColor)`
w-full
h-full
bg-gray-200
flex
flex-col
`;
