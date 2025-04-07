import React from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Check, 
  Search, 
  FileText, 
  Download, 
  ExternalLink, 
  Upload
} from 'lucide-react';

// Common interface for all icons
interface IconProps {
  size?: number | string;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

// Common wrapper for all icons to ensure consistent styling
const IconWrapper: React.FC<IconProps & { children: React.ReactNode }> = ({ 
  size = 24, 
  strokeWidth = 2, 
  color = 'currentColor', 
  className = '',
  children 
}) => {
  return (
    <span 
      className={`inline-flex items-center justify-center ${className}`}
      style={{ 
        color, 
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size
      }}
    >
      {children}
    </span>
  );
};

// Export only the icons we need
export const MenuIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <Menu size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <X size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <ChevronDown size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <Check size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <Search size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const FileTextIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <FileText size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <Download size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const ExternalLinkIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <ExternalLink size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <IconWrapper {...props}>
    <Upload size={props.size} color={props.color} strokeWidth={props.strokeWidth} />
  </IconWrapper>
); 