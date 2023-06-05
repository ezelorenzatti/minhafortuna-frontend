import React, {useState} from 'react';

import {
    ActionButton,
    ActionMenu,
    Container,
    CurrencyContainer,
    CurrencyInfo,
    RemoveNotify,
    RemoveNotifyButton,
    RemoveNotifyMessage
} from './styles';


import Button from "../Button";
import {Tag} from "../HistoryFinanceCard/styles";

interface IItemListCurrencyProps {
    code: number,
    name: string;
    color: string;
    allowChange: boolean;
    deleteMessage: string;

    handleDeleteClick(index: number): void;

    handleEditClick(index: number): void;
}

const ItemListCurrency: React.FC<IItemListCurrencyProps> = (
    {
        code,
        name,
        color,
        allowChange,
        deleteMessage,
        handleDeleteClick,
        handleEditClick
    }) => {

    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);

    return (
        <Container>
            <CurrencyContainer>
                <Tag color={color}/>
                <CurrencyInfo>
                    <div>
                        <span>{code}</span>
                        <small>{name}</small>
                    </div>
                </CurrencyInfo>
                <ActionMenu>
                    <ActionButton>
                        <Button
                            disabled={!allowChange}
                            className={`${!allowChange ? 'btn-disabled' : ''}`}
                            title={!allowChange ? 'Moedas padrão não podem ser editadas' : ''}
                            onClick={() => handleEditClick(code)}>
                            Editar
                        </Button>
                    </ActionButton>
                    <ActionButton>
                        <Button disabled={!allowChange}
                                className={`${!allowChange ? 'btn-disabled' : ''}`}
                                title={!allowChange ? 'Moedas padrão não podem ser removidas' : ''}
                                onClick={(e) => {
                                    setShowDeleteMessage(true)
                                }}>
                            Remover
                        </Button>
                    </ActionButton>
                </ActionMenu>
            </CurrencyContainer>
            {showDeleteMessage ? <RemoveNotify>
                <RemoveNotifyMessage>
                    {deleteMessage}
                </RemoveNotifyMessage>
                <RemoveNotifyButton>
                    <Button onClick={() => {
                        setShowDeleteMessage(false);
                        handleDeleteClick(code)
                    }}>Sim</Button>
                </RemoveNotifyButton>
                <RemoveNotifyButton>
                    <Button onClick={() => {
                        setShowDeleteMessage(false)
                    }}>Não</Button>
                </RemoveNotifyButton>
            </RemoveNotify> : <></>}
        </Container>
    );
}

export default ItemListCurrency;