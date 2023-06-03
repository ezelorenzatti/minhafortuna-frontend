import React from 'react';

import {Container, Sideleft, Sideright, LegendContainer, Legend} from './styles';

import {ResponsiveContainer, BarChart, Bar, Cell, Tooltip} from 'recharts';
import formatCurrency from '../../utils/formatCurrency';

interface IBarChartBoxProps {
    title: string;
    data: {
        currencyCode: string;
        currencyName: string;
        amount: number;
        percent: number;
        color: string;
    }[];
}


const BarChartBox: React.FC<IBarChartBoxProps> = ({title, data}) => (
    <Container>
        <Sideleft>
            <h2>{title}</h2>
            <LegendContainer>
                {
                    data.map((indicator, index) => (
                        <Legend key={index} color={indicator.color}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.currencyCode} - {indicator.currencyName}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>
        </Sideleft>
        <Sideright>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <Bar dataKey="amount" name='Valor'>
                        {
                            data.map((indicator, index) => (
                                <Cell key={index}
                                      fill={indicator.color}/>
                            ))
                        }
                    </Bar>
                    <Tooltip
                        cursor={{fill: 'none'}}
                        formatter={(value) => formatCurrency(Number(value))}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Sideright>
    </Container>
)

export default BarChartBox;