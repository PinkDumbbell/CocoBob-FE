import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  rules?: UseFormRegisterReturn;
  required?: boolean;
  placeholder?: string;
  isError?: boolean | undefined;
  errorMessage?: string;
}

const InputContainer = styled.div`
  width: 100%;
  label {
    margin-bottom: 0.5rem;
  }
`;
export const Label = styled.label<{ isError: boolean | undefined }>`
  display: block;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${({ isError, theme: { colors } }) => (isError ? colors.error : '#1d1d1d')};
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  width: 100%;
`;
export const InputStyle = styled.input<{ isError: boolean | undefined }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 46px;
  padding: 0 0.5rem;
  background: #fffdfd;
  border: 1px solid ${({ isError, theme: { colors } }) => (isError ? colors.error : '#EDEDED')};
  border-radius: 10px;

  ::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    /* identical to box height, or 144% */
    letter-spacing: -0.02em;
    color: #999999;
  }

  :focus {
    outline: 1px solid #1d1d1d;
  }
`;

export default function Input({
  label,
  name,
  rules,
  type,
  required,
  placeholder,
  isError,
  errorMessage,
}: InputProps) {
  return (
    <InputContainer>
      <Label htmlFor={name} isError={isError}>
        {label}
      </Label>
      <InputWrapper>
        <InputStyle
          id={name}
          required={required}
          type={type}
          placeholder={placeholder}
          isError={isError}
          {...rules}
        />
        {errorMessage && (
          <p aria-errormessage={errorMessage} className="text-red-500 text-sm pt-1">
            {errorMessage}
          </p>
        )}
      </InputWrapper>
    </InputContainer>
  );
}
