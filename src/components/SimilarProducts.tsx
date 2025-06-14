
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { products, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';

interface SimilarProductsProps {
  currentProductId: number;
  category?: string;
}

const SimilarProducts: React.FC<SimilarProductsProps> = ({ currentProductId, category }) => {
  const { t } = useLanguage();

  const getSimilarProducts = (): Product[] => {
    let filtered = products.filter(product => product.id !== currentProductId);
    
    if (category) {
      const categoryFiltered = filtered.filter(product => product.category === category);
      if (categoryFiltered.length >= 2) {
        return categoryFiltered.slice(0, 3);
      }
    }
    
    return filtered.slice(0, 3);
  };

  const similarProducts = getSimilarProducts();

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
          {t('similarProducts')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProducts;
