import { FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const { signUp } = useContext(AuthContext);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = {
            name,
            email,
            password
        };

        await signUp(data);

        navigate("/");
    }

    return (
        <div className="container-login">
            <div className="content-login">
                <strong>Cadastrar</strong>
                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        type="name"
                        placeholder="Seu nome"
                        onChange={(e) => setName(e.target.value)}

                    />
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

                    <button type="submit">{loading ? "Carregando..." : "Cadastrar"}</button>
                    <div className="create-acount">
                        <span>ou</span>
                        <Link to="/signIn">Fazer Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
