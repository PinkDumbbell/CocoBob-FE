import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  height: 100%;

  h3 {
    margin-bottom: 1.125rem;
  }
`;
export const QuestionWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

export const QuestionText = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 600;
  font-size: 1.2rem;
`;
export const SubQuestionText = styled.p`
  font-weight: 500;
  font-size: 0.9rem;
  color: #555;
`;
export const PetNameHighlight = tw.span`
  text-primary-900
  font-bold
  bg-primary-100
  px-1
  border-b-primary-900
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
