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
import { Tabs } from './atoms/Tabs';
import { DatePicker } from './atoms/DatePicker';
import { Slider } from './atoms/Slider';
import { Progress } from './atoms/Progress';
import { Loading } from './atoms/Loading';
import { Alert } from './atoms/Alert';
import { Tag } from './atoms/Tag';
import { useToast } from './atoms/Toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './atoms/Card';
import { IconName, TabItem } from '../types/components';
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
  ChevronDown,
  CheckCircle2
} from 'lucide-react';

const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ checked, onChange, disabled }) => {
  const { tokens } = useDesignTokens();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      }`}
      style={{
        backgroundColor: checked ? tokens.colors.brand : tokens.colors.border,
      }}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-[16px]' : 'translate-x-[2px]'
        } mt-0.5`}
      />
    </button>
  );
};

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

  // 10. Tabs Demo states
  const [tabsActiveId, setTabsActiveId] = useState<string>('dashboard');
  const [tabsVariant, setTabsVariant] = useState<'line' | 'pill' | 'card'>('line');
  const [tabsSize, setTabsSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [tabsDirection, setTabsDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [tabsFullWidth, setTabsFullWidth] = useState<boolean>(false);
  const [tabsWithIcon, setTabsWithIcon] = useState<boolean>(true);
  const [tabsWithBadge, setTabsWithBadge] = useState<boolean>(true);
  const [tabsWithDisabled, setTabsWithDisabled] = useState<boolean>(true);

  // 11. DatePicker Demo states
  const [dpSize, setDpSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [dpLabel, setDpLabel] = useState<string>('计划调度启动时间 (Schedule Launch Date)');
  const [dpPlaceholder, setDpPlaceholder] = useState<string>('请点选未来启动时间...');
  const [dpDesc, setDpDesc] = useState<string>('通过 K8s 控制中转调度，提前预置节点镜像');
  const [dpError, setDpError] = useState<string>('');
  const [dpDisabled, setDpDisabled] = useState<boolean>(false);
  const [dpValue, setDpValue] = useState<Date | string | null>('2026-06-01');

  // 12. Slider Demo states
  const [sliderValue, setSliderValue] = useState<number>(35);
  const [sliderMin, setSliderMin] = useState<number>(0);
  const [sliderMax, setSliderMax] = useState<number>(100);
  const [sliderStep, setSliderStep] = useState<number>(5);
  const [sliderSize, setSliderSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [sliderLabel, setSliderLabel] = useState<string>('系统并发压力核心调控参数 (Load Quota Percent)');
  const [sliderDesc, setSliderDesc] = useState<string>('实时分配节点可并发支撑的服务最大连接百分比例额度等级');
  const [sliderError, setSliderError] = useState<string>('');
  const [sliderDisabled, setSliderDisabled] = useState<boolean>(false);
  const [sliderShowInput, setSliderShowInput] = useState<boolean>(true);
  const [sliderShowTooltip, setSliderShowTooltip] = useState<boolean>(true);
  const [sliderShowMarks, setSliderShowMarks] = useState<boolean>(true);

  // 14. Progress Demo states
  const [progValue, setProgValue] = useState<number>(65);
  const [progMax, setProgMax] = useState<number>(100);
  const [progSize, setProgSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [progStatus, setProgStatus] = useState<'default' | 'success' | 'warning' | 'exception' | 'active'>('active');
  const [progShowInfo, setProgShowInfo] = useState<boolean>(true);
  const [progInfoPosition, setProgInfoPosition] = useState<'right' | 'top' | 'inside'>('right');
  const [progLabel, setProgLabel] = useState<string>('当前集群物理镜像拉取进度 (Docker Pull Progress)');
  const [progDesc, setProgDesc] = useState<string>('系统正在通过 Nexus 物理内网千兆网口加速抓取镜像，拉取任务包含系统核心安全拦截防护插件文件包');
  const [progStriped, setProgStriped] = useState<boolean>(true);
  const [progAnimated, setProgAnimated] = useState<boolean>(true);

  // 15. Loading Demo states
  const [loadSpinning, setLoadSpinning] = useState<boolean>(true);
  const [loadType, setLoadType] = useState<'spinner' | 'dots' | 'pulse' | 'bar' | 'skeleton'>('spinner');
  const [loadSize, setLoadSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [loadColor, setLoadColor] = useState<'default' | 'brand' | 'success' | 'warning' | 'error' | 'white'>('default');
  const [loadTip, setLoadTip] = useState<string>('正在安全对接到多云冷备计算宿主机 (Syncing Node Instance...)');
  const [loadTipPosition, setLoadTipPosition] = useState<'bottom' | 'right'>('bottom');
  const [loadBackdrop, setLoadBackdrop] = useState<boolean>(true);
  const [loadUseWrapper, setLoadUseWrapper] = useState<boolean>(false);

  // 16. Alert Demo states
  const [alertType, setAlertType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [alertMessage, setAlertMessage] = useState<string>('【系统维护通告】核心物理集群将于本日 23:00 进行例行冷备数据容灾切换！');
  const [alertShowDescription, setAlertShowDescription] = useState<boolean>(false);
  const [alertDescription, setAlertDescription] = useState<string>('此项操作不会干扰当前正处于微服务器高能运行状态下的应用容器。为确保安全，防范程序将会通过光纤内网向备份调度机发送心跳广播包进行保活。');
  const [alertClosable, setAlertClosable] = useState<boolean>(true);
  const [alertShowIcon, setAlertShowIcon] = useState<boolean>(true);
  const [alertShowAction, setAlertShowAction] = useState<boolean>(true);
  const [alertIsVisibleTest, setAlertIsVisibleTest] = useState<boolean>(true);

  // 17. Toast Demo states
  const [toastType, setToastType] = useState<'info' | 'success' | 'warning' | 'error' | 'loading'>('success');
  const [toastMessage, setToastMessage] = useState<string>('多物理对等网关同步配置成功 (Node parity success)');
  const [toastShowDescription, setToastShowDescription] = useState<boolean>(false);
  const [toastDescription, setToastDescription] = useState<string>('内网光纤协议数据一致性测试：通过率 100%，响应延迟 ~1.2ms');
  const [toastDuration, setToastDuration] = useState<number>(3000);
  const [toastClosable, setToastClosable] = useState<boolean>(true);
  const [toastPosition, setToastPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'>('top-center');
  const toast = useToast();

  // 18. Tag Demo states
  const [tagType, setTagType] = useState<'default' | 'primary' | 'success' | 'warning' | 'error'>('primary');
  const [tagVariant, setTagVariant] = useState<'solid' | 'soft' | 'outline' | 'dot'>('soft');
  const [tagSize, setTagSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [tagClosable, setTagClosable] = useState<boolean>(false);
  const [tagContent, setTagContent] = useState<string>('Active Proxy');
  const [tagShowIcon, setTagShowIcon] = useState<boolean>(false);
  const [tagIsVisibleTest, setTagIsVisibleTest] = useState<boolean>(true);

  // 13. Card Demo states
  const [cardVariant, setCardVariant] = useState<'standard-outline' | 'subtle-flat' | 'isometric-elevated'>('standard-outline');
  const [cardHoverable, setCardHoverable] = useState<boolean>(true);
  const [cardPadding, setCardPadding] = useState<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [cardRadius, setCardRadius] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('lg');
  const [cardGlow, setCardGlow] = useState<boolean>(false);
  const [cardTitleText, setCardTitleText] = useState<string>('弹性容器智能物理节点 (Dynamic Micro Node 408)');
  const [cardDescText, setCardDescText] = useState<string>('隶属于核心数据分析集群，自动分配内存并动态按需扩容');
  const [cardHasHeaderBorder, setCardHasHeaderBorder] = useState<boolean>(false);
  const [cardHasFooterBorder, setCardHasFooterBorder] = useState<boolean>(false);
  const [cardFooterAlign, setCardFooterAlign] = useState<'left' | 'center' | 'right' | 'between'>('right');
  const [cardClickedLog, setCardClickedLog] = useState<string>('暂无（点击上方卡片内按钮触发交互日志）');
  const [cardWidth, setCardWidth] = useState<'narrow' | 'standard' | 'wide' | 'full'>('standard');
  const [cardShowButtons, setCardShowButtons] = useState<boolean>(true);
  const [cardIconName, setCardIconName] = useState<'Activity' | 'Zap' | 'Terminal' | 'Star' | 'None'>('Activity');

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
    } else if (activeTab === 'tabs') {
      setTabsActiveId('dashboard');
      setTabsVariant('line');
      setTabsSize('md');
      setTabsDirection('horizontal');
      setTabsFullWidth(false);
      setTabsWithIcon(true);
      setTabsWithBadge(true);
      setTabsWithDisabled(true);
    } else if (activeTab === 'datepicker') {
      setDpSize('md');
      setDpLabel('计划调度启动时间 (Schedule Launch Date)');
      setDpPlaceholder('请点选未来启动时间...');
      setDpDesc('通过 K8s 控制中转调度，提前预置节点镜像');
      setDpError('');
      setDpDisabled(false);
      setDpValue('2026-06-01');
    } else if (activeTab === 'slider') {
      setSliderValue(35);
      setSliderMin(0);
      setSliderMax(100);
      setSliderStep(5);
      setSliderSize('md');
      setSliderLabel('系统并发压力核心调控参数 (Load Quota Percent)');
      setSliderDesc('实时分配节点可并发支撑的服务最大连接百分比例额度等级');
      setSliderError('');
      setSliderDisabled(false);
      setSliderShowInput(true);
      setSliderShowTooltip(true);
      setSliderShowMarks(true);
    } else if (activeTab === 'card') {
      setCardVariant('standard-outline');
      setCardHoverable(true);
      setCardPadding('md');
      setCardRadius('lg');
      setCardGlow(false);
      setCardTitleText('弹性容器智能物理节点 (Dynamic Micro Node 408)');
      setCardDescText('隶属于核心数据分析集群，自动分配内存并动态按需扩容');
      setCardHasHeaderBorder(false);
      setCardHasFooterBorder(false);
      setCardFooterAlign('right');
      setCardWidth('standard');
      setCardShowButtons(true);
      setCardIconName('Activity');
    } else if (activeTab === 'progress') {
      setProgValue(65);
      setProgMax(100);
      setProgSize('md');
      setProgStatus('active');
      setProgShowInfo(true);
      setProgInfoPosition('right');
      setProgLabel('当前集群物理镜像拉取进度 (Docker Pull Progress)');
      setProgDesc('系统正在通过 Nexus 物理内网千兆网口加速抓取镜像，拉取任务包含系统核心安全拦截防护插件文件包');
      setProgStriped(true);
      setProgAnimated(true);
    } else if (activeTab === 'loading') {
      setLoadSpinning(true);
      setLoadType('spinner');
      setLoadSize('md');
      setLoadColor('default');
      setLoadTip('正在安全对接到多云冷备计算宿主机 (Syncing Node Instance...)');
      setLoadTipPosition('bottom');
      setLoadBackdrop(true);
      setLoadUseWrapper(false);
    } else if (activeTab === 'alert') {
      setAlertType('info');
      setAlertMessage('【系统维护通告】核心物理集群将于本日 23:00 进行例行冷备数据容灾切换！');
      setAlertShowDescription(false);
      setAlertDescription('此项操作不会干扰当前正处于微服务器高能运行状态下的应用容器。为确保安全，防范程序将会通过光纤内网向备份调度机发送心跳广播包进行保活。');
      setAlertClosable(true);
      setAlertShowIcon(true);
      setAlertShowAction(true);
      setAlertIsVisibleTest(true);
    } else if (activeTab === 'toast') {
      setToastType('success');
      setToastMessage('多物理对等网关同步配置成功 (Node parity success)');
      setToastShowDescription(false);
      setToastDescription('内网光纤协议数据一致性测试：通过率 100%，响应延迟 ~1.2ms');
      setToastDuration(3000);
      setToastClosable(true);
      setToastPosition('top-center');
    } else if (activeTab === 'tag') {
      setTagType('primary');
      setTagVariant('soft');
      setTagSize('md');
      setTagClosable(false);
      setTagContent('Active Proxy');
      setTagShowIcon(false);
      setTagIsVisibleTest(true);
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
    } else if (activeTab === 'tabs') {
      propConfigStr = `activeId: "${tabsActiveId}", variant: "${tabsVariant}", size: "${tabsSize}", direction: "${tabsDirection}", fullWidth: ${tabsFullWidth}`;
    } else if (activeTab === 'datepicker') {
      propConfigStr = `size: "${dpSize}", label: "${dpLabel}", placeholder: "${dpPlaceholder}", disabled: ${dpDisabled}, error: "${dpError}"`;
    } else if (activeTab === 'slider') {
      propConfigStr = `min: ${sliderMin}, max: ${sliderMax}, step: ${sliderStep}, size: "${sliderSize}", label: "${sliderLabel}", disabled: ${sliderDisabled}, error: "${sliderError}", showInput: ${sliderShowInput}, showTooltip: ${sliderShowTooltip}, showMarks: ${sliderShowMarks}`;
    } else if (activeTab === 'card') {
      propConfigStr = `variant: "${cardVariant}", hoverable: ${cardHoverable}, padding: "${cardPadding}", radius: "${cardRadius}", glow: ${cardGlow}, footerAlign: "${cardFooterAlign}", width: "${cardWidth}", showFooter: ${cardShowButtons}, icon: "${cardIconName}"`;
    } else if (activeTab === 'progress') {
      propConfigStr = `value: ${progValue}, max: ${progMax}, size: "${progSize}", status: "${progStatus}", showInfo: ${progShowInfo}, infoPosition: "${progInfoPosition}", label: "${progLabel}", striped: ${progStriped}, animated: ${progAnimated}`;
    } else if (activeTab === 'loading') {
      propConfigStr = `spinning: ${loadSpinning}, type: "${loadType}", size: "${loadSize}", color: "${loadColor}", tip: "${loadTip}", tipPosition: "${loadTipPosition}", backdrop: ${loadBackdrop}`;
    } else if (activeTab === 'alert') {
      propConfigStr = `type: "${alertType}", message: "${alertMessage}", description: "${alertShowDescription ? alertDescription : undefined}", closable: ${alertClosable}, showIcon: ${alertShowIcon}, action: ${alertShowAction ? 'ReactNode' : 'undefined'}`;
    } else if (activeTab === 'toast') {
      propConfigStr = `type: "${toastType}", message: "${toastMessage}", description: "${toastShowDescription ? toastDescription : undefined}", duration: ${toastDuration}, closable: ${toastClosable}, position: "${toastPosition}"`;
    } else if (activeTab === 'tag') {
      propConfigStr = `type: "${tagType}", variant: "${tagVariant}", size: "${tagSize}", closable: ${tagClosable}, icon: ${tagShowIcon}`;
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
      tabs: {
        title: 'Tabs 选项卡 (Tabs Controller)',
        desc: '支持 LayoutId 物理防抖和滑动聚焦的高保能选项卡切换控制器。全面集成 line 下划线、pill 胶囊和 card 卡槽三种精美变体，PC 后台仪表盘首选。',
      },
      datepicker: {
        title: 'DatePicker 日期选择器',
        desc: '高自适应毛玻璃风格的日期与日历管理组件。无臃肿三方依赖，完美继承设计系统圆角、色彩、阴影，并可自定义大小规格与范围校验约束。',
      },
      slider: {
        title: 'Slider 高自变双向联控滑块',
        desc: '支持阻尼拖曳与精密触摸值的智能滑块原语。內建微型高显 tooltip 数值气泡、双向受控数字微调框，并全量继承设计系统颜色、聚焦阴影和圆角令牌。',
      },
      card: {
        title: 'Card 架构原子卡片容器',
        desc: '支撑深度设计令牌感应的内容面板盒子。遵循“少用硬边缘线，多用精致底色色差”的国际设计规则，支持无缝 hover 微弹物理位移、呼吸光圈悬停与气象状态底板。',
      },
      progress: {
        title: 'Progress 智能自适应进度条',
        desc: '高自适应、感应设计令牌的数字进度条。完美支持品牌色、状态色及跑马灯活动态（Active），并內建斑马斜纹、高对比百分比方位，可随父级节点尺寸进行精准的宽度尺寸自适应。',
      },
      loading: {
        title: 'Loading 智能状态加载器',
        desc: '极其流畅的高保真加载呈现原语。完美契合五大经典反馈动画（旋转圆轮、多点波浪、双重脉冲涟漪、顶部流光、智能卡片骨架屏），兼容 standalone 独立渲染与容器包裹双重形态。',
      },
      alert: {
        title: 'Alert 固定信息警告条',
        desc: '深度融合状态意识的行内信息反馈横幅。支持四种标准严肃的物理安全色彩表达，搭配高对比状态图标与行内极简操作块，可灵活运用于高密度工作区或弹窗通告。',
      },
      toast: {
        title: 'Toast 浮动轻提示',
        desc: '高悬浮轻质毛玻璃弹出浮盒。支持经典的 Spring 簧力阻尼动画物理弹出，支持倒计时非侵入自销毁、多层安全顺滑堆叠及防连击限制，极具呼吸律动。',
      },
      tag: {
        title: 'Tag 高保真微元标贴',
        desc: '极简且具有高信息密度的块状行级标识。支持灵活的色彩变体、轮廓描边与圆点点缀（dot），甚至允许内嵌动态交互的快速消除操控区，常用于分类、标记和高密度的标签库展示。',
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
    { title: '身份信息认证', description: '完成 OCR 及二要素验证' },
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
        case 'tabs':
          return `import { Tabs } from 'atomix-ui';
import { useState } from 'react';

export default function MyTabsControl() {
  const [active, setActive] = useState('${tabsActiveId}');
  const items = [
    { id: 'dashboard', label: '控制大盘', icon: 'compass', badge: 12 },
    { id: 'security', label: '系统安全', icon: 'shield' },
    { id: 'settings', label: '全局配置', icon: 'settings', disabled: ${tabsWithDisabled} }
  ];

  return (
    <Tabs
      activeId={active}
      items={items}
      onChange={setActive}
      variant="${tabsVariant}"
      size="${tabsSize}"
      direction="${tabsDirection}"
      fullWidth={${tabsFullWidth}}
    />
  );
}`;
        case 'datepicker':
          return `import { DatePicker } from 'atomix-ui';
import { useState } from 'react';

export default function DateSelector() {
  const [date, setDate] = useState<Date | string | null>('2026-06-01');

  return (
    <DatePicker
      label="${dpLabel}"
      description="${dpDesc}"
      placeholder="${dpPlaceholder}"
      size="${dpSize}"
      value={date}
      onChange={(selectedDate, dateStr) => setDate(dateStr)}${dpDisabled ? '\n      disabled' : ''}${dpError ? `\n      error="${dpError}"` : ''}
    />
  );
}`;
        case 'slider':
          return `import { Slider } from 'atomix-ui';
import { useState } from 'react';

export default function IntensitySelector() {
  const [intensity, setIntensity] = useState<number>(${sliderValue});

  return (
    <Slider
      label="${sliderLabel}"
      description="${sliderDesc}"
      min={${sliderMin}}
      max={${sliderMax}}
      step={${sliderStep}}
      size="${sliderSize}"
      value={intensity}
      onChange={setIntensity}${sliderShowInput ? '\n      showInput' : ''}${sliderShowTooltip ? '\n      showTooltip' : ''}${sliderShowMarks ? '\n      showMarks' : ''}${sliderDisabled ? '\n      disabled' : ''}${sliderError ? `\n      error="${sliderError}"` : ''}
    />
  );
}`;
        case 'card':
          const iconImport = cardIconName !== 'None' ? `import { ${cardIconName} } from 'lucide-react';\n` : '';
          const iconJSX = cardIconName !== 'None' ? `\n          <${cardIconName} className="w-5 h-5 text-indigo-500 shrink-0" />` : '';
          const footerJSX = cardShowButtons ? `\n      <CardFooter align="${cardFooterAlign}"\${cardHasFooterBorder ? ' bordered' : ''}>
        <Button variant="outline" size="sm">下线节点</Button>
        <Button variant="primary" size="sm">性能调阅</Button>
      </CardFooter>` : '';
          const wrapperStyleForCode = cardWidth !== 'full' ? `\n// 父级容器分配的物理尺寸: ${cardWidth === 'narrow' ? '290px' : cardWidth === 'standard' ? '390px' : '512px'}` : '';

          return `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from 'atomix-ui';
${iconImport}
export default function NodeCard() {${wrapperStyleForCode}
  return (
    <Card
      variant="${cardVariant}"\${cardHoverable ? '\\n      hoverable' : ''}
      padding="${cardPadding}"
      radius="${cardRadius}"\${cardGlow ? '\\n      glow' : ''}
    >
      <CardHeader\${cardHasHeaderBorder ? ' bordered' : ''}>
        <div className="flex items-center justify-between gap-4">
          <CardTitle size="lg">${cardTitleText}</CardTitle>${iconJSX}
        </div>
        <CardDescription>${cardDescText}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="py-2 text-sm text-slate-600">
          节点状态正常，容器平均水位保持在 24% 的经典轻量态。
        </div>
      </CardContent>${footerJSX}
    </Card>
  );
}`;
        case 'progress':
          return `import { Progress } from 'atomix-ui';
import { useState } from 'react';

export default function LoadingProgress() {
  const [val, setVal] = useState(${progValue});

  return (
    <Progress
      value={val}
      max={${progMax}}
      size="${progSize}"
      status="${progStatus}"${progShowInfo ? '\n      showInfo' : '\n      showInfo={false}'}
      infoPosition="${progInfoPosition}"${progLabel ? `\n      label="${progLabel}"` : ''}${progDesc ? `\n      description="${progDesc}"` : ''}${progStriped ? '\n      striped' : ''}${progAnimated ? '\n      animated' : ''}
    />
  );
}`;
        case 'loading':
          if (loadUseWrapper) {
            return `import { Loading, Card, CardContent, Button } from 'atomix-ui';
import { useState } from 'react';

export default function DelayedWrapper() {
  const [loading, setLoading] = useState(${loadSpinning});

  return (
    <div className="w-full max-w-sm">
      <Button size="sm" onClick={() => setLoading(!loading)} className="mb-4">
        切换重载状态 (Toggle Loading)
      </Button>

      <Loading
        spinning={loading}
        type="${loadType}"
        size="${loadSize}"
        color="${loadColor}"${loadTip ? `\n        tip="${loadTip}"` : ''}
        tipPosition="${loadTipPosition}"${loadBackdrop ? '\n        backdrop' : ''}
      >
        <Card variant="standard-outline" padding="md">
          <CardContent>
            <h4 className="font-bold text-sm text-slate-800">宿主机物理插口规格卡片</h4>
            <p className="text-xs text-slate-500 mt-1">此内容块被智能 Loading 遮罩层进行非侵入式包裹防触控。</p>
          </CardContent>
        </Card>
      </Loading>
    </div>
  );
}`;
          }
          return `import { Loading } from 'atomix-ui';

export default function LoadingIndicator() {
  return (
    <Loading
      spinning={${loadSpinning}}
      type="${loadType}"
      size="${loadSize}"
      color="${loadColor}"${loadTip ? `\n      tip="${loadTip}"` : ''}
      tipPosition="${loadTipPosition}"
    />
  );
}`;
        case 'alert':
          return `import { Alert } from 'atomix-ui';

export default function AlertBannerDemo() {
  return (
    <Alert
      type="${alertType}"
      message="${alertMessage}"${alertShowDescription ? `\n      description="${alertDescription}"` : ''}
      closable={${alertClosable}}
      showIcon={${alertShowIcon}}${alertShowAction ? `\n      action={<button className="text-[11px] font-medium text-slate-500 hover:text-slate-700 transition-colors">不再提示</button>}` : ''}
    />
  );
}`;
        case 'toast':
          return `import { Button, useToast } from 'atomix-ui';

export default function ToastTriggerDemo() {
  const toast = useToast();

  const handleLaunch = () => {
    toast.${toastType}("${toastMessage}", {
${toastShowDescription ? `      description: "${toastDescription}",\n` : ''}      duration: ${toastDuration},
      closable: ${toastClosable}
    });
  };

  return (
    <Button variant="primary" onClick={handleLaunch}>
      发射 ${toastType.toUpperCase()} 轻型浮窗
    </Button>
  );
}`;
        case 'tag':
          return `import { Tag } from 'atomix-ui';${tagShowIcon ? `\nimport { CheckCircle2 } from 'lucide-react';` : ''}

export default function TagDemo() {
  return (
    <Tag
      type="${tagType}"
      variant="${tagVariant}"
      size="${tagSize}"${tagClosable ? `\n      closable={true}\n      onClose={() => console.log('Tag closed')}` : ''}${tagShowIcon ? `\n      icon={<CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />}` : ''}
    >
      ${tagContent}
    </Tag>
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
      :preset="activePreset"${activeTab === 'button' ? `\n      variant="${btnVariant}"\n      size="${btnSize}"\n      :loading="${btnLoading}"\n      :disabled="${btnDisabled}"` : ''}${activeTab === 'input' ? `\n      label="${inputLabel}"\n      placeholder="${inputPlaceholder}"\n      :disabled="${inputDisabled}"\n      :error="${inputError}"` : ''}${activeTab === 'steps' ? `\n      :current="${stepsCurrent}"\n      direction="${stepsDirection}"\n      size="${stepsSize}"` : ''}${activeTab === 'progress' ? `\n      :value="${progValue}"\n      :max="${progMax}"\n      status="${progStatus}"\n      size="${progSize}"\n      :striped="${progStriped}"\n      :animated="${progAnimated}"` : ''}${activeTab === 'loading' ? `\n      :spinning="${loadSpinning}"\n      type="${loadType}"\n      size="${loadSize}"\n      color="${loadColor}"\n      tip="${loadTip}"\n      tip-position="${loadTipPosition}"\n      :backdrop="${loadBackdrop}"` : ''}${activeTab === 'alert' ? `\n      type="${alertType}"\n      message="${alertMessage}"${alertShowDescription ? `\n      description="${alertDescription}"` : ''}\n      :closable="${alertClosable}"\n      :show-icon="${alertShowIcon}"` : ''}${activeTab === 'toast' ? `\n      type="${toastType}"\n      message="${toastMessage}"${toastShowDescription ? `\n      description="${toastDescription}"` : ''}\n      :duration="${toastDuration}"\n      :closable="${toastClosable}"` : ''}${activeTab === 'tag' ? `\n      type="${tagType}"\n      variant="${tagVariant}"\n      size="${tagSize}"\n      :closable="${tagClosable}"` : ''}
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
      case 'datepicker':
        return [
          { name: 'value', type: "'Date' | 'string' | 'null'", default: 'null', desc: '选定日期。支持标准 Date 实体、标准的 YYYY-MM-DD 字符，或者为 null 清除值' },
          { name: 'onChange', type: '(date, dateString) => void', default: 'undefined', desc: '选值变化回调，同时带回 Date 实例与 YYYY-MM-DD 格式的字符串' },
          { name: 'placeholder', type: 'string', default: "'请选择日期...'", desc: '值未选定时的提示灰字' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '尺寸规格高度。小：34px（高密度），中：42px，高：50px' },
          { name: 'disabled', type: 'boolean', default: 'false', desc: '一键将输入区和内置动作全部置灰哑状态，鼠标光标变禁入' },
          { name: 'error', type: 'string', default: "''", desc: '如果不为空，日历控件外轮廓整体泛起红色警戒警告，光圈锁定为防守型微红色阴影' },
        ];
      case 'slider':
        return [
          { name: 'value', type: 'number', default: '0', desc: '当前处于激活状态的滑块数值' },
          { name: 'onChange', type: '(value: number) => void', default: 'undefined', desc: '数值漂移改变的回调触发函数' },
          { name: 'min', type: 'number', default: '0', desc: '物理最小取值约束边界' },
          { name: 'max', type: 'number', default: '100', desc: '物理最大取值约束边界' },
          { name: 'step', type: 'number', default: '1', desc: '滑动阶段允许的推进最小步幅像素节点' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '滑片高度以及拖动触点的包容盒尺寸体系规格' },
          { name: 'showInput', type: 'boolean', default: 'false', desc: '是否在右侧渲染一个双向受控联接的精密数字刻度微调框' },
          { name: 'showTooltip', type: 'boolean', default: 'false', desc: '是否在拖曳滑片时，在滑块上方呼出带物理淡入动画的微气泡展示实时数值' },
          { name: 'disabled', type: 'boolean', default: 'false', desc: '是否挂起所有滑动画片交互并将外轮廓灰化置哑' },
          { name: 'error', type: 'string', default: "''", desc: '激活错误提示。传入信息后，滑片填充和微调输入框边线会以红色硬核警示色高光聚焦显现，同时展现底置报错信噪文案' },
        ];
      case 'card':
        return [
          { name: 'variant', type: "'standard-outline' | 'subtle-flat' | 'isometric-elevated'", default: "'standard-outline'", desc: '卡片的视觉外观风格：标准浅浅细框线、微秒扁平高低色差、或者有立体物理阴影的高级卡块' },
          { name: 'hoverable', type: 'boolean', default: 'true', desc: '开启后卡片悬停时会有微妙上浮的微交互物理缓冲动画反馈' },
          { name: 'padding', type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", desc: '卡片内部填充的尺寸规格。无、特小、小、中、大、特大，适配内容密度需求' },
          { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'lg'", desc: '卡片的圆角裁剪大小梯度' },
          { name: 'glow', type: 'boolean', default: 'false', desc: '在悬停卡片时，是否有品牌外发光的流光粒子效果包裹' },
        ];
      case 'progress':
        return [
          { name: 'value', type: 'number', default: '0', desc: '当前处于激活状态的实时进度数值（百分比分子）' },
          { name: 'max', type: 'number', default: '100', desc: '满载参考上限边界值（百分比分母字段，默认为 100）' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '进度条的粗细厚度尺寸规格体系' },
          { name: 'status', type: "'default' | 'success' | 'warning' | 'exception' | 'active'", default: "'default'", desc: '进度条运行时的状态变体：包含默认品牌蓝、健康绿、警告黄、故障红或有跑马灯跑动流转的超级活动态' },
          { name: 'showInfo', type: 'boolean', default: 'true', desc: '是否渲染百分比进度提示指标文本' },
          { name: 'infoPosition', type: "'right' | 'top' | 'inside'", default: "'right'", desc: '百分比计数器以及说明方位。右侧对齐、顶部独立行或大规格（lg）下的居中内嵌状态' },
          { name: 'label', type: 'string', default: "''", desc: '进度顶置文字标题，提供高自适应可访问指标' },
          { name: 'striped', type: 'boolean', default: 'false', desc: '是否给进度填充面施加经典的斑马斜纹条纹图案' },
          { name: 'animated', type: 'boolean', default: 'false', desc: '斜纹是否向右以常驻滑行流畅滚动方式循环演绎，表现节点进行中物理高能运作' },
        ];
      case 'loading':
        return [
          { name: 'spinning', type: 'boolean', default: 'true', desc: '是否正处于加载运转中。如果传入子节点 (children)，将作为优雅的数据遮罩层包裹内容运作' },
          { name: 'type', type: "'spinner' | 'dots' | 'pulse' | 'bar' | 'skeleton'", default: "'spinner'", desc: '加载器动画形态变体体系（圆轮旋转、波浪三点、漣漪呼吸、顶部无限进度、占位骨架屏）' },
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", desc: '加载模块物理解析大小（影响转圈直径、三点粗细、骨架厚度）' },
          { name: 'color', type: "'default' | 'brand' | 'success' | 'warning' | 'error' | 'white'", default: "'default'", desc: '加载器主色调方案。支持自适应匹配主设计系统色调、各大状态警告色及透亮纯白' },
          { name: 'tip', type: 'string', default: "''", desc: '伴随加载过渡组件呈现的精练解释或状态回溯文字' },
          { name: 'tipPosition', type: "'bottom' | 'right'", default: "'bottom'", desc: '提示文字位于加载体底置还是右侧（右侧排列时将转为行布局排布，适合小规格 sm）' },
          { name: 'backdrop', type: 'boolean', default: 'false', desc: '在组件有 children (包裹模式) 加载时，是否开启毛玻璃轻质磨砂阻断悬浮层' },
        ];
      case 'alert':
        return [
          { name: 'type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", desc: '警告条的主题语义背景配色分级体系（展示、成功、警惕、高危阻断）' },
          { name: 'message', type: 'string', default: "''", desc: '极其精巧、高度可访问的单句通栏或卡内关键说明标题（必填）' },
          { name: 'description', type: 'string', default: "''", desc: '补充、详尽且安全的第二能级具体解释说明子段段落（选填）' },
          { name: 'closable', type: 'boolean', default: 'false', desc: '是否在最右端提供一个可一键交互消除并且自动触发滑梯式折叠删除动画的叉号' },
          { name: 'onClose', type: '() => void', default: 'undefined', desc: '点击手动关闭时的优雅行为挂钩或是回溯通知' },
          { name: 'showIcon', type: 'boolean', default: 'true', desc: '是否在最左端按比例对称渲染能代表级安全状态的大图标' },
          { name: 'action', type: 'React.ReactNode', default: 'undefined', desc: '可在右端自定义扩展安插的微交互操作插槽（例如“不再提示”等文字按钮）' },
        ];
      case 'toast':
        return [
          { name: 'message', type: 'string', default: "''", desc: '浮窗的核心单行文案提示，支持标准精细化防折行（必填）' },
          { name: 'type', type: "'info' | 'success' | 'warning' | 'error' | 'loading'", default: "'info'", desc: '发射反馈类型（常规通知、全绿成功、金黄提防、猩红警告或带不间断旋转圆弧的进程常挂态）' },
          { name: 'description', type: 'string', default: "''", desc: '伴随主标题生成的附加状态详情细节文本（选填）' },
          { name: 'duration', type: 'number', default: '3000', desc: '在物理界面中平滑维系的可显时长（毫秒）。设为 0 时，除非由叉号或逻辑强制捏碎，否则该浮片保持永续常驻不闭合' },
          { name: 'closable', type: 'boolean', default: 'true', desc: '是否允许在右边缘渲染可手动提前捏裂和隐藏该提示的微叉号' },
        ];
      case 'tag':
        return [
          { name: 'children', type: 'React.ReactNode', default: 'null', desc: '标签正文主体' },
          { name: 'type', type: "'default' | 'primary' | 'success' | 'warning' | 'error'", default: "'default'", desc: '色彩类型，自适应语义色彩体系' },
          { name: 'variant', type: "'solid' | 'soft' | 'outline' | 'dot'", default: "'soft'", desc: '变体，控制背景轻重、外框有无，以及前置实心状态点的开关' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: '标贴的三大级排版规格空间，自动调整内边距以及字型大小比例' },
          { name: 'closable', type: 'boolean', default: 'false', desc: '是否具备一键删除的能力(尾部微叉号图标交互)' },
          { name: 'icon', type: 'React.ReactNode', default: 'undefined', desc: '头部置放代表该标贴性质的状态性引导图标 (建议使用 Lucide 14px)' },
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

                    {activeTab === 'tabs' && (
                      <div className="w-full flex flex-col items-center justify-center gap-6">
                        <Tabs
                          activeId={tabsActiveId}
                          items={[
                            { id: 'dashboard', label: '控制大盘', icon: tabsWithIcon ? 'compass' : undefined, badge: tabsWithBadge ? 12 : undefined },
                            { id: 'security', label: '系统安全', icon: tabsWithIcon ? 'shield' : undefined },
                            { id: 'settings', label: '全局配置', icon: tabsWithIcon ? 'settings' : undefined, disabled: tabsWithDisabled }
                          ]}
                          onChange={(id) => setTabsActiveId(id)}
                          variant={tabsVariant}
                          size={tabsSize}
                          direction={tabsDirection}
                          fullWidth={tabsFullWidth}
                        />
                        {/* 动态关联对应的内容渲染 */}
                        <div 
                          className="w-full max-w-xl p-5 border rounded-2xl animate-fade-in transition-all text-xs"
                          style={{
                            backgroundColor: tokens.colors.bgCard,
                            borderColor: tokens.colors.border
                          }}
                        >
                          <h4 className="font-bold token-font-heading text-sm mb-2" style={{ color: tokens.colors.textPrimary }}>
                            {tabsActiveId === 'dashboard' ? '📊 控制大盘运行时 (Dashboard View)' : 
                             tabsActiveId === 'security'  ? '🔒 安全合规审定中心 (Security Audit)' : 
                             '⚙️ 全局配置控制台 (Global Configs)'}
                          </h4>
                          <p style={{ color: tokens.colors.textSecondary }} className="leading-relaxed">
                            {tabsActiveId === 'dashboard' ? '您正在查阅云集群基础控制大盘。此面板挂钩了 12 个生产容器实例生命周期的遥测数据，支持高频物理曲线自适应侦听。' : 
                             tabsActiveId === 'security'  ? '系统正在为您拦截网络异常。目前 SSL 证书 and 数据通道契约 100% 保持闭环且安全系数达到五星评级，多重签名防御开启。' : 
                             '此处为全局预设中心。在这里一键配置当前原子组件库的核心视觉效果或导入自定义 Design Tokens JSON。'}
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'datepicker' && (
                      <div className="w-full flex justify-center animate-fade-in py-8">
                        <div className="w-full max-w-sm">
                          <DatePicker
                            label={dpLabel}
                            description={dpDesc}
                            placeholder={dpPlaceholder}
                            size={dpSize}
                            disabled={dpDisabled}
                            error={dpError}
                            value={dpValue}
                            onChange={(date, dateStr) => setDpValue(dateStr)}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'slider' && (
                      <div className="w-full flex justify-center animate-fade-in py-8">
                        <div className="w-full max-w-md px-4">
                          <Slider
                            label={sliderLabel}
                            description={sliderDesc}
                            min={sliderMin}
                            max={sliderMax}
                            step={sliderStep}
                            size={sliderSize}
                            disabled={sliderDisabled}
                            error={sliderError}
                            showInput={sliderShowInput}
                            showTooltip={sliderShowTooltip}
                            showMarks={sliderShowMarks}
                            value={sliderValue}
                            onChange={setSliderValue}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'card' && (
                      <div className="w-full flex justify-center animate-fade-in py-6">
                        <div 
                          className="w-full px-4 transition-all duration-300"
                          style={{
                            maxWidth: 
                              cardWidth === 'narrow' ? '290px' : 
                              cardWidth === 'standard' ? '390px' : 
                              cardWidth === 'wide' ? '512px' : '100%'
                          }}
                        >
                          <Card
                            variant={cardVariant}
                            hoverable={cardHoverable}
                            padding={cardPadding}
                            radius={cardRadius}
                            glow={cardGlow}
                          >
                            <CardHeader bordered={cardHasHeaderBorder}>
                              <div className="flex items-center justify-between gap-4">
                                <CardTitle size="lg">{cardTitleText}</CardTitle>
                                {cardIconName === 'Activity' && <Activity className="w-5 h-5 shrink-0 animate-pulse" style={{ color: tokens.colors.brand }} />}
                                {cardIconName === 'Zap' && <Zap className="w-5 h-5 shrink-0" style={{ color: tokens.colors.brand }} />}
                                {cardIconName === 'Terminal' && <Terminal className="w-5 h-5 shrink-0 font-mono" style={{ color: tokens.colors.brand }} />}
                                {cardIconName === 'Star' && <Star className="w-5 h-5 shrink-0" style={{ color: tokens.colors.brand }} />}
                              </div>
                              <CardDescription>{cardDescText}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="py-2 text-[13px] leading-relaxed" style={{ color: tokens.colors.textSecondary }}>
                                节点状态运行极其正常，容器内平均吞吐量在 24% 的经典轻载姿势。
                                本物理机已连续顺稳运行 4,000+ 个核小时无任何报错预警。
                              </div>
                            </CardContent>
                            {cardShowButtons && (
                              <CardFooter align={cardFooterAlign} bordered={cardHasFooterBorder}>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardClickedLog('已触发 [下线节点] 指令！平滑退役并调换调度流量。');
                                  }}
                                >
                                  下线节点
                                </Button>
                                <Button 
                                  variant="primary" 
                                  size="sm" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCardClickedLog('已触发 [性能调阅]! CPU 24% ｜ RAM 18% ｜ DISK IOPS 极佳');
                                  }}
                                >
                                  性能调阅
                                </Button>
                              </CardFooter>
                            )}
                          </Card>
                        </div>
                      </div>
                    )}

                    {activeTab === 'progress' && (
                      <div className="w-full flex justify-center animate-fade-in py-8">
                        <div className="w-full max-w-md px-4">
                          <Progress
                            label={progLabel}
                            description={progDesc}
                            value={progValue}
                            max={progMax}
                            size={progSize}
                            status={progStatus}
                            showInfo={progShowInfo}
                            infoPosition={progInfoPosition}
                            striped={progStriped}
                            animated={progAnimated}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'loading' && (
                      <div className="w-full flex flex-col items-center animate-fade-in py-6">
                        <div className="w-full max-w-md px-4 flex flex-col items-center gap-5">
                          {/* 简易开关，供用户测试 loading 触发/取消过程的动画渐变状态 */}
                          <div className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-150/40 bg-slate-50/20 mb-1">
                            <span className="text-xs font-semibold text-slate-500 font-mono">
                              💡 交互测试: {loadSpinning ? '运行中 (SPINNING)' : '已就绪 (READY)'}
                            </span>
                            <Button
                              variant={loadSpinning ? 'primary' : 'outline'}
                              size="xs"
                              onClick={() => setLoadSpinning(!loadSpinning)}
                              className="font-bold shrink-0 text-[10px]"
                            >
                              {loadSpinning ? '停止加载 (Stop)' : '启动加载 (Start)'}
                            </Button>
                          </div>

                          {!loadUseWrapper ? (
                            /* 独立模式 Standalone */
                            <div className="w-full py-8 flex items-center justify-center border border-dashed rounded-2xl border-slate-200/50 min-h-[160px] bg-white">
                              <Loading
                                spinning={loadSpinning}
                                type={loadType}
                                size={loadSize}
                                color={loadColor}
                                tip={loadTip}
                                tipPosition={loadTipPosition}
                                backdrop={loadBackdrop}
                              />
                            </div>
                          ) : (
                            /* 容器代理包裹模式 Wrapper */
                            <div className="w-full">
                              <Loading
                                spinning={loadSpinning}
                                type={loadType}
                                size={loadSize}
                                color={loadColor}
                                tip={loadTip}
                                tipPosition={loadTipPosition}
                                backdrop={loadBackdrop}
                              >
                                <Card variant="standard-outline" padding="md" className="shadow-sm">
                                  <CardHeader>
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                      <CardTitle size="md">被高能加载层包裹的原子信息容器</CardTitle>
                                    </div>
                                    <CardDescription>
                                      这里是宿主机物理冷备插口规格信息块，在异步拉取数据时，双重模式会自动阻止误触并覆盖遮罩。
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2 py-1 text-xs text-slate-500 font-mono">
                                      <div className="flex justify-between">
                                        <span>HOST CLUSTER</span>
                                        <span className="font-bold text-slate-700">hk-cloud-node-091a</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>BANDWIDTH</span>
                                        <span className="font-bold text-slate-700">10 Gbps (Fiber)</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>PING LATENCY</span>
                                        <span className="font-bold text-emerald-600">~12.4ms (EXCELLENT)</span>
                                      </div>
                                    </div>
                                  </CardContent>
                                  <CardFooter align="right" className="pt-2">
                                    <Button variant="outline" size="xs">下发指令</Button>
                                    <Button variant="primary" size="xs">同步参数</Button>
                                  </CardFooter>
                                </Card>
                              </Loading>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'alert' && (
                      <div className="w-full flex flex-col items-center animate-fade-in py-10">
                        <div className="w-full max-w-xl px-4 space-y-6">
                          {alertIsVisibleTest ? (
                            <div className="space-y-4">
                              <Alert
                                type={alertType}
                                message={alertMessage}
                                description={alertShowDescription ? alertDescription : undefined}
                                closable={alertClosable}
                                showIcon={alertShowIcon}
                                action={
                                  alertShowAction ? (
                                    <button
                                      className="text-[11px] font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors ml-2"
                                      onClick={() => {
                                        toast.success('已设为不再提示');
                                        setAlertIsVisibleTest(false);
                                      }}
                                    >
                                      不再提示
                                    </button>
                                  ) : undefined
                                }
                                onClose={() => {
                                  toast.info('检测到警告提示条已通过 onClose 发起移除');
                                  setAlertIsVisibleTest(false);
                                }}
                              />
                            </div>
                          ) : (
                            <div className="py-10 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-6 space-y-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                <Info className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-slate-600">通知警告提示条已被手动销毁</h4>
                                <p className="text-[10px] text-slate-400 mt-0.5">回调 onClose 已经捕获释放内存。您可以再次点击下方键位进行唤醒。</p>
                              </div>
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => setAlertIsVisibleTest(true)}
                                className="font-bold text-[10px]"
                              >
                                重新激活警告条 (Revive Alert)
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === 'toast' && (
                      <div className="w-full flex flex-col items-center animate-fade-in py-12">
                        <div className="w-full max-w-sm px-4 text-center space-y-6">
                          <div className="p-6 border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 rounded-3xl shadow-sm space-y-5">
                            <div className="flex flex-col items-center space-y-1">
                              <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300 rounded-full font-mono font-bold text-[9px] tracking-wider uppercase">
                                Feedback Sandbox
                              </span>
                              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200">全局浮型轻提示控制器</h3>
                              <p className="text-[10px] text-slate-400 leading-relaxed">
                                配置左侧侧边栏参数后，在下方直接触发物理发射，享受高斯模糊层叠和渐进淡出等极致微交互。
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                // 动态根据 toastType 映射执行 toast 方法
                                const options = {
                                  description: toastShowDescription ? toastDescription : undefined,
                                  duration: toastDuration,
                                  closable: toastClosable,
                                };

                                switch (toastType) {
                                  case 'success':
                                    toast.success(toastMessage, options);
                                    break;
                                  case 'error':
                                    toast.error(toastMessage, options);
                                    break;
                                  case 'warning':
                                    toast.warning(toastMessage, options);
                                    break;
                                  case 'loading':
                                    toast.loading(toastMessage, options);
                                    break;
                                  case 'info':
                                  default:
                                    toast.show(toastMessage, options);
                                    break;
                                }
                              }}
                              className="w-full relative py-3 px-5 rounded-2xl text-xs font-bold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
                              style={{
                                backgroundColor: tokens.colors.brand,
                              }}
                            >
                              <Sparkles className="w-4 h-4 animate-pulse" />
                              <span>触发【{toastType.toUpperCase()}】广播轻提示</span>
                            </button>

                            {toastType === 'loading' && (
                              <p className="text-[9px] text-amber-500 font-bold -mt-2">
                                💡 提示：LOADING 类型为进程中状态，除非点击叉号或调用 closeAll，否则它不会计时自动隐退。
                              </p>
                            )}

                            <div className="flex gap-2 justify-center pt-2">
                              <Button
                                size="xs"
                                variant="outline"
                                onClick={() => {
                                  toast.closeAll();
                                  toast.info('已清除全部活跃中的 Toast 栈数据');
                                }}
                                className="text-[10px] text-slate-500"
                              >
                                一键销毁全部 Toast
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'tag' && (
                      <div className="w-full flex justify-center items-center py-20 animate-fade-in">
                        {tagIsVisibleTest ? (
                          <Tag
                            type={tagType}
                            variant={tagVariant}
                            size={tagSize}
                            closable={tagClosable}
                            onClose={() => {
                              toast.info('检测到标贴关闭动作已触发 onClose');
                              setTagIsVisibleTest(false);
                            }}
                            icon={tagShowIcon ? <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} /> : undefined}
                          >
                            {tagContent}
                          </Tag>
                        ) : (
                          <div className="text-center animate-fade-in">
                            <span className="text-[11px] text-slate-400 block mb-3 font-mono">
                              // 标贴组件已被逻辑剥离
                            </span>
                            <Button variant="outline" size="sm" onClick={() => setTagIsVisibleTest(true)}>
                              恢复实体与 DOM
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Micro interaction logging lines nested on preview block bottom */}
                {['breadcrumb', 'pagination', 'steps', 'tabs', 'datepicker', 'slider', 'card', 'progress', 'loading', 'alert', 'toast', 'tag'].includes(activeTab) && (
                  <div className="px-6 py-2.5 bg-slate-50/30 border-t border-slate-150 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-bold font-mono">📡 Interaction Logger:</span>
                    <span className="text-indigo-600 font-bold">
                      {activeTab === 'breadcrumb' && breadClickedLog}
                      {activeTab === 'pagination' && `页码 Page ${pagCurrentPage} | 页长 ${pagPageSize} 条 | 共计 ${pagTotalPages} 页`}
                      {activeTab === 'steps' && `流程阶段 [${stepsCurrent + 1}/3] - 当前正在进行: ${stepsCurrent === 0 ? '一要素 OCR 验证身份' : (stepsCurrent === 1 ? (stepsHasError ? '网络清算 [金融异常拦截]' : '银行结算协议清算') : '核心安全防范测评完成')}`}
                      {activeTab === 'tabs' && `活动选项卡 ID: "${tabsActiveId}" | 风格: ${tabsVariant} | 朝向: ${tabsDirection}`}
                      {activeTab === 'datepicker' && `当前选定日期值: ${dpValue ? (dpValue instanceof Date ? dpValue.toLocaleDateString('zh-CN') : dpValue.toString()) : 'null'}`}
                      {activeTab === 'slider' && `当前拖动滑块实时数值: ${sliderValue}`}
                      {activeTab === 'card' && cardClickedLog}
                      {activeTab === 'progress' && `当前进度条实时数值: ${progValue} / ${progMax} (${Math.round((progValue / Math.max(1, progMax)) * 100)}%) | 状态: ${progStatus} | 斑马斜纹: ${progStriped ? '已开启' : '已关闭'}`}
                      {activeTab === 'loading' && `加载呈现状态: ${loadSpinning ? '运行中' : '静止/就绪'} | 类型变体: ${loadType} | 规格: ${loadSize} | 配色: ${loadColor} | 包裹应用: ${loadUseWrapper ? '已开启' : '关闭(独立)'}`}
                      {activeTab === 'alert' && `警告条等级: ${alertType} | 状态大图标: ${alertShowIcon ? '开启' : '隐藏'} | 详细描述: ${alertShowDescription ? '开启' : '关闭'} | 是否可见: ${alertIsVisibleTest ? '常驻显示中' : '已手动 onClose 关闭'}`}
                      {activeTab === 'toast' && `轻提示类型: ${toastType} | 时长: ${toastDuration}ms | 可手动消除: ${toastClosable ? '是' : '否'}`}
                      {activeTab === 'tag' && `标贴等级: ${tagType} | 变体: ${tagVariant} | 尺寸: ${tagSize} | 可视状态: ${tagIsVisibleTest ? '常显活跃' : '已被交互移除'}`}
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
          id="parameter-config-sidebar"
          className="lg:col-span-3 lg:sticky lg:top-4 lg:h-[calc(100vh-112px)] flex flex-col p-5 border rounded-2xl token-font-body token-lh-normal overflow-hidden"
          style={{
            backgroundColor: tokens.colors.bgCard,
            borderColor: tokens.colors.border,
          }}
        >
          {/* Scrollable parameters list container */}
          <div className="flex-1 overflow-y-auto scrollbar-thin pr-1 flex flex-col gap-5">
            <div className="space-y-5 animate-fade-in" style={{ color: tokens.colors.textSecondary }}>
            <div className="border-b pb-2 mb-3" style={{ borderColor: tokens.colors.border }}>
              <span className="text-sm token-font-heading token-weight-bold token-lh-tight block uppercase tracking-wider" style={{ color: tokens.colors.textPrimary }}>
                基本属性 (Base props)
              </span>
            </div>

              {/* BUTTON props fields */}
              {activeTab === 'button' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>按钮变体 (Variant)</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>按钮尺寸 (Size)</label>
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
                      <span className="font-semibold text-xs" style={{ color: tokens.colors.textSecondary }}>禁用状态 (Disabled)</span>
                      <ToggleSwitch
                        checked={btnDisabled}
                        onChange={setBtnDisabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs" style={{ color: tokens.colors.textSecondary }}>缓冲加载 (Is Loading)</span>
                      <ToggleSwitch
                        checked={btnLoading}
                        onChange={setBtnLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 animate-fade-in text-xs font-normal">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>前置/后置图标 placement</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>按钮文案</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>输入尺寸大小</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>标签文案 (Label)</label>
                    <Input
                      value={inputLabel}
                      onChange={(e) => setInputLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>占位文字 (Placeholder)</label>
                    <Input
                      value={inputPlaceholder}
                      onChange={(e) => setInputPlaceholder(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>底部说明文字 (Helper Desc)</label>
                    <Input
                      value={inputDesc}
                      onChange={(e) => setInputDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>错误提示消息 (Error Props)</label>
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
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>前置 Mail 图标</span>
                      <ToggleSwitch
                        checked={inputIconLeft}
                        onChange={setInputIconLeft}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>只读禁用状态</span>
                      <ToggleSwitch
                        checked={inputDisabled}
                        onChange={setInputDisabled}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DROPDOWN SELECT Props controllers */}
              {activeTab === 'dropdown' && (
                <div className="space-y-4">
                  <div className="space-y-1.5 font-sans">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>选择器尺寸大小</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>标签文案 (Label)</label>
                    <Input
                      value={dropLabel}
                      onChange={(e) => setDropLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>底置描述 (Desc)</label>
                    <Input
                      value={dropDesc}
                      onChange={(e) => setDropDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>多选 checkbox 药丸</span>
                      <ToggleSwitch
                        checked={dropMultiple}
                        onChange={handleToggleMultiple}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>词串前向检索</span>
                      <ToggleSwitch
                        checked={dropSearch}
                        onChange={setDropSearch}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>呈现选项子解释</span>
                      <ToggleSwitch
                        checked={dropShowDesc}
                        onChange={setDropShowDesc}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>锁定禁用状态</span>
                      <ToggleSwitch
                        checked={dropDisabled}
                        onChange={setDropDisabled}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>强制警告提示</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>弹窗尺寸级别 (Size)</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>弹窗标题文案</label>
                    <Input
                      value={modalTitle}
                      onChange={(e) => setModalTitle(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>显示底部操作列</span>
                      <ToggleSwitch
                        checked={modalHasFooter}
                        onChange={setModalHasFooter}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="block text-xs font-medium" style={{ color: tokens.colors.textSecondary }}>信息通知提示风格 (i)</span>
                      <ToggleSwitch
                        checked={modalIsAlertStyle}
                        onChange={setModalIsAlertStyle}
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>品牌/标志文案（Logo Brand）</label>
                    <Input
                      value={navBrandName}
                      onChange={(e) => setNavBrandName(e.target.value)}
                      size="sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>动态激活链接选定</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>矢量图徽图标 (name)</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>尺寸计算类型 (Size Type)</label>
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
                      <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>预设梯度选择 (Size)</label>
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
                    <div className="space-y-1.5 animate-fade-in">
                      <div className="flex justify-between font-mono text-xs">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>精准像素大小</label>
                        <span className="font-bold" style={{ color: tokens.colors.brand }}>{iconCustomSize}px</span>
                      </div>
                      <Slider
                        min={16}
                        max={80}
                        value={iconCustomSize}
                        onChange={setIconCustomSize}
                        showTooltip={false}
                        showInput={false}
                        size="sm"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>配色方案 (Variant)</label>
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

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>循环旋转动画</span>
                      <ToggleSwitch
                        checked={iconSpinning}
                        onChange={setIconSpinning}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BREADCRUMB props controllers */}
              {activeTab === 'breadcrumb' && (
                <div className="space-y-4 font-sans text-xs">
                  <div
                    className="space-y-1.5 p-2 rounded-xl border animate-fade-in"
                    style={{
                      backgroundColor: tokens.colors.bgInput,
                      borderColor: tokens.colors.border,
                    }}
                  >
                    <div className="flex justify-between font-mono text-xs">
                      <label className="block text-sm font-medium mb-1.5 mb-1" style={{ color: tokens.colors.textPrimary }}>最长展层限制 (Max Items)</label>
                      <span className="font-bold" style={{ color: tokens.colors.brand }}>{breadMaxItems} 级</span>
                    </div>
                    <Slider
                      min={2}
                      max={5}
                      value={breadMaxItems}
                      onChange={setBreadMaxItems}
                      showTooltip={false}
                      showInput={false}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>间隔符样式 (Separator)</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>分页器形态结构</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>分页器大小</label>
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

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>锁定禁用分页</span>
                      <ToggleSwitch
                        checked={pagDisabled}
                        onChange={setPagDisabled}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>一键快速首尾跳转</span>
                      <ToggleSwitch
                        checked={pagShowFirstLast}
                        onChange={setPagShowFirstLast}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>下拉步长调节</span>
                      <ToggleSwitch
                        checked={pagShowSizeChanger}
                        onChange={setPagShowSizeChanger}
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>整体部署朝向 (Direction)</label>
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
                    <label className="block text-sm font-medium mb-1.5"style={{ color: tokens.colors.textPrimary }}>物理尺寸 (Size)</label>
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

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>使能步骤快点切换</span>
                      <ToggleSwitch
                        checked={stepsClickable}
                        onChange={setStepsClickable}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>反馈副层辅助小描述</span>
                      <ToggleSwitch
                        checked={stepsShowDesc}
                        onChange={setStepsShowDesc}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>插入物理状态小图标</span>
                      <ToggleSwitch
                        checked={stepsHasIcons}
                        onChange={setStepsHasIcons}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textDanger || '#EF4444' }}>模拟清算故障拦截 (error)</span>
                      <ToggleSwitch
                        checked={stepsHasError}
                        onChange={setStepsHasError}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TABS选项卡 props controllers */}
              {activeTab === 'tabs' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>选项卡风格 (Variant)</label>
                    <Dropdown
                      options={[
                        { label: '下划线简洁风 (Line)', value: 'line' },
                        { label: '圆弧气泡胶囊 (Pill)', value: 'pill' },
                        { label: '高质立体卡块 (Card)', value: 'card' },
                      ]}
                      value={tabsVariant}
                      onChange={(val) => setTabsVariant(val as any)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>选项卡尺寸 (Size)</label>
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
                          variant={tabsSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setTabsSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            tabsSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: tabsSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>排布朝向 (Direction)</label>
                    <div
                      className="grid grid-cols-2 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      <Button
                        variant={tabsDirection === 'horizontal' ? 'primary' : 'text'}
                        size="sm"
                        onClick={() => {
                          setTabsDirection('horizontal');
                          setTabsFullWidth(false);
                        }}
                        className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                          tabsDirection === 'horizontal' ? '' : 'hover:text-slate-800'
                        }`}
                        style={{
                          color: tabsDirection === 'horizontal' ? tokens.colors.textInverse : tokens.colors.textSecondary,
                        }}
                      >
                        横向 COMP
                      </Button>
                      <Button
                        variant={tabsDirection === 'vertical' ? 'primary' : 'text'}
                        size="sm"
                        onClick={() => {
                          setTabsDirection('vertical');
                          setTabsFullWidth(true);
                        }}
                        className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                          tabsDirection === 'vertical' ? '' : 'hover:text-slate-800'
                        }`}
                        style={{
                          color: tabsDirection === 'vertical' ? tokens.colors.textInverse : tokens.colors.textSecondary,
                        }}
                      >
                        纵向 PANEL
                      </Button>
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>撑满拉伸 (fullWidth)</span>
                      <ToggleSwitch
                        disabled={tabsDirection === 'vertical'}
                        checked={tabsFullWidth}
                        onChange={setTabsFullWidth}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>显示矢量图标 (withIcon)</span>
                      <ToggleSwitch
                        checked={tabsWithIcon}
                        onChange={setTabsWithIcon}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>右侧数字徽章 (withBadge)</span>
                      <ToggleSwitch
                        checked={tabsWithBadge}
                        onChange={setTabsWithBadge}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>包含禁用条目 (withDisabled)</span>
                      <ToggleSwitch
                        checked={tabsWithDisabled}
                        onChange={setTabsWithDisabled}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* DATEPICKER props controllers */}
              {activeTab === 'datepicker' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>顶置标题 (Label)</label>
                    <Input
                      value={dpLabel}
                      onChange={(e) => setDpLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>占位提示 (Placeholder)</label>
                    <Input
                      value={dpPlaceholder}
                      onChange={(e) => setDpPlaceholder(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>辅助描述 (Description)</label>
                    <Input
                      value={dpDesc}
                      onChange={(e) => setDpDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>选择器高度等级 (Size)</label>
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
                          variant={dpSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setDpSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            dpSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: dpSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>无动作禁用状态 (disabled)</span>
                      <ToggleSwitch
                        checked={dpDisabled}
                        onChange={setDpDisabled}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>错误提示信息 (error)</span>
                      <Input
                        value={dpError}
                        onChange={(e) => setDpError(e.target.value)}
                        placeholder="留空则算校验安全通过..."
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDER props controllers */}
              {activeTab === 'slider' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>顶置标题 (Label)</label>
                    <Input
                      value={sliderLabel}
                      onChange={(e) => setSliderLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>辅助描述 (Description)</label>
                    <Input
                      value={sliderDesc}
                      onChange={(e) => setSliderDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 animate-fade-in">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>最小边界</label>
                      <Input
                        type="number"
                        value={sliderMin}
                        onChange={(e) => setSliderMin(Number(e.target.value))}
                        size="sm"
                        className="text-center font-semibold font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>最大边界</label>
                      <Input
                        type="number"
                        value={sliderMax}
                        onChange={(e) => setSliderMax(Number(e.target.value))}
                        size="sm"
                        className="text-center font-semibold font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>步进细度</label>
                      <Input
                        type="number"
                        value={sliderStep}
                        onChange={(e) => setSliderStep(Number(e.target.value))}
                        size="sm"
                        className="text-center font-semibold font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>吸附规格 (Size)</label>
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
                          variant={sliderSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setSliderSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            sliderSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: sliderSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>精密控制文本框 (showInput)</span>
                      <ToggleSwitch
                        checked={sliderShowInput}
                        onChange={setSliderShowInput}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>瞬时值阻尼提示 (showTooltip)</span>
                      <ToggleSwitch
                        checked={sliderShowTooltip}
                        onChange={setSliderShowTooltip}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>显示分级刻度点 (showMarks)</span>
                      <ToggleSwitch
                        checked={sliderShowMarks}
                        onChange={setSliderShowMarks}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>触点置哑禁用状态 (disabled)</span>
                      <ToggleSwitch
                        checked={sliderDisabled}
                        onChange={setSliderDisabled}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5 pt-1">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>校验拦截文本 (error)</span>
                      <Input
                        value={sliderError}
                        onChange={(e) => setSliderError(e.target.value)}
                        placeholder="留空即为安全通过验证..."
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* CARD props controllers */}
              {activeTab === 'card' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>卡片标题内容 (Card Title)</label>
                    <Input
                      value={cardTitleText}
                      onChange={(e) => setCardTitleText(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>卡片副标题内容 (Card Description)</label>
                    <textarea
                      value={cardDescText}
                      onChange={(e) => setCardDescText(e.target.value)}
                      rows={2}
                      className="w-full text-xs px-2.5 py-1.5 border rounded-lg focus:outline-none transition-all animate-fade-in resize-none"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                        color: tokens.colors.textPrimary,
                        fontFamily: tokens.typography.fontSans || 'inherit',
                        borderRadius: tokens.borders.radiusMd || '8px',
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>美学固化预设变体 (Aesthetic Preset Variant)</label>
                    <Dropdown
                      options={[
                        { label: 'standard-outline 经典物理框线', value: 'standard-outline', description: '主白底 / 精细外边框' },
                        { label: 'subtle-flat 极简色差感底板', value: 'subtle-flat', description: '无硬性边界 / bgTag 淡底色' },
                        { label: 'isometric-elevated 气垫高空层', value: 'isometric-elevated', description: '无阻隔线 / 弥散型 shadow.md 悬游' },
                      ]}
                      value={cardVariant}
                      onChange={(val) => setCardVariant(val as any)}
                      size="sm"
                      showDescription={true}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>呼吸内边距</label>
                      <Dropdown
                        options={[
                          { label: 'sm (8px)', value: 'sm' },
                          { label: 'md (16px)', value: 'md' },
                          { label: 'lg (24px)', value: 'lg' },
                          { label: 'xl (32px)', value: 'xl' },
                        ]}
                        value={cardPadding}
                        onChange={(val) => setCardPadding(val as any)}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>弧度弯角</label>
                      <Dropdown
                        options={[
                          { label: 'none (直角)', value: 'none' },
                          { label: 'sm (微圆)', value: 'sm' },
                          { label: 'md (常规)', value: 'md' },
                          { label: 'lg (大圆)', value: 'lg' },
                          { label: 'xl (大版圆角)', value: 'xl' },
                          { label: 'full (胶囊药丸)', value: 'full' },
                        ]}
                        value={cardRadius}
                        onChange={(val) => setCardRadius(val as any)}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>页脚排列</label>
                      <Dropdown
                        options={[
                          { label: 'left', value: 'left' },
                          { label: 'center', value: 'center' },
                          { label: 'right', value: 'right' },
                          { label: 'between', value: 'between' },
                        ]}
                        value={cardFooterAlign}
                        onChange={(val) => setCardFooterAlign(val as any)}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 animate-fade-in">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>父级宽度规格</label>
                      <Dropdown
                        options={[
                          { label: 'narrow (窄宽 290px)', value: 'narrow' },
                          { label: 'standard (标准 390px)', value: 'standard' },
                          { label: 'wide (宽轨 512px)', value: 'wide' },
                          { label: 'full (撑满流式自适应)', value: 'full' },
                        ]}
                        value={cardWidth}
                        onChange={(val) => setCardWidth(val as any)}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>页眉插槽徽标</label>
                      <Dropdown
                        options={[
                          { label: 'Pulse 脉搏', value: 'Activity' },
                          { label: 'Zap 闪电', value: 'Zap' },
                          { label: 'Terminal 命令行', value: 'Terminal' },
                          { label: 'Star 星标', value: 'Star' },
                          { label: 'None 无徽标图纹', value: 'None' },
                        ]}
                        value={cardIconName}
                        onChange={(val) => setCardIconName(val as any)}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>浮雕微弹悬浮 (hoverable)</span>
                      <ToggleSwitch
                        checked={cardHoverable}
                        onChange={setCardHoverable}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>品牌呼吸外发光 (glow)</span>
                      <ToggleSwitch
                        checked={cardGlow}
                        onChange={setCardGlow}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>启用操作按钮 (showFooter)</span>
                      <ToggleSwitch
                        checked={cardShowButtons}
                        onChange={setCardShowButtons}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>页眉底部附分割线</span>
                      <ToggleSwitch
                        checked={cardHasHeaderBorder}
                        onChange={setCardHasHeaderBorder}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>页脚顶部附分割线</span>
                      <ToggleSwitch
                        checked={cardHasFooterBorder}
                        onChange={setCardHasFooterBorder}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PROGRESS props controllers */}
              {activeTab === 'progress' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>顶置标题 (Label)</label>
                    <Input
                      value={progLabel}
                      onChange={(e) => setProgLabel(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>辅助描述 (Description)</label>
                    <Input
                      value={progDesc}
                      onChange={(e) => setProgDesc(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 animate-fade-in">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>当前进度值 (Value)</label>
                      <Input
                        type="number"
                        value={progValue}
                        onChange={(e) => setProgValue(Number(e.target.value))}
                        size="sm"
                        className="text-center font-semibold font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>最大边界 (Max)</label>
                      <Input
                        type="number"
                        value={progMax}
                        onChange={(e) => setProgMax(Number(e.target.value))}
                        size="sm"
                        className="text-center font-semibold font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 animate-fade-in">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>百分比方位</label>
                      <Dropdown
                        options={[
                          { label: 'Right (右侧并列)', value: 'right' },
                          { label: 'Top (顶部同行)', value: 'top' },
                          { label: 'Inside (内嵌，需LG)', value: 'inside' },
                        ]}
                        value={progInfoPosition}
                        onChange={(val) => setProgInfoPosition(val as any)}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>运行时状态 (Status)</label>
                      <Dropdown
                        options={[
                          { label: 'Default (品牌色)', value: 'default' },
                          { label: 'Success (健康绿)', value: 'success' },
                          { label: 'Warning (警告黄)', value: 'warning' },
                          { label: 'Exception (异常红)', value: 'exception' },
                          { label: 'Active (高动感跑马灯)', value: 'active' },
                        ]}
                        value={progStatus}
                        onChange={(val) => setProgStatus(val as any)}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>吸附规格 (Size)</label>
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
                          variant={progSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setProgSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            progSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: progSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>显示百分比指示器</span>
                      <ToggleSwitch
                        checked={progShowInfo}
                        onChange={setProgShowInfo}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>开启斑马斜纹 (striped)</span>
                      <ToggleSwitch
                        checked={progStriped}
                        onChange={setProgStriped}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>斜纹滚动 (animated)</span>
                      <ToggleSwitch
                        checked={progAnimated}
                        onChange={setProgAnimated}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* LOADING props controllers */}
              {activeTab === 'loading' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>动态加载类型 (Type)</label>
                    <Dropdown
                      options={[
                        { label: 'Spinner (经典安全旋转菊花圆轮)', value: 'spinner', description: '适合局部转圈数据对齐' },
                        { label: 'Dots (三点缩放波浪呼吸反馈)', value: 'dots', description: '多维极简点状节奏态' },
                        { label: 'Pulse (双重立体脉冲涟漪效应)', value: 'pulse', description: '高质感核心宿主机对接态' },
                        { label: 'Bar (顶部无限自适应行进流光条)', value: 'bar', description: '无感度最上层加载' },
                        { label: 'Skeleton (智能占位骨架屏骨架体)', value: 'skeleton', description: '符合内容密度的骨架盒' },
                      ]}
                      value={loadType}
                      onChange={(val) => setLoadType(val as any)}
                      size="sm"
                      showDescription={true}
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>提示文案内容 (Tip Message)</label>
                    <Input
                      value={loadTip}
                      onChange={(e) => setLoadTip(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 animate-fade-in">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>主配色体系 (Color)</label>
                      <Dropdown
                        options={[
                          { label: 'Default (中性深灰)', value: 'default' },
                          { label: 'Brand (品牌高能蓝/紫)', value: 'brand' },
                          { label: 'Success (生态健康绿)', value: 'success' },
                          { label: 'Warning (安全警告黄)', value: 'warning' },
                          { label: 'Error (阻塞异常红)', value: 'error' },
                        ]}
                        value={loadColor}
                        onChange={(val) => setLoadColor(val as any)}
                        size="sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-medium" style={{ color: tokens.colors.textSecondary }}>文案排布方位</label>
                      <Dropdown
                        options={[
                          { label: 'Bottom (位于底置下方)', value: 'bottom' },
                          { label: 'Right (位于右侧同行布局)', value: 'right' },
                        ]}
                        value={loadTipPosition}
                        onChange={(val) => setLoadTipPosition(val as any)}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>组件规格梯度 (Size)</label>
                    <div
                      className="grid grid-cols-4 gap-1 p-1 rounded-xl border text-center select-none font-bold"
                      style={{
                        backgroundColor: tokens.colors.bgInput,
                        borderColor: tokens.colors.border,
                      }}
                    >
                      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
                        <Button
                          key={s}
                          variant={loadSize === s ? 'primary' : 'text'}
                          size="sm"
                          onClick={() => setLoadSize(s)}
                          className={`py-0.8 text-[9px] font-black h-7 rounded-lg ${
                            loadSize === s ? '' : 'hover:text-slate-800'
                          }`}
                          style={{
                            color: loadSize === s ? tokens.colors.textInverse : tokens.colors.textSecondary,
                          }}
                        >
                          {s.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>包裹渲染容器模式</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">加载器可作为遮罩包裹并锁定其子组件</span>
                      </div>
                      <ToggleSwitch
                        checked={loadUseWrapper}
                        onChange={setLoadUseWrapper}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>毛玻璃阻断遮罩 (backdrop)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">磨砂质感防透射，仅在包裹模式生效</span>
                      </div>
                      <ToggleSwitch
                        checked={loadBackdrop}
                        onChange={setLoadBackdrop}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ALERT props controllers */}
              {activeTab === 'alert' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>警告条语义类型 (Type)</label>
                    <Dropdown
                      options={[
                        { label: 'Info (信息广播中性灰/深蓝)', value: 'info', description: '提供核心日常维护和基础心跳通告说明' },
                        { label: 'Success (执行成功生态健康绿)', value: 'success', description: '标记指令正确解析及系统恢复健康层' },
                        { label: 'Warning (安全合规关注警惕黄)', value: 'warning', description: '通告当前网关或物理盘位潜在的高负荷威胁' },
                        { label: 'Error (阻塞异常高位拦截红)', value: 'error', description: '提示致命错误、未授权认证等急需排查的事件' },
                      ]}
                      value={alertType}
                      onChange={(val) => setAlertType(val as any)}
                      size="sm"
                      showDescription={true}
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>主提示标题 (Message)</label>
                    <Input
                      value={alertMessage}
                      onChange={(e) => setAlertMessage(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-3 border-t space-y-4 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>显示详细描述 (showDescription)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">大多数情况下主标题即可，开启可输入详细解释</span>
                      </div>
                      <ToggleSwitch
                        checked={alertShowDescription}
                        onChange={setAlertShowDescription}
                      />
                    </div>
                    
                    {alertShowDescription && (
                      <div className="space-y-1.5 animate-fade-in pl-2 border-l-2" style={{ borderColor: tokens.colors.brand }}>
                        <textarea
                          value={alertDescription}
                          onChange={(e) => setAlertDescription(e.target.value)}
                          className="w-full text-xs p-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed transition-all"
                          style={{
                            backgroundColor: tokens.colors.bgInput,
                            borderColor: tokens.colors.border,
                            color: tokens.colors.textPrimary,
                          }}
                          rows={3}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t space-y-3 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>显示左侧大图标 (showIcon)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">提供能够快速传达级别的对称状态大矢量图标</span>
                      </div>
                      <ToggleSwitch
                        checked={alertShowIcon}
                        onChange={setAlertShowIcon}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>允许手动叉号关闭 (closable)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">允许在最右侧显示关闭键以触发回呼和收折动画</span>
                      </div>
                      <ToggleSwitch
                        checked={alertClosable}
                        onChange={setAlertClosable}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>支持自定义微交互扩展操作 (action)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">例如额外增加“不再提示”、“去处理”等引导操作</span>
                      </div>
                      <ToggleSwitch
                        checked={alertShowAction}
                        onChange={setAlertShowAction}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TOAST props controllers */}
              {activeTab === 'toast' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>提示发射反馈类型 (Type)</label>
                    <Dropdown
                      options={[
                        { label: 'Success (全绿经典成功通知)', value: 'success', description: '标记指令同步/校验成功' },
                        { label: 'Error (阻塞猩红异常示警)', value: 'error', description: '标记网关连接故障、高危阻断' },
                        { label: 'Warning (特别关注暗黄提防)', value: 'warning', description: '标记存储或流量水位高荷预警戒' },
                        { label: 'Info (经典商务中性通知)', value: 'info', description: '传达不阻断流常态的心跳状态或通告' },
                        { label: 'Loading (进程中常挂态)', value: 'loading', description: '展示旋转圆轮表现进程繁忙状态' },
                      ]}
                      value={toastType}
                      onChange={(val) => setToastType(val as any)}
                      size="sm"
                      showDescription={true}
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>轻提示标题 (Message)</label>
                    <Input
                      value={toastMessage}
                      onChange={(e) => setToastMessage(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-medium" style={{ color: tokens.colors.textPrimary }}>轻提示说明文案 (Description)</label>
                      <ToggleSwitch checked={toastShowDescription} onChange={setToastShowDescription} />
                    </div>
                    {toastShowDescription && (
                      <Input
                        value={toastDescription}
                        onChange={(e) => setToastDescription(e.target.value)}
                        size="sm"
                      />
                    )}
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>延迟自销毁时长 (Duration)</label>
                    <Dropdown
                      options={[
                        { label: '1.5秒 | 特快微交互反馈', value: '1500' },
                        { label: '3.0秒 | 标准默认可读长款 (推荐)', value: '3000' },
                        { label: '5.0秒 | 详尽说明长停留状态', value: '5000' },
                        { label: '永不自动隐退 (0) | 必须手动叉碎', value: '0' },
                      ]}
                      value={toastDuration.toString()}
                      onChange={(val) => setToastDuration(Number(val))}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>支持手动提前叉灭 (closable)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">右上角渲染精细微叉号，允许立刻销毁</span>
                      </div>
                      <ToggleSwitch
                        checked={toastClosable}
                        onChange={setToastClosable}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAG props controllers */}
              {activeTab === 'tag' && (
                <div className="space-y-4 font-sans text-xs animate-fade-in">
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>色彩基调语义 (Color Semantic)</label>
                    <Dropdown
                      options={[
                        { label: 'Primary (优先核心行动态)', value: 'primary', description: '运用品牌主基色' },
                        { label: 'Success (绿意畅通态)', value: 'success', description: '用于正向、审核通过等反馈' },
                        { label: 'Warning (橙色预警态)', value: 'warning', description: '用于容量上限防备或告警' },
                        { label: 'Error (红区危机态)', value: 'error', description: '高危致命错误、封禁或失败' },
                        { label: 'Default (次级空阶默认)', value: 'default', description: '中性色彩，不引入额外情绪' },
                      ]}
                      value={tagType}
                      onChange={(val) => setTagType(val as any)}
                      size="sm"
                      showDescription={true}
                    />
                  </div>
                  
                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>变体样式设计 (Variant Silhouette)</label>
                    <Dropdown
                      options={[
                        { label: 'Soft (微量轻薄基底)', value: 'soft', description: '适用于大批量密集阵列呈现' },
                        { label: 'Solid (实心醒目体)', value: 'solid', description: '具有最高优先级视觉引导力' },
                        { label: 'Outline (边框外发光)', value: 'outline', description: '中等感官强度，保留干净空气感' },
                        { label: 'Dot (前置圆盾点阵)', value: 'dot', description: '像指示灯一般纯净聚焦' },
                      ]}
                      value={tagVariant}
                      onChange={(val) => setTagVariant(val as any)}
                      size="sm"
                      showDescription={true}
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>视觉缩放比例 (Size Array)</label>
                    <Dropdown
                      options={[
                        { label: 'SM - 高密极致收缩版 (适用于表格列)', value: 'sm' },
                        { label: 'MD - 设计系推荐基准', value: 'md' },
                        { label: 'LG - 宽敞醒目陈述级', value: 'lg' },
                      ]}
                      value={tagSize}
                      onChange={(val) => setTagSize(val as any)}
                      size="sm"
                    />
                  </div>

                  <div className="space-y-1.5 animate-fade-in">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: tokens.colors.textPrimary }}>内置核心字符文本 (Content)</label>
                    <Input
                      value={tagContent}
                      onChange={(e) => setTagContent(e.target.value)}
                      size="sm"
                    />
                  </div>

                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>支持删除销毁动作 (Closable)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">挂载微小交叉叉号，提供 onClose 回调</span>
                      </div>
                      <ToggleSwitch
                        checked={tagClosable}
                        onChange={setTagClosable}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t space-y-2 animate-fade-in" style={{ borderColor: tokens.colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold block font-bold text-xs" style={{ color: tokens.colors.textSecondary }}>展示附随微标 (Status Icon)</span>
                        <span className="text-[10px] text-slate-400 block -mt-0.5">左侧挂载相关指示矢量矢量图标</span>
                      </div>
                      <ToggleSwitch
                        checked={tagShowIcon}
                        onChange={setTagShowIcon}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          <div className="border-t my-1" style={{ borderColor: tokens.colors.border }} />
          
          {/* Style parameters category */}
          <div className="space-y-3 select-none">
            <div className="border-b pb-2" style={{ borderColor: tokens.colors.border }}>
              <span className="text-sm token-font-heading token-weight-bold token-lh-tight block uppercase tracking-wider" style={{ color: tokens.colors.textPrimary }}>
                样式与对齐规格 (Style Specs)
              </span>
            </div>
            <div className="space-y-2.5" style={{ color: tokens.colors.textSecondary }}>
              <div className="flex justify-between items-center text-xs">
                <span className="token-weight-normal">品牌主题:</span>
                <span className="token-weight-medium" style={{ color: tokens.colors.textPrimary }}>{tokens.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="token-weight-normal">圆角半径:</span>
                <span className="token-weight-medium" style={{ color: tokens.colors.textPrimary }}>{tokens.borders.radiusMd}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="token-weight-normal">缓冲曲线:</span>
                <span className="token-weight-medium font-mono" style={{ color: tokens.colors.textPrimary }}>{tokens.behaviors.motionCurve}</span>
              </div>
            </div>
          </div>

          </div> {/* End of scrollable parameters list container */}

          <div className="border-t my-3 pt-2 shrink-0" style={{ borderColor: tokens.colors.border }} />

          {/* Form Actions footer */}
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={handleResetDefaults}
              className="cursor-pointer py-2.5 border rounded-xl text-xs token-weight-medium token-lh-normal flex items-center justify-center gap-1.5 transition-all"
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
              className="cursor-pointer py-2.5 border rounded-xl text-xs token-weight-medium token-lh-normal flex items-center justify-center gap-1.5 transition-all text-white"
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
