import React, {useMemo, useState, useEffect} from "react";
import {useParams} from 'react-router-dom';
import {Container, Content, Filters} from "./syles";
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

const List: React.FC = () => {
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequecyFilterSelected, setfrequecyFilterSelected] = useState<string[]>(['recorrente', 'eventual']);

    const {type: movimentType} = useParams();

    const pageData = useMemo(() => {
        return movimentType === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#4E41F0',
                listData: gains
            } : {
                title: 'Saídas',
                lineColor: '#E44c4E',
                listData: expenses
            }
    }, [movimentType]);

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {value: index + 1, label: month}
        })
    }, [])

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        const {listData} = pageData;

        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {value: year, label: year}
        })
    }, [pageData])

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequecyFilterSelected.findIndex(item => item === frequency);
        if (alreadySelected >= 0) {
            const filtered = frequecyFilterSelected.filter(item => item !== frequency);
            setfrequecyFilterSelected(filtered);
        } else {
            setfrequecyFilterSelected((prev) => [...prev, frequency]);
        }
    }

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch (error) {
            throw new Error('invalid month value, is accept 0 - 12')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('invalid year value, is accept integer')
        }
    }

    useEffect(() => {
        const {listData} = pageData;
        const filteredDate = listData.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return month === monthSelected && year === yearSelected && frequecyFilterSelected.includes(item.frequency);
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
    }, [pageData, monthSelected, yearSelected, frequecyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput
                    options={months}
                    onChange={(event) => handleMonthSelected(event.target.value)}
                    defaultValue={monthSelected}
                />
                <SelectInput
                    options={years}
                    onChange={(event) => handleYearSelected(event.target.value)}
                    defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button type="button"
                        className={`tag-filter tag-filter-recurrent
                    ${frequecyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                        onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>

                <button type="button"
                        className={`tag-filter tag-filter-eventual
                    ${frequecyFilterSelected.includes('eventual') && 'tag-actived'}`}
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