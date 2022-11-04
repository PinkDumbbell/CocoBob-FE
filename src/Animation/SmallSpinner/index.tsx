import styled from 'styled-components';
import { ReactComponent as petaloglogo } from './assets/Petalog-White.svg';

const Container = styled.div`
  position: relative;
  margin: 0.3rem 0 0.45rem;
`;

const Loading = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  width: 0.3rem;
  height: 0.3rem;
  border-radius: 0.3rem;
  box-shadow: 12px 0px 0 0 rgba(244, 244, 245, 0.2), 9.7px 7.1px 0 0 rgba(244, 244, 245, 0.4),
    3.7199999999999998px 11.4px 0 0 rgba(244, 244, 245, 0.6),
    -3.7199999999999998px 11.4px 0 0 rgba(244, 244, 245, 0.8),
    -9.7px 7.1px 0 0 rgba(244, 244, 245, 1);
  animation: spinner 1s infinite linear;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Petalog = styled(petaloglogo)`
  width: 5%;
  margin: 0 auto;
`;

const SmallSpinner = () => {
  return (
    <Container>
      <Petalog viewBox="-45 -45 150 150" />
      <Loading />
    </Container>
  );
};

export default SmallSpinner;
