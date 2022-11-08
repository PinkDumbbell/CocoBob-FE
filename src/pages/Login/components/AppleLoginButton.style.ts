import styled from 'styled-components';

export const ButtonWrap = styled.div`
  width: 100%;

  button {
    display: flex;
    border: none;
    height: 47px;
    width: 100%;
    border-radius: 10px;
    box-shadow: 2px 2px 10px rgb(0 0 0 / 15%);
    font-size: 1rem;

    & svg {
      margin-right: 1rem;
    }

    :hover {
      animation: push 0.2s ease-out forwards;
    }

    :active {
      animation: afterpush 0.2s ease-out forwards;
    }
  }
`;
