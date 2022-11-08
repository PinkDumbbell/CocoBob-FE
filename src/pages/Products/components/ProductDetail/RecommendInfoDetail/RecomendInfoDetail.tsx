import { useCurrentPet } from '@/utils/hooks';
import { RecomendInfoDetailContainer } from '../index.style';

interface IProps {
  title: string;
  isProper: boolean;
}

export default function RecommendInfoDetail(props: IProps) {
  const { title, isProper } = props;
  const { data: currentPet } = useCurrentPet();
  return (
    <>
      {isProper ? (
        <RecomendInfoDetailContainer isProper={true}>
          <span>{title}</span>
          <div>
            <span className="text-[#1A70D2]">{currentPet?.name}</span>
            <span>에게</span>
            <br />
            <b>충분한 영양 공급</b>
            <span>을 해주는</span>
            <br />
            <span>아주 따뜻한 사료에요 !</span>
          </div>
        </RecomendInfoDetailContainer>
      ) : (
        <RecomendInfoDetailContainer isProper={false}>
          <span>{title}</span>
          <div>
            <span className="text-[#1A70D2]">{currentPet?.name}</span>
            <span>에게</span>
            <br />
            <span>중요한</span>
            <b>식이 관리를</b>
            <br />
            <b>도와주기 힘든 </b>
            <span>사료에요 !</span>
          </div>
        </RecomendInfoDetailContainer>
      )}
    </>
  );
}
