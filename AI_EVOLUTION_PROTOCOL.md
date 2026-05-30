# 🧬 Atomix UI —— AI 自动繁衍与自我进化契约协议 (Self-Evolution & Extension Protocol)
> **面向受众**：任何具有代码生成、文件增改、组件库重构能力的 AI Agent / IDE 自动助手 (如 Cursor, Windsurf, Claude Engineer 等)。
> **协议目的**：为 AI 提供一套自我证明、零差错、绝不污染母体的「新组件繁衍闭环协议」，确保 AI 在为本项目增加新原子原语（如 Checkbox, Slider, Badge, Tabs 等）时，100% 保持多风格兼容性、编译通畅并在后台注册表中同步生效，杜绝“改了代码忘记改配置”的偏瘫式突变。

---

## 🗂️ 核心痛点：为什么 AI 随意拼装会导致“库污染”与“偏瘫式演进”？

在协作开发中，新手 AI 在“自我进化和繁殖”新组件时极容易犯以下三种错：
1. **【基因孤立】**：只在 `src/components/atoms/` 下写了一个 `Badge.tsx`，但没有在 `AI_MANIFEST.json` 中配置它。导致下游的 Layer 5 声明式 JSON 解析引擎完全不知道有这个组件，渲染报错。
2. **【令牌脱钩】**：在实现新组件时图省事，写死了 `className="bg-blue-500 rounded-md shadow-md"`。一旦用户把系统主题切换成「冷酷极客（Brutalist Terminal）」，全站按钮、弹窗都变成了直角黑白，而这个新组件依然带着圆角和亮蓝色，瞬间穿帮。
3. **【单点修改，多处坍塌】**：修改了某个公共上下文文件，却忘记对使用了该上下文的其它所有历史原语进行同步更新，造成系统编译中断挂起。

---

## 🛡️ 自动繁衍的“四大黄金工序” (The 4-Step Propagation Protocol)

当用户对 AI 下达：*“帮我扩充一个 **[新组件名，例如 Tabs 标签页]** 组件并收归到系统中”* 时，AI **必须且只能** 严格按照以下 4 步流程咬合前进：

```
+-----------------------------------------------------------------+
|  1. 契约先行 (Contract First)                                   |
|     先在 /src/components/AI_MANIFEST.json 里生命新组件的 JSON Schema  |
+-----------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|  2. 物理繁衍 (Physical Creation)                                 |
|     在 /src/components/atoms/ 创建 TSX 文件，首行挂载 useDesignTokens  |
+-----------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|  3. 运行时挂载 (Runtime Mapping)                                 |
|     在 /src/components/ScenarioSandbox.tsx 里注册该新组件的反射解析器 |
+-----------------------------------------------------------------+
                                |
                                v
+-----------------------------------------------------------------+
|  4. 编译闭环校验 (Compile & Lint check)                           |
|     运行 tsc 和 linter，100% 验证没有冗余/缺失的 import 与类型报错     |
+-----------------------------------------------------------------+
```

---

## 📝 详细实操规范说明与代码蓝图 (Step-by-Step Blueprint)

### 第一步：契约先行 —— 修改 `/src/components/AI_MANIFEST.json`
在 `"components"` 对象树的末尾，新增欲繁衍组件的规范元数据。**这行元数据是让其它 AI、可视化搭建系统读懂它的唯一依据：**

```json
// 示例：AI 在 AI_MANIFEST.json 尾部追加 Tabs 的注册声明
"Tabs": {
  "tag": "div",
  "category": "Navigation",
  "description": "高弹性的轻量选项卡控制原语。支持 4 套风骨主题下横线滑动呼吸定位与全宽适配。",
  "props": {
    "options": {
      "type": "Array<{ label: string, value: string }>",
      "required": true,
      "description": "供切换的面板候选项数组"
    },
    "activeValue": {
      "type": "string",
      "required": true,
      "description": "当前高亮激活选项的 value 值"
    },
    "onChange": {
      "type": "Function (value => void)",
      "required": true,
      "description": "切换选项卡时的通知回调"
    }
  }
}
```

### 第二步：物理繁衍 —— 创建 `/src/components/atoms/[ComponentName].tsx`
创建新物理组件时，**首行必须引入 `useDesignTokens`**。以下为高分标准繁衍模板（以 Tabs 标签页组件为例）：

```tsx
import React from 'react';
import { motion } from 'motion/react'; // 统一使用 motion/react 做微动效，防止动画库碎片化
import { useDesignTokens } from '../base/DesignTokensContext';

export interface TabsProps {
  id?: string;
  options: Array<{ label: string; value: string }>;
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  id,
  options,
  activeValue,
  onChange,
  className = '',
}) => {
  const { tokens } = useDesignTokens();

  return (
    <div
      id={id}
      className={`flex items-center space-x-1 p-1 ${className}`}
      style={{
        backgroundColor: tokens.colors.bgInput, // 绝对不脱离系统背景色
        borderRadius: tokens.borders.radiusMd,  // 跟着系统变直角或圆角
      }}
    >
      {options.map((opt) => {
        const isActive = opt.value === activeValue;
        return (
          <button
            key={opt.value}
            id={`tab-btn-${opt.value}`}
            onClick={() => onChange(opt.value)}
            className="relative px-4 py-2 text-sm font-medium transition-colors focus:outline-none"
            style={{
              color: isActive ? tokens.colors.brand : tokens.colors.textMuted,
              fontFamily: tokens.fonts.fontSans,
            }}
          >
            <span className="relative z-10">{opt.label}</span>
            
            {/* 使用行为令牌中的缓动曲线 (motions.motionCurve) 与反馈时长驱动滑块动画 */}
            {isActive && (
              <motion.div
                layoutId={`active-tab-indicator`}
                className="absolute inset-0 z-0 shadow-sm"
                style={{
                  backgroundColor: tokens.colors.bgCard,
                  borderRadius: `calc(${tokens.borders.radiusMd} - 4px)`,
                }}
                transition={{
                  type: tokens.behaviors.motionCurve === 'spring' ? 'spring' : 'tween',
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
```

### 第三步：运行时挂载 —— 修改 `/src/components/ScenarioSandbox.tsx`
必须在声明式 UI 解析解析引擎中，将这个新繁衍的角色登记挂钩：

1. **导入组件**：
   ```tsx
   import { Tabs } from './atoms/Tabs'; // 正确 Named Import
   ```
2. **在 RenderElement 映射树中注册分配**：
   ```tsx
   // 在 ScenarioSandbox.tsx 的渲染匹配分支 (如 parseDeclarativeElement) 中挂载：
   case 'Tabs':
     return (
       <Tabs
         key={element.id}
         id={element.id}
         options={element.props.options || []}
         activeValue={element.props.activeValue}
         onChange={(val) => handleDynamicAction(element.id, 'change', val)}
         className={element.props.className}
       />
     );
   ```

### 第四步：编译闭环校验
严禁在此刻通知用户“我已经写好了，但不知道能不能运行”。**AI 必须亲自在 IDE 终端或通过工具链确认这两项指标：**
- 运行 `tsc --noEmit` 校验所有导入依赖、Type 属性完全咬合无缺失。
- 运行项目的 linter，确认没有任何未使用的变量和语法污染。

---

## 🔍 后续 AI 如何自检“繁衍纯度” (Self-Test Prompts)

在提交合并（Commit）代码前，AI 必须向自己提问这四个问题并全部通过，否则立刻自行修正：

1. **“如果我的新组件在冷酷极客（Brutalist Terminal）主题下看，是不是也呈现干净的直角与黑白，而不是生硬留存着亮色的圆角阴影？”** (✅ 通过标准：所有圆角、阴影、背景色变量均是通过 `tokens` 获取的)
2. **“我是不是漏掉了 `AI_MANIFEST.json` 契约文件的注册导致新组件成了局外人？”** (✅ 通过标准：已经在 JSON 字典里加上了完整的组件属性和描述)
3. **“我有没有添加新的外部庞大 `npm` 依赖？”** (✅ 通过标准：除非万不得已并征得用户同意，否则只允许使用系统内原配提供的标准依赖（如 `@tailwindcss/vite`, `motion/react`, `recharts` 等）)
4. **“如果用户把当前的全部 4 种风格彻底抹去 3 种、只剩 1 种进行优化，我的组件会报 Undefined 错误吗？”** (✅ 通过标准：不会，核心代码只依赖基准 `tokens` 的属性流，不和具体的风格名字硬写死绑定)
