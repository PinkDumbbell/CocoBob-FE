import petFood from '@/assets/image/pet-food.png';
import { InfoContainer, MainContainer } from './index.style';

export default function MainIngredient() {
  return (
    <MainContainer color="#1A70D2">
      <h4>주재료</h4>
      <span className="colored">닭고기, 돼지고기 ,...</span>
      <InfoContainer>
        <div>
          <span className="colored">핑크덤벨 </span>
          <span>에게 이 주재료는</span>
          <br />
          <span>알레르기를 </span>
          <b>유발하지 않아요 !</b>
        </div>
        <img src={petFood} />
      </InfoContainer>
    </MainContainer>
  );
}
