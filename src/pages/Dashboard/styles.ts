import styled from "styled-components";
import DatePicker from "react-datepicker";

export const Container = styled.div`

`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const DateSelect = styled.div`

`;
export const Label = styled.label`
  width: 100px;
  font-size: 20px;
  vertical-align: center;
  padding-left: 5px;
`;

export const CustomDatePicker = styled(DatePicker)`
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
  padding: 10px;

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

export const PeriodFilter = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-right: 10px;
  border-radius: 8px;
`;

export const PeriodLabel = styled.h4`
  width: 100%;
  text-align: left;
  margin-left: 10px;
  margin-bottom: 5px;
`;

export const PeriodSelector = styled.div`
  display: flex;
`;




