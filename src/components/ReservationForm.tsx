import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {createReservation} from "../api/reservation.ts";

interface Props {
    itemId: string;
    onSuccess: () => void;
}

export const ReservationForm = ({itemId, onSuccess}: Props) => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({name: '', email: '', phone: ''});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createReservation({
                item_id: itemId,
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                status: 'pending'
            });
            onSuccess();
        } catch (err) {
            alert("Erreur lors de la réservation. Réessaie !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-bottom-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('form.name')}</label>
                <input
                    required
                    className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Jean Dupont"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('form.email')}</label>
                <input
                    required
                    className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="jean@example.com"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all disabled:bg-gray-300"
            >
                {loading ? t('form.sending') : t('form.confirm')}
            </button>
        </form>
    );
};