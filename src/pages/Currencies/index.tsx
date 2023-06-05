import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {Add, Container, Content} from "./styles";
import ContentHeader from "../../components/ContentHeader";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import Button from "../../components/Button";
import {useAuth} from "../../hooks/auth";
import ItemListCurrency from "../../components/ItemListCurrency";

interface ICurrency {
    code: number;
    name: string;
    color: string;
    allowChange: boolean;
}

const Currencies: React.FC = () => {
    const {signOut} = useAuth();
    const navigator = useNavigate();
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);

    const fetchCurrency = useCallback(async () => {
        try {
            const fetchedCurrency: ICurrency[] = await fetchGetData(`/currency`);
            setCurrencies(fetchedCurrency);
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
            await fetchCurrency();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCurrency();
    }, [fetchCurrency])

    const handleAdd = () => {
        navigator(`add`);
    };
    const handleEdit = (id: number) => {
        navigator(`edit/${id}`);
    };

    return (
        <Container>
            <ContentHeader title={"Moedas"} lineColor={"red"}>
                <Add>
                    <Button onClick={handleAdd}>Adicionar</Button>
                </Add>
            </ContentHeader>

            <Content>
                {
                    currencies.map((item, index) => (
                        <ItemListCurrency
                            key={index}
                            code={item.code}
                            name={item.name}
                            color={item.color}
                            allowChange={item.allowChange}
                            deleteMessage={"Ao remover você não poderá selecionar esta moeda em futuras operações, Confirma?"}
                            handleDeleteClick={handleDelete}
                            handleEditClick={handleEdit}/>
                    ))
                }
            </Content>
        </Container>
    );
}

export default Currencies;