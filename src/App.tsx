import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from "./components/NavBar.tsx";
import { HomePage } from "./components/HomePage.tsx";
import { ConfirmEmail } from "./components/ConfirmEmail.tsx";

const basename = import.meta.env.VITE_BASE_URL || '';

function App() {
    return (
        <BrowserRouter basename={basename}>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
                <NavBar />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/confirm-reservation" element={<ConfirmEmail />} />
                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </main>

                <footer className="border-t border-gray-200 py-10 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Mon Vide Maison</p>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;