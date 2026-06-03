/**
 * ==========================================
 * 文件名称: /src/constants/presets.ts
 * 功能描述: 核心设计预设库 (四套完全不同的品牌调性视觉 + 行为合集)
 * 目标受众: 产品经理、UI 设计师、交互设计专家。
 * 
 * 💡 项目说明：
 * 为了向您证明“为什么我们不需要让 AI 自由写 CSS 就能换肤和换动效”，
 * 我们在这里预置了四套截然不同的经典商业调性。
 * 每套风格均同时注入了【静态色彩参数】与【动态微交互表现】。
 * 只要我们改变当前激活的主题，底层的 Primitive 组件库在渲染时，
 * 就会自动适配这些完全不一样的行为和样式规则！
 * ==========================================
 */

import { DesignTokens } from '../types/tokens';

/**
 * 👑 预设主题 1：Intelligent Workspace (智能工作空间标书生成风格)
 * 调性定位：专业高效、高饱和科技蓝与极简空气感、现代化 AI 生成排版系统。
 * 视觉特征：超轻感知边框、纯白高对比度组件卡片、活力科技蓝微渐变。
 * 动态表现：利落平滑、轻盈敏捷、最高的操作流体验。
 */
export const INTELLIGENT_WORKSPACE: DesignTokens = {
  name: 'Intelligent Workspace (智能大纲生成)',
  description: '提炼自招标文件智能编辑生成系统首选。高对比度科技深邃蓝品牌主色，搭配空气感微圆角和扁平极简布局，强化主体聚焦与阅读流畅感。最佳适配生产力工具与 AI 生成系统。',
  colors: {
    name: 'Energetic Tech Blue',
    brand: '#1F63D1',        // 经典皇家重蓝 (大标题/主控按钮)
    brandLight: '#1A55B5',   // 科技天蓝色 
    brandDark: '#154696',    // 更加沉稳的极深海蓝
    bgPage: '#F0F5FF',       // 极爽淡灰背景色 (如截图中卡框外底栏)
    bgCard: '#FFFFFF',       // 纯白高对比卡块
    bgInput: '#F9FAFB',      // 爽净白底输入框
    textPrimary: '#111827',  // 极深 Slate-900 核心文字
    textSecondary: '#4B5563', // Slate-600 段落文字
    textMuted: '#6B7280',    // Slate-500 中性辅助说明灰色
    textInverse: '#FFFFFF',  // 反色纯白
    border: '#E5E7EB',       // 极细边界描边 Gray-200 (少卡片边框、通过阴影和浅灰色差建立界限)
    borderFocus: '#1F63D1',  // 聚焦变为品牌皇家蓝
    bgHover: '#F3F4F6',      // 浅灰悬停
    bgActive: '#F0F4FF',     // 极柔和冷色柔淡选择/激活底色
    bgDisabled: '#F3F4F6',   // 禁态灰色底框
    textDisabled: '#9CA3AF', // 禁态灰色文本
    borderDisabled: '#E5E7EB', // 禁态灰色外边
    iconPrimary: '#111827',  // 一级高保真图标
    iconSecondary: '#6B7280', // 辅助备忘图标
    iconBrand: '#1F63D1',    // 皇家品牌蓝图标
    focusRing: 'rgba(31, 99, 209, 0.15)', // 皇家蓝温柔聚焦环
    success: '#10B981',      // 经典常青绿，表示“校验成功/添加成功”
    successBg: '#ECFDF5',    // 极其轻淡的常青绿背景 (Green-50)
    error: '#EF4444',        // 柔和防损宝石红
    errorBg: '#FEF2F2',      // 极其轻淡的宝石红背景 (Red-50)
    warning: '#F59E0B',      // 蜜糖琥珀金警告色
    warningBg: '#FFFBEB',    // 极其轻淡的琥珀金背景 (Amber-50)
    info: '#3B82F6',         // 天空科技蓝信息色
    infoBg: '#EFF6FF',       // 极其轻淡的天空蓝背景 (Blue-50)
    bgTag: '#F1F5F9',        // 经典软轻色差 Tag
  },
  typography: {
    headingFont: 'sans',
    bodyFont: 'sans',
    headingFontLabel: 'Inter / 现代无衬线体',
    bodyFontLabel: 'Inter / 几何无衬线体',
    sizeSm: '0.85rem',       // 13.5px 极富细节辅助描述
    sizeBase: '0.94rem',     // 15px 高密段落正文
    sizeLg: '1.05rem',       // 17px 小标题/卡片主要大标题
    sizeXl: '1.20rem',       // 19.2px 分区标题
    size2xl: '1.60rem',      // 25.6px 生成大章标题
    lineHeightTight: '1.25',
    lineHeightNormal: '1.5',
    fontWeightLight: '300',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
  borders: {
    radiusNone: '0px',
    radiusSm: '4px',         // 灵巧极其坚固微圆角 (如 checkbox 等)
    radiusMd: '6px',         // 精巧控件圆角 (输入框、次级按钮)
    radiusLg: '8px',         // 核心工作卡片大圆角 (如招标目录行卡)
    radiusXl: '12px',        // 页面总视图模态圆角
    radiusFull: '9999px',    // 圆药丸状胶囊
  },
  spacings: {
    xs: '4px',               // 微距对齐
    sm: '8px',               // 紧凑边距
    md: '16px',              // 标准栅格内边距 (16px)
    lg: '24px',              // 板块呼吸留白 (24px)
    xl: '32px',              // 大级外层定位
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    md: '0 4px 12px 0 rgba(31, 41, 55, 0.04), 0 1px 2px 0 rgba(31, 41, 55, 0.02)',
    lg: '0 12px 24px -4px rgba(31, 41, 55, 0.08), 0 4px 12px -2px rgba(31, 41, 55, 0.03)',
  },
  behaviors: {
    motionDurationFast: 100,      // 极轻量响应动效 (100毫秒，操作效率核心)
    motionDurationNormal: 180,    // 高频切换/下拉卡槽展开均 180ms
    motionDurationSlow: 280,      // AI 推荐窗抽屉滑动 280ms
    motionCurve: 'smooth',        // 经典严谨流畅、无弹性扰乱交互
    buttonPressScale: 0.98,       // 灵巧物理轻扣反馈
    inputFocusRing: true,         // 有外发光
    modalDismissOverlay: true,    // 允许
    listHoverReveal: true,        // 允许悬停滑出操作项
    cardHoverLift: 2,             // 高效工作风温和浮移 2px
  }
};

/**
 * 👑 预设主题 1：Swiss Modern (理性极简瑞士风格)
 * 调性定位：严谨、冷静、高阶排版、学术/技术、中性理性。
 * 视觉特征：冷灰色背景、深邃藏青蓝、几何小圆角、重直排版。
 * 动态表现：顺滑流畅、回弹极微、稳重利落。
 */
export const SWISS_MODERN: DesignTokens = {
  name: 'Swiss Modern (极简瑞士理学)',
  description: '高对比度中性冷色，精细理性，经典的国际主义字体和严谨几何排版。适合高端行业、B端工具。',
  colors: {
    name: 'Swiss Cobalt',
    brand: '#0F2C59',        // 深邃皇家钴蓝 (主色)
    brandLight: '#1d4ed8',   // 亮蓝 (悬停色)
    brandDark: '#1e3a8a',    // 偏暗钴蓝 (按下激活)
    bgPage: '#F8FAFC',       // Slate-50 冷灰背景
    bgCard: '#FFFFFF',       // 纯白主内容卡片
    bgInput: '#FFFFFF',      // 纯白表单底色
    textPrimary: '#0F172A',  // 极深 Slate-900 标题文字
    textSecondary: '#334155', // Slate-700 中性正文段落文字
    textMuted: '#64748B',    // 灰蓝 Slate-500 说明性文字
    textInverse: '#FFFFFF',  // 反色纯白
    border: '#E2E8F0',       // 极细微 Slate-200 分割灰线
    borderFocus: '#0F2C59',  // 聚焦时边框变更为皇家蓝
    bgHover: '#F1F5F9',      // 浅灰 Slate-100 hover
    bgActive: '#EFF6FF',     // 优雅柔和的选择/激活淡蓝
    bgDisabled: '#F1F5F9',   // 禁态底灰
    textDisabled: '#94A3B8', // 禁态字灰
    borderDisabled: '#E2E8F0', // 禁态边框
    iconPrimary: '#0F172A',  // 一级高智理学图标
    iconSecondary: '#64748B', // 弱极智度图标
    iconBrand: '#0F2C59',    // 主钴蓝功能图标
    focusRing: 'rgba(15, 44, 89, 0.15)', // 优雅钴蓝外聚焦圈环
    success: '#10B981',      // 完美翡翠绿
    successBg: '#F0FDF4',    // 极其轻淡的翡翠绿背景 (Emerald-50)
    error: '#EF4444',        // 警示宝石红
    errorBg: '#FEF2F2',      // 极其轻淡的宝石红背景 (Red-50)
    warning: '#D97706',      // 严苛古典琥珀橙警告色
    warningBg: '#FFFBEB',    // 极其轻淡的琥珀橙背景 (Amber-50)
    info: '#2563EB',         // 经典钴蓝信息色
    infoBg: '#EFF6FF',       // 极其轻淡的经典蓝背景 (Blue-50)
    bgTag: '#F1F5F9',        // Slate-100 温柔无框底色
  },
  typography: {
    headingFont: 'sans',
    bodyFont: 'sans',
    headingFontLabel: 'Inter / 现代无衬线体',
    bodyFontLabel: 'Inter / 几何无衬线体',
    sizeSm: '0.875rem',      // 14px 辅助描述
    sizeBase: '1rem',        // 16px 标准文字
    sizeLg: '1.125rem',      // 18px 小标题/卡片标题
    sizeXl: '1.25rem',       // 20px 板块标题
    size2xl: '1.75rem',      // 28px 页面大标题
    lineHeightTight: '1.2',
    lineHeightNormal: '1.45',
    fontWeightLight: '300',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',
  },
  borders: {
    radiusNone: '0px',
    radiusSm: '4px',         // 精细小圆角
    radiusMd: '6px',         // 标准控件圆角 (输入框、滑块)
    radiusLg: '10px',        // 内容卡片圆角
    radiusXl: '16px',        // 浮沉大弹窗圆角
    radiusFull: '9999px',    // 药丸状、圆形胶囊
  },
  spacings: {
    xs: '4px',               // 微留白
    sm: '8px',               // 紧凑边距
    md: '16px',              // 标准栅格内边距
    lg: '24px',              // 大级安全边距
    xl: '32px',              // 页面大间距
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)',
    lg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
  },
  behaviors: {
    motionDurationFast: 120,      // 超快响应 (按压反馈只需要120毫秒完成)
    motionDurationNormal: 220,    // 标准动效切换 (聚焦过渡 220 毫秒)
    motionDurationSlow: 320,      // 慢动效时长
    motionCurve: 'smooth',        // 经典流畅缓入缓出 (不带浮夸弹性)
    buttonPressScale: 0.97,       // 指尖轻微凹陷体验 (97% 物理缩放)
    inputFocusRing: true,         // 有外聚焦光轮环
    modalDismissOverlay: true,    // 允许通过点击黑色阴影遮罩区秒退弹窗
    listHoverReveal: false,       // 信息架构扁平化呈现，无需悬停披露
    cardHoverLift: 1,             // 瑞士理性极简更低调微悬 1px
  }
};



/**
 * 👑 预设主题 3：Editorial Warm (典雅社论人文学风)
 * 调性定位：书卷气、纸张温和、高对比排版、优雅诗意。
 * 视觉特征：波尔多红酒、温暖象牙黄纸张感底色、精致雅致的手工般中微圆角。
 * 动态表现：徐徐展开的优雅感。
 */
export const EDITORIAL_WARM: DesignTokens = {
  name: 'Editorial Warm (人文学者典雅)',
  description: '柔和的象牙暖黄背景，优美的中西衬线英文，诗一般温和的色调搭配人文学术色彩，高级耐看。',
  colors: {
    name: 'Bordeaux Cream',
    brand: '#7C1C1C',        // 典雅波尔多红酒深红
    brandLight: '#991B1B',   // 微鲜红酒悬停
    brandDark: '#450A0A',    // 浓黑酒泥红
    bgPage: '#FCFBF6',       // 象牙黄温暖纸张底色
    bgCard: '#FFFFFF',       // 纯白雅致卡片
    bgInput: '#FAF9F4',      // 极轻淡象牙黄 (契合纸上书写感)
    textPrimary: '#291811',  // 温暖中性的咖啡灰黑 (替代生硬的电脑死黑)
    textSecondary: '#4B3D38', // 温暖咖啡灰褐段落文本
    textMuted: '#7D7571',    // 粘土温暖灰
    textInverse: '#FCFBF6',  // 热熔温暖淡象牙白
    border: '#E8E5DD',       // 亚麻软布折线
    borderFocus: '#7C1C1C',  // 聚焦时边框替换为深红
    bgHover: '#F5F2EA',      // 温暖象牙软沙 hover
    bgActive: '#FAF2E6',     // 温暖雅淡的选择/激活米黄
    bgDisabled: '#FAF9F4',   // 禁态亚棉灰
    textDisabled: '#A89F9B', // 禁态咖啡淡灰文字
    borderDisabled: '#EDE9E0', // 禁态框色
    iconPrimary: '#291811',  // 咖啡泥炭一阶图标
    iconSecondary: '#7D7571', // 温暖辅色图标
    iconBrand: '#7C1C1C',    // 特属酒红控制图标
    focusRing: 'rgba(124, 28, 28, 0.12)', // 典雅酒红呼吸聚焦晕
    success: '#15803D',      // 森林沉静绿
    successBg: '#F0FDF4',    // 极其轻淡的森林绿背景 (Green-50)
    error: '#B91C1C',        // 鲜血暗红
    errorBg: '#FEF2F2',      // 极其轻淡的鲜红背景 (Red-50)
    warning: '#C2410C',      // 焦土琥珀橙警告色
    warningBg: '#FFFBEB',    // 极其轻淡的琥珀橙背景 (Amber-50)
    info: '#1E3A8A',         // 学术深海蓝信息色
    infoBg: '#EFF6FF',       // 极其轻淡的深海蓝背景 (Blue-50)
    bgTag: '#F2EFE6',        // 软糯亚麻浅灰底色
  },
  typography: {
    headingFont: 'serif',
    bodyFont: 'sans',
    headingFontLabel: 'Playfair Display / 中西古典衬线',
    bodyFontLabel: 'Helvetica / 现代人文无衬线',
    sizeSm: '0.90rem',       // 书卷气较大字号 
    sizeBase: '1.05rem',     // 丰满的正文字体
    sizeLg: '1.20rem',       // 小标题
    sizeXl: '1.35rem',       // 板块标题
    size2xl: '2.00rem',      // 气势磅礴的书目章节体大标题
    lineHeightTight: '1.3',
    lineHeightNormal: '1.6',
    fontWeightLight: '300',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  },
  borders: {
    radiusNone: '0px',
    radiusSm: '3px',         // 细腻小角
    radiusMd: '5px',         // 品质卡片温圆角
    radiusLg: '8px',         // 恰到好处的边角
    radiusXl: '14px',        // 温和容器
    radiusFull: '9999px',
  },
  spacings: {
    xs: '5px',
    sm: '10px',
    md: '20px',              // 宽裕的留白 (20px，提供诗歌般的呼吸感)
    lg: '30px',              // 版式之间的艺术性松弛边区
    xl: '40px',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(41, 24, 17, 0.04)',
    md: '0 6px 12px -3px rgba(41, 10, 10, 0.05), ...', // 温暖漫反射投影
    lg: '0 15px 25px -5px rgba(41, 10, 10, 0.07), 0 10px 10px -5px rgba(41, 24, 17, 0.03)',
  },
  behaviors: {
    motionDurationFast: 180,      // 极尽悠扬 (悬停状态徐徐过渡 180 毫秒)
    motionDurationNormal: 280,    // 高级典雅的延展现身 (280 毫秒)
    motionDurationSlow: 420,      // 谈吐不凡的柔和遮罩升降
    motionCurve: 'smooth',        // 平滑渐隐渐现，流淌自然
    buttonPressScale: 0.99,       // 矜持的阻尼反馈 (仅收缩到 99%)
    inputFocusRing: false,        // 无科技感荧光环，仅通过输入框线优雅变红酒色提示
    modalDismissOverlay: true,    // 允许通过点击黑色阴影遮罩区秒退弹窗
    listHoverReveal: false,       // 杜绝信息乱跳，保持经典的报刊大局观排版
    cardHoverLift: 2,             // 书页古典沉稳悬停抬起 2px
  }
};

/**
 * 👑 预设主题 4：Sweet Rounded (软萌多彩微圆)
 * 调性定位：好亲近、友好、马卡龙治愈、萌系、游戏感与年轻潮流。
 * 视觉特征：香芋紫主色、粉绿亮眼搭配、充沛且圆嘟嘟的大弧度曲线角。
 * 动态表现：高弹性回弹 (Spring)、可爱的果冻般按按缩放。
 */
export const SWEET_ROUNDED: DesignTokens = {
  name: 'Sweet Rounded (萌系香芋糖果)',
  description: '活泼大曲率圆角，柔和治愈多色的马卡龙香芋紫，充满人情温度和按压果冻弹性的新世代设计。',
  colors: {
    name: 'Macaron Lavender',
    brand: '#8B5CF6',        // 治愈系香芋香草紫 (主色)
    brandLight: '#A78BFA',   // 冰浅薰衣草
    brandDark: '#7C3AED',    // 浓甜葡萄紫
    bgPage: '#FAF5FF',       // 奶洗紫色极净爽背景
    bgCard: '#FFFFFF',       // 饱满牛奶纯白卡块
    bgInput: '#F5EBFF',      // 淡紫色内含气泡底框
    textPrimary: '#3B0764',  // 深凝香芋黑紫文字
    textSecondary: '#6D28D9', // 浪漫薰衣草紫段落文本
    textMuted: '#8B5CF6',    // 活泼葡萄汁淡紫
    textInverse: '#FFFFFF',  // 反色纯白
    border: '#E9D5FF',       // 精粉香草香芋框线
    borderFocus: '#8B5CF6',  // 香芋框更闪亮
    bgHover: '#F5EBFF',      // 香草奶油淡紫 hover
    bgActive: '#F3E8FF',     // 极其梦幻的选择/激活糖紫
    bgDisabled: '#FAF5FF',   // 禁态香芋白
    textDisabled: '#C084FC', // 禁态淡紫文字
    borderDisabled: '#F3E8FF', // 禁态淡框
    iconPrimary: '#3B0764',  // 凝香芋黑紫一阶图标
    iconSecondary: '#8B5CF6', // 葡萄汁淡紫辅助图标
    iconBrand: '#8B5CF6',    // 香芋高亮图标
    focusRing: 'rgba(139, 92, 246, 0.18)', // 香芋糖果梦幻发光环
    success: '#10B981',      // 活力薄荷绿
    successBg: '#ECFDF5',    // 极其轻淡的薄荷绿背景 (Green-50)
    error: '#EC4899',        // 草莓红粉
    errorBg: '#FDF2F8',      // 极其软萌的草莓粉背景 (Pink-50)
    warning: '#F59E0B',      // 奶油蜂蜜暖橙警告色
    warningBg: '#FFFBEB',    // 极其轻淡的暖橙背景 (Amber-50)
    info: '#3B82F6',         // 马卡龙晴空蓝信息色
    infoBg: '#EFF6FF',       // 极其轻淡的晴空蓝背景 (Blue-50)
    bgTag: '#FAF5FF',        // 软糯香草紫 Tag底板
  },
  typography: {
    headingFont: 'sans',
    bodyFont: 'sans',
    headingFontLabel: 'Outfit / 软萌无衬线标题',
    bodyFontLabel: 'Plus Jakarta / 潮流现代圆体',
    sizeSm: '0.85rem',
    sizeBase: '0.98rem',
    sizeLg: '1.15rem',
    sizeXl: '1.30rem',
    size2xl: '1.85rem',
    lineHeightTight: '1.25',
    lineHeightNormal: '1.55',
    fontWeightLight: '300',
    fontWeightNormal: '400',
    fontWeightMedium: '600',
    fontWeightBold: '800',
  },
  borders: {
    radiusNone: '0px',
    radiusSm: '6px',
    radiusMd: '12px',        // 充满弹力触感的主圆角
    radiusLg: '18px',        // 超大曲率的主卡片
    radiusXl: '24px',        // 气泡大弹框
    radiusFull: '9999px',    // 滴水球状药丸按钮
  },
  spacings: {
    xs: '6px',               // 慷慨的排空
    sm: '12px',
    md: '18px',              // 充沛富氧的网格间隙
    lg: '28px',              // 多方位透气空间
    xl: '38px',
  },
  shadows: {
    none: 'none',
    sm: '0 2px 4px rgba(139, 92, 246, 0.04)',
    md: '0 8px 16px -4px rgba(139, 92, 246, 0.12), 0 4px 6px -2px rgba(139, 92, 246, 0.06)',
    lg: '0 20px 24px -6px rgba(139, 92, 246, 0.18), 0 10px 10px -5px rgba(139, 92, 246, 0.08)',
  },
  behaviors: {
    motionDurationFast: 160,      // 好玩耐按的果冻拖延 (160 毫秒)
    motionDurationNormal: 240,    // 悠柔高弹 (240 毫秒)
    motionDurationSlow: 360,      // 大面气球浮空
    motionCurve: 'spring',        // ⚠️ 极其可爱的物理高弹反弹阻尼！果冻必备
    buttonPressScale: 0.93,       // ⚠️ 超低回缩 (93% 物理缩样)，完美果冻捏捏感反馈
    inputFocusRing: true,         // 有外聚焦环，香芋紫的光雾气
    modalDismissOverlay: true,    // 允许随便按按空白处一秒欢退弹窗
    listHoverReveal: true,        // 悬浮时，列表会有一个俏皮的小微移高度卡位展开
    cardHoverLift: 3,             // 萌系果冻微弹物理上浮 3px
  }
};

export const ALL_PRESETS = {
  intelligent_workspace: INTELLIGENT_WORKSPACE,
  swiss_modern: SWISS_MODERN,
  editorial_warm: EDITORIAL_WARM,
  sweet_rounded: SWEET_ROUNDED
};
