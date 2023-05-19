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
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

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

    const relationExpensesVsGains = useMemo(() => {
        const total = totalGains + totalExpense;
        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpense / total) * 100;

        const data = [
            {
                name:"Entradas",
                value: percentGains,
                percent: Number(percentGains.toFixed(1)),
                color: '#E44C4E'
            },{
                name:"Saídas",
                value: percentExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color:'#F7931B'
            }
        ]
        return data;

    },[totalGains, totalExpense]);

    const historyData = useMemo(( ) => {
        return listOfMonths.map((_, month) => {
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();
                if(gainMonth === month && gainYear === yearSelected){
                    try {
                        amountEntry += Number(gain.amount)
                    } catch {
                        throw new Error('amountEntry is invalid. amoutEntry must be a valid number');
                    }                    
                }
            });
            
            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();
                if(expenseMonth === month && expenseYear === yearSelected){
                    try {
                        amountOutput += Number(expense.amount)
                    } catch {
                        throw new Error('amountEntry is invalid. amoutEntry must be a valid number');
                    }                    
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substring(0, 3),
                amountEntry: amountEntry,
                amountOutput: amountOutput
            }
        }).filter((item) => {
            const date = new Date();
            const currentMonth = date.getMonth();
            const currentYear = date.getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)

        })
    },[yearSelected]);

    const relationGainsRecurrentVsEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;
        gains
        .filter((gain)=>{
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            return month === monthSelected && year === yearSelected;
        })
        .forEach((gain) => {
            if(gain.frequency === 'recorrente'){
                return amountRecurrent += Number(gain.amount);
            }
            if(gain.frequency === 'eventual'){
                return amountEventual += Number(gain.amount);
            }
        });

        const total = amountEventual + amountRecurrent;

        return [
            {
                name:'Recorrentes',
                amount:amountRecurrent,
                percent:Number(((amountRecurrent / total) * 100).toFixed(1)),
                color:"#f79b1b"
            },
            {
                name:'Eventuais',
                amount:amountEventual,
                percent:Number(((amountEventual / total) * 100).toFixed(1)),
                color:"#e44c4e"
            }
        ]
    },[yearSelected, monthSelected]);
    
    const relationExpensesRecurrentVsEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;
        expenses
        .filter((expense)=>{
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            return month === monthSelected && year === yearSelected;
        })
        .forEach((expense) => {
            if(expense.frequency === 'recorrente'){
                return amountRecurrent += Number(expense.amount);
            }
            if(expense.frequency === 'eventual'){
                return amountEventual += Number(expense.amount);
            }
        });

        const total = amountEventual + amountRecurrent;

        return [
            {
                name:'Recorrentes',
                amount:amountRecurrent,
                percent:Number(((amountRecurrent / total) * 100).toFixed(1)),
                color:"#f79b1b"
            },
            {
                name:'Eventuais',
                amount:amountEventual,
                percent:Number(((amountEventual / total) * 100).toFixed(1)),
                color:"#e44c4e"
            }
        ]
    },[yearSelected, monthSelected]);

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
                <PieChartBox 
                    data={relationExpensesVsGains}
                />
                <HistoryBox 
                    data={historyData} 
                    lineColorAmountEntry="#f7931b" 
                    lineColorAmountOutput="#e44c4e"
                />
                <BarChartBox
                    title="Entradas"
                    data={relationGainsRecurrentVsEventual}            
                />
                <BarChartBox
                    title="Saídas"
                    data={relationExpensesRecurrentVsEventual}            
                />
            </Content>
        </Container>
    )
}

export default Dashboard;