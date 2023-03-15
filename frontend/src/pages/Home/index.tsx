import Header from "../../components/Header";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import "./styles.css";

function Home() {
    const { productNational, productEuropeon, isFetching } = useFetchProducts();

    function formatMoneyToReal(value: string) {
        let newValue = value.replace(/\D/g, "");
        newValue = newValue.replace(/(\d{1,2})$/, ",$1");
        newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

        return `R$ ${newValue}`;
    }

    return (
        <>
            <Header />

            <main>
                <section>
                    {
                        isFetching ? (
                            <p>Carregando</p>
                        ) : (
                            <ul className="list-products">
                                {productNational?.map(product => {
                                    return (
                                        <li key={product.id}>
                                            <img src={product.imagem} alt="" />

                                            <strong>{product.nome}</strong>
                                            <span>{formatMoneyToReal(product.preco)}</span>

                                            <button>Adicionar ao Carrinho</button>
                                        </li>
                                    );
                                })}
                                {productEuropeon?.map(product => {
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
