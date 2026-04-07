import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Item } from '../types/database';
import { ReservationForm } from './ReservationForm';

interface ModalProps {
    item: Item;
    onClose: () => void;
}

export const ItemModal = ({ item, onClose }: ModalProps) => {
    const { t, i18n } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [isReservedSuccess, setIsReservedSuccess] = useState(false);

    const lang = i18n.language as keyof typeof item.title;
    const title = item.title[lang] || item.title['fr'];
    const description = item.description[lang] || item.description['fr'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-md hover:bg-white p-2 rounded-full shadow-lg z-10 transition-transform active:scale-90"
                >
                    ✕
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img src={item.image_url} alt={title} className="h-64 md:h-full w-full object-cover" />
                    </div>

                    <div className="p-8 md:w-1/2 flex flex-col min-h-[500px]">
                        {isReservedSuccess ? (
                            <div className="flex flex-col items-center justify-center flex-1 text-center animate-in zoom-in">
                                <div className="text-6xl mb-4">🎉</div>
                                <h2 className="text-2xl font-black">{t('form.thanks')}</h2>
                                <p className="text-gray-600 mt-2">{t('form.success_msg')}</p>
                                <button onClick={onClose} className="mt-8 text-indigo-600 font-bold underline">
                                    {t('form.close')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <h2 className="text-3xl font-black text-gray-900">{title}</h2>
                                <p className="text-indigo-600 font-bold text-xl mt-2">{item.price} €</p>

                                <div className="mt-6 text-gray-600 leading-relaxed overflow-y-auto max-h-48 pr-2">
                                    {description}
                                </div>

                                <div className="mt-6 text-gray-600 font-bold leading-relaxed overflow-y-auto max-h-48 pr-2">
                                    {t('item.availabilityDate')} : {item.date_of_availability}
                                </div>

                                <div className="mt-auto pt-8">
                                    {!showForm ? (
                                        <button
                                            onClick={() => setShowForm(true)}
                                            disabled={item.is_reserved}
                                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 disabled:bg-gray-200 disabled:text-gray-400"
                                        >
                                            {item.is_reserved ? t('reserved') : t('form.start_reservation')}
                                        </button>
                                    ) : (
                                        <div className="border-t pt-6 animate-in slide-in-from-bottom-4 duration-300">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                                                {t('form.title_info')}
                                            </h4>
                                            <ReservationForm
                                                itemId={item.id}
                                                onSuccess={() => setIsReservedSuccess(true)}
                                            />
                                            <button
                                                onClick={() => setShowForm(false)}
                                                className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {t('form.cancel')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};