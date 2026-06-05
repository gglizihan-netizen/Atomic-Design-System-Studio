/**
 * ==========================================
 * 文件名称: /src/components/atoms/Navbar.tsx
 * 功能描述: 极简避噪、通用响应式系统顶栏组件 (Universal System Header)
 * 目标受众: 面向中台及高画质 SaaS 应用架构
 * 
 * 💡 重构要点：
 * 1. 极致精简与纯净：移除一切硬编码的不规范非标准元素（无 OmniSearch、无 VPC-LIVE 心跳、无 Ctrl+/ 提示字样）。
 * 2. 消息通知盒中枢：仅保留符合设计规范的消息通知铃铛（含徽标计数与事件气泡）。
 * 3. 完美适配设计令牌：颜色、阴影、间距完全响应 useDesignTokens() 的配置。
 * 4. 零折行、高健壮性防抖动布局：在大屏/小屏均展现出无懈可击的高级排版美感。
 * ℹ️【重要联动逻辑】：当此组件嵌套于开启了 `floatingStyle={true}`的 `AppLayout` 内时，
 *   默认会自动感知并切换为 `transparent`（透明），与外部呼吸感卡片完美贴合。
 *   模型/开发者在此集成模式下请保持 `variant` 未指定，显式指定会覆盖此自适应表现。
 * ==========================================
 */

import React, { useState, useContext } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { NavbarProps } from '../../types/components';
import { AppLayoutContext } from './AppLayout';
import { 
  Bell, 
  Menu, 
  Check, 
  Palette, 
  X, 
  ShieldCheck, 
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  menuItems = [],
  rightActions,
  sticky = true,
  variant: propVariant,
  brandName,
  extra,
  showCollapseButton = true,
  sidebarCollapsed: propSidebarCollapsed,
  onCollapseToggle: propOnCollapseToggle,
  badgeCount: initialBadgeCount = 3,
  onBellClick,
  showThemeSwitcher = false, // 默认不开启，仅在配置显式声明时开启
}) => {
  const { tokens, activePreset, setPreset } = useDesignTokens();
  const layoutCtx = useContext(AppLayoutContext);

  const variant = propVariant !== undefined
    ? propVariant
    : (layoutCtx?.floatingStyle ? 'transparent' : 'classic');

  const sidebarCollapsed = propSidebarCollapsed !== undefined
    ? propSidebarCollapsed
    : (layoutCtx ? layoutCtx.sidebarCollapsed : false);

  const onCollapseToggle = propOnCollapseToggle || layoutCtx?.toggleSidebar;

  // 1. 独立浮层受控状态
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [badgeCount, setBadgeCount] = useState(initialBadgeCount);

  // 2. 精简型符合物理真实事件的消息箱
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: '系统架构分析完成',
      desc: '当前大盘所有的核心物理网卡和交换节点网络延迟皆处于优良健康状态。',
      time: '1分钟前',
      type: 'success',
    },
    {
      id: 'n2',
      title: 'UI 设计系统令牌已就绪',
      desc: '多套专业设计方案和皮肤预设已随 W3C 标准加载，随时提供敏捷呈现。',
      time: '15分钟前',
      type: 'info',
    }
  ]);

  const handleClearNotifications = () => {
    setNotifications([]);
    setBadgeCount(0);
  };

  const isTransparent = variant === 'transparent';

  // 顶栏主壳体样式
  const navStyle: React.CSSProperties = {
    backgroundColor: isTransparent ? 'transparent' : tokens.colors.bgCard,
    borderBottomWidth: isTransparent ? '0px' : '1px',
    borderBottomStyle: isTransparent ? 'none' : 'solid',
    borderBottomColor: isTransparent ? 'transparent' : tokens.colors.border,
    boxShadow: isTransparent ? 'none' : tokens.shadows.sm,
    position: sticky ? 'sticky' : 'relative',
    top: 0,
    zIndex: 40,
    width: '100%',
    height: '100%',
    transition: `all ${tokens.behaviors.motionDurationNormal}ms ${tokens.behaviors.motionCurve}`,
  };

  // 皮肤配置项
  const presetOptions = [
    { id: 'intelligent_workspace' as const, name: '智能极客工作空间', color: '#10b981' },
    { id: 'swiss_modern' as const, name: '瑞士理性主义架构', color: '#ef4444' },
    { id: 'editorial_warm' as const, name: '人文自适应纸面', color: '#d97706' },
    { id: 'sweet_rounded' as const, name: '仙草香芋糖果', color: '#8b5cf6' },
  ];

  return (
    <nav style={navStyle} id="system-top-navbar" className="select-none flex items-center h-full relative font-sans w-full">
      <div className="px-4 sm:px-6 w-full h-full flex items-center" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between w-full h-full flex-nowrap" style={{ overflow: 'visible' }}>
          
          {/* A. 左侧区：折叠按压区 / 标志与品牌字壳 (避免任何形式的堆叠) */}
          <div className="flex items-center gap-3 shrink-0 flex-nowrap">
            {showCollapseButton && onCollapseToggle && (
              <button
                onClick={onCollapseToggle}
                className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 rounded-lg transition-all flex items-center justify-center cursor-pointer text-slate-500 dark:text-slate-400 shrink-0"
                title={sidebarCollapsed ? "展开侧边栏" : "折叠侧边栏"}
              >
                <Menu size={16} />
              </button>
            )}

            {/* 定制 Logo 槽或标准品牌名称显示 */}
            {logo ? (
              <div className="flex items-center shrink-0">{logo}</div>
            ) : brandName ? (
              <span
                className="text-xs font-semibold tracking-tight uppercase truncate shrink-0 max-w-[160px] sm:max-w-[280px]"
                style={{ color: tokens.colors.textPrimary }}
              >
                {brandName}
              </span>
            ) : null}
          </div>

          {/* B. 中间区：自适应扩展菜单 (只有在传入有效项时才渲染，避免挤满中缝) */}
          {menuItems && menuItems.length > 0 && (
            <div className="hidden md:flex items-center gap-1.5 overflow-hidden shrink-0">
              {menuItems.map((item, index) => {
                const isActive = item.active;
                return (
                  <button
                    key={`nav-item-${item.label}-${index}`}
                    onClick={item.onClick}
                    style={{
                      borderRadius: tokens.borders.radiusSm,
                      fontSize: '11px',
                      color: isActive ? tokens.colors.brand : tokens.colors.textSecondary,
                      fontWeight: isActive ? '600' : '400',
                      backgroundColor: isActive ? `${tokens.colors.brand}12` : 'transparent',
                      padding: `4px 10px`,
                    }}
                    className="transition-all select-none hover:opacity-90 active:translate-y-[1px] cursor-pointer outline-none whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* C. 右侧区：消息通知中枢 (精简干净，支持未来高可配置扩展如风格快选与个人信息等) */}
          <div className="flex items-center gap-2.5 relative flex-nowrap shrink-0">
            
            {/* 可配置的风格一键轮转切换器 */}
            {showThemeSwitcher && (
              <div className="relative shrink-0">
                <button
                  onClick={() => {
                    setIsThemeOpen(!isThemeOpen);
                    setIsBellOpen(false); // 干净互斥
                  }}
                  className={`h-8 px-2 rounded-lg border text-xs gap-1 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center justify-center cursor-pointer select-none`}
                  style={{ 
                    borderColor: isThemeOpen ? tokens.colors.brand : tokens.colors.border,
                    backgroundColor: isThemeOpen ? `${tokens.colors.brand}08` : 'transparent'
                  }}
                  title="敏捷切换设计方案"
                >
                  <Palette size={13} className="opacity-80" />
                  <span className="hidden text-[10px] sm:inline font-mono font-bold">
                    {activePreset.toUpperCase().split('_')[0]}
                  </span>
                  <ChevronDown size={10} className={`opacity-60 transition-transform ${isThemeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isThemeOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden p-2 z-50 text-left animate-fade-in"
                    style={{ 
                      backgroundColor: tokens.colors.bgCard,
                      borderColor: tokens.colors.border,
                      boxShadow: tokens.shadows.lg
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b mb-1.5" style={{ borderColor: tokens.colors.border }}>
                      <span className="text-[10px] font-bold text-slate-500">
                        皮肤选择
                      </span>
                      <button 
                        onClick={() => setIsThemeOpen(false)}
                        className="p-1 rounded text-slate-400 cursor-pointer"
                      >
                        <X size={10} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-1">
                      {presetOptions.map((preset) => {
                        const isSelected = activePreset === preset.id;
                        return (
                          <div
                            key={preset.id}
                            onClick={() => {
                              setPreset(preset.id);
                              setIsThemeOpen(false);
                            }}
                            className="p-1.5 rounded-lg cursor-pointer transition-all border text-left flex items-center justify-between"
                            style={{
                              backgroundColor: isSelected ? `${tokens.colors.brand}08` : 'transparent',
                              borderColor: isSelected ? tokens.colors.brand : 'transparent',
                            }}
                          >
                            <span className="text-[10px] font-semibold" style={{ color: tokens.colors.textPrimary }}>
                              {preset.name}
                            </span>
                            {isSelected && <Check size={10} style={{ color: tokens.colors.brand }} strokeWidth={3} />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 精美的独立消息中心铃铛 */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setIsBellOpen(!isBellOpen);
                  setIsThemeOpen(false); // 干净互斥
                  if (onBellClick) onBellClick();
                }}
                className={`h-8 w-8 rounded-lg border text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all flex items-center justify-center cursor-pointer`}
                style={{ 
                  borderColor: isBellOpen ? tokens.colors.brand : tokens.colors.border,
                  backgroundColor: isBellOpen ? `${tokens.colors.brand}08` : 'transparent'
                }}
                title="通知消息箱"
              >
                <div className="relative flex items-center justify-center">
                  <Bell size={13} className={badgeCount > 0 ? "animate-pulse" : ""} />
                  {badgeCount > 0 && (
                    <span 
                      className="absolute -top-1.5 -right-1.5 min-w-[12px] h-[12px] rounded-full text-white text-[7px] font-extrabold flex items-center justify-center px-0.5 shadow-sm"
                      style={{ backgroundColor: tokens.colors.error }}
                    >
                      {badgeCount}
                    </span>
                  )}
                </div>
              </button>

              {/* 优雅且紧凑的设计系统消息层 */}
              {isBellOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl shadow-xl border overflow-hidden p-3 z-50 animate-fade-in"
                  style={{ 
                    backgroundColor: tokens.colors.bgCard,
                    borderColor: tokens.colors.border,
                    boxShadow: tokens.shadows.lg
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-1.5 border-b mb-2" style={{ borderColor: tokens.colors.border }}>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      通知消息箱 ({badgeCount})
                    </span>
                    {notifications.length > 0 && (
                      <button 
                        onClick={handleClearNotifications}
                        className="text-[9px] font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        清空
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 max-h-[180px] overflow-y-auto no-scrollbar">
                    {notifications.length > 0 ? (
                      notifications.map((msg) => (
                        <div key={msg.id} className="p-2 rounded-lg border text-left bg-slate-50/40 dark:bg-slate-900/15" style={{ borderColor: tokens.colors.border }}>
                          <span className="text-[7.5px] px-1 py-0.5 rounded-sm font-extrabold uppercase bg-emerald-500/10 text-emerald-500">
                            {msg.type}
                          </span>
                          <h4 className="text-[9.5px] font-bold text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                            {msg.title}
                          </h4>
                          <p className="text-[8.5px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                            {msg.desc}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center text-slate-400 space-y-1 select-none">
                        <ShieldCheck size={18} className="mx-auto text-emerald-500/70" />
                        <p className="text-[9px] font-bold">没有待办通知</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 搭载外界传入的高阶个人信息、Profile 头像或多维操作槽位 (充分保障未来升级与成长性) */}
            {(rightActions || extra) && (
              <div className="flex items-center gap-1.5 pl-0.5 shrink-0 flex-nowrap">
                {rightActions}
                {extra}
              </div>
            )}
            
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
