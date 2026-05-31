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

// 3. 【Dropdown】下拉单选器契约
export interface DropdownProps {
  label?: string;
  description?: string;
  options: Array<{
    label: string;
    value: string;
    description?: string;
  }>;
  value: string;
  onChange: (value: string) => void;
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

