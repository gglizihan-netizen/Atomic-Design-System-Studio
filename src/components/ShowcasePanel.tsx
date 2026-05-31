import React, { useState } from 'react';
import { useDesignTokens } from './base/DesignTokensContext';
import { Button } from './atoms/Button';
import { Input } from './atoms/Input';
import { Dropdown } from './atoms/Dropdown';
import { Modal } from './atoms/Modal';
import { Navbar } from './atoms/Navbar';
import { Icon } from './atoms/Icon';
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
} from 'lucide-react';

export const ShowcasePanel: React.FC = () => {
  const { tokens } = useDesignTokens();
  const [activeTab, setActiveTab] = useState<'button' | 'input' | 'dropdown' | 'modal' | 'navbar' | 'icon'>('button');
  const [copied, setCopied] = useState(false);

  // 6. Icon Demo states
  const [iconName, setIconName] = useState<IconName>('ai');
  const [iconSize, setIconSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('xl');
  const [iconVariant, setIconVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'custom'>('default');
  const [iconHoverVariant, setIconHoverVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'none'>('none');
  const [iconSpinning, setIconSpinning] = useState(false);
  const [iconCustomSize, setIconCustomSize] = useState<number>(36);
  const [iconSizeType, setIconSizeType] = useState<'preset' | 'custom'>('preset');

  // States for interactive prop controller configuration
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
  const [dropValue, setDropValue] = useState('asia-east1-a');

  // 4. Modal Props states
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('sm');
  const [modalTitle, setModalTitle] = useState('提示');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalHasFooter, setModalHasFooter] = useState(true);
  const [modalIsAlertStyle, setModalIsAlertStyle] = useState(true);

  // 5. Navbar states
  const [navBrandName, setNavBrandName] = useState('NEXUS LOGISTICS');
  const [navActiveIndex, setNavActiveIndex] = useState(0);

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

  const menuTabs = [
    { id: 'button' as const, label: '按钮 (Button)' },
    { id: 'input' as const, label: '输入框 (Input)' },
    { id: 'dropdown' as const, label: '下拉选择 (Dropdown / Select)' },
    { id: 'modal' as const, label: '模态视窗 (Modal Overlay)' },
    { id: 'navbar' as const, label: '导航系统 (Navbar Navigation)' },
    { id: 'icon' as const, label: '智能图标 (Icon & Feedback)' },
  ];

  // Dynamically build sample code based on props
  const getCodeSnippet = () => {
    switch (activeTab) {
      case 'button':
        return `import { Button } from './components/atoms/Button';
import { ArrowRight } from 'lucide-react';

export default function MyPage() {
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
        return `import { Input } from './components/atoms/Input';
import { Mail } from 'lucide-react';

export default function MyPage() {
  const [email, setEmail] = useState('');

  return (
    <Input
      label="${inputLabel}"
      description="${inputDesc}"
      placeholder="${inputPlaceholder}"
      size="${inputSize}"${inputDisabled ? '\n      disabled' : ''}${inputError ? `\n      error="${inputError}"` : ''}${
          inputIconLeft ? '\n      iconLeft={<Mail className="w-4 h-4" />}' : ''
        }
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}`;
      case 'dropdown':
        return `import { Dropdown } from './components/atoms/Dropdown';

const OPTIONS = [
  { label: '华东1区 (杭州) - 可用区A', value: 'cn-hangzhou-a', description: '低空载...' },
  { label: '亚太1区 (新加坡) - A区', value: 'asia-east1-a', description: '高可用...' }
];

export default function MyPage() {
  const [subnet, setSubnet] = useState('asia-east1-a');

  return (
    <Dropdown
      label="${dropLabel}"
      description="${dropDesc}"
      options={OPTIONS}
      value={subnet}
      onChange={setSubnet}
      size="${dropSize}"${dropSearch ? '\n      enableSearch' : ''}${dropDisabled ? '\n      disabled' : ''}${
          dropError ? `\n      error="${dropError}"` : ''
        }
    />
  );
}`;
      case 'modal':
        return `import { Modal } from './components/atoms/Modal';
import { Button } from './components/atoms/Button';

export default function MyPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>打开弹框</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="${modalTitle}"
        size="${modalSize}"${
          modalHasFooter
            ? `
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>取消</Button>
            <Button variant="danger" onClick={() => setIsOpen(false)}>停用计算组</Button>
          </div>
        }`
            : ''
        }
      >
        <p>这将导致与该计算节点关联的所有业务容器中断并永久删除，该过程不可逆。</p>
      </Modal>
    </>
  );
}`;
      case 'navbar':
        return `import { Navbar } from './components/atoms/Navbar';
import { Button } from './components/atoms/Button';

export default function AppLayout() {
  const menuItems = [
    { label: '云控制台', active: true },
    { label: '边缘存储' },
    { label: '安全审计' }
  ];

  return (
    <Navbar
      logo={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600" />
          <span className="font-bold text-slate-850">${navBrandName}</span>
        </div>
      }
      menuItems={menuItems}
      rightActions={
        <Button size="sm" variant="outline">控制台登录</Button>
      }
    />
  );
}`;
      case 'icon':
        return `import { Icon } from './components/atoms/Icon';

export default function MyPage() {
  return (
    <Icon
      name="${iconName}"
      size={${iconSizeType === 'custom' ? iconCustomSize : `'${iconSize}'`}}${iconVariant !== 'default' ? `\n      variant="${iconVariant}"` : ''}${iconHoverVariant !== 'none' ? `\n      hoverVariant="${iconHoverVariant}" font-mono` : ''}${iconSpinning ? '\n      spinning' : ''}
    />
  );
}`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6" id="component-showcase-panel">
      {/* Component Navigation Header Row */}
      <div className="flex items-center justify-start gap-1 pb-1 overflow-x-auto scrollbar-none border-b border-slate-100">
        {menuTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            className={`py-3 px-5 text-xs font-semibold whitespace-nowrap transition-all border-b-2 shrink-0 ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Playground Sandbox: Live Preview and controllers */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Visual Arena */}
          <div className="p-8 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center min-h-[300px] relative bg-slate-50/20 shadow-xs">
            <span className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1">
              <Eye className="w-3 h-3" /> Live Sandbox Canvas
            </span>

            {/* Render selected component with active controls */}
            <div className="w-full max-w-md flex flex-col items-center justify-center py-6">
              {activeTab === 'button' && (
                <div className="animate-fade-in text-center">
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
                  <p className="text-[10px] text-slate-400 mt-4 font-mono select-none">
                    * 体验微动画：点击或鼠标划过，观察 Hover & Active 颜色的平滑过渡动画
                  </p>
                </div>
              )}

              {activeTab === 'input' && (
                <div className="w-full animate-fade-in">
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
                  <p className="text-[10px] text-slate-400 mt-4 text-center font-mono select-none">
                    * 属性联动：点击聚焦，输入框边框高亮颜色与全圆角将配合当前最外层 Token 自适应
                  </p>
                </div>
              )}

              {activeTab === 'dropdown' && (
                <div className="w-full animate-fade-in min-h-[140px]">
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
                  />
                  <p className="text-[10px] text-slate-400 mt-6 text-center font-mono select-none">
                    * 复杂行为：展开后提供搜索过滤。选中项具有微过渡样式和背景着色标识
                  </p>
                </div>
              )}

              {activeTab === 'modal' && (
                <div className="w-full animate-fade-in text-center flex flex-col items-center">
                  <Button variant="primary" onClick={() => setModalIsOpen(true)}>
                    运行触发和呼出模态框 (Trigger Overlay)
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
                              暂返回修改
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => setModalIsOpen(false)}>
                              确定并终止实例
                            </Button>
                          </div>
                        )
                      ) : undefined
                    }
                  >
                    {modalIsAlertStyle ? (
                      <div className="flex items-start gap-4 py-1.5 text-left">
                        {/* 蓝色实像圆章 "i" 图标 */}
                        <div 
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-serif font-bold text-sm select-none"
                          style={{ backgroundColor: tokens.colors.brand }}
                        >
                          i
                        </div>
                        <div className="text-sm font-normal pt-0.5 leading-relaxed" style={{ color: tokens.colors.textPrimary }}>
                          请先完成首份技术标书编制，首份编制完成后解锁再写一份
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 font-normal text-slate-600 text-left">
                        <p className="text-sm">
                          此操作为云集群高危级别操作，关闭该运行实例将会断开 <strong>Algonet-2</strong>{' '}
                          分布式节点。包含 <strong>2.4TB</strong> 网络缓存也会永久清理。
                        </p>
                        <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-2 border border-red-100">
                          <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <strong>警告提示：</strong>
                            本操作不可回滚。数据卷将同时被注销，无法重新还原。
                          </div>
                        </div>
                      </div>
                    )}
                  </Modal>

                  <p className="text-[10px] text-slate-400 mt-4 max-w-xs font-mono select-none leading-normal">
                    * 点击按钮，展示完整的阴影遮罩。弹出和淡出动画在 React 中流畅执行
                  </p>
                </div>
              )}

              {activeTab === 'navbar' && (
                <div className="w-full animate-fade-in border border-slate-100 rounded-lg overflow-hidden relative shadow-sm">
                  <Navbar
                    logo={
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 flex items-center justify-center font-bold text-white rounded text-xs select-none"
                          style={{ backgroundColor: tokens.colors.brand }}
                        >
                          Σ
                        </div>
                        <span
                          className="text-xs font-bold tracking-tight token-font-heading"
                          style={{ color: tokens.colors.textPrimary }}
                        >
                          {navBrandName}
                        </span>
                      </div>
                    }
                    menuItems={[
                      { label: '智能分析', active: navActiveIndex === 0, onClick: () => setNavActiveIndex(0) },
                      { label: '存储资源', active: navActiveIndex === 1, onClick: () => setNavActiveIndex(1) },
                      { label: '系统设置', active: navActiveIndex === 2, onClick: () => setNavActiveIndex(2) },
                    ]}
                    rightActions={
                      <Button size="sm" variant="outline">
                        退出控制台
                      </Button>
                    }
                    sticky={false}
                  />
                  <p className="text-[10px] text-slate-400 mt-4 p-4 text-center font-mono select-none">
                    * 点击标签，切换激活状态。整个网格顶栏对齐，支持在复杂的响应式后台内快速作为头部嵌套
                  </p>
                </div>
              )}

              {activeTab === 'icon' && (
                <div className="w-full text-center animate-fade-in flex flex-col items-center">
                  <div 
                    className="p-10 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100/80 flex items-center justify-center min-w-[140px] min-h-[140px] group transition-all duration-300 hover:shadow-md hover:bg-white"
                    style={{ borderRadius: tokens.borders.radiusLg }}
                  >
                    <Icon
                      name={iconName}
                      size={iconSizeType === 'custom' ? iconCustomSize : iconSize}
                      variant={iconVariant}
                      hoverVariant={iconHoverVariant}
                      spinning={iconSpinning}
                    />
                  </div>
                  
                  <div className="mt-5 space-y-1.5 max-w-sm">
                    <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 justify-center">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-mono">
                        &lt;Icon name="{iconName}" /&gt;
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal leading-normal">
                      尺寸范围：<span className="font-mono text-indigo-600 font-semibold">{iconSizeType === 'custom' ? `${iconCustomSize}px (自定义像素)` : iconSize.toUpperCase()}</span> | 
                      动画形态：<span className="font-mono text-indigo-600 font-semibold">{iconSpinning || iconName === 'loader' ? '循环纺锤旋转' : '常规静态'}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-normal leading-normal select-none">
                      💡 <strong>悬停微体验：</strong>请将鼠标移入/悬停在上方图标上，感受高保真颜色平滑过渡。
                      {iconName === 'trash' && <span className="text-red-500 block font-medium mt-1"> (防误解高保真：删除图标默认绑定红色 Hover 状态!)</span>}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Component Documentation Blueprint explanations */}
          <div className="p-5 bg-white border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-xs">
            <h4 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              当前组件设计标准与调用模式 (How to Design & Invoke)
            </h4>
            <div className="text-xs text-slate-500 space-y-2 leading-relaxed font-normal">
              {activeTab === 'button' && (
                <>
                  <p>
                    <strong>样式与交互绑定：</strong>
                    按钮边角曲率直接使用 <code>tokens.borders.radiusMd</code>，背景色绑定{' '}
                    <code>tokens.colors.brand</code>。通过 React state 驱动悬浮 (Hover) 和活性按下{' '}
                    (Active) 的颜色，提供超高柔和微动反馈。
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>可用变体：</strong>
                    支持：<code>primary</code> (填充)、<code>secondary</code> (次要容器)、<code>outline</code>{' '}
                    (简约线框)、<code>text</code> (无外框纯文本)。支持在后台或复杂工具中无缝切换。
                  </p>
                </>
              )}
              {activeTab === 'input' && (
                <>
                  <p>
                    <strong>输入行为与可访问性：</strong>
                    遵循高度标准化的标签、说明性文字和错误校验的层次。聚焦 (Focus)
                    状态将会高亮变色，并结合外层产生一个具有 12% 品牌主色透明度的扩散光泽环 (Ring Outline)。
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>状态校验：</strong>当传入 <code>error</code>{' '}
                    属性时，系统将直接把相关的标题、提示文字、甚至外加边框完全标记为系统错误警戒红{' '}
                    <code>tokens.colors.error</code>。
                  </p>
                </>
              )}
              {activeTab === 'dropdown' && (
                <>
                  <p>
                    <strong>智能选项架构：</strong>
                    下拉组件不仅需要简单的列表，它在交互细节上增加了搜索项过滤、当前选中标志以及对每个 Option
                    附加说明字段的高密度展现。
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>浮层渲染：</strong>弹出位置具备 50
                    层级。浮框使用微轻质级阴影，以保证不管在任何复杂的表单背景上都能完美托起浮出，不产生任何视觉沾连。
                  </p>
                </>
              )}
              {activeTab === 'modal' && (
                <>
                  <p>
                    <strong>模态物理遮罩：</strong>
                    整个组件在进入时会对底层视图渲染一个 60% 密度的极简化深灰遮罩{' '}
                    <code>slate-900/60</code>，并应用了 <code>backdrop-blur</code>
                    让用户思维焦点强制停留在正在处理的心智中。
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>动画与弹力 (Spring)：</strong>
                    我们不再使用生硬突兀的无动画状态，而是利用 <code>motion</code>
                    组件的微弱弹簧动画物理模型，弹出柔顺、退出利索，使原型具有极为真实的生产级体感。
                  </p>
                </>
              )}
              {activeTab === 'navbar' && (
                <>
                  <p>
                    <strong>品牌定位与对齐规范：</strong>
                    严格遵循 12
                    列响应式横向网格规则，两侧留百边缘与主页容器自动重合对齐。中间包含了多个可控的导航链接卡扣。
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>原子设计复用：</strong>导航栏组件的右侧按钮操作群
                    (rightActions)，在组合时将完美的将 <code>Button</code> 作为原子进行注入，形成干净、清晰、一贯性的组件树嵌套。
                  </p>
                </>
              )}
              {activeTab === 'icon' && (
                <>
                  <p>
                    <strong>色彩分流与视觉层级保护：</strong>
                    绝大部分常规操作、配置和导航图标在未选中时，保持温和的<b>中性浅灰</b>（<code>tokens.colors.textMuted</code>/<code>#94A3B8</code>），以此避免对界面内容和结构构成多余的喧宾夺主，保持画面的极简和空气感！
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>固化语义色安全阀：</strong>
                    常用的成功、警醒、错误在渲染时默认绑定行业通行的<b>红/绿/黄固化语义色</b>，不支持随便变异，保证开发无论在哪里使用这些系统状态时其安全调性完美统一。
                  </p>
                  <p className="pt-1.5 border-t border-slate-100">
                    <strong>悬吊微反馈 (Trash hover to red)：</strong>
                    删除 (trash/delete) 图标自带悬浮安全暗示——不管初始呈现多么暗淡，在鼠标贴合的一瞬间将转变为<b>警告朱红</b>，暗示危险毁灭动作。
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Component Controllers Deck & Source Code Inspector */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Controllers Panel */}
          <div className="p-5 bg-white border border-[#E2E8F0] dark:border-slate-800 rounded-xl shadow-xs">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-500" />
              参数控制器 (Prop Controllers)
            </h3>

            {/* Dynamic fields mapped to selected tab */}
            {activeTab === 'button' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">按钮变体 (Variant)</label>
                  <div className="flex flex-wrap gap-2">
                    {(['primary', 'secondary', 'outline', 'text', 'danger'] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setBtnVariant(v)}
                        className={`px-2.5 py-1 text-xs border rounded transition-all cursor-pointer ${
                          btnVariant === v
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">按钮尺寸 (Size)</label>
                  <div className="flex gap-2">
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setBtnSize(s)}
                        className={`flex-1 py-1 text-xs border rounded transition-all cursor-pointer text-center ${
                          btnSize === s
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">禁用状态 (Disabled)</span>
                    <input
                      type="checkbox"
                      checked={btnDisabled}
                      onChange={(e) => setBtnDisabled(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">缓冲加载 (Is Loading)</span>
                    <input
                      type="checkbox"
                      checked={btnLoading}
                      onChange={(e) => setBtnLoading(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">插入内置图标 (Icon Placement)</label>
                  <select
                    value={btnIcon}
                    onChange={(e) => setBtnIcon(e.target.value as any)}
                    className="w-full text-xs border rounded p-1.5 bg-white cursor-pointer"
                  >
                    <option value="none">无图标 (No Icon)</option>
                    <option value="left">左侧图标 (Left Icon)</option>
                    <option value="right">右侧图标 (Right Icon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">按钮文案</label>
                  <input
                    type="text"
                    value={btnText}
                    onChange={(e) => setBtnText(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>
              </div>
            )}

            {activeTab === 'input' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">标题 (Label)</label>
                  <input
                    type="text"
                    value={inputLabel}
                    onChange={(e) => setInputLabel(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">占位符 (Placeholder)</label>
                  <input
                    type="text"
                    value={inputPlaceholder}
                    onChange={(e) => setInputPlaceholder(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">底部说明文字 (Description)</label>
                  <input
                    type="text"
                    value={inputDesc}
                    onChange={(e) => setInputDesc(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">错误消息拦截提示 (Error)</label>
                  <input
                    type="text"
                    placeholder="输入触发异常高亮信息以进行模拟"
                    value={inputError}
                    onChange={(e) => setInputError(e.target.value)}
                    className="w-full text-xs border rounded p-2 border-red-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/30 text-red-650"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">禁用状态</span>
                    <input
                      type="checkbox"
                      checked={inputDisabled}
                      onChange={(e) => setInputDisabled(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">左侧前缀图标</span>
                    <input
                      type="checkbox"
                      checked={inputIconLeft}
                      onChange={(e) => setInputIconLeft(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">高度尺寸</label>
                  <div className="flex gap-2">
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setInputSize(s)}
                        className={`flex-1 py-1 text-xs border rounded transition-all cursor-pointer ${
                          inputSize === s ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dropdown' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">标签标题 (Label)</label>
                  <input
                    type="text"
                    value={dropLabel}
                    onChange={(e) => setDropLabel(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">底部描述 (Description)</label>
                  <input
                    type="text"
                    value={dropDesc}
                    onChange={(e) => setDropDesc(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">错误警示 (Error)</label>
                  <input
                    type="text"
                    value={dropError}
                    onChange={(e) => setDropError(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">禁用状态</span>
                    <input
                      type="checkbox"
                      checked={dropDisabled}
                      onChange={(e) => setDropDisabled(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">开启搜索检索</span>
                    <input
                      type="checkbox"
                      checked={dropSearch}
                      onChange={(e) => setDropSearch(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">高度规格 (Size)</label>
                  <div className="flex gap-2">
                    {(['sm', 'md', 'lg'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setDropSize(s)}
                        className={`flex-1 py-1 text-xs border rounded transition-all cursor-pointer ${
                          dropSize === s ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'modal' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">模态窗口标题 (Title)</label>
                  <input
                    type="text"
                    value={modalTitle}
                    onChange={(e) => setModalTitle(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    视窗最大宽度规格 (Max Width)
                  </label>
                  <div className="flex gap-2">
                    {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setModalSize(s)}
                        className={`flex-1 py-1 text-xs border rounded transition-all cursor-pointer ${
                          modalSize === s ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        {s.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-600">标书提示风格 (Simple Alert Style)</span>
                  <input
                    type="checkbox"
                    checked={modalIsAlertStyle}
                    onChange={(e) => {
                      const enabled = e.target.checked;
                      setModalIsAlertStyle(enabled);
                      if (enabled) {
                        setModalTitle('提示');
                        setModalSize('sm');
                      } else {
                        setModalTitle('终止并停用当前计算节点？');
                        setModalSize('md');
                      }
                    }}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-600">包含底部控制槽 (Footer Slots)</span>
                  <input
                    type="checkbox"
                    checked={modalHasFooter}
                    onChange={(e) => setModalHasFooter(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'navbar' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Logo 品牌文字 (Logo Title)</label>
                  <input
                    type="text"
                    value={navBrandName}
                    onChange={(e) => setNavBrandName(e.target.value)}
                    className="w-full text-xs border rounded p-2"
                  />
                </div>
              </div>
            )}

            {activeTab === 'icon' && (
              <div className="space-y-4">
                {/* 1. 图标库矩阵选择 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    选择测试图标 (Click to select)
                  </label>
                  <div className="space-y-3.5 bg-slate-50/50 p-3 rounded-lg border border-slate-100/60 max-h-56 overflow-y-auto scrollbar-thin">
                    {/* A. 基础操作类 */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider font-mono">Operations 基础操作</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(['plus', 'pencil', 'trash', 'search', 'refresh', 'check', 'x'] as const).map((name) => (
                          <button
                            key={name}
                            onClick={() => setIconName(name)}
                            title={name}
                            className={`p-1.5 border rounded flex flex-col items-center justify-center transition-all cursor-pointer ${
                              iconName === name
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-600 font-bold shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-500'
                            }`}
                          >
                            <Icon name={name} size="sm" variant={iconName === name ? 'primary' : 'default'} />
                            <span className="text-[9px] font-mono mt-1 scale-90 origin-center truncate w-full text-center">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* B. 导航方向类 */}
                    <div className="mt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider font-mono font-mono">Navigation 导航方向</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(['chevron-down', 'chevron-right', 'chevron-left'] as const).map((name) => (
                          <button
                            key={name}
                            onClick={() => setIconName(name)}
                            title={name}
                            className={`p-1.5 border rounded flex flex-col items-center justify-center transition-all cursor-pointer ${
                              iconName === name
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-600 font-bold shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-500'
                            }`}
                          >
                            <Icon name={name} size="sm" variant={iconName === name ? 'primary' : 'default'} />
                            <span className="text-[9px] font-mono mt-1 scale-90 origin-center truncate w-full text-center">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* C. 系统配置类 */}
                    <div className="mt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider font-mono font-mono">System 系统辅助</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(['settings', 'help', 'loader'] as const).map((name) => (
                          <button
                            key={name}
                            onClick={() => setIconName(name)}
                            title={name}
                            className={`p-1.5 border rounded flex flex-col items-center justify-center transition-all cursor-pointer ${
                              iconName === name
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-600 font-bold shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-500'
                            }`}
                          >
                            <Icon name={name} size="sm" variant={iconName === name ? 'primary' : 'default'} />
                            <span className="text-[9px] font-mono mt-1 scale-90 origin-center truncate w-full text-center">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* D. 常用输入选项类 */}
                    <div className="mt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider font-mono font-mono">Forms 选项与常态</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(['upload', 'download', 'more-horizontal', 'more-vertical', 'drag', 'checkbox-checked', 'checkbox-unchecked', 'radio-checked', 'radio-unchecked'] as const).map((name) => (
                          <button
                            key={name}
                            onClick={() => setIconName(name)}
                            title={name}
                            className={`p-1.5 border rounded flex flex-col items-center justify-center transition-all cursor-pointer ${
                              iconName === name
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-600 font-bold shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-500'
                            }`}
                          >
                            <Icon name={name} size="sm" variant={iconName === name ? 'primary' : 'default'} />
                            <span className="text-[9px] font-mono mt-1 scale-90 origin-center truncate w-full text-center">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* E. 智能反馈类 */}
                    <div className="mt-2.5">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1 uppercase tracking-wider font-mono">AI & Feedbacks 智能与反馈</span>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(['ai', 'success', 'warning', 'error', 'info'] as const).map((name) => (
                          <button
                            key={name}
                            onClick={() => setIconName(name)}
                            title={name}
                            className={`p-1.5 border rounded flex flex-col items-center justify-center transition-all cursor-pointer ${
                              iconName === name
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-600 font-bold shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-500'
                            }`}
                          >
                            <Icon name={name} size="sm" />
                            <span className="text-[9px] font-mono mt-1 scale-90 origin-center truncate w-full text-center">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 尺寸控制 */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-600">图标物理大小 (Size Mode)</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIconSizeType('preset')}
                        className={`px-1.5 py-0.5 text-[10px] border rounded ${
                          iconSizeType === 'preset' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        标准预设
                      </button>
                      <button
                        onClick={() => setIconSizeType('custom')}
                        className={`px-1.5 py-0.5 text-[10px] border rounded ${
                          iconSizeType === 'custom' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        绝对像素
                      </button>
                    </div>
                  </div>

                  {iconSizeType === 'preset' ? (
                    <div className="flex gap-1.5">
                      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setIconSize(s)}
                          className={`flex-1 py-1 text-xs border rounded transition-all cursor-pointer ${
                            iconSize === s && iconSizeType === 'preset' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {s.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                        <span>12px</span>
                        <span className="text-indigo-600 font-semibold">{iconCustomSize}px</span>
                        <span>64px</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="64"
                        value={iconCustomSize}
                        onChange={(e) => setIconCustomSize(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  )}
                </div>

                {/* 3. Variant 变体选择 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">正常状态颜色 (Variant)</label>
                  <select
                    value={iconVariant}
                    onChange={(e) => setIconVariant(e.target.value as any)}
                    className="w-full text-xs border rounded p-2"
                  >
                    <option value="default">Default (遵循设计规范：淡雅不夺目暖灰色)</option>
                    <option value="primary">Primary (高光品牌主色)</option>
                    <option value="success">Success (语义成功：专属翡翠绿色)</option>
                    <option value="warning">Warning (语义警告：暖金琥珀色)</option>
                    <option value="danger">Danger (语义危险/错误：火红警戒色)</option>
                    <option value="info">Info (信息指南：通透蓝色)</option>
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    * <b>极客贴士：</b>特定字形（如 success、warning、error 等）在未指定 Variant 时会自动绑定各自定义专属色，确保首要反馈的高视觉识别度。
                  </p>
                </div>

                {/* 4. Hover Variant 悬停变体 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">悬停变化颜色 (Hover State)</label>
                  <select
                    value={iconHoverVariant}
                    onChange={(e) => setIconHoverVariant(e.target.value as any)}
                    className="w-full text-xs border rounded p-2"
                  >
                    <option value="none">None (保持常态色，无变色变化)</option>
                    <option value="default">Default (微调灰色)</option>
                    <option value="primary">Primary (渐变品牌色)</option>
                    <option value="success">Success (复原语义绿)</option>
                    <option value="warning">Warning (警告琥珀色)</option>
                    <option value="danger">Danger (警戒深朱红)</option>
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    * <b>微交互原则：</b>在触碰图标实体时触发轻微的动效。删除图标（trash）在悬浮时会自动拉升到警戒朱红，警告其后续的毁灭倾向。
                  </p>
                </div>

                {/* 5. 动画形态 */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-600">自旋动画 (Continuous Rotation)</span>
                    <span className="text-[10px] text-slate-400">开启后产生 360° 无端自转效果</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={iconSpinning}
                    onChange={(e) => setIconSpinning(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

          {/* TSX Code block and interactive clipboard */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-lg flex flex-col gap-3">
            <div className="flex items-center justify-between border-b pb-3 border-slate-800">
              <div className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-semibold text-white">组件调用代码 (Source Code)</h4>
              </div>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 py-1 px-2.5 text-[11px] font-medium rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" /> 已复制!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> 复制代码
                  </>
                )}
              </button>
            </div>
            <pre className="text-[11px] font-mono whitespace-pre overflow-x-auto bg-slate-950/85 p-3.5 rounded border border-slate-800 max-h-56 leading-relaxed text-emerald-350">
              {getCodeSnippet()}
            </pre>
            <div className="p-3 bg-indigo-950/40 border border-indigo-900/40 roundedText text-[10px] text-indigo-350 leading-relaxed font-normal">
              <strong>系统性调用提示：</strong>组件直接通过 <code>Import</code> 引入，其内部
              已经自动集成 React 状态与全局 <code>DesignTokensContext</code> 的状态跟踪。
              开发人员后续只需像声明普通 React 组件一样编写即可，保障高复用度。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowcasePanel;
