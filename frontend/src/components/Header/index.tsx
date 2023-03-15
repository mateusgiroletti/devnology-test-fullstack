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

            <div className="container-header-login">
                <a href="">
                    <User size={36} weight="bold" color="#FFF" />
                </a>

                <div>
                    <div>
                        <Link to="/signIn" >Entrar</Link>
                    </div>
                    <span>
                        ou
                    </span>
                    <div>
                        <Link to="/signUp" >Cadastrar</Link>
                    </div>
                </div>
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
