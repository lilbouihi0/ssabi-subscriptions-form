
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import SimilarProducts from '@/components/SimilarProducts';
import ProductInfo from '@/components/ProductInfo';
import OrderForm from '@/components/OrderForm';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  
  const product = products.find(p => p.id === parseInt(id || ''));

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
              <ProductInfo product={product} />
            </div>

            <div>
              <OrderForm product={product} />
            </div>
          </div>
        </div>
      </div>
      
      <SimilarProducts currentProductId={product.id} category={product.category} />
    </div>
  );
};

export default ProductDetail;
