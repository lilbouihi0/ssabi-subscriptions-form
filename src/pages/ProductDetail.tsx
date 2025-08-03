import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMetaPixel } from '@/hooks/use-meta-pixel';
import { prepareAdvancedMatching } from '@/lib/pixel-utils';
import SimilarProducts from '@/components/SimilarProducts';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  selectedDuration: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const { toast } = useToast();
  const { trackViewContent, trackInitiateCheckout, trackLead } = useMetaPixel();
  const orderFormRef = useRef<HTMLDivElement>(null);
  
  const product = products.find(p => p.id === parseInt(id || ''));
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    selectedDuration: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-scroll to order form on page load and track ViewContent
  useEffect(() => {
    if (orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Track ViewContent event when product page loads
    if (product) {
      const selectedPrice = product.durations[0]?.price || '';
      const priceValue = parseFloat(selectedPrice.replace(/[^\d.]/g, '')) || 0;
      
      trackViewContent({
        content_name: product.name,
        content_category: product.category || 'subscription',
        content_ids: [product.id.toString()],
        content_type: 'product',
        value: priceValue,
        currency: 'MAD'
      });
    }
  }, [product, trackViewContent]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track InitiateCheckout when user selects a duration
    if (field === 'selectedDuration' && value && product) {
      const selectedDuration = product.durations.find(d => d.duration === value);
      if (selectedDuration) {
        const priceValue = parseFloat(selectedDuration.price.replace(/[^\d.]/g, '')) || 0;
        
        trackInitiateCheckout({
          content_name: product.name,
          content_category: product.category || 'subscription',
          content_ids: [product.id.toString()],
          content_type: 'product',
          value: priceValue,
          currency: 'MAD',
          num_items: 1
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName.trim()) {
      toast({
        title: "Error",
        description: t('nameRequired'),
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.phoneNumber.trim()) {
      toast({
        title: "Error", 
        description: t('phoneRequired'),
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.selectedDuration) {
      toast({
        title: "Error",
        description: t('selectDuration'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        productName: product.name,
        duration: formData.selectedDuration,
        fullName: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email
      };

      console.log('Submitting order to Google Sheets:', payload);
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbzpAjrdd2CVK6e-qC5noIH1OJZnGrJYcImoWqzWSYCeKHRWQkJbl8OieCgBTHGxLvY/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      // With no-cors mode, we can't check response status, so we assume success
      console.log('Order submitted successfully');
      
      // Track Lead event when form is successfully submitted
      const selectedDuration = product.durations.find(d => d.duration === formData.selectedDuration);
      if (selectedDuration) {
        const priceValue = parseFloat(selectedDuration.price.replace(/[^\d.]/g, '')) || 0;
        
        // Prepare advanced matching data
        const advancedMatching = prepareAdvancedMatching({
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          fullName: formData.fullName
        });
        
        trackLead({
          content_name: product.name,
          content_category: product.category || 'subscription',
          value: priceValue,
          currency: 'MAD'
        }, advancedMatching);
      }
      
      navigate('/thank-you');
      
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDurationData = product.durations.find(d => d.duration === formData.selectedDuration);

  return (
    <div className="min-h-screen bg-background">
      <div className="py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className={`mb-6 flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className="h-4 w-4" />
            {t('home')}
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center mb-6 rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  
                  <div className={`flex items-center justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
                    <span className="text-lg text-muted-foreground">{product.provider}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{t('features')}</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <Check className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div ref={orderFormRef}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{t('orderForm')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold text-foreground">{t('duration')}</Label>
                      <RadioGroup
                        value={formData.selectedDuration}
                        onValueChange={(value) => handleInputChange('selectedDuration', value)}
                        className="mt-3"
                      >
                        {product.durations.map((duration) => (
                          <div key={duration.duration} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value={duration.duration} id={duration.duration} />
                            <Label 
                              htmlFor={duration.duration}
                              className={`flex-1 cursor-pointer flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                            >
                              <span>{duration.duration}</span>
                              <span className="font-semibold text-primary">{duration.price}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName" className="text-foreground">{t('fullName')}</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="mt-1"
                          dir={dir}
                        />
                      </div>

                      <div>
                        <Label htmlFor="phoneNumber" className="text-foreground">{t('phoneNumber')}</Label>
                        <Input
                          id="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                          className="mt-1"
                          dir="ltr"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-foreground">{t('emailOptional')}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-1"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {selectedDurationData && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className={`flex justify-between items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <span className="font-semibold text-foreground">Total:</span>
                          <span className="text-xl font-bold text-primary">{selectedDurationData.price}</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      className="w-full gradient-morocco hover:opacity-90 transition-opacity"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : t('submitOrder')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <SimilarProducts currentProductId={product.id} category={product.category} />
    </div>
  );
};

export default ProductDetail;
