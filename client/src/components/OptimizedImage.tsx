import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
  placeholder?: string;
}

/**
 * OptimizedImage component for better performance
 * - Handles lazy loading
 * - Supports priority loading for LCP
 * - Implements progressive loading
 * - Prevents layout shifts with width/height
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  style = {},
  priority = false,
  sizes = '100vw',
  placeholder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Handle image loading
  const handleLoad = () => {
    setLoaded(true);
  };

  // Handle image error
  const handleError = () => {
    setError(true);
  };

  // Create inline style for proper sizing
  const combinedStyle = {
    ...style,
    opacity: loaded ? 1 : 0.5,
    transition: 'opacity 0.3s',
  };

  return (
    <img
      src={error ? placeholder : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      style={combinedStyle}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onLoad={handleLoad}
      onError={handleError}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
    />
  );
};

export default OptimizedImage; 