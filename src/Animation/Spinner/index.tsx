import styled from 'styled-components';
import useAnimation from '@/utils/hooks/useAnimation';
import book from './assets/book.json';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgb(220, 220, 220, 0.3);
  backdrop-filter: blur(3px);
`;

// const Loading = styled.div`
//   width: 0.6rem;
//   height: 0.6rem;
//   border-radius: 0.6em;
//   box-shadow: 28px 0px 0 0 rgba(26, 112, 210, 0.2), 22.7px 16.5px 0 0 rgba(26, 112, 210, 0.4),
//     8.68px 26.6px 0 0 rgba(26, 112, 210, 0.6), -8.68px 26.6px 0 0 rgba(26, 112, 210, 0.8),
//     -22.7px 16.5px 0 0 #1a70d2;
//   animation: spinner 1s infinite linear;

//   @keyframes spinner {
//     to {
//       transform: rotate(360deg);
//     }
//   }
// `;

const BG = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background: #d5e4f77d;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border: 1px solid #f2f8ff3f;

  width: 7rem;
  height: 7rem;

  border-radius: 10px;
`;

const Book = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = () => {
  const bookAnimation = useAnimation(book, true, 10, 10);

  return (
    <Container>
      <BG />
      <Book {...bookAnimation} />
    </Container>
  );
};

export default Spinner;
