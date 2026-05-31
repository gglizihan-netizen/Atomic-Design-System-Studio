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
import { BidBuilderView } from './BidBuilderView';
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
    id: 'bid-builder',
    name: '招标文件智能大纲与正文生成器',
    desc: '依据用户两份截图百分百还原的高度仿生工作空间，自带树状大纲整理、智能章节重写、CAD施工图内嵌、字数点数消费微交互',
    badge: '截图提炼',
    component: BidBuilderView,
  },
  {
    id: 'default-template',
    name: '租户虚拟网络控制台',
    desc: '系统内置的 12 列栅格响应式控制台模板，完美适配 4 套风骨主题',
    badge: '官方模板',
    component: CustomPageTemplate,
  },
];

export const ViewsStudioContainer: React.FC = () => {
  const { tokens } = useDesignTokens();
  const [activeViewId, setActiveViewId] = useState<string>(VIEWS_REGISTRY[0]?.id || 'default-template');

  const activeView = VIEWS_REGISTRY.find(v => v.id === activeViewId);
  const ActiveComponent = activeView ? activeView.component : CustomPageTemplate;

  return (
    <div className="space-y-4">
      {/* Slim Tab Switcher Ribbon - Maximizing Content Viewport Space */}
      <div 
        className="px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
        style={{
          backgroundColor: tokens.colors.bgCard,
          borderRadius: tokens.borders.radiusMd,
          border: `1px solid ${tokens.colors.border}`,
        }}
      >
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4.5 h-4.5" style={{ color: tokens.colors.brand }} />
          <div>
            <h3 className="text-xs font-extrabold leading-none" style={{ color: tokens.colors.textPrimary }}>
              业务隔离高保真沙盒 (Views Studio)
            </h3>
            <span className="text-[9px] text-slate-450 mt-0.5 block font-mono">
              Views Attached: {VIEWS_REGISTRY.length}
            </span>
          </div>
        </div>

        {/* Low-profile Segment Switcher Caps */}
        <div
          className="flex flex-wrap gap-1.5 p-0.5 rounded-lg border"
          style={{
            backgroundColor: tokens.colors.bgInput,
            borderColor: tokens.colors.border,
          }}
        >
          {VIEWS_REGISTRY.map((view) => {
            const isSelected = activeViewId === view.id;
            return (
              <button
                key={view.id}
                onClick={() => setActiveViewId(view.id)}
                className="px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer rounded-md flex items-center gap-2"
                style={{
                  backgroundColor: isSelected ? tokens.colors.brand : 'transparent',
                  color: isSelected ? tokens.colors.textInverse : tokens.colors.textPrimary,
                }}
              >
                {view.badge && (
                  <span 
                    className="text-[9px] tracking-wider px-1.5 py-0.2 rounded-sm scale-90"
                    style={{
                      backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : `${tokens.colors.brand}12`,
                      color: isSelected ? tokens.colors.textInverse : tokens.colors.brand,
                    }}
                  >
                    {view.badge}
                  </span>
                )}
                <span>{view.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active running page container */}
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
