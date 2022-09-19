import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const LikeNumber = styled.span`
  font-family: 'Noto Sans KR';
  font-style: bold;
  font-weight: 700;
  font-size: 11px;
  line-height: 20px;
  color: white;
  letter-spacing: -2%;
`;

export const FooterReviewButton = styled.button`
  width: 100%;
  background: #114d91;
  font-family: 'Noto Sans KR';
  font-style: bold;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: white;
  letter-spacing: -2%;
`;

export const ProductDetailFooter = tw.div`
  w-full h-[60px] flex fixed bottom-0
`;

export const FooterLikeContainer = tw.div`
  w-[50px] bg-[#0A2B52] flex flex-col items-center text-center justify-center
`;
export const NutrientInfoContainer = tw.div`
  w-full h-[300px] bg-white flex flex-col mb-[90px]
`;

export const ProductInfoContainer = tw.div`
w-full h-[450px] bg-white rounded-t-xl mt-32 flex flex-col items-center
`;
