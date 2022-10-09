import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  rules?: UseFormRegisterReturn;
  required?: boolean;
  placeholder?: string;
  isError?: boolean | undefined;
  errorMessage?: string;
  unit?: string;
  disabled?: boolean;
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
export const InputStyle = styled.input<{ isError: boolean | undefined; unit?: boolean }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 46px;
  padding: 0 0.5rem;
  padding-right: ${({ unit }) => (unit ? '3rem' : '0.5rem')};
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

const UnitText = tw.div`
  font-light text-gray-500 text-sm bg-slate-100 h-[46px] rounded-r-[10px] absolute right-0 top-0 flex items-center justify-center w-[3rem]
`;

export default function Input({
  label,
  name,
  rules,
  type,
  unit,
  required,
  placeholder,
  disabled,
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
          unit={!!unit}
          {...rules}
          disabled={disabled}
        />
        {!!unit && <UnitText>{unit}</UnitText>}
        {errorMessage && (
          <p aria-errormessage={errorMessage} className="text-red-500 text-sm pt-1">
            {errorMessage}
          </p>
        )}
      </InputWrapper>
    </InputContainer>
  );
}
