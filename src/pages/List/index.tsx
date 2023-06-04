import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import {AddOperation, Container, Content, CustomDatePicker, DateSelect, Label, PeriodFilter} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import formatCurrency from "../../utils/formatCurrency";
import {formatDate} from "../../utils/formatDate";
import {format} from "date-fns";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import Button from "../../components/Button";
import {PeriodLabel, PeriodSelector} from "../Dashboard/styles";

interface IOperation {
    id: number;
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
    amountFormatted: string,
    dateFormatted: string,
    color: string,
    lastValueDate: string;
    lastValue: number;
    showDeleteMessage: boolean;
    deleteMessage: string;
}

const List: React.FC = () => {
    const navigator = useNavigate();
    const [operations, setOperations] = useState<IOperation[]>([]);
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
    const [currencyFilterSelected, setCurrencyFilterSelected] = useState<String[]>([]);

    useMemo(() => {
        const currencies = operations.filter((item, index, array) => {
            return array.findIndex((operation) => operation.currencyCode === item.currencyCode) === index;
        }).map((item) => item.currencyCode);
        setCurrencyFilterSelected(currencies);
        return currencies;
    }, [operations])

    const {type: movimentType} = useParams();

    const fetchOperations = useCallback(async () => {
        const operationType = (movimentType || '').toUpperCase();
        const formatStartDate = format(startDate, "yyyy-MM-dd");
        const formatEndDate = format(endDate, "yyyy-MM-dd");
        const fetchedOperations: IOperation[] = await fetchGetData(`/operation?operationType=${operationType}&startDate=${formatStartDate}&endDate=${formatEndDate}`);
        setOperations(fetchedOperations);
    }, [movimentType, startDate, endDate]);

    const handleDeleteOperation = async (id: number) => {
        try {
            await fetchPostData(`/operation/delete/${id}`)
            await fetchOperations();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOperations();
    }, [fetchOperations])

    const pageData = useMemo(() => ({
        title: movimentType === 'buy' ? 'Compras' : 'Vendas',
        lineColor: movimentType === 'buy' ? '#4E41F0' : '#E44c4E'
    }), [movimentType]);

    const handleAddOperation = () => {
        navigator(`add`);
    };
    const handleEditOperation = (id: number) => {
        navigator(`edit/${id}`);
    };

    const formattedData = useMemo(() => {
        let filteredOperations = operations.filter(item => {
            return currencyFilterSelected.includes(item.currencyCode)
        });
        return filteredOperations.map((item, index) => ({
            index: index,
            id: item.id,
            currencyCode: item.currencyCode,
            currencyName: item.currencyName,
            operationType: item.operationType,
            amountFormatted: String(item.amount),
            totalFormatted: formatCurrency(item.total),
            dateFormatted: formatDate(item.date),
            lastValueDateFormatted: formatDate(item.lastValueDate),
            lastValueFormatted: formatCurrency(item.lastValue),
            date: item.date,
            amount: item.amount,
            plataformId: item.plataformId,
            plataformName: item.plataformName,
            taxes: item.taxes,
            total: item.total,
            unitValue: formatCurrency(item.unitValue),
            tagColor: item.color
        }));
    }, [operations, currencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <PeriodFilter>
                    <PeriodLabel>
                        Filtrar Período
                    </PeriodLabel>
                    <PeriodSelector>
                        <DateSelect>
                            <Label>Início</Label>
                            <CustomDatePicker locale="pt" selected={startDate}
                                              onChange={(date: Date) => setStartDate(date)}
                                              dateFormat="dd/MM/yyyy"/>
                        </DateSelect>
                        <DateSelect>
                            <Label>Fim</Label>
                            <CustomDatePicker locale="pt" selected={endDate}
                                              onChange={(date: Date) => setEndDate(date)}
                                              dateFormat="dd/MM/yyyy"/>
                        </DateSelect>
                    </PeriodSelector>
                </PeriodFilter>
                <AddOperation>
                    <Button onClick={handleAddOperation}>Adicionar</Button>
                </AddOperation>

            </ContentHeader>

            <Content>
                {
                    formattedData.map(item => (
                        <HistoryFinanceCard
                            key={item.index}
                            id={item.id}
                            tagColor={item.tagColor}
                            currencyCode={item.currencyCode}
                            currencyName={item.currencyName}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}
                            total={item.totalFormatted}
                            lastValue={item.lastValueFormatted}
                            lastValueDate={item.lastValueDateFormatted}
                            plataformName={item.plataformName}
                            unitValue={item.unitValue}
                            operationType={item.operationType}
                            deleteMessage={"Ao remover todos os indicadores serão recalculados, Confirma ?"}
                            handleEditClick={handleEditOperation}
                            handleDeleteClick={handleDeleteOperation}
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List;