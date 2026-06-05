# .windsurfrules - Atomix UI 开发智能自锁与令牌契约守则

# ============== AI 认知底线：Atoms SDK 物理二进制封印协议 (MANDATORY) ==============

- **【物理黑洞红线 (Hardware-Sealed SDK - CRITICAL)】**: 
  `/src/components/atoms/*` 下的所有代码，在逻辑上属于“已预编译好的闭源二进制套件 (Compiled *.dll / *.so)”。
  你手头的 `view_file`、`glob`、`read`、`grep` 等所有工具**在物理 和 架构上被绝对禁止触碰该文件夹下的任何代码**。
  哪怕只是执行一次 `Glob src/components/atoms/*.tsx` 或 `Read src\components\atoms\*.tsx`，都将直接被底层沙箱与编译器逻辑判定为 **"系统底层内存指针越界 (General Protection Fault - Segmentation Fault)"**，会导致你本次任务交付直接被用户零分退回！

- **【核心可用 24 组件白名单 (Allowed Primitives Only)】**:
  系统只且仅提供以下 24 个全量实现的底座/原子组件：
  👉 `AppLayout`, `Sidebar`, `Navbar`, `Card`, `Button`, `Input`, `Dropdown`, `Modal`, `Tag`, `Table`, `List`, `Icon`, `Breadcrumb`, `Pagination`, `Steps`, `Tabs`, `DatePicker`, `Slider`, `Progress`, `Loading`, `Alert`, `Toast`, `ImageViewer`, `Skeleton`
  ⚠️ **禁凭空捏造**：除了以上 24 个组件，任何其他想当然的拼写（如 `Badge`, `Avatar`, `Box` 等）在系统中均不存在！严禁凭程序员直觉猜测任何非白名单组件。
- **【精简查找规范】**:
  1. 如果你要获知组件的 **接口 Props、可选参数、回调方法**：你**必须且仅被允许**读取统一契约文件 => `/src/types/components.ts` 或者是规范文件 => `/src/components/AI_MANIFEST.json`。
  2. 这两个契约文件（只有几十行纯类型）已经对系统中所有标准组件（如 `Button`, `Input`, `Dropdown`, `Modal`, `Navbar`等）做好了 100% 的契约参数覆盖。 

- **【排错生命周期标准决策流 (Correct Troubleshooting Decision Pathway)】**:
  若在开发中遇到编译报错、TS 类型缺失、接口变动、或者不确定组件支持哪些 Props 时，你已经被“物理剥夺”了查看底层 `.tsx` 实体源文件的权限。你必须且只能采取以下 3 步闭环路线：
  1. **第一步 [自查契约]**: 立即检索统一类型契约文件 => `/src/types/components.ts`（这里已经 100% 对齐了 24 个可用组件的 Props 细节）。若文件内检索不到对应类型，即确信该组件并无此 Prop，或该组件在本版本中根本不存在！
  2. **第二步 [逃生舱手写]**: 如果需要极其特殊的临时展示块或未实现的大型节点组件（如 Avatar 头像框、特殊网络拓扑节点），严禁去翻阅 atoms 源码 or 凭空拼写，直接在 `src/views/` 对应的页面中使用 HTML 原生元素伴随 Tailwind CSS + `useDesignTokens` 主题令牌进行手写拼装（逃生舱模式）！这是最敏捷、自由度最高、100% 具备主题响应能力的做法。
  3. **第三步 [主动问询]**: 如果上述操作无法解惑，立刻发问向用户求助，严禁通过任何旁门左道尝试触碰 `atoms/*.tsx` 实体源文件进行修复或抄袭。

- **【正常导入写法】**:
  在视图页面中导入可用原子组件时，直接执行 Named Imports，例如：
  `import { Button } from '../components/atoms/Button';`

# ============== 开发与隔离规范 (Page Isolation Rule) ==============

- **【核心红线】**: 业务页面和复杂的网络拓扑页面，**绝不允许硬塞到 `src/components/` 下**！
- **【放置规范】**:
  - 新业务页面一律编写在 `/src/views/` 目录下（例如：`/src/views/MyDashboard.tsx`）。
  - **【主动挂载打通预览（Auto-Wiring Gold Rule - MANDATORY）】**：当你在 `/src/views/` 目录下物理新建任何定制化页面后，**你必须把它作为开箱即用功能的绝对自觉，无需等候用户下达额外指示或催促，主动在 `/src/views/index.tsx` 的 `VIEWS_REGISTRY` 列表中登记当前组件**，提供其 Named Import 与对应的展示 `id`, `name`, `desc` 属性。确保新页面立刻能在左侧导航栏切换到“页面业务沙盒 (Page Sandbox)”时，系统在底部目录树中动态列出，让用户一键切换和查验！严禁使其变成无预览入口的“代码孤岛”。
- **【风格继承机制与设计系统严契防线（核心警示：勿因对齐微调而硬编码）】**: 
  - 所有新写的原子组件、业务页面、装饰卡片，绝对不要尝试编写硬编码颜色、背景色（如 `style={{ background: '#F1F5F9' }}`）或圆角值，也不允许在 class 中混入未经令牌化、未与换肤咬合的硬编码 Tailwind 颜色（如 `bg-[#333]`）。
  - 当 AI 为了高保真对齐特定设计稿或截图时，**如果发现全局 `tokens` 中根本没有能支持具体微细状态语义的 Slot（例如：缺少药丸标签底色、已选择非Hover底色等）：你严禁图省事硬编码 16 进制颜色！这是不可饶恕的主题穿帮死罪！**
  - **【唯一正确解法（增补三部曲）】**：先前往 `/src/types/tokens.ts` 下的 `ColorSet` 添加你需要的语义 Slot 声明，随后立即在 `/src/constants/presets.ts` 将系统支持的**所有四套预设主题**全量补齐该 Slot 对应的精细色值，最后在组件中引用这个新增的 `tokens.colors.你的新Slot`。唯有这样，才能确保四大主题一键换肤、换动效时色彩 100% 协调而不穿帮！
  - 提取色彩、圆角变量进行 UI 计算渲染，使用 `tokens.colors.brand` 或 `tokens.colors.border` 进行排布支配。

# ============== 自动化繁衍规范 (Self-Evolution) ==============

如果用户明确命令你需要 **“向下扩充一个新的通用原子原语（如 Checkbox, Slider）并向母体备案”**，说明面临原子组件的自我繁衍：
1. **第一步 [契约备案]**: 先在 `/src/components/AI_MANIFEST.json` 追加新增组件的 Props & Category 元数据。
2. **第二步 [物理落地]**: 在 `/src/components/atoms/` 建立同名 `.tsx` 实体。组件必须支持 `useDesignTokens`，确保在「甜美糖果、冷酷极客、极简现代、复古微暖」四大主题中具备全景自适应配色，不发生色彩穿帮。
3. **第三步 [沙盒登记]**: 在 `/src/components/ScenarioSandbox.tsx` 里的声明式 UI 解析机（如 `parseDeclarativeElement`）下绑定分支节点，使该原语具有运行时 JSON Schema 拼装展示能力。
4. **第四步 [编译自愈]**: 本地默默进行编译，不允许带着 TypeScript 隐性类型报错交付给用户。
