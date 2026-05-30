/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesignTokensProvider, useDesignTokens } from './components/base/DesignTokensContext';
import { DesignTokenPanel } from './components/DesignTokenPanel';
import { ShowcasePanel } from './components/ShowcasePanel';
import { ScenarioSandbox } from './components/ScenarioSandbox';
import { FrameworkDocs } from './components/FrameworkDocs';
import ViewsStudioContainer from './views/index';
import {
  Sparkles,
  Settings,
  Layers,
  LayoutTemplate,
  BookMarked,
  Code,
  Github,
  HelpCircle,
  FileCode,
  Layout,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function StudioLayout() {
  const { tokens } = useDesignTokens();
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'tokens' | 'playground' | 'sandbox' | 'docs' | 'views'>('playground');

  const workspaceTabs = [
    {
      id: 'playground' as const,
      label: '核心组件工坊 (Atoms)',
      desc: '原子组件参数交互微调',
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: 'tokens' as const,
      label: '全局令牌配置 (Tokens)',
      desc: '基础设计语言变量查看与导出',
      icon: <Settings className="w-4 h-4" />,
    },
    {
      id: 'sandbox' as const,
      label: '实战拼装沙盒 (Sandbox)',
      desc: '原子级积木组装真实高危交互场景',
      icon: <LayoutTemplate className="w-4 h-4" />,
    },
    {
      id: 'views' as const,
      label: '页面业务沙盒 (Views)',
      desc: '独立隔离高保真业务界面开发演示',
      icon: <Layout className="w-4 h-4" />,
    },
    {
      id: 'docs' as const,
      label: '集成设计规范 (Blueprint)',
      desc: '面向产品设计开发三端的协作落地体系',
      icon: <BookMarked className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Main Hero Announcement Segment */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6 border-slate-100/50">
        <div className="flex items-start gap-3.5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md shadow-indigo-500/10 shrink-0"
            style={{
              backgroundColor: tokens.colors.brand,
              borderRadius: tokens.borders.radiusLg,
            }}
          >
            <Sparkles className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-850 token-font-heading">
                Atomix Studio · 原子交互组件探索工坊
              </h1>
              <span className="text-[10px] uppercase tracking-wider bg-indigo-100/80 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                PM & Designer Shared System
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-normal leading-relaxed">
              彻底打破碎片化原型样式。自定义颜色、字体、间距与圆角等
              <strong>全局基础设计令牌 (Design Tokens)</strong>，实时重塑 Button、Input、Dropdown
              及 Modal
              等高频组件的原子级逻辑与动画表现，保障产品设计规范 100% 同源交付。
            </p>
          </div>
        </div>

        {/* Action controls / state telemetry */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono">
              ACTIVE THEME
            </span>
            <span
              className="text-xs font-bold px-2 py-1 rounded-md"
              style={{
                color: tokens.colors.brand,
                backgroundColor: `${tokens.colors.brand}0D`,
              }}
            >
              {tokens.name}
            </span>
          </div>
        </div>
      </header>

      {/* Main Studio Workbench layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Workspace Subheading and Left Side Tabs Sidebar Picker */}
        <nav className="lg:col-span-3 flex flex-col gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-1 select-none">
            工作空间导航 (Workspace tabs)
          </span>

          <div className="flex flex-row lg:flex-col overflow-x-auto scrollbar-none gap-2 pb-2 lg:pb-0">
            {workspaceTabs.map((tab) => {
              const isSelected = activeWorkspaceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkspaceTab(tab.id)}
                  className={`flex-1 lg:flex-none p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/10 shadow-xs text-indigo-700'
                      : 'border-slate-100 hover:border-slate-200 bg-white/40 text-slate-600'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'
                    }`}
                  >
                    {tab.icon}
                  </div>
                  <div className="hidden sm:block min-w-0">
                    <div className="text-xs font-bold leading-none">{tab.label}</div>
                    <p className="text-[10px] text-slate-400 truncate mt-1">{tab.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick specs cheat card for designers */}
          <div className="hidden lg:flex flex-col gap-3 mt-6 p-4 bg-slate-50/60 border border-slate-100 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <FileCode className="w-3 h-3" />
              当前圆角比例尺 (Radii specs)
            </span>
            <div className="space-y-1.5 font-mono text-[10px] text-slate-500">
              <div className="flex justify-between">
                <span>radiusNone (无圆角):</span>
                <span className="text-slate-800">{tokens.borders.radiusNone}</span>
              </div>
              <div className="flex justify-between">
                <span>radiusSm (小圆角):</span>
                <span className="text-slate-800">{tokens.borders.radiusSm}</span>
              </div>
              <div className="flex justify-between">
                <span>radiusMd (中圆角):</span>
                <span className="text-slate-800 font-semibold">{tokens.borders.radiusMd}</span>
              </div>
              <div className="flex justify-between">
                <span>radiusLg (大圆角):</span>
                <span className="text-slate-800">{tokens.borders.radiusLg}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content View Workspace block */}
        <main className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWorkspaceTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {activeWorkspaceTab === 'tokens' && <DesignTokenPanel />}
              {activeWorkspaceTab === 'playground' && <ShowcasePanel />}
              {activeWorkspaceTab === 'sandbox' && <ScenarioSandbox />}
              {activeWorkspaceTab === 'views' && <ViewsStudioContainer />}
              {activeWorkspaceTab === 'docs' && <FrameworkDocs />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Simple Footer details */}
      <footer className="mt-16 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal">
        <p>© 2026 Atomix Design System Studio. Built with React & Tailwind CSS.</p>
        <div className="flex gap-4">
          <span className="hover:text-slate-600 transition-colors cursor-help">设计资产安全审计</span>
          <span>·</span>
          <span className="hover:text-slate-600 transition-colors cursor-help">PM-Dev 通用语义标准 v1.0</span>
        </div>
      </footer>
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
