import { useState } from "react";
import Header from "../../components/Header";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import "./styles.css";

function Home() {
    const { productNational, productEuropeon, isFetching } = useFetchProducts();
    const [search, setSearch] = useState("");

    function formatMoneyToReal(value: string) {
        let newValue = value.replace(/\D/g, "");
        newValue = newValue.replace(/(\d{1,2})$/, ",$1");
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

        return `R$ ${newValue}`;
    }

    const productsNationalFilter = productNational?.filter((product: any) => product.nome.startsWith(search));
    const productsEuropeonFilter = productEuropeon?.filter((product: any) => product.name.startsWith(search));

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
                                    return (
                                        <li key={product.id}>
                                            <img src={product.imagem} alt="" />

                                            <strong>{product.nome}</strong>
                                            <span>{formatMoneyToReal(product.preco)}</span>

                                            <button>Adicionar ao Carrinho</button>
                                        </li>
                                    );
                                })}
                                {productsEuropeonFilter?.map(product => {
                                    const price = product.hasDiscount ? product.price - (product.price * product.discountValue) : product.price;
                                    return (
                                        <li key={product.id}>
                                            <img src={product.gallery[0]} alt="" />

                                            {product.hasDiscount && (
                                                <div className="discount">
                                                    <span>{product.discountValue * 100}% OFF</span>
                                                </div>
                                            )}

                                            <strong>{product.name}</strong>

                                            {product.hasDiscount && (
                                                <del className="original-price">{formatMoneyToReal(product.price)}</del>
                                            )}
                                            <span>{formatMoneyToReal(String(price))}</span>
                                            <button>Adicionar ao Carrinho</button>
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
