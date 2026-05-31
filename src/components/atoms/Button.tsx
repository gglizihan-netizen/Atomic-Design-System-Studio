/**
 * ==========================================
 * 文件名称: /src/components/atoms/Button.tsx
 * 功能描述: 高保真、AI-Native 智能按钮原子组件
 * 目标受众: 产品经理、UI 设计师、非技术团队读者。
 * 
 * 💡 什么是“智能按钮原子组件”？
 * 本组件绝非普通静态 HTML 按钮。它直接绑定了当前激活的全局设计令牌 (Design Tokens)：
 * 1. 颜色与圆角：根据当前设计主题自动注入品牌主色、悬停高亮色、按压加深色，以及中圆角或完美圆角。
 * 2. 交互行为：鼠标悬停、点击下凹。
 *    悬停和按下的【过渡动画时长】、下凹的【物理收缩比例（果冻捏捏感）】，
 *    均直接由行为令牌 `tokens.behaviors.buttonPressScale` 和 `tokens.behaviors.motionCurve` 决定！
 * 
 * 💡 注释中关于 React 属性 (Props) 的解释，已为您做极细致中文翻译，让您一眼读懂！
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { Loader2 } from 'lucide-react'; // 载入统一的旋转加载图标

/**
 * 🏷️ 按钮属性契约定义 (组件提供给外部的调试接口)
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // 按钮视觉变体 (变种)：primary(品牌主色), secondary(白巧克力色/二级色), outline(框线透明), text(纯文字), danger(警示红色)
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  // 按钮尺寸梯度：sm(小按钮 32px), md(标准 40px), lg(大气 48px)
  size?: 'sm' | 'md' | 'lg';
  // 是否处于数据加载中状态 (自动替换内容为旋转加载菊花，并锁定事件)
  isLoading?: boolean;
  // 按钮左侧的可选图标
  iconLeft?: React.ReactNode;
  // 按钮右侧的可选图标
  iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  iconLeft,
  iconRight,
  disabled,
  style,
  className = '',
  ...props
}) => {
  // 🔌 挂钩并读取当前的动态设计系统参数
  const { tokens } = useDesignTokens();

  // 1. 动效缓动曲线的高保真映射关系 (把行为令牌翻译为浏览器的贝塞尔动作数学曲线)
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // 极致Q弹的反弹曲线
      case 'rigid':
        return 'linear';                           // 行进生硬干脆，毫无拖沓
      case 'smooth':
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';     // 经典流畅平滑过渡
    }
  };

  const speedFast = `${tokens.behaviors.motionDurationFast}ms`;
  const speedNormal = `${tokens.behaviors.motionDurationNormal}ms`;
  const bezierCurve = getCurveValue();

  // 2. 按钮不同大小的尺寸规则表 (与设计系统的间距 SpacingToken 完全耦合)
  const sizeStyles = {
    sm: {
      padding: `${tokens.spacings.xs} ${tokens.spacings.sm}`,
      fontSize: tokens.typography.sizeSm,
      height: '32px',
    },
    md: {
      padding: `${tokens.spacings.sm} ${tokens.spacings.md}`,
      fontSize: tokens.typography.sizeBase,
      height: '40px',
    },
    lg: {
      padding: `${tokens.spacings.md} ${tokens.spacings.lg}`,
      fontSize: tokens.typography.sizeLg,
      height: '48px',
    },
  };

  // 3. 产生对应变体的核心基础样式
  const getVariantStyles = () => {
    const isMonoTheme = tokens.typography.headingFont === 'mono'; // 精确判别是否是黑客代码单色风

    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: tokens.typography.fontWeightMedium || '500',
      borderRadius: tokens.borders.radiusMd, // 读取该预设的微圆角或直角令牌
      // ⚠️ 行为令牌注入：悬停动画转换时间直接从 behaviors token 里抓取，表现完美的动态一致性
      transition: `all ${speedFast} ${bezierCurve}`, 
      cursor: 'pointer',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'transparent',
      whiteSpace: 'nowrap' as const,
    };

    // 如果按钮被禁用，或者在加载数据，降级为灰色哑光态
    if (disabled || isLoading) {
      return {
        ...base,
        backgroundColor: tokens.colors.bgDisabled,
        borderColor: tokens.colors.borderDisabled,
        color: tokens.colors.textDisabled,
        cursor: 'not-allowed',
        boxShadow: 'none',
      };
    }

    // 根据不同变种(variant)，动态配色
    switch (variant) {
      case 'primary':
        return {
          ...base,
          backgroundColor: tokens.colors.brand,
          borderColor: tokens.colors.brand,
          color: tokens.colors.textInverse, // 使用反向高对比文本色
          boxShadow: tokens.shadows.sm,
        };
      case 'secondary':
        return {
          ...base,
          backgroundColor: tokens.colors.bgInput,
          borderColor: tokens.colors.border,
          color: tokens.colors.textSecondary, // 使用精心定制的二级正文文本色
        };
      case 'outline':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderColor: tokens.colors.brand,
          color: tokens.colors.brand,
        };
      case 'text':
        return {
          ...base,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: tokens.colors.brand,
        };
      case 'danger':
        return {
          ...base,
          backgroundColor: tokens.colors.error,
          borderColor: tokens.colors.error,
          color: tokens.colors.textInverse, // 红色底片也采用高对比反色字符
          boxShadow: tokens.shadows.sm,
        };
      default:
        return base;
    }
  };

  // 4. 定制微交互状态机 (React 监听悬停与按下)
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  let interactiveStyles: React.CSSProperties = {};

  // 鼠标悬停时的设计规范
  if (isHovered && !disabled && !isLoading) {
    switch (variant) {
      case 'primary':
        interactiveStyles = {
          backgroundColor: tokens.colors.brandLight, // 悬停淡化主色
          borderColor: tokens.colors.brandLight,
          boxShadow: tokens.shadows.md,              // 悬浮立体投影加深
        };
        break;
      case 'secondary':
        interactiveStyles = {
          backgroundColor: tokens.colors.bgHover,     // 通用中性悬停背景
        };
        break;
      case 'outline':
        // 为线框按钮增加一点微小的半透明品牌主色底雾晕
        interactiveStyles = {
          backgroundColor: `${tokens.colors.brand}0A`,
          borderColor: tokens.colors.brand,
        };
        break;
      case 'text':
        interactiveStyles = {
          backgroundColor: `${tokens.colors.brand}0A`,
        };
        break;
      case 'danger':
        // 毁灭性危险按钮悬停时轻微色相饱和度变暗
        interactiveStyles = {
          filter: 'brightness(92%)',
          boxShadow: tokens.shadows.md,
        };
        break;
    }
  }

  // 鼠标点击按压下的行为规范板
  if (isActive && !disabled && !isLoading) {
    switch (variant) {
      case 'primary':
        interactiveStyles = {
          ...interactiveStyles,
          backgroundColor: tokens.colors.brandDark, // 按下色加深
          borderColor: tokens.colors.brandDark,
        };
        break;
      case 'secondary':
        interactiveStyles = {
          backgroundColor: tokens.colors.bgActive,    // 通用中性激活背景
        };
        break;
      case 'outline':
        interactiveStyles = {
          ...interactiveStyles,
          backgroundColor: `${tokens.colors.brand}1A`,
        };
        break;
    }
  }

  // ⚠️ 行为令牌重点：我们将“多深度的按钮点击收缩变形比例”作为 inline-style 渲染在 transform 参数上！
  // 萌系香芋糖果会收缩到93%（极大弹性感），而瑞士现代只会微收缩到97%（稳重感），极客单色全直角完全不收缩保持坚固！
  const pressScaleEffect = isActive && !disabled && !isLoading
    ? `scale(${tokens.behaviors.buttonPressScale})`
    : 'scale(1)';

  // 5. 融汇组合核心样式字典
  const finalButtonStyle: React.CSSProperties = {
    ...getVariantStyles(),
    ...sizeStyles[size],
    ...interactiveStyles,
    transform: pressScaleEffect,
    transition: `transform ${speedFast} ${bezierCurve}, background-color ${speedFast} ${bezierCurve}, border-color ${speedFast} ${bezierCurve}, box-shadow ${speedFast} ${bezierCurve}`,
    ...style,
  };

  return (
    <button
      id={`atom-btn-${variant}`}
      style={finalButtonStyle}
      className={`relative select-none overflow-hidden outline-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* 载入状态控制器 */}
      {isLoading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />
      )}
      
      {/* 按钮左侧图标渲染线 */}
      {!isLoading && iconLeft && (
        <span className="mr-2 inline-flex items-center shrink-0">{iconLeft}</span>
      )}
      
      {/* 按钮主文本核心内容 */}
      <span className="truncate">{children}</span>
      
      {/* 按钮右侧图标渲染线 */}
      {!isLoading && iconRight && (
        <span className="ml-2 inline-flex items-center shrink-0">{iconRight}</span>
      )}
    </button>
  );
};

export default Button;
