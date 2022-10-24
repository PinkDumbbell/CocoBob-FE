import { ProductRecommendInfoContainer } from '../index.style';
import RecomendInfoDetail from './RecomendInfoDetail';

interface IProps {
  isPregnant: boolean;
  isObesity: boolean;
}
export default function RecommendInfo(props: IProps) {
  const { isPregnant, isObesity } = props;
  return (
    <ProductRecommendInfoContainer>
      <h4>건강상태별 추천</h4>
      <div>
        <RecomendInfoDetail isProper={isPregnant} title="임신과 수유" />
        <RecomendInfoDetail isProper={isObesity} title="비만" />
      </div>
    </ProductRecommendInfoContainer>
  );
}
