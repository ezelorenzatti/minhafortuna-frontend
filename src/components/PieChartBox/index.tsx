import React from 'react';

import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';

import {Container, Sideleft, Sideright, LegendContainer, Legend} from './styles';

interface IPieChardBoxProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[]
}

const PieChartBox: React.FC<IPieChardBoxProps> = ({data}) => (
    <Container>
        <Sideleft>
            <h2>Relação</h2>
            <LegendContainer>
                {
                    data.map((indicator, index) => (
                        <Legend key={index} color={indicator.color}>
                            <div>{indicator.percent}%</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>
        </Sideleft>
        <Sideright>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="percent">
                        {
                            data.map((indicator, index) => (
                                <Cell key={index} fill={indicator.color}/>
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Sideright>
    </Container>
);

export default PieChartBox;