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

interface IItemListCardProps {
    id: number,
    exchangeName: string;
    exchangeUrl: string;
    allowDelete: boolean;
    deleteMessage: string;

    handleDeleteClick(index: number): void;

    handleEditClick(index: number): void;
}

const ItemListExchange: React.FC<IItemListCardProps> = (
    {
        id,
        exchangeName,
        exchangeUrl,
        allowDelete,
        deleteMessage,
        handleDeleteClick,
        handleEditClick
    }) => {

    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);

    return (
        <Container>
            <CurrencyContainer>
                <CurrencyInfo>
                    <a target="_black" href={exchangeUrl} title={exchangeUrl ? 'O clicar o site será aberto em uma nova janela' : ''}>
                        <span>{exchangeName}</span>
                        <small>{exchangeUrl}</small>
                    </a>
                </CurrencyInfo>
                <ActionMenu>
                    <ActionButton>
                        <Button onClick={() => handleEditClick(id)}>Editar</Button>
                    </ActionButton>
                    <ActionButton>
                        <Button disabled={!allowDelete} className={`${!allowDelete ? 'btn-disabled' : ''}`}
                            title={!allowDelete ? 'Não é possível remover pois a exchange já está vinculada com algum movimento realizado' :''}
                                onClick={(e) => {
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
                    <Button onClick={() => {
                        setShowDeleteMessage(false);
                        handleDeleteClick(id)
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

export default ItemListExchange;