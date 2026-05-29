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
    textMuted: '#64748B',    // 灰蓝 Slate-500 说明性文字
    border: '#E2E8F0',       // 极细微 Slate-200 分割灰线
    borderFocus: '#0F2C59',  // 聚焦时边框变更为皇家蓝
    success: '#10B981',      // 完美翡翠绿
    error: '#EF4444',        // 警示宝石红
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
  }
};

/**
 * 👑 预设主题 2：Tech Mono (科技极客单色/极简拼贴)
 * 调性定位：科技极客感、高工业风、信息流密度高、极简主义。
 * 视觉特征：黑底终瑞、霓虹翠绿高亮、严酷的纯直角(圆角全为 0px)阶梯线。
 * 动态表现：无缓冲直接跳转(Rigid)、零拖沓。
 */
export const TECH_MONO: DesignTokens = {
  name: 'Tech Mono (极客代码终端)',
  description: '程序员友好型，纯单色加霓虹翠绿，全等宽字体驱动，直角刚性拼贴，充满赛博朋克极客复古质感。',
  colors: {
    name: 'Cyber Terminal',
    brand: '#10B981',        // 霓虹荧光翠绿 (主高亮色)
    brandLight: '#34D399',   // 激亮荧光绿
    brandDark: '#059669',    // 暗耀绿
    bgPage: '#090D16',       // 极黑太空中性底色
    bgCard: '#111827',       // 炭灰 900 卡片板面
    bgInput: '#0B0F17',      // 深槽黑色
    textPrimary: '#F3F4F6',  // 白光荧幕绿
    textMuted: '#9CA3AF',    // 灰色网格标签
    border: '#1F2937',       // 刻板不锈钢灰色硬格边线
    borderFocus: '#10B981',  // 绿色高亮发光边框线
    success: '#10B981',      // 荧光绿同样也是成功
    error: '#F87171',        // 霓虹警示红
  },
  typography: {
    headingFont: 'mono',
    bodyFont: 'mono',
    headingFontLabel: 'JetBrains Mono / 代码等宽',
    bodyFontLabel: 'JetBrains Mono / 代码等宽',
    sizeSm: '0.8125rem',     // 13px 紧凑
    sizeBase: '0.9375rem',   // 15px 紧凑终端文字
    sizeLg: '1.0625rem',     // 17px
    sizeXl: '1.1875rem',     // 19px
    size2xl: '1.5rem',       // 24px
  },
  borders: {
    radiusNone: '0px',
    radiusSm: '0px',         // 直角，拒绝柔和
    radiusMd: '0px',         // 直角，拒绝柔和
    radiusLg: '0px',         // 直角，拒绝柔和
    radiusXl: '0px',         // 直角，拒绝柔和
    radiusFull: '0px',       // 直角，拒绝柔和
  },
  spacings: {
    xs: '3px',               // 科技精密极窄
    sm: '6px',               // 紧凑排布
    md: '12px',              // 标准紧贴网格
    lg: '18px',
    xl: '26px',
  },
  shadows: {
    none: 'none',
    sm: '0 0 0 1px #10B981', // 绿色高光描边 (无模糊)
    md: '0 0 0 1px #111827, 2px 2px 0 0 #10B981', // 硬格伪阴影
    lg: '0 0 0 2px #111827, 4px 4px 0 0 #10B981', // 双重霓虹发光硬壳阴影
  },
  behaviors: {
    motionDurationFast: 40,       // 极快状态瞬间到位 (跳过渐变)
    motionDurationNormal: 80,     // 哪怕过渡，也要像荧光屏扫描一般迅速 (80毫秒)
    motionDurationSlow: 120,      // 慢动效也仅有 120 毫秒！
    motionCurve: 'rigid',         // 极致干脆、毫无多余缓冲
    buttonPressScale: 1.0,        // 按钮坚定实板，硬派零按压塌缩
    inputFocusRing: false,        // 不加外边缘梦幻光圈，直接替换高亮绿色边框线 
    modalDismissOverlay: false,   // 高危高纯度操作，不可以用“点下空白意外退出”。强迫用户必须通过弹窗退出按钮
    listHoverReveal: true,        // 高信息密度，当操作指令鼠标悬停时才精准显微
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
    textMuted: '#7D7571',    // 粘土温暖灰
    border: '#E8E5DD',       // 亚麻软布折线
    borderFocus: '#7C1C1C',  // 聚焦时边框替换为深红
    success: '#15803D',      // 森林沉静绿
    error: '#B91C1C',        // 鲜血暗红
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
    textMuted: '#8B5CF6',    // 活泼葡萄汁淡紫
    border: '#E9D5FF',       // 精粉香草香芋框线
    borderFocus: '#8B5CF6',  // 香芋框更闪亮
    success: '#10B981',      // 活力薄荷绿
    error: '#EC4899',        // 草莓红粉
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
  }
};

export const ALL_PRESETS = {
  swiss_modern: SWISS_MODERN,
  tech_mono: TECH_MONO,
  editorial_warm: EDITORIAL_WARM,
  sweet_rounded: SWEET_ROUNDED
};
