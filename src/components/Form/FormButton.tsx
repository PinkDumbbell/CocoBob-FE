import { useCallback } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  name: string;
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: Function;
}

const FormButtonContainer = styled.button<{ disabled: boolean }>`
  background: #e85354;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: none;
  color: #fefefe;
  width: 100%;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 20px;
  line-height: 29px;
  letter-spacing: -0.02em;

  &:active {
    opacity: 0.8;
  }
`;
export default function FormButton(props: ButtonProps) {
  const { name, disabled, onClick } = props;

  const onClickButton = useCallback(() => onClick && onClick(), [onClick]);

  return (
    <FormButtonContainer onClick={onClickButton} disabled={disabled}>
      {name}
    </FormButtonContainer>
  );
}
