/**
 * ==========================================
 * 文件名称: /src/components/atoms/Sidebar.tsx
 * 功能描述: 高保真、高拟合设计系统的智能导航侧边栏原语 (Sidebar Primitive)。
 * 
 * 🎨 设计系统与应用支持:
 * 1. 深度咬合 useDesignTokens，完美覆盖四种预设美学分支及折角/极圆润圆角模式。
 * 2. 具备 3 种变体美学风格 (Variant):
 *    - classic: 经典卡条式分割底色分界栏，具备极高信息密度。
 *    - modern: 带优雅悬浮卡片、磨砂玻璃与高阶投影的未来感风格。
 *    - minimal: 极简无框，与承载主体完全融合，无边框零噪点。
 *    ℹ️【重要联动逻辑】：当此组件嵌套于开启了 `floatingStyle={true}`的 `AppLayout` 内时，
 *      默认会自动感知并切换为 `minimal`（极简透明），与外部呼吸感卡片完美贴合。
 *      模型/开发者在此集成模式下请保持 `variant` 未指定，显式指定会覆盖此自适应表现。
 * 3. 完美内置可伸缩折叠状态机 (Collapsed State)，支持内外受控。
 * 4. 树形多级手风琴结构 (Tree Accordion Collapse)，子菜单可无级展开且自带高度弹性吸入曲线。
 * 5. 自适应并动态加载任意 Lucide-React 矢量图标，彻底避免业务层硬编码图标。
 * ==========================================
 */

import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesignTokens } from '../base/DesignTokensContext';
import { SidebarProps, SidebarItem } from '../../types/components';
import { AppLayoutContext } from './AppLayout';
import * as Icons from 'lucide-react';

/**
 * 智能动态图标字形解析实体
 * 针对外部指定的各种 icon name，自动动态拉取 render 出来，无匹配则采用 HelpCircle 兜底
 */
const DynamicIcon: React.FC<{ name?: string; className?: string; style?: React.CSSProperties }> = ({ name, className = 'w-4 h-4', style }) => {
  if (!name) return null;
  
  // 支持 PascalCase 首字母大写命名法及常见小写线段风格兼容
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  let resolvedKey = name;
  
  // 将 'chevron-down' 转换为 'ChevronDown'
  if (resolvedKey.includes('-')) {
    resolvedKey = resolvedKey.split('-').map(capitalize).join('');
  } else {
    resolvedKey = capitalize(resolvedKey);
  }

  const LucidComponent = (Icons as any)[resolvedKey] || (Icons as any)[name] || Icons.HelpCircle;
  return <LucidComponent className={className} style={style} />;
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeId,
  onChange,
  collapsed: controlledCollapsed,
  onCollapseChange,
  variant: propVariant,
  width = 240,
  collapsedWidth = 64,
  showCollapseButton = true,
  header,
  footer,
  className = '',
  style,
  id,
}) => {
  const { tokens } = useDesignTokens();
  const layoutCtx = useContext(AppLayoutContext);

  const variant = propVariant !== undefined
    ? propVariant
    : (layoutCtx?.floatingStyle ? 'minimal' : 'classic');

  // 1. 本地状态治理：兼顾折叠状态的受控与非受控机制
  const [localCollapsed, setLocalCollapsed] = useState(false);
  const isCollapsed = controlledCollapsed !== undefined 
    ? controlledCollapsed 
    : (layoutCtx ? layoutCtx.sidebarCollapsed : localCollapsed);

  // 2. 本地项目状态：存储哪些一排大菜单（拥有子项的父菜单）当前处于手风琴“展开”状态
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  // 3. 智能联动：如果菜单项里某个子菜单原本激活了，在初始化时自动让该父节点处于打开状态
  useEffect(() => {
    const parentMap: Record<string, string> = {};
    const traverse = (itemList: SidebarItem[], parentId?: string) => {
      itemList.forEach((item) => {
        if (parentId) {
          parentMap[item.id] = parentId;
        }
        if (item.children && item.children.length > 0) {
          traverse(item.children, item.id);
        }
      });
    };
    traverse(items);

    const activeItemParentId = parentMap[activeId];
    if (activeItemParentId) {
      setExpandedIds((prev) => ({ ...prev, [activeItemParentId]: true }));
    }
  }, [items, activeId]);

  // 处理折叠切换动作
  const handleToggleCollapse = () => {
    const nextVal = !isCollapsed;
    if (controlledCollapsed === undefined) {
      if (layoutCtx) {
        layoutCtx.setSidebarCollapsed(nextVal);
      } else {
        setLocalCollapsed(nextVal);
      }
    }
    if (onCollapseChange) {
      onCollapseChange(nextVal);
    }
  };

  // 处理菜单项点击
  const handleItemClick = (item: SidebarItem) => {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      // 存在子节点时，默认行为是“折叠/张开”该菜单项
      setExpandedIds((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else {
      // 叶子节点，触发全局切换回调
      onChange(item.id, item);
    }
  };

  // 4. 配色、阴影与圆角微美学变体解析 (Theme Sync Engine)
  const getVariantStyles = () => {
    const isDark = tokens.colors.bgPage?.includes('#0') || tokens.colors.bgPage?.includes('#1') || tokens.colors.bgPage?.includes('rgba(15');
    
    // 默认高保白或高质灰
    let bg = tokens.colors.bgCard || '#ffffff';
    let borderStyle = `1px solid ${tokens.colors.border || 'rgba(15, 23, 42, 0.08)'}`;
    let radius = tokens.borders.radiusLg || '12px';
    let shadow = tokens.shadows.sm || '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    let padding = 'p-3';

    switch (variant) {
      case 'modern':
        // 浮动带有背景景深的毛玻璃卡片风格
        bg = isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.75)';
        shadow = tokens.shadows.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        borderStyle = `1px solid ${tokens.colors.border || 'rgba(15, 23, 42, 0.06)'}`;
        radius = tokens.borders.radiusLg || '16px';
        padding = 'p-3.5 m-3 h-[calc(100%-1.5rem)] backdrop-blur-md';
        break;
      case 'minimal':
        // 完全融入页面，去掉多余边线，极佳无噪
        bg = 'transparent';
        borderStyle = '0px none';
        shadow = 'none';
        radius = '0px';
        padding = 'py-4 px-3';
        break;
      case 'classic':
      default:
        // 经典扎实的卡条分割
        bg = tokens.colors.bgCard || '#ffffff';
        borderStyle = `1px solid ${tokens.colors.border || 'rgba(15, 23, 42, 0.08)'}`;
        radius = '0px'; // 经典左右顶边通铺
        shadow = 'none';
        padding = 'p-3';
        break;
    }

    return { bg, borderStyle, radius, shadow, padding };
  };

  const vStyle = getVariantStyles();

  // 💡 Framer Motion 动效缓动曲线兼容映射关系 (将设计系统中的 'spring' | 'smooth' | 'rigid' 映射为 motion 兼容的对应格式)
  const getFramerMotionEase = () => {
    switch (tokens.behaviors.motionCurve) {
      case 'spring':
        return [0.34, 1.56, 0.64, 1]; // 极致Q弹的反弹曲线
      case 'rigid':
        return 'linear';              // 行进生硬干脆，毫无拖沓
      case 'smooth':
      default:
        return [0.4, 0, 0.2, 1];      // 经典流畅平滑过渡
    }
  };

  const motionEase = getFramerMotionEase();

  // 避免将 border 缩写 (shorthand) 与非缩写属性 (borderRight) 混合作用在单个 DOM 上产生的 React/Framer-motion 页面更新警告
  const getBorderStyles = (): React.CSSProperties => {
    if (variant === 'modern') {
      return {
        border: vStyle.borderStyle,
      };
    } else if (variant === 'classic') {
      return {
        borderRight: vStyle.borderStyle,
        borderTop: 'none',
        borderLeft: 'none',
        borderBottom: 'none',
      };
    } else {
      return {
        border: 'none',
      };
    }
  };

  const borderStyles = getBorderStyles();

  // 5. 渲染单条菜单节点
  const renderMenuItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedIds[item.id] || false;
    
    // 回调树中的父高亮或激活高亮检测
    const isChildActive = (node: SidebarItem): boolean => {
      if (node.id === activeId) return true;
      if (node.children) {
        return node.children.some(isChildActive);
      }
      return false;
    };
    const isActive = item.id === activeId || (hasChildren && isChildActive(item));
    const isChildItemActive = hasChildren && isChildActive(item) && !isExpanded;

    // 根据高亮判定项目前缀颜色与底色
    const itemBgColor = isActive 
      ? (variant === 'minimal' ? 'transparent' : (tokens.colors.bgHover || 'rgba(79, 70, 229, 0.05)'))
      : 'transparent';

    const itemTextColor = item.disabled
      ? (tokens.colors.textMuted || 'rgba(100, 116, 139, 0.4)')
      : isActive
        ? (tokens.colors.brand || '#4f46e5')
        : (tokens.colors.textSecondary || '#475569');

    // 经典字体字重随 tokens
    const itemFontWeight = isActive ? 'font-semibold' : 'font-medium';

    const isChild = level > 0;
    const paddingClass = isChild ? 'py-2 pl-2.5 pr-2' : 'py-2.5 px-3';
    const textClass = isChild ? 'text-[12.5px]' : 'text-sm';
    const gapClass = isChild ? 'gap-2' : 'gap-3';

    return (
      <div key={item.id} className="w-full">
        {/* 单条导航触摸卡 */}
        <button
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          className={`w-full group relative flex items-center justify-between text-left cursor-pointer ${paddingClass} mb-0.5 rounded-lg outline-none select-none transition-colors duration-150`}
          style={{
            backgroundColor: itemBgColor,
            borderRadius: tokens.borders.radiusMd || '8px',
            color: itemTextColor,
            opacity: item.disabled ? 0.4 : 1,
          }}
          title={isCollapsed ? item.label : undefined}
        >
          {/* 左侧主要区域 */}
          <div className={`flex items-center min-w-0 flex-1 ${gapClass}`}>
            {/* 动态图标 */}
            {item.icon ? (
              <div
                className="flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105"
                style={{
                  color: isActive ? (tokens.colors.brand || '#4f46e5') : 'inherit',
                }}
              >
                <DynamicIcon name={item.icon} className={isChild ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </div>
            ) : (
              // 缩略折叠且属于一级节点时自动生成文字首字母标志
              isCollapsed && level === 0 && (
                <div 
                  className="w-5 h-5 flex items-center justify-center shrink-0 text-[10px] font-bold rounded"
                  style={{
                    backgroundColor: tokens.colors.bgHover || 'rgba(15, 23, 42, 0.05)',
                    color: isActive ? tokens.colors.brand : 'inherit'
                  }}
                >
                  {item.label?.charAt(0).toUpperCase()}
                </div>
              )
            )}

            {/* 标签文字 (支持收折起伏淡出动画) */}
            {!isCollapsed && (
              <span
                className={`truncate ${textClass} ${itemFontWeight}`}
              >
                {item.label}
              </span>
            )}
          </div>

          {/* 右侧微交互区：角标 and 展开角 */}
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 shrink-0 ml-1">
              {/* Badge 徽标 */}
              {item.badge !== undefined && (
                <span
                  className="px-1.5 py-0.5 text-[9px] font-bold rounded-full select-none"
                  style={{
                    backgroundColor: item.badgeType === 'primary' ? (tokens.colors.brand || '#4f46e5') :
                                     item.badgeType === 'success' ? '#10b981' :
                                     item.badgeType === 'warning' ? '#f59e0b' :
                                     item.badgeType === 'error' ? '#ef4444' :
                                     (tokens.colors.bgHover || 'rgba(15, 23, 42, 0.08)'),
                    color: item.badgeType ? '#ffffff' : (tokens.colors.textSecondary || '#64748b'),
                  }}
                >
                  {item.badge}
                </span>
              )}

              {/* 手风琴折叠小箭头 */}
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.15, ease: motionEase }}
                  className="opacity-55 group-hover:opacity-100"
                >
                  <Icons.ChevronRight className="w-3.5 h-3.5" />
                </motion.div>
              )}
            </div>
          )}

          {/* 折叠窄态下，如果子项被点亮激活，在侧边栏边缘闪烁一颗提示呼吸点 */}
          {isCollapsed && (isChildItemActive || (isActive && level > 0)) && (
            <div 
              className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full animate-pulse mr-0.5"
              style={{ backgroundColor: tokens.colors.brand || '#4f46e5' }}
            />
          )}
        </button>

        {/* 下属树子项 (具有折叠展开的极致高度弹性缓冲动画) */}
        {hasChildren && !isCollapsed && (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.22,
                  ease: motionEase,
                }}
                className="overflow-hidden pl-3 border-l ml-[18px] space-y-0.5"
                style={{ borderColor: tokens.colors.border || 'rgba(15, 23, 42, 0.06)' }}
              >
                {item.children?.map((child) => renderMenuItem(child, level + 1))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <motion.div
      id={id}
      className={`flex flex-col flex-shrink-0 relative overflow-hidden h-full ${vStyle.padding} ${className}`}
      style={{
        width: isCollapsed ? collapsedWidth : width,
        backgroundColor: vStyle.bg,
        borderRadius: vStyle.radius,
        boxShadow: vStyle.shadow,
        ...borderStyles,
        ...style,
      }}
      animate={{ width: isCollapsed ? collapsedWidth : width }}
      transition={{
        duration: 0.28,
        ease: [0.25, 1, 0.5, 1], // 使用丝滑阻尼曲线 (Out-Quintic)，比标准过渡更轻灵
      }}
    >
      {/* 1. Header 部分 */}
      {header && (
        <div className="mb-4 flex items-center justify-between shrink-0 min-h-[44px]">
          <AnimatePresence mode="popLayout">
            {!isCollapsed ? (
              <motion.div 
                key="header-expanded"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                {header}
              </motion.div>
            ) : (
              <motion.div 
                key="header-collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full flex justify-center"
              >
                {/* 缩进窄态下的 Header 推荐简图 */}
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs select-none"
                  style={{
                    backgroundColor: tokens.colors.bgHover || 'rgba(15, 23, 42, 0.05)',
                    color: tokens.colors.brand || '#4f46e5'
                  }}
                >
                  A
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 2. Main 滚动区域 */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-1">
        {items.map((item) => renderMenuItem(item))}
      </div>

      {/* 3. Footer 部分 */}
      {(footer || showCollapseButton !== false) && (
        <div className="mt-auto pt-3 border-t flex flex-col gap-2 shrink-0" style={{ borderColor: tokens.colors.border || 'rgba(15, 23, 42, 0.08)' }}>
          {footer && (
            <div className="flex select-none">
              <AnimatePresence mode="popLayout">
                {!isCollapsed ? (
                  <motion.div 
                    key="footer-expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                  >
                    {footer}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="footer-collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full flex justify-center py-1"
                  >
                    <div 
                      className="w-7 h-7 rounded-full flex items-center justify-center" 
                      title="User Profile"
                      style={{
                        backgroundColor: tokens.colors.bgHover || 'rgba(15, 23, 42, 0.05)',
                        color: tokens.colors.textSecondary || '#64748b'
                      }}
                    >
                      <Icons.User className="w-3.5 h-3.5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* 一键折叠小开关 */}
          {showCollapseButton && (
            <button
              onClick={handleToggleCollapse}
              className="w-full flex items-center justify-center py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors"
              style={{
                backgroundColor: tokens.colors.bgHover || 'rgba(15, 23, 42, 0.04)',
                color: tokens.colors.textSecondary || '#64748b',
              }}
              title={isCollapsed ? '展开菜单' : '收起菜单'}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Icons.ChevronLeft className="w-4 h-4" />
              </motion.div>
              {!isCollapsed && <span className="ml-2">收缩导航栏</span>}
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};
