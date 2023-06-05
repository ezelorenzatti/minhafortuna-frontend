import React, {createContext, useContext, useState} from 'react';
import {fetchPostData} from "../services/api/api";

interface Props {
    children?: React.ReactNode
}

interface IAuthContext {
    logged: boolean;

    loggedUser: string;

    token: string;

    signIn(email: string, password: string, simulatedData?: boolean): void;

    signUp(name: string, email: string, password: string, confirmPassword: string): void

    signOut(): void

}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<Props> = ({children}) => {

    const [loggedUser, setLoggedUser] = useState<string>(
        () => {
            const loggedUser = sessionStorage.getItem('@minha-fortuna:loggedUser') || '';
            return loggedUser;
        }
    );
    const [logged, setLogged]
        = useState<boolean>(() => {
        const isLogged = sessionStorage.getItem('@minha-fortuna:logged');
        return !!isLogged;
    });
    const [token, setToken]
        = useState<string>(() => {
        const token = sessionStorage.getItem('@minha-fortuna:token') || '';
        return token;
    });

    const signIn = async (email: string, password: string, simulateData?: boolean) => {
        try {
            const response = await fetchPostData("/auth/signin", {
                email: email,
                password: password,
                simulateData: simulateData
            })
            const token = response.token;
            const loggedUser = JSON.parse(atob(token.split('.')[1])).name;
            sessionStorage.setItem('@minha-fortuna:token', token);
            sessionStorage.setItem('@minha-fortuna:logged', 'true');
            sessionStorage.setItem('@minha-fortuna:loggedUser', loggedUser);
            setToken(token);
            setLogged(true);
            setLoggedUser(loggedUser);
        } catch (error: any) {
            throw error;
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
            sessionStorage.setItem('@minha-fortuna:token', token);
            sessionStorage.setItem('@minha-fortuna:loggedUser', loggedUser);
            setToken(token);
            setLoggedUser(loggedUser);
        } catch (error: any) {
            throw error;
        }
    }

    const signOut = () => {
        sessionStorage.removeItem('@minha-fortuna:logged');
        sessionStorage.removeItem('@minha-fortuna:token');
        sessionStorage.removeItem('@minha-fortuna:loggedUser');
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