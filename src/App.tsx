import { useState } from 'react'
import { ItemCard } from './components/ItemCard'
import './App.css'
import {NavBar} from "./components/NavBar.tsx";
import {useTranslation} from "react-i18next";

function App() {
    const [cartCount, setCartCount] = useState<number>(0)

    const {t} = useTranslation()

    const handleAddToCart = () => {
        setCartCount((prev) => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            <NavBar basketCount={cartCount}>
            </NavBar>

            {/* Hero Section */}
            <header className="py-12 px-6 text-center">
                <h2 className="text-4xl font-extrabold sm:text-5xl">
                    {t('mainPage.label')}
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    {t('mainPage.description')}
                </p>
            </header>

            <main className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">

                    <ItemCard
                        title="Clavier Mécanique"
                        description="Switchs rouges linéaires pour une rapidité d'exécution sans pareille."
                        price={89}
                        isReserved={false}
                        onAddToCart={handleAddToCart}
                    />

                </div>
            </main>

            <footer className="border-t border-gray-200 py-10 text-center text-gray-500 text-sm">
                {/*TODO: add foot*/}
            </footer>
        </div>
    )
}

export default App