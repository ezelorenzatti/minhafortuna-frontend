import React, {useCallback, useEffect, useState} from "react";
import {Container, ErrorMessage, Form, FormItem, FormTitle, SuccessMessage} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/auth";
import {BarLoaderCustom, ExampleData, ExampleDataTitle, Message} from "../SignUp/styles";
import {BarLoader} from "react-spinners";

interface IUserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const UserProfile: React.FC = () => {
    const {signOut} = useAuth();
    const navigator = useNavigate();
    const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false);
    const [waitProcess, setWaitProcess] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                setError("Senha e confirmação de senha devem ser iguais");
                return;
            }

            const message = await fetchPostData("/user", {
                id: id,
                name: name,
                email: email,
                phone: phone,
                password: password,
                confirmPassword: confirmPassword
            });
            setMessage(message);
        } catch (message: any) {
            setError(message);
        }
    }

    const fetchProfile = useCallback(async () => {
        try {
            const profile: IUserProfile = await fetchGetData("/user/profile");
            setId(profile.id);
            setName(profile.name);
            setPhone(profile.phone);
            setEmail(profile.email);
        } catch (error: any) {
            if (error.status === 401) {
                signOut();
                navigator('/')
            }
        }
    }, [navigator, signOut])


    useEffect(() => {
        fetchProfile();
    }, [fetchProfile])

    const handleCancelClick = () => {
        navigator(-1);
    }
    const handleRemoveClick = () => {
        setShowDeleteAccount(true);
    }
    const handleConfirmRemoveClick = async (e: any) => {
        e.preventDefault();
        setWaitProcess(true);
        await fetchPostData("/user/delete");
        navigator("/");
        signOut();
    }

    const handleNotConfirmRemoveClick = () => {
        navigator(-1);
    }

    return (
        <Container>
            {!showDeleteAccount &&
                <Form onSubmit={handleSubmit}>
                    <FormTitle>
                        Meu Perfil
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
                        <small>E-mail</small>
                        <Input
                            placeholder="e-mail"
                            type="email"
                            required
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => setError('')}
                        />
                    </FormItem>
                    <FormItem>
                        <small>Fone</small>
                        <Input
                            placeholder="fone"
                            type="text"
                            defaultValue={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={(e) => setError('')}
                        />
                    </FormItem>
                    <FormItem>
                        <small>Senha</small>
                        <Input
                            placeholder="senha"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => setError('')}
                        />
                    </FormItem>
                    <FormItem>
                        <small>Confirmar senha</small>
                        <Input
                            placeholder="confirmar senha"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={(e) => setError('')}
                        />
                    </FormItem>

                    <Button type="submit">Salvar</Button>
                    <Button type="button" onClick={handleCancelClick}>Cancelar</Button>
                    <Button type="button" onClick={handleRemoveClick}>Excluir minha conta!</Button>
                </Form>
            }

            {showDeleteAccount &&
                <ExampleData>
                    <ExampleDataTitle>
                        Confirmação
                    </ExampleDataTitle>
                    <Button onClick={handleConfirmRemoveClick}>Sim, remover minha conta!</Button>
                    <Button onClick={handleNotConfirmRemoveClick}>Não remover!</Button>
                    <Message>
                        Todos os seus dados serão excluídos sem possibilidade de recuperação!
                    </Message>

                    {waitProcess &&
                        <BarLoaderCustom>
                            <BarLoader color={"red"}/>
                        </BarLoaderCustom>
                    }
                </ExampleData>
            }

            {error &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }

            {message &&
                <SuccessMessage>
                    {message}
                </SuccessMessage>
            }
        </Container>
    )
}

export default UserProfile;