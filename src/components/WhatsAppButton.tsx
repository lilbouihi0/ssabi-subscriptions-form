
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
      className="fixed bottom-6 right-6 z-50 rounded-full px-4 py-2 h-auto gradient-morocco hover:opacity-90 transition-opacity shadow-lg flex items-center gap-2"
      size="sm"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="text-sm font-medium">WhatsApp</span>
      <span className="sr-only">{t('whatsappContact')}</span>
    </Button>
  );
};

export default WhatsAppButton;
