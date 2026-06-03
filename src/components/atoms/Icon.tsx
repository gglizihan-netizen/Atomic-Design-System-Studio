/**
 * ==========================================
 * 文件名称: /src/components/atoms/Icon.tsx
 * 功能描述: 高保真、可定制的 AI-Native 智能图标原子原语
 * 目标受众: 后续接入的 AI Assistant / 开发工程师 / 界面设计师。
 * 
 * 💡 什么是“智能图标原子原语”？
 * 本组件基于 lucide-react 进行了二次封装与高保真策略注入：
 * 1. 语义色强制规范：特定提示性图标（如 success 成功、warning 警告、error 失败等）内置固定的行业标准语义色，保证行为一致性。
 * 2. 弱化设计默认值：非高亮组件的常规控制图标（如展开、设置、下载等）默认呈现温和且具有空气感的浅灰色（textMuted），避免喧宾夺主。
 * 3. 悬浮变色反馈：内置轻量感交互状态机。例如「删除图标」在鼠标悬停（Hover）时，默认会自动渲染为危险红，提供防误触的负向心理暗示，符合极简微交互（Micro-Interactions）原则。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../base/DesignTokensContext';
import {
  // 1. 基础操作类 (Operations)
  Plus,
  Pencil,
  Trash2,
  Search,
  RefreshCw,
  Check,
  X,
  // 2. 导航/方向类 (Navigation)
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  // 3. 系统配置类 (System)
  Settings,
  HelpCircle,
  Loader2,
  // 4. 补充新增常用图标
  Upload,
  Download,
  MoreHorizontal,
  MoreVertical,
  GripVertical,
  CheckSquare,
  Square,
  CircleDot,
  Circle,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  // 5. 图像预览专属常用微操图标
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  FlipHorizontal,
  Minimize2
} from 'lucide-react';
import { IconProps, IconName } from '../../types/components';

// 图标字形组件映射表
const ICON_COMPONENTS_MAP: Record<IconName, React.ComponentType<any>> = {
  // 基础操作类
  'plus': Plus,
  'pencil': Pencil,
  'trash': Trash2,
  'search': Search,
  'refresh': RefreshCw,
  'check': Check,
  'x': X,
  // 导航/方向类
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  // 系统配置类
  'settings': Settings,
  'help': HelpCircle,
  'loader': Loader2,
  // 补充新增常用图标
  'upload': Upload,
  'download': Download,
  'more-horizontal': MoreHorizontal,
  'more-vertical': MoreVertical,
  'drag': GripVertical,
  'checkbox-checked': CheckSquare,
  'checkbox-unchecked': Square,
  'radio-checked': CircleDot,
  'radio-unchecked': Circle,
  'ai': Sparkles,
  // 经典语义色映射字形
  'success': CheckCircle,
  'warning': AlertTriangle,
  'error': XCircle,
  'info': Info,
  // 图像控制专属字形
  'zoom-in': ZoomIn,
  'zoom-out': ZoomOut,
  'rotate-cw': RotateCw,
  'rotate-ccw': RotateCcw,
  'flip-x': FlipHorizontal,
  'minimize-2': Minimize2
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  variant,
  hoverVariant,
  spinning,
  className = '',
  onMouseEnter,
  onMouseLeave,
  style,
  ...props
}) => {
  // 🔌 挂钩并读取当前的物理设计令牌参数
  const { tokens } = useDesignTokens();

  // 1. 内置智能状态机：记录鼠标是否悬停在当前的图标实体上
  const [isHovered, setIsHovered] = useState(false);

  // 2. 解析图标字形。如果遇到未知字段，优雅降级为 X (叉号) 标识防崩溃
  const TargetIcon = ICON_COMPONENTS_MAP[name] || X;

  // 💡 智能默认行为注入逻辑
  // 2.1 针对特定语义图标赋予默认且不易混淆的专属颜色体系
  let resolvedVariant = variant;
  if (!resolvedVariant) {
    switch (name) {
      case 'success':
        resolvedVariant = 'success';
        break;
      case 'warning':
        resolvedVariant = 'warning';
        break;
      case 'error':
        resolvedVariant = 'danger'; // 错误的语义映射至“危险红色”
        break;
      case 'info':
        resolvedVariant = 'info';
        break;
      case 'ai':
        resolvedVariant = 'primary'; // AI 图标默认带上品牌主色，增进高科技感知
        break;
      default:
        resolvedVariant = 'default';  // 默认情况下绝不越俎代庖，保持安静的中性非高亮灰
    }
  }

  // 2.2 针对特定操作场景赋予默认 Hover 行为。
  // 例子：删除操作 (trash) 悬停时，默认给予危险红色暗示警告。而其他图标默认无 hover 变色。
  let resolvedHoverVariant = hoverVariant;
  if (!resolvedHoverVariant) {
    if (name === 'trash') {
      resolvedHoverVariant = 'danger'; // 默认悬停时变为鲜红色
    } else {
      resolvedHoverVariant = 'none';   // 其他图标如果不设置，默认悬停不执行调色变化
    }
  }

  // 3. 计算物理尺寸高保真高度
  let pixelSize = 16; // 默认标准 16px (md)
  if (typeof size === 'number') {
    pixelSize = size;
  } else {
    switch (size) {
      case 'xs':
        pixelSize = 12;
        break;
      case 'sm':
        pixelSize = 14;
        break;
      case 'md':
        pixelSize = 16;
        break;
      case 'lg':
        pixelSize = 20;
        break;
      case 'xl':
        pixelSize = 24;
        break;
    }
  }

  // 4. 读取令牌体系中的标准色彩
  const getColorValue = (v: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'custom' | 'none') => {
    switch (v) {
      case 'primary':
        return tokens.colors.iconBrand || tokens.colors.brand;
      case 'success':
        return tokens.colors.success || '#10B981';
      case 'warning':
        return tokens.colors.warning || '#F59E0B';
      case 'danger':
        return tokens.colors.error || '#EF4444';
      case 'info':
        return tokens.colors.info || tokens.colors.brand;
      case 'default':
        return tokens.colors.iconSecondary || tokens.colors.textMuted || '#94A3B8';
      case 'none':
      default:
        return undefined;
    }
  };

  // 5. 根据当前的悬浮状态与契约分配颜色
  const normalColor = getColorValue(resolvedVariant as any);
  const hoverColor = resolvedHoverVariant !== 'none' ? getColorValue(resolvedHoverVariant as any) : undefined;
  
  // 优先应用行内传入的 style 覆盖色，其次是 Hover 触发色，最终 fallback 到常规渲染色
  const strokeColor = (isHovered && hoverColor) ? hoverColor : normalColor;

  // 6. 确定是否需要执行连续性旋转动画 (例如 loader 菊花默认需要自动旋转)
  const isSpinning = spinning !== undefined ? spinning : (name === 'loader');

  // 7. 处理多阶 hover 事件广播
  const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsHovered(false);
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <TargetIcon
      id={props.id || `icon-${name}`}
      width={pixelSize}
      height={pixelSize}
      className={`transition-colors shrink-0 ${isSpinning ? 'animate-spin' : ''} ${className}`}
      style={{
        color: strokeColor,
        stroke: strokeColor, // 某些 lucide SVG 需要结合使用
        transitionDuration: `${tokens.behaviors.motionDurationFast}ms`,
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
};

export default Icon;
