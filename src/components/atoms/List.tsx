import React from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ListProps } from '../../types/components';
import { Pagination } from './Pagination';
import { Loader2, Inbox } from 'lucide-react';
import { useState } from 'react';

function ListItemWrapper<T>({ 
  item, 
  index, 
  isLast, 
  isInteractive, 
  split, 
  tokens, 
  motionStyles, 
  paddingClass, 
  onRowClick, 
  renderItem 
}: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onRowClick?.(item, index)}
      onMouseEnter={() => isInteractive && setIsHovered(true)}
      onMouseLeave={() => isInteractive && setIsHovered(false)}
      className={`group ${isInteractive ? 'cursor-pointer' : ''}`}
      style={{
        borderBottom: split && !isLast ? `1px solid ${tokens.colors.border || '#e0e2e6'}` : 'none',
        backgroundColor: isHovered ? (tokens.colors.bgHover || 'rgba(99, 102, 241, 0.05)') : 'transparent',
        transition: `background-color ${tokens.behaviors.motionDurationFast || 150}ms ease-in-out`,
        ...motionStyles,
      }}
    >
      <div className={paddingClass}>
        {renderItem(item, index)}
      </div>
    </div>
  );
}

export const List = <T,>({
  dataSource = [],
  renderItem,
  header,
  footer,
  bordered = false,
  split = true,
  loading = false,
  size = 'md',
  emptyText = '暂无数据',
  transparent = false,
  hoverable = false,
  onRowClick,
  pagination,
  className = '',
  style,
  id,
}: ListProps<T>) => {
  const { tokens } = useDesignTokens();

  // 根据尺寸配置内边距与字体大小
  const getPaddingClass = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3.5 text-sm';
      case 'lg':
        return 'py-5 px-6 text-sm md:text-base';
      case 'md':
      default:
        return 'py-3.5 px-5 text-sm';
    }
  };

  const getCurveValue = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return 'cubic-bezier(0.34, 1.56, 0.64, 1)';
      case 'rigid':
        return 'linear';
      case 'smooth':
      default:
        return 'cubic-bezier(0.4, 0, 0.2, 1)';
    }
  };

  const motionStyles: React.CSSProperties = {
    transitionProperty: 'all',
    transitionDuration: `${tokens.behaviors.motionDurationFast}ms`,
    transitionTimingFunction: getCurveValue(),
  };

  return (
    <div
      id={id}
      className={`w-full flex flex-col ${className}`}
      style={{
        backgroundColor: transparent ? 'transparent' : (tokens.colors.bgCard || '#ffffff'),
        borderRadius: bordered ? tokens.borders.radiusMd || '12px' : '0px',
        border: bordered ? `1px solid ${tokens.colors.border || '#e0e2e6'}` : 'none',
        ...style,
      }}
    >
      {/* 1. List Header */}
      {header && (
        <div
          className={`${getPaddingClass()} font-medium border-b flex items-center justify-between shrink-0`}
          style={{
            borderColor: tokens.colors.border || '#e0e2e6',
            color: tokens.colors.textPrimary || '#181d26',
            fontSize: tokens.typography.sizeMd || '14px',
          }}
        >
          {header}
        </div>
      )}

      {/* 2. List Body / Items Container */}
      <div className="relative w-full flex-1 flex flex-col">
        {loading ? (
          /* 骨架屏 Skeleton Loader */
          <div className="w-full flex flex-col divide-y" style={{ divideColor: tokens.colors.border || '#e0e2e6' }}>
            {[1, 2, 3].map((key) => (
              <div key={key} className={`${getPaddingClass()} animate-pulse space-y-3`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0" />
                  <div className="space-y-1.5 flex-1 max-w-lg">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3" />
                    <div className="h-3 bg-slate-50 dark:bg-slate-900/40 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : dataSource.length === 0 ? (
          /* Empty Space 兜底 */
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
            <Inbox className="w-10 h-10 mb-3 stroke-[1.5]" style={{ color: tokens.colors.textWeak || 'rgba(4,14,32,0.4)' }} />
            <span
              className="text-sm"
              style={{
                color: tokens.colors.textWeak || 'rgba(4,14,32,0.6)',
                fontFamily: tokens.typography.fontSans,
              }}
            >
              {emptyText}
            </span>
          </div>
        ) : (
          /* Actual Data Rows */
          <div className="w-full flex flex-col">
            {dataSource.map((item, index) => {
              const isLast = index === dataSource.length - 1;
              const isInteractive = hoverable || !!onRowClick;

              return (
                <ListItemWrapper
                  key={index}
                  item={item}
                  index={index}
                  isLast={isLast}
                  isInteractive={isInteractive}
                  split={split}
                  tokens={tokens}
                  motionStyles={motionStyles}
                  paddingClass={getPaddingClass()}
                  onRowClick={onRowClick}
                  renderItem={renderItem}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* 3. List Footer */}
      {footer && (
        <div
          className={`${getPaddingClass()} border-t shrink-0`}
          style={{
            borderColor: tokens.colors.border || '#e0e2e6',
            color: tokens.colors.textSecondary || '#333333',
            fontSize: tokens.typography.sizeMd || '14px',
            backgroundColor: transparent ? 'transparent' : (tokens.colors.bgPage || '#f8fafc'),
          }}
        >
          {footer}
        </div>
      )}

      {/* 4. Connected Pagination Component */}
      {pagination && (
        <div
          className="py-4 px-5 border-t flex justify-center items-center shrink-0"
          style={{ borderColor: tokens.colors.border || '#e0e2e6' }}
        >
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onChange}
            size="sm"
            showFirstLast={true}
          />
        </div>
      )}
    </div>
  );
};
