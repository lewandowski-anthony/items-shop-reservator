import { useTranslation } from 'react-i18next';
import {LanguageButton} from "./LanguageButton.tsx";

interface NavBarProps {
    basketCount: number;
}

export const NavBar = ({
    basketCount
}: NavBarProps) => {

    const {t} = useTranslation();
    return (
        <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-black tracking-tight text-indigo-600">
                {t('appName')}
            </h1>
            <div className="flex justify-center items-center gap-4">
                <div className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full font-bold">
                    {t('basket')} : {basketCount}
                </div>
                <LanguageButton/>
            </div>
        </nav>
    )
}