/**
 * ==========================================
 * 文件名称: /src/components/base/DesignTokensContext.tsx
 * 功能描述: 核心设计运行时上下文 (Design Runtime Context Provider)
 * 目标受众: 产品经理 (PM)、设计/交互专家 (UE/UI)、非技术团队。
 * 
 * 💡 这是什么？
 * 这是我们设计系统的“中枢神经网络。它的工作是：
 * 1. 维护当前激活的品牌预设方案（如：瑞士理性、代码终端、人文学风、香芋糖果）。
 * 2. 侦听用户的令牌实时调整，重新编译生成整个界面的 CSS 变量映射。
 * 3. 将视觉令牌及【行为令牌（如动效时间、响应缓动曲线、聚焦高亮开关）】统一注入到浏览器的最高根节点 (:root)。
 * 
 * 💡 为什么它叫“运行时”(Runtime)？
 * 过去的设计稿是静态的。在我们的架构下，我们将设计系统变成一个“活的指令泵”。
 * 改变这里的任何一个参数，不需要重新打包编译，整个界面的视觉风格、动画弹性、
 * 输入聚焦反馈机制都会在毫秒级内自动刷新。这也是 AI 引擎动态拼组 UI 时依赖的数据基础。
 * ==========================================
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DesignTokens, ThemePreset } from '../../types/tokens';
import { INTELLIGENT_WORKSPACE, ALL_PRESETS } from '../../constants/presets';

/**
 * 📝 上下文类型契约：向外公开哪些管理接口
 */
interface DesignTokensContextType {
  activePreset: ThemePreset;  // 当前激活的系统主题标识
  tokens: DesignTokens;        // 当前内存中实际生效的设计令牌字典（包含静态视觉与动态行为）
  setPreset: (preset: ThemePreset) => void; // 用于“一键换肤/一键切换行为模式”的函数
  updateToken: (category: string, key: string, value: string | number | boolean) => void; // 允许在面板或 AI 在线对单个令牌进行微调
  resetToPreset: (preset: ThemePreset) => void; // 重置内存令牌到该主题的官方预设
  getCssVariablesMap: () => string; // 将当前的令牌动态生成标准 CSS 变量文本，便于开发一键复制带走
}

// 创建本系统的核心指令传输通道 (React Context)
const DesignTokensContext = createContext<DesignTokensContextType | undefined>(undefined);

/**
 * 📦 核心供应者组件：包裹整个应用，接管全站的视觉表现与动作规律
 */
export const DesignTokensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. 定义状态量：保存当前的主题标签与具体的令牌配置
  const [activePreset, setActivePreset] = useState<ThemePreset>('intelligent_workspace');
  const [tokens, setTokens] = useState<DesignTokens>({ ...INTELLIGENT_WORKSPACE });

  // 一键切换方案 (深拷贝确保没有任何历史残留和交叉污染)
  const setPreset = (preset: ThemePreset) => {
    setActivePreset(preset);
    setTokens(JSON.parse(JSON.stringify(ALL_PRESETS[preset])));
  };

  // 单个令牌的微调机制 (例如：实时增加输入框圆角，或者将主颜色由红改蓝)
  const updateToken = (category: string, key: string, value: string | number | boolean) => {
    setTokens((prev) => {
      const updated = { ...prev };
      // @ts-ignore
      if (updated[category]) {
        // @ts-ignore
        updated[category] = {
          // @ts-ignore
          ...updated[category],
          [key]: value,
        };
      }
      return updated;
    });
  };

  // 快捷重置
  const resetToPreset = (preset: ThemePreset) => {
    setPreset(preset);
  };

  // 🛠️ 核心方法：动态将数据令牌转换为浏览器可识别的 W3C 标准 CSS Variables。
  // 它能把复杂的数据格式，降解成一行行 `--color-brand` 等级格式，开发直接在 CSS 里用 `var(--color-brand)` 即可。
  const getCssVariablesMap = () => {
    // 根据行为令牌，转换缓动曲线为对应真实的 cubic-bezier 值，方便开发参考
    const curveMap = {
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1) [高反弹果冻弹力)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1) [经典流畅缓动)',
      rigid: 'cubic-bezier(0, 0, 1, 1) [硬朗线型极速)',
    };
    const currentCurve = curveMap[tokens.behaviors.motionCurve] || tokens.behaviors.motionCurve;

    return `/* 
 =========================================================
 🚀 AI-Native Design Runtime - 自动生成的全局设计令牌映射表
 适用：前端开发一键接入、保真还原
 生成时间：2026年 (React.Context 动态导出)
 =========================================================
*/
:root {
  /* 🎨 视觉色彩令牌组 (Colors) */
  --color-brand: ${tokens.colors.brand};
  --color-brand-light: ${tokens.colors.brandLight};
  --color-brand-dark: ${tokens.colors.brandDark};
  --color-bg-page: ${tokens.colors.bgPage};
  --color-bg-card: ${tokens.colors.bgCard};
  --color-bg-input: ${tokens.colors.bgInput};
  --color-text-primary: ${tokens.colors.textPrimary};
  --color-text-secondary: ${tokens.colors.textSecondary};
  --color-text-muted: ${tokens.colors.textMuted};
  --color-text-inverse: ${tokens.colors.textInverse};
  --color-border: ${tokens.colors.border};
  --color-border-focus: ${tokens.colors.borderFocus};
  --color-bg-hover: ${tokens.colors.bgHover};
  --color-bg-active: ${tokens.colors.bgActive};
  --color-bg-disabled: ${tokens.colors.bgDisabled};
  --color-text-disabled: ${tokens.colors.textDisabled};
  --color-border-disabled: ${tokens.colors.borderDisabled};
  --color-icon-primary: ${tokens.colors.iconPrimary};
  --color-icon-secondary: ${tokens.colors.iconSecondary};
  --color-icon-brand: ${tokens.colors.iconBrand};
  --color-focus-ring: ${tokens.colors.focusRing};
  --color-success: ${tokens.colors.success};
  --color-success-bg: ${tokens.colors.successBg};
  --color-error: ${tokens.colors.error};
  --color-error-bg: ${tokens.colors.errorBg};
  --color-warning: ${tokens.colors.warning};
  --color-warning-bg: ${tokens.colors.warningBg};
  --color-info: ${tokens.colors.info};
  --color-info-bg: ${tokens.colors.infoBg};

  /* ✍️ 排版字型令牌组 (Typography) */
  --font-family-heading: ${tokens.typography.headingFont === 'serif' ? '"Playfair Display", Georgia, serif' : tokens.typography.headingFont === 'mono' ? '"JetBrains Mono", Courier, monospace' : '"Inter", sans-serif'};
  --font-family-body: ${tokens.typography.bodyFont === 'mono' ? '"JetBrains Mono", Courier, monospace' : '"Inter", sans-serif'};
  --text-size-sm: ${tokens.typography.sizeSm};
  --text-size-base: ${tokens.typography.sizeBase};
  --text-size-lg: ${tokens.typography.sizeLg};
  --text-size-xl: ${tokens.typography.sizeXl};
  --text-size-2xl: ${tokens.typography.size2xl};

  /* 📐 圆角大小令牌组 (Borders) */
  --radius-none: ${tokens.borders.radiusNone};
  --radius-sm: ${tokens.borders.radiusSm};
  --radius-md: ${tokens.borders.radiusMd};
  --radius-lg: ${tokens.borders.radiusLg};
  --radius-xl: ${tokens.borders.radiusXl};
  --radius-full: ${tokens.borders.radiusFull};

  /* 🗂️ 空气感间距令牌组 (Spacings) */
  --space-xs: ${tokens.spacings.xs};
  --space-sm: ${tokens.spacings.sm};
  --space-md: ${tokens.spacings.md};
  --space-lg: ${tokens.spacings.lg};
  --space-xl: ${tokens.spacings.xl};

  /* 👥 立体光影及投影令牌组 (Shadows) */
  --shadow-none: ${tokens.shadows.none};
  --shadow-sm: ${tokens.shadows.sm};
  --shadow-md: ${tokens.shadows.md};
  --shadow-lg: ${tokens.shadows.lg};

  /* 🌀 交互行为令牌组 (Behaviors) */
  --motion-duration-fast: ${tokens.behaviors.motionDurationFast}ms;
  --motion-duration-normal: ${tokens.behaviors.motionDurationNormal}ms;
  --motion-duration-slow: ${tokens.behaviors.motionDurationSlow}ms;
  --motion-curve-css: ${tokens.behaviors.motionCurve === 'spring' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : tokens.behaviors.motionCurve === 'rigid' ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)'};
  --button-press-scale: ${tokens.behaviors.buttonPressScale};
  --input-focus-ring-enable: ${tokens.behaviors.inputFocusRing ? 1 : 0};
  --modal-dismiss-overlay-enable: ${tokens.behaviors.modalDismissOverlay ? 1 : 0};
  --list-hover-reveal-enable: ${tokens.behaviors.listHoverReveal ? 1 : 0};
}`;
  };

  /**
   * ⚡ React 侦听副作用：每当用户点击调整任何一个设计令牌时，
   * 立即编译并将最新的一组 CSS 变量实时编译注入到 HTML 文档流首部。
   * 这保证了整个页面的原子级变化在不用刷新网页的前提下即时完美渲染！
   */
  useEffect(() => {
    const styleId = 'atomic-design-system-style';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    // 如果没有这个标签，全新开辟
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    // 编译 CSS 变量块
    const cssVariables = `
      :root {
        --color-brand: ${tokens.colors.brand};
        --color-brand-light: ${tokens.colors.brandLight};
        --color-brand-dark: ${tokens.colors.brandDark};
        --color-bg-page: ${tokens.colors.bgPage};
        --color-bg-card: ${tokens.colors.bgCard};
        --color-bg-input: ${tokens.colors.bgInput};
        --color-text-primary: ${tokens.colors.textPrimary};
        --color-text-secondary: ${tokens.colors.textSecondary};
        --color-text-muted: ${tokens.colors.textMuted};
        --color-text-inverse: ${tokens.colors.textInverse};
        --color-border: ${tokens.colors.border};
        --color-border-focus: ${tokens.colors.borderFocus};
        --color-bg-hover: ${tokens.colors.bgHover};
        --color-bg-active: ${tokens.colors.bgActive};
        --color-bg-disabled: ${tokens.colors.bgDisabled};
        --color-text-disabled: ${tokens.colors.textDisabled};
        --color-border-disabled: ${tokens.colors.borderDisabled};
        --color-icon-primary: ${tokens.colors.iconPrimary};
        --color-icon-secondary: ${tokens.colors.iconSecondary};
        --color-icon-brand: ${tokens.colors.iconBrand};
        --color-focus-ring: ${tokens.colors.focusRing};
        --color-success: ${tokens.colors.success};
        --color-success-bg: ${tokens.colors.successBg};
        --color-error: ${tokens.colors.error};
        --color-error-bg: ${tokens.colors.errorBg};
        --color-warning: ${tokens.colors.warning};
        --color-warning-bg: ${tokens.colors.warningBg};
        --color-info: ${tokens.colors.info};
        --color-info-bg: ${tokens.colors.infoBg};

        --font-family-heading: ${tokens.typography.headingFont === 'serif' ? '"Playfair Display", Georgia, serif' : tokens.typography.headingFont === 'mono' ? '"JetBrains Mono", Courier, monospace' : '"Inter", sans-serif'};
        --font-family-body: ${tokens.typography.bodyFont === 'mono' ? '"JetBrains Mono", Courier, monospace' : '"Inter", sans-serif'};
        --text-size-sm: ${tokens.typography.sizeSm};
        --text-size-base: ${tokens.typography.sizeBase};
        --text-size-lg: ${tokens.typography.sizeLg};
        --text-size-xl: ${tokens.typography.sizeXl};
        --text-size-2xl: ${tokens.typography.size2xl};

        --radius-none: ${tokens.borders.radiusNone};
        --radius-sm: ${tokens.borders.radiusSm};
        --radius-md: ${tokens.borders.radiusMd};
        --radius-lg: ${tokens.borders.radiusLg};
        --radius-xl: ${tokens.borders.radiusXl};
        --radius-full: ${tokens.borders.radiusFull};

        --space-xs: ${tokens.spacings.xs};
        --space-sm: ${tokens.spacings.sm};
        --space-md: ${tokens.spacings.md};
        --space-lg: ${tokens.spacings.lg};
        --space-xl: ${tokens.spacings.xl};

        --shadow-none: ${tokens.shadows.none};
        --shadow-sm: ${tokens.shadows.sm};
        --shadow-md: ${tokens.shadows.md};
        --shadow-lg: ${tokens.shadows.lg};

        /* 注入交互行为变量，让 CSS 过渡和动效库 (motion) 能直接捕获 */
        --motion-duration-fast: ${tokens.behaviors.motionDurationFast}ms;
        --motion-duration-normal: ${tokens.behaviors.motionDurationNormal}ms;
        --motion-duration-slow: ${tokens.behaviors.motionDurationSlow}ms;
        --button-press-scale: ${tokens.behaviors.buttonPressScale};
      }

      /* 设计系统高优先级基座样式归位 */
      .token-font-heading {
        font-family: var(--font-family-heading);
      }
      .token-font-body {
        font-family: var(--font-family-body);
      }
      
      /* 让滚动条也优雅兼容色板 */
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: ${tokens.colors.border};
        border-radius: var(--radius-full);
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${tokens.colors.textMuted};
      }
    `;

    styleElement.innerHTML = cssVariables;
  }, [tokens]);

  return (
    <DesignTokensContext.Provider
      value={{
        activePreset,
        tokens,
        setPreset,
        updateToken,
        resetToPreset,
        getCssVariablesMap,
      }}
    >
      <div 
        className="token-font-body min-h-screen transition-all duration-300"
        style={{ 
          backgroundColor: tokens.colors.bgPage,
          color: tokens.colors.textPrimary
        }}
      >
        {children}
      </div>
    </DesignTokensContext.Provider>
  );
};

/**
 * 🔗 自定义 hooks 挂钩组件：给任何子组件获取设计令牌的神器输入口
 */
export const useDesignTokens = () => {
  const context = useContext(DesignTokensContext);
  if (!context) {
    throw new Error('useDesignTokens 必须被部署在 DesignTokensProvider 环境中。');
  }
  return context;
};
