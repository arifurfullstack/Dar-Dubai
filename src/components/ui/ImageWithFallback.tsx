import React, { useState } from 'react';
import { FALLBACK_IMAGES } from '../../utils/imagePlaceholders';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: keyof typeof FALLBACK_IMAGES;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Dubai real estate property',
  fallbackCategory = 'apartment',
  aspectRatioClass = 'aspect-[4/3]',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fallbackSrc = FALLBACK_IMAGES[fallbackCategory] || FALLBACK_IMAGES.apartment;
  const imageSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${aspectRatioClass} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200 animate-pulse" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (!hasError) {
            setHasError(true);
            setIsLoaded(true);
          }
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
