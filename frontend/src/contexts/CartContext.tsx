import { createContext, ReactNode, useEffect, useState } from "react";

type CartProviderProps = {
    children: ReactNode;
}

export const CartContext = createContext({});

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState([]);

    function handleAddProductToCart({ id, origin, name, newPrice, image, hasDiscount, discountValue }) {
        const product = {
            name,
            price: newPrice,
            image,
            origin,
            id,
            quantity: 1,
            hasDiscount: hasDiscount ?? null,
            discountValue: discountValue ?? null
        };


        const productInCart = cart.find((cartProduct) => cartProduct.id === product.id && cartProduct.origin === product.origin);

        if (!productInCart) {
            setCart([...cart, product]);
        } else {
            productInCart.quantity++;
            setCart([...cart]);
        }
    }

    function handleRemoveProductFromCart(productToDelete) {
        const filteredCart = cart.find((product) => product.id === productToDelete.id && product.origin === productToDelete.origin);
        const indexProductFiltred = cart.indexOf(filteredCart);

        cart.splice(indexProductFiltred, 1);

        setCart([...cart]);
    }

    function handleRemoveProductFromCartByQuantity(productToDelete) {
        const productInCart = cart.find((cartProduct) => cartProduct.id === productToDelete.id && cartProduct.origin === productToDelete.origin);

        if (productInCart.quantity > 1) {
            productInCart.quantity--;
            setCart([...cart]);
        } else {
            handleRemoveProductFromCart(productToDelete);
        }
    }

    function clearCart() {
        setCart([]);
    }

    function cartLength() {
        if (cart.length > 0) {
            return cart.length;
        }
        return 0;
    }

    return (
        <CartContext.Provider value={{ cart, handleAddProductToCart, handleRemoveProductFromCart, handleRemoveProductFromCartByQuantity, clearCart, cartLength }}>
            {children}
        </CartContext.Provider>
    );
};
