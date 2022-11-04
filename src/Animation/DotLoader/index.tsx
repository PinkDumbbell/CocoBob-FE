import useAnimation from '@/utils/hooks/useAnimation';
import bone from './assets/bone.json';
import { Container } from './index.style';

const DotLoader = () => {
  const boneAnimation = useAnimation(bone, true, 15, 15);

  return <Container {...boneAnimation}></Container>;
};

export default DotLoader;
