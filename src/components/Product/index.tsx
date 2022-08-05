import ChipButton from '../ChipButton';

/**
 * 상품 구성 요소
 * - 상품명
 * - 제조사
 * - 가격
 * - AFFCO 만족/불만족
 * - 유아/성견/노견
 */
export default function ProductItem() {
  return (
    <div className="flex w-full h-36 border-b border-gray-200">
      <div className="w-36 h-36 flex justify-center items-center p-1">
        <img
          className="w-full"
          src="https://img.dogpre.com/mobile/dogpre/product/60/59983_originalView_01078322.jpg"
          alt=""
        />
      </div>
      <div className="flex flex-col p-1 justify-center gap-2">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-black font-bold">로얄캐닌 미니 인도어 어덜트 3kg 소화기 건강</h4>
          <p>35,800원</p>
        </div>
        <div className="flex gap-1 items-center">
          <ChipButton content="성견" filled={false} border />
          <ChipButton content="AFFCO" filled />
        </div>
      </div>
    </div>
  );
}
