import React, {useState} from 'react';

import {
    ActionButton,
    ActionMenu,
    Container,
    CurrencyActualValue,
    CurrencyAmount,
    CurrencyContainer,
    CurrencyInfo,
    CurrencyTotalValue,
    CurrencyUnityValue,
    RemoveNotify, RemoveNotifyButton, RemoveNotifyMessage,
    Tag
} from './styles';


import Button from "../Button";

interface IHistoryFinanceCardProps {
    id:number,
    operationType: string
    tagColor: string;
    currencyCode: string;
    currencyName: string;
    subtitle: string;
    amount: string;
    total: string;
    lastValue: string;
    lastValueDate: string;
    exchangeName: string;
    unitValue: string;
    deleteMessage: string;

    handleDeleteClick(index: number): void;

    handleEditClick(index: number): void;
}

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = (
    {
        id,
        tagColor,
        currencyCode,
        currencyName,
        subtitle,
        amount,
        total,
        lastValue,
        lastValueDate,
        exchangeName,
        unitValue,
        operationType,
        deleteMessage,
        handleDeleteClick,
        handleEditClick
    }) => {

    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);

    return (
        <Container>
            <CurrencyContainer>
                <Tag color={tagColor}/>
                <CurrencyInfo>
                    <span title="Plataforma e Moeda ou Ativo">{exchangeName} - {currencyName}</span>
                    <small title="Data da operação">{subtitle}</small>
                </CurrencyInfo>
                <CurrencyActualValue>
                    <h6>{lastValueDate && operationType === 'BUY' ? `Última cotação - ${lastValueDate}` : ''} </h6>
                    <h4>{operationType === 'BUY' ? ` ${lastValue}` : ''}</h4>
                </CurrencyActualValue>
                <CurrencyAmount>
                    <h6>Quantidade</h6>
                    <h4>{amount} {currencyCode}</h4>
                </CurrencyAmount>
                <CurrencyUnityValue>
                    <h6>Valor Unitário</h6>
                    <h4>{unitValue}</h4>
                </CurrencyUnityValue>
                <CurrencyTotalValue>
                    <h6>{operationType === 'BUY' ? 'Valor investido' : 'Valor recebido'}</h6>
                    <h4 title="Valor em reais no ato da operação">{total}</h4>
                </CurrencyTotalValue>
                <ActionMenu>
                    <ActionButton>
                        <Button onClick={() => handleEditClick(id)}>Editar</Button>
                    </ActionButton>
                    <ActionButton>
                        <Button onClick={(e) => {
                            setShowDeleteMessage(true)
                        }}>Remover</Button>
                    </ActionButton>
                </ActionMenu>
            </CurrencyContainer>
            {showDeleteMessage ? <RemoveNotify>
                <RemoveNotifyMessage>
                    {deleteMessage}
                </RemoveNotifyMessage>
                <RemoveNotifyButton>
                    <Button onClick={() => {setShowDeleteMessage(false); handleDeleteClick(id)}}>Sim</Button>
                </RemoveNotifyButton>
                <RemoveNotifyButton>
                    <Button onClick={() => {setShowDeleteMessage(false)}}>Não</Button>
                </RemoveNotifyButton>
            </RemoveNotify> : <></>}
        </Container>
    );
}

export default HistoryFinanceCard;