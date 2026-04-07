import { useTranslation } from 'react-i18next';
import type { Item } from "../types/database.ts";

export const ItemCard = ({ item }: { item: Item }) => {
    const { t, i18n } = useTranslation();

    const currentLang = i18n.language as keyof typeof item.title;
    const title = item.title[currentLang] || item.title['fr'];
    const description = item.description[currentLang] || item.description['fr'];

    const reservation = item.reservation;
    const isConfirmed = reservation?.status === 'confirmed';
    const isPending = reservation?.status === 'pending';
    const isAvailable = !reservation;

    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden p-4 transition-all hover:shadow-md relative">

            {isPending && (
                <div className="absolute top-6 right-6 bg-orange-100 text-orange-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider z-10">
                    {t('status.pending')}
                </div>
            )}

            <img
                src={item.image_url}
                alt={title}
                className={`w-full h-48 object-cover rounded-2xl transition-opacity ${!isAvailable ? 'opacity-50 grayscale-[0.5]' : ''}`}
            />

            <div className="mt-4 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{title}</h3>
                    <p className="text-xl font-black text-indigo-600 whitespace-nowrap">
                        {item.price} €
                    </p>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>

                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    📅 {t('item.availabilityDate')} : {item.date_of_availability}
                </p>

                <button
                    disabled={!isAvailable}
                    className={`w-full flex items-center justify-center p-4 rounded-2xl font-bold transition-all ${
                        isAvailable
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100"
                            : isConfirmed
                                ? "bg-red-50 text-red-400 cursor-not-allowed border border-red-100"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                    }`}
                >
                    {isAvailable && t('reserve')}
                    {isPending && t('status.pending_button')}
                    {isConfirmed && t('reserved')}
                </button>

                {isConfirmed && reservation && (
                    <p className="text-center text-[10px] text-gray-400 italic">
                        {t('reserved_by')} {reservation.customer_name}
                    </p>
                )}
            </div>
        </div>
    );
};