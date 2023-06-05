import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Container, ErrorMessage, Form, FormTitle, Logo} from "./styles";

import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import {useAuth} from '../../hooks/auth';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {signIn} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signIn(email, password);
        } catch (error: any) {
            setError(error.message);
        }
    }

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        navigate("/signup");
    }

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Fortuna"/>
                <h2>Minha Fortuna</h2>
            </Logo>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    Entrar
                </FormTitle>

                <Input
                    placeholder="e-mail"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => setError('')}
                />
                <Input
                    placeholder="senha"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={(e) => setError('')}
                />

                <Button type="submit">Acessar</Button>
                <Button type="button" onClick={handleSignUp}>Cadastre-se</Button>
            </Form>

            {error &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </Container>
    )
}

export default SignIn;