import React from 'react';
import { useDesignTokens } from './base/DesignTokensContext';
import { ThemePreset } from '../types/tokens';
import { Palette, Type, Square, Layout, Sparkles, Copy, Check } from 'lucide-react';

export const DesignTokenPanel: React.FC = () => {
  const { tokens, activePreset, setPreset, updateToken, getCssVariablesMap } = useDesignTokens();
  const [copied, setCopied] = React.useState(false);

  const presetsList: { id: ThemePreset; name: string; desc: string; colors: string[] }[] = [
    {
      id: 'swiss_modern',
      name: 'Swiss Modern',
      desc: '精准理性、黑白灰蓝、小圆角',
      colors: ['#0F2C59', '#F8FAFC', '#0F172A', '#E2E8F0'],
    },
    {
      id: 'tech_mono',
      name: 'Terminal Mono',
      desc: '单色黑客、极窄间隙、直角锋利',
      colors: ['#10B981', '#090D16', '#F3F4F6', '#1F2937'],
    },
    {
      id: 'editorial_warm',
      name: 'Editorial Warm',
      desc: '人文学学风、象牙黄、温润红与衬线体',
      colors: ['#7C1C1C', '#FCFBF6', '#291811', '#E8E5DD'],
    },
    {
      id: 'sweet_rounded',
      name: 'Sweet Rounded',
      desc: '活泼可爱、大曲率气泡、软萌清爽',
      colors: ['#8B5CF6', '#FAF5FF', '#3B0764', '#E9D5FF'],
    },
  ];

  const handleCopyCss = () => {
    navigator.clipboard.writeText(getCssVariablesMap());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6" id="design-token-panel">
      {/* Target Presets Selection */}
      <div className="p-5 bg-white border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          全局设计风格预设 (Global Preset)
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-normal">
          一键切换全局基础设计语言，原子组件及其交互逻辑将自动适应所有属性继承。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {presetsList.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => setPreset(preset.id)}
                className={`p-3.5 text-left rounded-lg border transition-all relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/10 shadow-sm ring-1 ring-indigo-500'
                    : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isSelected ? 'text-indigo-600' : 'text-slate-800'}`}>
                    {preset.name}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-full font-medium">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{preset.desc}</p>
                <div className="flex gap-1.5 mt-2.5">
                  {preset.colors.map((c, i) => (
                    <span
                      key={i}
                      className="w-4 h-4 rounded-full border border-slate-200/50 shadow-xs inline-block"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Token Customizer Grid */}
      <div className="p-5 bg-white border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-sm font-semibold text-slate-850 flex items-center gap-2">
            <Palette className="w-4 h-4 text-indigo-500" />
            基础全局令牌配置 (Atomic Token Values)
          </h3>
          <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 text-slate-500 rounded">
            v1.0.0
          </span>
        </div>

        {/* Categories of Design Tokens */}
        <div className="space-y-6">
          {/* Colors Category */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> 元素主色与容器背景
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Brand Primary (主色调)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
                    value={tokens.colors.brand}
                    onChange={(e) => updateToken('colors', 'brand', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 text-xs border rounded-md px-2 font-mono"
                    value={tokens.colors.brand}
                    onChange={(e) => updateToken('colors', 'brand', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Brand Hover (悬浮态)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
                    value={tokens.colors.brandLight}
                    onChange={(e) => updateToken('colors', 'brandLight', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 text-xs border rounded-md px-2 font-mono"
                    value={tokens.colors.brandLight}
                    onChange={(e) => updateToken('colors', 'brandLight', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Page Canvas (页面背景)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
                    value={tokens.colors.bgPage}
                    onChange={(e) => updateToken('colors', 'bgPage', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 text-xs border rounded-md px-2 font-mono"
                    value={tokens.colors.bgPage}
                    onChange={(e) => updateToken('colors', 'bgPage', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Card Component (卡片背景)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    className="w-8 h-8 rounded border border-slate-200 cursor-pointer p-0"
                    value={tokens.colors.bgCard}
                    onChange={(e) => updateToken('colors', 'bgCard', e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 text-xs border rounded-md px-2 font-mono"
                    value={tokens.colors.bgCard}
                    onChange={(e) => updateToken('colors', 'bgCard', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography Tokens */}
          <div className="border-t pt-4 border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> 字体设定 (Typography Profiles)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5 flex items-center justify-between">
                  <span>标题字体 (Heading)</span>
                </label>
                <select
                  value={tokens.typography.headingFont}
                  onChange={(e) => updateToken('typography', 'headingFont', e.target.value)}
                  className="w-full text-xs border rounded-md px-2.5 py-1.5 bg-white cursor-pointer"
                >
                  <option value="sans">Sans (现代无衬线 / Inter)</option>
                  <option value="serif">Serif (优雅衬线 / Playfair)</option>
                  <option value="mono">Mono (极客等宽 / JetBrains)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  内容正文字体 (Body Line)
                </label>
                <select
                  value={tokens.typography.bodyFont}
                  onChange={(e) => updateToken('typography', 'bodyFont', e.target.value)}
                  className="w-full text-xs border rounded-md px-2.5 py-1.5 bg-white cursor-pointer"
                >
                  <option value="sans">Sans Standard (标准可读)</option>
                  <option value="mono">Mono Technical (等宽数字感)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Spacing & Radii Scale */}
          <div className="border-t pt-4 border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5" /> 圆角 & 尺寸比例 (Radii & Spacings)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center justify-between">
                  <span>微圆角 (radius-sm)</span>
                  <span className="font-mono text-[10px] text-indigo-500">{tokens.borders.radiusSm}</span>
                </label>
                <input
                  type="text"
                  className="w-full text-xs border rounded-md px-2 py-1.5"
                  value={tokens.borders.radiusSm}
                  onChange={(e) => updateToken('borders', 'radiusSm', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center justify-between">
                  <span>中圆角 (radius-md - 核心元素)</span>
                  <span className="font-mono text-[10px] text-indigo-500">{tokens.borders.radiusMd}</span>
                </label>
                <input
                  type="text"
                  className="w-full text-xs border rounded-md px-2 py-1.5"
                  value={tokens.borders.radiusMd}
                  onChange={(e) => updateToken('borders', 'radiusMd', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center justify-between">
                  <span>内边距-小 (space-sm)</span>
                  <span className="font-mono text-[10px] text-indigo-500">{tokens.spacings.sm}</span>
                </label>
                <input
                  type="text"
                  className="w-full text-xs border rounded-md px-2 py-1.5"
                  value={tokens.spacings.sm}
                  onChange={(e) => updateToken('spacings', 'sm', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center justify-between">
                  <span>内边距-中 (space-md)</span>
                  <span className="font-mono text-[10px] text-indigo-500">{tokens.spacings.md}</span>
                </label>
                <input
                  type="text"
                  className="w-full text-xs border rounded-md px-2 py-1.5"
                  value={tokens.spacings.md}
                  onChange={(e) => updateToken('spacings', 'md', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Export Token Definitions Box */}
      <div className="p-5 bg-slate-900 text-slate-300 rounded-xl shadow-lg border border-slate-800">
        <div className="flex items-center justify-between border-b pb-3 border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-semibold text-white">CSS Variables Variables Export (设计语言导出)</h4>
          </div>
          <button
            onClick={handleCopyCss}
            className="flex items-center gap-1.5 py-1 px-2.5 text-[11px] font-medium rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> 已复制!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> 复制配置
              </>
            )}
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mb-3 select-none leading-relaxed">
          将以下 CSS Token 复制并在项目中加载到全局 <code>:root</code> 下，即可在
          Figma-to-Code、或者直接结合 Tailwind Class 中使用以下变量，实现团队开发视觉规范强一致!
        </p>
        <pre className="text-[10px] font-mono bg-slate-950/80 p-3 rounded border border-slate-800 max-h-56 overflow-y-auto whitespace-pre leading-5 text-indigo-300">
          {getCssVariablesMap()}
        </pre>
      </div>
    </div>
  );
};
export default DesignTokenPanel;
