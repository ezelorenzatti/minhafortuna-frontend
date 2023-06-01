import React, {createContext, useContext, useState} from 'react';
import {fetchPostData} from "../services/api/api";

interface Props {
    children?: React.ReactNode
}

interface IAuthContext {
    logged: boolean;

    loggedUser: string;

    signIn(email: string, password: string): void;

    signOut(): void

}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<Props> = ({children}) => {
    const [loggedUser, setLoggedUser] = useState<string>('');
    const [logged, setLogged]
        = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');
        return !!isLogged;
    });

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetchPostData("/auth", {email: email, senha: password})
            const token = response.token;
            localStorage.setItem('@minha-carteira:token', token);
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
            setLoggedUser(JSON.parse(atob(token.split('.')[1])).name);
        } catch (error: any) {
            throw error;
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        localStorage.removeItem('@minha-carteira:token');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut, loggedUser}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);
    return context;
}

export {AuthProvider, useAuth};