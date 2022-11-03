import styled from 'styled-components';
import useAnimation from '@/utils/hooks/useAnimation';
import bone from './assets/bone.json';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const DotLoader = () => {
  const boneAnimation = useAnimation(bone, true, 10, 10);

  return <Container {...boneAnimation}>Hello</Container>;
};

export default DotLoader;
