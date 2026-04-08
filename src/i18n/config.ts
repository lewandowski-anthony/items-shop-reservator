import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { ENV } from '../config.ts';

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        lng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${ENV.BASE_URL}/locales/{{lng}}/translation.json`,
        },
    });

export default i18n;