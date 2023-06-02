import React, {useEffect, useState} from "react";
import {Container, ErrorMessage, Form, FormTitle, SuccessMessage} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";

interface IUserProfile {
    id: string;
    nome: string;
    email: string;
    fone: string;
    senha: string;
    confirmarSenha: string;
}

const UserProfile: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [fone, setFone] = useState<string>('');
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

            const message = await fetchPostData("/usuario", {
                id: id,
                nome: name,
                email: email,
                fone: fone,
                senha: password,
                confirmarSenha: confirmPassword
            });
            setMessage(message);
        } catch (message: any) {
            setError(message);
        }
    }

    async function fetchProfile() {
        const profile: IUserProfile = await fetchGetData("/usuario/profile");
        setId(profile.id);
        setName(profile.nome);
        setFone(profile.fone);
        setEmail(profile.email);
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    Meu Cadastro
                </FormTitle>
                <Input
                    placeholder="nome"
                    type="text"
                    required
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => setError('')}
                />

                <Input
                    placeholder="e-mail"
                    type="email"
                    required
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => setError('')}
                />
                <Input
                    placeholder="fone"
                    type="text"
                    defaultValue={fone}
                    onChange={(e) => setFone(e.target.value)}
                    onFocus={(e) => setError('')}
                />
                <Input
                    placeholder="senha"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => setError('')}
                />
                <Input
                    placeholder="confirmar senha"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={(e) => setError('')}
                />

                <Button type="submit">Salvar</Button>
            </Form>

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