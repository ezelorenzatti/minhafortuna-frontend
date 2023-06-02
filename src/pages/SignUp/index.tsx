import React, {useState} from "react";
import {Container, ErrorMessage, Form, FormTitle, Logo} from "./styles";

import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import {useAuth} from '../../hooks/auth';
import {useNavigate} from "react-router-dom";

const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {signUp} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signUp(name, email, password, confirmPassword);
        } catch (message: any) {
            setError(message);
        }
    }
    const handleBack = async (e: any) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira"/>
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={handleSubmit}>
                <FormTitle>
                    Cadastre-se
                </FormTitle>

                <Input
                    placeholder="nome"
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => setError('')}
                />

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
                <Input
                    placeholder="confirmar senha"
                    type="password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={(e) => setError('')}
                />

                <Button type="submit">Cadastrar</Button>
                <Button type="button" onClick={handleBack}>Voltar</Button>
            </Form>

            {error &&
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            }
        </Container>
    )
}

export default SignUp;