import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string; // e.g. '16/9', '4/3', '1/1', '21/9'
  width?: number | string;
  height?: number | string;
  isHero?: boolean; // Eager load if hero LCP element
  className?: string;
  fallbackIcon?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio = '16/9',
  width,
  height,
  isHero = false,
  className = '',
  fallbackIcon = true,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-slate-900/60 ${className}`}
      style={{
        aspectRatio: aspectRatio,
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : 'auto',
      }}
    >
      {/* Skeleton Shimmer Placeholder before image loads */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
        </div>
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-900 border border-slate-800 text-slate-500 text-xs">
          {fallbackIcon && <ImageIcon className="w-8 h-8 mb-2 text-slate-600" />}
          <span>Gagal memuat visual</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={isHero ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...rest}
        />
      )}
    </div>
  );
};
