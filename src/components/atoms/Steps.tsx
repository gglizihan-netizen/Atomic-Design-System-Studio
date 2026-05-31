/**
 * ==========================================
 * 文件名称: /src/components/atoms/Steps.tsx
 * 功能描述: 高保真、AI-Native 物理自适应步骤条原子组件 (Steps)
 * 
 * 💡 设计体系契约：
 * 1. 四大主题完美感知：全部色彩和状态过渡采用 tokens 变量，100% 拒绝任何硬编码三色。
 * 2. 状态驱动计算：
 *    - Process: 主色实亮圆，极致聚焦且沉稳无噪音
 *    - Finish: 完美的品牌色外圈 + 内置 ✅ 图标，呈现气定神闲的精致品质
 *    - Error: 采用 100% tokens.colors.error 高强红圈与闪示差
 *    - Wait: 轻质冷淡中性底灰，与底板完美浑然一体
 * 3. 极简方向兼容：支持横向轨道连接 bridges 和纵向大跨度信息表单连接。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { Check, X, User, CreditCard, Lock, Settings, Mail, FileText, Compass, Send } from 'lucide-react';
import { StepsProps, StepItem } from '../../types/components';

// 动态图标快速解析器
const resolveIcon = (name?: string, size = 16) => {
  if (!name) return null;
  const iconMap: Record<string, React.ReactNode> = {
    user: <User size={size} />,
    creditcard: <CreditCard size={size} />,
    lock: <Lock size={size} />,
    settings: <Settings size={size} />,
    mail: <Mail size={size} />,
    filetext: <FileText size={size} />,
    compass: <Compass size={size} />,
    send: <Send size={size} />,
    check: <Check size={size} />,
    cross: <X size={size} />,
  };
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  return iconMap[key] || null;
};

export const Steps: React.FC<StepsProps> = ({
  current,
  items,
  direction = 'horizontal',
  size = 'md',
  clickable = false,
  onStepChange,
  className = '',
  style,
}) => {
  const { tokens } = useDesignTokens();

  // 1. 动效阻尼控制
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // 果冻回弹
      case 'rigid':
        return 'linear';                           // 极速利落
      case 'smooth':
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';     // 经典平滑
    }
  };

  const motionFast = `${tokens.behaviors.motionDurationFast}ms`;
  const curve = getCurveValue();

  // 2. 状态样式计算器位 (返回颜色、底色、描框色)
  const getStepStatusAndColors = (stepIndex: number, declaredStatus?: StepItem['status']) => {
    // a. 智能状态辨别与计算
    let status: 'wait' | 'process' | 'finish' | 'error' = 'wait';
    if (declaredStatus) {
      status = declaredStatus;
    } else if (stepIndex < current) {
      status = 'finish';
    } else if (stepIndex === current) {
      status = 'process';
    } else {
      status = 'wait';
    }

    // b. 根据状态分发精确变量
    switch (status) {
      case 'finish':
        return {
          status,
          bg: tokens.colors.bgSelection || 'rgba(79, 70, 229, 0.08)',
          border: tokens.colors.brand,
          color: tokens.colors.brand,
          titleColor: tokens.colors.textPrimary,
          descriptionColor: tokens.colors.textMuted,
        };
      case 'process':
        return {
          status,
          bg: tokens.colors.brand,
          border: tokens.colors.brand,
          color: '#ffffff',
          titleColor: tokens.colors.brand,
          descriptionColor: tokens.colors.textSecondary,
        };
      case 'error':
        return {
          status,
          bg: tokens.colors.errorBg || '#FFF5F5',
          border: tokens.colors.error || '#EF4444',
          color: tokens.colors.error || '#EF4444',
          titleColor: tokens.colors.error || '#EF4444',
          descriptionColor: tokens.colors.error || '#EF4444',
        };
      case 'wait':
      default:
        return {
          status,
          bg: '#ffffff',
          border: tokens.colors.border || '#e2e8f0',
          color: tokens.colors.textDisabled || '#94a3b8',
          titleColor: tokens.colors.textMuted,
          descriptionColor: tokens.colors.textDisabled,
        };
    }
  };

  // 3. 尺寸令牌高精度映射
  const dimensionsMap = {
    sm: {
      nodeSize: 28,
      fontSize: '13px',
      descSize: '11px',
      iconSize: 13,
    },
    md: {
      nodeSize: 34,
      fontSize: '14px',
      descSize: '12px',
      iconSize: 15,
    },
    lg: {
      nodeSize: 40,
      fontSize: '15px',
      descSize: '13px',
      iconSize: 17,
    },
  };

  const dim = dimensionsMap[size];

  // 4. 用户交互本地微状态捕获
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);

  const handleStepClick = (idx: number, item: StepItem) => {
    if (!clickable || item.disabled) return;
    if (onStepChange) {
      onStepChange(idx);
    }
  };

  const total = items.length;

  // 5. 渲染高保真连接器
  const renderConnector = (idx: number) => {
    if (idx === total - 1) return null;
    const isFinished = idx < current;
    const activeColor = tokens.colors.brand;
    const inactiveColor = tokens.colors.border || '#e2e8f0';

    if (direction === 'vertical') {
      return (
        <div
          className="absolute"
          style={{
            zIndex: 0,
            left: `${dim.nodeSize / 2 - 0.75}px`,
            top: `${dim.nodeSize + 4}px`,
            bottom: idx === total - 2 ? `-16px` : `-24px`,
            width: '1.5px',
            backgroundColor: isFinished ? activeColor : inactiveColor,
            transition: `background-color ${motionFast} ${curve}`,
          }}
        />
      );
    } else {
      // Horizontal link with fine inline arrow
      return (
        <div className="flex-grow flex items-center min-w-[20px] max-w-[120px] mx-4 select-none">
          {/* Connector Line */}
          <div 
            className="flex-grow h-[1.5px]" 
            style={{ 
              backgroundColor: isFinished ? activeColor : 'transparent',
              borderTop: isFinished ? 'none' : `1.5px dashed ${inactiveColor}`,
              height: isFinished ? '1.5px' : '0px',
              transition: `all ${motionFast} ${curve}`
            }} 
          />
          {/* Arrow Head */}
          <svg 
            width="6" 
            height="10" 
            viewBox="0 0 6 10" 
            fill="none" 
            className="shrink-0 -ml-1"
            style={{ transition: `all ${motionFast} ${curve}` }}
          >
            <path 
              d="M1 1L5 5L1 9" 
              stroke={isFinished ? activeColor : inactiveColor} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div 
      className={`relative w-full flex ${
        direction === 'vertical' ? 'flex-col gap-6' : 'flex-row items-center justify-between'
      } ${className}`}
      style={{
        fontFamily: tokens.typography.headingFont === 'serif' ? 'Georgia, serif' : 'var(--font-sans)',
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const flag = getStepStatusAndColors(idx, item.status);
        const isHovered = hoveredIdx === idx;
        const isPressed = pressedIdx === idx;
        const disabled = item.disabled;

        // 页眉图标智能解析决策
        let iconContent: React.ReactNode = idx + 1; // 默认页码数字
        if (flag.status === 'finish') {
          iconContent = <Check size={dim.iconSize} strokeWidth={2.5} />;
        } else if (flag.status === 'error') {
          iconContent = <X size={dim.iconSize} strokeWidth={2.5} />;
        } else if (item.icon) {
          const resolved = resolveIcon(item.icon, dim.iconSize);
          if (resolved) {
            iconContent = resolved;
          }
        }

        // 计算可点击指针手势属性
        const isInteractive = clickable && !disabled;
        const cursorStyle = isInteractive ? 'pointer' : disabled ? 'not-allowed' : 'default';

        if (direction === 'horizontal') {
          return (
            <React.Fragment key={`step-${idx}`}>
              <div
                className={`flex items-center gap-3 min-w-0 ${idx < total - 1 ? 'flex-1' : 'flex-initial'}`}
                style={{
                  opacity: disabled ? 0.45 : 1,
                  transition: `opacity ${motionFast} ${curve}`,
                }}
              >
                {/* 一体化步骤卡片节点结构 */}
                <div
                  className="flex items-center gap-2.5 min-w-0 shrink-0"
                  onMouseEnter={() => isInteractive && setHoveredIdx(idx)}
                  onMouseLeave={() => { setHoveredIdx(null); setPressedIdx(null); }}
                  onMouseDown={() => isInteractive && setPressedIdx(idx)}
                  onMouseUp={() => setPressedIdx(null)}
                  onClick={() => handleStepClick(idx, item)}
                  style={{
                    cursor: cursorStyle,
                    userSelect: 'none',
                  }}
                >
                  {/* 圆节点圈框 */}
                  <div
                    className="flex items-center justify-center font-bold text-center relative shrink-0"
                    style={{
                      width: `${dim.nodeSize}px`,
                      height: `${dim.nodeSize}px`,
                      borderRadius: '50%',
                      backgroundColor: isHovered ? tokens.colors.bgHover : flag.bg,
                      borderWidth: '2px',
                      borderStyle: 'solid',
                      borderColor: isHovered ? tokens.colors.brand : flag.border,
                      color: isHovered ? tokens.colors.brand : flag.color,
                      fontSize: dim.fontSize,
                      transform: isPressed ? `scale(${tokens.behaviors.buttonPressScale})` : (isHovered ? 'scale(1.04)' : 'scale(1)'),
                      boxShadow: flag.status === 'process' && isHovered ? `0 0 0 3px ${tokens.colors.bgSelection || 'rgba(31,99,209,0.12)'}` : 'none',
                      transition: `all ${motionFast} ${curve}`,
                    }}
                  >
                    {iconContent}
                  </div>

                  {/* 文本内容说明层面 */}
                  <div className="flex flex-col text-left min-w-0">
                    {/* 步骤标题 */}
                    <span
                      className="font-semibold tracking-tight leading-snug whitespace-nowrap md:whitespace-normal"
                      style={{
                        fontSize: dim.fontSize,
                        color: isHovered ? tokens.colors.brand : (flag.status === 'process' ? tokens.colors.brand : tokens.colors.textPrimary),
                        transition: `color ${motionFast} ${curve}`,
                      }}
                    >
                      {item.title}
                    </span>

                    {/* 状态详情辅助文段 */}
                    {item.description && (
                      <span
                        className="font-normal leading-relaxed text-xs text-slate-400 mt-1 line-clamp-1 md:line-clamp-2"
                        style={{
                          fontSize: dim.descSize,
                          color: flag.descriptionColor,
                          maxWidth: '140px',
                          transition: `color ${motionFast} ${curve}`,
                        }}
                        title={item.description}
                      >
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* Seamless horizontal connector line inside the cell */}
                {idx < total - 1 && (
                  <div className="flex-1 flex items-center min-w-[12px] max-w-[80px] mx-2 select-none">
                    <div 
                      className="flex-grow h-[1.5px]" 
                      style={{ 
                        backgroundColor: idx < current ? tokens.colors.brand : 'transparent',
                        borderTop: idx < current ? 'none' : `1.5px dashed ${tokens.colors.border || '#e2e8f0'}`,
                        height: idx < current ? '1.5px' : '0px',
                        transition: `all ${motionFast} ${curve}`
                      }} 
                    />
                    {/* Arrow Head */}
                    <svg 
                      width="6" 
                      height="10" 
                      viewBox="0 0 6 10" 
                      fill="none" 
                      className="shrink-0 -ml-1"
                      style={{ transition: `all ${motionFast} ${curve}` }}
                    >
                      <path 
                        d="M1 1L5 5L1 9" 
                        stroke={idx < current ? tokens.colors.brand : (tokens.colors.border || '#e2e8f0')} 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        } else {
          // Vertical Layout
          return (
            <div
              key={`step-${idx}`}
              className="flex flex-row items-start relative gap-4"
              style={{
                opacity: disabled ? 0.45 : 1,
                transition: `opacity ${motionFast} ${curve}`,
              }}
            >
              {/* Vertical connector bridge */}
              {idx < total - 1 && renderConnector(idx)}

              {/* Side element for nodes */}
              <div
                className="flex items-center justify-center font-bold text-center relative shrink-0"
                onMouseEnter={() => isInteractive && setHoveredIdx(idx)}
                onMouseLeave={() => { setHoveredIdx(null); setPressedIdx(null); }}
                onMouseDown={() => isInteractive && setPressedIdx(idx)}
                onMouseUp={() => setPressedIdx(null)}
                onClick={() => handleStepClick(idx, item)}
                style={{
                  cursor: cursorStyle,
                  width: `${dim.nodeSize}px`,
                  height: `${dim.nodeSize}px`,
                  borderRadius: '50%',
                  backgroundColor: isHovered ? tokens.colors.bgHover : flag.bg,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                  borderColor: isHovered ? tokens.colors.brand : flag.border,
                  color: isHovered ? tokens.colors.brand : flag.color,
                  fontSize: dim.fontSize,
                  transform: isPressed ? `scale(${tokens.behaviors.buttonPressScale})` : (isHovered ? 'scale(1.04)' : 'scale(1)'),
                  boxShadow: flag.status === 'process' && isHovered ? `0 0 0 3px ${tokens.colors.bgSelection || 'rgba(31,99,209,0.12)'}` : 'none',
                  transition: `all ${motionFast} ${curve}`,
                  userSelect: 'none',
                }}
              >
                {iconContent}
              </div>

              {/* Right content layout for vertical layout */}
              <div 
                className="flex flex-col text-left shrink-0 pb-6 cursor-pointer"
                onClick={() => handleStepClick(idx, item)}
                onMouseEnter={() => isInteractive && setHoveredIdx(idx)}
                onMouseLeave={() => { setHoveredIdx(null); setPressedIdx(null); }}
                style={{ cursor: cursorStyle }}
              >
                {/* 步骤标题 */}
                <span
                  className="font-semibold tracking-tight leading-none pt-1"
                  style={{
                    fontSize: dim.fontSize,
                    color: isHovered ? tokens.colors.brand : (flag.status === 'process' ? tokens.colors.brand : tokens.colors.textPrimary),
                    transition: `color ${motionFast} ${curve}`,
                    marginBottom: '4px',
                  }}
                >
                  {item.title}
                </span>

                {/* 状态详情辅助文段 */}
                {item.description && (
                  <span
                    className="font-normal leading-relaxed text-wrap"
                    style={{
                      fontSize: dim.descSize,
                      color: flag.descriptionColor,
                      maxWidth: '450px',
                      transition: `color ${motionFast} ${curve}`,
                    }}
                  >
                    {item.description}
                  </span>
                )}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Steps;
