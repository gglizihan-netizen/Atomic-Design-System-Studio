/**
 * ==========================================
 * 文件名称: /src/components/atoms/Card.tsx
 * 功能描述: 高保真、Design-Token 深度联动智能物理卡片组件
 * 目标受众: 产品经理、UI 用户体验设计师、开发团队。
 * 
 * 💡 什么是“智能卡片原子组件”？
 * 本组件拒绝一切形式的颜色、间距、投影硬编码。它全量响应并绑定当前的全局设计系统（Design Tokens）：
 * 1. 【三大高度艺术化呈现变体】：舍弃繁琐零碎的底层值手调，归纳为三大经典容器形态：
 *    - 'standard-outline': 经典物理框线。纯白纸张卡底色 (bgCard)，1px 精致外围框线 (border)，下方附带温和的贴地微阴影。
 *    - 'subtle-flat': 极致降噪色差面板。无硬性边框与阴影，直接平铺设计系统极淡雅安静的色差底板色 (bgTag || bgInput)，安静柔和，杜绝生硬卡片堆砌。
 *    - 'isometric-elevated': 气垫特级悬空层。依靠中度弥散投影 (shadows.md) 确立三维高度，无硬质框线阻隔，极为高级灵动。
 * 2. 【高保真柔和微交互悬浮 (Soft Hover Micro-Interaction)】：开启 `hoverable` 后，组件深度耦合行为令牌。
 *    动效的响应时长和缓动规律均由 tokens 驱动，并针对 hover 时可能产生的生硬感觉，
 *    在 smooth/spring 底层加载了一套经过专业人眼调校的超软过渡加速器（[0.16, 1, 0.3, 1] 极致缓动曲线），实现气垫般的物理触感。
 * 3. 【一站式内容骨架分子】：提供 `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` 子模块，
 *    全量自动继承主题字体规范。
 * ==========================================
 */

import React from 'react';
import { motion } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';

/**
 * 🏷️ 卡片组件属性协议契约
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // 核心视觉美学变体类型
  variant?: 'standard-outline' | 'subtle-flat' | 'isometric-elevated';
  
  // 是否在鼠标悬停时激活平滑微弹物理浮动微交互 (y 抬升 + 强化阴影)
  hoverable?: boolean;
  
  // 卡片内边距尺度 (xs: 紧凑, sm: 窄, md: 标准, lg: 气派, xl: 奢华, none: 无)
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  // 边角弧度，自动拉通圆角令牌
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  // 是否开启呼吸感品牌微光漫反射 (glow，在悬停时于边缘渲染淡淡的品牌色半透明辉光晕)
  glow?: boolean;
  
  // 自定义 DOM 容器标签类型
  as?: keyof React.JSX.IntrinsicElements;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'standard-outline',
  hoverable = false,
  padding = 'md',
  radius = 'lg',
  glow = false,
  as: Component = 'div',
  className = '',
  style,
  ...props
}) => {
  // 🔌 挂载动态设计系统上下文
  const { tokens } = useDesignTokens();

  // 1. 将 padding 参数优雅绑定至 mappings
  const paddingMap = {
    none: '0px',
    xs: tokens.spacings.xs,
    sm: tokens.spacings.sm,
    md: tokens.spacings.md,
    lg: tokens.spacings.lg,
    xl: tokens.spacings.xl,
  };
  const resolvedPadding = paddingMap[padding];

  // 2. 将 radius 圆角规格拉通设计系统 borders
  const radiusMap = {
    none: tokens.borders.radiusNone,
    sm: tokens.borders.radiusSm,
    md: tokens.borders.radiusMd,
    lg: tokens.borders.radiusLg,
    xl: tokens.borders.radiusXl,
    full: tokens.borders.radiusFull,
  };
  const resolvedRadius = radiusMap[radius];

  // 3. 核心变体静态视觉解析器（无任何手动色彩、细线硬编码）
  const getVariantsConfig = () => {
    switch (variant) {
      case 'subtle-flat':
        return {
          backgroundColor: tokens.colors.bgTag || tokens.colors.bgInput || '#f8fafc',
          border: '1px solid transparent',
          color: tokens.colors.textPrimary,
          shadow: tokens.shadows.none || 'none',
        };
      case 'isometric-elevated':
        return {
          backgroundColor: tokens.colors.bgCard || '#ffffff',
          border: '1px solid transparent',
          color: tokens.colors.textPrimary,
          shadow: tokens.shadows.md || '0 4px 12px rgba(0,0,0,0.05)',
        };
      case 'standard-outline':
      default:
        return {
          backgroundColor: tokens.colors.bgCard || '#ffffff',
          border: `1px solid ${tokens.colors.border || 'rgba(0,0,0,0.08)'}`,
          color: tokens.colors.textPrimary,
          shadow: tokens.shadows.sm || '0 1px 3px rgba(0,0,0,0.03)',
        };
    }
  };

  const config = getVariantsConfig();

  // 4. 计算悬停目标状态（浮动 Y 轴距离自适应 behaviors.cardHoverLift）
  const hoverY = hoverable ? -Math.max(1, tokens.behaviors.cardHoverLift) : 0;
  
  const getHoverShadow = () => {
    if (!hoverable) return config.shadow;
    
    // 如果是 subtle-flat 悬停时升起一个极其微小的平面物理感
    if (variant === 'subtle-flat') {
      return tokens.shadows.sm;
    }
    // standard-outline 悬停时阴影加深至中高度 mid-elevation
    if (variant === 'standard-outline') {
      return tokens.shadows.md;
    }
    // isometric-elevated 悬停时由于初始即在中高位，抬升至深度大悬浮大阴影
    return tokens.shadows.lg;
  };

  const activeHoverShadow = getHoverShadow();
  const brandGlowEffect = glow ? `0 4px 20px ${tokens.colors.brand}22, 0 1px 4px ${tokens.colors.brand}15` : '';
  const finalHoverShadow = glow 
    ? (activeHoverShadow !== 'none' ? `${activeHoverShadow}, ${brandGlowEffect}` : brandGlowEffect)
    : activeHoverShadow;

  // 5. 极佳、超软动效过渡调校器 (消除硬朗生硬感)
  const getFramerHoverTransition = () => {
    const isSpring = tokens.behaviors.motionCurve === 'spring';
    if (isSpring) {
      return {
        type: 'spring',
        stiffness: 130, // 降低劲度洗去机械感
        damping: 18,    // 充足的阻尼完美吸收晃动，带来优雅沉稳的高级果冻感
        mass: 0.9,
      };
    } else {
      return {
        type: 'tween',
        ease: [0.16, 1, 0.3, 1], // 精雕细琢的超柔奢缓出曲线 (Ultra-lux exponential ease-out)
        duration: (tokens.behaviors.motionDurationNormal + 120) / 1000, // 微调缓释，倍显温和
      };
    }
  };

  // 6. 静态过渡，确保在非 hover 状态和激活时的常规变化有完美的基础时长
  const speedNormal = `${tokens.behaviors.motionDurationNormal}ms`;
  const bezierCurve = tokens.behaviors.motionCurve === 'spring' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'cubic-bezier(0.16, 1, 0.3, 1)';

  const baseStyle: React.CSSProperties = {
    backgroundColor: config.backgroundColor,
    border: config.border,
    color: config.color,
    padding: resolvedPadding,
    borderRadius: resolvedRadius,
    boxShadow: config.shadow,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    transition: `border-color ${speedNormal} ${bezierCurve}, background-color ${speedNormal} ${bezierCurve}, color ${speedNormal} ${bezierCurve}, box-shadow ${speedNormal} ${bezierCurve}`,
    ...style,
  };

  if (hoverable) {
    return (
      <motion.div
        id={props.id}
        as={Component}
        whileHover={{
          y: hoverY,
          boxShadow: finalHoverShadow,
          borderColor: glow ? tokens.colors.brand : undefined,
        }}
        transition={getFramerHoverTransition()}
        style={baseStyle}
        className={`cursor-pointer ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component
      style={baseStyle}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * ==========================================
 * 🏷️ 子模块 A: CardHeader (卡片页眉)
 * ==========================================
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // 是否在页眉底部附加一条纤细淡雅的分割线
  bordered?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  bordered = false,
  className = '',
  style,
  ...props
}) => {
  const { tokens } = useDesignTokens();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        paddingBottom: tokens.spacings.sm,
        marginBottom: tokens.spacings.sm,
        borderBottom: bordered ? `1px solid ${tokens.colors.border || 'rgba(0,0,0,0.06)'}` : 'none',
        ...style,
      }}
      className={`card-header ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ==========================================
 * 🏷️ 子模块 B: CardTitle (卡片标题)
 * ==========================================
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  // 标题字号层级：sm(标准14px), base(中大16px), lg(大气18px), xl(极目20px), '2xl'(焦点24px)
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  size = 'lg',
  className = '',
  style,
  ...props
}) => {
  const { tokens } = useDesignTokens();

  const getFamily = () => {
    switch (tokens.typography.headingFont) {
      case 'serif':
        return '"Playfair Display", Georgia, serif';
      case 'mono':
        return 'var(--font-mono)';
      case 'sans':
      default:
        return 'var(--font-sans)';
    }
  };

  const sizeMap = {
    sm: tokens.typography.sizeSm,
    base: tokens.typography.sizeBase,
    lg: tokens.typography.sizeLg,
    xl: tokens.typography.sizeXl,
    '2xl': tokens.typography.size2xl,
  };

  return (
    <h3
      style={{
        fontFamily: getFamily(),
        fontSize: sizeMap[size],
        fontWeight: tokens.typography.fontWeightBold || '700',
        lineHeight: tokens.typography.lineHeightTight,
        color: tokens.colors.textPrimary,
        margin: 0,
        letterSpacing: '-0.01em',
        ...style,
      }}
      className={`card-title ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

/**
 * ==========================================
 * 🏷️ 子模块 C: CardDescription (卡片副标题/描述)
 * ==========================================
 */
export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  const { tokens } = useDesignTokens();

  return (
    <p
      style={{
        fontFamily: tokens.typography.bodyFont === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)',
        fontSize: tokens.typography.sizeSm,
        fontWeight: tokens.typography.fontWeightNormal || '400',
        lineHeight: tokens.typography.lineHeightNormal,
        color: tokens.colors.textSecondary,
        margin: 0,
        opacity: 0.9,
        ...style,
      }}
      className={`card-desc ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

/**
 * ==========================================
 * 🏷️ 子模块 D: CardContent (卡片核心内容区)
 * ==========================================
 */
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      className={`card-content ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * ==========================================
 * 🏷️ 子模块 E: CardFooter (卡片底部页脚操作区)
 * ==========================================
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between';
  bordered?: boolean;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  align = 'right',
  bordered = false,
  className = '',
  style,
  ...props
}) => {
  const { tokens } = useDesignTokens();

  const flexAlignMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    between: 'space-between',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: flexAlignMap[align],
        gap: tokens.spacings.sm,
        paddingTop: tokens.spacings.sm,
        marginTop: tokens.spacings.sm,
        borderTop: bordered ? `1px solid ${tokens.colors.border || 'rgba(0,0,0,0.06)'}` : 'none',
        ...style,
      }}
      className={`card-footer ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
