
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { language, setLanguage, t, dir } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className={`flex items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Link to="/" className="text-2xl font-bold gradient-morocco bg-clip-text text-transparent">
              7ssabi
            </Link>
          </div>

          <nav className={`hidden md:flex items-center space-x-6 ${dir === 'rtl' ? 'space-x-reverse' : ''}`}>
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              {t('home')}
            </Link>
            <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
              {t('products')}
            </span>
            <span className="text-foreground hover:text-primary transition-colors cursor-pointer">
              {t('contact')}
            </span>
          </nav>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <Globe className="h-4 w-4" />
            {language === 'ar' ? 'FR' : 'العربية'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
