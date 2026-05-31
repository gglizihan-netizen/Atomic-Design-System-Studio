/**
 * ==========================================
 * 文件名称: /src/components/atoms/Pagination.tsx
 * 功能描述: 高保真、AI-Native 物理自适应分页处理器原子组件
 * 目标受众: 产品研发团队、UI 设计师
 * 
 * 💡 项目规范与设计体系契约亮点：
 * 1. 物理换肤感知：组件中涉及的所有底板、激活底板、悬浮提示等，全部通过令牌提取，适配四大主题。
 * 2. 动效融合匹配：悬停放大变色、点击果冻下凹回弹等动效周期与曲线直接耦合于行为令牌体系（motionCurve & motionDuration）。
 * 3. 极速智能折叠：完美实现超长页码极简折叠，首位锚点常驻，提升多条目索引效率。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { PaginationProps } from '../../types/components';
import { Dropdown } from './Dropdown';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  size = 'md',
  variant = 'classic',
  disabled = false,
  showFirstLast = true,
  showPageSizeChanger = false,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  className = '',
}) => {
  const { tokens } = useDesignTokens();

  // 1. 动效缓动控制高保真翻译
  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // 极致弹跳曲线
      case 'rigid':
        return 'linear';                           // 急速利落
      case 'smooth':
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';     // 经典自然呼吸
    }
  };

  const speedFast = `${tokens.behaviors.motionDurationFast}ms`;
  const bezierCurve = getCurveValue();
  const radius = tokens.borders.radiusMd || '6px';

  // 2. 尺寸令牌融合映射 (间距、字号、按键高度度)
  const sizeMap = {
    sm: {
      btnSize: '32px',
      fontSize: tokens.typography.sizeSm,
      gap: tokens.spacings.xs,
    },
    md: {
      btnSize: '38px',
      fontSize: tokens.typography.sizeBase,
      gap: tokens.spacings.sm,
    },
    lg: {
      btnSize: '44px',
      fontSize: tokens.typography.sizeLg,
      gap: tokens.spacings.md,
    },
  };

  const currentSize = sizeMap[size];

  // 3. 计算极速精简页码轨道 (标准自适应折略算法)
  const getPageNumbers = () => {
    const total = Math.max(1, totalPages);
    const active = Math.max(1, Math.min(currentPage, total));

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // 始终显示第一页
    pages.push(1);

    if (active <= 4) {
      // 靠前部分：[1, 2, 3, 4, 5, '...', total]
      pages.push(2, 3, 4, 5);
      pages.push('ellipsis-end');
      pages.push(total);
    } else if (active >= total - 3) {
      // 靠后部分：[1, '...', total-4, total-3, total-2, total-1, total]
      pages.push('ellipsis-start');
      pages.push(total - 4, total - 3, total - 2, total - 1);
      pages.push(total);
    } else {
      // 靠中部分：[1, '...', active-1, active, active+1, '...', total]
      pages.push('ellipsis-start');
      pages.push(active - 1, active, active + 1);
      pages.push('ellipsis-end');
      pages.push(total);
    }

    return pages;
  };

  const pages = getPageNumbers();

  // 4. 定制微交互状态注册器
  const [hoveredItem, setHoveredItem] = useState<string | number | null>(null);
  const [activeItem, setActiveItem] = useState<string | number | null>(null);

  // 快捷页码跳转器
  const handlePageClick = (page: number) => {
    if (disabled || page === currentPage) return;
    onPageChange(page);
  };

  // 公共功能按键样式配置
  const getButtonBaseStyles = (isCurrentActive: boolean, itemKey: string | number) => {
    const isHovered = hoveredItem === itemKey;
    const isActive = activeItem === itemKey;

    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: currentSize.btnSize,
      height: currentSize.btnSize,
      minWidth: currentSize.btnSize,
      fontSize: currentSize.fontSize,
      borderRadius: radius,
      transition: `all ${speedFast} ${bezierCurve}`,
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none' as const,
      borderWidth: '1.5px',
      borderStyle: 'solid',
      borderColor: 'transparent',
    };

    // 禁用态
    if (disabled) {
      return {
        ...base,
        backgroundColor: tokens.colors.bgDisabled,
        color: tokens.colors.textDisabled,
        borderColor: tokens.colors.borderDisabled,
      };
    }

    // 1. 主题激活页码样式
    if (isCurrentActive) {
      return {
        ...base,
        backgroundColor: tokens.colors.brand,
        borderColor: tokens.colors.brand,
        color: tokens.colors.textInverse,
        fontWeight: 'bold',
        transform: isActive ? `scale(${tokens.behaviors.buttonPressScale})` : 'scale(1)',
        boxShadow: tokens.shadows.sm,
      };
    }

    // 2. 经典线框变种 (Classic variant)
    if (variant === 'classic') {
      const isCardBg = tokens.typography.headingFont === 'serif'; // 雅致主题
      return {
        ...base,
        backgroundColor: isHovered ? tokens.colors.bgHover : (tokens.colors.bgCard || '#FFFFFF'),
        borderColor: isHovered ? tokens.colors.brand : tokens.colors.border,
        color: isHovered ? tokens.colors.brand : tokens.colors.textPrimary,
        transform: isActive ? `scale(${tokens.behaviors.buttonPressScale})` : 'scale(1)',
      };
    }

    // 3. 极速现代款：免除繁重边框线，纯色彩层级区隔 (Modern Card Backdrop variant)
    if (variant === 'modern') {
      return {
        ...base,
        backgroundColor: isHovered ? tokens.colors.bgHover : (isActive ? tokens.colors.bgActive : 'transparent'),
        borderColor: 'transparent',
        color: isHovered ? tokens.colors.brand : tokens.colors.textSecondary,
        transform: isActive ? `scale(${tokens.behaviors.buttonPressScale})` : 'scale(1)',
      };
    }

    return base;
  };

  // 极简迷你模式专属布局 (Minimal Style layout - "Page 3 of 10")
  if (variant === 'minimal') {
    const isPrevDisabled = disabled || currentPage === 1;
    const isNextDisabled = disabled || currentPage === totalPages;

    const navBtnStyle = (isDisabled: boolean, itemKey: string) => {
      const isHovered = hoveredItem === itemKey;
      return {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: currentSize.btnSize,
        height: currentSize.btnSize,
        borderRadius: radius,
        borderWidth: '1px',
        borderStyle: 'solid' as const,
        borderColor: isDisabled ? tokens.colors.borderDisabled : tokens.colors.border,
        backgroundColor: isDisabled 
          ? tokens.colors.bgDisabled 
          : (isHovered ? tokens.colors.bgHover : 'transparent'),
        color: isDisabled 
          ? tokens.colors.textDisabled 
          : (isHovered ? tokens.colors.brand : tokens.colors.textSecondary),
        transition: `all ${speedFast} ${bezierCurve}`,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      };
    };

    return (
      <div 
        className={`flex items-center gap-3 select-none ${className}`}
        style={{ color: disabled ? tokens.colors.textDisabled : tokens.colors.textPrimary }}
      >
        {/* 前进跳转 */}
        <button
          style={navBtnStyle(isPrevDisabled, 'prev')}
          onMouseEnter={() => !isPrevDisabled && setHoveredItem('prev')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => !isPrevDisabled && onPageChange(currentPage - 1)}
          disabled={isPrevDisabled}
        >
          <ChevronLeft size={16} />
        </button>

        {/* 核心中轴字型显示 */}
        <span 
          style={{ fontSize: currentSize.fontSize }}
          className="font-medium tracking-tight px-2"
        >
          {currentPage} / <span style={{ color: tokens.colors.textMuted }}>{totalPages}</span>
        </span>

        {/* 后退跳转 */}
        <button
          style={navBtnStyle(isNextDisabled, 'next')}
          onMouseEnter={() => !isNextDisabled && setHoveredItem('next')}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => !isNextDisabled && onPageChange(currentPage + 1)}
          disabled={isNextDisabled}
        >
          <ChevronRight size={16} />
        </button>

        {/* 页数尺寸改换器 */}
        {showPageSizeChanger && onPageSizeChange && (
          <div className="ml-4 w-[110px]" style={{ fontSize: '13px' }}>
            <Dropdown
              size="sm"
              options={pageSizeOptions.map(opt => ({
                label: `${opt} 条/页`,
                value: opt.toString(),
              }))}
              value={pageSize.toString()}
              onChange={(val) => onPageSizeChange(Number(val))}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    );
  }

  // 经典/现代模式的主页码列表渲染布局
  const isFirstDisabled = disabled || currentPage === 1;
  const isLastDisabled = disabled || currentPage === totalPages;

  return (
    <div className={`flex flex-wrap items-center gap-2 select-none ${className}`}>
      
      {/* 1. 快捷一键直达首页按键 */}
      {showFirstLast && (
        <button
          style={getButtonBaseStyles(false, 'first')}
          disabled={isFirstDisabled}
          onMouseEnter={() => !isFirstDisabled && setHoveredItem('first')}
          onMouseLeave={() => { setHoveredItem(null); setActiveItem(null); }}
          onMouseDown={() => !isFirstDisabled && setActiveItem('first')}
          onMouseUp={() => setActiveItem(null)}
          onClick={() => !isFirstDisabled && handlePageClick(1)}
        >
          <ChevronsLeft size={16} />
        </button>
      )}

      {/* 2. 上一页 */}
      <button
        style={getButtonBaseStyles(false, 'prev')}
        disabled={isFirstDisabled}
        onMouseEnter={() => !isFirstDisabled && setHoveredItem('prev')}
        onMouseLeave={() => { setHoveredItem(null); setActiveItem(null); }}
        onMouseDown={() => !isFirstDisabled && setActiveItem('prev')}
        onMouseUp={() => setActiveItem(null)}
        onClick={() => !isFirstDisabled && handlePageClick(currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </button>

      {/* 3. 中轴多页码循环槽 */}
      <div className="flex items-center" style={{ gap: currentSize.gap }}>
        {pages.map((p, idx) => {
          if (p === 'ellipsis-start' || p === 'ellipsis-end') {
            return (
              <span
                key={`${p}-${idx}`}
                className="inline-flex items-center justify-center font-bold tracking-widest text-slate-400 select-none pb-1"
                style={{
                  width: currentSize.btnSize,
                  height: currentSize.btnSize,
                  fontSize: currentSize.fontSize,
                }}
              >
                ...
              </span>
            );
          }

          const pageNum = p as number;
          const isAct = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              style={getButtonBaseStyles(isAct, pageNum)}
              disabled={disabled}
              onMouseEnter={() => !disabled && setHoveredItem(pageNum)}
              onMouseLeave={() => { setHoveredItem(null); setActiveItem(null); }}
              onMouseDown={() => !disabled && setActiveItem(pageNum)}
              onMouseUp={() => setActiveItem(null)}
              onClick={() => handlePageClick(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* 4. 下一页 */}
      <button
        style={getButtonBaseStyles(false, 'next')}
        disabled={isLastDisabled}
        onMouseEnter={() => !isLastDisabled && setHoveredItem('next')}
        onMouseLeave={() => { setHoveredItem(null); setActiveItem(null); }}
        onMouseDown={() => !isLastDisabled && setActiveItem('next')}
        onMouseUp={() => setActiveItem(null)}
        onClick={() => !isLastDisabled && handlePageClick(currentPage + 1)}
      >
        <ChevronRight size={16} />
      </button>

      {/* 5. 一键极其尾页跳转 */}
      {showFirstLast && (
        <button
          style={getButtonBaseStyles(false, 'last')}
          disabled={isLastDisabled}
          onMouseEnter={() => !isLastDisabled && setHoveredItem('last')}
          onMouseLeave={() => { setHoveredItem(null); setActiveItem(null); }}
          onMouseDown={() => !isLastDisabled && setActiveItem('last')}
          onMouseUp={() => setActiveItem(null)}
          onClick={() => !isLastDisabled && handlePageClick(totalPages)}
        >
          <ChevronsRight size={16} />
        </button>
      )}

      {/* 6. 每页条数自定义改选器 */}
      {showPageSizeChanger && onPageSizeChange && (
        <div className="ml-4 w-[110px]" style={{ fontSize: '13px' }}>
          <Dropdown
            size="sm"
            options={pageSizeOptions.map(opt => ({
              label: `${opt} 条/页`,
              value: opt.toString(),
            }))}
            value={pageSize.toString()}
            onChange={(val) => onPageSizeChange(Number(val))}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
