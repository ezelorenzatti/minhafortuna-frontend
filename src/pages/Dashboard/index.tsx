import React, { useMemo, useState } from "react";

import { Container, Content } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";


import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";
import WalletBox from "../../components/WalletBox";

const Dashboard: React.FC = () =>{

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth()+1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {value:index+1, label:month}
        })
    },[])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {value:year, label:year}
        })
    },[])

    const handleMonthSelected = (month : string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch(error){
            throw new Error('invalid month value, is accept 0 - 12')
        }
    }

    const handleYearSelected = (year : string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch(error){
            throw new Error('invalid year value, is accept integer')
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
            <SelectInput 
                    options={months} 
                    onChange={(event) => handleMonthSelected(event.target.value)}
                    defaultValue={monthSelected} 
                    />            
                <SelectInput 
                    options={years} 
                    onChange={(event) => handleYearSelected(event.target.value)}
                    defaultValue={yearSelected}  />   
            </ContentHeader>
            <Content>
                <WalletBox 
                    title="Saldo" 
                    color="#4E41F0"                 
                    amount={150.00} 
                    footerLabel="atualizado com base nas entradas e saídas" 
                    icon="dolar" />
                <WalletBox 
                    title="Entradas" 
                    color="#F7931B"                 
                    amount={5000.00} 
                    footerLabel="atualizado com base nas entradas e saídas" 
                    icon="arrowUp" />
                <WalletBox 
                    title="Saídas" 
                    color="#E44C43"                 
                    amount={4850.00} 
                    footerLabel="atualizado com base nas entradas e saídas" 
                    icon="arrowDown" />
            </Content>
        </Container>
    )
}

export default Dashboard;