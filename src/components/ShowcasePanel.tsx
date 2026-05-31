import React, { useState } from 'react';
import { useDesignTokens } from './base/DesignTokensContext';
import { Button } from './atoms/Button';
import { Input } from './atoms/Input';
import { Dropdown } from './atoms/Dropdown';
import { Modal } from './atoms/Modal';
import { Navbar } from './atoms/Navbar';
import { Icon } from './atoms/Icon';
import { Breadcrumb } from './atoms/Breadcrumb';
import { Pagination } from './atoms/Pagination';
import { Steps } from './atoms/Steps';
import { IconName } from '../types/components';
import {
  Code,
  Sliders,
  Sparkles,
  Info,
  Copy,
  Check,
  Smartphone,
  Eye,
  Mail,
  User,
  Lock,
  ArrowRight,
  ShieldAlert,
  Menu,
  Home,
  Star,
  Monitor,
  Tablet,
  Laptop as LaptopIcon,
  Play,
  RotateCcw,
  Zap,
  Book,
  Terminal,
  Activity,
  Award,
  ChevronDown
} from 'lucide-react';

export const ShowcasePanel: React.FC = () => {
  const { tokens, activePreset, setPreset, activeTab } = useDesignTokens();
  
  // Custom states for sub-tabs layout
  const [activeSubTab, setActiveSubTab] = useState<'preview' | 'docs' | 'api' | 'specs' | 'history'>('preview');
  const [device, setDevice] = useState<'desktop' | 'laptop' | 'tablet' | 'mobile'>('desktop');
  const [activeFramework, setActiveFramework] = useState<'react'>('react');
  const [copiedConfig, setCopiedConfig] = useState(false);


  // Trigger copy configs
  const [copiedCodeCode, setCopiedCodeCode] = useState(false);

  // States for interactive prop controllers configuration
  // 1. Button Props states
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'text' | 'danger'>('primary');
  const [btnSize, setBtnSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnIcon, setBtnIcon] = useState<'none' | 'left' | 'right'>('none');
  const [btnText, setBtnText] = useState('立即部署应用');

  // 2. Input Props states
  const [inputSize, setInputSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [inputLabel, setInputLabel] = useState('企业电子邮箱 (Email)');
  const [inputPlaceholder, setInputPlaceholder] = useState('example@company.com');
  const [inputDesc, setInputDesc] = useState('我们会向此邮箱发送实例运行报告');
  const [inputError, setInputError] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [inputIconLeft, setInputIconLeft] = useState(true);
  const [inputValue, setInputValue] = useState('');

  // 3. Dropdown Props states
  const [dropSize, setDropSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [dropLabel, setDropLabel] = useState('可用区网络配置 (VPC Subnet)');
  const [dropDesc, setDropDesc] = useState('请选择服务器实例分配的私有子网区域');
  const [dropError, setDropError] = useState('');
  const [dropSearch, setDropSearch] = useState(true);
  const [dropDisabled, setDropDisabled] = useState(false);
  const [dropValue, setDropValue] = useState<string | string[]>('asia-east1-a');
  const [dropMultiple, setDropMultiple] = useState(false);
  const [dropShowDesc, setDropShowDesc] = useState(false);

  // 4. Modal Props states
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('sm');
  const [modalTitle, setModalTitle] = useState('提示');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalHasFooter, setModalHasFooter] = useState(true);
  const [modalIsAlertStyle, setModalIsAlertStyle] = useState(true);

  // 5. Navbar states
  const [navBrandName, setNavBrandName] = useState('NEXUS LOGISTICS');
  const [navActiveIndex, setNavActiveIndex] = useState(0);

  // 6. Icon Demo states
  const [iconName, setIconName] = useState<IconName>('ai');
  const [iconSize, setIconSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('xl');
  const [iconVariant, setIconVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'custom'>('default');
  const [iconHoverVariant, setIconHoverVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'none'>('none');
  const [iconSpinning, setIconSpinning] = useState(false);
  const [iconCustomSize, setIconCustomSize] = useState<number>(36);
  const [iconSizeType, setIconSizeType] = useState<'preset' | 'custom'>('preset');

  // 7. Breadcrumb Demo states
  const [breadMaxItems, setBreadMaxItems] = useState<number>(4);
  const [breadItemsBefore, setBreadItemsBefore] = useState<number>(1);
  const [breadItemsAfter, setBreadItemsAfter] = useState<number>(1);
  const [breadSeparator, setBreadSeparator] = useState<'default' | 'slash' | 'chevron' | 'hyphen' | 'arrow'>('default');
  const [breadClickedLog, setBreadClickedLog] = useState<string>('暂无（点击上方节点触发点击事件记录）');

  // 8. Pagination Demo states
  const [pagCurrentPage, setPagCurrentPage] = useState<number>(3);
  const [pagTotalPages, setPagTotalPages] = useState<number>(10);
  const [pagSize, setPagSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [pagVariant, setPagVariant] = useState<'classic' | 'modern' | 'minimal'>('classic');
  const [pagDisabled, setPagDisabled] = useState<boolean>(false);
  const [pagShowFirstLast, setPagShowFirstLast] = useState<boolean>(true);
  const [pagShowSizeChanger, setPagShowSizeChanger] = useState<boolean>(true);
  const [pagPageSize, setPagPageSize] = useState<number>(10);

  // 9. Steps Demo states
  const [stepsCurrent, setStepsCurrent] = useState<number>(1);
  const [stepsDirection, setStepsDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [stepsSize, setStepsSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [stepsClickable, setStepsClickable] = useState<boolean>(true);
  const [stepsShowDesc, setStepsShowDesc] = useState<boolean>(true);
  const [stepsHasIcons, setStepsHasIcons] = useState<boolean>(true);
  const [stepsHasError, setStepsHasError] = useState<boolean>(false);

  // Toggle multiple sub options helper
  const handleToggleMultiple = (checked: boolean) => {
    setDropMultiple(checked);
    if (checked) {
      setDropValue(typeof dropValue === 'string' ? [dropValue] : (Array.isArray(dropValue) ? dropValue : ['asia-east1-a']));
    } else {
      setDropValue(Array.isArray(dropValue) && dropValue.length > 0 ? dropValue[0] : 'asia-east1-a');
    }
  };

  const dropOptions = [
    { label: '华东1区 (杭州) - 可用区A', value: 'cn-hangzhou-a', description: '低空载，优质公网链路' },
    { label: '亚太1区 (新加坡) - 可用区A', value: 'asia-east1-a', description: '国际业务推荐，高可用度' },
    { label: '华北2区 (北京) - 极速专属线路', value: 'cn-beijing-b', description: '高抗载集群，吞吐性能极佳' },
    { label: '欧洲地区 (法兰克福) - 跨洲网关', value: 'eu-west-1', description: '合规标准节点，支持GDPR安全协议' },
  ];

  const helperIcons = {
    mail: <Mail className="w-4 h-4" />,
    user: <User className="w-4 h-4" />,
    lock: <Lock className="w-4 h-4" />,
    arrow: <ArrowRight className="w-4 h-4" />,
    alert: <ShieldAlert className="w-4 h-4" />,
  };

  // Reset to default config parameters
  const handleResetDefaults = () => {
    if (activeTab === 'button') {
      setBtnVariant('primary');
      setBtnSize('md');
      setBtnDisabled(false);
      setBtnLoading(false);
      setBtnIcon('none');
      setBtnText('立即部署应用');
    } else if (activeTab === 'input') {
      setInputSize('md');
      setInputLabel('企业电子邮箱 (Email)');
      setInputPlaceholder('example@company.com');
      setInputDesc('我们会向此邮箱发送实例运行报告');
      setInputError('');
      setInputDisabled(false);
      setInputIconLeft(true);
      setInputValue('');
    } else if (activeTab === 'dropdown') {
      setDropSize('md');
      setDropLabel('可用区网络配置 (VPC Subnet)');
      setDropDesc('请选择服务器实例分配的私有子网区域');
      setDropError('');
      setDropSearch(true);
      setDropDisabled(false);
      setDropValue('asia-east1-a');
      setDropMultiple(false);
      setDropShowDesc(false);
    } else if (activeTab === 'modal') {
      setModalSize('sm');
      setModalTitle('提示');
      setModalIsOpen(false);
      setModalHasFooter(true);
      setModalIsAlertStyle(true);
    } else if (activeTab === 'navbar') {
      setNavBrandName('NEXUS LOGISTICS');
      setNavActiveIndex(0);
    } else if (activeTab === 'icon') {
      setIconName('ai');
      setIconSize('xl');
      setIconVariant('default');
      setIconHoverVariant('none');
      setIconSpinning(false);
      setIconCustomSize(36);
      setIconSizeType('preset');
    } else if (activeTab === 'breadcrumb') {
      setBreadMaxItems(4);
      setBreadItemsBefore(1);
      setBreadItemsAfter(1);
      setBreadSeparator('default');
      setBreadClickedLog('暂无（点击上方节点触发点击事件记录）');
    } else if (activeTab === 'pagination') {
      setPagCurrentPage(3);
      setPagTotalPages(10);
      setPagSize('md');
      setPagVariant('classic');
      setPagDisabled(false);
      setPagShowFirstLast(true);
      setPagShowSizeChanger(true);
      setPagPageSize(10);
    } else if (activeTab === 'steps') {
      setStepsCurrent(1);
      setStepsDirection('horizontal');
      setStepsSize('md');
      setStepsClickable(true);
      setStepsShowDesc(true);
      setStepsHasIcons(true);
      setStepsHasError(false);
    }
  };

  const handleCopyConfigProps = () => {
    let propConfigStr = '';
    if (activeTab === 'button') {
      propConfigStr = `variant: "${btnVariant}", size: "${btnSize}", disabled: ${btnDisabled}, isLoading: ${btnLoading}, iconPlacement: "${btnIcon}", text: "${btnText}"`;
    } else if (activeTab === 'input') {
      propConfigStr = `size: "${inputSize}", label: "${inputLabel}", placeholder: "${inputPlaceholder}", disabled: ${inputDisabled}, error: "${inputError}"`;
    } else if (activeTab === 'dropdown') {
      propConfigStr = `size: "${dropSize}", search: ${dropSearch}, multiple: ${dropMultiple}, disabled: ${dropDisabled}, error: "${dropError}"`;
    } else if (activeTab === 'steps') {
      propConfigStr = `current: ${stepsCurrent}, direction: "${stepsDirection}", size: "${stepsSize}", clickable: ${stepsClickable}`;
    } else {
      propConfigStr = `id: "${activeTab}", preset: "${activePreset}"`;
    }
    navigator.clipboard.writeText(propConfigStr);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  // Generate metadata dynamically for current component tab
  const getComponentMetadata = () => {
    const data = {
      button: {
        title: 'Button 按钮',
        desc: '具有高柔和动能物理反弹触感的点击交互单元。完美绑定品牌主色及圆角令牌，在微型加载、状态切换、多变体及安全触发场景中提供可靠支持。',
      },
      icon: {
        title: 'Icon 智能图标',
        desc: '支持响应式着色与自适应悬浮变体的矢量指令原子。可完美嵌入其它容器级组件，原生支持纺锤形平滑无极循环物理旋转。',
      },
      input: {
        title: 'Input 输入框',
        desc: '标准高保真表单信息录入基底，支持前置行内修饰图标。其聚焦高光扩边 (Focus Ring) 及不正常告警态细节完美遵从行为令牌的延迟定义。',
      },
      dropdown: {
        title: 'Dropdown 下拉选择 (Select)',
        desc: '集成本地多维度前向字符级搜索的智能筛选器。支持多元素 checkboxes 组合，选中项自适应转换为气泡标签药丸，并提供二级细节文本。',
      },
      modal: {
        title: 'Modal 页面弹窗 (Overlay)',
        desc: '层级高达 50 的关键行为强聚焦交互遮罩窗口。在进入和呼出时，由 React 级 motion 弹力物理学数学曲线操纵淡入微弹淡出，避免生硬割裂。',
      },
      navbar: {
        title: 'Navbar 导航系统',
        desc: '横向 12 列栅格对齐的标准响应式应用系统顶栏。支持集成动态滑动聚焦浮条，保持极高文字可访问性。',
      },
      breadcrumb: {
        title: 'Breadcrumb 面包屑',
        desc: '提供整洁物理路径记忆的多级树状关系指示条。集成大深度自适应省略号节点，点击省略号节点可以实现完美的原处横向平滑全展。',
      },
      pagination: {
        title: 'Pagination 自适应分页器',
        desc: '结构清晰的多模态数据跳步分布器。提供传统盒装、优雅圆底、现代简约无框三种视觉风格，在多状态交互中自动变换动作尺度。',
      },
      steps: {
        title: 'Steps 步骤条 (Stepper)',
        desc: '引导用户按照既定流程安全推进的进度步骤条。完美支持横向流程网格或竖向垂直技术细节流程的双向无损切换。',
      },
    };
    return data[activeTab] || { title: 'Atom Component', desc: 'React high fidelity sandbox element.' };
  };

  const activeMeta = getComponentMetadata();

  // Multi-Framework and syntax tailored code snippet
  const getFrameworkCodeSnippet = (fw: 'react' | 'vue' | 'angular') => {
    if (fw === 'react') {
      switch (activeTab) {
        case 'button':
          return `import { Button } from 'atomix-ui';
import { ArrowRight } from 'lucide-react';

export default function App() {
  return (
    <Button
      variant="${btnVariant}"
      size="${btnSize}"${btnDisabled ? '\n      disabled' : ''}${btnLoading ? '\n      isLoading' : ''}${
            btnIcon === 'left' ? '\n      iconLeft={<ArrowRight className="w-4 h-4" />}' : ''
          }${btnIcon === 'right' ? '\n      iconRight={<ArrowRight className="w-4 h-4" />}' : ''}
    >
      ${btnText}
    </Button>
  );
}`;
        case 'input':
          return `import { Input } from 'atomix-ui';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export default function FormField() {
  const [val, setVal] = useState('${inputValue}');

  return (
    <Input
      label="${inputLabel}"
      description="${inputDesc}"
      placeholder="${inputPlaceholder}"
      size="${inputSize}"${inputDisabled ? '\n      disabled' : ''}${inputError ? `\n      error="${inputError}"` : ''}${
            inputIconLeft ? '\n      iconLeft={<Mail className="w-4 h-4" />}' : ''
          }
      value={val}
      onChange={(e) => setVal(e.target.value)}
    />
  );
}`;
        case 'dropdown':
          return `import { Dropdown } from 'atomix-ui';
import { useState } from 'react';

export default function SelectGrid() {
  const [val, setVal] = useState(${dropMultiple ? "['asia-east1-a']" : "'asia-east1-a'"});
  const options = [
    { label: '亚太1区 (新加坡)', value: 'asia-east1-a', description: '高可用推荐' }
  ];

  return (
    <Dropdown
      label="${dropLabel}"
      description="${dropDesc}"
      options={options}
      value={val}
      onChange={setVal}
      size="${dropSize}"
      enableSearch={${dropSearch}}
      multiple={${dropMultiple}}${dropDisabled ? '\n      disabled' : ''}${
            dropError ? `\n      error="${dropError}"` : ''
          }
    />
  );
}`;
        case 'modal':
          return `import { Modal, Button } from 'atomix-ui';
import { useState } from 'react';

export default function OverlayPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>展开模态框</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="${modalTitle}"
        size="${modalSize}"
        borderless
      >
        <p>确认将终止分配的系统实例并彻底清理物理卷吗？此过程无可逆性。</p>
      </Modal>
    </>
  );
}`;
        case 'navbar':
          return `import { Navbar, Button } from 'atomix-ui';

export default function HeaderLayout() {
  return (
    <Navbar
      logo={<span>${navBrandName}</span>}
      menuItems={[
        { label: '智能分析', active: true },
        { label: '系统设置', active: false }
      ]}
      rightActions={<Button size="sm">退出控制台</Button>}
    />
  );
}`;
        case 'icon':
          return `import { Icon } from 'atomix-ui';

export default function IconDemo() {
  return (
    <Icon
      name="${iconName}"
      size=${iconSizeType === 'custom' ? `${iconCustomSize}` : `"${iconSize}"`}
      variant="${iconVariant}"${iconSpinning ? '\n      spinning' : ''}
    />
  );
}`;
        case 'breadcrumb':
          return `import { Breadcrumb } from 'atomix-ui';
import { Home } from 'lucide-react';

export default function NavPath() {
  const items = [
    { label: '主控节点', href: '#/', icon: <Home size={14} /> },
    { label: '计算群集', href: '#/clusters' },
    { label: '容器拓扑', href: '#/topology' }
  ];

  return (
    <Breadcrumb
      items={items}
      maxItems={${breadMaxItems}}
      itemsBeforeCollapse={${breadItemsBefore}}
      itemsAfterCollapse={${breadItemsAfter}}
    />
  );
}`;
        case 'pagination':
          return `import { Pagination } from 'atomix-ui';
import { useState } from 'react';

export default function DataPages() {
  const [page, setPage] = useState(${pagCurrentPage});

  return (
    <Pagination
      currentPage={page}
      totalPages={${pagTotalPages}}
      onPageChange={setPage}
      size="${pagSize}"
      variant="${pagVariant}"
      pageSize={${pagPageSize}}
      showFirstLast={${pagShowFirstLast}}
      showPageSizeChanger={${pagShowSizeChanger}}
    />
  );
}`;
        case 'steps':
          return `import { Steps } from 'atomix-ui';

export default function StepsProgress() {
  const items = [
    { title: '身分信息认证', description: '完成 OCR 及二要素验证' },
    { title: '连接清算银行', description: '授权银行结算代扣绑定' }
  ];

  return (
    <Steps
      current={${stepsCurrent}}
      items={items}
      direction="${stepsDirection}"
      size="${stepsSize}"
      clickable={${stepsClickable}}
    />
  );
}`;
        default:
          return ``;
      }
    } else if (fw === 'vue') {
      return `<!-- Vue 3 Template Standard -->
<template>
  <a-components-sandbox>
    <a-${activeTab} 
      :preset="activePreset"${activeTab === 'button' ? `\n      variant="${btnVariant}"\n      size="${btnSize}"\n      :loading="${btnLoading}"\n      :disabled="${btnDisabled}"` : ''}${activeTab === 'input' ? `\n      label="${inputLabel}"\n      placeholder="${inputPlaceholder}"\n      :disabled="${inputDisabled}"\n      :error="${inputError}"` : ''}${activeTab === 'steps' ? `\n      :current="${stepsCurrent}"\n      direction="${stepsDirection}"\n      size="${stepsSize}"` : ''}
    />
  </a-components-sandbox>
</template>

<script setup>
const activePreset = '${activePreset}';
</script>`;
    } else {
      return `<!-- Angular 16+ Component Spec -->
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-demo',
  template: \`
    <ax-${activeTab} 
      [preset]="currentPreset"
      [size]="'${activeTab === 'button' ? btnSize : (activeTab === 'input' ? inputSize : 'md')}'">
    </ax-${activeTab}>
  \`
})
export class AtomixDemoComponent {
  currentPreset = '${activePreset}';
}`;
    }
  };

  const handleCopyCodeSnippet = () => {
    navigator.clipboard.writeText(getFrameworkCodeSnippet(activeFramework));
    setCopiedCodeCode(true);
    setTimeout(() => setCopiedCodeCode(false), 2000);
  };

  // UI responsive sizes helper values
  const getDeviceWidthClass = () => {
    switch (device) {
      case 'laptop':
        return 'max-w-[1024px] border-x-[12px] border-y-[6px] border-slate-800 rounded-2xl shadow-xl';
      case 'tablet':
        return 'max-w-[768px] border-x-[14px] border-y-[8px] border-slate-800 rounded-xl shadow-xl';
      case 'mobile':
        return 'max-w-[375px] border-x-[16px] border-y-[24px] border-slate-800 rounded-3xl shadow-xl';
      case 'desktop':
      default:
        return 'w-full';
    }
  };

  // Details for API documentation contract table
  const getApiContractRows = () => {
    switch (activeTab) {
      case 'button':
        return [
          { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'text' | 'danger'", default: "'primary'", desc: '按钮的视觉变体：包含品牌主色填充，中性辅助底色，极简线框，以及红色警示态' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '尺寸梯度，分别绑定高度为 32px / 40px / 48px，其横向内边距自动按 Spacings 令牌比例自适应缩放' },
          { name: 'disabled', type: 'boolean', default: 'false', desc: '强制锁定按钮并屏蔽所有点击以及悬游过渡动作，视觉降级为 bgDisabled 暗沉灰哑状态' },
          { name: 'isLoading', type: 'boolean', default: 'false', desc: '开启时，按钮自动加塞 loading 转圈菊花，并锁定屏蔽二次物理按下' },
          { name: 'iconLeft', type: 'React.ReactNode', default: 'undefined', desc: '在文本左方嵌入的自定义矢量图标元素 <span>' },
          { name: 'iconRight', type: 'React.ReactNode', default: 'undefined', desc: '在文本右方嵌入的自定义矢量图标元素 <span>' },
        ];
      case 'input':
        return [
          { name: 'label', type: 'string', default: "''", desc: '顶部对齐排布的标准文本标签描述说明' },
          { name: 'description', type: 'string', default: "''", desc: '底部辅助提示，用于解释输入规则、长度限制、状态描述安全指引等' },
          { name: 'placeholder', type: 'string', default: "''", desc: '为空时默认浮出的淡灰色说明信息' },
          { name: 'error', type: 'string', default: "''", desc: '传入非空且有效的信息时，输入框和标题会同步切换到红色警示 error 态，自动高亮并开启微抖动' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '输入高度规格：小高度 32px （密核推荐），标准 40px，大气 48px' },
          { name: 'disabled', type: 'boolean', default: 'false', desc: '是否锁定输入，背景降级，光标重写为禁行状态' },
        ];
      case 'dropdown':
        return [
          { name: 'label', type: 'string', default: "''", desc: '表单说明标题，提供严谨的可访问导航属性' },
          { name: 'options', type: 'Array<{label, value, description}>', default: '[]', desc: '数据源选项列表，提供选项名称、回填值以及专属状态描述详情' },
          { name: 'value', type: 'string | string[]', default: "''", desc: '当前选中的对象值。支持绑定 React local 数组作为多模式选值' },
          { name: 'enableSearch', type: 'boolean', default: 'true', desc: '是否在最上方开启轻型本地智能关键词过滤栏' },
          { name: 'multiple', type: 'boolean', default: 'false', desc: '开启多选机制。可一次性多维选取，选定项将自适应转化为可删除的气泡药丸标签' },
        ];
      case 'steps':
        return [
          { name: 'current', type: 'number', default: '0', desc: '当前正在推进的激活步骤。从 0 开始步进计数' },
          { name: 'items', type: 'Array<{title, description, icon}>', default: '[]', desc: '步骤数组集合，包含基础各层次标题，及多模态矢量图标键' },
          { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: '排布朝向，经典左右平铺 vs 详情垂直展开，完全支持响应式' },
          { name: 'clickable', type: 'boolean', default: 'true', desc: '是否允许点击非当前节点来进行快捷跳转推进' },
        ];
      default:
        return [
          { name: 'preset', type: "ThemePreset", default: "'intelligent_workspace'", desc: '全局设计方案预设标签' },
          { name: 'className', type: "string", default: "''", desc: '自定义注入的 Tailwind 类，扩展视觉边界' },
        ];
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="component-showcase-panel">
      {/* Left Column (Col span 9) */}
      <div className="lg:col-span-9 flex flex-col gap-6">
        {/* 1. Component Title Header Block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between outline-none pb-4 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 token-font-heading">
              {activeMeta.title}
            </h1>
            <span className="text-[10px] font-mono select-none px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-bold">
              v1.2.0 Stable
            </span>
          </div>
          <p className="text-xs text-slate-450 mt-1.5 max-w-3xl leading-relaxed">
            {activeMeta.desc}
          </p>
        </div>


      </div>

      {/* 2. Secondary Tabs Row */}
      <div className="flex border-b border-slate-100 select-none pb-px overflow-x-auto scrollbar-none">
        {([
          { id: 'preview', label: '预览效果', en: 'Preview' },
          { id: 'docs', label: '设计规范', en: 'Specs & Docs' },
          { id: 'api', label: 'API 契约', en: 'API Interface' },
          { id: 'specs', label: '物理参数', en: 'Metrics' },
          { id: 'history', label: '版本更迭', en: 'Changelogs' }
        ] as const).map((sub) => {
          const isSel = activeSubTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id)}
              className={`cursor-pointer px-4.5 py-2.5 text-xs font-bold border-b-2 leading-none shrink-0 transition-all ${
                isSel
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-505 hover:text-slate-800 hover:border-slate-200'
              }`}
            >
              <span className="block">{sub.label}</span>
              <span className="block text-[8.5px] font-mono uppercase tracking-widest font-normal text-slate-400 mt-1">{sub.en}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Bento Grid Workspace Content */}
          {activeSubTab === 'preview' && (
            <>
              {/* Emulator Canvas Section with Viewport switcher toolbar */}
              <div
                className="border rounded-2xl overflow-hidden flex flex-col transition-all duration-300"
                style={{
                  backgroundColor: tokens.colors.bgCard,
                  borderColor: tokens.colors.border,
                }}
              >
                {/* Canvas emulation header toolbar */}
                <div
                  className="px-4 py-2.5 border-b flex items-center justify-between select-none transition-all duration-300"
                  style={{
                    backgroundColor: tokens.colors.bgInput,
                    borderColor: tokens.colors.border,
                  }}
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider font-bold flex items-center gap-1.5" style={{ color: tokens.colors.textMuted }}>
                    <Eye className="w-3.5 h-3.5 shrink-0" style={{ color: tokens.colors.brand }} />
                    <span>Live Preview Sandbox Canvas</span>
                  </span>

                  {/* Device selectors */}
                  <div className="flex items-center gap-1.5">
                    {([
                      { id: 'desktop', title: 'Desktop (1440px)', icon: <Monitor className="w-3.5 h-3.5" /> },
                      { id: 'laptop', title: 'Laptop (1024px)', icon: <LaptopIcon className="w-3.5 h-3.5" /> },
                      { id: 'tablet', title: 'Tablet (768px)', icon: <Tablet className="w-3.5 h-3.5" /> },
                      { id: 'mobile', title: 'Mobile (375px)', icon: <Smartphone className="w-3.5 h-3.5" /> }
                    ] as const).map((dev) => {
                      const isSelDev = device === dev.id;
                      return (
                        <Button
                          key={dev.id}
                          onClick={() => setDevice(dev.id)}
                          title={dev.title}
                          size="sm"
                          variant={isSelDev ? 'primary' : 'secondary'}
                          className="w-8 h-8 p-0! flex items-center justify-center rounded-xl"
                        >
                          {dev.icon}
                        </Button>
                      );
                    })}
                    <div className="h-4 w-px mx-1" style={{ backgroundColor: tokens.colors.border }} />
                    <Dropdown
                      options={[
                        { label: '1440px (Desktop)', value: 'desktop' },
                        { label: '1024px (Laptop)', value: 'laptop' },
                        { label: '768px (iPad Air)', value: 'tablet' },
                        { label: '375px (iPhone Mobile)', value: 'mobile' },
                      ]}
                      value={device}
                      onChange={setDevice}
                      size="sm"
                      className="w-36 font-mono text-[10px]"
                    />
                  </div>
                </div>

                {/* Simulated center viewport box */}
                <div
                  className="p-8 flex flex-col items-center justify-center min-h-[320px] transition-all relative overflow-x-auto"
                  style={{
                    backgroundColor: tokens.colors.bgActive,
                  }}
                >
                  <div
                    className={`w-full transition-all duration-300 border border-dashed p-10 flex items-center justify-center ${getDeviceWidthClass()}`}
                    style={{
                      backgroundColor: tokens.colors.bgCard,
                      borderColor: tokens.colors.border,
                    }}
                  >
                    {/* Component render map */}
                    {activeTab === 'button' && (
                      <div className="text-center w-full max-w-sm">
                        <Button
                          variant={btnVariant}
                          size={btnSize}
                          disabled={btnDisabled}
                          isLoading={btnLoading}
                          iconLeft={btnIcon === 'left' ? helperIcons.arrow : undefined}
                          iconRight={btnIcon === 'right' ? helperIcons.arrow : undefined}
                        >
                          {btnText}
                        </Button>
                        <p className="text-[10px] text-slate-400 mt-4 text-center font-mono leading-none select-none">
                          * Click, Hover or Press checking physics micro transition values
                        </p>
                      </div>
                    )}

                    {activeTab === 'input' && (
                      <div className="w-full max-w-sm">
                        <Input
                          label={inputLabel}
                          description={inputDesc}
                          placeholder={inputPlaceholder}
                          error={inputError}
                          size={inputSize}
                          disabled={inputDisabled}
                          iconLeft={inputIconLeft ? helperIcons.mail : undefined}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <p className="text-[10px] text-slate-400 mt-4 text-center font-mono select-none leading-none">
                          * High contract border ring dynamically wraps inputs during active focus state
                        </p>
                      </div>
                    )}

                    {activeTab === 'dropdown' && (
                      <div className="w-full max-w-xs min-h-[140px]">
                        <Dropdown
                          label={dropLabel}
                          description={dropDesc}
                          options={dropOptions}
                          value={dropValue}
                          onChange={setDropValue}
                          size={dropSize}
                          error={dropError}
                          enableSearch={dropSearch}
                          disabled={dropDisabled}
                          multiple={dropMultiple}
                          showDescription={dropShowDesc}
                        />
                        <p className="text-[10px] text-slate-400 mt-6 text-center font-mono select-none leading-none">
                          * Expand testing forward search filter matches and active dynamic checks
                        </p>
                      </div>
                    )}

                    {activeTab === 'modal' && (
                      <div className="text-center flex flex-col items-center">
                        <Button variant="primary" onClick={() => setModalIsOpen(true)}>
                          部署模态触发 (Call Modal Screen)
                        </Button>

                        <Modal
                          isOpen={modalIsOpen}
                          onClose={() => setModalIsOpen(false)}
                          title={modalTitle}
                          size={modalSize}
                          borderless={true}
                          footer={
                            modalHasFooter ? (
                              modalIsAlertStyle ? (
                                <div className="flex gap-2 justify-end w-full">
                                  <Button variant="outline" size="sm" onClick={() => setModalIsOpen(false)}>
                                    取消
                                  </Button>
                                  <Button variant="primary" size="sm" onClick={() => setModalIsOpen(false)}>
                                    确定
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex gap-2 justify-end w-full">
                                  <Button variant="outline" size="sm" onClick={() => setModalIsOpen(false)}>
                                    暂返回
                                  </Button>
                                  <Button variant="danger" size="sm" onClick={() => setModalIsOpen(false)}>
                                    确定并删除卷
                                  </Button>
                                </div>
                              )
                            ) : undefined
                          }
                        >
                          {modalIsAlertStyle ? (
                            <div className="flex items-start gap-4 py-2 text-left">
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-serif font-black text-xs select-none"
                                style={{ backgroundColor: tokens.colors.brand }}
                              >
                                i
                              </div>
                              <div className="text-xs font-medium pt-0.5 leading-relaxed" style={{ color: tokens.colors.textPrimary }}>
                                重要提示：北京可用集群网络标书项目已启动，本节点将于 48 小时后正式交接，其余项目暂缓部署。
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3 font-normal text-slate-650 text-left">
                              <p className="text-xs">
                                警告：关闭此物理计算服务器将断开主管道 <strong>Algonet-2</strong>{' '}
                                联络总线。包含 <strong>2.4TB</strong> 网络静态缓存也会永久蒸发，数据无可逆性。
                              </p>
                              <div className="p-2.5 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 border border-red-100/50">
                                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 animate-bounce" />
                                <div className="text-[10px] leading-normal font-semibold">
                                  <strong>高危警告：</strong>
                                  本操作不可逆。数据存储卷无法还原。
                                </div>
                              </div>
                            </div>
                          )}
                        </Modal>

                        <p className="text-[10px] text-slate-400 mt-4 text-center font-mono leading-none select-none">
                          * Smooth spring animations and fade backdrops during active focus changes
                        </p>
                      </div>
                    )}

                    {activeTab === 'navbar' && (
                      <div className="w-full border border-slate-100 rounded-lg overflow-hidden shadow-xs relative">
                        <Navbar
                          logo={
                            <div className="flex items-center gap-2">
                              <div
                                className="w-7 h-7 flex items-center justify-center font-serif font-bold text-white rounded text-xs select-none"
                                style={{ backgroundColor: tokens.colors.brand }}
                              >
                                Ω
                              </div>
                              <span className="text-[11px] font-bold tracking-tight token-font-heading text-slate-800">
                                {navBrandName}
                              </span>
                            </div>
                          }
                          menuItems={[
                            { label: '智能大纲', active: navActiveIndex === 0, onClick: () => setNavActiveIndex(0) },
                            { label: '安全组审计', active: navActiveIndex === 1, onClick: () => setNavActiveIndex(1) },
                            { label: '容器拓扑线', active: navActiveIndex === 2, onClick: () => setNavActiveIndex(2) },
                          ]}
                          rightActions={
                            <Button size="sm" variant="outline">
                              退出控制台
                            </Button>
                          }
                          sticky={false}
                        />
                      </div>
                    )}

                    {activeTab === 'icon' && (
                      <div className="text-center flex flex-col items-center justify-center">
                        <div
                          className="p-10 border border-slate-100/80 shadow-xs flex items-center justify-center transition-all bg-slate-50/30"
                          style={{
                            borderRadius: tokens.borders.radiusLg,
                            width: '120px',
                            height: '120px',
                          }}
                        >
                          <Icon
                            name={iconName}
                            size={iconSizeType === 'custom' ? iconCustomSize : iconSize}
                            variant={iconVariant}
                            hoverVariant={iconHoverVariant}
                            spinning={iconSpinning}
                          />
                        </div>
                        <p className="text-[10px] font-mono text-slate-400 mt-4 leading-normal font-normal">
                          &lt;Icon name="{iconName}" size={iconSizeType === 'custom' ? `${iconCustomSize}px` : iconSize.toUpperCase()} /&gt;
                        </p>
                      </div>
                    )}

                    {activeTab === 'breadcrumb' && (
                      <div className="w-full p-4 bg-white border border-slate-100 rounded-xl flex items-center justify-center">
                        <Breadcrumb
                          items={[
                            { label: '系统根层', href: '#/', icon: <Home size={13} /> },
                            { label: '安全审计区', href: '#/clusters' },
                            { label: '边缘计算拓扑', href: '#/topology' },
                            { label: '全盘部署方案详情及安全审计记录', href: '#/details' },
                          ]}
                          maxItems={breadMaxItems}
                          itemsBeforeCollapse={breadItemsBefore}
                          itemsAfterCollapse={breadItemsAfter}
                          separator={
                            breadSeparator === 'slash' ? (
                              <span className="text-slate-400 font-mono mx-1.5 text-[9px] select-none">/</span>
                            ) : breadSeparator === 'chevron' ? (
                              <span className="text-slate-400 font-mono mx-1.5 text-[9px] select-none">→</span>
                            ) : breadSeparator === 'hyphen' ? (
                              <span className="text-slate-400 font-mono mx-1.5 text-[9px] select-none">—</span>
                            ) : breadSeparator === 'arrow' ? (
                              <span className="text-slate-400 font-mono mx-1.5 text-[9px] select-none">›</span>
                            ) : undefined
                          }
                          onItemClick={(item, idx, e) => {
                            e.preventDefault();
                            setBreadClickedLog(`点击了 "${item.label}"，节点索引 [${idx}]`);
                          }}
                        />
                      </div>
                    )}

                    {activeTab === 'pagination' && (
                      <div className="w-full flex flex-col items-center justify-center">
                        <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-xs">
                          <Pagination
                            currentPage={pagCurrentPage}
                            totalPages={pagTotalPages}
                            onPageChange={setPagCurrentPage}
                            size={pagSize}
                            variant={pagVariant}
                            disabled={pagDisabled}
                            showFirstLast={pagShowFirstLast}
                            showPageSizeChanger={pagShowSizeChanger}
                            pageSize={pagPageSize}
                            onPageSizeChange={setPagPageSize}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'steps' && (
                      <div className="w-full max-w-xl">
                        <Steps
                          current={stepsCurrent}
                          items={[
                            {
                              title: '身份信息认证',
                              description: stepsShowDesc ? '身分要素、OCR校验验证' : undefined,
                              icon: stepsHasIcons ? 'user' : undefined,
                            },
                            {
                              title: '连接清算银行',
                              description: stepsShowDesc ? '银行代扣及划拨协议绑定' : undefined,
                              icon: stepsHasIcons ? 'creditcard' : undefined,
                              status: stepsHasError ? 'error' : undefined,
                            },
                            {
                              title: '安全问卷校验',
                              description: stepsShowDesc ? '通过金融特征风控测评' : undefined,
                              icon: stepsHasIcons ? 'lock' : undefined,
                            },
                          ]}
                          direction={stepsDirection}
                          size={stepsSize}
                          clickable={stepsClickable}
                          onStepChange={setStepsCurrent}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Micro interaction logging lines nested on preview block bottom */}
                {['breadcrumb', 'pagination', 'steps'].includes(activeTab) && (
                  <div className="px-6 py-2.5 bg-slate-50/30 border-t border-slate-150 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-bold font-mono">📡 Interaction Logger:</span>
                    <span className="text-indigo-600 font-bold">
                      {activeTab === 'breadcrumb' && breadClickedLog}
                      {activeTab === 'pagination' && `页码 Page ${pagCurrentPage} | 页长 ${pagPageSize} 条 | 共计 ${pagTotalPages} 页`}
                      {activeTab === 'steps' && `流程阶段 [${stepsCurrent + 1}/3] - 当前正在进行: ${stepsCurrent === 0 ? '一要素 OCR 验证身份' : (stepsCurrent === 1 ? (stepsHasError ? '网络清算 [金融异常拦截]' : '银行结算协议清算') : '核心安全防范测评完成')}`}
                    </span>
                  </div>
                )}
              </div>

              {/* 4. React Single Framework Code Spec Panel below Preview */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col font-mono shadow-md text-slate-350">
                {/* Code Panel Header */}
                <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between select-none">
                  {/* Left Label */}
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-200">React TSX Code Spec (生产交付级代码)</span>
                  </div>

                  {/* Right Copy buttons closer to mock visual */}
                  <Button
                    onClick={handleCopyCodeSnippet}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer text-xs font-bold leading-normal text-slate-300 hover:text-white bg-slate-800 border-none px-2.2 py-1 rounded-md h-7"
                    iconLeft={copiedCodeCode ? <Check className="w-3.5 h-3.5 text-emerald-500 animate-pulse font-extrabold" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  >
                    <span>{copiedCodeCode ? '已复制' : '复制代码'}</span>
                  </Button>
                </div>

                {/* High fidelity syntax light scroll viewer block */}
                <div className="p-5 overflow-x-auto text-[11px] leading-relaxed select-text font-mono text-slate-200 min-h-[180px]">
                  <pre className="whitespace-pre">
                    {getFrameworkCodeSnippet('react')}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* Detailed specifications tab render panel */}
          {activeSubTab === 'docs' && (
            <div
              className="p-6 border rounded-2xl flex flex-col gap-5 leading-relaxed font-normal transition-all"
              style={{
                backgroundColor: tokens.colors.bgCard,
                borderColor: tokens.colors.border,
              }}
            >
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: tokens.colors.textPrimary }}>
                <Book className="w-4 h-4 shrink-0" style={{ color: tokens.colors.brand }} />
                <span>Atomix UI 交付级产品设计规范</span>
              </h3>
              <p className="text-xs" style={{ color: tokens.colors.textSecondary }}>
                本组件严格对标 UI 界面美学，通过<strong>设计语言变量 (Design Tokens)</strong> 替代传统的静态、碎片化硬编码 CSS 参数。这确保了研发团队在生产部署时能按 1：1 的极低成本保真还原界面体验。
              </p>
              
              <div className="border-t border-slate-100 my-1" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-505 font-sans">
                <div className="space-y-2">
                  <h4 className="text-slate-800 font-bold flex items-center gap-1">✨ 一等可访问性 (Accessibility Specs)</h4>
                  <p>支持原生 ARIA 标签以及 WCAG AAA 高对比度颜色自适应。任何基于品牌主色的交互其对比值均大于 <strong>4.5 : 1</strong>，保障阅读连续与流畅性。</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-slate-800 font-bold flex items-center gap-1">💫 柔顺触受和果冻感 (Spring Kinetics)</h4>
                  <p>在按压、悬停和激活期间，使用由 React motion 开发的<strong>弹力物理学特征函数</strong>自动操纵缩变。瑞士极简风下展现沉稳硬朗，甜美气泡风下展现香芋弹性软感。</p>
                </div>
              </div>
            </div>
          )}

          {/* Interface properties tables */}
          {activeSubTab === 'api' && (
            <div
              className="p-6 border rounded-2xl flex flex-col gap-4 overflow-x-auto font-sans text-xs transition-all"
              style={{
                backgroundColor: tokens.colors.bgCard,
                borderColor: tokens.colors.border,
              }}
            >
              <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: tokens.colors.textPrimary }}>
                <Sliders className="w-4 h-4" style={{ color: tokens.colors.brand }} />
                <span>组件 API 参数契约 (Props Reference)</span>
              </h3>
              <table className="min-w-full text-left text-slate-600 border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                    <th className="py-2.5 font-bold">属性名</th>
                    <th className="py-2.5 font-bold">类型</th>
                    <th className="py-2.5 font-bold">默认值</th>
                    <th className="py-2.5 font-bold">说明描述</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-normal">
                  {activeTab === 'button' && (
                    <>
                      <tr>
                        <td className="py-2.5 font-mono text-indigo-650 font-bold">variant</td>
                        <td className="py-2.5 font-mono text-slate-500">'primary' | 'secondary' | 'outline' | 'text' | 'danger'</td>
                        <td className="py-2.5 font-mono text-slate-500">'primary'</td>
                        <td className="py-2.5">设计变体样式外观类型</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-mono text-indigo-650 font-bold">size</td>
                        <td className="py-2.5 font-mono text-slate-500">'sm' | 'md' | 'lg'</td>
                        <td className="py-2.5 font-mono text-slate-500">'md'</td>
                        <td className="py-2.5">按钮物理尺寸层级规格</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-mono text-indigo-650 font-bold">disabled</td>
                        <td className="py-2.5 font-mono text-slate-500">boolean</td>
                        <td className="py-2.5 font-mono text-slate-500">false</td>
                        <td className="py-2.5">是否开启只读阻塞禁用态</td>
                      </tr>
                    </>
                  )}
                  {activeTab === 'input' && (
                    <>
                      <tr>
                        <td className="py-2.5 font-mono text-indigo-650 font-bold">label</td>
                        <td className="py-2.5 font-mono text-slate-500">string</td>
                        <td className="py-2.5 font-mono text-slate-500">undefined</td>
                        <td className="py-2.5">输入框顶部标签提示文案</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-mono text-indigo-650 font-bold">error</td>
                        <td className="py-2.5 font-mono text-slate-500">string</td>
                        <td className="py-2.5 font-mono text-slate-500">undefined</td>
                        <td className="py-2.5">警示拦截显示的故障描述消息</td>
                      </tr>
                    </>
                  )}
                  {activeTab !== 'button' && activeTab !== 'input' && (
                    <tr>
                      <td className="py-3 text-slate-400 font-mono text-center" colSpan={4}>
                        请通过右侧属性面板实时调整参数查看效果
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right configuration side panel */}
        <div
          className="lg:col-span-3 pb-8 flex flex-col gap-5 p-5 border rounded-2xl"
          style={{
            backgroundColor: tokens.colors.bgCard,
            borderColor: tokens.colors.border,
          }}
        >
          <div className="space-y-4 animate-fade-in text-xs font-normal font-sans leading-normal" style={{ color: tokens.colors.textSecondary }}>
            <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono block select-none mb-1" style={{ color: tokens.colors.textMuted }}>
              基本属性 (Base props)
            </span>

              {/* BUTTON props fields */}
              {activeTab === 'button' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>按钮变体 (Variant)</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['primary', 'secondary', 'outline', 'text', 'danger'] as const).map((v) => (
                        <Button
                          key={v}
                          variant={btnVariant === v ? 'primary' : 'secondary'}
                          size="sm"
                          onClick={() => setBtnVariant(v)}
                          className="w-full text-[10px] capitalize font-bold h-7.5"
                          id={`param-btn-v-${v}`}
                        >
                          {v}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold" style={{ color: tokens.colors.textSecondary }}>按钮尺寸 (Size)</label>
                    <div
                      className="grid grid-cols-3 gap-1 p-1 rounded-xl border"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['sm', 'md', 'lg'] as const).map((s) => (
                        <Button
                          key={s}
                          variant={btnSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setBtnSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            btnSize === s ? '' : 'hover:text-slate-850'
                          }`}
                          style={{
                            color: btnSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                          id={`param-btn-s-${s}`}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" style={{ color: tokens.colors.textSecondary }}>禁用状态 (Disabled)</span>
                      <input
                        type="checkbox"
                        checked={btnDisabled}
                        onChange={(e) => setBtnDisabled(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold" style={{ color: tokens.colors.textSecondary }}>缓冲加载 (Is Loading)</span>
                      <input
                        type="checkbox"
                        checked={btnLoading}
                        onChange={(e) => setBtnLoading(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 animate-fade-in text-xs font-normal">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>前置/后置图标 placement</label>
                    <Dropdown
                      options={[
                        { label: '无内置图标', value: 'none' },
                        { label: '左侧加塞图标', value: 'left' },
                        { label: '右侧加塞图标', value: 'right' },
                      ]}
                      value={btnIcon}
                      onChange={setBtnIcon}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>按钮文案</label>
                    <Input
                      value={btnText}
                      onChange={(e) => setBtnText(e.target.value)}
                      size="sm"
                    />
                  </div>
                </div>
              )}

              {/* INPUT props controllers */}
              {activeTab === 'input' && (
                <div className="space-y-4">
                  <div className="space-y-1.5 font-sans">
                    <label className="block font-semibold" style={{ color: tokens.colors.textSecondary }}>输入尺寸大小</label>
                    <div
                      className="grid grid-cols-3 gap-1 p-1 rounded-xl border text-center select-none"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['sm', 'md', 'lg'] as const).map((s) => (
                        <Button
                          key={s}
                          variant={inputSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setInputSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            inputSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: inputSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                          id={`param-input-sz-${s}`}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>标签文案 (Label)</label>
                    <Input
                      value={inputLabel}
                      onChange={(e) => setInputLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>占位文字 (Placeholder)</label>
                    <Input
                      value={inputPlaceholder}
                      onChange={(e) => setInputPlaceholder(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>底部说明文字 (Helper Desc)</label>
                    <Input
                      value={inputDesc}
                      onChange={(e) => setInputDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>错误提示消息 (Error Props)</label>
                    <Input
                      placeholder="留空即取消安全警示状态"
                      value={inputError}
                      onChange={(e) => setInputError(e.target.value)}
                      size="sm"
                      error={inputError ? '警告状态开启' : undefined}
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>前置 Mail 图标</span>
                      <input
                        type="checkbox"
                        checked={inputIconLeft}
                        onChange={(e) => setInputIconLeft(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>只读禁用状态</span>
                      <input
                        type="checkbox"
                        checked={inputDisabled}
                        onChange={(e) => setInputDisabled(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DROPDOWN SELECT Props controllers */}
              {activeTab === 'dropdown' && (
                <div className="space-y-4">
                  <div className="space-y-1.5 font-sans">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>选择器尺寸大小</label>
                    <div
                      className="grid grid-cols-3 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['sm', 'md', 'lg'] as const).map((s) => (
                        <Button
                          key={s}
                          variant={dropSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setDropSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            dropSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: dropSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                          id={`param-drop-sz-${s}`}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>标签文案 (Label)</label>
                    <Input
                      value={dropLabel}
                      onChange={(e) => setDropLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>底置描述 (Desc)</label>
                    <Input
                      value={dropDesc}
                      onChange={(e) => setDropDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>多选 checkbox 药丸</span>
                      <input
                        type="checkbox"
                        checked={dropMultiple}
                        onChange={(e) => handleToggleMultiple(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>词串前向检索</span>
                      <input
                        type="checkbox"
                        checked={dropSearch}
                        onChange={(e) => setDropSearch(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>呈现选项子解释</span>
                      <input
                        type="checkbox"
                        checked={dropShowDesc}
                        onChange={(e) => setDropShowDesc(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>锁定禁用状态</span>
                      <input
                        type="checkbox"
                        checked={dropDisabled}
                        onChange={(e) => setDropDisabled(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>强制警告提示</label>
                    <Input
                      placeholder="留空即常态"
                      value={dropError}
                      onChange={(e) => setDropError(e.target.value)}
                      size="sm"
                      error={dropError ? '警告状态开启' : undefined}
                    />
                  </div>
                </div>
              )}

              {/* MODAL overlay props controllers */}
              {activeTab === 'modal' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5 animate-fade-in text-xs font-normal">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>弹窗尺寸级别 (Size)</label>
                    <Dropdown
                      options={[
                        { label: '380px (SM)', value: 'sm' },
                        { label: '520px (MD)', value: 'md' },
                        { label: '740px (LG)', value: 'lg' },
                        { label: '960px (XL)', value: 'xl' },
                      ]}
                      value={modalSize}
                      onChange={(val) => setModalSize(val as any)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>弹窗标题文案</label>
                    <Input
                      value={modalTitle}
                      onChange={(e) => setModalTitle(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>显示底部操作列</span>
                      <input
                        type="checkbox"
                        checked={modalHasFooter}
                        onChange={(e) => setModalHasFooter(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block text-xs" style={{ color: tokens.colors.textSecondary }}>信息通知提示风格 (i)</span>
                      <input
                        type="checkbox"
                        checked={modalIsAlertStyle}
                        onChange={(e) => setModalIsAlertStyle(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-[100%]" onClick={() => setModalIsOpen(true)}>
                      🗣️ 打开弹层效果
                    </Button>
                  </div>
                </div>
              )}

              {/* NAV SYSTEM props controllers */}
              {activeTab === 'navbar' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>品牌/标志文案（Logo Brand）</label>
                    <Input
                      value={navBrandName}
                      onChange={(e) => setNavBrandName(e.target.value)}
                      size="sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>动态激活链接选定</label>
                    <div
                      className="grid grid-cols-3 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {['智能分析', '安全审计', '容器拓扑'].map((l, index) => (
                        <Button
                          key={index}
                          variant={navActiveIndex === index ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setNavActiveIndex(index)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            navActiveIndex === index ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: navActiveIndex === index ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                          id={`param-nav-idx-${index}`}
                        >
                          L{index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ICON props controllers */}
              {activeTab === 'icon' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>矢量图徽图标 (name)</label>
                    <div
                      className="grid grid-cols-4 gap-1 p-1 rounded-xl border"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['ai', 'mail', 'lock', 'user', 'arrow', 'alert', 'trash', 'loader'] as const).map((icon) => (
                        <Button
                          key={icon}
                          variant={iconName === icon ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setIconName(icon)}
                          className={`py-1 text-[10px] capitalize truncate h-7.5 font-bold rounded-lg ${
                            iconName === icon ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: iconName === icon ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {icon}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>尺寸计算类型 (Size Type)</label>
                    <div
                      className="grid grid-cols-2 gap-1 p-1 rounded-xl border select-none"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      <Button
                        variant={iconSizeType === 'preset' ? 'primary' : 'text'}
                        size="sm"
                        onClick={() => setIconSizeType('preset')}
                        className={`h-7.5 rounded-lg text-[10px] font-bold ${
                          iconSizeType === 'preset' ? '' : 'hover:text-slate-800'
                        }`}
                        style={{
                          color: iconSizeType === 'preset' ? tokens.colors.textInverse : tokens.colors.textSecondary,
                        }}
                      >
                        预设梯度 (Presets)
                      </Button>
                      <Button
                        variant={iconSizeType === 'custom' ? 'primary' : 'text'}
                        size="sm"
                        onClick={() => setIconSizeType('custom')}
                        className={`h-7.5 rounded-lg text-[10px] font-bold ${
                          iconSizeType === 'custom' ? '' : 'hover:text-slate-800'
                        }`}
                        style={{
                          color: iconSizeType === 'custom' ? tokens.colors.textInverse : tokens.colors.textSecondary,
                        }}
                      >
                        精准无损 (Custom px)
                      </Button>
                    </div>
                  </div>

                  {iconSizeType === 'preset' ? (
                    <div className="space-y-1.5">
                      <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>预设梯度选择 (Size)</label>
                      <div
                        className="grid grid-cols-5 p-1 border rounded-xl"
                        style={{
                          backgroundColor: tokens.colors.bgInput,
                          borderColor: tokens.colors.border,
                        }}
                      >
                        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                          <Button
                            key={sz}
                            variant={iconSize === sz ? 'primary' : 'text'}
                            size="sm"
                            onClick={() => setIconSize(sz)}
                            className={`py-0.8 text-[10px] font-mono h-7 rounded-md ${
                              iconSize === sz ? 'font-black' : 'hover:text-slate-800'
                            }`}
                            style={{
                              color: iconSize === sz ? tokens.colors.textInverse : tokens.colors.textSecondary,
                            }}
                          >
                            {sz.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex justify-between font-mono text-xs">
                        <label className="font-semibold" style={{ color: tokens.colors.textSecondary }}>精准像素大小</label>
                        <span className="font-bold" style={{ color: tokens.colors.brand }}>{iconCustomSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="16"
                        max="80"
                        value={iconCustomSize}
                        onChange={(e) => setIconCustomSize(Number(e.target.value))}
                        className="w-full cursor-pointer h-1.5 rounded-lg appearance-none"
                        style={{
                          accentColor: tokens.colors.brand,
                          backgroundColor: tokens.colors.border,
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>配色方案 (Variant)</label>
                    <Dropdown
                      options={[
                        { label: '中性暗灰 (Default)', value: 'default' },
                        { label: '品牌主色 (Primary)', value: 'primary' },
                        { label: '系统成功绿 (Success)', value: 'success' },
                        { label: '等待提醒黄 (Warning)', value: 'warning' },
                        { label: '崩溃报错红 (Danger)', value: 'danger' },
                        { label: '常规说明蓝 (Info)', value: 'info' },
                      ]}
                      value={iconVariant}
                      onChange={(val) => setIconVariant(val as any)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>循环旋转动画</span>
                      <input
                        type="checkbox"
                        checked={iconSpinning}
                        onChange={(e) => setIconSpinning(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BREADCRUMB props controllers */}
              {activeTab === 'breadcrumb' && (
                <div className="space-y-4 font-sans text-xs">
                  <div
                    className="space-y-1.5 p-2 rounded-xl border"
                    style={{
                      backgroundColor: tokens.colors.bgInput,
                      borderColor: tokens.colors.border,
                    }}
                  >
                    <div className="flex justify-between font-mono text-xs">
                      <label className="font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>最长展层限制 (Max Items)</label>
                      <span className="font-bold" style={{ color: tokens.colors.brand }}>{breadMaxItems} 级</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="5"
                      value={breadMaxItems}
                      onChange={(e) => setBreadMaxItems(Number(e.target.value))}
                      className="w-full cursor-pointer h-1.5 rounded-lg appearance-none mt-1"
                      style={{
                        accentColor: tokens.colors.brand,
                        backgroundColor: tokens.colors.border,
                      }}
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>间隔符样式 (Separator)</label>
                    <Dropdown
                      options={[
                        { label: '默认令牌间隔 (Default dot)', value: 'default' },
                        { label: '斜线分隔 (Slash "/")', value: 'slash' },
                        { label: '等速箭头 (Right "→")', value: 'chevron' },
                        { label: '平铺连字线 (Dash "—")', value: 'hyphen' },
                        { label: '标准小箭头 (Arrow "›")', value: 'arrow' },
                      ]}
                      value={breadSeparator}
                      onChange={(val) => setBreadSeparator(val as any)}
                      size="sm"
                    />
                  </div>
                </div>
              )}

              {/* PAGINATION props controllers */}
              {activeTab === 'pagination' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>分页器形态结构</label>
                    <Dropdown
                      options={[
                        { label: '传统盒子框 (Classic bordered)', value: 'classic' },
                        { label: '现代滑动高光 (Modern float)', value: 'modern' },
                        { label: '极致无边无感 (Minimal plain)', value: 'minimal' },
                      ]}
                      value={pagVariant}
                      onChange={(val) => setPagVariant(val as any)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>分页器大小</label>
                    <div
                      className="grid grid-cols-3 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['sm', 'md', 'lg'] as const).map((sz) => (
                        <Button
                          key={sz}
                          variant={pagSize === sz ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setPagSize(sz)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            pagSize === sz ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: pagSize === sz ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {sz.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>锁定禁用分页</span>
                      <input
                        type="checkbox"
                        checked={pagDisabled}
                        onChange={(e) => setPagDisabled(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>一键快速首尾跳转</span>
                      <input
                        type="checkbox"
                        checked={pagShowFirstLast}
                        onChange={(e) => setPagShowFirstLast(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>下拉步长调节</span>
                      <input
                        type="checkbox"
                        checked={pagShowSizeChanger}
                        onChange={(e) => setPagShowSizeChanger(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEPS进度条 props controllers */}
              {activeTab === 'steps' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5 animate-fade-in">
                    <div className="flex justify-between font-mono max-xs flex-col gap-1">
                      <div className="font-bold overlay" style={{ color: tokens.colors.textSecondary }}>设定当前执行步骤</div>
                      <span className="font-extrabold text-[11px]" style={{ color: tokens.colors.brand }}>步骤 {stepsCurrent + 1}</span>
                    </div>
                    <div
                      className="grid grid-cols-3 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {[0, 1, 2].map((idx) => (
                        <Button
                          key={idx}
                          variant={stepsCurrent === idx ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setStepsCurrent(idx)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            stepsCurrent === idx ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: stepsCurrent === idx ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          Step {idx + 1}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>整体部署朝向 (Direction)</label>
                    <div
                      className="grid grid-cols-2 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      <Button
                        variant={stepsDirection === 'horizontal' ? 'primary' : 'text'}
                        size="sm"
                        onClick={() => setStepsDirection('horizontal')}
                        className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                          stepsDirection === 'horizontal' ? '' : 'hover:text-slate-800'
                        }`}
                        style={{
                          color: stepsDirection === 'horizontal' ? tokens.colors.textInverse : tokens.colors.textSecondary,
                        }}
                      >
                        横向
                      </Button>
                      <Button
                        variant={stepsDirection === 'vertical' ? 'primary' : 'text'}
                        size="sm"
                        onClick={() => setStepsDirection('vertical')}
                        className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                          stepsDirection === 'vertical' ? '' : 'hover:text-slate-800'
                        }`}
                        style={{
                          color: stepsDirection === 'vertical' ? tokens.colors.textInverse : tokens.colors.textSecondary,
                        }}
                      >
                        纵向
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-semibold mb-1" style={{ color: tokens.colors.textSecondary }}>物理尺寸 (Size)</label>
                    <div
                      className="grid grid-cols-3 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['sm', 'md', 'lg'] as const).map((s) => (
                        <Button
                          key={s}
                          variant={stepsSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setStepsSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            stepsSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: stepsSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>使能步骤快点切换</span>
                      <input
                        type="checkbox"
                        checked={stepsClickable}
                        onChange={(e) => setStepsClickable(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>反馈副层辅助小描述</span>
                      <input
                        type="checkbox"
                        checked={stepsShowDesc}
                        onChange={(e) => setStepsShowDesc(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>插入物理状态小图标</span>
                      <input
                        type="checkbox"
                        checked={stepsHasIcons}
                        onChange={(e) => setStepsHasIcons(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textDanger || '#EF4444' }}>模拟清算故障拦截 (error)</span>
                      <input
                        type="checkbox"
                        checked={stepsHasError}
                        onChange={(e) => setStepsHasError(e.target.checked)}
                        className="w-4 h-4 rounded cursor-pointer transition-all"
                        style={{ accentColor: tokens.colors.brand }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          <div className="border-t my-1" style={{ borderColor: tokens.colors.border }} />

          {/* Style parameters category */}
          <div className="space-y-2 select-none">
            <span className="text-[10px] font-extrabold uppercase tracking-widest font-mono block" style={{ color: tokens.colors.textMuted }}>
              样式与对齐规格 (Style Specs)
            </span>
            <div className="space-y-2 font-mono text-[9.5px]" style={{ color: tokens.colors.textSecondary }}>
              <div className="flex justify-between">
                <span>品牌主题:</span>
                <span className="font-bold" style={{ color: tokens.colors.textPrimary }}>{tokens.name}</span>
              </div>
              <div className="flex justify-between">
                <span>圆角半径:</span>
                <span className="font-bold" style={{ color: tokens.colors.textPrimary }}>{tokens.borders.radiusMd}</span>
              </div>
              <div className="flex justify-between">
                <span>缓冲曲线:</span>
                <span className="font-bold" style={{ color: tokens.colors.textPrimary }}>{tokens.behaviors.motionCurve}</span>
              </div>
            </div>
          </div>

          <div className="border-t my-1" style={{ borderColor: tokens.colors.border }} />

          {/* Form Actions footer */}
          <div className="flex flex-col gap-2 pt-1 font-sans">
            <button
              onClick={handleResetDefaults}
              className="cursor-pointer py-2 border rounded-xl text-xs font-bold leading-none flex items-center justify-center gap-1.5 transition-all"
              style={{
                borderColor: tokens.colors.border,
                backgroundColor: tokens.colors.bgInput,
                color: tokens.colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.bgActive;
                e.currentTarget.style.color = tokens.colors.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = tokens.colors.bgInput;
                e.currentTarget.style.color = tokens.colors.textSecondary;
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" style={{ color: tokens.colors.brand }} />
              <span>重置为默认值</span>
            </button>
            <button
              onClick={handleCopyConfigProps}
              className="cursor-pointer py-2 border rounded-xl text-xs font-bold leading-none flex items-center justify-center gap-1.5 transition-all text-white"
              style={{
                borderColor: 'transparent',
                backgroundColor: tokens.colors.brand,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {copiedConfig ? <Check className="w-3.5 h-3.5 font-bold text-white" /> : <Zap className="w-3.5 h-3.5 text-white" />}
              <span>复制当前参数配置</span>
            </button>
          </div>
        </div>
      </div>
    );
};

export default ShowcasePanel;
