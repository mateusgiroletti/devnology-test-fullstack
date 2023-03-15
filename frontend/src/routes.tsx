import { BrowserRouter, Route, Routes } from "react-router-dom";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";

function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SingUp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;
