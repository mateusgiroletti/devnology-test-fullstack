import { createContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { showNotification } from "../utils/showNotification";

type CartItem = {
    id: number;
    name: string;
    image: string;
    origin: string;
    newPrice?: number;
    price?: number;
    quantity?: number
    hasDiscount?: boolean | null;
    discountValue?: number | null;
}

type CartProviderProps = {
    children: ReactNode;
}

type CartContextData = {
    cart: CartItem[];
    cartLength: () => number;
    handleAddProductToCart: (productToAdd: CartItem) => void
    handleRemoveProductFromCart: (productToDelete: CartItem) => void
    handleRemoveProductFromCartByQuantity: (productToDelete: CartItem) => void
    clearCart: () => void
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useLocalStorage<CartItem[]>(
        "cart_products",
        []
    );

    function handleAddProductToCart(productToAdd: CartItem) {
        const product = {
            name: productToAdd.name,
            price: productToAdd.newPrice,
            image: productToAdd.image,
            origin: productToAdd.origin,
            id: productToAdd.id,
            quantity: 1,
            hasDiscount: productToAdd.hasDiscount ?? null,
            discountValue: productToAdd.discountValue ?? null
        };

        const productInCart = cart.find((cartProduct) => cartProduct.id === product.id && cartProduct.origin === product.origin);

        if (!productInCart) {
            setCart([...cart, product]);
            showNotification("Produto adicionado ao carrinho!", "success");
        } else {
            productInCart.quantity++;
            setCart([...cart]);
        }
    }

    function handleRemoveProductFromCart(productToDelete: CartItem) {
        const filteredCart = cart.find((product) => product.id === productToDelete.id && product.origin === productToDelete.origin);

        if (filteredCart) {
            const indexProductFiltred = cart.indexOf(filteredCart);
            cart.splice(indexProductFiltred, 1);

            setCart([...cart]);
        }
    }

    function handleRemoveProductFromCartByQuantity(productToDelete: CartItem) {
        const productInCart = cart.find((cartProduct) => cartProduct.id === productToDelete.id && cartProduct.origin === productToDelete.origin);

        if (productInCart) {
            if (productInCart.quantity > 1) {
                productInCart.quantity--;
                setCart([...cart]);
            } else {
                handleRemoveProductFromCart(productToDelete);
            }
        }

    }

    function clearCart() {
        if (cart.length === 0) {
            showNotification("O carrinho já se encontra vazio!", "error");
            return;
        }
        setCart([]);
    }

    function cartLength() {
        if (cart.length > 0) {
            return cart.length;
        }
        return 0;
    }

    return (
        <CartContext.Provider value={
            {
                cart,
                handleAddProductToCart,
                handleRemoveProductFromCart,
                handleRemoveProductFromCartByQuantity,
                clearCart,
                cartLength
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
