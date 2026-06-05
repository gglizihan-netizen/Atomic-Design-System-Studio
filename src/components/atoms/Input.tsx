/**
 * ==========================================
 * 文件名称: /src/components/atoms/Input.tsx
 * 功能描述: 高度统一的通用多态/通用输入框组件 (方案B)
 * 目标受众: 产品经理、UI设计师、交互体验师、全栈工程师。
 * 
 * 💡 本组件特色：
 * 1. 方案B大一统架构：一个 Input 组件横跨单行、多行(textarea)、密码(password toggle)、数字微调(number custom steps)、搜索(search with clear)等核心类型。
 * 2. 物理手感与无缝响应：跟随系统设计系统行为令牌，如 `inputFocusRing` 精细聚焦圈控制。
 * 3. 完美的前后装饰插槽：通过 iconLeft, iconRight, prefix, suffix 极具表达力地拓展文本域外延。
 * 4. 极致细节：抹除浏览器原生数字输入框极丑的上下黑箭头，替换为定制级高交互像素微调舵轮。
 * ==========================================
 */

import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Eye, EyeOff, Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useDesignTokens } from '../base/DesignTokensContext';

/**
 * 🏷️ 方案B：全能统一输入框属性 (Props) 声明清单
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value' | 'defaultValue' | 'type'> {
  label?: string;              // 主标题标签 (例如: “电子邮箱”)
  description?: string;        // 辅助说明文案
  error?: string;              // 报错文本 (自动转为红色的高亮警告形态)
  size?: 'sm' | 'md' | 'lg';   // 尺寸梯度 ('sm' | 'md' | 'lg')
  type?: 'text' | 'password' | 'number' | 'search' | 'textarea' | 'email' | 'tel' | 'url'; // 全场景录入类型
  
  // 基础值管理
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<any>) => void;
  
  // 装饰修饰器
  iconLeft?: React.ReactNode;  // 左侧前置修饰图标
  iconRight?: React.ReactNode; // 右侧后置修饰图标
  prefix?: React.ReactNode;    // 极小前缀文本/标签 (如: "$", "https://")
  suffix?: React.ReactNode;    // 极小后缀文本/标签 (如: ".com", "kg")
  
  // 功能型参数
  allowClear?: boolean;        // 是否允许一键清空 (点击 X 按钮)
  onClear?: () => void;        // 清空事件回调
  
  // 多行文本专属
  rows?: number;               // 默认行数
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'; // 拉伸控制
  
  // 数字专属
  min?: number;
  max?: number;
  step?: number;
}

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  label,
  description,
  error,
  size = 'md',
  type = 'text',
  className = '',
  style,
  allowClear = false,
  onClear,
  onChange,
  iconLeft,
  iconRight,
  prefix,
  suffix,
  disabled = false,
  rows = 3,
  resize = 'vertical',
  ...props
}, ref) => {
  const { tokens } = useDesignTokens();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 双模值管理：使清空和数字增加/减少能在受控/半受控下极速流畅穿透
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState(props.defaultValue !== undefined ? props.defaultValue : '');
  const inputValue = isControlled ? String(props.value ?? '') : String(internalValue);

  // 引用映射
  const localInputRef = useRef<HTMLInputElement>(null);
  const localTextAreaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => {
    if (type === 'textarea') {
      return localTextAreaRef.current!;
    }
    return localInputRef.current!;
  });

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

  // 计算当前的边框色彩 (无缝响应 默认/聚焦/报错/禁用 状态)
  const getBorderColor = () => {
    if (disabled) return tokens.colors.borderDisabled;
    if (error) return tokens.colors.error;
    if (isFocused) return tokens.colors.borderFocus;
    return tokens.colors.border;
  };

  // 🔔 基于“行为令牌”计算聚焦圈 (Focus Ring) 阴影
  const getFocusShadow = () => {
    if (!isFocused || disabled) return tokens.shadows.none;
    if (error) return `0 0 0 3px ${tokens.colors.error}24`; // 报错高亮红色光环
    
    // 读取系统令牌的行为倾向：有些主题（如代码终端）严格禁止外聚焦光圈，有些（如软萌香芋）需要梦幻发散光圈
    if (tokens.behaviors.inputFocusRing) {
      return `0 0 0 3px ${tokens.colors.focusRing}`; // 使用颜色令牌定义中的聚焦气垫光圈
    }
    
    return tokens.shadows.none; // 反之，拒绝发光圈
  };

  // 统一的 Change 事件触发器，向下兼容受控和半受控
  const fireChangeEvent = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onChange) {
      const simulatedEvent = {
        target: {
          value: newValue,
          name: props.name,
        },
        currentTarget: {
          value: newValue,
          name: props.name,
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
      onChange(simulatedEvent);
    }
  };

  // 密码显示状态切换
  const togglePasswordVisibility = () => {
    if (disabled) return;
    setIsPasswordVisible(!isPasswordVisible);
  };

  // 一键清空处理器
  const handleClear = () => {
    if (disabled || props.readOnly) return;
    fireChangeEvent('');
    if (onClear) {
      onClear();
    }
  };

  // 数字加减微调器 (+ / -)
  const handleNumberStep = (direction: 'up' | 'down') => {
    if (disabled || props.readOnly) return;
    const minVal = props.min !== undefined ? Number(props.min) : -Infinity;
    const maxVal = props.max !== undefined ? Number(props.max) : Infinity;
    const currentNum = inputValue === '' ? 0 : Number(inputValue);
    const stepVal = props.step !== undefined ? Number(props.step) : 1;

    let nextNum = direction === 'up' ? currentNum + stepVal : currentNum - stepVal;
    
    if (nextNum < minVal) nextNum = minVal;
    if (nextNum > maxVal) nextNum = maxVal;
    if (isNaN(nextNum)) nextNum = 0;

    fireChangeEvent(String(nextNum));
  };

  // 元素结构修饰计算
  const isSearch = type === 'search';
  const isPassword = type === 'password';
  const isNumber = type === 'number';
  const isTextarea = type === 'textarea';

  const hasIconLeft = !!iconLeft || isSearch || !!prefix;
  const hasIconRight = !!iconRight || isPassword || isNumber || !!suffix || (allowClear && inputValue !== '');

  // 外层包裹样式
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: tokens.spacings.xs,
    width: '100%',
  };

  // 输控外壳面板样式
  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: isTextarea ? 'stretch' : 'center',
    position: 'relative' as const,
    backgroundColor: disabled ? tokens.colors.bgDisabled : tokens.colors.bgInput,
    borderRadius: tokens.borders.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: getBorderColor(),
    boxShadow: getFocusShadow(),
    transition: `all ${speedNormal} ${animationCurve}`,
    width: '100%',
    overflow: 'hidden', // 💡 防止多行输入框内衬及原生边缘在各种主题下突出溢出
  };

  // 3. 计算极速精细的左右填充，完美保证在任何修饰组合下文本与图标都不会产生物理重叠或挤压
  const getPaddingLeftSpace = () => {
    if (isTextarea) return '12px';
    let basePadding = 12;
    if (prefix) {
      basePadding += 24;
    } else if (isSearch) {
      basePadding += 24;
    } else if (iconLeft) {
      basePadding += 24;
    }
    return `${basePadding}px`;
  };

  const getPaddingRightSpace = () => {
    // 即使是多行 textarea 且开启了 allowClear 清空，也要腾出 36px 空间给右上角的物理关闭按钮
    if (isTextarea) {
      return (allowClear && inputValue !== '') ? '36px' : '12px';
    }
    if (suffix) return '44px';
    
    let basePadding = 12; // 基础右内边距
    if (isNumber) {
      basePadding += 28; // 微调按钮宽度 28px
      if (allowClear && inputValue !== '') {
        basePadding += 24; // 如果同时有清空，向左再移 24px 复合避让
      }
    } else if (isPassword) {
      basePadding += 24; // 密码眼睛宽度 24px
      if (allowClear && inputValue !== '') {
        basePadding += 24; // 如果同时有清空，向左再移 24px
      }
    } else {
      if (allowClear && inputValue !== '') {
        basePadding += 24; // 普通关闭清除按钮 24px
      } else if (iconRight) {
        basePadding += 24; // 自定义右置 icon 占位
      }
    }
    return `${basePadding}px`;
  };

  const paddingLeftSpace = getPaddingLeftSpace();
  const paddingRightSpace = getPaddingRightSpace();

  // 输入框内部实体样式
  const inputElementStyle: React.CSSProperties = {
    flex: '1 1 0%',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: disabled ? tokens.colors.textDisabled : tokens.colors.textPrimary,
    fontFamily: isNumber ? tokens.typography.fontMono : 'inherit',
    fontSize: currentSize.fontSize,
    paddingLeft: paddingLeftSpace,
    paddingRight: paddingRightSpace,
    width: '100%',
    boxSizing: 'border-box' as const,
    alignSelf: 'center', // 💎 纵向拉直对齐，不随外框基线偏差产生漂移
    ...(isTextarea 
      ? { 
          resize: resize, 
          minHeight: '80px', 
          paddingTop: '10px', 
          paddingBottom: '10px',
          lineHeight: '1.5',
          borderRadius: tokens.borders.radiusMd, // 💡 圆角边界内聚，迫使原生滚动条不刺出底板
          overflow: 'auto',
          alignSelf: 'stretch',
        } 
      : { 
          height: currentSize.height,
          paddingTop: '0px',
          paddingBottom: '0px',
          lineHeight: 'normal', // 确保无阻碍地使文字自然居中
        }),
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
            userSelect: 'none',
          }}
        >
          {label}
        </label>
      )}

      {/* 2. 辅助提示文字区 */}
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

      {/* 3. 输入容器/外壳主控板 */}
      <div style={inputContainerStyle}>
        
        {/* === 左前方修饰器 === */}
        {prefix && (
          <div
            className="absolute left-3 flex items-center justify-center shrink-0 select-none text-xs font-medium"
            style={{ 
              color: tokens.colors.textMuted,
              top: isTextarea ? '12px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
            }}
          >
            {prefix}
          </div>
        )}

        {isSearch && !prefix && (
          <div
            className="absolute left-3 flex items-center justify-center shrink-0 select-none pointer-events-none"
            style={{ 
              color: tokens.colors.textMuted,
              top: isTextarea ? '12px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
            }}
          >
            <Search size={16} strokeWidth={2} />
          </div>
        )}

        {iconLeft && !prefix && !isSearch && (
          <div
            className="absolute left-3 flex items-center justify-center shrink-0 select-none pointer-events-none"
            style={{ 
              color: tokens.colors.textMuted,
              top: isTextarea ? '12px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
            }}
          >
            {iconLeft}
          </div>
        )}

        {/* === 中间核心表单域 === */}
        {isTextarea ? (
          <textarea
            ref={localTextAreaRef}
            style={inputElementStyle}
            disabled={disabled}
            value={inputValue}
            rows={rows}
            onChange={(e) => fireChangeEvent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            readOnly={props.readOnly}
            required={props.required}
            name={props.name}
            id={props.id}
          />
        ) : (
          <input
            ref={localInputRef}
            style={inputElementStyle}
            disabled={disabled}
            type={isPassword ? (isPasswordVisible ? 'text' : 'password') : (type === 'number' ? 'text' : type)}
            value={inputValue}
            onChange={(e) => {
              // 如果是数字输入，仅接受合规数字或小数点/负号
              if (isNumber) {
                const rawVal = e.target.value;
                if (rawVal === '' || /^-?\d*\.?\d*$/.test(rawVal)) {
                  fireChangeEvent(rawVal);
                }
              } else {
                fireChangeEvent(e.target.value);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={props.onKeyDown}
            onKeyUp={props.onKeyUp}
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            readOnly={props.readOnly}
            required={props.required}
            name={props.name}
            id={props.id}
            autoComplete={props.autoComplete}
          />
        )}

        {/* === 右后方修饰与交互层 === */}
        
        {/* 1. 后置简单文本后缀 */}
        {suffix && (
          <div
            className="absolute right-3 flex items-center justify-center shrink-0 select-none text-xs font-semibold"
            style={{ 
              color: tokens.colors.textMuted,
              top: isTextarea ? '12px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
            }}
          >
            {suffix}
          </div>
        )}

        {/* 2. 经典一键清空 (支持所有输入模型) */}
        {!suffix && allowClear && inputValue !== '' && !disabled && !props.readOnly && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute p-1 rounded-full cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 flex items-center justify-center"
            style={{ 
              color: tokens.colors.textMuted,
              right: isNumber ? '34px' : '10px',
              top: isTextarea ? '10px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
              height: '24px',
              width: '24px',
            }}
            title="清空内容"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}

        {/* 3. 密码特化：一键眼球闭合切换 */}
        {!suffix && isPassword && !disabled && (
          <button
            type="button"
            disabled={disabled}
            onClick={togglePasswordVisibility}
            className="absolute p-1 rounded-md cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 flex items-center justify-center"
            style={{ 
              color: tokens.colors.textMuted,
              right: (allowClear && inputValue !== '') ? '34px' : '10px',
              top: isTextarea ? '10px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
              height: '24px',
              width: '24px',
            }}
            title={isPasswordVisible ? "隐藏密码" : "显示密码"}
          >
            {isPasswordVisible ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
          </button>
        )}

        {/* 4. 数字特化：极窄像素质感微调按钮 (上下叠合并立) */}
        {!suffix && isNumber && (
          <div 
            className="absolute right-1 top-1 bottom-1 flex flex-col border-l select-none overflow-hidden rounded-r-md"
            style={{ 
              borderColor: tokens.colors.border,
              width: '28px',
              backgroundColor: tokens.colors.bgButton || 'rgba(0,0,0,0.02)'
            }}
          >
            {/* 增加按钮 */}
            <button
              type="button"
              disabled={disabled || props.readOnly}
              onClick={() => handleNumberStep('up')}
              className="flex-1 flex items-center justify-center cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ color: tokens.colors.textSecondary }}
            >
              <ChevronUp size={12} strokeWidth={2.5} />
            </button>
            {/* 减少按钮 */}
            <button
              type="button"
              disabled={disabled || props.readOnly}
              onClick={() => handleNumberStep('down')}
              className="flex-1 flex items-center justify-center border-t cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ borderColor: tokens.colors.border, color: tokens.colors.textSecondary }}
            >
              <ChevronDown size={12} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* 5. 经典右侧外来修饰图标 */}
        {!suffix && !isPassword && !isNumber && (!allowClear || inputValue === '') && iconRight && (
          <div
            className="absolute right-3 flex items-center justify-center shrink-0 select-none pointer-events-none"
            style={{ 
              color: tokens.colors.textMuted,
              top: isTextarea ? '12px' : '50%',
              transform: isTextarea ? 'none' : 'translateY(-50%)',
            }}
          >
            {iconRight}
          </div>
        )}

      </div>

      {/* 4. 底部动态报错纠错排版 */}
      {error && (
        <p
          style={{
            fontSize: '0.785rem',
            color: tokens.colors.error,
            marginTop: '2px',
            fontWeight: tokens.typography.fontWeightMedium || '500',
            userSelect: 'none',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
