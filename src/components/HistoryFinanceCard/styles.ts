import styled, {keyframes} from "styled-components";

interface ITagProps {
    color: string;
}

const animate = keyframes`
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  50% {
    opacity: .3;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`;

export const Container = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  border-radius: 5px;
  margin: 10px 0;
  padding: 12px 10px;
  transition: all .3s;

  &:hover {
    opacity: .7;
    transform: translateX(10px);
  }

  animation: ${animate} .5s ease-in;
`;

export const CurrencyContainer = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  
  position: relative;
  
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  }

  > div span {
    font-weight: 500;
    font-size: 18px;
  }

  @media(max-width: 800px){
    flex-direction: column;
  }

`;

export const Tag = styled.div<ITagProps>`
  width: 10px;
  height: 60%;

  background-color: ${props => props.color};

  position: absolute;
  left: 0;
`;

export const CurrencyInfo = styled.div`
  text-align: left;
  width: 25%;
  > small {
    font-size: 15px;
  }

  @media(max-width: 800px){
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const CurrencyActualValue = styled.div`
  text-align: right;

  @media(max-width: 800px){
    padding-bottom: 10px;
  }
`;
export const CurrencyAmount = styled.div`
  text-align: right;

  @media(max-width: 800px){
    padding-bottom: 10px;
  }
`;
export const CurrencyUnityValue = styled.div`
  text-align: right;

  @media(max-width: 800px){
    padding-bottom: 10px;
  }
`;
export const CurrencyTotalValue = styled.div`
  text-align: right;

  @media(max-width: 800px){
    padding-bottom: 10px;
  }
`;

export const ActionMenu = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: 800px){
    width: 90px;
    position: absolute;
    right: 10px;
    display: flex;
    flex-direction: column;
  }
`;
export const ActionButton = styled.div`

`;
export const RemoveNotify = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-left: 10px;
`;

export const RemoveNotifyMessage = styled.div`
  padding-top: 16px;
`;
export const RemoveNotifyButton = styled.div`
  width: 100px;
  margin-left: 10px;
`;





