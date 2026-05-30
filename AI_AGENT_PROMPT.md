# 🤖 Atomix UI —— 其它 AI Agent / IDE 助手专属极速适配与低消耗唤醒指南 (.md)
> **编写目的**：当您在 Cursor、Windsurf、VSCode Copilot、Claude Single-File-Agent 或其它 IDE 环境中打开此项目时，**直接将本文档的内容一键复制发给新手 AI 工具**。
> 
> **核心痛点解决**：本指南采用**「零冗余 Token 约束策略」**。无需让第三方 AI 漫无目的地读取整个项目的几十个深层代码文件，只需告诉它去读取 `AI_MANIFEST.json` 和本指南，就能立刻 100% 掌握本设计系统的调性与原子原语拼装契约，极度省钱、省时且绝不跑偏！

---

## 📋 锦囊一：一键复制给其它 AI 的“初始化启动指令” (The Master Prompt)

当您在新的 AI 对话框或者 IDE 侧边栏开启新任务时，**请直接复制以下这段框内的中文指令发送给它：**

```text
你现在是一个极高水准的前端交互设计专家与 React 研发架构师。
当前我们项目使用了一套专为 AI-Native 声明式设计研发的【Atomix UI 规范组件库（五层架构体系）】。

为了【不消耗你的无用上下文 Token、拒绝野生废代码、拒绝样式漂移】，请你严格遵守以下原则进行工作：

1. 🎯 【关键文件定位：只读不猜】
   我们已经在项目中维护了以下核心认知文件，在开始为我实现任何新原型或修改需求前，你仅被允许读取：
   - 配置索引库：/src/components/AI_MANIFEST.json (这里定义了所有合规的原语、Props与枚举值)
   - 哲学指南手册：/src/components/AI_SPECS.md (这里阐释了五层令牌架构的设计原理)

2. 🚫 【三大最高指令与“逃生舱机制”】
   - ⚠️ 【防线一：断绝野生碎代码】严禁随意引入未受控的第三方庞杂UI库。严禁使用写死固化颜色（如 #ef4444）与写死间隙的原生 HTML 标签编写临时拼凑界面。
   - 🧩 【防线二：原语优先】对于标准表单与操作，必须优先调用现成的 `Button`, `Input`, `Dropdown`, `Modal`, `Navbar` 原语。
   - 🚀 【防线三：自由度逃生舱】若当前业务极为特殊、所有原语均不适用（如要写一个高级进度滑块 Slider、SVG 矢量节点或特定排线图表）：
     * 你【可以使用 HTML/SVG 原生节点或 D3/Recharts 编写自定义视图】，但样式必须 100% 挂载全局令牌驱动（例如通过 Tailwind 类目或 `style={{ color: tokens.colors.textPrimary, borderRadius: tokens.borders.radiusMd }}` 动态绑定），绝不脱离设计系统。
     * 你也可以将这套特定需求在 `atoms` 文件夹下有序封装并注册为一个新的高品质受控原语（如 `Slider.tsx`），保证其拥有完整的 4 套风格兼容及统一的 micro-behaviors。
   - 全局响应性：所有的色彩（如边框、焦点）、间距、圆角，由 React Context 中的 `useDesignTokens` 无差支配，当需要微调外观组件样式时，读取 tokens.colors.brand 等标记。

3. 🚀 【开发流支持（声明式渲染）】
   如果你负责为我的主面板生成新的模拟组合或是界面。请【优先尝试输出符合 Layer 5 声明式的 JSON Schema】，也就是遵循 `AI_MANIFEST.json` 下的格式；或是去修改 `/src/components/ScenarioSandbox.tsx` 进行传统的原语组件直接拼装。

现在，请简短回复我：“✨ Atomix UI 契约自锁机制已识别，我已定位相关核心规范文件。请告诉我你需要我为您构建什么场景的原型！”即可。
```

---

## 🗺️ 锦囊二：极速精简 Token 的“文件剪枝阅读地图” (For AI Engine)

如果后续的 IDE 工具有自动检索上下文（如 Cursor `@` 或者 codebase 全局检索）的习惯，它会容易“贪婪”地遍历整个 `/node_modules` 或者是大型编译日志。请直接将下表指引给它，让它对其他代码进行忽略，直奔核心防线：

| 优先级 | 文件路径 | AI 必读核心价值 (对 AI 而言的 Token 转化率) |
| :--- | :--- | :--- |
| **P0: 核心规则核心契约** | `/src/components/AI_MANIFEST.json` | **100% 极高。** 里面写满了每个原子组件接受的所有 Props、Enum 限定、默认值与中文注释，AI 必看！ |
| **P1: 上下文上下文生命源** | `/src/components/base/DesignTokensContext.tsx` | **95% 高。** 这里面有整个视觉调性（Colors、Spacings、Margins、Behaviors）一键切换的逻辑与配置项。 |
| **P2: 物理实体与微动效** | `/src/components/atoms/` 目录 | **60% 中级。** AI 不需要每次都完整遍历其 React 实现。只有当 AI 需要为组件库扩充新的微交互细节，或者微调 framer motion 缓动阻尼时才需要对这个文件夹进行 `view_file`。 |
| **P3: 沙盒环境与动态解析运行时** | `/src/components/ScenarioSandbox.tsx` | **80% 高。** AI 如果想要扩充新的场景、新指令、丰富表单展示、在 Playground 里面加个新的模板，去修改这个文件是非常高效的入口。 |
| **P4: 编译脚本与第三方配置** | `package.json`, `index.html`, `vite.config.ts`, `.gitignore` | **20% 极低。** 除非编译报错或者需要依赖升级安装，否则严禁 AI 主动重写或读取这些，保证开发安全性。 |

---

## 💡 锦囊三：极简优雅的代码交互范式 (Examples for AI Reference)

为了防止其他 AI Agent 虽然知晓规矩，但写出的 React 组件臃肿难看、缺乏呼吸节奏，以下列举两种典型的情景演示：

### ❌ 坏的典型（野生 AI 制造的设计垃圾 —— 零呼吸感、野生样式漂移、无主设计）
```tsx
// ❌ 错误：不使用原语组件、随意捏写乱七八糟的 CSS 阴影、生硬写死无主颜色、不具备主题上下文切换联动
export const BadForm = () => {
  return (
    <div style={{ background: '#ffffff', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#1a1a1a', fontSize: '20px', marginBottom: '15px' }}>输入服务器别名</h3>
      <input type="text" placeholder="随意输入..." style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }} />
      <button style={{ backgroundColor: '#4f46e5', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>提交</button>
    </div>
  )
}
```

### ✅ 好的典型（符合 Atomix UI 精致契约的积木化工程 —— 淡雅呼吸、完全解耦、令牌统一）
```tsx
// ✅ 正确：组件之间不滥用硬线条，通过淡色调（tokens.colors.bgPage）区隔页面，核心视觉与行为属性完美受约！
import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { Button } from './atoms/Button';
import { Input } from './atoms/Input';

export const ElegantForm: React.FC = () => {
  const { tokens } = useDesignTokens();
  const [hostVal, setHostVal] = useState('host-node-01');

  return (
    <div 
      className="p-6 transition-all"
      style={{ 
        backgroundColor: tokens.colors.bgCard, // 跟着设计系统令牌统一缩放变白或暖灰
        borderRadius: tokens.borders.radiusLg, // 大角大调，绝无野生生硬直角
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: tokens.colors.border
      }}
    >
      <h4 
        className="text-md font-bold mb-4 token-font-heading" 
        style={{ color: tokens.colors.textPrimary }}
      >
        云物理容器命名控制台
      </h4>
      
      <div className="space-y-4">
        {/* 单行输入原语组件：内置了错误警醒联动与聚焦阴影 */}
        <Input 
          label="输入服务器唯一主机名 (Hostname)"
          description="后缀会自动关联系统当前子网区，无需手动加入"
          value={hostVal}
          onChange={(e) => setHostVal(e.target.value)}
          placeholder="请输入名字..."
        />

        {/* 基准按钮原语组件：继承自 behaviors.buttonPressScale 微小压下阻尼感 */}
        <Button 
          variant="primary" 
          size="md" 
          onClick={() => alert(`安全拉起主机: ${hostVal}`)}
          className="w-full mt-2"
        >
          确定并连接云端
        </Button>
      </div>
    </div>
  );
};
```

---

## 💎 锦囊四：高成效研发自检 Checklist

不论后续的 AI 工具协助您扩充了几个组件（比如后续可能想增添 `Checkbox`, `Tabs`, `Alert` 分流原语），它必须在完成产出后默念自我审核这四部曲：

1.  **色彩无一野生**：我有手动写过 `#XXXXXX` 或 `rgb()` 这种没有在 `tokens` 中注册的临时颜色吗？如果没有，才是高分。
2.  **动效无一乱用**：所有的打开下拉滑坡、弹窗平滑，均使用的是配合 `tokens.behaviors.motionCurve` 驱动的 `motion/react` 封装吗？
3.  **零多余 DOM 废代码**：所有的界面排布依然能百分之百兼容 Layer 5 级别的 JSON 抽象表示吗？
4.  **12 栅格自适应**：所有的栏目组装，均良好落在了 12 响应式栅格结构内，且没有在宽屏幕上出现失重拉扯吗？
