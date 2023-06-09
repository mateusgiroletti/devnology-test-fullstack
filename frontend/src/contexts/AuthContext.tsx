import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

import { api } from "../services/api";

import { showNotification } from "../utils/showNotification";

type User = {
    email: string;
    token: string;
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
    const [user, setUser] = useLocalStorage<User | null>(
        "user_token",
        null
    );
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const { data } = await api.post("session", {
                email,
                password
            });

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
