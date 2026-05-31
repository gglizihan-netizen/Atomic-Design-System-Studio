import React from 'react';

/**
 * ==========================================
 * 文件名称: /src/types/components.ts
 * 功能描述: Atomix UI 原子原语类型契约大一统字典 (Type Contracts Dictionary)
 * 目标受众: 后续接入的 AI Assistant / IDE 助手等 (用于零 Token 损耗极速查找组件声明)
 * ==========================================
 */

// 1. 【Button】原子按钮基础契约
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

// 2. 【Input】文本输入框契约
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  id?: string;
}

// 3. 【Dropdown】下拉单/复选器契约
export interface DropdownOption {
  label: string;
  value: string;
  description?: string;
}

export interface DropdownProps {
  label?: string;
  description?: string;
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: any) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  enableSearch?: boolean;
  multiple?: boolean;
  id?: string;
}

// 4. 【Modal】气泡遮罩弹窗契约
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  borderless?: boolean;
  id?: string;
}

// 5. 【Navbar】导航条契约
export interface NavbarProps {
  title: string;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  id?: string;
}

// 6. 【Icon】图标组件契约
export type IconName =
  | 'plus' | 'pencil' | 'trash' | 'search' | 'refresh' | 'check' | 'x'
  | 'chevron-down' | 'chevron-right' | 'chevron-left'
  | 'settings' | 'help' | 'loader'
  | 'upload' | 'download'
  | 'more-horizontal' | 'more-vertical' | 'drag'
  | 'checkbox-checked' | 'checkbox-unchecked'
  | 'radio-checked' | 'radio-unchecked'
  | 'ai' | 'success' | 'warning' | 'error' | 'info';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'custom';
  hoverVariant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'none';
  spinning?: boolean;
}

// 7. 【Breadcrumb】智能面包屑契约
export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  [key: string]: any;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  onItemClick?: (item: BreadcrumbItem, index: number, event: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

// 8. 【Pagination】高标高保真分页原语契约
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'classic' | 'modern' | 'minimal';
  disabled?: boolean;
  showFirstLast?: boolean; // 是否展示最前/最后页的快捷双箭头跳转按键
  showPageSizeChanger?: boolean; // 是否展示快速更换每页条数的轻型下拉器
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}

// 9. 【Steps】高标高保真物理自适应步骤条契约
export interface StepItem {
  title: string;
  description?: string;
  icon?: string; // 支持可选的 Lucide 图标名称，例如 'User', 'CreditCard', 'Check'
  disabled?: boolean;
  status?: 'wait' | 'process' | 'finish' | 'error'; // 显式状态重写，如果不传则通过当前索引智能计算
}

export interface StepsProps {
  current: number; // 当前进度的步骤索引 (0-indexed: 0 代表第一步)
  items: StepItem[];
  direction?: 'horizontal' | 'vertical'; // 步骤条方向：横向布局 / 纵向布局
  size?: 'sm' | 'md' | 'lg'; // 步骤条尺寸规格
  clickable?: boolean; // 点击步骤节点是否可直接进行跳迁回调
  onStepChange?: (index: number) => void; // 页签步骤受控切换动作
  className?: string;
  style?: React.CSSProperties;
}




