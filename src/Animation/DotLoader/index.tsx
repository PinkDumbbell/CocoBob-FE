import styled from 'styled-components';
import useAnimation from '@/utils/hooks/useAnimation';
import bone from './assets/bone.json';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
  z-index: 2000;
`;

const DotLoader = () => {
  const boneAnimation = useAnimation(bone, true, 15, 15);

  return <Container {...boneAnimation}></Container>;
};

export default DotLoader;
