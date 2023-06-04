import styled from "styled-components";
import DatePicker from "react-datepicker";

export const Container = styled.div`
  height: 100vh - 72px;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-color: ${props => props.theme.colors.primary};
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Form = styled.form`
  width: 500px;
  height: 650px;
  
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

export const DateSelect = styled.div`
  width: 100%;
  padding-bottom: 5px;
`;
export const Label = styled.label`
  width: 100px;
  font-size: 20px;
  vertical-align: center;
  padding-left: 5px;
`;

export const CustomDatePicker = styled(DatePicker)`
  width: 100%;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
  padding: 12px;
  margin-right: 10px;

  .react-datepicker-wrapper {
    display: inline-block;
    width: 100%;
  }

  .react-datepicker {
    font-family: Arial, sans-serif;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  }

  .react-datepicker__header {
    background-color: #f0f0f0;
    border-bottom: none;
    padding: 10px;
    font-weight: bold;
  }

  .react-datepicker__day {
    color: #333;
  }

  .react-datepicker__day-name,
  .react-datepicker__day--selected {
    color: #fff;
    background-color: #333;
    border-radius: 50%;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export const OperationSelectInput = styled.div`
  height: 55px;
  
  > div select {
    width: 100%;
    margin-left: 0px;
    height: 100%;
    margin-bottom: 16px;
    padding-bottom: 16px;
  }
`;
