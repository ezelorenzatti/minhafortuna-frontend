import React, {useState} from "react";
import {
    BarLoaderCustom,
    Container,
    ErrorMessage,
    ExampleData,
    ExampleDataTitle,
    Form,
    FormTitle,
    Logo,
    Message
} from "./styles";

import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import {useAuth} from '../../hooks/auth';
import {useNavigate} from "react-router-dom";
import {BarLoader} from "react-spinners";

const SignUp: React.FC = () => {
    const [finishSignUp, setFinishSignUp] = useState<boolean>(false);
    const [waitProcess, setWaitProcess] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const {signUp, signIn} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await signUp(name, email, password, confirmPassword);
            setFinishSignUp(true);
        } catch (error: any) {
            setError(error.message);
        }
    }
    const handleBack = async (e: any) => {
        e.preventDefault();
        navigate(-1);
    }

    const handleCreateSimulateData = async (e: any) => {
        e.preventDefault();
        setWaitProcess(true);
        await signIn(email, password, true);
        navigate('/');
    }

    const handleCreateWithOutSimulateData = async (e: any) => {
        e.preventDefault();
        await signIn(email, password, false);
        navigate('/');
    }


    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira"/>
                <h2>Minha Carteira</h2>
            </Logo>
            {!finishSignUp &&
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
            }

            {
                finishSignUp &&
                <ExampleData>
                    <ExampleDataTitle>
                        Deseja iniciar com dados simulados ?
                    </ExampleDataTitle>
                    <Button onClick={handleCreateSimulateData}>Sim, Criar dados simulados!</Button>
                    <Button onClick={handleCreateWithOutSimulateData}>Não, Continuar sem dados!</Button>
                    <Message>
                        Você poderá remover sua conta a qualquer momento!
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
        </Container>
    )
}

export default SignUp;