import { ShoppingCart, User } from "@phosphor-icons/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

import "./styles.css";

function Header() {
    const { isAuthenticated, signOut } = useContext(AuthContext);

    return (
        <header>
            <Link to="/" className="home-title">
                <strong>Minha Loja</strong>
            </Link>

            <div className="container-header-login">
                <User size={36} weight="bold" color="#FFF" />

                {
                    isAuthenticated ? (
                        <div className="logged">
                            <span>
                                Bem vindo
                            </span>
                            <a href="" onClick={() => signOut()}>
                                Clique aqui para sair
                            </a>
                        </div>

                    ) : (
                        <div className="logged">
                            <Link to="/signIn" >Entrar</Link>
                            <span>
                                ou
                            </span>
                            <Link to="/signUp" >Cadastrar</Link>
                        </div>
                    )
                }
            </div>

            <Link to="/cart" className="container-header-cart">
                <ShoppingCart size={36} color="#FFF" />

                <div>
                    <strong>Carrinho</strong>
                    <span>2 Itens</span>
                </div>
            </Link>
        </header>
    );
}

export default Header;
