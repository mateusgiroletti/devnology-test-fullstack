import { AuthProvider } from "./contexts/AuthContext";
import RoutesApp from "./routes";

function App() {
    return (
        <AuthProvider>
            <RoutesApp />
        </AuthProvider>
    );
}

export default App;
