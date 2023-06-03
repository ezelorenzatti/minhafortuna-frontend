import React, {createContext, useContext, useState} from 'react';
import {fetchPostData} from "../services/api/api";

interface Props {
    children?: React.ReactNode
}

interface IAuthContext {
    logged: boolean;

    loggedUser: string;

    token: string;

    signIn(email: string, password: string): void;

    signUp(name: string, email: string, password: string, confirmPassword: string): void

    signOut(): void

}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const messageError: any = {Unauthorized: "Não Autorizado"};

const AuthProvider: React.FC<Props> = ({children}) => {

    const [loggedUser, setLoggedUser] = useState<string>(
        () => {
            const loggedUser = localStorage.getItem('@minha-carteira:loggedUser') || '';
            return loggedUser;
        }
    );
    const [logged, setLogged]
        = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');
        return !!isLogged;
    });
    const [token, setToken]
        = useState<string>(() => {
        const token = localStorage.getItem('@minha-carteira:token') || '';
        return token;
    });

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetchPostData("/auth/signin", {email: email, password: password})
            const token = response.token;
            const loggedUser = JSON.parse(atob(token.split('.')[1])).name;
            localStorage.setItem('@minha-carteira:token', token);
            localStorage.setItem('@minha-carteira:logged', 'true');
            localStorage.setItem('@minha-carteira:loggedUser', loggedUser);
            setToken(token);
            setLogged(true);
            setLoggedUser(loggedUser);
        } catch (error: any) {
            const message = messageError[error.response.data.error] || error.response.data.error;
            throw message;
        }
    }

    const signUp = async (name: string, email: string, password: string, confirmPassword: string) => {
        try {
            const response = await fetchPostData("/auth/signup", {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
            const token = response.token;
            const loggedUser = JSON.parse(atob(token.split('.')[1])).name;
            localStorage.setItem('@minha-carteira:token', token);
            localStorage.setItem('@minha-carteira:logged', 'true');
            localStorage.setItem('@minha-carteira:loggedUser', loggedUser);
            setToken(token);
            setLogged(true);
            setLoggedUser(loggedUser);
        } catch (error: any) {
            const message = messageError[error.response.data.error] || error.response.data.error;
            throw message;
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        localStorage.removeItem('@minha-carteira:token');
        localStorage.removeItem('@minha-carteira:loggedUser');
        setToken('');
        setLogged(false)
        setLoggedUser('');
    }

    return (
        <AuthContext.Provider value={{logged, token, signIn, signOut, signUp, loggedUser}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth};