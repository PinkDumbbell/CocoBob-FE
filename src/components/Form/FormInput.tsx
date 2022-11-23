import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

import { useVh } from '@/utils/hooks';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  rules?: UseFormRegisterReturn;
  required?: boolean;
  placeholder?: string;
  isError?: boolean | undefined;
  errorMessage?: string;
  unit?: string | ReactNode;
  disabled?: boolean;
  typing?: boolean;
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
  height: 47px;
  padding: 0 0.5rem;
  padding-right: ${({ unit }) => (unit ? '3rem' : '0.5rem')};
  background: white;
  border: 1px solid ${({ isError, theme: { colors } }) => (isError ? colors.error : '#bbbbbb')};
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-borader-radius: 10px;

  ::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    /* identical to box height, or 144% */
    letter-spacing: -0.02em;
    color: #999999;
  }
`;

const UnitText = tw.div`
  font-light border border-secondary-brightest text-sm h-[47px] rounded-r absolute right-0 top-0 flex items-center justify-center w-[3rem]
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
  typing,
}: InputProps) {
  const { setVh } = useVh();
  return (
    <InputContainer>
      <Label htmlFor={name} isError={isError}>
        {label}
      </Label>
      <InputWrapper>
        <InputStyle
          className="focus:outline-none disabled:bg-disabled"
          id={name}
          required={required}
          type={type}
          placeholder={placeholder}
          isError={isError}
          unit={!!unit}
          {...rules}
          disabled={disabled}
          onBlur={setVh}
        />
        {!!unit && (
          <UnitText
            className={typing ? 'text-primary bg-primary-max' : 'text-secondary bg-secondary-max'}
          >
            {unit}
          </UnitText>
        )}
        {errorMessage && (
          <p aria-errormessage={errorMessage} className="text-bad text-caption pt-1">
            {errorMessage}
          </p>
        )}
      </InputWrapper>
    </InputContainer>
  );
}
