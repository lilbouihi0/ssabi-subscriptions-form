import { useCallback } from 'react';

// Extend the Window interface to include fbq
declare global {
  interface Window {
    fbq: (action: string, event: string, parameters?: Record<string, any>, advancedMatching?: Record<string, any>) => void;
  }
}

export const useMetaPixel = () => {
  const trackEvent = useCallback((event: string, parameters?: Record<string, any>, advancedMatching?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (advancedMatching) {
        window.fbq('track', event, parameters, advancedMatching);
      } else {
        window.fbq('track', event, parameters);
      }
    }
  }, []);

  const trackCustomEvent = useCallback((event: string, parameters?: Record<string, any>, advancedMatching?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.fbq) {
      if (advancedMatching) {
        window.fbq('trackCustom', event, parameters, advancedMatching);
      } else {
        window.fbq('trackCustom', event, parameters);
      }
    }
  }, []);

  // Standard e-commerce events
  const trackViewContent = useCallback((parameters?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
  }, advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }) => {
    trackEvent('ViewContent', parameters, advancedMatching);
  }, [trackEvent]);

  const trackAddToCart = useCallback((parameters?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
  }, advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }) => {
    trackEvent('AddToCart', parameters, advancedMatching);
  }, [trackEvent]);

  const trackInitiateCheckout = useCallback((parameters?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
    num_items?: number;
  }, advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }) => {
    trackEvent('InitiateCheckout', parameters, advancedMatching);
  }, [trackEvent]);

  const trackLead = useCallback((parameters?: {
    content_name?: string;
    content_category?: string;
    value?: number;
    currency?: string;
  }, advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }) => {
    trackEvent('Lead', parameters, advancedMatching);
  }, [trackEvent]);

  const trackPurchase = useCallback((parameters?: {
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    content_type?: string;
    value?: number;
    currency?: string;
    num_items?: number;
  }, advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }) => {
    trackEvent('Purchase', parameters, advancedMatching);
  }, [trackEvent]);

  const trackContact = useCallback((parameters?: {
    content_name?: string;
  }, advancedMatching?: {
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  }) => {
    trackEvent('Contact', parameters, advancedMatching);
  }, [trackEvent]);

  return {
    trackEvent,
    trackCustomEvent,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackLead,
    trackPurchase,
    trackContact,
  };
};