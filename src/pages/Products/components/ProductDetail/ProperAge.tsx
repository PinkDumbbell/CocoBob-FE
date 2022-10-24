import oldDog from '@/assets/image/old-dog.png';
import growingDog from '@/assets/image/growing-up-dog.png';
import adultDog from '@/assets/image/adult-dog.png';
import { InfoContainer, MainContainer } from './index.style';

interface IProps {
  age: string;
}

export const DogInfoForAge: any = {
  growing: {
    name: '성장기',
    age: '2세 이하의',
    color: '#0A2B52',
    img: growingDog,
  },
  adult: {
    name: '성견',
    age: '2 ~ 7세의',
    color: '##1A70D2',
    img: adultDog,
  },
  old: {
    name: '노령기',
    age: '7세 이상의',
    color: '#D27C1A',
    img: oldDog,
  },
};

export default function ProperAge(props: IProps) {
  const { age } = props;
  const DogInfo = DogInfoForAge[age];
  return (
    <MainContainer color={DogInfo.color}>
      <h4>급여 대상</h4>
      <span className="colored">{DogInfo.name}</span>
      <InfoContainer>
        <div>
          <span>이 사료는 </span>
          <span className="colored">{DogInfo.age} </span>
          <b>반려견</b>
          <span>에게</span>
          <br />
          <span>적합한 사료에요 !</span>
        </div>
        <img className="w-[64px] h-[70px]" src={DogInfo.img} />
      </InfoContainer>
    </MainContainer>
  );
}
