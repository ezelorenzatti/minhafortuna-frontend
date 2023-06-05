import React, {useEffect, useState} from "react";
import {Container, ErrorMessage, Form, FormItem, FormTitle} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../hooks/auth";

interface ICurrency {
    code: string;
    name: string;
    color: string;
}

const Currency: React.FC = () => {
    const {signOut} = useAuth();
    const navigator = useNavigate();
    const {id} = useParams();

    const [codeCurrency, setCodeCurrency] = useState<string>();
    const [name, setName] = useState<string>('');
    const [color, setColor] = useState('#ffffff');

    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await fetchPostData("/currency", {
                code: codeCurrency,
                name: name,
                color: color,
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

    const handleChangeColor = (e: any) => {
        setColor(e.target.value);
    };

    async function fetchCurrrency({id}: { id: any }) {
        if (id) {
            const currency: ICurrency = await fetchGetData("/currency/" + id);
            setCodeCurrency(currency.code);
            setName(currency.name);
            setColor(currency.color);
        }
    }

    useEffect(() => {
        fetchCurrrency({id: id});
    }, [id])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    {id ? 'Editar' : 'Adicionar'} Moeda
                </FormTitle>
                <FormItem>
                    <small>Código</small>
                    <Input
                        disabled={!!id}
                        placeholder="codigo"
                        type="text"
                        required
                        defaultValue={codeCurrency}
                        onChange={(e) => setCodeCurrency(e.target.value)}
                        onFocus={(e) => setError('')}
                    />
                </FormItem>
                <FormItem>
                    <small>Nome</small>
                    <Input
                        placeholder="nome"
                        type="text"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={(e) => setError('')}
                    />
                </FormItem>
                <FormItem>
                    <small>Cor</small>
                    <div>
                        <Input type="color"
                               placeholder="clique na caixa para selecionar"
                               value={color}
                               onChange={handleChangeColor}
                               onFocus={(e) => setError('')}/>
                    </div>
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

export default Currency;