import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  height: 100%;
`;
export const QuestionWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

export const QuestionText = styled.h3`
  /* H3/H3 Bold */

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  /* identical to box height, or 145% */

  letter-spacing: -0.02em;
`;
export const SubQuestionText = styled.p`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  /* identical to box height, or 154% */

  letter-spacing: -0.02em;
`;
export const PetNameHighlight = tw.span`
  font-bold
  text-primary
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.2rem;
`;
export const PrevPageButton = styled.button`
  color: #555;
  font-size: 0.9rem;
  border: none;
  background: none;
`;
export const Button = styled.button`
  border-radius: 8px;
  width: 100%;
  height: 3rem;
  border: none;
  background: #ffcc70;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
`;

const StyledForm = styled.form`
  input[type='file'] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;
export const Form = tw(StyledForm)`
  h-full
  flex
  flex-col
  justify-between
`;
export const SkipButton = tw.button`
  font-gray-600;
  decoration-gray-400
  underline
  underline-offset-4
  text-center
  leading-[20px]
  text-[14px]
  text-caption
`;
