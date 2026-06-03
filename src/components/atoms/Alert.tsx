/**
 * ==========================================
 * 文件名称: /src/components/atoms/Alert.tsx
 * 功能描述: 高保真、美学排版及具备动态设计令牌感知的固定警告提示条原子原语。
 * 
 * 🎨 视觉与风格原则:
 * 1. 杜绝过高饱和度造成视觉压抑，采用极其克制、护眼淡雅的中调状态主色与温柔微透明的背景承托。
 * 2. 完美的对齐比例：左侧状态图标和右侧功能操作、关闭按钮（x）拥有完美的水平与顶端对齐。
 * 3. 完美适配容器：具有 banner 通栏无界模式以及标准圆角卡片两种形态，自适应当前界面的设计令牌。
 * ==========================================
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { AlertProps } from '../../types/components';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  closable = false,
  onClose,
  showIcon = true,
  icon,
  action,
  id = 'alert-element',
}) => {
  const { tokens } = useDesignTokens();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  // 1. 获取不同的语义色配置
  const getStyleConfig = () => {
    switch (type) {
      case 'success':
        return {
          bg: tokens.colors.successBg,
          borderColor: tokens.colors.success,
          textPrimary: tokens.colors.success,
          textSecondary: tokens.colors.textSecondary,
          iconColor: tokens.colors.success,
          defaultIcon: CheckCircle2,
        };
      case 'warning':
        return {
          bg: tokens.colors.warningBg,
          borderColor: tokens.colors.warning,
          textPrimary: tokens.colors.warning,
          textSecondary: tokens.colors.textSecondary,
          iconColor: tokens.colors.warning,
          defaultIcon: AlertTriangle,
        };
      case 'error':
        return {
          bg: tokens.colors.errorBg,
          borderColor: tokens.colors.error,
          textPrimary: tokens.colors.error,
          textSecondary: tokens.colors.textSecondary,
          iconColor: tokens.colors.error,
          defaultIcon: XCircle,
        };
      case 'info':
      default:
        return {
          bg: tokens.colors.infoBg,
          borderColor: tokens.colors.info,
          textPrimary: tokens.colors.info,
          textSecondary: tokens.colors.textSecondary,
          iconColor: tokens.colors.info,
          defaultIcon: Info,
        };
    }
  };

  const config = getStyleConfig();
  const IconComponent = config.defaultIcon;

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  // 根据设计令牌动态确定的圆角大小
  const borderRadiusStyle = tokens.borders.radiusMd || '12px';

  return (
    <AnimatePresence>
      <motion.div
        id={id}
        initial={{ opacity: 0, y: -8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0, padding: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={`w-full relative flex ${description ? 'items-start' : 'items-center'} transition-all overflow-hidden border p-3.5`}
        style={{
          borderRadius: borderRadiusStyle,
          backgroundColor: config.bg,
          borderColor: config.borderColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          opacity: 0.95,
        }}
      >
        <div className={`flex-1 flex gap-3 ${description ? 'items-start' : 'items-center'} min-w-0`}>
          {/* 左侧状态大图标 */}
          {showIcon && (
            <div className={`shrink-0 ${description ? 'pt-0.5' : ''}`} style={{ color: config.iconColor }}>
              <IconComponent className="w-4.5 h-4.5" strokeWidth={1.8} />
            </div>
          )}

          {/* 右侧核心内容排版 */}
          <div className="flex-1 min-w-0 pr-3">
            <h5 className="text-xs font-semibold leading-tight tracking-tight" style={{ color: config.textPrimary }}>
              {message}
            </h5>
            {description && (
              <p className="text-[11px] leading-relaxed mt-1 tracking-normal font-medium" style={{ color: config.textSecondary }}>
                {description}
              </p>
            )}
          </div>
        </div>

        {/* 交互反馈操作区与叉号关闭区 */}
        <div className={`flex items-center gap-2.5 shrink-0 ml-auto ${description ? 'pt-0.5' : ''}`} style={{ color: tokens.colors.textMuted }}>
          {action && <div className="text-[11px] select-none">{action}</div>}
          {closable && (
            <button
              onClick={handleClose}
              className="transition-colors p-0.5 rounded cursor-pointer opacity-70 hover:opacity-100"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
