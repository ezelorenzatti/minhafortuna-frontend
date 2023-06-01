import React from 'react';

import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

import {Container} from './styles';
import CountUp from 'react-countup';

interface IWalletBoxProps {
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string
}

const WalletBox: React.FC<IWalletBoxProps> = ({title, amount, footerLabel, icon, color}) => {

    const icons = {
        dolar: dolarImg,
        arrowUp: arrowUpImg,
        arrowDown: arrowDownImg
    }

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>R$ </strong>
                <CountUp
                    end={amount}
                    decimal=','
                    separator='.'
                    decimals={2}
                />
            </h1>
            <small>{footerLabel}</small>
            {icon && <img src={icons[icon]} alt={title}/>}
        </Container>)
}

export default WalletBox;