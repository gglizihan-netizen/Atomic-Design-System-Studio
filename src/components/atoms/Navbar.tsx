/**
 * ==========================================
 * 文件名称: /src/components/atoms/Navbar.tsx
 * 功能描述: 高保真、自适应流式顶部导航栏原语组件
 * 目标受众: 产品经理、UI设计师、应用架构开发。
 * 
 * 💡 特色机制：
 * 1. 结构与排版解耦：支持通过 `logo` 和 `rightActions` 槽位，随意拼装不同的业务页头功能。
 * 2. 状态自激活：导航项具有 active 高亮状态。高亮底雾色和字重完全继承自当前设计令牌，
 *    在优雅切换主题时（如切换到等宽代码风格），底雾会自动转换，贴合主题个性。
 * 3. 大容器限制：内置 `max-w-7xl mx-auto` 视口收缩栅格，防止在超宽带屏上无限拉伸变形。
 * ==========================================
 */

import React from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';

/**
 * 🏷️ 导航项的数据格式契约
 */
export interface NavbarItem {
  label: string;       // 按钮文本 (例如: “系统监控统计”)
  active?: boolean;    // 是否处于当前激活访问状态 (自动高亮加粗)
  onClick?: () => void;// 页面跳转/切换逻辑的动作回调
}

/**
 * 🏷️ 表义导航栏属性声明清单 (详尽中文注释)
 */
export interface NavbarProps {
  logo?: React.ReactNode;        // 左边缘：自定义 LOGO 模块 (缺省则使用设计系统默认的希腊 Ω 质感标)
  menuItems: NavbarItem[];      // 中间：横向导航菜单列表
  rightActions?: React.ReactNode;// 右边缘：操作按钮插槽 (如：[登录/注册] 或者 [主题下拉选择器])
  sticky?: boolean;              // 是否粘性置顶固定。若 true，页面向下滚动时依然如影随形悬浮于顶部
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  menuItems,
  rightActions,
  sticky = true,
}) => {
  const { tokens } = useDesignTokens();

  // 导航栏最大底盘样式
  const navStyle: React.CSSProperties = {
    backgroundColor: tokens.colors.bgCard, // 采用卡片暖白底色，提高内容层级
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: tokens.colors.border, // 极窄灰色底部界线
    boxShadow: tokens.shadows.sm,           // 温柔的下坠微阴影
    position: sticky ? 'sticky' : 'relative',
    top: 0,
    zIndex: 40,
    width: '100%',
    transition: `all ${tokens.behaviors.motionDurationNormal}ms ease`,
  };

  return (
    <nav style={navStyle} id="system-top-navbar" className="select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* A. 左侧：Logo 标识板块 */}
          <div className="flex items-center gap-3">
            {logo ? (
              logo
            ) : (
              <div className="flex items-center gap-2">
                {/* 默认精致的圆形 Omega 原子图标 */}
                <div
                  className="w-8 h-8 flex items-center justify-center token-weight-bold text-white shadow-sm"
                  style={{
                    backgroundColor: tokens.colors.brand,
                    borderRadius: tokens.borders.radiusSm, // 圆角大小随主题自适应
                  }}
                >
                  Ω
                </div>
                <span
                  className="text-md token-weight-bold tracking-tight token-font-heading"
                  style={{ 
                    color: tokens.colors.textPrimary,
                    fontSize: tokens.typography.sizeLg
                  }}
                >
                  ATOMIX
                </span>
              </div>
            )}
          </div>

          {/* B. 中间：横向菜单选项按钮区 */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item, index) => {
              const isActive = item.active;
              return (
                <button
                  key={`nav-item-${item.label}-${index}`}
                  onClick={item.onClick}
                  style={{
                    borderRadius: tokens.borders.radiusSm,
                    fontSize: tokens.typography.sizeSm,
                    color: isActive ? tokens.colors.brand : tokens.colors.textMuted,
                    fontWeight: isActive ? (tokens.typography.fontWeightBold || '600') : (tokens.typography.fontWeightNormal || '400'),
                    // 如果被激活，用10%透明度的品牌色垫住，突出呼吸律动感
                    backgroundColor: isActive ? `${tokens.colors.brand}12` : 'transparent',
                    padding: `${tokens.spacings.xs} ${tokens.spacings.sm}`,
                  }}
                  className="px-3 py-1.5 transition-all text-sm hover:opacity-90 active:translate-y-[1px] outline-none"
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* C. 右侧：个性化操作按钮容器插槽 */}
          {rightActions && (
            <div className="flex items-center gap-2">
              {rightActions}
            </div>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
