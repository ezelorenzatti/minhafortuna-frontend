import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-color: ${props => props.theme.colors.primary};
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  > h2 {
    color: ${props => props.theme.colors.white};
    margin-left: 7px;
  }

  > img {
    width: 40px;
    height: 40px;
  }

`;

export const Form = styled.form`
  width: 300px;
  
  padding: 30px;
  border-radius: 10px;

  background-color: ${props => props.theme.colors.tertiary};
`;

export const FormTitle = styled.h1`
  margin-bottom: 35px;
  color: ${props => props.theme.colors.white};
  
  &:after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 20px;
  width: 500px;
  border-radius: 5px;
  background-color: #ffcccc;
  color: #ff0000;
  padding: 10px;
  margin-bottom: 10px;
`;
export const ExampleData = styled.form`
  width: 300px;
  
  padding: 30px;
  border-radius: 10px;

  background-color: ${props => props.theme.colors.tertiary};
`;

export const ExampleDataTitle = styled.h1`
  font-size: 20px;
  margin-bottom: 35px;
  color: ${props => props.theme.colors.white};
  
  &:after {
    content: '';
    display: block;
    width: 55px;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }
`;

export const Message = styled.h4`
  padding-top: 10px;
  font-size: 20px;
  margin-bottom: 35px;
  color: ${props => props.theme.colors.white};
  text-align: center;
  
`;

export const BarLoaderCustom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;




