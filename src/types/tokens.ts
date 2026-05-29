/**
 * ==========================================
 * 文件名称: /src/types/tokens.ts
 * 功能描述: 全局设计令牌 (Design Tokens) 与 行为令牌 (Behavioral Tokens) 的 TypeScript 类型定义。
 * 目标受众: 产品经理 (PM)、设计/交互专家 (UE/UI)、前端开发工程师。
 * 
 * 💡 什么是设计令牌？
 * 设计令牌是视觉设计系统的“最小化原子参数”。它将原本松散散落在代码中的色值、边距、圆角、
 * 字体等具体定义，抽象为可管理的键值对。这样，无论是 AI 引擎在生成代码，还是开发在日常编写，
 * 都有了一套统一可查的设计标准协议。
 * 
 * 💡 什么是行为令牌 (Behavioral Tokens)？
 * 传统设计令牌只定义“静态颜色”和“静态尺寸”，导致 AI 在组装界面时产生的“微交互一致性”大打折扣。
 * 行为令牌将“动效缓动曲线”、“动效响应时长”、“点击缩放负反馈”、“弹窗遮罩交互策略”等
 * 动态的、行为层面的交互行为抽象为参数。AI 和组件系统加载这些参数，可以让界面在任意主题下，
 * 呈现出完全契合该主题性格的动态节奏（例如：极客风硬朗瞬变，软萌风有弹性的果冻感）。
 * ==========================================
 */

/**
 * 🎨 1. 颜色令牌组 (ColorSet)
 * 定义了系统核心的品牌色、背景色、深浅文本、边框色、交互聚焦色以及状态反馈色（成功与错误）。
 */
export interface ColorSet {
  name: string;        // 颜色方案名称 (例如: “深邃皇家蓝”)
  brand: string;       // 品牌主色 (用于主按钮、关键高亮、激活态背景)
  brandLight: string;  // 品牌悬停色 (用户鼠标滑过主色区域时的亮化处理)
  brandDark: string;   // 品牌按下色 (用户点击主色区域时的加深处理)
  bgPage: string;      // 页面底色 (整个应用的最大背景画布颜色)
  bgCard: string;      // 卡片底色 (处于画布之上的内容板块、卡片容器底色)
  bgInput: string;     // 表单输入框底色 (让输入区域在卡片里有轻微下凹感)
  textPrimary: string; // 一级文本色 (用于大标题、正文核心文字，高对比度)
  textMuted: string;   // 辅助文本色 (用于说明、标签、次要备注，中性淡色)
  border: string;      // 默认边框和网格分割线色 (用于区分不同区域)
  borderFocus: string; // 聚焦边框色 (文本框、选择框获得键盘焦点时的强对比色)
  success: string;     // 成功反馈色 (绿色系，用于表单校验正确、保存成功状态)
  error: string;       // 错误反馈色 (红色系，用于表单报错、高危毁灭性操作警告)
}

/**
 * ✍️ 2. 排版字体令牌组 (TypographySet)
 * 控制全站的字体样式（无衬线、有衬线、等宽）和尺寸规范。
 */
export interface TypographySet {
  headingFont: 'sans' | 'serif' | 'mono'; // 标题字体分类 (sans:现代黑体, serif:优雅宋体, mono:硬朗等宽)
  bodyFont: 'sans' | 'mono';              // 正文字体分类 (一般使用 sans 保证可读性，mono 适应科技风)
  headingFontLabel: string;               // 标题字体的友好展示标签 (例如: Inter / System Sans)
  bodyFontLabel: string;                  // 正文字体的友好展示标签
  sizeSm: string;                         // 小字号 (12px - 14px，用于辅助提示、小标签)
  sizeBase: string;                       // 标准字号 (14px - 16px，用于最常规的列表中文本和段落)
  sizeLg: string;                         // 中大字号 (16px - 18px，主要用于卡片标题、表单项标题)
  sizeXl: string;                         // 大字号 (20px - 22px，应用内二级标题)
  size2xl: string;                        // 特大字号 (24px - 28px，主页面醒目标题)
}

/**
 * 📐 3. 圆角与边框令牌组 (BorderSet)
 * 决定了界面的视觉刚柔性格（硬朗刚直、微圆精细、萌系大圆角）。
 */
export interface BorderSet {
  radiusNone: string; // 无圆角 (0px，极致的科技朋克风)
  radiusSm: string;   // 小圆角 (3px - 4px，用于复选框、小标签)
  radiusMd: string;   // 中圆角 (6px - 8px，用于小按钮、输入框、普通气泡)
  radiusLg: string;   // 大圆角 (10px - 14px，用于标准按钮、卡片容器)
  radiusXl: string;   // 特大圆角 (16px - 24px，用于大弹窗、焦点Banner)
  radiusFull: string; // 全圆角 (9999px，用于药丸状按钮、头像、标签)
}

/**
 * 🗂️ 4. 间距布局令牌组 (SpacingSet)
 * 限制了界面上各元素、卡片内外的白置比例，保障了“呼吸感”的一致。
 */
export interface SpacingSet {
  xs: string;  // 极窄间距 (4px - 6px，用于元素内部小微对齐，如文字与紧跟着的图标)
  sm: string;  // 窄间距 (8px - 12px，用于组件内部边距，如输入框内填充)
  md: string;  // 中间距 (16px - 20px，最核心间距，用于卡片内边距、行间距)
  lg: string;  // 宽间距 (24px - 30px，用于板块、卡片之间的横纵向安全边距)
  xl: string;  // 特宽间距 (32px - 40px，高留白优雅布局首选的大级外层间距)
}

/**
 * 👥 5. 投影阴影令牌组 (ShadowSet)
 * 建立界面层级(Elevation-高度感)的核心。通过微阴影、中阴影引导视觉流。
 */
export interface ShadowSet {
  none: string; // 无阴影 (扁平极简，或靠纯边框线划分)
  sm: string;   // 轻量阴影 (沉浸式卡片的微妙边缘，不易被察觉但能增加实体感)
  md: string;   // 常规阴影 (按钮悬停、普通下拉菜单，带起恰到好处的立体感)
  lg: string;   // 深度阴影 (大弹窗、模态对话框，制造极强的视觉压平感)
}

/**
 * 🌀 6. 行为令牌组 (BehavioralSet) - AI交互灵魂协议
 * 将原本前端开发硬编码在动效库和事件回调里的交互策略转化为“令牌”，给 AI 精准指引。
 */
export interface BehavioralSet {
  motionDurationFast: number;    // 快动效时长 (单位: 毫秒，通常用于按钮点击反馈、悬停切换，120ms - 150ms)
  motionDurationNormal: number;  // 标准动效时长 (毫秒，用于输入框聚焦动画、下拉菜单展开，200ms - 250ms)
  motionDurationSlow: number;    // 慢动效时长 (毫秒，用于大模态窗升起、路由层切换，300ms - 450ms)
  motionCurve: 'spring' | 'smooth' | 'rigid'; // 动效个性表现 (spring:有可爱的弹性反弹, smooth:经典流畅缓入缓出, rigid:极致硬朗干脆直达)
  buttonPressScale: number;      // 按钮按压交互负反馈 (1.0表示无变化，0.95-0.97表示轻微果冻式按压，增加点击实感)
  inputFocusRing: boolean;       // 重聚焦外光圈圈 (如为true，输入框聚焦时不仅加深边框，还会有一圈温和的外发光或额外环套)
  modalDismissOverlay: boolean;  // 模态弹窗是否允许点击黑色遮罩区一键关闭 (true为易关闭利于阅读，false为强控制必须通过确认按钮)
  listHoverReveal: boolean;      // 列表项悬停时，是否允许动态改变高度、背景或者滑出操作栏 (提高AI对主次要信息的隐藏策略)
}

/**
 * 🏆 7. 终极设计令牌容器 (DesignTokens)
 * 一个设计系统的主题集合实体，包含一套完整的静态视觉令牌和一套动态行为令牌。
 */
export interface DesignTokens {
  name: string;                // 该设计主题的精美中文命名 (例如: "瑞士理性现代风格")
  description: string;         // 面向产品经理和设计师的风格与适用场景描述
  colors: ColorSet;            // 颜色令牌空间
  typography: TypographySet;   // 排版字型空间
  borders: BorderSet;          // 边框圆角空间
  spacings: SpacingSet;        // 间距空气感空间
  shadows: ShadowSet;          // 投影立体空间
  behaviors: BehavioralSet;    // 行为动效空间 (让AI调配组件微交互的秘密所在)
}

/**
 * 🏷️ 系统支持的四套默认经典设计主题键名定义
 */
export type ThemePreset = 'swiss_modern' | 'tech_mono' | 'editorial_warm' | 'sweet_rounded';
