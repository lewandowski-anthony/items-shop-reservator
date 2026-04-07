import { useItems } from '../hooks/useItems';
import { ItemCard } from './ItemCard.tsx';
import {useTranslation} from "react-i18next";
import {useState} from "react";
import type {Item} from "../types/database.ts";
import {ItemModal} from "./ItemModal.tsx";

export const HomePage = () => {
    const { items, loading, error } = useItems();
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
                {items.map((item) => (
                    <div key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                        <ItemCard item={item} />
                    </div>
                ))}
            </div>

            {selectedItem && (
                <ItemModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}

        </div>
    );
};