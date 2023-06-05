import React from 'react';

import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts';

import {ChartContainer, ChartContainerLabel, ChartHeader, Container, Legend, LegendContainer} from './styles';

import formatCurrency from '../../utils/formatCurrency';

interface IHistoryBoxProps {
    data: {
        year: number;
        months: {
            month: string;
            amountBuy: number;
            amountSell: number;
        }[]
    }[];
    lineColorAmountEntry: string;
    lineColorAmountOutput: string;

}

const Content: React.FC<IHistoryBoxProps> = ({data, lineColorAmountEntry, lineColorAmountOutput}) => {
    return (<Container>
        <ChartHeader>
            <h2>Histórico de Movimentações</h2>
            <LegendContainer>
                <Legend color={lineColorAmountEntry}>
                    <div></div>
                    <span>Compras</span>
                </Legend>
                <Legend color={lineColorAmountOutput}>
                    <div></div>
                    <span>Vendas</span>
                </Legend>
            </LegendContainer>
        </ChartHeader>

        {data.map((item, index) => (
            <ChartContainer key={item.year} >
                <ChartContainerLabel>
                    {item.year}
                </ChartContainerLabel>
                <ResponsiveContainer>
                    <LineChart data={item.months} margin={{top: 5, left: 20, right: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" stroke='#cecece'/>
                        <XAxis dataKey="month" stroke='#cecece'/>
                        <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                        <Line
                            type="monotone"
                            dataKey="amountBuy"
                            name="Compras"
                            stroke={lineColorAmountEntry}
                            strokeWidth={5}
                            dot={{r: 5}}
                            activeDot={{r: 8}}
                        />
                        <Line
                            type="monotone"
                            dataKey="amountSell"
                            name="Vendas"
                            stroke={lineColorAmountOutput}
                            strokeWidth={5}
                            dot={{r: 5}}
                            activeDot={{r: 8}}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        ))}
    </Container>)
}

export default Content;