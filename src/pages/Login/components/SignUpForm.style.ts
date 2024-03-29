import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.75rem;
`;

export const SignUpFooter = tw.div`
  text-caption
  flex
  gap-3
  pt-4
`;

export const SignUpFooter2 = styled.div`
  padding: 1rem 0;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #333333;
  align-self: center;
  a {
    margin-left: 0.5rem;
    color: ${({ theme: { colors } }) => colors.primary.main};
  }
`;

export const EmailInputWrapper = tw.div`
  flex items-center w-full gap-2
`;
export const EmailInputStyle = tw.div`w-10/12`;
export const EmailCheckButtonWrapper = tw.div`w-2/12 h-12 flex justify-center items-center pt-7`;
export const EmailChecked = tw.div`h-12 w-12 bg-green-400 text-white flex items-center justify-center text-2xl rounded-full`;
export const CheckEmailButton = tw.button`h-12 w-12 border border-primary-main rounded-full `;
