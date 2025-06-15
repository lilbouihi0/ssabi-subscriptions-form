
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';

interface FormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  selectedDuration: string;
}

interface OrderFormProps {
  product: Product;
}

const OrderForm: React.FC<OrderFormProps> = ({ product }) => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    selectedDuration: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      // Match the exact column names in your Google Sheet
      const formDataToSend = new FormData();
      formDataToSend.append('mathematicaTimestamp', new Date().toISOString());
      formDataToSend.append('Product Name', product.name);
      formDataToSend.append('Duration', formData.selectedDuration);
      formDataToSend.append('Full Name', formData.fullName);
      formDataToSend.append('Phone Number', formData.phoneNumber);
      formDataToSend.append('Email', formData.email || '');

      console.log('Submitting order to Google Sheets:', {
        mathematicaTimestamp: new Date().toISOString(),
        'Product Name': product.name,
        'Duration': formData.selectedDuration,
        'Full Name': formData.fullName,
        'Phone Number': formData.phoneNumber,
        'Email': formData.email
      });
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbzpAjrdd2CVK6e-qC5noIH1OJZnGrJYcImoWqzWSYCeKHRWQkJbl8OieCgBTHGxLvY/exec', {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });
      
      // With no-cors mode, we can't check response status, so we assume success
      console.log('Order submitted successfully');
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
  );
};

export default OrderForm;
