import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import "./styles.css";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const { signIn } = useContext(AuthContext);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setLoading(true);
        const data = {
            email,
            password
        };

        await signIn(data);

        setLoading(false);
        navigate("/");
    }

    return (
        <div className="container-login">
            <div className="content-login">
                <strong>Entrar</strong>
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Seu e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">{loading ? "Carregando..." : "Acessar"}</button>
                    <div className="create-acount">
                        <span>ou</span>
                        <Link to="/signUp">Criar conta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
