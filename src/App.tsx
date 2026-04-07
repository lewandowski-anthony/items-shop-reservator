import {NavBar} from "./components/NavBar.tsx";
import {HomePage} from "./components/HomePage.tsx";
import {useState} from "react";

function App() {

    const [cartCount] = useState<number>(0)

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">

            <NavBar basketCount={cartCount}>
            </NavBar>

            <HomePage/>

            <footer className="border-t border-gray-200 py-10 text-center text-gray-500 text-sm">
                {/*TODO: add foot*/}
            </footer>
        </div>
    )
}

export default App