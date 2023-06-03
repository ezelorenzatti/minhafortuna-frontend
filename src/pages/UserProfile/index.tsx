import React, {useEffect, useState} from "react";
import {Container, ErrorMessage, Form, FormTitle, SuccessMessage} from "./styles";

import Input from "../../components/Input";
import Button from "../../components/Button";
import {fetchGetData, fetchPostData} from "../../services/api/api";

interface IUserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

const UserProfile: React.FC = () => {
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

            const message = await fetchPostData("/usuario", {
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

    async function fetchProfile() {
        const profile: IUserProfile = await fetchGetData("/usuario/profile");
        setId(profile.id);
        setName(profile.name);
        setPhone(profile.phone);
        setEmail(profile.email);
    }

    useEffect(() => {
        fetchProfile();
    }, [])

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    Meu Perfil
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
                    defaultValue={phone}
                    onChange={(e) => setPhone(e.target.value)}
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