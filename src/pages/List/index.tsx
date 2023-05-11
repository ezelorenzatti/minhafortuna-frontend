import React, { useMemo } from "react";
import { useParams } from 'react-router-dom';
import { Container, Content, Filters } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

const List: React.FC = () =>{
    const {type} = useParams();

    const titleOptions = useMemo(() => {
        return type === 'entry-balance' ? 
        {title:'Entradas', lineColor:'#F7931B'}
        : 
        {title:'Saídas', lineColor:'#E44C4E'}
      }, [type]);

    const months = [
        {value:1, label:'Janeiro'},
        {value:2, label:'Fevereiro'},
        {value:3, label:'Março'},
        {value:4, label:'Abril'},
        {value:5, label:'Maio'},
        {value:6, label:'Junho'},
        {value:7, label:'Julho'},
        {value:8, label:'Agosto'},
        {value:9, label:'Setembro'},
        {value:10, label:'Outubro'},
        {value:11, label:'Novembro'},
        {value:12, label:'Dezembro'}
    ];

    
    const years = [
        {value:2023, label:2023},
        {value:2022, label:2022},    
        {value:2021, label:2021},    
        {value:2020, label:2020}    
    ];

    return (
        <Container>
            <ContentHeader title={titleOptions.title} lineColor={titleOptions.lineColor}>
                <SelectInput options={months}/>            
                <SelectInput options={years}/>            
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
                <HistoryFinanceCard 
                    tagColor="#e44c4e"
                    title="Conta de Luz"
                    subtitle="11/05/2023"
                    amount="R$ 130,00"
                />        
            </Content>
        </Container>
    );
}

export default List;