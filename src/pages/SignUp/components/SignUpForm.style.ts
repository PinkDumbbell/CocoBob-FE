import styled from 'styled-components';

export const SignUpButton = styled.button`
  background: #e5ab64;
  border: none;
  color: white;
  width: 16rem;
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  div {
    margin-bottom: 1rem;
  }
`;
export const FormInput = styled.input`
  width: 80%;
  height: 2rem;
  font-size: 1rem;
  padding: 0;
`;
export const FormLabel = styled.label`
  color: blueviolet;
`;
export const ErrorMessage = styled.span`
  color: red;
`;
