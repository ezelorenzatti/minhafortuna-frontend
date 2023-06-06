import styled, {keyframes} from "styled-components";

interface IContainerProps {
    color:string;
}

const animate = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const Container = styled.div<IContainerProps>`
  width: 32%;
  height: 260px;

  margin: 10px 0;

  background-color: ${props => props.color};
  color: ${props => props.theme.colors.white};

  border-radius: 7px;
  padding: 10px 20px;

  position: relative;
  overflow: hidden;

  > img {
    height: 110%;

    position: absolute;
    top: -10px;
    right: -30px;

    opacity: .3;
  }

  > span {
    font-size: 18px;
    font-weight: 500;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
  }
  
  animation: ${animate} .5s;

  @media (max-width: 770px) {
    width: 48%;
    > span {
      font-size: 14px;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 22px;

      > strong {
        display: inline-block;
        font-size: 14px;
        width: 100%;
      }
    }

    @media (max-width: 420px) {
      width: 100%;

      > h1 {
        display: flex;
        font-size: 24px;
        
        > strong {
          position: initial;
          width: auto;
          font-size: 22px;
        }

        > strong::after {
          display: inline-block;
          content: ' ';
          width: 1px;
        }
      }
    }
`;

