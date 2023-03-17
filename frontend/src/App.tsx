import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import RoutesApp from "./routes";

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <RoutesApp />
            </CartProvider>
            <ToastContainer />
        </AuthProvider>
    );
}

export default App;
