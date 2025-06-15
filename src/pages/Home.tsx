
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { Sparkles, Star, Zap } from 'lucide-react';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background with enhanced gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 animate-pulse">
            <Sparkles className="h-6 w-6 text-white/20" />
          </div>
          <div className="absolute top-20 right-20 animate-bounce">
            <Star className="h-4 w-4 text-white/30" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-pulse">
            <Zap className="h-6 w-6 text-white/20" />
          </div>
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in leading-tight">
              <span className="block">{t('welcome')}</span>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <Sparkles className="h-6 w-6 text-yellow-400 animate-bounce" />
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
            </h1>
            
            <p className="text-lg md:text-xl opacity-95 max-w-2xl mx-auto animate-fade-in mb-8 leading-relaxed">
              {t('subtitle')}
            </p>

            {/* Product Images Preview */}
            <div className="flex justify-center items-center gap-6 mb-8 animate-fade-in">
              {products.slice(0, 4).map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full p-2 shadow-lg animate-pulse"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center animate-fade-in">
                <div className="text-2xl font-bold mb-1">100+</div>
                <div className="text-sm opacity-90">{t('products')}</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-sm opacity-90">{t('support')}</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-2xl font-bold mb-1">⚡</div>
                <div className="text-sm opacity-90">{t('delivery')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-background"></path>
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            {t('featuredProducts')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
