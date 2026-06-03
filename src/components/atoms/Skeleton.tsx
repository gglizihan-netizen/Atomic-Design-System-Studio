/**
 * ==========================================
 * 文件名称: /src/components/atoms/Skeleton.tsx
 * 功能描述: 高保真、高性能、深度咬合设计系统令牌的智能骨架屏占位原语。
 * 
 * 🎨 设计系统与应用支持:
 * 1. 自动继承 useDesignTokens，一键自适应 4 套核心品牌主题。
 * 2. 具备 8 种高频预设形态 (Variant): circle, rect, text, image, button, card, list, complex.
 * 3. 具备 3 种高阶动效 (Animation): pulse (呼吸脉冲), wave (流光炫光行波), none (无感静态)。
 * 4. 内置智能文本最后一行缩进算法，完美拟合多行行波文字排版。
 * ==========================================
 */

import React from 'react';
import { motion } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { SkeletonProps } from '../../types/components';
import { Image } from 'lucide-react';

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'wave',
  rows = 3,
  avatar = true,
  title = true,
  active = true,
  imageLabel,
  children,
  className = '',
  style,
  id,
}) => {
  const { tokens } = useDesignTokens();

  // 1. 无感转译：如果不处于骨架加载态，且存在真实的待显示具体内容，则优雅溢出淡入渲染真孩子
  if (!active && children) {
    return (
      <motion.div
        className={className}
        style={style}
        id={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.35,
          ease: tokens.behaviors.motionCurve === 'spring' ? [0.34, 1.56, 0.64, 1] : [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    );
  }

  // 2. 自适应物理色彩，确保跟随全局令牌自愈
  const skeletonBgColor = tokens.colors.bgHover || 'rgba(15, 23, 42, 0.08)';

  // 获取通用容器的动画属性
  const pulseAnimate = animation === 'pulse' ? {
    opacity: [0.4, 0.75, 0.4]
  } : undefined;

  const pulseTransition = animation === 'pulse' ? {
    repeat: Infinity,
    duration: 1.6,
    ease: "easeInOut"
  } : undefined;

  // 流光滑块遮罩组件，用于 wave 炫光动效
  const ShimmerOverlay = () => {
    if (animation !== 'wave') return null;
    return (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent pointer-events-none"
        style={{ mixBlendMode: 'overlay' as any }}
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
      />
    );
  };

  // 基础渲染骨架块原语
  const renderItem = (itemWidth: string | number, itemHeight: string | number, extraClass: string = '', itemStyle: React.CSSProperties = {}) => {
    return (
      <motion.div
        className={`relative overflow-hidden shrink-0 ${extraClass}`}
        style={{
          width: itemWidth,
          height: itemHeight,
          backgroundColor: skeletonBgColor,
          borderRadius: variant === 'circle' ? '50%' : (tokens.borders.radiusSm || 'var(--radius-sm)'),
          ...itemStyle,
        }}
        animate={pulseAnimate}
        transition={pulseTransition}
      >
        <ShimmerOverlay />
      </motion.div>
    );
  };

  // 按照变体类型渲染具体的骨架网格
  const renderContent = () => {
    switch (variant) {
      // 头像/圆形形态
      case 'circle': {
        // 圆形直径设定：如果宽高都无，默认为 44px
        // 如果宽度是 '100%' 这种比例宽度且无具体高度约束，常为 Demo 缺省项覆盖导致。
        // 为了防止圆高由于父容器无固定高度时发生塌陷，我们精细化回退至 48px 最经典头像尺寸，并引入 aspect-square 保持绝对 1:1
        let d = width || height || 44;
        if (d === '100%' && !height) {
          d = 48;
        }
        return renderItem(d, d, 'rounded-full aspect-square', { aspectRatio: '1' });
      }

      // 纯直角/圆角矩形
      case 'rect': {
        const w = width || '100%';
        const h = height || 100;
        return renderItem(w, h, 'rounded-lg');
      }

      // 经典操作键占位
      case 'button': {
        const w = width || 90;
        const h = height || 36;
        return renderItem(w, h, 'rounded-md');
      }

      // 单行、多行文本拟合段落
      case 'text': {
        const h = height || 16;
        const textRows = Math.max(1, rows);
        return (
          <div className="flex flex-col gap-2.5 w-full">
            {Array.from({ length: textRows }).map((_, idx) => {
              // 文本最后一行通常需要做 61% 的不等宽折水，以使排版更显逼真与美学呼吸
              const isLast = idx === textRows - 1;
              const defaultW = isLast && textRows > 1 ? '61%' : '100%';
              const rowW = idx === 0 && textRows > 2 ? '94%' : defaultW;
              return (
                <div key={idx} className="flex w-full" id={`skeleton-text-row-${idx}`}>
                  {renderItem(width || rowW, h, 'rounded')}
                </div>
              );
            })}
          </div>
        );
      }

      // 带有媒体标志的图片大块占位
      case 'image': {
        const w = width || '100%';
        const h = height || 180;
        return (
          <motion.div
            className="relative overflow-hidden flex items-center justify-center border"
            style={{
              width: w,
              height: h,
              backgroundColor: skeletonBgColor,
              borderColor: tokens.colors.border || 'rgba(15, 23, 42, 0.08)',
              borderRadius: tokens.borders.radiusMd || 'var(--radius-md)',
            }}
            animate={pulseAnimate}
            transition={pulseTransition}
          >
            {/* 炫光波带 */}
            <ShimmerOverlay />
            <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 opacity-60 z-10">
              <Image className="w-8 h-8 stroke-[1.25]" />
              {imageLabel !== null && (
                <span className="text-[10px] font-mono tracking-wider select-none">
                  {imageLabel || 'MEDIA PLACEHOLDER'}
                </span>
              )}
            </div>
          </motion.div>
        );
      }

      // 卡片大板块占位
      case 'card': {
        return (
          <div
            className="p-4 border flex flex-col gap-4 w-full"
            style={{
              borderColor: tokens.colors.border || 'rgba(15, 23, 42, 0.08)',
              backgroundColor: tokens.colors.bgCard || tokens.colors.bgPage || '#ffffff',
              borderRadius: tokens.borders.radiusLg || 'var(--radius-lg)',
              boxShadow: tokens.shadows.sm || 'var(--shadow-sm)',
            }}
          >
            {/* 卡片封面图占位 */}
            {renderItem('100%', height || 130, 'rounded-lg')}
            {/* 卡片配字 */}
            <div className="space-y-2 mt-1">
              {renderItem('45%', 16, 'rounded')}
              {renderItem('85%', 12, 'rounded')}
              {renderItem('60%', 12, 'rounded')}
            </div>
          </div>
        );
      }

      // 经典多行高保真列表占位
      case 'list': {
        const listRows = Math.max(1, rows);
        const bColor = tokens.colors.border || 'rgba(15, 23, 42, 0.08)';
        return (
          <div className="flex flex-col w-full">
            {Array.from({ length: listRows }).map((_, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0 border-b last:border-0" 
                style={{ borderColor: bColor }}
                id={`skeleton-list-item-${index}`}
              >
                {avatar && renderItem(40, 40, 'rounded-full')}
                <div className="flex-1 space-y-2">
                  {title && renderItem('32%', 14, 'rounded')}
                  {renderItem('85%', 11, 'rounded')}
                </div>
              </div>
            ))}
          </div>
        );
      }

      // 包含多种形态结合的总复杂复合型场景 (侧部详情、表单页加载占位)
      case 'complex':
      default: {
        return (
          <div className="flex flex-col gap-6 w-full">
            {/* 头部信息区 */}
            <div className="flex items-center gap-4">
              {avatar && renderItem(52, 52, 'rounded-full')}
              <div className="flex-1 space-y-2.5">
                {title && renderItem('40%', 18, 'rounded')}
                {renderItem('65%', 12, 'rounded')}
              </div>
            </div>
            {/* 中间多排长线段 */}
            <div className="space-y-3 mt-2">
              {renderItem('100%', 11, 'rounded')}
              {renderItem('95%', 11, 'rounded')}
              {renderItem('98%', 11, 'rounded')}
              {renderItem('85%', 11, 'rounded')}
              {renderItem('54%', 11, 'rounded')}
            </div>
            {/* 尾部假操作按钮 */}
            <div className="flex gap-2.5 justify-end mt-4">
              {renderItem(80, 32, 'rounded-md')}
              {renderItem(80, 32, 'rounded-md')}
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={style}
      id={id || `skeleton-container-${variant}`}
    >
      {renderContent()}
    </div>
  );
};
