import React, {useCallback, useEffect, useMemo, useState} from "react";

import {
    Container,
    Content,
    CustomDatePicker,
    DateSelect,
    Label,
    PeriodFilter,
    PeriodLabel,
    PeriodSelector
} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import listOfMonths from "../../utils/months";

import WalletBox from "../../components/WalletBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

import pt from 'date-fns/locale/pt-BR';
import {registerLocale, setDefaultLocale} from "react-datepicker";
import {fetchGetData} from "../../services/api/api";
import {format} from "date-fns";

registerLocale('pt', pt);
setDefaultLocale('pt');

interface IOperations {
    amount: number;
    currencyCode: string;
    currencyName: string;
    date: string;
    operationType: string;
    plataformId: number;
    plataformName: string;
    taxes: number;
    total: number;
    unitValue: number;
    color: string;
}

const Dashboard: React.FC = () => {

    const [operations, setOperations] = useState<IOperations[]>([]);
    const [startDate, setStartDate] = useState(() => {
        let dateStorage = localStorage.getItem("@minha-carteira:startDate");
        let date = new Date();
        if (dateStorage) {
            const splitDate = dateStorage.split("-");
            date = new Date(Number(splitDate[0]), Number(splitDate[1]) - 1, Number(splitDate[2]));
        } else {
            date = new Date(date.getFullYear(), date.getMonth(), 1);
        }
        return date;
    });
    const [endDate, setEndDate] = useState(() => {
        let dateStorage = localStorage.getItem("@minha-carteira:endDate");
        let date = new Date();
        if (dateStorage) {
            const splitDate = dateStorage.split("-");
            date = new Date(Number(splitDate[0]), Number(splitDate[1]) - 1, Number(splitDate[2]));
        }
        return date;
    });

    const fetchOperations = useCallback(async () => {
        const formatStartDate = format(startDate, "yyyy-MM-dd");
        const formatEndDate = format(endDate, "yyyy-MM-dd");
        const operations: IOperations[] = await fetchGetData(`/operation?operationType=SELL&operationType=BUY&startDate=${formatStartDate}&endDate=${formatEndDate}`);
        setOperations(operations);
    }, [startDate, endDate]);

    useEffect(() => {
        fetchOperations();
    }, [fetchOperations])

    const totalSell = useMemo(() => {
        let total: number = 0;
        operations.forEach(item => {
            if (item.operationType === 'SELL') {
                total += item.total;
            }
        })
        return total;
    }, [operations]);

    const totalBuy = useMemo(() => {
        let total: number = 0;
        operations.forEach(item => {
            if (item.operationType === 'BUY') {
                total += item.total;
            }
        })
        return total;
    }, [operations]);

    const relationSellVsBuy = useMemo(() => {
        const total = totalBuy + totalSell;
        const percentBuy = Number(((totalBuy / total) * 100).toFixed(1));
        const percentSell = Number(((totalSell / total) * 100).toFixed(1));

        const data = [
            {
                name: "Compras",
                value: totalBuy,
                percent: percentBuy ? percentBuy : 0,
                color: '#E44C4E'
            }, {
                name: "Vendas",
                value: totalSell,
                percent: percentSell ? percentSell : 0,
                color: '#F7931B'
            }
        ]
        return data;

    }, [totalBuy, totalSell]);

    const historyData = useMemo(() => {
        const yearsMap = new Map<number, Map<number, { amountBuy: number, amountSell: number }>>();

        operations.forEach(item => {
            const [year, month, day] = item.date.split('-');
            const date = new Date(Number(year), Number(month) - 1, Number(day));
            const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
            const utcYear = utcDate.getUTCFullYear();
            const utcMonth = utcDate.getUTCMonth();

            if (!yearsMap.has(utcYear)) {
                yearsMap.set(utcYear, new Map<number, { amountBuy: number, amountSell: number }>());
            }

            const monthsMap = yearsMap.get(utcYear)!;

            if (!monthsMap.has(utcMonth)) {
                monthsMap.set(utcMonth, {amountBuy: 0, amountSell: 0});
            }

            const monthData = monthsMap.get(utcMonth)!;

            if (item.operationType === 'BUY') {
                monthData.amountBuy += Number(item.total);
            } else {
                monthData.amountSell += Number(item.total);
            }
        });

        const history = Array.from(yearsMap).map(([year, monthsMap]) => ({
            year,
            months: Array.from(Array(12).keys()).map(month => ({
                year,
                monthNumber: month,
                month: listOfMonths[month].substring(0, 3),
                amountBuy: monthsMap.get(month)?.amountBuy ?? 0,
                amountSell: monthsMap.get(month)?.amountSell ?? 0
            }))
        }));

        return history;
    }, [operations]);

    const relationBuyGroupByCurrency = useMemo(() => {
        const currenciesMap = new Map<string, number>();
        let total = 0;

        operations.forEach((item: IOperations) => {
            if (item.operationType === 'BUY') {
                const currencyCode = item.currencyCode;
                const totalValue = item.total;
                const currentAmount = currenciesMap.get(currencyCode) ?? 0;
                const updatedAmount = currentAmount + totalValue;
                currenciesMap.set(currencyCode, updatedAmount);
                total += totalValue;
            }
        });

        const percentual = Array.from(currenciesMap).map(([currencyCode, amount], index) => {
            const currencyName = operations.find((item) => item.currencyCode === currencyCode)?.currencyName;
            const color = operations.find((item) => item.currencyCode === currencyCode)?.color;
            return {
                currencyCode,
                currencyName: currencyName || '',
                amount,
                percent: Number(((amount / total) * 100).toFixed(1)),
                color: color || '',
            };
        });

        return percentual;
    }, [operations]);

    const relationExpensesRecurrentVsEventual = useMemo(() => {
        const currenciesMap = new Map<string, number>();
        let total = 0;

        operations.forEach((item: IOperations) => {
            if (item.operationType === 'SELL') {
                const currencyCode = item.currencyCode;
                const totalValue = item.total;
                const currentAmount = currenciesMap.get(currencyCode) ?? 0;
                const updatedAmount = currentAmount + totalValue;
                currenciesMap.set(currencyCode, updatedAmount);
                total += totalValue;
            }
        });

        const percentual = Array.from(currenciesMap).map(([currencyCode, amount], index) => {
            const currencyName = operations.find((item) => item.currencyCode === currencyCode)?.currencyName;
            const color = operations.find((item) => item.currencyCode === currencyCode)?.color;
            return {
                currencyCode,
                currencyName: currencyName || '',
                amount,
                percent: Number(((amount / total) * 100).toFixed(1)),
                color: color || '',
            };
        });

        return percentual;
    }, [operations]);


    const handleStartDate = useCallback((date: Date) => {
        localStorage.setItem("@minha-carteira:startDate", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        setStartDate(date);
    }, []);

    const handleEndDate = useCallback((date: Date) => {
        localStorage.setItem("@minha-carteira:endDate", `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
        setEndDate(date);
    }, []);

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <PeriodFilter>
                    <PeriodLabel>
                        Filtrar Período
                    </PeriodLabel>
                    <PeriodSelector>
                        <DateSelect>
                            <Label>Início</Label>
                            <CustomDatePicker locale="pt" selected={startDate}
                                              onChange={(date: Date) => handleStartDate(date)}
                                              dateFormat="dd/MM/yyyy"/>
                        </DateSelect>
                        <DateSelect>
                            <Label>Fim</Label>
                            <CustomDatePicker locale="pt" selected={endDate}
                                              onChange={(date: Date) => handleEndDate(date)}
                                              dateFormat="dd/MM/yyyy"/>
                        </DateSelect>
                    </PeriodSelector>
                </PeriodFilter>
            </ContentHeader>
            <Content>
                <WalletBox
                    title="Compras"
                    color="#F7931B"
                    amount={totalBuy}
                    footerLabel="atualizado com base nas movimentações do período"
                    icon="arrowUp"/>
                <WalletBox
                    title="Vendas"
                    color="#E44C43"
                    amount={totalSell}
                    footerLabel="atualizado com base nas movimentações do período"
                    icon="arrowDown"/>
                <PieChartBox
                    data={relationSellVsBuy}
                />
                <HistoryBox
                    data={historyData}
                    lineColorAmountEntry="#f7931b"
                    lineColorAmountOutput="#e44c4e"
                />
                <BarChartBox
                    title="Compras"
                    data={relationBuyGroupByCurrency}
                />
                <BarChartBox
                    title="Vendas"
                    data={relationExpensesRecurrentVsEventual}
                />
            </Content>
        </Container>
    )
}

export default Dashboard;