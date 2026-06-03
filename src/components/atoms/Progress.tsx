/**
 * ==========================================
 * 文件名称: /src/components/atoms/Progress.tsx
 * 功能描述: 高度美学重组、原生动画加持、具备多种异常作业状态的进度条原子级原语。
 * 
 * 🎨 设计系统遵从原则：
 * 1. 严格使用 useDesignTokens 统一的配色方案与动画习惯。
 * 2. 具备完美的 motion/react 物理反弹和流动缓动动画。
 * 3. 支持 striped (斑马纹) 和 animated 流体斑马/流动扫尾动效。
 * 4. 完美适应 default、success、warning、exception、active 状态体系。
 * ==========================================
 */

import React from 'react';
import { motion } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ProgressProps } from '../../types/components';

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  status = 'default',
  showInfo = true,
  infoPosition = 'right',
  label,
  description,
  striped = false,
  animated = false,
  id = 'progress-bar-wrapper',
}) => {
  const { tokens } = useDesignTokens();

  // 安全折算当前比例 (0 - 100)
  const percent = Math.max(0, Math.min(100, Math.round((value / max) * 100)));

  // 根据 tokens 选择对应的物理动效缓动类型
  const getMotionTransition = () => {
    const isSpring = tokens.behaviors.motionCurve === 'spring';
    return {
      type: isSpring ? 'spring' : 'tween',
      stiffness: isSpring ? 80 : undefined,
      damping: isSpring ? 15 : undefined,
      duration: isSpring ? undefined : Number(tokens.behaviors.motionDurationNormal) / 1000,
    };
  };

  // 根据当前状态，选择对应的核心状态配色与文字展示方案
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          fillColor: tokens.colors.success || '#10B981',
          textColor: tokens.colors.success || '#10B981',
          bgHighlight: 'rgba(16, 185, 129, 0.1)',
        };
      case 'warning':
        return {
          fillColor: tokens.colors.warning || '#F59E0B',
          textColor: tokens.colors.warning || '#F59E0B',
          bgHighlight: 'rgba(245, 158, 11, 0.1)',
        };
      case 'exception':
        return {
          fillColor: tokens.colors.error || '#EF4444',
          textColor: tokens.colors.error || '#EF4444',
          bgHighlight: 'rgba(239, 68, 68, 0.1)',
        };
      case 'active':
      case 'default':
      default:
        return {
          fillColor: tokens.colors.brand,
          textColor: tokens.colors.brand,
          bgHighlight: tokens.colors.bgActive,
        };
    }
  };

  const statusConfig = getStatusConfig();
  const transitionConfig = getMotionTransition();

  // 高度尺寸大小规格定义映射
  const sizeMap = {
    sm: {
      height: '4px',
      fontSize: '10px',
    },
    md: {
      height: '8px',
      fontSize: '12px',
    },
    lg: {
      height: '14px',
      fontSize: '11px',
    },
  };

  const currentSize = sizeMap[size];

  // 渲染占比文本
  const renderInfoText = (classes = '') => {
    if (!showInfo) return null;
    
    // 如果是 exception / success 状态，可以附带小图示字符（提高感知度）
    const suffix = status === 'exception' ? ' ⚠️' : status === 'success' ? ' ✓' : '';
    
    return (
      <span
        className={`font-mono font-bold tracking-tight select-none transition-colors duration-200 ${classes}`}
        style={{
          color: statusConfig.textColor,
          fontFamily: tokens.typography.fontMono || 'monospace',
        }}
      >
        {percent}%{suffix}
      </span>
    );
  };

  // 是否在顶部标签框并排百分比
  const isTopInfo = showInfo && infoPosition === 'top';
  // 是否在主进度条内显示百分比
  const isInsideInfo = showInfo && infoPosition === 'inside' && size === 'lg';
  // 是否在进度条右侧水平居中百分比
  const isRightInfo = showInfo && infoPosition === 'right';

  return (
    <div
      id={id}
      className="w-full space-y-1.5 font-sans"
      style={{
        fontFamily: tokens.typography.bodyFont === 'mono' ? tokens.typography.fontMono : tokens.typography.fontSans,
      }}
    >
      {/* 1. 顶置解释标签和上方说明 */}
      {(label || isTopInfo) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              className="font-medium text-xs tracking-tight transition-colors duration-200"
              style={{
                color: status === 'exception' ? tokens.colors.error : tokens.colors.textPrimary,
                fontFamily: tokens.typography.headingFont === 'serif' ? 'serif' : 'inherit',
              }}
            >
              {label}
            </label>
          )}
          {isTopInfo && renderInfoText()}
        </div>
      )}

      {/* 2. 主体进度条轨道与数值包装 */}
      <div className="flex items-center gap-3">
        {/* 物理轨道本体 */}
        <div
          className="relative flex-1 overflow-hidden transition-all duration-300"
          style={{
            backgroundColor: tokens.colors.bgInput || '#F3F4F6',
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: tokens.borders.radiusFull || '9999px',
            height: currentSize.height,
          }}
        >
          {/* 进度实体填充部分 */}
          <motion.div
            className={`relative h-full flex items-center justify-end pr-2.5 transition-colors duration-300 overflow-hidden bg-repeat-x`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={transitionConfig}
            style={{
              backgroundColor: statusConfig.fillColor,
              borderRadius: tokens.borders.radiusFull || '9999px',
            }}
          >
            {/* 斑马斜向半透明精细条纹装饰 */}
            {striped && (
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.25) 75%, transparent 75%, transparent)',
                  backgroundSize: '16px 16px',
                }}
              />
            )}

            {/* 斑马条纹自发水平无限向右滚动动力流 */}
            {striped && animated && (
              <motion.div
                className="absolute inset-0 opacity-35 pointer-events-none"
                style={{
                  backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.25) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.25) 75%, transparent 75%, transparent)',
                  backgroundSize: '16px 16px',
                }}
                animate={{ backgroundPositionX: ['0px', '32px'] }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: 1.2,
                }}
              />
            )}

            {/* 如果是 status='active' (作业活动中)，不论 striped 与否，都加持一个高亮扫尾流光叠加物，增加高级科技感 */}
            {status === 'active' && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
                }}
                initial={{ transform: 'translateX(-100%)' }}
                animate={{ transform: 'translateX(100%)' }}
                transition={{
                  repeat: Infinity,
                  ease: 'easeInOut',
                  duration: 1.8,
                }}
              />
            )}

            {/* 极简内嵌百分比数字表现 (必须是大条 LG 才会触发) */}
            {isInsideInfo && (
              <span
                className="text-[9px] font-mono font-bold leading-none select-none z-10 scale-90 whitespace-nowrap transition-all duration-300"
                style={{
                  color: tokens.colors.textInverse || '#FFFFFF',
                  fontFamily: tokens.typography.fontMono || 'monospace',
                  // 当进度极小时，防止文字被裁剪，保持最小可见度或略微偏置
                  opacity: percent < 12 ? 0 : 1,
                }}
              >
                {percent}%
              </span>
            )}
          </motion.div>
        </div>

        {/* 右置水平百分比字样 */}
        {isRightInfo && (
          <div className="flex-shrink-0 min-w-[42px] text-right">
            {renderInfoText(`text-[11px]`)}
          </div>
        )}
      </div>

      {/* 3. 置底辅助说明提示 */}
      {description && (
        <p
          className="text-[10px] leading-relaxed transition-colors duration-200"
          style={{ color: tokens.colors.textMuted || '#9CA3AF' }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
