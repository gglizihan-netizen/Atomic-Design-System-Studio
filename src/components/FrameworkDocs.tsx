import React from 'react';
import { useDesignTokens } from './base/DesignTokensContext';
import { BookOpen, Code2, Link, CheckCircle, Smartphone, Users } from 'lucide-react';

export const FrameworkDocs: React.FC = () => {
  const { tokens } = useDesignTokens();

  return (
    <div className="space-y-6" id="framework-docs-panel">
      {/* Overview Card */}
      <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
        <h2 className="text-md font-bold text-slate-800 flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          原子化设计系统：代码构建、业务消费与多端同步全链路方案
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed font-normal">
          针对产品经理与 UE/UI 设计师关于「如何构建一套真正能落地、具有高可维护性和风格一致性组件库」的提问，
          以下为您总结的原子化组件库的最佳实践模式及其预览/审计方案。
        </p>
      </div>

      {/* Grid of the 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b pb-2 border-slate-100">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Code2 className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. 代码应该怎么写才能利于后续调用？
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-normal">
            <p>
              为了满足多产品、多业务的高效复用，组件的代码书写必须遵循以下<strong>四大原子规范原则</strong>：
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>样式与逻辑解耦，变量先行：</strong>所有的边角弧度、外框颜色、行高边距等，
                绝对不可以写死为固定 px。必须利用 <strong>CSS 变量 (CSS Custom Properties)</strong> 作为中间介质，
                如 <code>var(--radius-md)</code>。这样业务在调用组件时，只需动态挂载不同的预设样式表，
                同一个 <code>&lt;Button /&gt;</code> 就能瞬间从“极简直角风”切换为“圆润马卡龙风”。
              </li>
              <li>
                <strong>继承原生 HTML5 底层协议：</strong>React 组件属性声明推荐扩展原生 <code>HTMLAttributes</code>。
                例如 <code>interface ButtonProps extends React.ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</code>，
                不给开发者制造额外的二次心智负担。
              </li>
              <li>
                <strong>状态微交互内置封装：</strong>将 <code>Loading</code>、<code>Disabled</code>、
                <code>Hover</code> 等高频交互反馈直接封装至原子底层。业务端只需传一个 <code>isLoading=true</code>，
                即可全自动接管按钮的加载动画和点击遮挡动作。
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b pb-2 border-slate-100">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Link className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. 业务后续要如何调用与消费？
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-normal">
            <p>
              业务开发在消费组件库时，采用<strong>无感侵入式引入</strong>：
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>全局上下文注入：</strong>在系统最外层 Shell 模块（如 <code>App.tsx</code>）
                使用 <code>&lt;DesignTokensProvider&gt;</code> 统一包裹。这样所有深层嵌套的子组件
                均可以全天候侦听配色变动，确保不会遗失色彩层级。
              </li>
              <li>
                <strong>直观的 ESM 按需加载：</strong>
                <code>{"import { Button, Input, Dropdown } from 'core-design-system'"}</code>，
                只需通过命名导入，开发无需关注其内部的 SVG 选型、聚焦环宽度计算等复杂细节。
              </li>
              <li>
                <strong>灵活变体覆盖：</strong>组件支持简单的语义化变体，如 <code>variant="outline"</code>
                或 <code>size="lg"</code>，直接对焦 Figma 设计稿中的 Component Set 设置，命名达成高度的绝对一致。
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b pb-2 border-slate-100">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <CheckCircle className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              3. 如何在平台中预览以供审核与验收？
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-normal">
            <p>
              针对产品、设计与前端团队对一致性的共同监管诉求，预览审核必须具备<strong>两级闭环验证</strong>：
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>一级：孤立组件沙盒 (Sandboxed Component Explorer) —— 即本工作台的“核心组件工坊”</strong>
                <p className="mt-1 text-[11px] text-slate-400">
                  支持产品与 UE 团队单独拉拉条、点点开关、开启禁用或缓冲，逐一验收原子的边缘状态。
                </p>
              </li>
              <li>
                <strong>二级：实战模拟组装区 (Scenario Prototype Sandbox) —— 即本工作台的“实战沙盒区”</strong>
                <p className="mt-1 text-[11px] text-slate-400">
                  让原子组合拼装为诸如云控制台表单、登录中心等实操业务。在此处调节令牌，
                  检查整个页面是否依然能达成完全的一致性（圆角节奏是不是等比例缩放、大阴影是否冲突等）。
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b pb-2 border-slate-100">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              4. Figma-to-Code 设计与研发双向一致性
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed font-normal">
            <p>
              为了彻底打破「设计规范写在 PDF 里、组件散落在业务里」的行业顽疾，推荐搭建<strong>全双向同步机制</strong>：
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong> Figma Variables 绑定：</strong>设计团队在 Figma
                中创建与代码完全重合、英文拼写一字不差的本地变量 (如 <code>color-brand</code>、<code>radius-md</code>)。
              </li>
              <li>
                <strong>JSON 规范自动化消费：</strong>利用 Figma Token Studio 插件，一键直接将 Figma 变量导出为
                <code>tokens.json</code>。开发系统编写一个简易构建脚本(如 Style Dictionary)，将 JSON
                在打包发布时自动拉取并解构翻译为我们工作台底部的 <code>:root</code>
                变量代码，实现产品定义和开发落地 100% 同源绑定。
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conclusion Flow */}
      <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
        <h4 className="text-xs font-bold text-indigo-800 mb-2">💡 专家点评总结：</h4>
        <p className="text-[11px] text-indigo-950 font-normal leading-relaxed">
          一个完美的一致性系统绝非仅仅指「所有页面都用同一个卡片外框」，而是<strong>「所有组件的间隙、圆角与色彩的律动均受同组参数驱动」</strong>。
          通过当前这套具备原子级令牌的组件方案（包含按钮、输入等高频微交互），我们已经探索并证明：
          <strong>只要限制核心逻辑、暴露基础变量，开发即能通过积木方式任意组合出 100% 一致的高保真运行级原型。</strong>
        </p>
      </div>
    </div>
  );
};
export default FrameworkDocs;
