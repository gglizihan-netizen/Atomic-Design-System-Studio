/**
 * ==========================================
 * 文件名称: /src/components/atoms/Input.tsx
 * 功能描述: 高交互、支持行为契约的输入框原子组件
 * 目标受众: 产品经理、UI设计师、交互体验师。
 * 
 * 💡 本组件特色：
 * 1. 动态自适应：完美跟随当前设计主题切换底色（白底、深色代码黑底、米黄色纸张底）。
 * 2. 行为光圈控制：当用户点击聚焦输入框时，是否显示包裹的外光晕投影（Focus Ring），直接读取
 *    `tokens.behaviors.inputFocusRing`。如果是科技终端风格，该值为 false，聚焦时只有刚直的外框变绿变亮，
 *    无任何圆滑投影，保留完美极客硬朗质感！
 * 3. 校验提示：完美集成表单 Error 警告状态，自动将文字、边框和光环变更为设计系统的错误警告色。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';

/**
 * 🏷️ 标准输入框属性 (Props) 详尽中文声明清单
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;          // 主标题标签 (例如: “电子邮箱地址”)
  description?: string;    // 副标题/辅助说明文案 (例如: “我们绝不向第三方透露您的邮箱”)
  error?: string;          // 报错文本。若传值，组件会自动转为红色的高亮警告模式
  iconLeft?: React.ReactNode;  // 左侧前置修饰图标
  iconRight?: React.ReactNode; // 右侧后置修饰图标
  size?: 'sm' | 'md' | 'lg';   // 输入框尺寸梯度 (对应小、中、高，调整文字和 padding 呼吸间隙)
}

export const Input: React.FC<InputProps> = ({
  label,
  description,
  error,
  iconLeft,
  iconRight,
  disabled,
  size = 'md',
  className = '',
  style,
  ...props
}) => {
  const { tokens } = useDesignTokens();
  const [isFocused, setIsFocused] = useState(false);

  // 1. 动效缓动曲线从行为令牌中抓取
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Q弹
      case 'rigid':
        return 'linear';                           // 行进生硬
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';     // 顺滑
    }
  };

  const speedNormal = `${tokens.behaviors.motionDurationNormal}ms`;
  const animationCurve = getCurveValue();

  // 2. 表单控件由于间距令牌(SpacingSet)带来的尺寸约束矩阵
  const sizingMap = {
    sm: {
      padding: `${tokens.spacings.xs} ${tokens.spacings.sm}`,
      fontSize: tokens.typography.sizeSm,
      height: '34px',
    },
    md: {
      padding: `${tokens.spacings.sm} ${tokens.spacings.md}`,
      fontSize: tokens.typography.sizeBase,
      height: '42px',
    },
    lg: {
      padding: `${tokens.spacings.md} ${tokens.spacings.lg}`,
      fontSize: tokens.typography.sizeLg,
      height: '50px',
    },
  };

  const currentSize = sizingMap[size];

  // 3. 计算当前的边框色彩 (无缝响应 默认/聚焦/报错/禁用 状态)
  const getBorderColor = () => {
    if (disabled) return tokens.colors.borderDisabled;
    if (error) return tokens.colors.error;
    if (isFocused) return tokens.colors.borderFocus;
    return tokens.colors.border;
  };

  // 4. 输入框最外层垂直包裹箱样式
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: tokens.spacings.xs,
    width: '100%',
  };

  // 5. 🔔 核心：基于“行为令牌”计算聚焦圈 (Focus Ring) 阴影
  // 如果行为令牌 inputFocusRing 开启了，那么聚焦时就动态生成 3px 直径的标准发光圈
  const getFocusShadow = () => {
    if (!isFocused || disabled) return tokens.shadows.none;
    if (error) return `0 0 0 3px ${tokens.colors.error}24`; // 报错高亮红色光环
    
    // 读取系统令牌的行为倾向：有些主题（如代码终端）严格禁止外聚焦光圈，有些（如软萌香芋）需要梦幻发散光圈
    if (tokens.behaviors.inputFocusRing) {
      return `0 0 0 3px ${tokens.colors.focusRing}`; // 使用颜色令牌定义中的聚焦气垫光圈
    }
    
    return tokens.shadows.none; // 反之，拒绝发光圈
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    backgroundColor: disabled ? tokens.colors.bgDisabled : tokens.colors.bgInput,
    borderRadius: tokens.borders.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: getBorderColor(),
    boxShadow: getFocusShadow(),
    transition: `all ${speedNormal} ${animationCurve}`,
    width: '100%',
  };

  const inputElementStyle: React.CSSProperties = {
    flex: '1 1 0%',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: disabled ? tokens.colors.textDisabled : tokens.colors.textPrimary,
    fontFamily: 'inherit',
    ...currentSize,
    paddingLeft: iconLeft ? '38px' : tokens.spacings.md,
    paddingRight: iconRight ? '38px' : tokens.spacings.md,
    width: '100%',
  };

  return (
    <div style={wrapperStyle} className={className} id={`input-field-wrapper-${label || 'unnamed'}`}>
      {/* 1. 顶部标签排版区 */}
      {label && (
        <label
          style={{
            fontSize: tokens.typography.sizeSm,
            fontWeight: tokens.typography.fontWeightMedium || '500',
            color: error ? tokens.colors.error : tokens.colors.textPrimary,
            letterSpacing: '0.01em',
            alignSelf: 'flex-start',
          }}
        >
          {label}
        </label>
      )}

      {/* 2. 辅助提示文字区 (当没有错误时才静静显示，不干扰视线) */}
      {description && !error && (
        <p
          style={{
            fontSize: '0.785rem',
            color: tokens.colors.textMuted,
            marginTop: '-2px',
          }}
        >
          {description}
        </p>
      )}

      {/* 3. 输入容器实体板 */}
      <div style={inputContainerStyle}>
        {iconLeft && (
          <div
            className="absolute left-3 flex items-center justify-center shrink-0 select-none pointer-events-none"
            style={{ color: tokens.colors.textMuted }}
          >
            {iconLeft}
          </div>
        )}

        <input
          style={inputElementStyle}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {iconRight && (
          <div
            className="absolute right-3 flex items-center justify-center shrink-0 select-none"
            style={{ color: tokens.colors.textMuted }}
          >
            {iconRight}
          </div>
        )}
      </div>

      {/* 4. 底部动态报错纠错区 */}
      {error && (
        <p
          style={{
            fontSize: '0.785rem',
            color: tokens.colors.error,
            marginTop: '2px',
            fontWeight: tokens.typography.fontWeightMedium || '500',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
