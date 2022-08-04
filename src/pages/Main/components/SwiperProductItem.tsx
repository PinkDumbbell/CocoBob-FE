import ContentsContainer from '@/components/ContentsContainer';
import { concatClasses } from '@/utils/libs/concatClasses';
import { ReactComponent as LikeIcon } from '@/assets/icon/heart.svg';
import { ReactComponent as WonIcon } from '@/assets/icon/won.svg';
import { theme } from '@/styles/theme';
import { HorizontalBox, VerticalBox, VerticalCenterBox } from '../index.style';

interface SwiperProductItemProps {
  productId: number;
  brand: string;
  path: string;
  name: string;
  price: number;
  isActive: boolean;
  isLiked: boolean;
}
export default function SwiperProductItem({
  productId,
  path,
  brand,
  name,
  price,
  isActive,
  isLiked,
}: SwiperProductItemProps) {
  const onClickLike = () => console.log(productId);
  return (
    <div
      className={concatClasses(
        'relative w-[130px] h-48 transition-transform',
        isActive ? 'scale-110' : 'scale-90',
      )}
    >
      <ContentsContainer>
        <VerticalBox className="flex-1 justify-between relative">
          <button type="button" onClick={onClickLike} className="absolute right-0 top-0">
            <LikeIcon fill={isLiked ? theme.colors.primary.main : '#eeeeee'} />
          </button>
          <VerticalCenterBox className="flex-1 bg-white rounded-md">
            <img src={path} alt={name} />
          </VerticalCenterBox>
          <div>
            <VerticalBox>
              <p className="text-[11px] leading-[11px]">{brand}</p>
              <p className="text-[13px]">{name}</p>
            </VerticalBox>
            <div className="flex justify-between items-center">
              <HorizontalBox className="gap-1">
                <WonIcon />
                <span className="text-sm text-primary-main">{price}</span>
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
