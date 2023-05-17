import React, { useMemo, useState } from "react";

import { Container, Content } from "./syles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";


import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listOfMonths from "../../utils/months";

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import WalletBox from "../../components/WalletBox";
import MessageBox from "../../components/MessageBox";

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

    const totalExpense = useMemo(()=>{
        let total: number = 0;
        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;

            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount);
                }catch {
                    throw new Error('Invalid amount" Amount must be a number.');
                }            
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    const totalGains = useMemo(()=>{
        let total: number = 0;
        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;

            if(month === monthSelected && year === yearSelected){
                try {
                    total += Number(item.amount);
                }catch {
                    throw new Error('Invalid amount" Amount must be a number.');
                }            
            }
        });
        return total;
    },[monthSelected, yearSelected]);

    const totalBalance = useMemo(() =>{
        return totalGains - totalExpense;
    },[totalExpense, totalGains]);

    const message = useMemo(() => {
        if(totalBalance < 0){
            return {
                title:"Que triste!",
                description: "Neste mês você gastou mais do que deveria.",
                footerText:"Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                icon: sadImg
            }
        } else if (totalBalance === 0) {
            return {
                title:"Ufaa!",
                description: "Neste mês você gastou exatamente o que ganhou.",
                footerText:"Tenha cuidado. No próximo mês tem poupar o seu dinheiro",
                icon: grinningImg
            }
        } else {
            return {
                title:"Muito bem!",
                description: "Sua Carteira está positiva!",
                footerText:"Continue assim. Considere investir o seu saldo",
                icon: happyImg
            }
        }
    },[totalBalance]);

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
                    title="saldo" 
                    color="#4E41F0"                 
                    amount={totalBalance} 
                    footerLabel="atualizado com base nas entradas e saídas" 
                    icon="dolar" />
                <WalletBox 
                    title="Entradas" 
                    color="#F7931B"                 
                    amount={totalGains} 
                    footerLabel="atualizado com base nas entradas e saídas" 
                    icon="arrowUp" />
                <WalletBox 
                    title="Saídas" 
                    color="#E44C43"                 
                    amount={totalExpense} 
                    footerLabel="atualizado com base nas entradas e saídas" 
                    icon="arrowDown" />
                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />
            </Content>
        </Container>
    )
}

export default Dashboard;