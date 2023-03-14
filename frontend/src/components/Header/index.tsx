import { ShoppingCart, User } from "@phosphor-icons/react";

import Search from "../Search";

import "./styles.css";

function Header() {
    return (
        <header>
            <a href="" className="home-title">
                <strong>Minha Loja</strong>
            </a>

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

            <a href="" className="container-cart">
                <ShoppingCart size={36} color="#FFF" />

                <div>
                    <strong>Carrinho</strong>
                    <span>2 Itens</span>
                </div>
            </a>
        </header>
    );
}

export default Header;
