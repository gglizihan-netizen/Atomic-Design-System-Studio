/**
 * ==========================================
 * 文件名称: /src/views/index.tsx
 * 功能描述: Atomix UI 独立隔离业务页面统一大盘调度器 (Views Registry Panel)
 * 目标受众: 后续接入的 AI Assistant / IDE 助手等
 * 
 * 💡 AI 主动开发金律 (Auto-Wiring Gold Rule):
 * 以往 AI 助手写完新页面常常将其丢弃成为无法预览的“代码孤岛”。现在我们设立此中央注册中心：
 * 1. 【物理新建】: 当用户要求编写一个新高保真页面或特定视图时，先在 `/src/views/` 目录下完成物理新建 (例如 `NetworkEditModal.tsx`)。
 * 2. 【主动注册】: 完成物理编写后，AI 【必须主动且无需请示】在此文件的 `VIEWS_REGISTRY` 列表中加入此页面，以此打通预览入口！
 * 3. 【零断层浏览】: 这样新页面将完美浮现在工作空间的“页面业务沙盒(Views)”分栏选项卡中，随时接受评测，打造极致丝滑的创作体验。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../components/base/DesignTokensContext';
import { CustomPageTemplate } from './CustomPageTemplate';
import { LayoutGrid, Sparkles, Pin } from 'lucide-react';

interface RegisteredView {
  id: string;
  name: string;
  desc: string;
  badge?: string;
  component: React.ComponentType;
}

// =========================================================================
// 视图注册中心 (VIEWS_REGISTRY) 
// 在这里登记新开发的隔离业务页面，AI 往此处追加条目即可让用户在后台一键切换
// =========================================================================
const VIEWS_REGISTRY: RegisteredView[] = [
  {
    id: 'default-template',
    name: '租户虚拟网络控制台',
    desc: '系统内置的 12 列栅格响应式控制台模板，完美适配 4 套风骨主题',
    badge: '官方模板',
    component: CustomPageTemplate,
  },
  // 💡 [AI 快速扩充通道]: 新页面直接物理建好后在此行下方进行 Named Import 并在此处追加入口
];

export const ViewsStudioContainer: React.FC = () => {
  const { tokens } = useDesignTokens();
  const [activeViewId, setActiveViewId] = useState<string>(VIEWS_REGISTRY[0]?.id || 'default-template');

  const activeView = VIEWS_REGISTRY.find(v => v.id === activeViewId);
  const ActiveComponent = activeView ? activeView.component : CustomPageTemplate;

  return (
    <div className="space-y-6">
      {/* 12列栅格之 - 顶部子页面调度看板面 */}
      <div 
        className="p-5 transition-all duration-300"
        style={{
          backgroundColor: tokens.colors.bgCard,
          borderRadius: tokens.borders.radiusLg,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: tokens.colors.border,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5" style={{ color: tokens.colors.brand }} />
              <h3 className="text-sm font-bold" style={{ color: tokens.colors.textPrimary }}>
                业务页面沙盒仓 · 多场景多保真联动面板
              </h3>
            </div>
            <p className="text-xs" style={{ color: tokens.colors.textMuted }}>
              无需复杂配置，只需在主控仓 <code className="px-1 py-0.5 bg-slate-100 rounded text-[10.5px]">/src/views/index.tsx</code> 中追加导入，AI 页面即可自动挂载。
            </p>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-100/60 p-1 rounded-lg">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider font-mono">
              Views Loaded:
            </span>
            <span 
              className="text-xs font-bold px-1.5 py-0.5 rounded font-mono"
              style={{
                color: tokens.colors.brand,
                backgroundColor: `${tokens.colors.brand}12`,
              }}
            >
              {VIEWS_REGISTRY.length}
            </span>
          </div>
        </div>

        {/* 页面子 Tab 灵动切换条 */}
        <div className="mt-4 flex flex-wrap gap-2 pt-4 border-t border-slate-100/40">
          {VIEWS_REGISTRY.map((view) => {
            const isSelected = activeViewId === view.id;
            return (
              <button
                key={view.id}
                onClick={() => setActiveViewId(view.id)}
                className="group relative px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                style={{
                  borderRadius: tokens.borders.radiusMd,
                  backgroundColor: isSelected ? tokens.colors.brand : `${tokens.colors.brand}05`,
                  color: isSelected ? '#ffffff' : tokens.colors.textPrimary,
                  border: isSelected ? `1px solid ${tokens.colors.brand}` : `1px solid ${tokens.colors.border}`,
                }}
              >
                {view.badge && (
                  <span 
                    className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded-sm scale-90"
                    style={{
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : `${tokens.colors.brand}15`,
                      color: isSelected ? '#ffffff' : tokens.colors.brand,
                    }}
                  >
                    {view.badge}
                  </span>
                )}
                <span>{view.name}</span>
                {isSelected && <Pin className="w-3 h-3 text-white/80 animate-bounce" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 激活运行的具体业务面物理展现 */}
      <div 
        className="transition-all duration-300"
        style={{
          borderRadius: tokens.borders.radiusLg,
        }}
      >
        <ActiveComponent />
      </div>
    </div>
  );
};

export default ViewsStudioContainer;
