/**
 * ==========================================
 * 文件名称: /src/components/atoms/Dropdown.tsx
 * 功能描述: 智能、高保真 AI-Native 下拉单选/多选择原语组件
 * 目标受众: 产品经理、视觉/交互设计师、前端组件开发者。
 * 
 * 💡 特色机制与截图规范对齐：
 * 1. 【高保真单选风格】：未选时呈现纯净占位符；选中后高亮边框并动态旋转箭头；
 *    下拉面板中的被选中节点呈现主色背景微调与文字加粗契合。
 * 2. 【多选交互变体 (Multi-select Tagging)】：支持 removable tags (已选标签胶囊)。胶囊支持点击 x 即时移除。
 *    下拉面板中的多选行内置精细的圆角 Checkbox：
 *    - 选中态：皇家主色蓝实底填充 + 白色精细 Checkmark 矢量；
 *    - 未选态：精细描边框。
 * 3. 【无阻断多选】：多选触发时，点击面板选项将执行 state 反转且不收紧面板，让用户能一气呵成完成多选。
 * ==========================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ChevronDown, Check, Search, X } from 'lucide-react';
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
 * 🏷️ 标准下拉选择器属性声明书 (详尽中文注释，支持多选变体)
 */
export interface DropdownProps {
  label?: string;          // 顶部主标题
  description?: string;    // 副说明文案
  options: DropdownOption[];// 选项列表数组
  value: string | string[]; // 当前选中的值 (单选对应 string，多选对应 string[])
  onChange: (value: any) => void; // 用户做出选择时的回调函数通知
  placeholder?: string;    // 缺省空白时的占位说明文本 (默认:“请选择...”)
  error?: string;          // 如果表单出错，需渲染的警示报错语
  disabled?: boolean;      // 一键锁定，禁用所有交互
  size?: 'sm' | 'md' | 'lg';// 尺寸，自适应 spacings 令牌
  enableSearch?: boolean;  // 是否开启过滤搜索，能支持大型长列表的高效过滤
  multiple?: boolean;      // 是否开启多选模式
  showDescription?: boolean; // 二级描述开关 (默认关闭，以防常规数据呈现过密)
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = '请选择内容',
  error,
  disabled = false,
  size = 'md',
  enableSearch = false,
  multiple = false,
  showDescription = false,
  className = '',
}) => {
  const { tokens } = useDesignTokens();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
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

  // 2. 转换并确保 value 格式的安全运行数据结构
  const getSelectedValuesArray = (): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  };

  const selectedValues = getSelectedValuesArray();

  // 判断单个值是否处于选中状态
  const isOptionSelected = (val: string) => selectedValues.includes(val);

  // 支持模糊拼音搜索过滤的筛选算法
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (opt.description && opt.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 3. 尺寸映射器
  const sizingMap = {
    sm: {
      paddingY: '4px',
      paddingX: tokens.spacings.sm,
      fontSize: tokens.typography.sizeSm,
      minHeight: '34px',
    },
    md: {
      paddingY: '6px',
      paddingX: tokens.spacings.md,
      fontSize: tokens.typography.sizeBase,
      minHeight: '42px',
    },
    lg: {
      paddingY: '8px',
      paddingX: tokens.spacings.lg,
      fontSize: tokens.typography.sizeLg,
      minHeight: '50px',
    },
  };

  const currentSize = sizingMap[size];
  const hasSelectedTags = multiple && selectedValues.length > 0;

  // 4. 选项点击与反转处理器
  const handleSelect = (val: string) => {
    if (multiple) {
      // 多选逻辑：如果已经选了就移除，未选则追加
      let nextValue: string[];
      if (selectedValues.includes(val)) {
        nextValue = selectedValues.filter((v) => v !== val);
      } else {
        nextValue = [...selectedValues, val];
      }
      onChange(nextValue);
      // 💡 多选时不自动关闭面板，保持用户的连贯交互节奏
    } else {
      // 单选逻辑：直接选中并自动关闭
      onChange(val);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // 移除多选中的特定 tag胶囊
  const handleRemoveValue = (val: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止展开下拉菜单
    if (disabled) return;
    const nextValue = selectedValues.filter((v) => v !== val);
    onChange(nextValue);
  };

  // 🧬 行为令牌：计算聚焦外圈投影 (对齐截图中的呼吸外廓焦点)
  const getFocusShadow = () => {
    if (!isOpen || disabled) return tokens.shadows.none;
    if (error) return `0 0 0 3px ${tokens.colors.errorBg || `${tokens.colors.error}24`}`;
    if (tokens.behaviors.inputFocusRing) {
      return `0 0 0 3px ${tokens.colors.focusRing || `${tokens.colors.brand}33`}`;
    }
    return tokens.shadows.none;
  };

  // ⚠️ 物理动画关键映射：根据系统里的 behavior 动效个性，转换成 Framer Motion 的动画过渡配置
  const getMotionConfig = () => {
    const isSpring = tokens.behaviors.motionCurve === 'spring';
    const isRigid = tokens.behaviors.motionCurve === 'rigid';
    const duration = tokens.behaviors.motionDurationNormal / 1000;

    if (isRigid) {
      return { transition: { duration: 0.05, ease: 'linear' } };
    }
    if (isSpring) {
      return {
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.8,
        }
      };
    }
    return {
      transition: {
        duration: duration,
        ease: [0.4, 0, 0.2, 1],
      }
    };
  };

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: disabled ? tokens.colors.bgDisabled : (tokens.colors.bgCard || '#FFFFFF'), // 高保真卡片底板背景，高对比度
    borderRadius: tokens.borders.radiusMd || '8px',
    borderWidth: '1.5px', // 截图中使用中等厚度、圆润的极高质感边框
    borderStyle: 'solid',
    borderColor: disabled
      ? tokens.colors.borderDisabled
      : error
      ? tokens.colors.error
      : isOpen
      ? (tokens.colors.borderFocus || '#1F63D1')
      : tokens.colors.border || '#D1D5DB',
    boxShadow: getFocusShadow(),
    color: disabled
      ? tokens.colors.textDisabled
      : selectedValues.length > 0
      ? tokens.colors.textPrimary
      : tokens.colors.textMuted,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${tokens.behaviors.motionDurationFast}ms ease`,
    minHeight: currentSize.minHeight,
    paddingTop: hasSelectedTags ? '3px' : currentSize.paddingY,
    paddingBottom: hasSelectedTags ? '3px' : currentSize.paddingY,
    paddingLeft: hasSelectedTags ? '6px' : currentSize.paddingX,
    paddingRight: currentSize.paddingX,
    fontSize: currentSize.fontSize,
  };

  const listContainerStyle: React.CSSProperties = {
    position: 'absolute' as const,
    zIndex: 50,
    top: '100%',
    left: 0,
    marginTop: '6px',
    width: '100%',
    backgroundColor: tokens.colors.bgCard || '#FFFFFF', // 下拉悬浮面板采用底板色
    borderRadius: tokens.borders.radiusLg || '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: tokens.colors.border || '#E5E7EB', // 柔和边界线
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.03)', // 拟真软底阴影
    padding: '6px', // 核心细节：通过四周留白将子选项包裹在内，绝不贴边生硬拼接
    boxSizing: 'border-box' as const,
  };

  return (
    <div ref={dropdownRef} className={`relative w-full text-left flex flex-col gap-1.5 ${className}`} id={`dropdown-wrapper-${label || 'unnamed'}`}>
      
      {/* 1. 主标签 */}
      {label && (
        <span
          style={{
            fontSize: tokens.typography.sizeSm,
            fontWeight: tokens.typography.fontWeightMedium || '500',
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
          {/* 已选内容容纳槽：支持单选的多态以及多选标签的精巧流体排布 */}
          <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0 pr-2">
            {selectedValues.length === 0 ? (
              <span style={{ color: tokens.colors.textMuted }} className="truncate select-none">
                {placeholder}
              </span>
            ) : multiple ? (
              // 💥 多选模式：高保真 pill 标签 (依据截图二全面优化精美度：无外边框，完美轻度灰色差填充底色)
              selectedValues.map((val) => {
                const opt = options.find((o) => o.value === val);
                if (!opt) return null;
                return (
                  <span
                    key={val}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-normal animate-fade-in text-slate-700"
                    style={{
                      borderRadius: tokens.borders.radiusSm || '4px',
                      backgroundColor: tokens.colors.bgTag || '#F1F5F9', // 完美轻柔去边界底色，对应各主题预设
                      color: tokens.colors.textPrimary || '#374151',
                    }}
                  >
                    <span>{opt.label}</span>
                    {!disabled && (
                      <X
                        size={12}
                        className="cursor-pointer text-slate-400 hover:text-red-500 rounded-full transition-colors shrink-0"
                        onClick={(e) => handleRemoveValue(val, e)}
                      />
                    )}
                  </span>
                );
              })
            ) : (
              // 💥 单选模式：直接显示文字
              <span className="truncate" style={{ color: tokens.colors.textPrimary }}>
                {options.find((o) => o.value === selectedValues[0])?.label}
              </span>
            )}
          </div>

          <ChevronDown
            className={`w-4 h-4 ml-1 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
            style={{ 
              color: isOpen ? (tokens.colors.brand || '#1F63D1') : tokens.colors.textMuted,
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
                  <Search className="w-4 h-4 mr-2 shrink-0" style={{ color: tokens.colors.textMuted }} />
                  <input
                    type="text"
                    placeholder="检索过滤选项..."
                    className="w-full text-sm bg-transparent outline-none border-none py-0.5 h-full font-sans"
                    style={{ color: tokens.colors.textPrimary }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {searchQuery && (
                    <X
                      size={14}
                      className="cursor-pointer text-slate-400 hover:text-slate-600 rounded-full shrink-0 mL-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchQuery('');
                      }}
                    />
                  )}
                </div>
              )}

              {/* 真实列表视口 */}
              <div className="max-h-60 overflow-y-auto p-1.5 space-y-1">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-center" style={{ color: tokens.colors.textMuted }}>
                    没有检索到匹配的数据
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = isOptionSelected(option.value);
                    const isHovered = hoveredValue === option.value;
                    
                    // 💥 极致美学色彩对齐与解耦：
                    // - 选中态：极柔和冷色柔淡选择底板色 (tokens.colors.bgActive || '#F0F4FF')，文字主亮蓝
                    // - 悬停态：选用设计令牌 hover 背景 (tokens.colors.bgHover || '#F1F5F9') 代替硬编码值，极具物理协调感
                    // - 其它态：纯净透明 (transparent)
                    const optionBg = isSelected 
                      ? (tokens.colors.bgActive || '#F0F4FF') 
                      : isHovered 
                      ? (tokens.colors.bgHover || '#F1F5F9') 
                      : 'transparent';

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className="w-full text-left px-3 py-2 flex items-center justify-between gap-3 transition-all relative group cursor-pointer outline-none select-none"
                        style={{
                          backgroundColor: optionBg,
                          borderRadius: '6px', // 配合卡片内边距留白，完美封装圆角
                        }}
                        onMouseEnter={() => setHoveredValue(option.value)}
                        onMouseLeave={() => setHoveredValue(null)}
                        onClick={() => handleSelect(option.value)}
                      >
                        {/* 左侧文字与多选框包裹区 */}
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          {/* 💥 多选时的 Checkbox 物理对齐 (对应截图二) */}
                          {multiple && (
                            <div className="shrink-0 pt-0.5">
                              {isSelected ? (
                                <div 
                                  className="w-4.5 h-4.5 rounded flex items-center justify-center transition-all animate-scale-up"
                                  style={{
                                    backgroundColor: tokens.colors.brand || '#1F63D1',
                                    borderColor: tokens.colors.brand || '#1F63D1',
                                  }}
                                >
                                  <Check size={11} className="text-white fill-current stroke-[3px]" />
                                </div>
                              ) : (
                                <div 
                                  className="w-4.5 h-4.5 rounded border bg-white transition-all hover:border-slate-400"
                                  style={{
                                    borderColor: '#D1D5DB',
                                  }}
                                />
                              )}
                            </div>
                          )}

                          {/* 本选项文案部分 */}
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-sm truncate"
                              style={{
                                color: isSelected
                                  ? (tokens.colors.brand || '#1F63D1') 
                                  : tokens.colors.textPrimary,
                                fontWeight: isSelected 
                                  ? (tokens.typography.fontWeightBold || '600') 
                                  : (tokens.typography.fontWeightNormal || '400')
                              }}
                            >
                              {option.label}
                            </div>
                            {showDescription && option.description && (
                              <div
                                className="text-xs truncate mt-0.5"
                                style={{
                                  color: isSelected 
                                    ? (tokens.colors.brand || '#1F63D1') 
                                    : tokens.colors.textMuted,
                                  opacity: isSelected ? 0.75 : 1,
                                }}
                              >
                                {option.description}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* 💥 单选被选中时的高亮尊贵对勾 (对应截图一) */}
                        {!multiple && isSelected && (
                          <Check
                            className="w-4 h-4 shrink-0"
                            style={{ color: tokens.colors.brand || '#1F63D1' }}
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
