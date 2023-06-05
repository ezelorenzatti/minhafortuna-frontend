import styled from "styled-components";

export const Container = styled.div`
  height: 100vh - 72px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-color: ${props => props.theme.colors.primary};
`;

export const Form = styled.form`
  width: 500px;
  
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

export const SuccessMessage = styled.div`
  margin-top: 20px;
  width: 500px;
  border-radius: 5px;
  background-color: #ffcccc;
  color: #ff0000;
  padding: 10px;
  margin-bottom: 10px;
`;

export const FormItem = styled.label`
  padding-top: 5px;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  vertical-align: center;
`;