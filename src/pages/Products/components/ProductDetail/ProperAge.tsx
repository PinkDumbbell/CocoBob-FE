import oldDog from '@/assets/image/old-dog.png';
import growingDog from '@/assets/image/growing-up-dog.png';
import adultDog from '@/assets/image/adult-dog.png';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_age_icon.svg';
import { InfoContainer } from './index.style';
import ProductDetailSection from './ProductDetailSection';

interface IProps {
  age: string;
}

type DogInfoType = {
  [key: string]: {
    name: string;
    age: string;
    color: string;
    img: string;
  };
};

export const DogInfoForAge: DogInfoType = {
  growing: {
    name: '성장기',
    age: '2세 이하의',
    color: '#0A2B52',
    img: growingDog,
  },
  adult: {
    name: '성견',
    age: '2 ~ 7세의',
    color: '#1A70D2',
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
    <ProductDetailSection label="급여 대상">
      <div className="flex flex-col gap-2">
        <p className={`text-p font-medium text-[${DogInfo.color}]`}>{DogInfo.name}</p>
        <InfoContainer>
          <div>
            <p className="text-[14px]">
              이 사료는
              <strong>
                <span
                  className={`text-[${DogInfo.color}] font-semibold`}
                >{` ${DogInfo.age} `}</span>
                반려견
              </strong>
              에게
              <br />
              적합한 사료에요 !
            </p>
          </div>
          <DogIcon fill={DogInfo.color} stroke={DogInfo.color} />
        </InfoContainer>
      </div>
    </ProductDetailSection>
  );
}
