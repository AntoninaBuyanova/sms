import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  sizes?: string;
  isLCP?: boolean;
  placeholderColor?: string;
  priority?: boolean; // Support for Next.js-like priority prop
  style?: React.CSSProperties; // Support for style prop
  caption?: string; // Image caption for SEO
  credit?: string; // Image credit/attribution
  itemProp?: string; // Schema.org itemProp attribute
  structuredData?: boolean; // Enable Schema.org markup
}

/**
 * OptimizedImage component that automatically uses WebP/AVIF with proper fallbacks
 * and implements best practices for image loading performance and SEO
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes = '100vw',
  isLCP = false,
  placeholderColor = '#f3f4f6',
  priority = false,
  style = {},
  caption,
  credit,
  itemProp,
  structuredData = false,
}) => {
  const [imageSrcSets, setImageSrcSets] = useState<Record<string, any> | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  
  // Determine if this is an LCP image
  const isLCPImage = isLCP || priority;
  
  // Extract the base name from the image path
  const getBaseName = (path: string) => {
    const filename = path.split('/').pop() || '';
    return filename.split('.')[0];
  };
  
  const baseName = getBaseName(src);
  
  // Generate a unique ID for structured data
  const imageId = `image-${baseName}-${Math.random().toString(36).substring(2, 9)}`;

  // Load the srcsets data
  useEffect(() => {
    // Try to load the image srcsets helper
    fetch('/image-srcsets.json')
      .then(res => res.json())
      .then(data => {
        setImageSrcSets(data);
      })
      .catch(err => {
        console.error('Failed to load image srcsets data', err);
      });
  }, []);
  
  // Mark as LCP element after loading
  useEffect(() => {
    if (isLCPImage && imgRef.current) {
      // Set data-lcp attribute for CSS targeting
      imgRef.current.setAttribute('data-lcp', 'true');
      
      // If the image is already loaded, mark it
      if (imgRef.current.complete) {
        setImageLoaded(true);
        document.documentElement.classList.add('main-lcp-loaded');
      }
    }
    
    // Add structured data if needed
    if (structuredData && figureRef.current) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        'contentUrl': src,
        'name': alt,
        'description': caption || alt,
        'width': width || '',
        'height': height || '',
        ...(credit && { 'creditText': credit })
      });
      figureRef.current.appendChild(script);
    }
  }, [isLCPImage, src, alt, caption, credit, width, height, structuredData]);
  
  // If we have srcsets data and this image has responsive versions
  const hasSrcSet = imageSrcSets && imageSrcSets[baseName];
  
  // Create a placeholder style for before the image loads
  const placeholderStyle = {
    backgroundColor: placeholderColor,
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    ...style,
  };
  
  // Apply enhanced attributes for LCP images or priority images
  const priorityProps = isLCPImage ? {
    'data-lcp': 'true',
    fetchPriority: 'high' as const,
    loading: 'eager' as const,
  } : {};
  
  // SEO attributes for image
  const seoProps = {
    ...(itemProp ? { 'itemprop': itemProp } : {}),
    ...(caption ? { 'aria-describedby': `${imageId}-caption` } : {}),
    'data-image-name': baseName,
  };
  
  // Classes for fade-in effect
  const imageClasses = `
    lazy-load 
    ${imageLoaded ? 'loaded' : ''} 
    ${isLCPImage ? 'lcp-image' : ''}
    ${className}
  `.trim();
  
  // Handle image load completion
  const handleImageLoaded = () => {
    setImageLoaded(true);
    
    // For LCP images, mark the document
    if (isLCPImage) {
      document.documentElement.classList.add('main-lcp-loaded');
    }
  };
  
  // Determine if we should wrap in figure (for captions or structured data)
  const shouldWrapInFigure = caption || credit || structuredData;
  
  // Prepare the image element
  const imageElement = hasSrcSet ? (
    // Render responsive image with srcset and modern format support
    <picture>
      {/* AVIF format for browsers that support it */}
      {imageSrcSets[baseName].formats.avif && (
        <source
          type="image/avif"
          srcSet={imageSrcSets[baseName].formats.avif.srcset}
          sizes={sizes}
        />
      )}
      
      {/* WebP format for browsers that support it */}
      {imageSrcSets[baseName].formats.webp && (
        <source
          type="image/webp"
          srcSet={imageSrcSets[baseName].formats.webp.srcset}
          sizes={sizes}
        />
      )}
      
      {/* Original format as fallback */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        className={imageClasses}
        onLoad={handleImageLoaded}
        sizes={sizes}
        style={style}
        {...priorityProps}
        {...seoProps}
      />
    </picture>
  ) : (
    // Fallback for images without srcset data
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      className={imageClasses}
      onLoad={handleImageLoaded}
      style={style}
      {...priorityProps}
      {...seoProps}
    />
  );
  
  // Render with or without figure wrapper
  if (shouldWrapInFigure) {
    return (
      <figure 
        ref={figureRef as React.RefObject<HTMLElement>}
        className={`image-figure ${isLCPImage ? 'lcp-container' : ''}`}
        style={!imageLoaded ? placeholderStyle : undefined}
        itemScope
        itemType={structuredData ? "http://schema.org/ImageObject" : undefined}
        id={imageId}
      >
        <div 
          className={`image-container ${isLCPImage ? 'lcp-container' : ''}`}
          style={!imageLoaded ? placeholderStyle : undefined}
        >
          {imageElement}
        </div>
        
        {caption && (
          <figcaption id={`${imageId}-caption`} itemProp="caption" className="image-caption">
            {caption}
            {credit && <span className="image-credit" itemProp="copyrightHolder"> (© {credit})</span>}
          </figcaption>
        )}
        
        {!caption && credit && (
          <figcaption className="image-credit" itemProp="copyrightHolder">
            © {credit}
          </figcaption>
        )}
        
        {structuredData && <meta itemProp="contentUrl" content={src} />}
        {structuredData && <meta itemProp="name" content={alt} />}
      </figure>
    );
  }
  
  // Simple version without figure
  return (
    <div 
      className={`image-container ${isLCPImage ? 'lcp-container' : ''}`}
      style={!imageLoaded ? placeholderStyle : style}
    >
      {imageElement}
    </div>
  );
};

export default OptimizedImage; 