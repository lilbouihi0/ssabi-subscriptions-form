
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  
  const whatsappNumber = '212614566647';
  const message = encodeURIComponent('مرحبا، أريد الاستفسار عن خدماتكم');

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 gradient-morocco hover:opacity-90 transition-opacity shadow-lg"
      size="sm"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">{t('whatsappContact')}</span>
    </Button>
  );
};

export default WhatsAppButton;
