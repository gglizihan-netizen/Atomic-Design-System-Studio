import React from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { TagProps } from '../../types/components';
import { X } from 'lucide-react';

export const Tag: React.FC<TagProps> = ({
  children,
  type = 'default',
  variant = 'soft',
  size = 'md',
  closable = false,
  icon,
  onClose,
  className = '',
  style,
  id,
}) => {
  const { tokens } = useDesignTokens();

  // 根据类型配置相应的色彩方案
  const getColorConfig = () => {
    switch (type) {
      case 'primary':
        return {
          bg: tokens.colors.brand,
          bgSoft: tokens.colors.infoBg, // 如果没有专用的 brand bg soft, 可用 bgHover 或其它
          border: tokens.colors.brand,
          text: tokens.colors.brand,
          textInverse: tokens.colors.textInverse,
        };
      case 'success':
        return {
          bg: tokens.colors.success,
          bgSoft: tokens.colors.successBg,
          border: tokens.colors.success,
          text: tokens.colors.success,
          textInverse: tokens.colors.textInverse,
        };
      case 'warning':
        return {
          bg: tokens.colors.warning,
          bgSoft: tokens.colors.warningBg,
          border: tokens.colors.warning,
          text: tokens.colors.warning,
          textInverse: tokens.colors.textInverse,
        };
      case 'error':
        return {
          bg: tokens.colors.error,
          bgSoft: tokens.colors.errorBg,
          border: tokens.colors.error,
          text: tokens.colors.error,
          textInverse: tokens.colors.textInverse,
        };
      case 'default':
      default:
        return {
          bg: tokens.colors.bgHover,
          bgSoft: tokens.colors.bgPage,
          border: tokens.colors.border,
          text: tokens.colors.textSecondary,
          textInverse: tokens.colors.textInverse,
        };
    }
  };

  const config = getColorConfig();

  // 计算尺寸内边距和字号
  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return 'text-[11px] px-1.5 py-0.5 leading-normal';
      case 'lg':
        return 'text-[14px] px-2.5 py-1 leading-normal';
      case 'md':
      default:
        return 'text-[12px] px-2 py-0.5 leading-normal';
    }
  };

  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: config.bg,
          color: config.textInverse,
          border: `1px solid ${config.bg}`,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: config.text,
          border: `1px solid ${config.border}`,
        };
      case 'soft':
        return {
          backgroundColor: config.bgSoft,
          color: config.text,
          border: `1px solid transparent`,
        };
      case 'dot':
        return {
          backgroundColor: 'transparent',
          color: config.text,
          border: `1px solid ${config.border}`,
        };
      default:
        return {};
    }
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center justify-center font-medium transition-colors ${getSizeStyle()} ${className}`}
      style={{
        borderRadius: tokens.borders.radiusSm,
        ...getVariantStyle(),
        ...style,
      }}
    >
      {variant === 'dot' && (
        <span
          className="rounded-full mr-1.5 shrink-0"
          style={{ 
            backgroundColor: config.bg, 
            width: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px', 
            height: size === 'sm' ? '6px' : size === 'lg' ? '10px' : '8px' 
          }}
        />
      )}
      {icon && (
        <span className="mr-1.5 shrink-0" style={{ color: variant === 'solid' ? config.textInverse : config.text }}>
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
      {closable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="ml-1.5 opacity-60 hover:opacity-100 transition-opacity focus:outline-none shrink-0"
          style={{ color: variant === 'solid' ? config.textInverse : config.text }}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
};
