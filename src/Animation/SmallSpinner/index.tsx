import { Container, Petalog, Loading } from './index.style';

const SmallSpinner = () => {
  return (
    <Container>
      <Petalog viewBox="-45 -37 150 150" />
      <Loading />
    </Container>
  );
};

export default SmallSpinner;
