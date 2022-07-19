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

  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 29px;
    letter-spacing: -0.02em;
    text-align: center;
    letter-spacing: -0.02em;
    color: #fefefe;
    /* Text/White */

    color: #fefefe;
  }

  &:active {
    opacity: 0.8;
  }
`;
export default function FormButton(props: ButtonProps) {
  const { name, disabled } = props;
  return (
    <FormButtonContainer disabled={disabled}>
      <h3>{name}</h3>
    </FormButtonContainer>
  );
}
