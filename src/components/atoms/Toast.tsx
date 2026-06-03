/**
 * ==========================================
 * 文件名称: /src/components/atoms/Toast.tsx
 * 功能描述: 高保真、微交互动效与高设计令牌感知的全局浮动提示（Toast）原子原语。
 * 
 * 🎮 交互与物理特点:
 * 1. 采用 React Context 与 Hook 合体架构，调用极为极简（例如 `toast.success("同步成功")`）。
 * 2. 内建 6 大经典坐标悬挂浮点，支持 Spring 簧力物理动能过渡以及自上而下顺滑堆叠。
 * 3. 完美结合毛玻璃镜面质感，提供柔和阴影，即使在暗色背景下也能精准透亮不显沉重。
 * ==========================================
 */

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ToastItem, ToastProps } from '../../types/components';
import { CheckCircle2, AlertTriangle, XCircle, Info, Loader2, X } from 'lucide-react';

// ==========================================
// 1. Context 核心声明
// ==========================================
export interface ToastOptions extends Omit<ToastItem, 'id' | 'message'> {}

interface ToastContextType {
  show: (message: string, options?: ToastOptions) => string;
  success: (message: string, options?: ToastOptions) => string;
  error: (message: string, options?: ToastOptions) => string;
  warning: (message: string, options?: ToastOptions) => string;
  info: (message: string, options?: ToastOptions) => string;
  loading: (message: string, options?: ToastOptions) => string;
  close: (id: string) => void;
  closeAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ==========================================
// 2. Presenter & Item 视图呈现元
// ==========================================
export const Toast: React.FC<ToastProps> = ({
  items,
  onRemove,
  position = 'top-center',
  id = 'global-toast-container',
}) => {
  const { tokens } = useDesignTokens();

  // 根据属性定位转换为 css 位置 class
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-5 left-5 items-start';
      case 'top-right':
        return 'top-5 right-5 items-end';
      case 'bottom-left':
        return 'bottom-5 left-5 items-start';
      case 'bottom-right':
        return 'bottom-5 right-5 items-end';
      case 'bottom-center':
        return 'bottom-5 left-1/2 -translate-x-1/2 items-center';
      case 'top-center':
      default:
        return 'top-5 left-1/2 -translate-x-1/2 items-center';
    }
  };

  return (
    <div
      id={id}
      className={`fixed z-9999 flex flex-col gap-2.5 pointer-events-none max-w-[92vw] sm:max-w-md ${getPositionClasses()}`}
    >
      <AnimatePresence>
        {items.map((item) => {
          // 每个 Toast 类型的视觉基调匹配
          const getStatusConfig = () => {
            switch (item.type) {
              case 'success':
                return {
                  textColor: tokens.colors.success,
                  icon: CheckCircle2,
                };
              case 'warning':
                return {
                  textColor: tokens.colors.warning,
                  icon: AlertTriangle,
                };
              case 'error':
                return {
                  textColor: tokens.colors.error,
                  icon: XCircle,
                };
              case 'loading':
                return {
                  textColor: tokens.colors.brand,
                  icon: Loader2,
                  spinning: true,
                };
              case 'info':
              default:
                return {
                  textColor: tokens.colors.brand,
                  icon: Info,
                };
            }
          };

          const s = getStatusConfig();
          const IconComp = s.icon;

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: position.startsWith('top') ? -24 : 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: position.startsWith('top') ? -16 : 16 }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 28,
              }}
              className={`flex items-start gap-3 p-4 pointer-events-auto w-[320px] sm:w-[350px] transition-shadow`}
              style={{
                borderRadius: tokens.borders.radiusMd || '12px',
                backgroundColor: tokens.colors.bgCard,
                boxShadow: tokens.shadows.lg,
              }}
            >
              {/* 左侧状态标志 */}
              <div className="shrink-0 pt-0.5" style={{ color: s.textColor }}>
                <IconComp
                  className={`w-4.5 h-4.5 ${s.spinning ? 'animate-spin' : ''}`}
                  strokeWidth={2}
                />
              </div>

              {/* 信息字段 */}
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-xs font-semibold leading-relaxed tracking-tight" style={{ color: tokens.colors.textPrimary }}>
                  {item.message}
                </p>
                {item.description && (
                  <p className="text-[10px] leading-relaxed mt-0.5 font-medium" style={{ color: tokens.colors.textSecondary }}>
                    {item.description}
                  </p>
                )}
              </div>

              {/* 手动关闭 */}
              {item.closable !== false && (
                <button
                  onClick={() => onRemove(item.id)}
                  className="shrink-0 transition-colors cursor-pointer p-0.5 rounded opacity-70 hover:opacity-100"
                  style={{ color: tokens.colors.textMuted }}
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2.2} />
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 3. Provider 高维供应组件
// ==========================================
export const ToastProvider: React.FC<React.PropsWithChildren<{
  defaultPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}>> = ({ children, defaultPosition = 'top-center' }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [position, setPosition] = useState(defaultPosition);

  // 定时器缓存 Map，方便清理
  const timersRef = useRef<Record<string, any>>({});

  const close = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timersRef.current[id]) {
      window.clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
  }, []);

  const closeAll = useCallback(() => {
    setToasts([]);
    Object.values(timersRef.current).forEach((timer) => window.clearTimeout(timer as any));
    timersRef.current = {};
  }, []);

  const show = useCallback(
    (message: string, options?: ToastOptions) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const duration = options?.duration !== undefined ? options.duration : 3000;
      const closable = options?.closable !== undefined ? options.closable : true;

      const newToast: ToastItem = {
        id,
        message,
        closable,
        ...options,
      };

      setToasts((prev) => {
        // 限制最多承载 5 个同时显示，防止视觉刷屏
        if (prev.length >= 5) {
          const removedId = prev[0].id;
          if (timersRef.current[removedId]) {
            window.clearTimeout(timersRef.current[removedId]);
            delete timersRef.current[removedId];
          }
          return [...prev.slice(1), newToast];
        }
        return [...prev, newToast];
      });

      // 只要 duration 大于 0，就自动清理
      if (duration > 0) {
        const timer = window.setTimeout(() => {
          close(id);
        }, duration);
        timersRef.current[id] = timer;
      }

      return id;
    },
    [close]
  );

  const success = useCallback((msg: string, opt?: ToastOptions) => show(msg, { ...opt, type: 'success' }), [show]);
  const error = useCallback((msg: string, opt?: ToastOptions) => show(msg, { ...opt, type: 'error' }), [show]);
  const warning = useCallback((msg: string, opt?: ToastOptions) => show(msg, { ...opt, type: 'warning' }), [show]);
  const info = useCallback((msg: string, opt?: ToastOptions) => show(msg, { ...opt, type: 'info' }), [show]);
  const loading = useCallback((msg: string, opt?: ToastOptions) => show(msg, { ...opt, type: 'loading', duration: 0 }), [show]);

  return (
    <ToastContext.Provider value={{ show, success, error, warning, info, loading, close, closeAll }}>
      {children}
      {/* 挂载全局 Toast 视觉容器面 */}
      <Toast items={toasts} onRemove={close} position={position} />
    </ToastContext.Provider>
  );
};

// ==========================================
// 4. Hook 智能轻触工具
// ==========================================
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider. Please wrap your root App rendering block in <ToastProvider>.');
  }
  return context;
};
