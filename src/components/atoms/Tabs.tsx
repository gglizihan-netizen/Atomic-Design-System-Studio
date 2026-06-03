/**
 * ==========================================
 * 文件名称: /src/components/atoms/Tabs.tsx
 * 功能描述: 高保真、AI-Native 物理自适应选项卡原子组件 (Tabs)
 * 
 * 💡 设计体系契约：
 * 1. 四大主题自适应：高度继承 useDesignTokens。配色深浅、背景毛玻璃、圆角和文字尺寸皆由全局系统令牌直接调遣。
 * 2. 极致微动效：基于 `motion/react` 接管。使用 layoutId 技术实现共享元素布局转换，
 *    选项切换时的下滑线滑动、胶囊背景滑移均支持物理阻尼的高反弹曲线。
 * 3. 跨应用多变体：
 *    - line: 经典简洁下划线风，具备高级开阔感、留白感
 *    - pill: 圆弧气泡胶囊悬浮风，切换时滑块具有果冻果冻弹性缩放感
 *    - card: 精美细分切分风，让各选项在槽块中独立升起，高质感立体的 PC 界面
 * 4. 三维布局扩展：支持横向铺排、PC 控制面板特需的垂直纵向陈列、以及横向满幅拉伸。
 * ==========================================
 */

import React from 'react';
import { motion } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { TabsProps, TabItem } from '../../types/components';
import { 
  User, Settings, Compass, Mail, FileText, 
  Bell, Shield, Terminal, Cloud, Database, Cpu, Activity
} from 'lucide-react';

// 可选图标映射映射表，满足高频业务需求
const resolveTabIcon = (name?: string, size = 15) => {
  if (!name) return null;
  const iconMap: Record<string, React.ReactNode> = {
    user: <User size={size} />,
    settings: <Settings size={size} />,
    compass: <Compass size={size} />,
    mail: <Mail size={size} />,
    filetext: <FileText size={size} />,
    bell: <Bell size={size} />,
    shield: <Shield size={size} />,
    terminal: <Terminal size={size} />,
    cloud: <Cloud size={size} />,
    database: <Database size={size} />,
    cpu: <Cpu size={size} />,
    activity: <Activity size={size} />,
  };
  const key = name.toLowerCase().replace(/[^a-z]/g, '');
  return iconMap[key] || null;
};

export const Tabs: React.FC<TabsProps> = ({
  activeId,
  items,
  onChange,
  variant = 'line',
  size = 'md',
  direction = 'horizontal',
  fullWidth = false,
  className = '',
  style,
}) => {
  const { tokens } = useDesignTokens();

  // 1. 动效缓动曲线
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return [0.34, 1.56, 0.64, 1]; // framer-motion bezier array
      case 'rigid':
        return [0, 0, 1, 1];
      case 'smooth':
      default:
        return [0.4, 0, 0.2, 1];
    }
  };

  const getTransition = () => {
    return {
      type: tokens.behaviors.motionCurve === 'spring' ? 'spring' : 'tween',
      ease: getCurveValue(),
      duration: tokens.behaviors.motionDurationFast / 1000,
    };
  };

  // 2. 高度、内边距及字号自适应
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          height: '34px',
          paddingX: '12px',
          fontSize: tokens.typography.sizeSm,
          badgeSize: 'text-[10px] px-1.5 py-0.5 min-w-[16px]',
        };
      case 'lg':
        return {
          height: '48px',
          paddingX: '20px',
          fontSize: tokens.typography.sizeLg,
          badgeSize: 'text-[12px] px-2 py-0.5 min-w-[20px]',
        };
      case 'md':
      default:
        return {
          height: '40px',
          paddingX: '16px',
          fontSize: tokens.typography.sizeBase,
          badgeSize: 'text-[11px] px-1.5 py-0.5 min-w-[18px]',
        };
    }
  };

  const sizeCfg = getSizeConfig();
  const transition = getTransition();

  // 3. 构建容器级别样式
  const containerClasses = [
    'relative flex',
    direction === 'horizontal' ? 'flex-row items-center' : 'flex-col',
    // 只有 line 变体并且在水平排列时，才在底部渲染下划线容器边框
    direction === 'horizontal' && variant === 'line' ? 'border-b' : '',
    fullWidth ? 'w-full' : 'inline-flex',
    className,
  ].join(' ');

  const getContainerStyle = () => {
    const isHorizontal = direction === 'horizontal';
    
    // 如果是 card 样式，给外层容器加上卡槽背景
    if (variant === 'card') {
      return {
        backgroundColor: tokens.colors.bgInput || 'var(--color-bg-input)',
        borderRadius: tokens.borders.radiusMd || 'var(--radius-md)',
        padding: '3px',
        border: `1px solid ${tokens.colors.border || 'var(--color-border)'}`,
        height: isHorizontal ? sizeCfg.height : 'auto',
        ...style,
      };
    }

    if (variant === 'pill') {
      return {
        backgroundColor: tokens.colors.bgTag || 'var(--color-bg-tag)', 
        borderRadius: tokens.borders.radiusFull || 'var(--radius-full)',
        padding: tokens.spacings.xs || 'var(--space-xs)', // 以系统设定的极窄间距（4px-8px）作为呼吸缓冲 padding
        border: 'none', // 无任何边框线
        boxShadow: tokens.shadows.none || 'var(--shadow-none)',
        height: isHorizontal ? sizeCfg.height : 'auto',
        ...style,
      };
    }

    // Line 样式：仅在 horizontal 有下划边框
    return {
      borderBottomColor: isHorizontal ? (tokens.colors.border || 'var(--color-border)') : 'transparent',
      height: isHorizontal ? sizeCfg.height : 'auto',
      ...style,
    };
  };

  return (
    <div className={containerClasses} style={getContainerStyle()} id="atomix-tabs-container">
      {items.map((item) => {
        const isActive = item.id === activeId;
        const isDisabled = item.disabled;

        // 计算标签文字色 (确保非悬停/非激活选项也具有优秀的易读性，排除反差文字不明显问题)
        const getTabTextColor = () => {
          if (isDisabled) return tokens.colors.textDisabled || 'var(--color-text-disabled)';
          if (isActive) {
            return tokens.colors.textPrimary || 'var(--color-text-primary)';
          }
          // 非激活项颜色
          return tokens.colors.textSecondary || 'var(--color-text-secondary)';
        };

        // 计算选项选项卡基础样式
        const tabItemStyle = {
          color: getTabTextColor(),
          height: '100%', // 统一使用父容器 100% 做呼吸伸缩，不进行像素级别的高度硬编码
          paddingLeft: sizeCfg.paddingX,
          paddingRight: sizeCfg.paddingX,
          fontSize: sizeCfg.fontSize,
          borderRadius: variant === 'card' 
            ? (tokens.borders.radiusSm || 'var(--radius-sm)')
            : variant === 'pill'
            ? (tokens.borders.radiusFull || 'var(--radius-full)')
            : variant === 'line' && direction === 'vertical'
            ? `${tokens.borders.radiusMd || 'var(--radius-md)'} 0 0 ${tokens.borders.radiusMd || 'var(--radius-md)'}`
            : '0px',
        };

        const handleTabClick = () => {
          if (!isDisabled && onChange) {
            onChange(item.id);
          }
        };

        return (
          <button
            key={item.id}
            onClick={handleTabClick}
            disabled={isDisabled}
            className={[
              'relative flex items-center select-none focus:outline-none transition-colors border-0',
              direction === 'vertical' ? 'w-full py-2.5 my-0.5' : 'h-full',
              fullWidth && direction === 'horizontal' ? 'flex-1 w-full' : '',
              isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:opacity-85',
              tokens.typography.headingFont === 'mono' ? 'font-mono' : 'font-sans',
              'font-semibold'
            ].join(' ')}
            style={tabItemStyle}
            id={`tabs-item-btn-${item.id}`}
          >
            {/* 1. 精美共享元素滑动高光块（基于 framer-motion） */}
            {isActive && variant === 'pill' && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: tokens.colors.bgCard || 'var(--color-bg-card)',
                  borderRadius: tokens.borders.radiusFull || 'var(--radius-full)',
                  // 仅使用核心设计系统 shadows 的中偏轻投影，移除硬编码
                  boxShadow: tokens.shadows.sm || 'var(--shadow-sm)',
                  border: 'none',
                }}
                transition={transition}
              />
            )}

            {isActive && variant === 'card' && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 z-0 border"
                style={{
                  backgroundColor: tokens.colors.bgCard || 'var(--color-bg-card)',
                  borderColor: tokens.colors.border || 'var(--color-border)',
                  borderRadius: tokens.borders.radiusSm || 'var(--radius-sm)',
                  boxShadow: tokens.shadows.sm || 'var(--shadow-sm)',
                }}
                transition={transition}
              />
            )}

            {/* Underline or Left-line variant indicator */}
            {isActive && variant === 'line' && (
              <motion.div
                layoutId="activeTabIndicator"
                className={[
                  'absolute',
                  direction === 'horizontal' ? 'left-0 right-0 bottom-0 h-[2px]' : 'top-0 bottom-0 left-0 w-[3px]',
                ].join(' ')}
                style={{
                  backgroundColor: tokens.colors.brand || 'var(--color-brand)',
                }}
                transition={transition}
              />
            )}

            {/* 2. 包装内容容器，提高层级以防被高光块或父容器背景遮挡 */}
            <span className={[
              'relative z-10 flex items-center gap-2 w-full h-full',
              direction === 'vertical' ? 'justify-start' : 'justify-center'
            ].join(' ')}>
              {/* 可选矢量图标 */}
              {item.icon && (
                <span className="flex-shrink-0" style={{ color: isActive ? (tokens.colors.brand || 'var(--color-brand)') : 'inherit' }}>
                  {resolveTabIcon(item.icon)}
                </span>
              )}

              {/* 标签名称 */}
              <span>{item.label}</span>

              {/* 可选右上角徽章 */}
              {item.badge !== undefined && (
                <span
                  className={[
                    'rounded-full flex items-center justify-center font-bold font-mono tracking-tight text-center leading-none scale-[0.85]',
                    sizeCfg.badgeSize,
                  ].join(' ')}
                  style={{
                    backgroundColor: tokens.colors.brand || 'var(--color-brand)',
                    color: tokens.colors.textInverse || 'var(--color-text-inverse)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
