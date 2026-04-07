import { useTranslation } from 'react-i18next';
import {LanguageButton} from "./LanguageButton.tsx";


export const NavBar = () => {

    const {t} = useTranslation();
    return (
        <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tight text-indigo-600">
                {t('appName')}
            </h1>
            <LanguageButton/>
        </nav>
    )
}