import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
    const [loading, setLoading] = useState<boolean>(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }

    return (
        <div className="container-login">
            <div className="content-login">
                <strong>Cadastrar</strong>
                <form onSubmit={handleSubmit}>
                    <input name="name" type="name" placeholder="Seu nome" />
                    <input name="email" type="email" placeholder="Seu e-mail" />
                    <input
                        name="password"
                        type="password"
                        placeholder="Sua senha"
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
