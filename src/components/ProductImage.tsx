
import React from 'react';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ image, name }) => {
  return (
    <div className="aspect-video bg-gradient-to-r from-primary/10 to-accent/10 flex items-center justify-center mb-6 rounded-lg">
      <img 
        src={image} 
        alt={name}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};

export default ProductImage;
