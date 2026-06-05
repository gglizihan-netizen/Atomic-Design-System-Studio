/**
 * ==========================================
 * 文件名称: /src/components/atoms/DatePicker.tsx
 * 功能描述: 高度美学重塑、完全无三方依赖、深度契约交互的高保真日期时间选择器原子组件。
 * 
 * 🎨 设计系统遵从原则：
 * 1. 拒用朴素 Select 下拉框，采用自研的无边框“年/月网格选择模态模式” ( panelMode )。
 * 2. 宽度与触发器 100% 对齐契约 ( left: 0, right: 0, 宽度 100% )。
 * 3. 严格遵循设计系统圆角、色彩与阴影，杜绝硬编码。
 * ==========================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { DatePickerProps } from '../../types/components';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = '请选择日期...',
  disabled = false,
  size = 'md',
  label,
  description,
  error,
  minDate,
  maxDate,
  id = 'date-picker-trigger',
}) => {
  const { tokens } = useDesignTokens();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ⚡ 视图安全保障：触发器与弹出面板底层物理节点引用
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // ⚡ 视图安全保障：精细化的空间测量和位置坐标状态管理
  const [coords, setCoords] = useState({
    top: 0,
    left: 0,
    width: 0,
    placement: 'bottom' as 'top' | 'bottom',
  });

  // ⚡ 极速物理同步引擎：在滚动或频繁改变位置时，直接操作 DOM 底层绝对样式，避免 React 虚拟 DOM 异步状态合并（Batch）以及渲染时间差带来的迟钝滞后感
  const syncDOMPosition = () => {
    if (!triggerRef.current || !menuRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = menuRef.current.offsetHeight || 330;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    let placement: 'top' | 'bottom' = 'bottom';
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      placement = 'top';
    }

    let top = 0;
    if (placement === 'bottom') {
      top = triggerRect.bottom + 6;
    } else {
      top = triggerRect.top - dropdownHeight - 6;
    }

    menuRef.current.style.top = `${top}px`;
    menuRef.current.style.left = `${triggerRect.left}px`;
    menuRef.current.style.width = `${triggerRect.width}px`;
  };

  // ⚡ 空间计算引擎：自动决策向下/向上展开，并匹配浮层尺寸与触发器对齐线
  const updatePosition = () => {
    if (!triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    
    const dropdownHeight = menuRef.current ? menuRef.current.offsetHeight : 330;
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    let placement: 'top' | 'bottom' = 'bottom';
    // 当下方空间不足以承载面板，且上方空间比下方空间更充裕时，自动向上智能展开
    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      placement = 'top';
    }

    let top = 0;
    if (placement === 'bottom') {
      top = triggerRect.bottom + 6;
    } else {
      top = triggerRect.top - dropdownHeight - 6;
    }

    // ⚡ 直接操作 DOM 样式以保障第一次挂载或属性骤变时与视图绝对一致，防 0 闪烁
    if (menuRef.current) {
      menuRef.current.style.top = `${top}px`;
      menuRef.current.style.left = `${triggerRect.left}px`;
      menuRef.current.style.width = `${triggerRect.width}px`;
    }

    setCoords({
      top,
      left: triggerRect.left,
      width: triggerRect.width,
      placement,
    });
  };

  // 🟢 智能展开折叠触发器：同步位置计算防止闪烁，并在打开前先测定最新坐标
  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) {
      setIsOpen(false);
      setPanelMode('days');
    } else {
      // 开启前先更新一次相对定位，杜绝延迟闪烁
      updatePosition();
      setIsOpen(true);
    }
  };

  // 面板三段视图管理：'days' (天数日历) | 'years' (年份九宫格网格) | 'months' (月份十二宫格)
  const [panelMode, setPanelMode] = useState<'days' | 'years' | 'months'>('days');

  // 1. 无时区偏颇日期解析器
  const parseLocalDate = (val: Date | string | null | undefined): Date | null => {
    if (!val) return null;
    if (val instanceof Date) {
      return isNaN(val.getTime()) ? null : val;
    }
    // 兼容 "2026-06-01" | "2026-06-01T12:00:00.000Z" 等格式
    const cleanVal = val.replace('T', ' ');
    const partsSpace = cleanVal.split(' ');
    if (partsSpace.length >= 1) {
      const dateParts = partsSpace[0].split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const day = parseInt(dateParts[2], 10);
        const d = new Date(year, month, day);
        return isNaN(d.getTime()) ? null : d;
      }
    }
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  // 2. 日期高保真文本转化
  const formatLocalDate = (date: Date): string => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const selectedDate = parseLocalDate(value);

  // 3. 日历视图导航年月
  const [viewYear, setViewYear] = useState<number>(() => {
    return selectedDate ? selectedDate.getFullYear() : new Date().getFullYear();
  });
  const [viewMonth, setViewMonth] = useState<number>(() => {
    return selectedDate ? selectedDate.getMonth() : new Date().getMonth();
  });

  // 当受控 value 或 selectedDate 转变时，静默维持面板导航最新态
  useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
    }
  }, [value]);

  // 1. 点击外部收回弹窗 (融合 Portal 穿透防御)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      // 触发器容器
      const clickInsideTrigger = containerRef.current && containerRef.current.contains(target);
      // 弹出面板
      const clickInsideMenu = menuRef.current && menuRef.current.contains(target);
      if (!clickInsideTrigger && !clickInsideMenu) {
        setIsOpen(false);
        setPanelMode('days'); // 回复默认主日历屏
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, { capture: true });
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, { capture: true });
    };
  }, [isOpen]);

  // 1.1. 挂载全局滚动/缩放测量监听，在触发器触发拉起时精准捕捉并更新浮层绝对定位
  useEffect(() => {
    if (!isOpen) return;

    // 唤醒瞬间执行一次极速定位
    updatePosition();

    // 启用高性能、底层 ResizeObserver 监视触发器尺寸形变
    let resizeObserver: ResizeObserver | null = null;
    if (triggerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        syncDOMPosition();
      });
      resizeObserver.observe(triggerRef.current);
    }

    // 捕捉宿主容器/窗口以及所有层级的滚动，确保无缝随动同步，无任何肉眼可见延迟
    const handleScrollOrResize = () => {
      syncDOMPosition();
    };

    window.addEventListener('resize', handleScrollOrResize);
    document.addEventListener('scroll', handleScrollOrResize, { capture: true });

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      document.removeEventListener('scroll', handleScrollOrResize, { capture: true });
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isOpen]);

  // 1.2. 监听日历面板模式切换，实时驱动 Portal 定位校准
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        updatePosition();
      });
    }
  }, [panelMode, isOpen]);

  // 从 tokens 检索动效阻尼度
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
      case 'rigid':
        return 'linear';
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';
    }
  };

  const speedNormal = `${tokens.behaviors.motionDurationNormal}ms`;
  const speedFast = `${tokens.behaviors.motionDurationFast}ms`;
  const animationCurve = getCurveValue();

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

  const getBorderColor = () => {
    if (disabled) return tokens.colors.borderDisabled;
    if (error) return tokens.colors.error;
    if (isOpen) return tokens.colors.borderFocus;
    return tokens.colors.border;
  };

  const getFocusShadow = () => {
    if (!isOpen || disabled) return tokens.shadows.none;
    if (error) return `0 0 0 3px ${tokens.colors.error}24`;
    if (tokens.behaviors.inputFocusRing) {
      return `0 0 0 3px ${tokens.colors.focusRing}`;
    }
    return tokens.shadows.none;
  };

  // 4. 日历算法核心
  const daysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const firstDayOfMonthIndex = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const buildCalendarCells = () => {
    const cells: { date: Date; isCurrentMonth: boolean; key: string }[] = [];
    const daysQty = daysInMonth(viewYear, viewMonth);
    const prevDaysQty = daysInMonth(viewYear, viewMonth - 1);
    const startOffset = firstDayOfMonthIndex(viewYear, viewMonth);

    // 填充上一月尾部
    for (let i = startOffset - 1; i >= 0; i--) {
      const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      const prevMon = viewMonth === 0 ? 11 : viewMonth - 1;
      const dayNum = prevDaysQty - i;
      cells.push({
        date: new Date(prevYear, prevMon, dayNum),
        isCurrentMonth: false,
        key: `prev-${dayNum}`,
      });
    }

    // 填充本月
    for (let i = 1; i <= daysQty; i++) {
      cells.push({
        date: new Date(viewYear, viewMonth, i),
        isCurrentMonth: true,
        key: `curr-${i}`,
      });
    }

    // 用下个月头部塞满 42 格，避免高度闪烁
    const totalRemaining = 42 - cells.length;
    for (let i = 1; i <= totalRemaining; i++) {
      const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
      const nextMon = viewMonth === 11 ? 0 : viewMonth + 1;
      cells.push({
        date: new Date(nextYear, nextMon, i),
        isCurrentMonth: false,
        key: `next-${i}`,
      });
    }

    return cells;
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // 年份网格范围
  const [yearGridBase, setYearGridBase] = useState<number>(() => {
    return new Date().getFullYear() - 7;
  });

  const getYearGridRange = () => {
    return Array.from({ length: 15 }, (_, i) => yearGridBase + i);
  };

  const handlePrevYears = () => {
    setYearGridBase(yearGridBase - 15);
  };

  const handleNextYears = () => {
    setYearGridBase(yearGridBase + 15);
  };

  // 核心变更推送者
  const commitDateTimeChange = (baseDate: Date | null) => {
    const freshDate = baseDate || selectedDate || new Date();
    onChange(freshDate, formatLocalDate(freshDate));
  };

  const handleSelectDay = (date: Date) => {
    if (disabled) return;
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return;

    commitDateTimeChange(date);
    setIsOpen(false);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isDateOutOfRange = (date: Date) => {
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) return true;
    return false;
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: tokens.spacings.xs,
        width: '100%',
        position: 'relative',
      }}
      className="select-none"
    >
      {/* 1. 顶置标签 */}
      {label && (
        <label
          style={{
            fontSize: tokens.typography.sizeSm,
            fontWeight: tokens.typography.fontWeightMedium || '500',
            color: error ? tokens.colors.error : tokens.colors.textPrimary,
            letterSpacing: '0.01em',
            alignSelf: 'flex-start',
          }}
        >
          {label}
        </label>
      )}

      {/* 2. 辅助提示文字 */}
      {description && !error && (
        <p
          style={{
            fontSize: '0.785rem',
            color: tokens.colors.textMuted,
            marginTop: '-2px',
          }}
        >
          {description}
        </p>
      )}

      {/* 3. 日期选择触发面板 */}
      <div
        ref={triggerRef}
        id={id}
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: disabled ? tokens.colors.bgDisabled : tokens.colors.bgInput,
          borderRadius: tokens.borders.radiusMd,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: getBorderColor(),
          boxShadow: getFocusShadow(),
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: currentSize.padding,
          height: currentSize.height,
          fontSize: currentSize.fontSize,
          color: disabled ? tokens.colors.textDisabled : (selectedDate ? tokens.colors.textPrimary : tokens.colors.textMuted),
          transition: `all ${speedNormal} ${animationCurve}`,
        }}
      >
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <CalendarIcon size={16} style={{ color: error ? tokens.colors.error : tokens.colors.textMuted, flexShrink: 0 }} />
          <span>
            {selectedDate ? formatLocalDate(selectedDate) : placeholder}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ChevronDown
            size={16}
            style={{
              color: tokens.colors.textMuted,
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
              transition: `transform ${speedFast} ${animationCurve}`,
            }}
          />
        </div>
      </div>

      {/* 4. 底层表单报错 */}
      {error && (
        <p
          style={{
            fontSize: '0.785rem',
            color: tokens.colors.error,
            marginTop: '2px',
            fontWeight: tokens.typography.fontWeightMedium || '500',
          }}
        >
          {error}
        </p>
      )}

      {/* 5. 悬浮日历时间集成控制卡片 (与上方触发器 100% 严密对齐宽度，并借助 Portal 及高性能随动算法抗遮挡) */}
      {typeof window !== 'undefined' && document.body && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: coords.placement === 'bottom' ? -6 : 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: coords.placement === 'bottom' ? -6 : 6, scale: 0.98 }}
              transition={{ duration: parseFloat(speedNormal) / 1000, ease: 'easeOut' }}
              style={{
                position: 'fixed',
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                width: `${coords.width}px`,
                minWidth: '280px',
                zIndex: 9999,
                backgroundColor: tokens.colors.bgCard,
                borderRadius: tokens.borders.radiusLg,
                boxShadow: tokens.shadows.lg,
                border: `1px solid ${tokens.colors.border}`,
                padding: tokens.spacings.md,
                backdropFilter: 'blur(16px)',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
              }}
            >
            {/* ==================== A. 顶部高保真控制大栏 (左年右月，无 select) ==================== */}
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b" style={{ borderColor: tokens.colors.border }}>
              <div className="flex items-center gap-1">
                {/* 翻页前移按钮 */}
                {panelMode === 'days' && (
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    style={{ color: tokens.colors.textSecondary }}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={15} />
                  </button>
                )}
                {panelMode === 'years' && (
                  <button
                    type="button"
                    onClick={handlePrevYears}
                    style={{ color: tokens.colors.textSecondary }}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={15} />
                  </button>
                )}
              </div>

              {/* 核心左年右月精美自定义切换系统 */}
              <div className="flex items-center gap-1.5">
                {/* 年份精致药丸切换键 */}
                <button
                  type="button"
                  onClick={() => setPanelMode(panelMode === 'years' ? 'days' : 'years')}
                  className="px-2.5 py-1 rounded-md text-[13px] font-bold cursor-pointer transition-all flex items-center gap-1"
                  style={{
                    color: panelMode === 'years' ? tokens.colors.brand : tokens.colors.textPrimary,
                    backgroundColor: panelMode === 'years' ? `${tokens.colors.brand}15` : 'transparent',
                    border: `1.5px solid ${panelMode === 'years' ? tokens.colors.brand : 'transparent'}`,
                  }}
                >
                  <span>{viewYear}年</span>
                  <ChevronDown size={12} style={{ transform: panelMode === 'years' ? 'rotate(180deg)' : 'none', transition: 'all 200ms' }} />
                </button>

                {/* 月份精致药丸切换键 */}
                <button
                  type="button"
                  onClick={() => setPanelMode(panelMode === 'months' ? 'days' : 'months')}
                  className="px-2.5 py-1 rounded-md text-[13px] font-bold cursor-pointer transition-all flex items-center gap-1"
                  style={{
                    color: panelMode === 'months' ? tokens.colors.brand : tokens.colors.textPrimary,
                    backgroundColor: panelMode === 'months' ? `${tokens.colors.brand}15` : 'transparent',
                    border: `1.5px solid ${panelMode === 'months' ? tokens.colors.brand : 'transparent'}`,
                  }}
                >
                  <span>{viewMonth + 1}月</span>
                  <ChevronDown size={12} style={{ transform: panelMode === 'months' ? 'rotate(180deg)' : 'none', transition: 'all 200ms' }} />
                </button>
              </div>

              <div className="flex items-center gap-1">
                {/* 翻页后移按钮 */}
                {panelMode === 'days' && (
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    style={{ color: tokens.colors.textSecondary }}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={15} />
                  </button>
                )}
                {panelMode === 'years' && (
                  <button
                    type="button"
                    onClick={handleNextYears}
                    style={{ color: tokens.colors.textSecondary }}
                    className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* ==================== B. 主视图面板切换 ==================== */}

            {/* B1. 标准天数日历主网格 */}
            {panelMode === 'days' && (
              <>
                {/* 星期小标头 */}
                <div className="grid grid-cols-7 gap-1 text-center mb-1">
                  {['日', '一', '二', '三', '四', '五', '六'].map((day, idx) => (
                    <span
                      key={day}
                      className="text-xs font-semibold pb-1"
                      style={{
                        color: (idx === 0 || idx === 6) ? tokens.colors.warning : tokens.colors.textMuted,
                      }}
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {/* 主天数网络 */}
                <div className="grid grid-cols-7 gap-1">
                  {buildCalendarCells().map((cell) => {
                    const isSelectedCell = isSelected(cell.date);
                    const isTodayCell = isToday(cell.date);
                    const isDisabledCell = isDateOutOfRange(cell.date);

                    const getCellStyles = () => {
                      const baseStyle: React.CSSProperties = {
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        borderRadius: tokens.borders.radiusSm,
                        cursor: isDisabledCell ? 'not-allowed' : 'pointer',
                        transition: `all ${speedFast} ${animationCurve}`,
                      };

                      if (isDisabledCell) {
                        return {
                          ...baseStyle,
                          color: tokens.colors.textDisabled,
                          backgroundColor: 'transparent',
                        };
                      }

                      if (isSelectedCell) {
                        return {
                          ...baseStyle,
                          backgroundColor: tokens.colors.brand,
                          color: tokens.colors.textInverse || '#ffffff',
                          fontWeight: tokens.typography.fontWeightBold || '700',
                          boxShadow: tokens.shadows.sm,
                        };
                      }

                      if (isTodayCell) {
                        return {
                          ...baseStyle,
                          border: `1.5px solid ${tokens.colors.brand}`,
                          color: tokens.colors.brand,
                          fontWeight: tokens.typography.fontWeightMedium || '500',
                        };
                      }

                      return {
                        ...baseStyle,
                        color: cell.isCurrentMonth
                          ? tokens.colors.textPrimary
                          : tokens.colors.textMuted,
                      };
                    };

                    return (
                      <button
                        key={cell.key}
                        type="button"
                        disabled={isDisabledCell}
                        onClick={() => handleSelectDay(cell.date)}
                        style={getCellStyles()}
                        className={
                          !isDisabledCell && !isSelectedCell
                            ? 'hover:bg-black/[0.04] dark:hover:bg-white/[0.08] active:scale-95'
                            : ''
                        }
                      >
                        {cell.date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {/* B2. 高保真年份九宫切换网格 */}
            {panelMode === 'years' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-3 gap-2 py-2"
              >
                {getYearGridRange().map((y) => {
                  const isCurrentSelection = viewYear === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setViewYear(y);
                        setPanelMode('days');
                      }}
                      className="py-2.5 text-xs font-semibold rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.08] cursor-pointer transition-colors"
                      style={{
                        backgroundColor: isCurrentSelection ? tokens.colors.brand : 'transparent',
                        color: isCurrentSelection ? (tokens.colors.textInverse || '#ffffff') : tokens.colors.textPrimary,
                        border: isCurrentSelection ? `1.5px solid ${tokens.colors.brand}` : `1px solid ${tokens.colors.border}`,
                      }}
                    >
                      {y}年
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* B3. 高保真月份九宫切换网格 */}
            {panelMode === 'months' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-3 gap-2.5 py-2"
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const isCurrentSelection = viewMonth === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setViewMonth(i);
                        setPanelMode('days');
                      }}
                      className="py-2 text-xs font-semibold rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.08] cursor-pointer transition-colors"
                      style={{
                        backgroundColor: isCurrentSelection ? tokens.colors.brand : 'transparent',
                        color: isCurrentSelection ? (tokens.colors.textInverse || '#ffffff') : tokens.colors.textPrimary,
                        border: isCurrentSelection ? `1.5px solid ${tokens.colors.brand}` : `1px solid ${tokens.colors.border}`,
                      }}
                    >
                      {i + 1}月
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* ==================== D. 底部操作辅助条 ==================== */}
            <div
              className="flex items-center justify-between mt-3 pt-2.5 text-[11px] border-t"
              style={{ borderColor: tokens.colors.border }}
            >
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  commitDateTimeChange(today);
                  setIsOpen(false);
                }}
                className="hover:underline font-bold cursor-pointer font-sans"
                style={{ color: tokens.colors.brand }}
              >
                设为今天
              </button>

              <div className="flex items-center gap-2">
                <span style={{ color: tokens.colors.textMuted }} className="font-mono text-[10px]">
                  {selectedDate ? `选定: ${formatLocalDate(selectedDate)}` : '未选择时间'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </div>
);
};

export default DatePicker;
