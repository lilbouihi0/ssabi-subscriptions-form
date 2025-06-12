
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  const lowestPrice = product.durations.reduce((min, duration) => {
    const price = parseInt(duration.price.replace(/\D/g, ''));
    return price < min ? price : min;
  }, Infinity);

  return (
    <Card className="overflow-hidden hover-scale bg-card border-border">
      <div className="aspect-video bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center p-6">
        <img 
          src={product.image} 
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
      
      <CardContent className="p-6">
        <div className={`flex items-center justify-between mb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h3 className="text-xl font-bold text-card-foreground">{product.name}</h3>
          <span className="text-sm text-muted-foreground">{product.provider}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <span className="text-lg font-semibold text-primary">
            {t('from')} {lowestPrice} {t('mad')}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full gradient-morocco hover:opacity-90 transition-opacity"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {t('viewMore')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
