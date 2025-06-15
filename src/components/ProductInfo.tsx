
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/data/products';
import ProductImage from './ProductImage';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { t, dir } = useLanguage();

  return (
    <Card>
      <CardContent className="p-6">
        <ProductImage image={product.image} name={product.name} />
        
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
  );
};

export default ProductInfo;
