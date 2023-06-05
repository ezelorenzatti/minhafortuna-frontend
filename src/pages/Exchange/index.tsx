import React, {useEffect, useState} from "react";
import {Container, ErrorMessage, Form, FormTitle, FormItem} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../hooks/auth";

interface IExchange {
    id: number;
    name: string;
    allowDelete: boolean;
    url: string;
}

const Exchange: React.FC = () => {
    const {signOut} = useAuth();
    const navigator = useNavigate();
    const {id} = useParams();

    const [idExchange, setIdExchange] = useState<number>();
    const [name, setName] = useState<string>('');
    const [url, setUrl] = useState<string>();

    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await fetchPostData("/exchange", {
                id: idExchange,
                name: name,
                url: url,
            });
            navigator(-1);
        } catch (error: any) {
            if (error.status === 401) {
                signOut();
                navigator('/');
            }
            setError(error.message);
        }
    }

    const handleCancelClick = () => {
        navigator(-1);
    }

    async function fetchExchange({id}: { id: any }) {
        if (id) {
            const exchange: IExchange = await fetchGetData("/exchange/" + id);
            setIdExchange(exchange.id);
            setName(exchange.name);
            setUrl(exchange.url);
        }
    }

    useEffect(() => {
        fetchExchange({id: id});
    }, [id])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    {id ? 'Editar' : 'Adicionar'} Exchange
                </FormTitle>

                <FormItem>
                    <small>Nome</small>
                    <Input
                        placeholder="nome"
                        type="text"
                        required
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={(e) => setError('')}
                    />
                </FormItem>
                <FormItem>
                    <small>Url</small>
                    <Input
                        placeholder="url"
                        type="text"
                        defaultValue={url}
                        onChange={(e) => setUrl(e.target.value)}
                        onFocus={(e) => setError('')}
                    />
                </FormItem>
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={handleCancelClick}>Cancelar</Button>
            </Form>

            {error &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </Container>
    )
}

export default Exchange;