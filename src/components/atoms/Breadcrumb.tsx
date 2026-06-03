/**
 * ==========================================
 * 文件名称: /src/components/atoms/Breadcrumb.tsx
 * 功能描述: 高保真、轻量级 AI-Native 智能面包屑 (Breadcrumb) 原子组件
 * 目标受众: 产品经理、UI 用户体验设计师、开发团队。
 * 
 * 💡 什么是“智能面包屑原子组件”？
 * 本组件不仅是静态的“链接拼接链条”。它直接响应当前的全局设计系统主线：
 * 1. 【令牌级形态定制】：自适应响应 headingFont 属于 serif, sans 或 mono。
 *    若为 `mono`（Geek/Terminal风），分隔符会自动呈现更具数字工业风的 `>` 或斜杠并带间距；
 *    若为 `serif`（学术文雅风），会呈现更优雅平稳的衬线字体与细腻色差。
 * 2. 【智能折叠与交互展开】：在大型系统深层路径中，支持通过配置 `maxItems` 实现超长路径自动合并。
 *    点击中间的 “...” (省略号) 触发微交互动效，瞬间平滑平铺完整展开，或渲染历史深层面包屑链条。
 * 3. 【极细感高保真悬浮 (Hover Pilule)】：支持项悬浮时显示极低饱和度圆角药丸框 (`bgHover`)，
 *    而非粗暴下划线，赋予界面极致的呼吸美学。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { ChevronRight, MoreHorizontal, Home } from 'lucide-react';

/**
 * 🏷️ 面包屑单项配置信息契约
 */
export interface BreadcrumbItem {
  // 面包屑节点的中文/英文名称或自定义 React 元素
  label: React.ReactNode;
  // 节点的跳转路径 (可选，若缺失则代表该节点不可点击复原)
  href?: string;
  // 可选前置功能/业务图标 (如 Home, Folder 等)
  icon?: React.ReactNode;
  // 任何外部需要附带的临时声明属性
  [key: string]: any;
}

/**
 * 🏷️ 面包屑组件属性声明契约
 */
export interface BreadcrumbProps {
  // 面包屑节点链条列表
  items: BreadcrumbItem[];
  // 自定义分隔符。默认情况下，若没传，系统会根据设计风格自动分发（如: / 或 ChevronRight）
  separator?: React.ReactNode;
  // 路径显示的最大节点数限制。超出此值时，中间层节点会被自动折叠，避免高密度排版折行
  maxItems?: number;
  // 折叠后，前面保留的节点节点数。默认保留第1个（Root）
  itemsBeforeCollapse?: number;
  // 折叠后，后面保留的节点节点数。默认保留末尾1个（当前页面）
  itemsAfterCollapse?: number;
  // 节点被点击时的拦截或回调处理。可用于阻止默认路由行为，实现 Single-Page 单页内部状态变换
  onItemClick?: (item: BreadcrumbItem, index: number, event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
  // 提供外部自定义样式的开口
  className?: string;
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  maxItems,
  itemsBeforeCollapse = 1,
  itemsAfterCollapse = 1,
  onItemClick,
  className = '',
  style,
}) => {
  const { tokens } = useDesignTokens();
  
  // 状态：中间超长节点是否展开 (默认折叠以维持极爽极简版面)
  const [isExpanded, setIsExpanded] = useState(false);

  // 1. 根据当前设计令牌行为，获取更精准的字型、字号与动画时长
  const fontStyle = {
    fontFamily: tokens.typography.bodyFont === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)',
    fontSize: tokens.typography.sizeSm, // 面包屑大多使用 sm 尺寸
  };

  // 2. 自定义悬停、激活态颜色计算
  const getInteractiveColors = (isLast: boolean, isLink: boolean) => {
    if (isLast) {
      return {
        color: tokens.colors.textPrimary,
        fontWeight: (tokens.typography.fontWeightBold || '600') as any,
        cursor: 'default',
      };
    }
    return {
      color: isLink ? tokens.colors.textSecondary : tokens.colors.textMuted,
      fontWeight: (tokens.typography.fontWeightNormal || '400') as any,
      cursor: isLink ? 'pointer' : 'default',
    };
  };

  // 3. 计算默认分隔符 (如果没有显式指定)
  const defaultSeparatorElement = () => {
    // 极客 Mono 风格默认使用最质朴纯净的高对比 "/" 斜杠
    if (tokens.typography.headingFont === 'mono') {
      return <span style={{ color: tokens.colors.textMuted, margin: '0 4px', fontSize: '10px' }}>/</span>;
    }
    // 其它圆润、AI智能化风格默认使用纤弱的 ChevronRight
    return (
      <ChevronRight 
        size={14} 
        style={{ 
          color: tokens.colors.textMuted, 
          opacity: 0.75, 
          margin: '0 2px',
          flexShrink: 0
        }} 
      />
    );
  };

  const finalSeparator = separator !== undefined ? separator : defaultSeparatorElement();

  // 4. 路由点击处理器
  const handleClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => {
    if (onItemClick) {
      onItemClick(item, index, event);
    }
    if (!item.href) {
      event.preventDefault();
    }
  };

  // 5. 核心：超长面包屑路径切片折叠渲染算法
  const renderBreadcrumbNodes = () => {
    const totalItems = items.length;

    // 确定是否触发折叠规则
    const shouldCollapse = maxItems !== undefined && totalItems > maxItems && !isExpanded;

    if (!shouldCollapse) {
      // 没有任何折叠，或者用户点击了 Ellipsis 已瞬间铺平展开
      return items.map((item, idx) => {
        const isLast = idx === totalItems - 1;
        const hasHref = !!item.href;
        return renderItemNode(item, idx, isLast, hasHref);
      });
    }

    // 触发折叠算法：组装 "前截部分 + 折叠省略号 + 后截部分"
    const nodes: React.ReactNode[] = [];
    
    // itemsBeforeCollapse (左边保留多少)
    const leftCount = Math.max(0, itemsBeforeCollapse);
    // itemsAfterCollapse (最后侧保留多少)
    const rightCount = Math.max(0, itemsAfterCollapse);

    // 确保两端加起来不会比总数还溢出
    if (leftCount + rightCount >= totalItems) {
      return items.map((item, idx) => {
        const isLast = idx === totalItems - 1;
        const hasHref = !!item.href;
        return renderItemNode(item, idx, isLast, hasHref);
      });
    }

    // A. 渲染开头保留项
    for (let i = 0; i < leftCount; i++) {
      nodes.push(renderItemNode(items[i], i, false, !!items[i].href));
    }

    // B. 渲染高保真智能省略按钮 (带有一键平滑全展开微效)
    nodes.push(
      <React.Fragment key="collapsed-ellipsis">
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setIsExpanded(true)}
            title="点击展开完整导航路径"
            aria-label="Expand crumbs"
            style={{
              all: 'unset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: tokens.borders.radiusSm,
              color: tokens.colors.textMuted,
              cursor: 'pointer',
              transition: `all ${tokens.behaviors.motionDurationFast}ms ease`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = tokens.colors.bgHover;
              e.currentTarget.style.color = tokens.colors.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = tokens.colors.textMuted;
            }}
          >
            <MoreHorizontal size={14} />
          </button>
        </li>
        {/* 省略号后输出的分隔符 */}
        <li style={{ display: 'inline-flex', alignItems: 'center' }}>{finalSeparator}</li>
      </React.Fragment>
    );

    // C. 渲染右端保留项
    for (let i = totalItems - rightCount; i < totalItems; i++) {
      const isLast = i === totalItems - 1;
      nodes.push(renderItemNode(items[i], i, isLast, !!items[i].href));
    }

    return nodes;
  };

  // 6. 渲染单个节点和它紧随其后的分隔符
  const renderItemNode = (item: BreadcrumbItem, index: number, isLast: boolean, hasHref: boolean) => {
    const isLink = hasHref && !isLast;
    const colors = getInteractiveColors(isLast, isLink);

    // 计算面包屑单项的 Hover 药丸风格或普通高亮
    const hoverStyle = isLink ? {
      borderRadius: tokens.borders.radiusSm,
      transition: `all ${tokens.behaviors.motionDurationFast}ms ease`,
    } : {};

    return (
      <React.Fragment key={`crumb-${index}`}>
        <li style={{ display: 'inline-flex', alignItems: 'center' }}>
          {isLink ? (
            <a
              href={item.href}
              onClick={(e) => handleClick(item, index, e)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 6px',
                textDecoration: 'none',
                WebkitTapHighlightColor: 'transparent',
                ...colors,
                ...hoverStyle,
              }}
              className="group"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.bgHover;
                e.currentTarget.style.color = tokens.colors.brand;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.color;
              }}
            >
              {item.icon && <span style={{ display: 'inline-flex', alignmentBaseline: 'middle' }}>{item.icon}</span>}
              <span>{item.label}</span>
            </a>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 6px',
                ...colors,
              }}
            >
              {item.icon && <span style={{ display: 'inline-flex', color: tokens.colors.textMuted }}>{item.icon}</span>}
              <span className="truncate max-w-[12rem]">{item.label}</span>
            </span>
          )}
        </li>
        {/* 如果不是最后一个节点，则紧接着输出精美分隔符 */}
        {!isLast && (
          <li style={{ display: 'inline-flex', alignItems: 'center' }} aria-hidden="true">
            {finalSeparator}
          </li>
        )}
      </React.Fragment>
    );
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`select-none flex items-center ${className}`}
      style={{
        ...fontStyle,
        ...style,
      }}
    >
      <ol style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', padding: 0, margin: 0, listStyle: 'none' }}>
        {renderBreadcrumbNodes()}
      </ol>
    </nav>
  );
};
