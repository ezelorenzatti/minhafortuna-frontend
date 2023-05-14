import React, { useMemo, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Container, Content, Filters } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import listOfMonths from "../../utils/months";

interface IData {
    id: number;
    description: string;
    amountFormatted: string;
    frequency: string;
    type: string;
    dateFormatted: string;
    tagColor: string
}

const List: React.FC = () =>{
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth()+1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));

    const {type} = useParams();

    const titleOptions = useMemo(() => {
        return type === 'entry-balance' ? 
        {title:'Entradas', lineColor:'#F7931B'}
        : 
        {title:'Saídas', lineColor:'#E44C4E'}
      }, [type]);

    const listData = useMemo(()=>{
        return type === 'entry-balance' ? gains : expenses;
    },[type]);


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {value:index+1, label:month}
        })
    },[])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {value:year, label:year}
        })
    },[listData])

    useEffect(() => {
        const filteredDate = listData.filter(item => {
            const date = new Date(item.date);
            const month = String(date.getMonth()+1);
            const year = String(date.getFullYear());
            return month === monthSelected && year === yearSelected;
        });
        const formattedData = filteredDate.map((item, index) => {
            return {
                id: index,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                type: item.type,
                dateFormatted: formatDate(item.date) ,
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(formattedData);
    },[listData, monthSelected, yearSelected]);

    return (
        <Container>
            <ContentHeader title={titleOptions.title} lineColor={titleOptions.lineColor}>
                <SelectInput 
                    options={months} 
                    onChange={(event) => setMonthSelected(event.target.value)}
                    defaultValue={monthSelected} 
                    />            
                <SelectInput 
                    options={years} 
                    onChange={(event) => setYearSelected(event.target.value)}
                    defaultValue={yearSelected}  />            
            </ContentHeader>

            <Filters>
                <button type="button"
                    className="tag-filter tag-filter-recurrent">
                    Recorrentes
                </button>

                <button type="button"
                    className="tag-filter tag-filter-eventual">
                    Eventuais
                </button>
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard 
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                        />        
                    ))
                }
            </Content>
        </Container>
    );
}

export default List;