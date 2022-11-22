import styled from 'styled-components';

export const ProductRecommendInfoContainer = styled.div`
  background-color: white;
  height: 192px;
  padding: 1.25rem;
  & > div {
    width: 100%;
    display: flex;
  }
`;

export const RecomendInfoDetailContainer = styled.div<{ isProper: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > span {
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 23px;
    width: 170px;
    letter-spacing: -0.02em;
    margin-top: 5px;
    margin-bottom: 10px;
    text-align: left;
    color: ${(isProper) => (isProper ? '#1A70D2' : '#B3B3B3')};
  }
`;

export const MainContainer = styled.div<{ color: string }>`
  background-color: white;
  padding: 20px 16px 20px 16px;
  h4 {
    font-family: Noto Sans KR;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.02em;
    text-align: left;
    margin-bottom: 5px;
  }
  & > span {
    font-family: Noto Sans KR;
    font-size: 16px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: -0.02em;
    text-align: left;
  }
  span.colored {
    color: ${({ color: string }) => string};
  }
`;

export const FeedRecommendContainer = styled.div`
  width: 100%;
  background-color: white;
  padding: 20px 0px 20px 16px;
  height: 350px;
  & > div {
    padding: 10px;
    width: 100%;
    height: 100%;
    margin-top: 20px;
    overflow: auto;
    display: flex;
    & > div {
      width: 100%;
      margin-right: 50px;
      & > div {
        width: 130px;
      }
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    height: 63px;
    width: 264px;
    border-radius: 10px;
    padding: 10px;
    background-color: #f2f8ff;
  }
`;
