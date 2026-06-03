# 🗺️ Atomix UI —— AI 自动适配、开发隔离与自我进化超级蓝图手册 (Master Playbook & Agent Directive)

> **文档定位**：本项目（Atomix UI）的**绝对唯一真理源 (Single Source of Truth)**。无论在 Cursor、Windsurf、VSCode Copilot、ChatGPT 还是 Claude 协作环境中，**只要将本手册发给 AI，它就能在 3 秒内 100% 摸清系统规则、在安全隔离区编写业务、自我繁衍新组件，且绝不污染任何核心底层。**
>
> **核心痛点解决**：本手册彻底消灭了“东拼西凑、碎片化查找、多次修改改漏漏改、以及硬改核心库造成坍塌”的野生开发乱象。

---

## 📋 目录导航 (Table of Contents)
- [🧬 第一章：一键初始化主指令 (The Master System Prompt)](#-第一章一键初始化主指令-the-master-system-prompt)
- [🔍 第二章：物理代码仓库解剖图 (Anatomy of Core Files)](#-第二章物理代码仓库解剖图-anatomy-of-core-files)
- [🚧 第三章：高潮保障——业务页面隔离设计模式 (Page Isolation Pattern)](#-第三章高潮保障业务页面隔离设计模式-page-isolation-pattern)
- [🚀 第四章：自由度与标准化——逃生舱机制 (The Escape Hatch Rule)](#-第四章自由度与标准化逃生舱机制-the-escape-hatch-rule)
- [🧩 第五章：自我进化协议——新原语繁衍四步法 (Self-Evolution protocol)](#-第五章自我进化协议新原语繁衍四步法-self-evolution-protocol)
- [💎 第六章：AI 开发自检 Checklist (Dual-Test Prompts)](#-第六章-ai-开发自检-checklist-dual-test-prompts)

---

## 🧬 第一章：一键初始化主指令 (The Master System Prompt)

当您在任何新 IDE 侧边栏或机器人会话中启动对本项目的修改任务时，**请直接全文复制并发送以下灰框指令给 AI：**

```text
你现在是一个极高水准的前端交互设计专家与 React 研发架构师。
我们项目使用了一套专为 AI-Native 声明式设计研发的【Atomix UI 规范组件库（五层体系）】。

为了【不消耗你的无用上下文 Token、拒绝野生碎代码、拒绝样式漂移】，请你严格遵守以下原则进行工作：

1. 🎯 【唯一的认知来源：读不猜】
   在开始为我编写新功能、新组件或业务页面前，你仅被允许读取：
   - 核心主控纲领：/AI_AGENT_PROMPT.md (即本手册)
   - 类型契约文件：/src/types/components.ts (包含所有核心原子组件的最新 TypeScript 接口定义，用于极速了解可用字段)
   - 元素属性配置面：/src/components/AI_MANIFEST.json (包含所有合法 primitives 的 props 交互解释字典)

2. 🚫 【三大研发最高指令】
   - 【防线一：断绝野生碎代码】严禁随意引入未受控的外部第三方庞杂库。严禁在代码中写死颜色 (如 #4F46E5) 与自定义数值，必须无差继承 useDesignTokens。**严禁因特定对齐微调而图省事去硬编码 16 进制颜色。如果缺少特定微状态语义 Slot，必须首先去 /src/types/tokens.ts 的 ColorSet 新增它，接着在 /src/constants/presets.ts 补齐四大预设主题该 Slot，最后在组件中引用！**
   - 【防线二：业务开发隔离】如果是用户新提的业务页面、完整的卡片管理或统计大盘，必须全部写在 /src/views/ 文件夹中。绝对不要在 /src/components/ 下的核心库里随意叠砌业务。
   - 【防线三：开发逃生舱】若遇到特立独行、没有任何原语能套用的高级微操作（如 SVG 节点或 D3 图表），允许使用原生节点，但必须通过 Tailwind 语义类或 tokens 变量绑定样式，绝对保持主题感知。

现在，请简短回复我：“✨ Atomix UI 契约自锁机制已识别，我已定位 Master Playbook 以及隔离开发规范。请告诉我你需要我构建/繁衍什么模块！” 即可。
```

---

## 🔍 第二章：物理代码仓库解剖图 (Anatomy of Core Files)

在开始写第一行代码前，AI **必须** 知晓仓库中现存四大系统模块的精确分工，**严禁乱改底层、严禁把功能逻辑错位放置：**

| 模块文件名 | 物理文件路径 | 核心业务功能与边界 | AI 修改/保护准则 |
| :--- | :--- | :--- | :--- |
| **类型定义契约**<br>`components.ts` | `/src/types/components.ts` | 原子底座核心 Props 接口声明的大一统，供 AI 极速加载、不损耗 Token 获取所有组件字段细节。 | **优先读取。** 严禁在此处写任何具体功能实现；新增通用原子组件必须同步在此增加 TS 契约声明。 |
| **原子原语类**<br>`Button / Input / Dropdown` | `/src/components/atoms/*` | 系统的核心肌肉与关节。提供带微动效、 loading 阻断、错误校验的纯净基础原语。 | **保护为主。** 除非用户明确要求“完善/扩展该原语自身的交互细节”，否则平时业务开发绝对禁止改动。 |
| **全局令牌源**<br>`DesignTokensContext` | `/src/components/base/*` | 整个设计系统的血液与灵魂。定义了 4 款主题（极客现代、冷酷极客、复古暖纸、软萌糖果）的颜色、圆角、字重、回弹曲线及安全机制。 | **只读严禁覆盖。** 新增组件时只需调用 `useDesignTokens` 取值，不能私自改写现有 4 套主题的基础配方。 |
| **核心工坊面板**<br>`ShowcasePanel.tsx` | `/src/components/ShowcasePanel.tsx` | "原子组件工坊(Atoms)" 工作区的纯物理实现，渲染所有 Atoms 的 Props 调节表和状态测试，供设计师直观微调。 | **专职测试面板。** 后续如果物理繁衍了新原语，可在此增添原语的测试项。平时绝对禁止在此写业务视图。 |
| **变量配置面板**<br>`DesignTokenPanel.tsx` | `/src/components/DesignTokenPanel.tsx` | "全局令牌配置(Tokens)" 工作区，将 Context 里的各项数值以高级可视化、代码框导出方式呈报出来，供 UI 验收。 | **工具性只读面板。** 仅当令牌系统的数据结构整体重构时才允许进行微量属性对接，禁止在此干涉组件。 |
| **实战拼装沙盒**<br>`ScenarioSandbox.tsx` | `/src/components/ScenarioSandbox.tsx` | "实战拼装沙盒(Sandbox)"。内置了一个经典的“云容器实例初始化表单”拼装实战，并提供了一个可以通过 **声明式 JSON Schema** 直接转 React 页面及 Prompt 校验的运行时机器。 | **示例级拼装。** 这里可以修改或新增 JSON 协议运行模板，用以向高层汇报“标准件复用率”。业务页面严禁挤在这里。 |
| **标准协作规范**<br>`FrameworkDocs.tsx` | `/src/components/FrameworkDocs.tsx` | "集成设计规范(Blueprint)"，将 PM-UI-DEV 三端协作共识表格化呈现，阐述无缝对接理论。 | **文档面板。** 纯静态，极少需要改动。 |

---

## 🚧 第三章：业务页面隔离设计模式 (Page Isolation Pattern)

这是回答 **“在实际业务中想编写一个新页面（例如用户大盘、实例监控中心、历史账单等）需要写在什么地方，怎么生效，才不污染现有组件库系统？”** 的终极方案。

### 1. 【隔离开发金律】
- **所有后续新编写的高保真业务功能、完整管理模块、全栈功能卡片，一律创建在 `/src/views/` 目录下！** （如：`/src/views/MyBusinessDashboard.tsx`）
- 严禁在 `/src/components/` 的任意地方、或是核心原语 `atoms` 文件夹下揉捏、撰写带着临时接口、特定逻辑的业务性大型组件。

### 2. 【主动挂载打通预览（Auto-Wiring Gold Rule - MANDATORY）】
- **【绝不容忍代码孤岛】**: 无论后续你在 `/src/views/` 目录下创办、编写了什么全新的定制化业务高保真面板（如：`NetworkGraphEditModal.tsx` 或实例详情页）：**你必须把“主动挂载预览”视为你的绝对自觉义务，无需等待用户请示或下令！**
- **【标准两部曲主动落地】**:
  - **第一步 [物理落地]**: 确保你的 React 页面完全编写在独立的 `/src/views/` 目录下（如 `/src/views/NetworkGraphEditModal.tsx`）。
  - **第二步 [大盘注册]**: 立即、直接修改中央视图分发控制器 => `/src/views/index.tsx`，在 `VIEWS_REGISTRY` 列表中将刚才物理落地的新组件执行 Named Import，并提供对应的 `id`、`name`（如：网络图信息修改弹窗）、`desc` 描述、以及标签（如 `badge` 等），让其无感登记。
- **【极速演示规范】**:
  当你修改完后，请在最终回复中，自信且清晰地引导用户：“✨ 我已经将刚才为您编写的【XXXX 页面】自动挂载并打通了预览入口。您现在可以在左侧导航栏中切换到 **页面业务沙盒 (Page Sandbox)**，目录底部的目录树将自动转为沙盒页面列表。点击列表中的 **‘XXXX’** 即可立刻零门槛、零断层渲染查验！”

这样，原本散落在四周的业务功能拥有了绝对集中且平滑的展示舞台，且目录树会随着导航选项智能变化（如组件库下显示原子组件及搜索，页面业务沙盒下则实时转换为自定义业务大盘及描述搜索，点击即可右侧秒级渲染预览）。底层的所有 Atoms 库（没有杂质）随时允许作为独立的 pure packages 导出或发布，清爽解耦！

---

## 🚀 第四章：自由度与标准化——逃生舱机制 (The Escape Hatch Rule)

我们不希望由于“过度的标准化约束”扼杀业务页面对非对称、灵活多变高保真视觉效果的追求。本规范支持完美自锁的 **逃生舱机制 (Escape Hatch)**：

```
                    【面临研发场景分类判断】
                               |
            +------------------+------------------+
            |                                     |
    【标准基础表单/交互】                 【特殊非常规复杂视觉】
    (Input, Button, Dropdown)         (如 拓扑 SVG、D3 曲线、数字连线)
            |                                     |
            v                                     v
    【强制走标准 Atoms 轨道】               【进入逃生舱通道 (Escape Hatch)】
    * 拼装 AI_MANIFEST.json             * 自由使用原生 HTML5 / SVG / D3。
    * 自愈微交互体验                     * 样式绑定：必须与 tokens 令牌深度咬合。
    * 支持一键 4 主题无差切变。             * `style={{ color: tokens.colors.brand }}`
```

### 🔓 逃生舱实操范例
如果你要编写一个极其特殊的百分比进度滑块，当前的 `Input` 和 `Button` 做不出来：
1. **允许通过 HTML 拼装自定义的交互结构**。
2. **样式契约锁定**：绝对**不允许**写：`<div className="rounded-lg border border-slate-200 text-blue-600 bg-white shadow-xl">`（这些在黑色主题或糖果主题下会显得混乱）。
3. **正确解法**：
   ```tsx
   import { useDesignTokens } from '../components/base/DesignTokensContext';
   
   export const FancySlider = () => {
     const { tokens } = useDesignTokens();
     return (
       <div 
         className="p-4 transition-all"
         style={{
           backgroundColor: tokens.colors.bgCard, // 卡片表面一律随主题底色变白或微暖
           border: `1px solid ${tokens.colors.border}`,
           borderRadius: tokens.borders.radiusMd // 圆角一律随主题变锐或极圆润
         }}
       >
         <span style={{ color: tokens.colors.textPrimary }}>滑动进度</span>
         {/* 原生滑块，但配色死锁 */}
         <input 
           type="range" 
           style={{ accentColor: tokens.colors.brand }} // 品牌点缀随之缩放
         />
       </div>
     );
   }
   ```

---

## 🧩 第五章：自我进化协议——新原语繁衍四步法 (Self-Evolution protocol)

当用户的诉求需要我们在底层 Atoms 库中繁殖一个真正的高品质通用基建原语时（如：后续可能需要增添的 `Badge.tsx`, `Checkbox.tsx` 等），AI 必须严格执行以下四步强事务，**错一步、少一步均被判为进化失败。**

### 1. 双契约先行 (Dual-Contract First)
在真正落地物理文件前，必须率先在以下两个控制中心登记，形成声明契约：
- **TS 类型契约登记**：在 `/src/types/components.ts` 中新增该原语对应的 TypeScript `interface` Props 接口（作为标准类型契约，供后续开发快速查阅）；
- **JSON 交互契约登记**：在 `/src/components/AI_MANIFEST.json` 的 `"components"` 列表中追加属性元数据与交互描述解释（作为沙盒和 JSON 动态拼装的依据）。

### 2. 物理繁衍 (Physical Creation)
在 `/src/components/atoms/` 下，建立符合类型约束且拥有中文交互保姆注释的 `.tsx` 实体：
- 首行 Named Import，绝不使用 `import type` 引用 TS Enums。
- 导入并解析 `useDesignTokens`，将配色、字体字重、动画回弹曲线应用到其视图层实现，绝对做到多品牌一秒兼容。

### 3. 运行时挂载 (Runtime Mapping)
由于系统具有 Layer 5 声明式渲染的实战沙盒特性，你必须在 `/src/components/ScenarioSandbox.tsx` 中的渲染匹配分支（如 `parseDeclarativeElement` 函数）内注册新写原语的翻译动作，好让它支持模拟 Prompt 实时生成和展示。

### 4. 编译闭环校验 (Verify & Lint)
不把带病的组件留给用户，本地静静运行：
- `npm run lint` 或者 `tsc --noEmit`，100% 确认无挂载引用脱节、无多余未引用变量，保证合并干净流畅。

---

## 💎 第六章：AI 开发自检 Checklist (Dual-Test Prompts)

作为对自己的极限把关，所有协助开发的 IDE 助手在告知用户开发完毕前，**必须自己在心中默念并验证完毕以下 4 道自测防线，才算金牌交付：**

1. 🎯 **「颜色血统度量与无硬编码自保」**：在查看刚才修改和增补的文件时，里面包含任何硬编码色彩（如 `#ef4444` `rgb()` `bg-[#333]`）或者是硬定义圆角（如常规的 `rounded-[10px]`）吗？如果有，请立刻使用 `tokens` 变量或 Tailwind 标准通用原子阶梯类进行覆盖。**如果需要对齐微调某个底色、边色或特定状态色而全局令牌库缺失该 Slot：你有没有偷懒硬编码？你必须撤回并贯彻「修改 tokens.ts => 补充四大 presets.ts => 引用引用 tokens」的物理三步走自闭锁进化！**
2. 🔀 **「死锁回弹测定」**：引入的动画是否在甜美糖果与经典黑白主题下，正确调用了 `tokens.behaviors.motionCurve` 做阻尼自适应？在终端运行时是否有卡顿与 HMR 崩裂报错？
3. 📦 **「非侵入隔离审查」**：新页面是不是干干净净地呆在独立的 `/src/views/` 文件夹下？它的样式变化对于其他不相关的组件测试面、文档面是不是没有任何溢出和挤压？
4. 🚀 **「双校验指示灯」**：`tsc --noEmit` 打包有没有发生任何 ts 类型报错与变量未定义遗漏？

---

> 🎉 **恭喜，开启你在这套美妙而优雅的 AI-Native 五层架构下的创作之旅吧！**
