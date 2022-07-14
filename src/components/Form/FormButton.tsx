import styled from 'styled-components';

interface ButtonProps {
  name: string;
  disabled: boolean;
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
  const { name, disabled } = props;
  return <FormButtonContainer disabled={disabled}>{name}</FormButtonContainer>;
}
