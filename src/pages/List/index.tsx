import React, {useEffect, useMemo, useState} from "react";
import {useParams} from 'react-router-dom';
import {Container, Content, CustomDatePicker, DateSelect, Filters, Label} from "./syles";
import ContentHeader from "../../components/ContentHeader";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

interface IData {
    id: number;
    description: string;
    amountFormatted: string;
    frequency: string;
    type: string;
    dateFormatted: string;
    tagColor: string
}

const List: React.FC = () => {
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

    const [data, setData] = useState<IData[]>([]);

    const [currencyFilterSelected, setcurrencyFilterSelected] = useState<string[]>(['recorrente', 'eventual']);

    const {type: movimentType} = useParams();

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ?
            {
                title: 'Compras',
                lineColor: '#4E41F0',
                listData: gains
            } : {
                title: 'Vendas',
                lineColor: '#E44c4E',
                listData: expenses
            }
    }, [movimentType]);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = currencyFilterSelected.findIndex(item => item === frequency);
        if (alreadySelected >= 0) {
            const filtered = currencyFilterSelected.filter(item => item !== frequency);
            setcurrencyFilterSelected(filtered);
        } else {
            setcurrencyFilterSelected((prev) => [...prev, frequency]);
        }
    }

    useEffect(() => {
        const {listData} = pageData;
        const filteredDate = listData.filter(item => {
            const date = new Date(item.date);
            return date >= startDate && date <= endDate && currencyFilterSelected.includes(item.frequency);
        });
        const formattedData = filteredDate.map((item, index) => {
            return {
                id: index,
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                type: item.type,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(formattedData);
    }, [pageData, startDate, endDate, currencyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <DateSelect>
                    <Label>Início</Label>
                    <CustomDatePicker locale="pt" selected={startDate}
                                      onChange={(date: Date) => setStartDate(date)}/>
                </DateSelect>
                <DateSelect>
                    <Label>Fim</Label>
                    <CustomDatePicker locale="pt" selected={endDate}
                                      onChange={(date: Date) => setEndDate(date)}/>
                </DateSelect>
            </ContentHeader>

            <Filters>
                <button type="button"
                        className={`tag-filter tag-filter-recurrent
                    ${currencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                        onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button type="button"
                        className={`tag-filter tag-filter-eventual
                    ${currencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                        onClick={() => handleFrequencyClick('eventual')}
                >
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