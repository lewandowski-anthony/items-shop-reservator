import {useTranslation} from "react-i18next";

export const LanguageButton = () => {
    const { i18n } = useTranslation();

    return (
        <div className="flex">
            <select id="language" onChange={(e) => i18n.changeLanguage(e.target.value)}>
                <option value="fr">🇫🇷</option>
                <option value="en">🇬🇧</option>
                <option value="es">🇪🇸</option>
            </select>
        </div>
    );
}