import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties | object;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'eager' | 'lazy' | undefined;
  className?: string;
}

const Images = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    { src, width, height, alt, style, onLoad, onError, loading, className },
    ref,
  ) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={style}
        onLoad={onLoad}
        onError={onError}
        loading={loading}
        className={cn(`${className}`)}
      />
    );
  },
);

Images.displayName = 'Images';

export default React.memo(Images);
