
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    contact: 'اتصل بنا',
    
    // Homepage
    welcome: 'مرحباً بكم في 7ssabi',
    subtitle: 'اشتراكات رقمية مميزة بأفضل الأسعار',
    featuredProducts: 'المنتجات المميزة',
    viewMore: 'عرض المزيد',
    from: 'ابتداءً من',
    mad: 'درهم',
    
    // Product page
    duration: 'مدة الاشتراك',
    months: 'شهر',
    features: 'المميزات',
    orderForm: 'نموذج الطلب',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    emailOptional: 'البريد الإلكتروني (اختياري)',
    submitOrder: 'أرسل الطلب',
    similarProducts: 'منتجات مماثلة',
    
    // Success messages
    orderSuccess: 'تم إرسال طلبك بنجاح!',
    orderSuccessDesc: 'سنتواصل معك قريباً لتأكيد الطلب',
    backToHome: 'العودة للرئيسية', 
    goBack: 'رجوع',
    
    // Validation
    nameRequired: 'الاسم مطلوب',
    phoneRequired: 'رقم الهاتف مطلوب',
    selectDuration: 'يرجى اختيار مدة الاشتراك',
    
    // Footer
    followUs: 'تابعونا',
    whatsappContact: 'تواصل عبر واتساب'
  },
  fr: {
    // Navigation
    home: 'Accueil',
    products: 'Produits',
    contact: 'Contact',
    
    // Homepage
    welcome: 'Bienvenue chez 7ssabi',
    subtitle: 'Abonnements numériques premium aux meilleurs prix',
    featuredProducts: 'Produits en vedette',
    viewMore: 'Voir plus',
    from: 'À partir de',
    mad: 'MAD',
    
    // Product page
    duration: 'Durée d\'abonnement',
    months: 'Mois',
    features: 'Fonctionnalités',
    orderForm: 'Formulaire de commande',
    fullName: 'Nom complet',
    phoneNumber: 'Numéro de téléphone',
    email: 'Adresse e-mail',
    emailOptional: 'Adresse e-mail (optionnel)',
    submitOrder: 'Envoyer la demande',
    similarProducts: 'Produits similaires',
    
    // Success messages
    orderSuccess: 'Votre commande a été envoyée avec succès!',
    orderSuccessDesc: 'Nous vous contacterons bientôt pour confirmer votre commande',
    backToHome: 'Retour à l\'accueil',
    goBack: 'Retour',
    
    // Validation
    nameRequired: 'Le nom est requis',
    phoneRequired: 'Le numéro de téléphone est requis',
    selectDuration: 'Veuillez sélectionner une durée d\'abonnement',
    
    // Footer
    followUs: 'Suivez-nous',
    whatsappContact: 'Contact WhatsApp'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
