/**
 * ==========================================
 * 文件名称: /src/components/atoms/AppLayout.tsx
 * 功能描述: 高自由度、无硬编码的设计系统骨架组件 (AppLayout Primitive)。
 * 
 * 🎨 设计系统与应用支持:
 * 1. 职责仅为提供布局的标准物理容器，不夹带任何应用特定的业务逻辑，实现快速移植、几行代码套用。
 * 2. 深度绑定 useDesignTokens，完美适配各主题（极客现代、冷酷极客、复古暖纸、软萌糖果）的色彩底色、圆角与切换。
 * 3. 完美复现富有呼吸感的悬浮高内聚外观 (Floating Panel Style)：
 *    - 当启用 `floatingStyle` 时，侧边栏、导航栏、主内容区域均化身为悬浮弹性卡片，外环绕精致呼吸空隙与高阶柔和阴影，极富节奏感。
 *    - 边缘缝隙与间距完全继承设计系统 spacing 数值，消灭野生硬编码。
 *    ℹ️【重要联动智能机制】：当 `floatingStyle={true}` 时，本布局容器内部会自动通过 React Context 
 *      将挂载子项 `Sidebar` 切换为透明轻量的 `minimal` 变体，将 `Navbar` 切换为极简透明的 `transparent` 变体。
 *      因此在此拼装场景下，请**不要**在子组件（Sidebar / Navbar）上显式传 `variant`，依靠本级智能调配能呈现出最完美的高内聚外观。
 * 4. 高阶控制插槽 (Slots)：
 *    - sidebar: 容纳各种形态的侧边栏。
 *    - navbar: 容纳各种模式的快捷顶部导航条。
 *    - children: 渲染主页面内容，支持独立局部滚动。
 *    - footer: 自适应底座信息 and 加载态。
 * ==========================================
 */

import React from 'react';
import { motion } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { AppLayoutProps } from '../../types/components';

export interface AppLayoutContextProps {
  floatingStyle: boolean;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const AppLayoutContext = React.createContext<AppLayoutContextProps | undefined>(undefined);

export const AppLayout: React.FC<AppLayoutProps> = ({
  sidebar,
  navbar,
  children,
  footer,
  sidebarCollapsed,
  onSidebarCollapseChange,
  fixedNavbar = true,
  fixedSidebar = true,
  floatingStyle = true,
  className = '',
  style,
  id,
}) => {
  const { tokens } = useDesignTokens();

  // 统一的折叠状态状态治理 (兼顾受控/非受控)
  const [localCollapsed, setLocalCollapsed] = React.useState(false);
  const isCollapsed = sidebarCollapsed !== undefined ? sidebarCollapsed : localCollapsed;

  const handleCollapseChange = (col: boolean) => {
    if (sidebarCollapsed === undefined) {
      setLocalCollapsed(col);
    }
    if (onSidebarCollapseChange) {
      onSidebarCollapseChange(col);
    }
  };

  const toggleSidebar = () => {
    handleCollapseChange(!isCollapsed);
  };

  const layoutContainerStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.bgPage,
    color: tokens.colors.textPrimary,
    fontFamily: tokens.typography.headingFont === 'serif' 
      ? '"Playfair Display", Georgia, serif' 
      : tokens.typography.headingFont === 'mono' 
        ? '"JetBrains Mono", Courier, monospace' 
        : '"Inter", sans-serif',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
    ...style,
  };

  const floatingGap = tokens.spacings.sm || '8px'; // 呼吸感悬浮外边隙 (改为 sm 的 8px 以完美对齐右边距与底边距)
  const innerCardPadding = tokens.spacings.lg || '24px'; // 主白卡内边距
  const contentGap = tokens.spacings.sm || '8px'; // 元素纵向流动间距
  const itemBorderRadius = tokens.borders.radiusLg || '16px'; // 大倒角圆角大小
  const sideMargin = tokens.spacings.sm || '8px'; // 侧边栏与主工作区之间的黄金微间隙 (改为 8px 以确保四周悬浮边界彻底等宽)

  return (
    <AppLayoutContext.Provider
      value={{
        floatingStyle,
        sidebarCollapsed: isCollapsed,
        setSidebarCollapsed: handleCollapseChange,
        toggleSidebar,
      }}
    >
      <div
        id={id}
        className={`h-screen max-h-screen w-full flex flex-row transition-all overflow-hidden ${className}`}
        style={layoutContainerStyle}
      >
        {/* 1. 左侧 Sidebar 槽位 (全高度，自适应固定/随动) */}
        {sidebar && (
          <motion.aside
            layout="size"
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            className={`flex flex-col shrink-0 overflow-hidden ${
              fixedSidebar ? 'h-full sticky top-0 bottom-0 z-30' : 'relative z-30'
            }`}
            style={
              floatingStyle
                ? {
                    backgroundColor: tokens.colors.bgPage, // 在外层保持基底页色
                    padding: 0, // 侧边栏全体直通顶底
                  }
                : {}
            }
          >
            <div className="flex-1 h-full overflow-hidden flex flex-col">
              {sidebar}
            </div>
          </motion.aside>
        )}

        {/* 2. 右侧主工作区 (垂直多级自适应容器) */}
        <div
          className="flex-1 flex flex-col min-w-0 h-full overflow-hidden"
          style={{
            padding: floatingStyle ? `${floatingGap} ${floatingGap} ${floatingGap} ${sideMargin}` : '0', // 顶部、右侧、底部、左侧彻底化身匀称 8px 黄金悬浮框边距
            gap: floatingStyle ? contentGap : '0',
          }}
        >
          {/* A. 顶部 Navbar 槽位 (置放于右侧系统内嵌中) */}
          {navbar && (
            <div
              className={`${fixedNavbar ? 'sticky top-0 z-40 shrink-0' : 'relative z-40 shrink-0'} transition-all`}
            >
              <motion.div
                layout="position"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                className="w-full flex items-center"
                style={
                  floatingStyle
                    ? {
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0px',
                        boxShadow: 'none',
                        padding: `0 ${tokens.spacings.sm || '8px'}`,
                        height: '52px',
                        overflow: 'visible',
                      }
                    : {
                        backgroundColor: tokens.colors.bgCard,
                        borderBottom: `1px solid ${tokens.colors.border}`,
                        padding: `0 ${tokens.spacings.lg || '24px'}`,
                        height: '64px',
                        overflow: 'visible',
                      }
                }
              >
                {navbar}
              </motion.div>
            </div>
          )}

          {/* B. 主页面内容区域 (自适应滚动) */}
          <motion.main
            layout="position"
            className="flex-1 overflow-y-auto no-scrollbar flex flex-col focus:outline-none animate-fade-in"
            style={
              floatingStyle
                ? {
                    backgroundColor: tokens.colors.bgCard,
                    border: 'none', // 彻底移除硬边，回归拟物真实感
                    borderRadius: itemBorderRadius,
                    boxShadow: tokens.shadows.ambient || tokens.shadows.lg, // 完美加载匀称弥散呼吸柔和投影
                    padding: innerCardPadding,
                  }
                : {
                    backgroundColor: tokens.colors.bgCard,
                    padding: innerCardPadding,
                  }
            }
          >
            <div className="flex-1 w-full flex flex-col min-w-0">
              {children}
            </div>
          </motion.main>

          {/* C. 底部 Footer 槽位 */}
          {footer && (
            <footer className="shrink-0">
              <div
                className="w-full flex items-center justify-between text-xs font-mono"
                style={
                  floatingStyle
                    ? {
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0px',
                        boxShadow: 'none',
                        padding: `6px ${tokens.spacings.sm || '8px'}`,
                        color: tokens.colors.textSecondary || '#64748b',
                      }
                    : {
                        borderTop: `1px solid ${tokens.colors.border}`,
                        padding: `${tokens.spacings.md || '16px'} ${tokens.spacings.lg || '24px'}`,
                        color: tokens.colors.textSecondary || '#64748b',
                      }
                }
              >
                {footer}
              </div>
            </footer>
          )}
        </div>
      </div>
    </AppLayoutContext.Provider>
  );
};
