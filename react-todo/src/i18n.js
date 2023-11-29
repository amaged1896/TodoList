import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    title: 'Todo-list application',
                    toDo: 'New todo',
                    edit: 'Edit',
                },
            },
            ar: {
                translation: {
                    title: 'قائمة المهام اليومية',
                    toDo: 'مهمة جديدة',
                    edit: 'تعديل',
                },
            },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
