import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const LikeNumber = styled.h3`
  font-family: Noto Sans KR;
  width: 73px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  line-height: 27px;
  letter-spacing: -0.02em;
  text-align: center;
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
export const ProductDescriptionContainer = styled.div`
  background: white;
  h4 {
    margin-left: 20px;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: 700;
    line-height: 50px;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

export const AAFCOInfoContainer = styled.div`
  & {
    position: absolute;
    padding: 20px;
    width: 358px;
    height: 200px;

    margin-left: auto;
    margin-right: auto;
    left: 0px;
    right: 0px;
    border-radius: 10px;
    margin-top: -245px;
    background-color: #dcdcdc;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -12px;
    right: 130px;
    border-top: 12px solid #dcdcdc;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
  }
`;

export const ProductDetailMainContainer = styled.div`
  /* & > div:after {
    content: '';
    display: block;
    width: 100%;
    height: 10px;
    background-color: #f2f2f2;
  } */
`;

export const ProductDetailSimpleInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 110px;
  width: 76px;
  left: 16px;
  top: 340px;
  border-radius: 10px;
  border: 1px solid #1a70d2;
  overflow: hidden;
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & > span {
      font-family: Noto Sans KR;
      font-size: 13px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
`;

export const ProductImgWrapper = styled.div`
  box-shadow: 2px 2px 10px 0px #00000026;
  width: 160px;
  height: 160px;
  margin-top: -5rem;
  margin-bottom: 20px;
  border-radius: 10px;
`;

export const ProductDetailFooter = tw.div`
  w-full h-[60px] flex fixed bottom-0 max-w-[425px]
`;

export const FooterLikeContainer = tw.button`
  w-full bg-[#0A2B52] flex items-center text-center justify-center
`;
export const NutrientInfoContainer = tw.div`
  w-full h-[400px] bg-white flex flex-col
`;

export const ProductInfoContainer = tw.div`
  w-full h-[300px] bg-white rounded-t-xl mt-32 flex flex-col items-center
`;

export const RecomendInfoDedtail = tw.div<{ isGood: boolean }>`
  w-[170px] h-[94px] rounded-[10px] bg-[${(isGood: boolean) => (isGood ? '#F2F8FF' : '#F2F2F2')}]
`;

export const BrComponent = tw.div`
  w-full h-[10px] bg-[#f2f2f2]
`;
