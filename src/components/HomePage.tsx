import { useItems } from '../hooks/useItems';
import { ItemCard } from './ItemCard.tsx';
import {useTranslation} from "react-i18next";

export const HomePage = () => {
    const { items, loading, error } = useItems();
    const {t} = useTranslation();

    if (loading) return <div className="text-center p-10">Chargement des trésors... ✈️</div>;

    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div>
            <header className="py-12 px-6 text-center">
                <h2 className="text-4xl font-extrabold sm:text-5xl">
                    {t('mainPage.label')}
                </h2>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    {t('mainPage.description')}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};