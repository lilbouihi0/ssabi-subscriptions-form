
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMetaPixel } from '@/hooks/use-meta-pixel';

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const { trackContact } = useMetaPixel();
  
  const whatsappNumber = '212784542581';
  const message = encodeURIComponent('مرحبا، أريد الاستفسار عن خدماتكم');

  const handleWhatsAppClick = () => {
    // Track contact event when user clicks WhatsApp
    trackContact({
      content_name: 'WhatsApp Contact'
    });
    
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
