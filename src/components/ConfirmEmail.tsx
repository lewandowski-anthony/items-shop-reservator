import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useConfirmReservation } from '../hooks/useConfirmReservation';

export const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { status } = useConfirmReservation(searchParams.get('token'));

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">

                {status === 'loading' && (
                    <div className="space-y-4">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-gray-600 font-medium">{t('confirm.verifying')}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <div className="text-6xl animate-bounce">✅</div>
                        <h1 className="text-3xl font-black text-gray-900">
                            {t('confirm.success_title')}
                        </h1>
                        <p className="text-gray-600">
                            {t('confirm.success_message')}
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-200"
                        >
                            {t('confirm.back_home')}
                        </button>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <div className="text-6xl">❌</div>
                        <h1 className="text-2xl font-bold text-red-600">
                            {t('confirm.error_title')}
                        </h1>
                        <p className="text-gray-600">
                            {t('confirm.error_message')}
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full border-2 border-gray-200 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                        >
                            {t('confirm.back_home')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};