import { useNavigate } from 'react-router-dom';
import ContentsContainer from '@/components/ContentsContainer';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ReactComponent as LikeIcon } from '@/assets/icon/heart.svg';
import { ReactComponent as WonIcon } from '@/assets/icon/won.svg';
import { theme } from '@/styles/theme';
import { ProductPreviewType } from '@/@type/product';
import { HorizontalBox, VerticalBox, VerticalCenterBox } from '../index.style';

interface SwiperProductItemProps {
  product: ProductPreviewType;
  isActive: boolean;
}

export default function SwiperProductItem({ product, isActive }: SwiperProductItemProps) {
  const navigate = useNavigate();
  const { name, brand, productId, thumbnail, price, userLike } = product;
  const onClickLike = () => console.log(productId);
  const goProductDetailPage = () => navigate(`/products/${productId}`);
  return (
    <div
      className={concatClasses(
        'relative w-[130px] h-48 transition-transform',
        isActive ? 'scale-110' : 'scale-90',
      )}
    >
      <ContentsContainer>
        <VerticalBox className="flex-1 justify-between relative overflow-hidden text-ellipsis whitespace-nowrap">
          <button type="button" onClick={onClickLike} className="absolute right-0 top-0">
            <LikeIcon fill={userLike ? theme.colors.primary.main : '#eeeeee'} />
          </button>
          <VerticalCenterBox className="flex-2 bg-white rounded-md" onClick={goProductDetailPage}>
            <img src={thumbnail} alt={name} />
          </VerticalCenterBox>
          <div className="flex flex-col flex-1 justify-between">
            <VerticalBox className="overflow-hidden py-1" onClick={goProductDetailPage}>
              <p className="text-[11px] leading-[11px]">{brand}</p>
              <p className="text-[12px] leading-[12px] w-full whitespace-pre-line">
                {`${name.slice(0, 28)}${name.length > 28 ? '...' : ''}`}
              </p>
            </VerticalBox>
            <div className="flex justify-between items-center">
              <HorizontalBox className="gap-1">
                <WonIcon />
                <span className="text-sm text-primary-main">{price.toLocaleString('ko-KR')}</span>
              </HorizontalBox>
              <span className="flex justify-center items-center bg-primary-main text-white rounded-full w-4 h-4">
                +
              </span>
            </div>
          </div>
        </VerticalBox>
      </ContentsContainer>
    </div>
  );
}
