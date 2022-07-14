import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  register?: UseFormRegisterReturn;
  required: boolean;
  placeholder?: string;
  isError?: boolean | undefined;
}

const InputContainer = styled.div`
  width: 100%;
  label {
    margin-bottom: 0.5rem;
  }
`;
const Label = styled.label<{ isError: boolean | undefined }>`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ isError }) => (isError ? '#E85354' : '#1d1d1d')};
  padding: 0 0.5rem;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* box-shadow: 0 0 3px #00000029; */
  position: relative;
  border-radius: 4px;
  width: 100%;
`;
const InputStyle = styled.input<{ isError: boolean | undefined }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  padding: 0.75rem 0.5rem;
  border: 1px solid ${({ isError }) => (isError ? '#E85354' : '#EDEDED')};
  border-radius: 8px;
  ::placeholder {
    color: #333333;
    font-size: 16px;
    line-height: 23px;
    letter-spacing: -0.02em;
  }
`;

export default function Input({
  label,
  name,
  register,
  type,
  required,
  placeholder,
  isError,
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
          {...register}
          isError={isError}
          data-testid={name}
        />
      </InputWrapper>
    </InputContainer>
  );
}
