import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function SignIn() {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <div className="container-login">
            <div className="content-login">
                <strong>Entrar</strong>
                <form onSubmit={handleSubmit}>
                    <input name="email" type="email" placeholder="Seu e-mail" />
                    <input
                        name="password"
                        type="password"
                        placeholder="Sua senha"
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
