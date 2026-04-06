import { useState } from 'react'
import { ItemCard } from './components/ItemCard'
import './App.css'

function App() {
    const [cartCount, setCartCount] = useState<number>(0)

    const handleAddToCart = () => {
        setCartCount((prev) => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Navbar Simple */}
            <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-black tracking-tight text-indigo-600">
                    ITEM SHOP
                </h1>
                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold">
                    🛒 Panier : {cartCount}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="py-12 px-6 text-center">
                <h2 className="text-4xl font-extrabold sm:text-5xl">
                    Nos Meilleurs Articles
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Découvrez notre sélection de composants gaming et accessoires.
                    Cliquez sur les cartes pour tester vos fonctions React.
                </p>
            </header>

            {/* Grille de produits */}
            <main className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">

                    <ItemCard
                        title="Clavier Mécanique"
                        description="Switchs rouges linéaires pour une rapidité d'exécution sans pareille."
                        price={89}
                        isAvailable={true}
                        onAddToCart={handleAddToCart}
                    />

                    <ItemCard
                        title="Souris Sans Fil"
                        description="Capteur optique 25k DPI et autonomie de 70 heures."
                        price={55}
                        isAvailable={true}
                        onAddToCart={handleAddToCart}
                    />

                    <ItemCard
                        title="Écran 144Hz"
                        description="Dalle IPS 1ms pour une immersion totale dans vos jeux favoris."
                        price={199}
                        isAvailable={false}
                        onAddToCart={handleAddToCart}
                    />

                    <ItemCard
                        title="Casque Surround 7.1"
                        description="Microphone antibruit et confort longue durée."
                        price={120}
                        isAvailable={true}
                        onAddToCart={handleAddToCart}
                    />

                </div>
            </main>

            <footer className="border-t border-gray-200 py-10 text-center text-gray-500 text-sm">
                Built with Vite + React + Tailwind
            </footer>
        </div>
    )
}

export default App