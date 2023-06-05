import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Add, Container, Content} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import Button from "../../components/Button";
import {useAuth} from "../../hooks/auth";
import ItemListExchange from "../../components/ItemListExchange";

interface IExchanges {
    id: number;
    name: string;
    allowDelete: boolean;
    url: string;
}

const Exchanges: React.FC = () => {
    const {signOut} = useAuth();
    const navigator = useNavigate();
    const [exchanges, setExchanges] = useState<IExchanges[]>([]);

    const fetchExchange = useCallback(async () => {
        try {
            const fetchedExchange: IExchanges[] = await fetchGetData(`/exchange`);
            setExchanges(fetchedExchange);
        } catch (error: any) {
            if (error.status === 401) {
                signOut();
                navigator('/')
            }
        }
    }, [navigator, signOut]);

    const handleDelete = async (id: number) => {
        try {
            await fetchPostData(`/exchange/delete/${id}`)
            await fetchExchange();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchExchange();
    }, [fetchExchange])

    const handleAdd = () => {
        navigator(`add`);
    };
    const handleEdit = (id: number) => {
        navigator(`edit/${id}`);
    };

    return (
        <Container>
            <ContentHeader title={"Exchanges"} lineColor={"red"}>
                <Add>
                    <Button onClick={handleAdd}>Adicionar</Button>
                </Add>
            </ContentHeader>

            <Content>
                {
                    exchanges.map((item, index) => (
                        <ItemListExchange
                            key={index}
                            id={item.id}
                            exchangeName={item.name}
                            exchangeUrl={item.url}
                            allowDelete={item.allowDelete}
                            deleteMessage={"Ao remover você não poderá selecionar esta exchange para futuras operações, Confirma?"}
                            handleDeleteClick={handleDelete}
                            handleEditClick={handleEdit}/>
                    ))
                }
                {
                    exchanges.length === 0 && (<div>Não foram cadastradas exchanges</div>)
                }
            </Content>
        </Container>
    );
}

export default Exchanges;