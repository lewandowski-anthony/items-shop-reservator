import { useTranslation } from 'react-i18next';

interface ItemCardProps {
    title: string;
    description: string;
    price: number;
    imageUrl?: string;
    onAddToCart: () => void;
    isReserved: boolean;
}

export const ItemCard = ({
                             title,
                             description,
                             price,
                             imageUrl = "https://via.placeholder.com/150",
                             onAddToCart,
                             isReserved
                         }: ItemCardProps) => {
    const { t } = useTranslation();
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden p-4 transition-all hover:shadow-md">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover rounded-xl"
            />
            <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
                <p className="text-2xl font-black text-indigo-600">
                    {price} €
                </p>
                <button
                    onClick={onAddToCart}
                    disabled={isReserved}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        !isReserved
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    {!isReserved ? t('reserved') : "Rupture de stock"}
                </button>
            </div>
        </div>
    );
};