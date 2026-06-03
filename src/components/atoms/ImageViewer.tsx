/**
 * ==========================================
 * 文件名称: /src/components/atoms/ImageViewer.tsx
 * 功能描述: 高保真、AI-Native 物理自适应图片预览原子组件 (ImageViewer)
 * 
 * 💡 设计体系契约于 AI 适配指南：
 * 1. Immersive Immersive Mask(沉浸式黑色遮罩)：默认使用带高斯模糊与暗色半透明度叠加的物理背景板，
 *    即便在浅色主题下，我们也保持专业级图片灯箱（Lightbox）暗色环境渲染，突出图片内容。
 * 2. 动态多品牌继承：小工具条与控制按键完全咬合 `useDesignTokens` 系统。工具条背景与边线
 *    根据当前激活的品牌（瑞士理性、代码终端等）自适应感知，并在浅色/暗色下进行精巧的光影映射。
 * 3. 物理微交互与高级拖曳 (Drag & Zoom)：
 *    - 阻尼旋转（Rotate CCW/CW）与水平镜像（Flip X）：无缝接入 `motion/react` 的旋转与缩放矩阵变形。
 *    - 动态拖拽（Drag Pan）：当图片放大比例（Scale）大于 1x 时，自动开启动态拖拽位移机制，且支持拖拽物理边界回弹（Constraints）。
 *    - 双击缩放 (Double Click)：双击图片可快速在 100% 原始比例与 250% 居中缩放比例间自适应切换。
 * 4. 便捷键盘操作网：内置 `Esc` 退出、键盘 `左/右` 方向键等高级全局按键监听器（可选开启，具备生命周期安全卸载机制）。
 * ==========================================
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ImageViewerProps } from '../../types/components';
import { Icon } from './Icon';

export const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  visible,
  onClose,
  current = 0,
  onIndexChange,
  titles,
  downloadable = true,
  enableKeyboard = true,
  enableMaskClose = true,
  rotatable = true,
  mirrorable = true,
  zoomable = true,
  id,
}) => {
  const { tokens } = useDesignTokens();

  // 1. 数据序列化处理 (兼容单图 src: string 与多图 src: string[])
  const images = useMemo<string[]>(() => {
    if (Array.isArray(src)) return src;
    return [src];
  }, [src]);

  // 标题序列化 (兼容单标题与多标题数组)
  const imageTitles = useMemo<string[]>(() => {
    if (!titles) return [];
    if (Array.isArray(titles)) return titles;
    return [titles];
  }, [titles]);

  // 2. 本地/受控状态管理
  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = onIndexChange !== undefined ? (current ?? 0) : internalIndex;

  // 图片变换参数
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // 切图转换方向 (-1: 往左切, 1: 往右切)，主要用来做 Swiper 物理滑移动画
  const [direction, setDirection] = useState(0);

  // 引用容器
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 3. 当 visible 切换或者外界传入的 current 变化时，重置所有变换参数
  useEffect(() => {
    if (visible) {
      if (current !== undefined) {
        setInternalIndex(current);
      }
      resetTransforms();
    }
  }, [visible, current]);

  // 重置图片的所有物理变换状态
  const resetTransforms = () => {
    setScale(1);
    setRotation(0);
    setFlipX(false);
    setPosition({ x: 0, y: 0 });
  };

  // 4. 图片切换控制机制
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    setDirection(-1);
    resetTransforms();
    
    const nextIdx = (activeIndex - 1 + images.length) % images.length;
    if (onIndexChange) {
      onIndexChange(nextIdx);
    } else {
      setInternalIndex(nextIdx);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    setDirection(1);
    resetTransforms();

    const nextIdx = (activeIndex + 1) % images.length;
    if (onIndexChange) {
      onIndexChange(nextIdx);
    } else {
      setInternalIndex(nextIdx);
    }
  };

  // 5. 键盘事件快捷键处理系统
  useEffect(() => {
    if (!visible || !enableKeyboard) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowUp':
          handleZoomIn();
          break;
        case 'ArrowDown':
          handleZoomOut();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, activeIndex, scale, enableKeyboard, images.length]);

  // 6. 微操调节控制杆
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 8)); // 最大放大至 8 倍
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const next = prev - 0.25;
      if (next <= 0.1) return 0.1; // 最小允许缩小至 10%
      return next;
    });
  };

  const handleRotateCW = () => {
    setRotation(prev => prev + 90);
  };

  const handleRotateCCW = () => {
    setRotation(prev => prev - 90);
  };

  const handleFlipX = () => {
    setFlipX(prev => !prev);
  };

  // 双击自动在 1x 与 2.5x 之间重置跳跃
  const handleDoubleClick = () => {
    if (scale !== 1) {
      resetTransforms();
    } else {
      setScale(2.5);
    }
  };

  // 一键下载当前预览图片物理项
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentUrl = images[activeIndex];
    if (!currentUrl) return;

    // 针对普通 HTTP 静默跳转或直接跨域下发触发 A 标签机制
    try {
      const link = document.createElement('a');
      link.href = currentUrl;
      // 提取文件名后缀作为保底
      const fileName = currentUrl.substring(currentUrl.lastIndexOf('/') + 1) || `image-${activeIndex + 1}.png`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // 跨域沙盒限制下，降级到 window.open 新页打开
      window.open(currentUrl, '_blank');
    }
  };

  // 7. 处理背景遮罩点击关闭行为
  const handleMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && enableMaskClose) {
      onClose();
    }
  };

  // 取得当前图片的展示标题文案
  const getCurrentTitle = () => {
    if (imageTitles[activeIndex]) return imageTitles[activeIndex];
    if (images.length > 1) {
      return `图片预览 (${activeIndex + 1} / ${images.length})`;
    }
    return '图片预览';
  };

  // 8. 动效时间与贝塞尔因子获取
  const duration = tokens.behaviors.motionDurationFast / 1000;
  
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return { type: 'spring', stiffness: 300, damping: 25 };
      case 'rigid':
        return { ease: 'linear', duration: duration };
      case 'smooth':
      default:
        return { ease: [0.4, 0, 0.2, 1], duration: duration };
    }
  };

  const motionTransition = getCurveValue();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id={id || "atomix-image-viewer-fixed-overlay"}
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col justify-between select-none overflow-hidden"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.95)', // 默认极具现代科技感的超暗高保真遮罩底版
            backdropFilter: 'blur(12px)',               // 轻微高斯模糊，让后台完全物理磨砂离屏
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleMaskClick}
        >
          {/* === A. 顶部挂载状态栏区 === */}
          <div className="w-full py-4.5 px-6 flex items-center justify-between z-10 pointer-events-none">
            {/* 顶置标题区 */}
            <div 
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/40 px-4 py-2 rounded-xl text-sm font-semibold tracking-wide shadow-md max-w-[65%]"
              style={{
                color: '#fff',
                fontFamily: tokens.typography.headingFont === 'mono' ? tokens.typography.fontMono : tokens.typography.fontSans,
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">{getCurrentTitle()}</span>
              </div>
            </div>

            {/* 右上角关闭控制柄 */}
            <button
              onClick={onClose}
              className="pointer-events-auto w-10 h-10 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/40 text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-150 shadow-md cursor-pointer focus:outline-none"
              title="关闭预览 (Esc)"
              id="image-viewer-top-close-btn"
            >
              <Icon name="x" size={18} variant="custom" style={{ color: 'currentColor' }} />
            </button>
          </div>

          {/* === B. 中部主图陈列舞台区 === */}
          <div className="relative flex-1 flex items-center justify-center w-full z-0 overflow-hidden">
            {/* 1. 左侧方向切图控制按键 */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-6 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/40 text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-150 z-20 shadow-lg cursor-pointer focus:outline-none"
                title="上一张 (Left Arrow)"
                id="image-viewer-prev-nav-btn"
              >
                <Icon name="chevron-left" size={20} variant="custom" style={{ color: 'currentColor' }} />
              </button>
            )}

            {/* 2. 核心大图展示框架 (包含 motion 的动画引擎) */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={`${activeIndex}-${images[activeIndex]}`}
                  className="absolute max-w-[85%] max-h-[80%] flex items-center justify-center pointer-events-auto"
                  initial={direction !== 0 ? {
                    opacity: 0,
                    x: direction * 150,
                    scale: 0.95
                  } : { opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1
                  }}
                  exit={direction !== 0 ? {
                    opacity: 0,
                    x: -direction * 150,
                    scale: 0.95
                  } : { opacity: 0, scale: 0.9 }}
                  transition={motionTransition}
                >
                  <motion.img
                    ref={imageRef}
                    src={images[activeIndex] || ''}
                    alt={getCurrentTitle()}
                    className={`max-w-full max-h-[75vh] select-none object-contain rounded-lg shadow-2xl origin-center transition-transform-none ${
                      isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'
                    }`}
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg) scaleX(${flipX ? -1 : 1})`,
                    }}
                    onDoubleClick={handleDoubleClick}
                    // 如果 scale > 1，则支持 high fidelity 拖拽 panning 交互
                    drag={scale > 1}
                    dragMomentum={true}
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. 右侧方向切图控制按键 */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-6 w-11 h-11 rounded-full bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/40 text-slate-300 hover:text-white flex items-center justify-center transition-colors duration-150 z-20 shadow-lg cursor-pointer focus:outline-none"
                title="下一张 (Right Arrow)"
                id="image-viewer-next-nav-btn"
              >
                <Icon name="chevron-right" size={20} variant="custom" style={{ color: 'currentColor' }} />
              </button>
            )}
          </div>

          {/* === C. 置底部高保真浮岛控制面板 === */}
          <div className="w-full flex justify-center pb-8 px-6 z-10 pointer-events-none">
            <motion.div
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-xl"
              style={{
                backgroundColor: tokens.colors.bgCard || 'var(--color-bg-card)',
                borderColor: tokens.colors.border || 'var(--color-border)',
                boxShadow: tokens.shadows.lg || 'var(--shadow-lg)',
              }}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {/* 【镜像翻转】 */}
              {mirrorable && (
                <button
                  onClick={handleFlipX}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] cursor-pointer focus:outline-none"
                  title="水平镜像翻转"
                  id="image-viewer-toolbar-flip"
                >
                  <Icon name="flip-x" size={17} variant="custom" style={{ color: 'currentColor' }} />
                </button>
              )}

              {/* 【顺时针旋转】 */}
              {rotatable && (
                <button
                  onClick={handleRotateCW}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] cursor-pointer focus:outline-none"
                  title="顺时针旋转 90°"
                  id="image-viewer-toolbar-rotate-cw"
                >
                  <Icon name="rotate-cw" size={17} variant="custom" style={{ color: 'currentColor' }} />
                </button>
              )}

              {/* 【逆时针旋转】 */}
              {rotatable && (
                <button
                  onClick={handleRotateCCW}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] cursor-pointer focus:outline-none"
                  title="逆时针旋转 90°"
                  id="image-viewer-toolbar-rotate-ccw"
                >
                  <Icon name="rotate-ccw" size={17} variant="custom" style={{ color: 'currentColor' }} />
                </button>
              )}

              {/* 切分中线结构 */}
              {(mirrorable || rotatable) && zoomable && (
                <span className="w-px h-5 mx-1 shrink-0 bg-[var(--color-border)] opacity-60" />
              )}

              {/* 【缩小】 */}
              {zoomable && (
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= 0.15}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
                  title="缩小"
                  id="image-viewer-toolbar-zoom-out"
                >
                  <Icon name="zoom-out" size={17} variant="custom" style={{ color: 'currentColor' }} />
                </button>
              )}

              {/* 【缩放值显示/快捷重置】 */}
              {zoomable && (
                <button
                  onClick={resetTransforms}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-colors duration-150 shrink-0 cursor-pointer focus:outline-none text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]"
                  title="双击图片或点击此键恢复 100% 原始呈现"
                  id="image-viewer-toolbar-scale-badge"
                >
                  {Math.round(scale * 100)}%
                </button>
              )}

              {/* 【放大】 */}
              {zoomable && (
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= 8}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus:outline-none"
                  title="放大"
                  id="image-viewer-toolbar-zoom-in"
                >
                  <Icon name="zoom-in" size={17} variant="custom" style={{ color: 'currentColor' }} />
                </button>
              )}

              {/* 切分中线结构二 */}
              {(mirrorable || rotatable || zoomable) && (
                <span className="w-px h-5 mx-1 shrink-0 bg-[var(--color-border)] opacity-60" />
              )}

              {/* 【自适应/重置全变换】 */}
              <button
                onClick={resetTransforms}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] cursor-pointer focus:outline-none"
                title="重置缩放、旋转与翻转偏移"
                id="image-viewer-toolbar-reset"
              >
                <Icon name="minimize-2" size={17} variant="custom" style={{ color: 'currentColor' }} />
              </button>

              {/* 【图片保存与物理下载】 */}
              {downloadable && (
                <button
                  onClick={handleDownload}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-150 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)] cursor-pointer focus:outline-none"
                  title="下载当前图片至本地"
                  id="image-viewer-toolbar-download"
                >
                  <Icon name="download" size={17} variant="custom" style={{ color: 'currentColor' }} />
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
