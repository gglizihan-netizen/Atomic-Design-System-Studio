/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesignTokensProvider, useDesignTokens } from './components/base/DesignTokensContext';
import { DesignTokenPanel } from './components/DesignTokenPanel';
import { ShowcasePanel } from './components/ShowcasePanel';
import { FrameworkDocs } from './components/FrameworkDocs';
import ViewsStudioContainer from './views/index';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFooterHovered, setIsFooterHovered] = useState(false);
 
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
    <div className="min-h-screen flex transition-colors duration-300" style={{ color: tokens.colors.textPrimary }}>
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
          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
            {/* WORKSPACE group */}
            <div className="space-y-1.5">
              {!sidebarCollapsed && (
                <div className="px-3 py-1 flex items-center justify-between select-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono" style={{ color: tokens.colors.textMuted }}>
                    Workspace
                  </span>
                  <ChevronDown className="w-3 h-3" style={{ color: tokens.colors.textMuted }} />
                </div>
              )}
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
            </div>

            {/* COMPONENTS group (Flat list underneath Workspace, satisfying the prompt) */}
            <div className="space-y-2">
              {!sidebarCollapsed && (
                <div className="px-3 py-1 flex items-center justify-between select-none">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono" style={{ color: tokens.colors.textMuted }}>
                    Components
                  </span>
                  <span
                    className="text-[8.5px] font-mono font-bold px-1.5 py-0.2 rounded-sm"
                    style={{ backgroundColor: tokens.colors.bgInput, color: tokens.colors.textSecondary }}
                  >
                    {COMPONENT_LIST.length}
                  </span>
                </div>
              )}

              {/* Component Search Input (only shown when not collapsed) */}
              {!sidebarCollapsed && (
                <div className="px-1 py-0.5">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="搜索核心组件 & 令牌..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full text-[11px] pl-7.5 pr-3 py-1.8 border rounded-lg transition-all focus:outline-none"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: isSearchFocused ? tokens.colors.brand : tokens.colors.border,
                        color: tokens.colors.textPrimary,
                      }}
                    />
                    <Search className="w-3.5 h-3.5 absolute left-2.2 top-2.5" style={{ color: tokens.colors.textMuted }} />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1.5 w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px] cursor-pointer"
                        style={{ backgroundColor: tokens.colors.bgHover, color: tokens.colors.textMuted }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Flat list of components */}
              <div className="space-y-0.5 max-h-[220px] overflow-y-auto custom-scrollbar">
                {filteredComponents.map((item) => {
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
                })}
              </div>
            </div>

            {/* Quick Themes preset (One-key change, integrated inside directory bar satisfying design prompt value) */}
            {!sidebarCollapsed && (
              <div className="space-y-2 border-t pt-4" style={{ borderColor: tokens.colors.border }}>
                <div className="px-3 py-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" style={{ color: tokens.colors.brand }} />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono" style={{ color: tokens.colors.textMuted }}>
                    一键换肤 (Themes)
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 px-1">
                  {presetsList.map((preset) => {
                    const isSelected = activePreset === preset.id;
                    return (
                      <ThemePresetButton
                        key={preset.id}
                        preset={preset}
                        isSelected={isSelected}
                        onClick={() => setPreset(preset.id)}
                        tokens={tokens}
                      />
                    );
                  })}
                </div>
              </div>
            )}
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
          <div className="flex items-center gap-4">
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
              {activeWorkspaceTab === 'views' && <ViewsStudioContainer />}
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
      <StudioLayout />
    </DesignTokensProvider>
  );
}
