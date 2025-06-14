
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ArrowLeft, Home } from 'lucide-react';

const ThankYou = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-4">
                {t('orderSuccess')}
              </h1>
              
              <p className="text-muted-foreground mb-8">
                {t('orderSuccessDesc')}
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full gradient-morocco hover:opacity-90 transition-opacity"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t('backToHome')}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className={`w-full flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t('goBack')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
