import { useContext, useState } from "react";

import Header from "../../components/Header";
import { CartContext } from "../../contexts/CartContext";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import formatMoneyToReal from "../../utils/formatMoneyToReal";

import "./styles.css";

function Home() {
    const { productNational, productEuropeon, isFetching } = useFetchProducts();
    const { handleAddProductToCart } = useContext(CartContext);

    const [search, setSearch] = useState("");

    const productsNationalFilter = productNational?.filter((product) => product.nome.startsWith(search));
    const productsEuropeonFilter = productEuropeon?.filter((product) => product.name.startsWith(search));

    return (
        <>
            <Header />

            <main>
                <nav>
                    <input
                        type="text"
                        placeholder="Digite para pesquisar"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </nav>

                <section>
                    {
                        isFetching ? (
                            <p>Carregando</p>
                        ) : (
                            <ul className="list-products">
                                {productsNationalFilter?.map(product => {
                                    product.name = product.nome;
                                    product.newPrice = Number(product.preco).toFixed(2);
                                    product.image = product.imagem;
                                    product.origin = "nacional";
                                    return (
                                        <li key={product.id}>
                                            <img src={product.imagem} alt="" />

                                            <strong>{product.nome}</strong>
                                            <span>{formatMoneyToReal(product.preco)}</span>

                                            <button
                                                type="button"
                                                onClick={() => handleAddProductToCart(product)}
                                            >
                                                Adicionar ao Carrinho
                                            </button>
                                        </li>
                                    );
                                })}
                                {productsEuropeonFilter?.map(product => {
                                    const originalPrice = product.price;
                                    const newPrice = product.hasDiscount ? Number(product.price - (product.price * product.discountValue)).toFixed(2) : Number(product.price);
                                    product.origin = "europeon";
                                    product.image = product.gallery[0];
                                    product.newPrice = Number(newPrice);

                                    return (
                                        <li key={product.id}>
                                            <img src={product.gallery[0]} alt="" />

                                            {product.hasDiscount && (
                                                <div className="discount">
                                                    <span>{Number(product.discountValue) * 100}% OFF</span>
                                                </div>
                                            )}

                                            <strong>{product.name}</strong>

                                            {product.hasDiscount && (
                                                <del className="original-price">{formatMoneyToReal(originalPrice)}</del>
                                            )}
                                            <span>{formatMoneyToReal(String(newPrice))}</span>
                                            <button
                                                onClick={() => handleAddProductToCart(product)}
                                            >
                                                Adicionar ao Carrinho
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )
                    }
                </section>
            </main>
        </>
    );
}

export default Home;
