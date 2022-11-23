import ProductDetailSection from '../ProductDetailSection';
import RecomendInfoDetail from './RecomendInfoDetail';

interface IProps {
  isPregnant: boolean;
  isObesity: boolean;
}
export default function RecommendInfo(props: IProps) {
  const { isPregnant, isObesity } = props;
  return (
    <ProductDetailSection label="건강상태별 추천">
      <div className="flex gap-2">
        <RecomendInfoDetail isProper={isPregnant} title="임신과 수유" />
        <RecomendInfoDetail isProper={isObesity} title="비만" />
      </div>
    </ProductDetailSection>
  );
}
