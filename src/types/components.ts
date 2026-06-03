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
  | 'ai' | 'success' | 'warning' | 'error' | 'info'
  | 'zoom-in' | 'zoom-out' | 'rotate-cw' | 'rotate-ccw' | 'flip-x' | 'minimize-2';

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

// 10. 【Tabs】高标高保真选项卡原子契约
export interface TabItem {
  id: string; // 选项唯一标识 ID
  label: string; // 选项卡标签文本
  icon?: string; // 选填 Lucide 矢量名，例如 'User', 'Settings', 'Compass', 'Mail', 'FileText'
  disabled?: boolean; // 是否锁定禁用该单选项卡
  badge?: string | number; // 右侧气泡标识提示（如数字 99+ 或 New 标签）
}

export interface TabsProps {
  activeId: string; // 当前激活的选项 ID
  items: TabItem[]; // 选项卡面板列表
  onChange: (id: string) => void; // 激活项切换回调
  variant?: 'line' | 'pill' | 'card'; // 选项卡样式：line (下划线风格); pill (精致气泡/胶囊悬浮风格); card (卡片边框切分风)
  size?: 'sm' | 'md' | 'lg'; // 规格大小自适应
  direction?: 'horizontal' | 'vertical'; // 常规水平排列 / 高级垂直仪表盘纵向卡片式排列
  fullWidth?: boolean; // 是否撑满父容器横幅宽度
  className?: string;
  style?: React.CSSProperties;
}

// 11. 【DatePicker】高标高保真智能日期选择器契约
export interface DatePickerProps {
  value?: Date | string | null; // 选定日期，支持 Date 对象、ISO 字符串或 null (未选择)
  onChange: (date: Date | null, dateString: string) => void; // 选择变化回调，输出 Date 对象与格式化字符串 "YYYY-MM-DD"
  placeholder?: string; // 尚未选择时的引导占位文案
  disabled?: boolean; // 禁用态一键锁定
  size?: 'sm' | 'md' | 'lg'; // 尺寸规格自适应
  label?: string; // 顶置标题标签
  description?: string; // 辅助描述文案
  error?: string; // 表单错误报警文本
  minDate?: Date; // 最小允许选择日期
  maxDate?: Date; // 最大允许选择日期
  id?: string; // 唯一 HTML 标识符
}

// 12. 【Slider】高标高保真物理自适应滑块原语契约
export interface SliderProps {
  value: number; // 受控绑定的任意数值
  onChange: (value: number) => void; // 数值发生改变时的实时触发回调
  min?: number; // 最小值界，默认 0
  max?: number; // 最大值界，默认 100
  step?: number; // 每步调节梯度进给量，默认 1
  disabled?: boolean; // 是否置灰且阻止任何滑动微交互
  size?: 'sm' | 'md' | 'lg'; // 规格大小：sm(纤细，高度/厚度小)；md(默认中性)；lg(厚实饱满)
  label?: string; // 顶部的解释说明文字标签
  description?: string; // 辅助说明提示文案
  error?: string; // 报错说明文案，开启时滑轨及数值标签会自动处于设计系统设定的警戒色
  iconLeft?: React.ReactNode; // 左侧修饰图标
  iconRight?: React.ReactNode; // 右侧修饰图标
  showInput?: boolean; // 是否展示精密辅助调节数字输入框
  showTooltip?: boolean; // 拖动调节时是否浮现数值气泡 tooltip
  showMarks?: boolean; // 是否展示刻度端线与刻度标签文本
  marks?: { value: number; label?: string }[]; // 精密定制的刻度关键锚点集合
  id?: string; // 唯一 HTML DOM ID
}

// 13. 【Progress】高标高保真智能进度条原语契约
export interface ProgressProps {
  value: number; // 当前进度数值 (0 - max 之间)
  max?: number; // 最大进度界限，默认 100
  size?: 'sm' | 'md' | 'lg'; // 进度条粗细规格：sm (纤细，高度 4px)；md (中等常规，高度 8px)；lg (饱满，高度 12px)
  status?: 'default' | 'success' | 'warning' | 'exception' | 'active'; // 状态色：default(品牌主色)；success(成功绿)；warning(警告黄)；exception(出错红)；active(具有呼吸斑马流动动画)
  showInfo?: boolean; // 是否展示进度文本/比例百分比
  infoPosition?: 'right' | 'top' | 'inside'; // 百分比信息标签所在方位，默认 'right'
  label?: string; // 顶部的解释说明文字标签
  description?: string; // 辅助说明提示文案
  striped?: boolean; // 是否开启斑马斜纹质感
  animated?: boolean; // 斑马孔斜纹是否具有流动动画，或者在 active 模式下保持炫彩跃跃欲试感
  id?: string; // 唯一 HTML DOM ID
}

// 14. 【Loading】高保真智能加载呈现器原语契约
export interface LoadingProps {
  spinning?: boolean; // 是否处于加载运转中，默认为 true
  type?: 'spinner' | 'dots' | 'pulse' | 'bar' | 'skeleton'; // 加载器样式动画形态：spinner(经典旋转圆弧)；dots(跳跃水流三点)；pulse(双重水波呼吸涟漪)；bar(顶部流光不确定进度条)；skeleton(骨架渐变发光占位图)
  size?: 'sm' | 'md' | 'lg' | 'xl'; // 视觉尺寸规格梯度
  color?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'white'; // 颜色配置：default/brand 使用主色，或者映射系统预设
  tip?: string; // 下方或右侧伴随的加载状态解释文字 (例如 '正在载入机房节点...')
  tipPosition?: 'bottom' | 'right'; // 伴随提示字样的排版相对位置，默认 'bottom'
  backdrop?: boolean; // 是否开启毛玻璃悬浮全屏遮罩 (常挂在绝对定位容器中阻止指针事件)
  id?: string; // 唯一 HTML DOM ID
}

// 15. 【Alert】高保真固定信息警告条原语契约
export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'; // 信息警告类型等级
  message: string; // 警告提示核心标题文本
  description?: string; // 扩充说明描述文字
  closable?: boolean; // 是否显示手动关闭叉号按钮
  onClose?: () => void; // 关闭时的回调句柄
  showIcon?: boolean; // 是否展示左侧标志性状态图案图标
  icon?: string; // 自定义图标，覆盖默认图标类型 (输入库标准 Lucide 图标名称)
  action?: React.ReactNode; // 自定义右侧操作区，用来安插微小 Button 等控制原语
  id?: string; // 唯一 HTML DOM ID
}

// 16. 【Toast】高保真全局浮动轻量信息反馈契约
export interface ToastItem {
  id: string; // 唯一标识符
  type?: 'info' | 'success' | 'warning' | 'error' | 'loading'; // 反馈标志
  message: string; // 提示内容主体字句
  description?: string; // 细节解释二级文字
  duration?: number; // 存在时长，毫秒，传入 0 表示除非手动触发，否则永不超时闭合 (默认 3000)
  closable?: boolean; // 是否在右端展示一个叉号供提前手动捏碎
}

export interface ToastProps {
  items: ToastItem[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'; // 呼出呈现悬停方向，默认 'top-center'
  id?: string; // 唯一 HTML DOM ID
}

// 17. 【Tag】高保真标贴组件契约
export interface TagProps {
  children: React.ReactNode; // 标贴内容
  type?: 'default' | 'primary' | 'success' | 'warning' | 'error'; // 语义色彩类型
  variant?: 'solid' | 'soft' | 'outline' | 'dot'; // 视觉展现变体方式
  size?: 'sm' | 'md' | 'lg'; // 标贴规格尺寸
  closable?: boolean; // 是否允许出现关闭叉号
  icon?: React.ReactNode; // 支持在左侧嵌入特定状态小图标
  onClose?: () => void; // 触发手动点击关闭叉号后的动作回调
  className?: string; // 允许混入额外的 Tailwind 类
  style?: React.CSSProperties; // 允许混入额外的内置 CSS
  id?: string; // 唯一 HTML DOM ID
}

// 18. 【List】高保真数据驱动通用列表原语契约
export interface ListProps<T = any> {
  key?: React.Key; // 允许混入内置 React key
  dataSource: T[]; // 列表数据源
  renderItem: (item: T, index: number) => React.ReactNode; // 列表项动态渲染函数
  header?: React.ReactNode; // 选填：列表头部区块
  footer?: React.ReactNode; // 选填：列表尾部区块
  bordered?: boolean; // 是否展示卡片封套边框
  split?: boolean; // 列表项之间是否渲染精密中性切分线
  loading?: boolean; // 是否开启骨架或菊花遮罩加载态
  size?: 'sm' | 'md' | 'lg'; // 列表项尺寸，SM(紧凑), MD(常规), LG(高级豪阔空灵)
  emptyText?: string; // 空数据时的优雅中性展现文案
  transparent?: boolean; // 选填：是否彻底去底色（透明背景）
  hoverable?: boolean; // 选填：开启整行高亮悬停，不再需要 renderItem 层级嵌套
  onRowClick?: (item: T, index: number) => void; // 行级别的点击交互（附带悬停效果与点击反馈）
  pagination?: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
    pageSize?: number;
  }; // 数据集过长时伴随自带的轻型分页尾页脚
  className?: string; // 附加 CSS 类名
  style?: React.CSSProperties; // 附加样式
  id?: string; // 唯一 HTML DOM ID
}

// 19. 【Table】高标高保真数据驱动通用表格原语契约
export interface TableColumn<T = any> {
  key: string;              // 列唯一标识 Key
  title: string;            // 列头文本标题
  dataIndex?: string;       // 数据对应的属性字段键名 (若不传，则可通过 render 自行操作)
  width?: string | number;  // 列宽自适应设置权重 (如 120, '20%', 'auto')
  align?: 'left' | 'center' | 'right'; // 文本水平对齐朝向
  sorter?: boolean | ((a: T, b: T) => number); // 是否支持排序或排序函数
  render?: (value: any, record: T, rowIndex: number) => React.ReactNode; // 特异化自定义渲染插槽
}

export interface TableRowSelection<T = any> {
  selectedRowKeys: string[]; // 选中的行 key (通过 record.key 或 rowIndex 判定)
  onChange: (selectedRowKeys: string[], selectedRows: T[]) => void; // 变更回调
  getCheckboxProps?: (record: T) => { disabled?: boolean }; // 选填：根据记录返回 Checkbox 禁用属性变体
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[]; // 表格列配置字典数组
  dataSource: T[];           // 物理数据源
  rowKey?: string | ((record: T) => string); // 行标识 Key 判别机制 (默认为 'key' 或 'id')
  bordered?: boolean;        // 是否渲染外卡片封套边线
  striped?: boolean;         // 是否启用奇偶行色双纹理交替
  hoverable?: boolean;       // 是否开启单行高亮悬停表现
  loading?: boolean;         // 是否启用脉冲渐变骨架加载效果
  size?: 'sm' | 'md' | 'lg'; // 表格行高/内间距自适应微控规格
  emptyText?: string;        // 无数据时的优雅兜底提示文本
  onRowClick?: (record: T, rowIndex: number) => void; // 单击整行的交互动作反馈
  rowSelection?: TableRowSelection<T>; // 表格行多选/单选控制面板
  pagination?: {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
    pageSize?: number;
  }; // 高保真自带的尾部高密度微型分页系统
  className?: string; // 扩充覆盖的 Tailwind 类名
  style?: React.CSSProperties; // 覆盖的行样式
  id?: string; // 唯一 HTML DOM ID
  key?: React.Key; // 允许在 Schema 动态组装时伴随标准 JSX key
}

// 20. 【ImageViewer】高标高保真图片预览原语契约
export interface ImageViewerProps {
  src: string | string[];     // 图片源或图片源数组
  visible: boolean;           // 是否可见/开启
  onClose: () => void;        // 关闭回调
  current?: number;           // 默认/受控的当前图片索引 (针对多图情况)
  onIndexChange?: (index: number) => void; // 图片索引变更回调 (针对多图情况)
  titles?: string | string[]; // 图片标题或标题数组
  downloadable?: boolean;     // 是否支持展示下载动作按钮
  enableKeyboard?: boolean;   // 是否支持键盘交互事件机制（Esc 关闭，左右键切图）
  enableMaskClose?: boolean;  // 点击磨砂背景是否允许执行快速关闭
  rotatable?: boolean;        // 是否支持展示旋转动作按钮
  mirrorable?: boolean;       // 是否支持展示镜像水平翻转动作按钮
  zoomable?: boolean;         // 是否支持展示放大缩小动作按钮与原比例badge
  id?: string;                // 唯一 HTML DOM ID
}

// 21. 【Skeleton】高保真通用骨架屏原语契约
export interface SkeletonProps {
  variant?: 'circle' | 'rect' | 'text' | 'image' | 'button' | 'card' | 'list' | 'complex'; // 骨架屏的基础物理形状及预设业务场景形态
  width?: string | number;               // 宽度配置 (例如: '100%', 200, '4rem')
  height?: string | number;              // 高度配置 (例如: '1.25rem', 40, '150px')
  animation?: 'pulse' | 'wave' | 'none'; // 骨架屏炫光动效：pulse、wave、none
  rows?: number;                         // 针对 text, list 或 complex 形态支持自动输出多行
  avatar?: boolean;                      // list 或 complex 场景下是否伴生左侧圆形头像骨架
  title?: boolean;                       // list 或者 complex 场景下是否伴生上方标题骨架块
  active?: boolean;                      // 默认处于骨架态；若为 false，则优雅淡出渲染包裹的子组件
  imageLabel?: string;                   // 针对 image 变体自定义配字文字，规避英文硬编码
  children?: React.ReactNode;            // 包裹的实际待渲染子组件
  className?: string;                    // 额外覆盖的 className
  style?: React.CSSProperties;           // 额外顶置的 CSS 物理层属性
  id?: string;                           // 唯一 HTML DOM ID
}

// 22. 【Sidebar】高标高保真智能侧边栏组件契约
export interface SidebarItem {
  id: string;                            // 选项唯一标识 ID
  label: string;                         // 导航标签文本
  icon?: string;                         // 选填 Lucide 矢量名，如 'Home', 'Settings', 'Shield', 'Database'
  disabled?: boolean;                    // 是否锁定禁用该单元项
  badge?: string | number;               // 旁边悬挂的气泡标识
  badgeType?: 'default' | 'primary' | 'success' | 'warning' | 'error'; // 徽标的主题类型
  href?: string;                         // 选填，支持直链跳转
  children?: SidebarItem[];              // 嵌套子菜单，若存在则支持手风琴式折叠展开
}

export interface SidebarProps {
  items: SidebarItem[];                  // 侧边栏导航条目列表
  activeId: string;                      // 当前激活的选项 ID
  onChange: (id: string, item: SidebarItem) => void; // 菜单点击切换的回调
  collapsed?: boolean;                   // 侧边折叠状态 (受控)
  onCollapseChange?: (collapsed: boolean) => void; // 折叠状态变更时的回调
  variant?: 'classic' | 'modern' | 'minimal'; // 视觉变体风格：classic（经典整洁分栏）、modern（浮置卡片毛玻璃微调）、minimal（极简无边界融合）
  width?: string | number;               // 侧边栏展开宽度，默认 240px
  collapsedWidth?: string | number;      // 侧边栏折叠宽度，默认 64px
  showCollapseButton?: boolean;          // 是否显示自带的折叠切换按钮，默认 true
  header?: React.ReactNode;              // 侧边栏顶部可置入的 LOGO / 标题区域
  footer?: React.ReactNode;              // 侧边栏底部可置入的用户账户 / 设置动作区域
  className?: string;                    // 额外覆盖的 className
  style?: React.CSSProperties;           // 额外附加的 CSS 样式
  id?: string;                           // 唯一 HTML DOM ID
}









