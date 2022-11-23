import useAnimation from '@/utils/hooks/useAnimation';
import book from './assets/book.json';
import { Container, BG, Book } from './index.style';

const Spinner = () => {
  const bookAnimation = useAnimation(book, true, 7, 7);

  return (
    <Container>
      <BG />
      <Book {...bookAnimation} />
    </Container>
  );
};

export default Spinner;
