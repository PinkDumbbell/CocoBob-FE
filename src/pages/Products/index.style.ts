import styled from 'styled-components';
import tw from 'tailwind-styled-components';

export const LikeNumber = tw.p`
  text-[16x]
  text-white
  font-medium
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
  background: #00000029;
  width: 100vw;
  heigth: 100vh;
  margin: 0 auto;
  max-width: 425px;
  z-index: 9000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    background: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    border-radius: 10px;

    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const ProductImgWrapper = tw.div`
  z-50
  flex items-center justify-center
  rounded
  overflow-hidden
  absolute
  w-[160px]
  h-[160px]
  shadow-main
  top-0
  -translate-y-[calc(80px+1rem)]
`;

export const ProductDetailFooter = tw.div`
  w-full h-[60px] flex fixed bottom-0 max-w-[425px]
`;

export const FooterLikeContainer = tw.button`
  w-full bg-primary-dark flex items-center text-center justify-center gap-3 h-full
`;

export const ProductInfoContainer = tw.div`
  w-full bg-white rounded-t-xl flex flex-col items-center z-0 relative gap-1.5 translate-y-48 relative pt-20
`;
