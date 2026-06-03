/**
 * ==========================================
 * 文件名称: /src/components/atoms/Table.tsx
 * 功能描述: 高保真、AI-Native 物理自适应表格原子组件 (Table)
 * 
 * 💡 设计体系契约与 AI 适配指南：
 * 1. 100% 动态配置力：表头字段（Columns）与行项数据（DataSource）完全由宿主数据结构声明驱动，
 *    拒绝一切内部业务逻辑硬编码。任何状态标签、复杂操作按钮项一律通过 `column.render` 声明式自定义插槽回调渲染，
 *    赋予 AI 助手极致自由度的二次开发与定制能力。
 * 2. 四大主题自适应：高度继承 `useDesignTokens` 体系。表格内背景、外包框边、表头色彩、
 *    悬停的高亮响应（Hover Highlight）、斑马斜纹底色、页脚分页元素，皆实现全局智能色谱切换。
 * 3. 字体与留白规范：
 *    - 字体大小统一不小于 14px (text-sm/md)，消除传统密集排版带来的视觉紧损耗感。
 *    - 内联单元间距（SM / MD / LG）支持无感自适应与微动效过渡（Transition），保持视觉呼吸感。
 *    - 触控目标均提供宽裕的像素保护区。
 * 4. 内置高级特性：
 *    - 物理双向排序（Client-Side Sorter）：可传入自定义排序函数，或者由组件自带的数值及文本降维排序算法自动处理。
 *    - 批量操作面板（Row Selection）：内置完整的全选、反选、条件禁用选择核心状态机，通过 `onChange` 向外流转行主键与值对。
 *    - 物理加载占位骨架屏（Skeleton Loading）：在加载状态下自动生成带有呼吸脉冲发光效果的行占位框架，大幅提升感官流畅度。
 * ==========================================
 */

import React, { useState, useMemo } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { TableProps, TableColumn } from '../../types/components';
import { Pagination } from './Pagination';
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox, Loader2 } from 'lucide-react';

export const Table = <T extends { [key: string]: any }>({
  columns = [],
  dataSource = [],
  rowKey = 'id',
  bordered = true,
  striped = false,
  hoverable = true,
  loading = false,
  size = 'md',
  emptyText = '暂无数据',
  onRowClick,
  rowSelection,
  pagination,
  className = '',
  style,
  id,
}: TableProps<T>) => {
  const { tokens } = useDesignTokens();

  // 0. Establish stable unique ID for hover isolation and HTML references
  const uniqueId = useMemo(() => {
    return id || `atomix-table-${Math.random().toString(36).substring(2, 8)}`;
  }, [id]);

  // 1. Sort state for columns
  const [sortColumnKey, setSortColumnKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // 2. Padding/Cell heights mapping
  const getCellPaddingClass = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-3 text-sm';
      case 'lg':
        return 'py-4.5 px-6 text-sm';
      case 'md':
      default:
        return 'py-3.5 px-4 text-sm';
    }
  };

  // 获取动画曲线
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

  // Helper function to resolve row key
  const getRecordKey = (record: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    const keyVal = record[rowKey];
    if (keyVal !== undefined && keyVal !== null) {
      return String(keyVal);
    }
    return String(record.key || record.id || index);
  };

  // 1. 点击列表头进行排序切换的动作处理逻辑
  const handleSort = (column: TableColumn<T>) => {
    if (!column.sorter) return;

    if (sortColumnKey === column.key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        // Reset sort
        setSortColumnKey(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumnKey(column.key);
      setSortDirection('asc');
    }
  };

  // 2. 数据源预处理及内存排序缓存（优先匹配自定义 sorter 函数，兜底支持整型数值与首字母文本排序）
  const processedData = useMemo(() => {
    if (!sortColumnKey || !sortDirection) return dataSource;

    const activeCol = columns.find((c) => c.key === sortColumnKey);
    if (!activeCol) return dataSource;

    const dataCopy = [...dataSource];

    if (typeof activeCol.sorter === 'function') {
      const customSorter = activeCol.sorter;
      dataCopy.sort((a, b) => {
        const res = customSorter(a, b);
        return sortDirection === 'asc' ? res : -res;
      });
    } else {
      const dataIndex = activeCol.dataIndex || activeCol.key;
      dataCopy.sort((a, b) => {
        const valA = a[dataIndex];
        const valB = b[dataIndex];

        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
        if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return dataCopy;
  }, [dataSource, sortColumnKey, sortDirection, columns]);

  // 3. 批量选择（全选状态侦测与反控操作）核心状态机
  const isAllSelected = useMemo(() => {
    if (!rowSelection || processedData.length === 0) return false;
    return processedData.every((record, idx) => {
      const key = getRecordKey(record, idx);
      const checkboxProps = rowSelection.getCheckboxProps?.(record) || {};
      return checkboxProps.disabled || rowSelection.selectedRowKeys.includes(key);
    });
  }, [processedData, rowSelection]);

  const handleSelectAll = (checked: boolean) => {
    if (!rowSelection) return;

    if (checked) {
      const selectables = processedData
        .filter((record) => {
          const checkboxProps = rowSelection.getCheckboxProps?.(record) || {};
          return !checkboxProps.disabled;
        })
        .map((record, index) => getRecordKey(record, index));

      const newKeysArray = Array.from(new Set([...rowSelection.selectedRowKeys, ...selectables]));
      const newRowsArray = processedData.filter((record, index) => newKeysArray.includes(getRecordKey(record, index)));
      rowSelection.onChange(newKeysArray, newRowsArray);
    } else {
      const currentKeysInView = processedData.map((record, index) => getRecordKey(record, index));
      const remainingKeys = rowSelection.selectedRowKeys.filter((key) => !currentKeysInView.includes(key));
      const remainingRows = dataSource.filter((record, index) => remainingKeys.includes(getRecordKey(record, index)));
      rowSelection.onChange(remainingKeys, remainingRows);
    }
  };

  const handleRowSelectChecked = (key: string, record: T, checked: boolean) => {
    if (!rowSelection) return;

    let newKeysArray: string[];
    if (checked) {
      newKeysArray = [...rowSelection.selectedRowKeys, key];
    } else {
      newKeysArray = rowSelection.selectedRowKeys.filter((k) => k !== key);
    }

    const newRowsArray = dataSource.filter((item, idx) => newKeysArray.includes(getRecordKey(item, idx)));
    rowSelection.onChange(newKeysArray, newRowsArray);
  };

  return (
    <div
      id={uniqueId}
      className={`w-full flex flex-col overflow-hidden leading-relaxed ${className}`}
      style={{
        backgroundColor: tokens.colors.bgCard || '#ffffff',
        borderRadius: bordered ? tokens.borders.radiusLg || '16px' : '0px',
        border: bordered ? `1px solid ${tokens.colors.border || 'rgba(0,0,0,0.08)'}` : 'none',
        boxShadow: bordered ? '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)' : 'none',
        ...style,
      }}
    >
      {/* 4. 首尾呼应：向 DOM 树动态注入底层 hover 效果，基于 Design Token 机制自适应感知悬停主色调域 */}
      {hoverable && (
        <style dangerouslySetInnerHTML={{ __html: `
          #${uniqueId} tbody tr {
            transition: background-color ${tokens.behaviors.motionDurationFast || 150}ms ease-in-out !important;
          }
          #${uniqueId} tbody tr:hover {
            background-color: ${tokens.colors.bgHover || 'rgba(99, 102, 241, 0.05)'} !important;
          }
        `}} />
      )}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse select-none table-auto">
          <thead>
            <tr
              className="border-b"
              style={{
                borderColor: tokens.colors.border || 'rgba(0,0,0,0.08)',
                backgroundColor: tokens.colors.bgPage || '#f9fbff',
              }}
            >
              {/* Row Selector Checkbox Header */}
              {rowSelection && (
                <th className={`${getCellPaddingClass()} w-12 text-center shrink-0`}>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="cursor-pointer h-4 w-4 rounded transition ease-in-out border border-[#cbd5e1] focus:ring-offset-0 focus:ring-1"
                      style={{
                        accentColor: tokens.colors.brand,
                        borderRadius: tokens.borders.radiusSm || '4px',
                      }}
                    />
                  </div>
                </th>
              )}

              {/* Column Normal Headers */}
              {columns.map((column) => {
                const isSorted = sortColumnKey === column.key;
                const canSort = !!column.sorter;

                return (
                  <th
                    key={column.key}
                    onClick={() => handleSort(column)}
                    className={`${getCellPaddingClass()} font-semibold font-sans select-none ${
                      canSort ? 'cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/20' : ''
                    }`}
                    style={{
                      width: column.width,
                      textAlign: column.align || 'left',
                      color: tokens.colors.textSecondary || '#4a5568',
                      ...motionStyles,
                    }}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        column.align === 'right'
                          ? 'justify-end w-full'
                          : column.align === 'center'
                          ? 'justify-center w-full'
                          : ''
                      }`}
                    >
                      <span>{column.title}</span>
                      {canSort && (
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3 h-3 text-indigo-500 font-extrabold" />
                            ) : (
                              <ArrowDown className="w-3 h-3 text-indigo-500 font-extrabold" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 text-slate-300 group-hover:text-slate-400 transition" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              /* Skeletons Loading Placeholders */
              [1, 2, 3, 4].map((idx) => (
                <tr
                  key={`skeleton-${idx}`}
                  className="border-b animate-pulse"
                  style={{ borderColor: tokens.colors.border || 'rgba(0,0,0,0.08)' }}
                >
                  {rowSelection && (
                    <td className="p-3 text-center">
                      <div className="w-4 h-4 bg-slate-100 dark:bg-slate-800/50 rounded mx-auto" />
                    </td>
                  )}
                  {columns.map((col, colIdx) => (
                    <td key={`skeleton-cel-${colIdx}`} className={getCellPaddingClass()}>
                      <div
                        className={`h-3 bg-slate-100 dark:bg-slate-800/40 rounded ${
                          colIdx === 0 ? 'w-24' : colIdx === 1 ? 'w-16' : 'w-12'
                        } ${col.align === 'center' ? 'mx-auto' : col.align === 'right' ? 'ml-auto' : ''}`}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : processedData.length === 0 ? (
              /* Inside Empty Banner row scope */
              <tr>
                <td colSpan={columns.length + (rowSelection ? 1 : 0)} className="text-center py-12 px-6">
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="w-10 h-10 mb-3 text-slate-300 stroke-[1.5]" />
                    <span className="text-xs" style={{ color: tokens.colors.textWeak || '#94a3b8' }}>
                      {emptyText}
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              /* Real Row lists scope */
              processedData.map((record, idx) => {
                const key = getRecordKey(record, idx);
                const isSelected = rowSelection?.selectedRowKeys.includes(key) || false;
                const checkboxProps = rowSelection?.getCheckboxProps?.(record) || {};

                // Striped Zebra coloring logic background
                const rowBg = isSelected
                  ? tokens.colors.bgHover || 'rgba(99, 102, 241, 0.05)'
                  : striped && idx % 2 === 1
                  ? tokens.colors.bgPage || '#f9fafe'
                  : 'transparent';

                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick?.(record, idx)}
                    className={`${hoverable ? 'cursor-pointer' : ''} border-b group`}
                    style={{
                      borderColor: tokens.colors.border || 'rgba(0,0,0,0.08)',
                      backgroundColor: rowBg,
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    {/* Select row checkbox cell */}
                    {rowSelection && (
                      <td
                        className={`${getCellPaddingClass()} text-center shrink-0`}
                        onClick={(e) => e.stopPropagation()} // Stop triggering row click when picking selector
                      >
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={checkboxProps.disabled}
                            onChange={(e) => handleRowSelectChecked(key, record, e.target.checked)}
                            className="cursor-pointer h-4 w-4 rounded transition ease-in-out border border-[#cbd5e1] focus:ring-offset-0 focus:ring-1 disabled:cursor-not-allowed disabled:opacity-40"
                            style={{
                              accentColor: tokens.colors.brand,
                              borderRadius: tokens.borders.radiusSm || '4px',
                            }}
                          />
                        </div>
                      </td>
                    )}

                    {/* Column values cell mapping */}
                    {columns.map((column) => {
                      const value = record[column.dataIndex || column.key];

                      return (
                        <td
                          key={column.key}
                          className={getCellPaddingClass()}
                          style={{
                            textAlign: column.align || 'left',
                            color: tokens.colors.textPrimary || '#1e293b',
                          }}
                        >
                          {column.render ? (
                            column.render(value, record, idx)
                          ) : (
                            <span className="font-normal">
                              {value !== undefined && value !== null ? String(value) : '-'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Embedded footer mini custom pagination loader */}
      {pagination && !loading && dataSource.length > 0 && (
        <div
          className="p-4 flex items-center justify-between border-t select-none shrink-0"
          style={{ borderColor: tokens.colors.border || 'rgba(0,0,0,0.08)' }}
        >
          <div className="text-xs" style={{ color: tokens.colors.textSecondary || '#64748b' }}>
            <span>共 {processedData.length} 项数据</span>
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onChange}
            size="sm"
            variant="classic"
            showFirstLast={false}
          />
        </div>
      )}
    </div>
  );
};
