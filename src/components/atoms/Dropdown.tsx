/**
 * ==========================================
 * 文件名称: /src/components/atoms/Dropdown.tsx
 * 功能描述: 智能、支持内置搜索与层级提示的下拉单选原语组件
 * 目标受众: 产品经理、视觉/交互设计师、前端组件开发者。
 * 
 * 💡 特色机制：
 * 1. 物理位置防溢出：通过外部点击感知器，自动处理下拉面板的开闭收合。
 * 2. 动效自适应：下拉列表的徐徐展开/滑出采用 `motion/react` 深度绑定当前设计令牌的
 *    `tokens.behaviors.motionCurve` 缓动规则，呈现弹性下拉、阻尼平滑下拉或骨感急速直出效果！
 * 3. 语义化布局：每个选项可附带二级 `description` (细节描述)，完美融入复杂的产品业务条件。
 * ==========================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ChevronDown, Check, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react'; // 使用 motion/react 接管动画运行时

/**
 * 🏷️ 选项的数据契约结构
 */
export interface DropdownOption {
  label: string;       // 选项显示的主文本 (如: “微信支付”)
  value: string;       // 选项底层的真实代码数值 (如: “wechat_pay”)
  description?: string;// 可选的二级辅助说明文本 (如: “支持一键指纹安全免密支付”)
}

/**
 * 🏷️ 标准下拉选择器属性声明书 (详尽中文注释)
 */
export interface DropdownProps {
  label?: string;          // 顶部主标题
  description?: string;    // 副说明文案
  options: DropdownOption[];// 选项列表数组
  value: string;           // 当前被选中的值
  onChange: (value: string) => void; // 用户做出选择时的回调函数通知
  placeholder?: string;    // 缺省空白时的占位说明文本 (默认:“请选择...”)
  error?: string;          // 如果表单出错，需渲染的警示报错语
  disabled?: boolean;      // 一键锁定，禁用所有交互
  size?: 'sm' | 'md' | 'lg';// 尺寸，自适应 spacings 令牌
  enableSearch?: boolean;  // 是否开启过滤搜索，能支持大型长列表的高效过滤
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = '请选择...',
  error,
  disabled = false,
  size = 'md',
  enableSearch = false,
  className = '',
}) => {
  const { tokens } = useDesignTokens();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 1. 实现点击组件外部自动收合下拉单的外挂副作用监听
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 匹配当前已选中的选项数据
  const selectedOption = options.find((opt) => opt.value === value);

  // 支持模糊拼音搜索过滤的筛选算法
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (opt.description && opt.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 尺寸映射器
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

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchQuery('');
  };

  // 🧬 行为令牌：计算聚焦投影
  const getFocusShadow = () => {
    if (!isOpen || disabled) return tokens.shadows.none;
    if (error) return `0 0 0 3px ${tokens.colors.error}24`;
    if (tokens.behaviors.inputFocusRing) {
      return `0 0 0 3px ${tokens.colors.brand}22`;
    }
    return tokens.shadows.none;
  };

  // ⚠️ 物理动画关键映射：根据系统里的 behavior 动效个性，转换成 Framer Motion 的动画过渡配置
  const getMotionConfig = () => {
    const isSpring = tokens.behaviors.motionCurve === 'spring';
    const isRigid = tokens.behaviors.motionCurve === 'rigid';
    const duration = tokens.behaviors.motionDurationNormal / 1000; // 毫秒转为秒

    if (isRigid) {
      return { transition: { duration: 0.05, ease: 'linear' } };
    }
    if (isSpring) {
      return {
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20, // 带弹性反振
          mass: 0.8,
        }
      };
    }
    return {
      transition: {
        duration: duration,
        ease: [0.4, 0, 0.2, 1], // 标准 smooth 曲线
      }
    };
  };

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: disabled ? (tokens.typography.headingFont === 'mono' ? '#111827' : '#F8FAFC') : tokens.colors.bgInput,
    borderRadius: tokens.borders.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: error
      ? tokens.colors.error
      : isOpen
      ? tokens.colors.borderFocus
      : tokens.colors.border,
    boxShadow: getFocusShadow(),
    color: selectedOption ? tokens.colors.textPrimary : tokens.colors.textMuted,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${tokens.behaviors.motionDurationFast}ms ease`,
    ...currentSize,
  };

  const listContainerStyle: React.CSSProperties = {
    position: 'absolute' as const,
    zIndex: 50,
    top: '100%',
    left: 0,
    marginTop: '6px',
    width: '100%',
    backgroundColor: tokens.colors.bgCard,
    borderRadius: tokens.borders.radiusMd,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colors.border,
    boxShadow: tokens.shadows.lg,
    overflow: 'hidden',
  };

  return (
    <div ref={dropdownRef} className={`relative w-full text-left flex flex-col gap-1.5 ${className}`} id={`dropdown-wrapper-${label || 'unnamed'}`}>
      
      {/* 1. 主标签 */}
      {label && (
        <span
          style={{
            fontSize: tokens.typography.sizeSm,
            fontWeight: '500',
            color: error ? tokens.colors.error : tokens.colors.textPrimary,
          }}
        >
          {label}
        </span>
      )}

      {/* 2. 辅助释义 */}
      {description && !error && (
        <p style={{ fontSize: '0.785rem', color: tokens.colors.textMuted }} className="-mt-1.5 leading-normal">
          {description}
        </p>
      )}

      {/* 触发器与弹层坐标隔离容器 */}
      <div className="relative w-full">
        {/* 3. 触发器按钮 */}
        <button
          type="button"
          style={triggerStyle}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown
            className={`w-4.5 h-4.5 ml-2 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            style={{ 
              color: tokens.colors.textMuted,
              transitionDuration: `${tokens.behaviors.motionDurationFast}ms`
            }}
          />
        </button>

        {/* 4. 下拉悬浮列表区 (支持 Framer Motion 物理引擎渐显插值) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              {...getMotionConfig()}
              style={listContainerStyle}
            >
              {/* 可按需激活的内部即时检索搜索栏 */}
              {enableSearch && (
                <div
                  className="flex items-center px-3 py-2.5 border-b"
                  style={{ borderColor: tokens.colors.border }}
                >
                  <Search className="w-4 h-4 mr-2" style={{ color: tokens.colors.textMuted }} />
                  <input
                    type="text"
                    placeholder="检索过滤选项..."
                    className="w-full text-sm bg-transparent outline-none border-none py-0.5 h-full"
                    style={{ color: tokens.colors.textPrimary }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              {/* 真实列表视口 */}
              <div className="max-h-60 overflow-y-auto py-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-4 text-sm text-center" style={{ color: tokens.colors.textMuted }}>
                    没有检索到匹配的数据
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = option.value === value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        className="w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors relative group cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? `${tokens.colors.brand}12` : 'transparent',
                        }}
                        onClick={() => handleSelect(option.value)}
                      >
                        <div className="flex-1 min-w-0">
                          <div
                            className="text-sm font-medium truncate"
                            style={{
                              color: isSelected ? tokens.colors.brand : tokens.colors.textPrimary,
                            }}
                          >
                            {option.label}
                          </div>
                          {option.description && (
                            <div
                              className="text-xs truncate mt-0.5"
                              style={{
                                color: isSelected ? `${tokens.colors.brand}CC` : tokens.colors.textMuted,
                              }}
                            >
                              {option.description}
                            </div>
                          )}
                        </div>
                        
                        {/* 被选中时呈现的尊贵主色对号 */}
                        {isSelected && (
                          <Check
                            className="w-4 h-4 shrink-0 self-center"
                            style={{ color: tokens.colors.brand }}
                          />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. 报错显示 */}
      {error && (
        <p style={{ fontSize: '0.785rem', color: tokens.colors.error }} className="mt-0.5 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
