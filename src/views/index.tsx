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
export const VIEWS_REGISTRY: RegisteredView[] = [
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

interface ViewsStudioContainerProps {
  activeViewId?: string;
  onActiveViewIdChange?: (id: string) => void;
}

export const ViewsStudioContainer: React.FC<ViewsStudioContainerProps> = ({
  activeViewId: propActiveViewId,
  onActiveViewIdChange,
}) => {
  const { tokens } = useDesignTokens();
  const [internalActiveViewId, setInternalActiveViewId] = useState<string>(VIEWS_REGISTRY[0]?.id || 'default-template');

  const activeViewId = propActiveViewId !== undefined ? propActiveViewId : internalActiveViewId;
  const setActiveViewId = onActiveViewIdChange !== undefined ? onActiveViewIdChange : setInternalActiveViewId;

  const activeView = VIEWS_REGISTRY.find(v => v.id === activeViewId);
  const ActiveComponent = activeView ? activeView.component : CustomPageTemplate;

  return (
    <div 
      className="transition-all duration-300"
      style={{
        borderRadius: tokens.borders.radiusLg,
      }}
    >
      <ActiveComponent />
    </div>
  );
};

export default ViewsStudioContainer;
