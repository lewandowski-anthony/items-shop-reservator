import { useTranslation } from 'react-i18next';
import type {Item} from "../types/database.ts";
import i18n from "i18next";


export const ItemCard = ({ item }: { item: Item }) => {
    const { t } = useTranslation();
    const currentLang = i18n.language as keyof typeof item.title;
    const title = item.title[currentLang] || item.title['fr'];
    const description = item.description[currentLang] || item.description['fr'];
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-4 transition-all hover:shadow-md">
            <img
                src={item.image_url}
                alt={title}
                className="w-full h-48 object-cover rounded-xl"
            />
            <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-1">
                    {description}
                </p>
                <p className="text-2xl font-black text-indigo-600">
                    {item.price} €
                </p>
                <p className="text-xs font-bold text-grey-100">
                    {t('item.availabilityDate')} : {item.date_of_availability}
                </p>
                <div className={`flex items-center justify-center p-3 rounded-2xl ${
                    item.is_reserved ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                }`}>
                    {!item.is_reserved ? t('reserve') : t('reserved')}
                </div>
            </div>
        </div>
    );
};