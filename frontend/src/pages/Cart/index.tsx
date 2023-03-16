import { useContext, useState } from "react";
import { MinusCircle, PlusCircle, Trash } from "@phosphor-icons/react";

import Header from "../../components/Header";
import { CartContext } from "../../contexts/CartContext";

import formatMoneyToReal from "../../utils/formatMoneyToReal";

import "./styles.css";

function Cart() {
    const {
        cart,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleRemoveProductFromCartByQuantity,
        clearCart
    } = useContext(CartContext);

    let total = 0;

    return (
        <>
            <Header />

            <div className="wrapper-cart">
                <div className="container-cart">
                    <table>
                        <thead>
                            <tr>
                                <th />
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Subtotal</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart?.map((product) => {
                                    const subTotal = (product.price * product.quantity).toFixed(2);
                                    total = Number(total + subTotal).toFixed(2);
                                    return (
                                        <tr key={`${product.id}_${product.origin}`}>
                                            <td>
                                                <div className="cart-image-product">
                                                    <img src={product.image} alt="" />
                                                </div>
                                            </td>
                                            <td>
                                                <strong>{product.name}</strong>
                                                <span>{formatMoneyToReal(product.price)}</span>
                                            </td>
                                            <td>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProductFromCartByQuantity(product)}
                                                    >
                                                        <MinusCircle size={32} color="#2e86de" />
                                                    </button>
                                                    <input type="number" value={product.quantity} readOnly />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddProductToCart(product)}
                                                    >
                                                        <PlusCircle size={32} color="#2e86de" />
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <strong>{formatMoneyToReal(subTotal)}</strong>
                                            </td>
                                            <td>
                                                <button>
                                                    <Trash
                                                        size={32}
                                                        color="#2e86de"
                                                        onClick={() => handleRemoveProductFromCart(product)}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>

                    <footer>
                        <div className="button-action-footer">
                            <button
                                type="button"
                                onClick={() => clearCart()}
                            >
                                Limpar carrinho
                            </button>
                            <button
                                type="button"
                                onClick={() => console.log("clicou")}
                            >
                                Finalizar pedido
                            </button>
                        </div>
                        <div className="total-cart">
                            <span>Total:</span>
                            <strong>{formatMoneyToReal(String(total))}</strong>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Cart;
