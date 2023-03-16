import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import RoutesApp from "./routes";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <RoutesApp />
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
