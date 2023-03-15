import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

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
    user: User;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (userToken) {
            const { data: { email } } = JSON.parse(userToken);
            setUser({
                email
            });
        }
    }, []);

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const { data } = await api.post("session", {
                email,
                password
            });

            localStorage.setItem("user_token", JSON.stringify({ data }));

            setUser({
                email
            });

            return;
        } catch (error) {
            console.log("Usuario não autorizado!");
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

            setUser({
                email
            });

            return;
        } catch (error) {
            console.log("E-mail já cadastrado!");
        }
    }

    function signOut() {
        setUser(null);
        localStorage.removeItem("user_token");
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, isAuthenticated, user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
