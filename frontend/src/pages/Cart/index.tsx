import { useContext } from "react";
import { MinusCircle, PlusCircle, Trash } from "@phosphor-icons/react";

import Header from "../../components/Header";
import { CartContext } from "../../contexts/CartContext";

import formatMoneyToReal from "../../utils/formatMoneyToReal";

import "./styles.css";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../../utils/showNotification";
import { AxiosError } from "axios";

function Cart() {
    const {
        cart,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleRemoveProductFromCartByQuantity,
        clearCart
    } = useContext(CartContext);

    const { isAuthenticated, user } = useContext(AuthContext);
    const navigate = useNavigate();

    let total = 0;

    async function handleOrder() {
        if (cart.length === 0) {
            showNotification("Carrinho vazio! adicione algo para finalizar o pedido!", "error");
            return;
        }

        if (!isAuthenticated) {
            showNotification("Usuario não autenticado!", "error");
            navigate("/signIn");
            return;
        }

        const productsToData = cart.map((product) => {
            return {
                name: product.name,
                value: product.price ? product.price * product.quantity : 0,
                quantity: product.quantity,
                discount_value: product.discountValue
            };
        });

        const dataToPost = {
            products: productsToData,
            order: {
                value_total: total
            }
        };

        try {
            const response = await api.post("order", dataToPost, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                },
            });

            if (response.status === 200) {
                showNotification("Pedido criado com sucesso!", "success");

                clearCart();
                navigate("/");
            }

        } catch (error) {
            const { response } = error as AxiosError;

            if (response?.status === 401) {
                showNotification("Usuario não autorizado!", "error");
                return;
            }
        }
    }

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
                                    const subTotal = product.price ? product.price * product.quantity : 0;
                                    total = Number(total + subTotal);
                                    return (
                                        <tr key={`${product.id}_${product.origin}`}>
                                            <td>
                                                <div className="cart-image-product">
                                                    <img src={product.image} alt="" />
                                                </div>
                                            </td>
                                            <td>
                                                <strong>{product.name}</strong>
                                                <span>{formatMoneyToReal(String(product.price))}</span>
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
                                                <strong>{formatMoneyToReal(subTotal.toFixed(2))}</strong>
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
                                onClick={() => handleOrder()}
                            >
                                Finalizar pedido
                            </button>
                        </div>
                        <div className="total-cart">
                            <span>Total:</span>
                            <strong>{formatMoneyToReal(total.toFixed(2))}</strong>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Cart;
