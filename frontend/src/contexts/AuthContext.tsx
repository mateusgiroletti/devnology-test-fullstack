import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

import { showNotification } from "../utils/showNotification";

type User = {
    email: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type SignUpCredentials = {
    name: string;
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentitals: SignInCredentials): Promise<void>;
    signUp(credentitals: SignUpCredentials): Promise<void>;
    signOut(): void;
    user: User,
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (userToken) {
            const { data } = JSON.parse(userToken);
            setUser(data);
        }
    }, []);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const { data } = await api.post("session", {
                email,
                password
            });

            localStorage.setItem("user_token", JSON.stringify({ data }));

            setUser(data);

            return;
        } catch (error) {
            showNotification("Falha de autenticação!", "error");
        }
    }

    async function signUp({ name, email, password }: SignUpCredentials) {
        try {
            const { data } = await api.post("user", {
                name,
                email,
                password
            });

            localStorage.setItem("user_token", JSON.stringify({ data }));

            setUser(data);

            return;
        } catch (error) {
            showNotification("E-mail já cadastrado!", "error");

        }
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, isAuthenticated, signOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}
