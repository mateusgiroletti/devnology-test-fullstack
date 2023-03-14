import { ShoppingCart, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import Search from "../Search";

import "./styles.css";

function Header() {
    return (
        <header>
            <Link to="/" className="home-title">
                <strong>Minha Loja</strong>
            </Link>

            <Search />

            <div className="container-login">
                <a href="">
                    <User size={36} weight="bold" color="#FFF" />
                </a>

                <div>
                    <div>
                        <a href="">Entrar</a>
                    </div>
                    <span>
                        ou
                    </span>
                    <div>
                        <a href="">Cadastrar</a>
                    </div>
                </div>
            </div>

            <Link to="/cart"  className="container-cart">
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
