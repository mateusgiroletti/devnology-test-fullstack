import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

type User = {
    email: string;
}

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn(credentitals: SignInCredentials): Promise<void>;
    user: User;
    isAuthenticated: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = false;

    async function signIn({ email, password }: SignInCredentials) {
        try {
            const { data } = await api.post("session", {
                email,
                password
            });

            localStorage.setItem("user_token", JSON.stringify(data));

            setUser({
                email
            });

            return;
        } catch (error) {
            console.log("Usuario não autorizado!");
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
    );
}
