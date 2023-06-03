import styled from "styled-components";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

export const Container = styled.div`

`;

export const Content = styled.main`

`;


export const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  margin-bottom: 30px;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;

    background: none;
    color: ${props => props.theme.colors.white};

    margin: 0 10px;

    opacity: .4;
    transition: opacity .3s;

    &:hover {
      opacity: .7;
    }
  }

  .tag-filter-recurrent::after {
    content: '';
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${props => props.theme.colors.success};
  }

  .tag-filter-eventual::after {
    content: '';
    display: block;
    width: 55px;
    margin: 0 auto;
    border-bottom: 10px solid ${props => props.theme.colors.warning};
  }

  .tag-actived {
    opacity: 1;
  }
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