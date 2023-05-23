import React from "react";
import {Container, Form, FormTitle, Logo} from "./styles";

import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignIn: React.FC = () => {
    return (
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira"/>
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={() => {
            }}>
                <FormTitle>
                    Entrar
                </FormTitle>

                <Input placeholder="e-mail" type="email" required/>
                <Input placeholder="senha" type="password" required/>

                <Button type="submit">Acessar</Button>
            </Form>
        </Container>
    )
}

export default SignIn;