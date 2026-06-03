/**
 * ==========================================
 * 文件名称: /src/components/atoms/Loading.tsx
 * 功能描述: 高保真、多维美学视觉过渡、高感应设计系统令牌的智能加载呈现原语。
 * 
 * 🎨 设计系统与应用支持:
 * 1. 严格使用 useDesignTokens 统一的系列预设配色与物理缓动。
 * 2. 具备 5 大经典动画形态: spinner (渐变转轮), dots (波浪弹跳三点), pulse (呼吸水波涟漪), bar (顶部不确定流光进度线), skeleton (智能骨架发光扫尾占位卡)。
 * 3. 完美兼容双重运作形态: 既可以作为独立容器放置，也可作为包裹容器，加持毛玻璃微晶遮罩 (backdrop), 给予大盘流畅的异步数据捕获视觉。
 * ==========================================
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { LoadingProps } from '../../types/components';

export const Loading: React.FC<React.PropsWithChildren<LoadingProps>> = ({
  spinning = true,
  type = 'spinner',
  size = 'md',
  color = 'default',
  tip,
  tipPosition = 'bottom',
  backdrop = false,
  id = 'loading-element-wrapper',
  children,
}) => {
  const { tokens } = useDesignTokens();

  // 根据 tokens 以及传参，自适应对应的渲染状态色彩
  const getStatusColor = () => {
    switch (color) {
      case 'success':
        return tokens.colors.success || '#10B981';
      case 'warning':
        return tokens.colors.warning || '#F59E0B';
      case 'error':
        return tokens.colors.error || '#EF4444';
      case 'white':
        return '#FFFFFF';
      case 'brand':
      case 'default':
      default:
        return tokens.colors.brand;
    }
  };

  const activeColor = getStatusColor();

  // 尺寸映射字典 (针对不同的动画类型做精准物理缩放规格定制)
  const sizeMap = {
    sm: {
      spinner: 'w-4 h-4 border-[2px]',
      dots: 'gap-1 h-3',
      pulse: 'w-6 h-6',
      text: 'text-[10px]',
      gap: 'gap-1.5',
    },
    md: {
      spinner: 'w-8 h-8 border-[3px]',
      dots: 'gap-1.5 h-4',
      pulse: 'w-12 h-12',
      text: 'text-xs',
      gap: 'gap-2.5',
    },
    lg: {
      spinner: 'w-12 h-12 border-[4px]',
      dots: 'gap-2 h-5',
      pulse: 'w-18 h-18',
      text: 'text-sm',
      gap: 'gap-3.5',
    },
    xl: {
      spinner: 'w-16 h-16 border-[4px]',
      dots: 'gap-2.5 h-6',
      pulse: 'w-24 h-24',
      text: 'text-base',
      gap: 'gap-4.5',
    },
  };

  const currentSize = sizeMap[size];

  // 1. 【SPINNER 传统渐变转轮】模式
  const renderSpinner = () => {
    return (
      <motion.div
        className={`${currentSize.spinner} rounded-full border-t-transparent border-r-transparent border-b-transparent`}
        style={{
          borderColor: activeColor,
          borderTopColor: 'transparent', // 保持单弧线旋转高亮
        }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 0.8,
        }}
      />
    );
  };

  // 2. 【DOTS 柔性波浪弹跳三点】模式
  const renderDots = () => {
    return (
      <div className={`flex items-center ${currentSize.dots}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`dot-${i}`}
            className="rounded-full"
            style={{
              backgroundColor: activeColor,
              width: size === 'sm' ? '6px' : size === 'md' ? '9px' : size === 'lg' ? '12px' : '15px',
              height: size === 'sm' ? '6px' : size === 'md' ? '9px' : size === 'lg' ? '12px' : '15px',
            }}
            animate={{
              y: ['0%', '-60%', '0%'],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    );
  };

  // 3. 【PULSE 双重呼吸水波涟漪】模式
  const renderPulse = () => {
    return (
      <div className={`relative ${currentSize.pulse} flex items-center justify-center`}>
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: activeColor }}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: activeColor }}
          initial={{ scale: 0.2, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 0.6,
          }}
        />
      </div>
    );
  };

  // 4. 【BAR 顶部流光不确定进度线】模式
  const renderBar = () => {
    return (
      <div
        className="w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800"
        style={{
          height: size === 'sm' ? '2px' : size === 'md' ? '4px' : '6px',
          borderRadius: tokens.borders.radiusFull || '9999px',
        }}
      >
        <motion.div
          className="h-full absolute left-0 top-0 w-1/3"
          style={{
            backgroundColor: activeColor,
            borderRadius: tokens.borders.radiusFull || '9999px',
          }}
          animate={{
            left: ['-35%', '115%'],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  };

  // 5. 【SKELETON 智能骨架发光占位图】模式
  const renderSkeleton = () => {
    return (
      <div className="w-full space-y-3 p-4 border rounded-2xl bg-white" style={{ borderColor: tokens.colors.border }}>
        {/* 头像 + 双行骨架占位模组 */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ left: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-100 rounded w-1/3 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            </div>
            <div className="h-3 bg-slate-100 rounded w-2/3 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ left: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              />
            </div>
          </div>
        </div>
        {/* 段落骨架 */}
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-slate-100 rounded w-full relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ left: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>
          <div className="h-3 bg-slate-100 rounded w-[85%] relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ left: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderAnimationBody = () => {
    switch (type) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bar':
        return renderBar();
      case 'skeleton':
        return renderSkeleton();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  // 加载文本渲染器
  const renderTipText = () => {
    if (!tip) return null;
    return (
      <span
        style={{
          color: color === 'white' ? '#FFFFFF' : tokens.colors.textSecondary,
          fontFamily: tokens.typography.bodyFont === 'mono' ? tokens.typography.fontMono : tokens.typography.fontSans,
        }}
        className={`${currentSize.text} tracking-tight font-medium opacity-85 select-none text-center`}
      >
        {tip}
      </span>
    );
  };

  // 组装最终的主题展示盒子
  const renderLoadingPresenter = () => {
    const isRowLayout = tipPosition === 'right' && type !== 'bar' && type !== 'skeleton';
    return (
      <div className={`flex ${isRowLayout ? 'flex-row' : 'flex-col'} items-center ${currentSize.gap} justify-center`}>
        {renderAnimationBody()}
        {renderTipText()}
      </div>
    );
  };

  // 1. 如果没有包裹任何子节点，代表是 standalone 独立模式展示
  if (!children) {
    if (!spinning) return null;
    return (
      <div id={id} className="w-full flex justify-center py-6">
        {renderLoadingPresenter()}
      </div>
    );
  }

  // 2. 如果包裹了子节点，代表是一个局部加载包裹器
  return (
    <div id={id} className="relative inline-block w-full">
      {/* 渲染子节点 */}
      <div className={`transition-all duration-300 ${spinning ? 'pointer-events-none' : ''}`}>
        {children}
      </div>

      {/* 渐入渐出覆盖层 */}
      <AnimatePresence>
        {spinning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`absolute inset-0 flex items-center justify-center z-40 rounded-xl transition-all`}
            style={{
              backgroundColor: backdrop
                ? 'rgba(255, 255, 255, 0.45)'
                : 'rgba(255, 255, 255, 0.25)',
              backdropFilter: backdrop ? 'blur(6px)' : 'none',
              WebkitBackdropFilter: backdrop ? 'blur(6px)' : 'none',
            }}
          >
            {/* 呈现高对比度加载组件 */}
            <div className="p-4 rounded-2xl bg-white/70 shadow-lg border border-slate-100/40 backdrop-blur-md max-w-sm">
              {renderLoadingPresenter()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
