/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesignTokensProvider, useDesignTokens } from './components/base/DesignTokensContext';
import { ToastProvider } from './components/atoms/Toast';
import { DesignTokenPanel } from './components/DesignTokenPanel';
import { Dropdown } from './components/atoms/Dropdown';
import { ShowcasePanel } from './components/ShowcasePanel';
import { FrameworkDocs } from './components/FrameworkDocs';
import ViewsStudioContainer, { VIEWS_REGISTRY } from './views/index';
import {
  Sparkles,
  Settings,
  Layers,
  BookMarked,
  Layout,
  Search,
  HelpCircle,
  FileCode,
  Sliders,
  ChevronDown,
  User,
  Sun,
  Laptop
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function WorkspaceTabButton({ tab, isSelected, onClick, sidebarCollapsed, tokens }: any) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl p-2.5 transition-all flex items-center gap-3 group relative cursor-pointer border"
      style={{
        backgroundColor: isSelected
          ? tokens.colors.bgActive
          : isHovered
          ? tokens.colors.bgHover
          : 'transparent',
        borderColor: isSelected ? tokens.colors.brand : 'transparent',
        color: isSelected ? tokens.colors.brand : tokens.colors.textSecondary,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="p-1.5 rounded-lg shrink-0 transition-all"
        style={{
          backgroundColor: isSelected ? tokens.colors.brand : tokens.colors.bgHover,
          color: isSelected ? tokens.colors.textInverse : tokens.colors.textMuted,
        }}
      >
        {tab.icon}
      </div>
      {!sidebarCollapsed && (
        <div className="animate-fade-in text-left">
          <div className="text-xs font-bold leading-none">{tab.en}</div>
          <p className="text-[9.5px] truncate mt-1 animate-fade-in" style={{ color: tokens.colors.textMuted }}>
            {tab.label}
          </p>
        </div>
      )}
    </button>
  );
}

function ComponentListItem({ item, isSelected, onClick, sidebarCollapsed, tokens }: any) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      className="w-full text-left py-2 px-3 text-xs rounded-lg transition-all flex items-center justify-between group cursor-pointer border border-transparent"
      style={{
        backgroundColor: isSelected
          ? tokens.colors.brand
          : isHovered
          ? tokens.colors.bgHover
          : 'transparent',
        color: isSelected ? tokens.colors.textInverse : tokens.colors.textSecondary,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300"
          style={{
            backgroundColor: isSelected ? tokens.colors.textInverse : tokens.colors.textMuted,
            transform: isSelected ? 'scale(1.25)' : 'none',
          }}
        />
        {!sidebarCollapsed ? (
          <span className="truncate">
            {item.en}{' '}
            <span
              style={{
                color: isSelected ? tokens.colors.textInverse : tokens.colors.textMuted,
                opacity: isSelected ? 0.75 : 1,
              }}
              className="text-[10px] ml-1.5 font-normal"
            >
              {item.label}
            </span>
          </span>
        ) : (
          <span className="text-[10px] font-bold font-mono">
            {item.en.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      {!sidebarCollapsed && !isSelected && (
        <span
          className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-all font-bold"
          style={{ color: tokens.colors.textMuted }}
        >
          →
        </span>
      )}
    </button>
  );
}

function ViewListItem({ item, isSelected, onClick, sidebarCollapsed, tokens }: any) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      className="w-full text-left py-2 px-3 text-xs rounded-lg transition-all flex items-center justify-between group cursor-pointer border border-transparent"
      style={{
        backgroundColor: isSelected
          ? tokens.colors.brand
          : isHovered
          ? tokens.colors.bgHover
          : 'transparent',
        color: isSelected ? tokens.colors.textInverse : tokens.colors.textSecondary,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300"
          style={{
            backgroundColor: isSelected ? tokens.colors.textInverse : tokens.colors.textMuted,
            transform: isSelected ? 'scale(1.25)' : 'none',
          }}
        />
        {!sidebarCollapsed ? (
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-[11px] truncate leading-tight">
              {item.name}
            </span>
            <span 
              className="text-[9px] mt-0.5 truncate select-none leading-none opacity-80" 
              style={{ color: isSelected ? tokens.colors.textInverse : tokens.colors.textMuted }}
            >
              {item.badge || 'PAGE'} — {item.desc.slice(0, 18)}...
            </span>
          </div>
        ) : (
          <span className="text-[10px] font-bold font-mono">
            {item.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>
      {!sidebarCollapsed && !isSelected && (
        <span
          className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-all font-bold"
          style={{ color: tokens.colors.textMuted }}
        >
          →
        </span>
      )}
    </button>
  );
}

function ThemePresetButton({ preset, isSelected, onClick, tokens }: any) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      className="p-1.8 rounded-lg border text-left flex flex-col justify-between transition-all group cursor-pointer min-h-[46px]"
      style={{
        borderColor: isSelected
          ? tokens.colors.brand
          : isHovered
          ? tokens.colors.brandLight
          : tokens.colors.border,
        backgroundColor: isSelected
          ? tokens.colors.bgActive
          : isHovered
          ? tokens.colors.bgHover
          : 'transparent',
        color: tokens.colors.textPrimary,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-1 min-w-0">
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: preset.color }}
        />
        <span className="text-[9.5px] font-bold block truncate" style={{ color: tokens.colors.textPrimary }}>
          {preset.label}
        </span>
      </div>
      <span className="text-[7.5px] font-mono mt-1 block leading-none" style={{ color: tokens.colors.textMuted }}>
        {preset.code}
      </span>
    </button>
  );
}

function StudioLayout() {
  const { tokens, activePreset, setPreset, activeTab, setActiveTab } = useDesignTokens();
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'playground' | 'tokens' | 'views' | 'docs'>('playground');
  const [activeViewId, setActiveViewId] = useState<string>('bid-builder');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFooterHovered, setIsFooterHovered] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
 
  const workspaceTabs = [
    {
      id: 'playground' as const,
      label: '核心组件工坊',
      en: 'Component Lab',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'tokens' as const,
      label: '全局令牌配置',
      en: 'Design Tokens',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'views' as const,
      label: '页面业务沙盒',
      en: 'Page Sandbox',
      icon: <Layout className="w-4 h-4" />,
    },
    {
      id: 'docs' as const,
      label: '集成设计规范',
      en: 'Design System',
      icon: <BookMarked className="w-4 h-4" />,
    },
  ];

  const COMPONENT_LIST = [
    { id: 'button' as const, label: '按钮', en: 'Button' },
    { id: 'icon' as const, label: '图标', en: 'Icon' },
    { id: 'input' as const, label: '输入框', en: 'Input' },
    { id: 'dropdown' as const, label: '选择器', en: 'Select' },
    { id: 'modal' as const, label: '页面弹窗', en: 'Modal' },
    { id: 'navbar' as const, label: '导航系统', en: 'Navbar' },
    { id: 'breadcrumb' as const, label: '面包屑', en: 'Breadcrumb' },
    { id: 'pagination' as const, label: '自适应分页', en: 'Pagination' },
    { id: 'steps' as const, label: '步骤进度条', en: 'Steps' },
    { id: 'tabs' as const, label: '选项卡', en: 'Tabs' },
    { id: 'datepicker' as const, label: '日期选择器', en: 'DatePicker' },
    { id: 'slider' as const, label: '自适应滑块', en: 'Slider' },
    { id: 'card' as const, label: '智能卡片', en: 'Card' },
    { id: 'progress' as const, label: '自适应进度条', en: 'Progress' },
    { id: 'loading' as const, label: '状态加载器', en: 'Loading' },
    { id: 'alert' as const, label: '警告提示条', en: 'Alert' },
    { id: 'toast' as const, label: '浮动轻提示', en: 'Toast' },
    { id: 'tag' as const, label: '标贴', en: 'Tag' },
    { id: 'list' as const, label: '列表', en: 'List' },
    { id: 'table' as const, label: '表格', en: 'Table' },
    { id: 'imageviewer' as const, label: '图片预览', en: 'ImageViewer' },
    { id: 'skeleton' as const, label: '骨架屏', en: 'Skeleton' },
    { id: 'sidebar' as const, label: '智能侧边栏', en: 'Sidebar' },
    { id: 'appLayout' as const, label: '大盘骨架', en: 'AppLayout' },
  ];

  const presetsList = [
    { id: 'intelligent_workspace' as const, label: '智能大纲', color: '#1F63D1', code: 'AI Blue' },
    { id: 'swiss_modern' as const, label: '瑞士极简', color: '#0F2C59', code: 'Cobalt SL' },
    { id: 'editorial_warm' as const, label: '人文红褐', color: '#7C1C1C', code: 'Bordeaux' },
    { id: 'sweet_rounded' as const, label: '香芋气泡', color: '#8B5CF6', code: 'Lavender' },
  ];

  // Filter components list based on search query
  const filteredComponents = COMPONENT_LIST.filter(
    (item) =>
      item.label.includes(searchQuery) ||
      item.en.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter registered views list based on search query
  const filteredViews = VIEWS_REGISTRY.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleComponentClick = (id: typeof activeTab) => {
    setActiveTab(id);
    setActiveWorkspaceTab('playground');
  };

  // Build active workspace English label for breadcrumbs
  const getWorkspaceEnglish = () => {
    switch (activeWorkspaceTab) {
      case 'playground':
        return 'Component Lab';
      case 'tokens':
        return 'Design Tokens';
      case 'views':
        return 'Page Sandbox';
      case 'docs':
        return 'Design System';
      default:
        return 'Studio';
    }
  };

  const getActiveComponentLabel = () => {
    const found = COMPONENT_LIST.find((c) => c.id === activeTab);
    return found ? `${found.en} ${found.label}` : '';
  };

  return (
    <div className="h-screen overflow-hidden flex transition-colors duration-300" style={{ color: tokens.colors.textPrimary }}>
      {/* 1. Left Sidebar (Unified Navigation) */}
      <aside
        className="border-r flex flex-col justify-between shrink-0 select-none transition-all duration-300"
        style={{
          width: sidebarCollapsed ? '64px' : '256px',
          backgroundColor: tokens.colors.bgCard,
          borderColor: tokens.colors.border,
        }}
      >
        <div className="flex flex-col min-h-0">
          {/* Top Header Brand */}
          <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: tokens.colors.border }}>
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: tokens.colors.brand }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="animate-fade-in flex flex-col">
                  <span className="text-sm font-extrabold tracking-tight leading-none" style={{ color: tokens.colors.textPrimary }}>
                    Atomix Studio
                  </span>
                  <span className="text-[9px] mt-1 font-mono tracking-wider font-semibold" style={{ color: tokens.colors.textMuted }}>
                    v1.2.0 DESK
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Body Scroll container */}
          <div className="flex-1 overflow-hidden flex flex-col py-4 px-3 space-y-6">
            {/* WORKSPACE group */}
            <div className="space-y-1.5 shrink-0">
              {!sidebarCollapsed && (
                <div 
  className="px-3 py-1 flex items-center justify-between select-none cursor-pointer hover:opacity-80 transition-opacity"
  onClick={() => setWorkspaceCollapsed(!workspaceCollapsed)}
>
  <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono" style={{ color: tokens.colors.textMuted }}>
    Workspace
  </span>
  <ChevronDown 
    className="w-3 h-3 transition-transform" 
    style={{ 
      color: tokens.colors.textMuted,
      transform: workspaceCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'
    }} 
  />
</div>
              )}
              <AnimatePresence>
                {!workspaceCollapsed && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-0.5">
                      {workspaceTabs.map((tab) => {
                  const isSelected = activeWorkspaceTab === tab.id;
                  return (
                    <WorkspaceTabButton
                      key={tab.id}
                      tab={tab}
                      isSelected={isSelected}
                      onClick={() => setActiveWorkspaceTab(tab.id)}
                      sidebarCollapsed={sidebarCollapsed}
                      tokens={tokens}
                    />
                      );
                    })}
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DYNAMIC LIST Group (Flat list underneath Workspace, supporting both Components and Pages dynamically) */}
            <div className="space-y-2 flex-1 flex flex-col min-h-0 border-t pt-4" style={{ borderColor: tokens.colors.border }}>
              {!sidebarCollapsed && (
                <div className="px-3 py-1 flex items-center justify-between select-none shrink-0">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono" style={{ color: tokens.colors.textMuted }}>
                    {activeWorkspaceTab === 'views' ? 'Sandbox Views' : 'Components'}
                  </span>
                  <span
                    className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-sm"
                    style={{ backgroundColor: tokens.colors.bgInput, color: tokens.colors.textSecondary }}
                  >
                    {activeWorkspaceTab === 'views' ? filteredViews.length : filteredComponents.length}
                  </span>
                </div>
              )}

              {/* Search Input */}
              {!sidebarCollapsed && (
                <div className="px-3 py-1 shrink-0">
                  <div className="relative flex items-center h-8">
                    <Search className="w-3.5 h-3.5 absolute left-3" style={{ color: tokens.colors.textMuted }} />
                    <input
                      type="text"
                      placeholder={activeWorkspaceTab === 'views' ? "搜索沙盒页面 & 描述..." : "搜索核心组件 & 令牌..."}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full h-full text-[11px] pl-8 pr-6 border rounded-lg transition-all focus:outline-none placeholder:text-[11px]"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: isSearchFocused ? tokens.colors.brand : tokens.colors.border,
                        color: tokens.colors.textPrimary,
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] cursor-pointer"
                        style={{ backgroundColor: tokens.colors.bgHover, color: tokens.colors.textMuted }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic scrollable list */}
              <div className="space-y-0.5 flex-1 overflow-y-auto px-1 mt-1 custom-scrollbar">
                {activeWorkspaceTab === 'views' ? (
                  filteredViews.length > 0 ? (
                    filteredViews.map((item) => {
                      const isSelected = activeViewId === item.id;
                      return (
                        <ViewListItem
                          key={item.id}
                          item={item}
                          isSelected={isSelected}
                          onClick={() => setActiveViewId(item.id)}
                          sidebarCollapsed={sidebarCollapsed}
                          tokens={tokens}
                        />
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-[11px] select-none text-slate-400 font-medium">
                      未找到相关业务页面
                    </div>
                  )
                ) : (
                  filteredComponents.length > 0 ? (
                    filteredComponents.map((item) => {
                      const isSelected = activeWorkspaceTab === 'playground' && activeTab === item.id;
                      return (
                        <ComponentListItem
                          key={item.id}
                          item={item}
                          isSelected={isSelected}
                          onClick={() => handleComponentClick(item.id)}
                          sidebarCollapsed={sidebarCollapsed}
                          tokens={tokens}
                        />
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-[11px] select-none text-slate-400 font-medium">
                      未找到相关组件
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer Collapse Trigger */}
        <div className="p-3 border-t" style={{ borderColor: tokens.colors.border }}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full py-1.5 border rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200"
            style={{
              borderColor: tokens.colors.border,
              backgroundColor: isFooterHovered ? tokens.colors.bgHover : 'transparent',
              color: tokens.colors.textSecondary,
            }}
            onMouseEnter={() => setIsFooterHovered(true)}
            onMouseLeave={() => setIsFooterHovered(false)}
          >
            {sidebarCollapsed ? '→' : '← 收起导航'}
          </button>
        </div>
      </aside>

      {/* 2. Main Frame Area (Right Column) */}
      <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: tokens.colors.bgPage }}>
        {/* Top Navigator Header */}
        <header
          className="h-14 border-b px-6 flex items-center justify-between shrink-0 select-none transition-colors duration-300"
          style={{
            backgroundColor: tokens.colors.bgCard,
            borderColor: tokens.colors.border,
          }}
        >
          {/* Breadcrumbs matching image */}
          <div className="flex items-center gap-2 text-xs font-medium" style={{ color: tokens.colors.textMuted }}>
            <span className="hover:text-slate-700 transition-colors cursor-pointer" style={{ color: tokens.colors.textSecondary }}>Atomix Studio</span>
            <span style={{ color: tokens.colors.border }}>/</span>
            <span className="hover:text-slate-700 transition-colors cursor-pointer capitalize" style={{ color: tokens.colors.textSecondary }}>
              {getWorkspaceEnglish()}
            </span>
            {activeWorkspaceTab === 'playground' && (
              <>
                <span style={{ color: tokens.colors.border }}>/</span>
                <span className="font-bold transition-colors cursor-help" style={{ color: tokens.colors.textPrimary }}>
                  {getActiveComponentLabel()}
                </span>
              </>
            )}
          </div>

          {/* Quick status information actions */}
          <div className="flex items-center gap-3">
            {/* Elegant Global Theme Switcher Pill in Header */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="h-8 pl-2.5 pr-2 rounded-xl border text-[11px] font-bold flex items-center gap-2 transition-all cursor-pointer hover:opacity-95"
                style={{
                  backgroundColor: tokens.colors.bgInput,
                  borderColor: tokens.colors.border,
                  color: tokens.colors.textPrimary,
                }}
              >
                <span className="w-2 h-2 rounded-full ring-2 ring-offset-2" style={{ backgroundColor: presetsList.find(p => p.id === activePreset)?.color || tokens.colors.brand, ringColor: 'transparent' }} />
                <span>{presetsList.find(p => p.id === activePreset)?.label || '加载中'}</span>
                <span className="opacity-50 font-mono text-[9px] font-medium">({presetsList.find(p => p.id === activePreset)?.code || 'AI'})</span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-60" />
              </button>
              
              {/* Floating popover dropdown menu */}
              {showThemeDropdown && (
                <>
                  <div 
                    className="fixed inset-0 z-40 cursor-default" 
                    onClick={() => setShowThemeDropdown(false)} 
                  />
                  <div
                    className="absolute right-0 mt-1.5 w-52 rounded-xl border p-1.5 z-50 shadow-md animate-fade-in flex flex-col gap-0.5"
                    style={{
                      backgroundColor: tokens.colors.bgCard,
                      borderColor: tokens.colors.border,
                    }}
                  >
                    <div className="px-2.5 py-1.5 text-[9.5px] uppercase tracking-wider font-extrabold font-mono" style={{ color: tokens.colors.textMuted }}>
                      切换全局设计主题
                    </div>
                    {presetsList.map((preset) => {
                      const isSelected = activePreset === preset.id;
                      return (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setPreset(preset.id);
                            setShowThemeDropdown(false);
                          }}
                          className="w-full text-left p-2 rounded-lg text-xs flex items-center justify-between group cursor-pointer transition-all"
                          style={{
                            backgroundColor: isSelected ? tokens.colors.bgActive : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.backgroundColor = tokens.colors.bgHover;
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <span 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: preset.color }} 
                            />
                            <div className="flex flex-col">
                              <span className="font-bold text-[11px]" style={{ color: tokens.colors.textPrimary }}>
                                {preset.label}
                              </span>
                              <span className="text-[9.5px] font-mono" style={{ color: tokens.colors.textMuted }}>
                                {preset.code}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <span className="text-[10px] font-bold" style={{ color: tokens.colors.brand }}>
                              ACTIVE
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Ambient indicator lights */}
            <div
              className="flex items-center gap-1.5 text-[11px] font-mono font-bold px-2 py-0.8 rounded-md border"
              style={{
                backgroundColor: tokens.colors.successBg,
                borderColor: tokens.colors.success,
                color: tokens.colors.success,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: tokens.colors.success }} />
              <span>CONNECTED</span>
            </div>

            {/* Config metadata icon triggers */}
            <div className="flex items-center gap-2.5" style={{ color: tokens.colors.textMuted }}>
              <button 
                title="帮助中心" 
                className="p-1 rounded-lg transition-all cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.bgHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={() => {
                  alert("欢迎使用 Atomix Studio 组件工坊！本系统支持一键更改全局设计令牌变量、自动生成 React 交付代码并支持多框架预览。");
                }}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                title="系统信息"
                className="p-1 rounded-lg transition-all cursor-pointer"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.colors.bgHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Laptop className="w-4 h-4" />
              </button>
              <div className="h-4 w-px" style={{ backgroundColor: tokens.colors.border }} />
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold cursor-help group relative shadow-xs"
                style={{ backgroundColor: tokens.colors.brand }}
                title={`${tokens.name} Theme Active`}
              >
                AI
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Display Panel Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 w-full max-w-[1650px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorkspaceTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="h-full"
            >
              {activeWorkspaceTab === 'tokens' && <DesignTokenPanel />}
              {activeWorkspaceTab === 'playground' && <ShowcasePanel />}
              {activeWorkspaceTab === 'views' && <ViewsStudioContainer activeViewId={activeViewId} onActiveViewIdChange={setActiveViewId} />}
              {activeWorkspaceTab === 'docs' && <FrameworkDocs />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DesignTokensProvider>
      <ToastProvider>
        <StudioLayout />
      </ToastProvider>
    </DesignTokensProvider>
  );
}
