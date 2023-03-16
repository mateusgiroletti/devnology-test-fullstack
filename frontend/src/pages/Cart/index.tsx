import { MinusCircle, PlusCircle, Trash } from "@phosphor-icons/react";
import Header from "../../components/Header";
import "./styles.css";

function Cart() {
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
                            <tr>
                                <td>
                                    <img src="http://placeimg.com/640/480/business" alt="" />
                                </td>
                                <td>
                                    <strong>Tenis</strong>
                                    <span>R$ 130,00</span>
                                </td>
                                <td>
                                    <div>
                                        <button type="button">
                                            <MinusCircle size={32} color="#2e86de" />
                                        </button>
                                        <input type="number" value={1} readOnly />
                                        <button type="button">
                                            <PlusCircle size={32} color="#2e86de" />
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <strong>R$ 130</strong>
                                </td>
                                <td>
                                    <button>
                                        <Trash size={32} color="#2e86de" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <footer>
                        <button type="button">Finalizar pedido</button>

                        <div>
                            <span>Total</span>
                            <span>R$ 2000</span>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Cart;
