/**
 * ==========================================
 * 文件名称: /src/components/atoms/Modal.tsx
 * 功能描述: 高保真弹窗模态对话框原语组件 (支持行为令牌阻拦与动效适配)
 * 目标受众: 产品经理、UI设计师、全栈/交互体验开发。
 * 
 * 💡 特色机制：
 * 1. 滚动条锁定机制：打开弹窗时自动给浏览器背部加锁，关闭时智能解锁，防止发生讨厌的“双重滚轮穿透”。
 * 2. 行为级遮罩防退：读取 `tokens.behaviors.modalDismissOverlay`。
 *    在某些核心或者高危操作场景（如极客代码终端里的高危指令），该值为 false，
 *    这意味着用户【点击弹窗外的黑色半透明阴影区】是【绝不被允许】退出的，
 *    强迫用户深度关注并必须手动点击弹窗确认，极大降低了用户误触闪退的毁灭风险！
 * 3. 完美承载 Framer Motion 缓动：物理引擎的延迟和回弹均无缝继承当前设计方案。
 * ==========================================
 */

import React, { useEffect } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react'; // 载入动画引擎

/**
 * 🏷️ 弹窗属性说明书 (详尽中文注释)
 */
export interface ModalProps {
  isOpen: boolean;        // 模态弹框是否打开 (true/false)
  onClose: () => void;    // 关闭弹框时触发的回调通知
  title?: string;         // 弹框标题 (支持缺省，留白更显高贵)
  children: React.ReactNode; // 弹框主体承载的任意模块、页面、表单内容
  size?: 'sm' | 'md' | 'lg' | 'xl'; // 弹框宽度等级 (对应 440px / 512px / 672px / 896px)
  footer?: React.ReactNode; // 下边缘操作槽 (一般放置：[取消]、[同意]、[删除并退出])
  borderless?: boolean;    // 去离散线的现代极简风格 (默认为 true)
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  borderless = true,
}) => {
  const { tokens } = useDesignTokens();

  // 1. 实现滚动穿透防御副作用
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 2. 根据宽度等级计算 Tailwind 的宽度包围
  const sizeClass = {
    sm: 'max-w-md',   // 448px (适合简短警告、单验证码、简易提醒)
    md: 'max-w-lg',   // 512px (适合常规快捷表单、详情预览)
    lg: 'max-w-2xl',  // 672px (适合较复杂的数据面板、多列录入)
    xl: 'max-w-4xl',  // 896px (适合宽表单、长图表报表)
  }[size];

  // 3. 🚨 行为令牌策略：遮罩层点击退出的拦截计算
  const handleOverlayClick = () => {
    // 读取系统令牌的行为倾向：是否允许通过点击黑色遮罩区秒退弹窗
    if (tokens.behaviors.modalDismissOverlay) {
      onClose(); // 允许，退出
    } else {
      // 警示提醒：此配置下禁止任意空白闪退，增强核心逻辑防区！
      console.log('💡 [交互规范提示]: 当前设计系统行为规则设定为 [modalDismissOverlay: false]，点击背景遮罩区被严格拦截，无法退弹出。请用专用按钮控制退出。');
    }
  };

  // 4. 动画缓动插值适配器 (Framer Motion 贝塞尔或弹性参数，跟随行为令牌)
  const getModalAnimations = () => {
    const isSpring = tokens.behaviors.motionCurve === 'spring';
    const isRigid = tokens.behaviors.motionCurve === 'rigid';
    const duration = tokens.behaviors.motionDurationSlow / 1000; // 长动画时间

    if (isRigid) {
      return {
        initial: { opacity: 0, scale: 1, y: 0 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 1, y: 0 },
        transition: { duration: 0.05 }
      };
    }

    if (isSpring) {
      return {
        initial: { opacity: 0, scale: 0.92, y: 25 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.92, y: 25 },
        transition: { type: 'spring', damping: 20, stiffness: 260 } // 香芋糖果等高弹性回弹
      };
    }

    // 标准 smooth 缓动
    return {
      initial: { opacity: 0, scale: 0.96, y: 15 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.96, y: 15 },
      transition: { duration: duration, ease: [0.34, 1.56, 0.64, 1] }
    };
  };

  const modalAnimationConfig = getModalAnimations();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* A. 底部半透明遮罩背景层 (Backdrop Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: tokens.behaviors.motionDurationFast / 1000 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-[1.5px]"
            onClick={handleOverlayClick}
          />

          {/* B. 弹窗卡片本体容器 */}
          <motion.div
            {...modalAnimationConfig}
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg, // 卡片使用大角令牌
              boxShadow: tokens.shadows.lg,          // 高坠下垂投影
              borderColor: tokens.colors.border,
              borderWidth: '1px',
              borderStyle: 'solid',
            }}
            className={`relative w-full ${sizeClass} z-10 overflow-hidden flex flex-col max-h-[85vh]`}
          >
            {/* ①. 弹窗顶部栏 (Header) */}
            <div
              className={`flex items-center justify-between px-6 ${borderless ? 'pt-6 pb-2' : 'py-4.5 border-b'}`}
              style={borderless ? {} : { borderColor: tokens.colors.border }}
            >
              {title ? (
                <h3
                  className="text-lg token-weight-bold token-font-heading token-lh-tight"
                  style={{ color: tokens.colors.textPrimary }}
                >
                  {title}
                </h3>
              ) : (
                <div />
              )}
              
              {/* 右上角快捷 X 号按钮 */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 transition-colors duration-150 outline-none flex items-center justify-center cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                style={{ 
                  borderRadius: tokens.borders.radiusFull,
                  backgroundColor: borderless ? 'transparent' : (tokens.typography.headingFont === 'mono' ? '#1F2937' : '#E2E8F033'),
                  color: tokens.colors.textMuted
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ②. 弹窗中间滚动内容体 (Body) */}
            <div className={`flex-1 overflow-y-auto px-6 ${borderless ? 'py-3' : 'py-5.5'} scrollbar-thin`}>
              <div 
                style={{ 
                  fontSize: tokens.typography.sizeBase, 
                  color: tokens.colors.textPrimary 
                }} 
                className="token-lh-normal"
              >
                {children}
              </div>
            </div>

            {/* ③. 弹窗底部操作区域 (Footer) */}
            {footer && (
              <div
                className={`flex items-center justify-end gap-3 px-6 pb-6 ${borderless ? 'pt-2' : 'py-4 border-t'}`}
                style={borderless ? {} : { 
                  borderColor: tokens.colors.border,
                  backgroundColor: tokens.typography.headingFont === 'mono' ? '#111827' : `${tokens.colors.bgPage}66`
                }}
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
