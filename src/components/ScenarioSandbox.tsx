/**
 * ==========================================
 * 文件名称: /src/components/ScenarioSandbox.tsx
 * 功能描述: AI-Native 声明式运行时游乐场 + 核心组件契约列表 MVP ( Layer 4 & Layer 5 概念实证 )
 * 目标受众: 产品经理 (PM)、设计/体验专家 (UE/UI) 以及非技术主管。
 * 
 * 💡 这是什么？
 * 本模块深度实践了您分享的【AI 可理解的设计系统协议：五层结构】！它包含两个核心区：
 * 
 * 1. 📂 第一板块：【传统业务场景模拟】
 *    在一个干净、符合 12 列栅格的版面中呈现“云容器初始化”表单，串联 Button, Input, Dropdown, Modal。
 *    证明在我们系统下，不添加任何一行废代码，即时保证多端调性。
 * 
 * 2. 🚀 第二板块：【AI Native 声明式运行时 (Playground) + 组件契约手册】
 *    - 【AI 契约手册 Component Registry】：明文列出五个原语组件的 props、限定值与行为边界。
 *    - 【自然语言编译区 Prompt-to-Schema】：模拟 AI 怎么工作。AI 收到大白话 prompt，
 *      【不直接输出 React 代码或 CSS】（因为这会造成样式和交互漂移），而是仅仅输出
 *      一个【受约的 JSON Schema 协议】！
 *    - 【运行时解释器 Runtime Renderer】：我们的 Runtime 动态加载该 JSON Schema 文本，
 *      自动实例化渲染出高还原、绝对一致的 Button/Input/Dropdown，甚至在切换主题时，动效也百分之百顺从一致！
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from './base/DesignTokensContext';
import { Button } from './atoms/Button';
import { Input } from './atoms/Input';
import { Dropdown } from './atoms/Dropdown';
import { Modal } from './atoms/Modal';
import { Breadcrumb } from './atoms/Breadcrumb';
import { DatePicker } from './atoms/DatePicker';
import { Slider } from './atoms/Slider';
import { Progress } from './atoms/Progress';
import { Loading } from './atoms/Loading';
import { Home } from 'lucide-react';
import {
  Server,
  Terminal,
  Cpu,
  ArrowRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Settings2,
  Code2,
  FileJson,
  BookOpen,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const ScenarioSandbox: React.FC = () => {
  const { tokens } = useDesignTokens();

  // ----------------------------------------------------
  // 📂 模块 A: 传统业务表单场景
  // ----------------------------------------------------
  const [hostName, setHostName] = useState('nexus-cluster-node-01');
  const [subnet, setSubnet] = useState('asia-east1-a');
  const [instanceSize, setInstanceSize] = useState('std-2c4g');
  const [accessKey, setAccessKey] = useState('');
  const [hostError, setHostError] = useState('');
  const [accessError, setAccessError] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [retirementDate, setRetirementDate] = useState<Date | string | null>('2026-06-15');
  const [cpuLimit, setCpuLimit] = useState<number>(4);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deployStep, setDeployStep] = useState(0);

  const regionOptions = [
    { label: '华东 1 (杭州) - 可用区 A', value: 'cn-hangzhou-a', description: '国内专属全自建机房，网络时延超低' },
    { label: '亚太东部 (新加坡) - 可用区 A', value: 'asia-east1-a', description: '国际高带宽出口，适合出海全球用户' },
    { label: '美国西部 (硅谷) - 可用区 B', value: 'us-west-2', description: '外贸核心专区，高性能云磁盘容灾' },
  ];

  const sizeOptions = [
    { label: '微型规格 (1核 CPU / 1GB 内存)', value: 'micro-1c1g', description: '适合开发调试与基本运维测试' },
    { label: '标准规格 (2核 CPU / 4GB 内存)', value: 'std-2c4g', description: '负载性能极佳，最经典的线上选择' },
    { label: '高规性能 (4核 CPU / 16GB 内存)', value: 'perf-4c16g', description: '大数据运算或高负载并发运算支撑' },
  ];

  const handleResetForm = () => {
    setHostName('nexus-cluster-node-01');
    setSubnet('asia-east1-a');
    setInstanceSize('std-2c4g');
    setAccessKey('');
    setRetirementDate('2026-06-15');
    setCpuLimit(4);
    setHostError('');
    setAccessError('');
  };

  const validateForm = () => {
    let isValid = true;
    if (!hostName.trim()) {
      setHostError('主机名称不能为空');
      isValid = false;
    } else if (!/^[a-z0-9-]+$/.test(hostName)) {
      setHostError('主机名称仅能使用小写字母、数字与横线"-"');
      isValid = false;
    } else {
      setHostError('');
    }

    if (!accessKey.trim()) {
      setAccessError('授权 Root Key 不能为空');
      isValid = false;
    } else if (accessKey.length < 8) {
      setAccessError('密码长度不能少于 8 位字符');
      isValid = false;
    } else {
      setAccessError('');
    }

    return isValid;
  };

  const handleOpenConfirm = () => {
    if (validateForm()) {
      setIsConfirmOpen(true);
    }
  };

  const handleStartDeploy = () => {
    setIsConfirmOpen(false);
    setIsDeploying(true);
    setDeployStep(1);

    setTimeout(() => {
      setDeployStep(2);
    }, 1500);

    setTimeout(() => {
      setDeployStep(3);
    }, 3000);

    setTimeout(() => {
      setIsDeploying(false);
      setDeployStep(0);
      alert(`🎉 部署成功！容器已拉起，成功适配并继承 ${tokens.name} 设计规范！`);
    }, 4200);
  };

  // ----------------------------------------------------
  // 🚀 模块 B: AI 声明式运行时 (Playground)
  // ----------------------------------------------------
  // 我们预置 3 个不同的 AI 编排指令场景，向 PM 证明 AI 不会弄乱样式！
  const AI_SAMPLE_PROMPTS = {
    auth: {
      title: '生成简洁的用户登录面板 [AuthForm]',
      prompt: '“帮我生成一个最经典的用户注册/登录控制卡片。需要包含姓名输入框、电子邮箱输入框，以及一个主操作按钮用来点击提交。”',
      schema: {
        type: 'FormCard',
        title: '控制台用户登录',
        description: '请填写下方卡片信息进入云控制中心，节点安全认证已自动生效。',
        children: [
          {
            element: 'Input',
            props: {
              label: '注册姓名 (Full Name)',
              description: '请填入您的真实身份中文或拼音姓名',
              placeholder: '例如: 张小鸣',
              size: 'md',
              required: true
            }
          },
          {
            element: 'Input',
            props: {
              label: '企业邮箱 (Enterprise Email)',
              description: '用于收发系统异常报告，该邮箱不会公开',
              placeholder: 'name@company.com',
              size: 'md',
              required: true
            }
          },
          {
            element: 'DatePicker',
            props: {
              label: '计划启动执行日期 (Schedule Launch Date)',
              description: '可指定一个未来的物理时间供 K8s 执行冷启动调度',
              placeholder: '请点选未来调度日期...',
              size: 'md'
            }
          },
          {
            element: 'Progress',
            props: {
              label: '节点安全合规度校验 (Security Compliance Metric)',
              description: '系统正在实时执行 TLS 1.3 身份加密防泄露握手协议，当前安全度计算中...',
              value: 85,
              max: 100,
              size: 'md',
              status: 'active',
              striped: true,
              animated: true
            }
          },
          {
            element: 'Loading',
            props: {
              spinning: true,
              type: 'dots',
              size: 'sm',
              color: 'brand',
              tip: '密码机节点正安全连接中...',
              tipPosition: 'right'
            }
          },
          {
            element: 'Button',
            props: {
              variant: 'primary',
              size: 'md',
              children: '立即注册并获取授权'
            }
          }
        ]
      }
    },
    risk: {
      title: '生成带有高危警告策略并防误触的模态弹窗 [SafeModal]',
      prompt: '“帮我建立一个确认抹除服务器硬盘数据的高危弹框。包含确认销毁、取消。注意：既然是毁灭性动作，点击黑色遮罩不允许随意闪退，必须由点击按钮才可退出。”',
      schema: {
        type: 'RiskAlert',
        title: '警告：硬盘存储数据安全抹除！',
        description: '此动作属于系统级毁灭动作。执行后您部署的 Nexus-01 节点下的所有文件块将被物理擦除且不可找回。',
        dismissOverlay: false, // ⚠️ 行为令牌：锁定遮罩防退！ 
        buttons: [
          {
            element: 'Button',
            props: {
              variant: 'outline',
              size: 'sm',
              children: '我点错了，暂不销毁'
            },
            action: 'close'
          },
          {
            element: 'Button',
            props: {
              variant: 'danger',
              size: 'sm',
              children: '我了解后果，确认抹除'
            },
            action: 'danger_exec'
          }
        ]
      }
    },
    filter: {
      title: '生成高级多条件筛选器面板 [FilterPanel]',
      prompt: '“设计一个在云仪表盘主内容区上方的多维筛选工具栏。包含选择可用区下拉筛选、实例规格套餐下拉、以及重置和检索按钮。”',
      schema: {
        type: 'FilterLayout',
        title: '多维集群高级过滤工具栏',
        children: [
          {
            element: 'Dropdown',
            props: {
              label: '按隔离子网区过滤',
              value: 'asia-east1-a',
              size: 'sm',
              options: [
                { label: '亚太1区 (新加坡)', value: 'asia-east1-a' },
                { label: '华东1区 (杭州)', value: 'cn-hangzhou-a' }
              ]
            }
          },
          {
            element: 'Dropdown',
            props: {
              label: '按物理配置套餐过滤',
              value: 'std-2c4g',
              size: 'sm',
              options: [
                { label: '微型 (1核1G)', value: 'micro-1c1g' },
                { label: '标准推荐 (2核4G)', value: 'std-2c4g' }
              ]
            }
          },
          {
            element: 'Button',
            props: {
              variant: 'secondary',
              size: 'sm',
              children: '快速重置重设'
            },
            action: 'reset_filters'
          },
          {
            element: 'Button',
            props: {
              variant: 'primary',
              size: 'sm',
              children: '立即检索筛选'
            },
            action: 'filter_exec'
          }
        ]
      }
    },
    navTree: {
      title: '生成智能超长路径折叠面包屑 [NavPath]',
      prompt: '“生成一个展示虚拟机性能大盘深层路径的面包屑导航条。最深到监控详情页。限制最大可见为3个节点，首尾各保留一个，以防多行拥挤。”',
      schema: {
        type: 'NavigationPath',
        title: '云监控多层物理路径导航 (Breadcrumb)',
        children: [
          {
            element: 'Breadcrumb',
            props: {
              items: [
                { label: '系统根节点', href: '#/' },
                { label: '北京群集可用单元', href: '#/clusters' },
                { label: '二区分散拓扑网络', href: '#/topology' },
                { label: '高频性能指标实时大盘监控' }
              ],
              maxItems: 3,
              itemsBeforeCollapse: 1,
              itemsAfterCollapse: 1
            }
          }
        ]
      }
    }
  };

  // 选择哪一个 AI 模拟模板
  const [activeAITemplate, setActiveAITemplate] = useState<'auth' | 'risk' | 'filter' | 'navTree'>('auth');
  const currentAIPayload = AI_SAMPLE_PROMPTS[activeAITemplate];
  
  // 内存中可直接被 PM 编辑的 JSON 协议字符串
  const [editableSchemaStr, setEditableSchemaStr] = useState(
    JSON.stringify(AI_SAMPLE_PROMPTS.auth.schema, null, 2)
  );
  const [jsonError, setJsonError] = useState('');

  // 模拟弹窗开闭状态 (当 AI 运行时生成 Modal 时测试)
  const [runTimeModalOpen, setRunTimeModalOpen] = useState(false);

  // 当用户点击切换左侧 AI 快捷指令时，动态填充文本
  const handleSelectAITemplate = (id: 'auth' | 'risk' | 'filter' | 'navTree') => {
    setActiveAITemplate(id);
    setEditableSchemaStr(JSON.stringify(AI_SAMPLE_PROMPTS[id].schema, null, 2));
    setJsonError('');
    setRunTimeModalOpen(false);
  };

  // 解析并尝试重新编译渲染 JSON Schema
  const handleJSONChange = (val: string) => {
    setEditableSchemaStr(val);
    try {
      JSON.parse(val);
      setJsonError('');
    } catch (e: any) {
      setJsonError(`JSON 格式不合规: ${e.message}`);
    }
  };

  // 沙盒内置的三个大栏目切换 (Form, AI Playground, Component Manual)
  const [sandboxMainTab, setSandboxMainTab] = useState<'form' | 'ai_runtime' | 'contract'>('ai_runtime');

  // ----------------------------------------------------
  // ⚡ 核心实现：Layer 5 AI Declarative Runtime 运行时解析引擎！
  // 它接收受约束的 JSON 协议，解释并瞬间渲染真实的、受设计令牌百分百支配的 React 控件！
  // ----------------------------------------------------
  const renderSchemaToUI = () => {
    if (jsonError) {
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-xs flex gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <strong>编译拦截提示：</strong> 
            当前 JSON Schema 校验未通过，解析引擎原地挂起以保护系统安全。
            <p className="mt-1 font-mono text-[10px] bg-red-150 p-1.5 rounded">{jsonError}</p>
          </div>
        </div>
      );
    }

    try {
      const schemaObj = JSON.parse(editableSchemaStr);

      // 💥 模式一：AI 组装的用户登录/注册面板
      if (schemaObj.type === 'FormCard') {
        return (
          <div 
            className="p-6 border transition-all"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
            }}
          >
            <div className="mb-4">
              <h4 className="text-md font-bold token-font-heading" style={{ color: tokens.colors.textPrimary }}>
                {schemaObj.title || '无标题表单'}
              </h4>
              <p className="text-xs mt-1" style={{ color: tokens.colors.textMuted }}>
                {schemaObj.description}
              </p>
            </div>

            <div className="space-y-4">
              {schemaObj.children?.map((child: any, idx: number) => {
                if (child.element === 'Input') {
                  return (
                    <Input 
                      key={`ai-input-${idx}`}
                      label={child.props?.label}
                      placeholder={child.props?.placeholder}
                      description={child.props?.description}
                      size={child.props?.size}
                    />
                  );
                }
                if (child.element === 'DatePicker') {
                  return (
                    <DatePicker 
                      key={`ai-dp-${idx}`}
                      label={child.props?.label}
                      placeholder={child.props?.placeholder}
                      description={child.props?.description}
                      size={child.props?.size}
                      value={child.props?.value}
                      onChange={(date, dateString) => console.log(`🎉 运行时日期变更为: ${dateString}`)}
                    />
                  );
                }
                if (child.element === 'Slider') {
                  return (
                    <Slider
                      key={`ai-slider-${idx}`}
                      label={child.props?.label}
                      description={child.props?.description}
                      size={child.props?.size || 'md'}
                      min={child.props?.min !== undefined ? Number(child.props?.min) : 0}
                      max={child.props?.max !== undefined ? Number(child.props?.max) : 100}
                      step={child.props?.step !== undefined ? Number(child.props?.step) : 1}
                      showInput={child.props?.showInput}
                      showTooltip={child.props?.showTooltip}
                      value={child.props?.value !== undefined ? Number(child.props?.value) : 50}
                      onChange={(val) => console.log(`🎉 运行时滑块值变更为: ${val}`)}
                    />
                  );
                }
                if (child.element === 'Progress') {
                  return (
                    <Progress
                      key={`ai-progress-${idx}`}
                      label={child.props?.label}
                      description={child.props?.description}
                      value={child.props?.value !== undefined ? Number(child.props?.value) : 60}
                      max={child.props?.max !== undefined ? Number(child.props?.max) : 100}
                      size={child.props?.size || 'md'}
                      status={child.props?.status || 'default'}
                      showInfo={child.props?.showInfo !== false}
                      infoPosition={child.props?.infoPosition || 'right'}
                      striped={child.props?.striped}
                      animated={child.props?.animated}
                    />
                  );
                }
                if (child.element === 'Loading') {
                  return (
                    <Loading
                      key={`ai-loading-${idx}`}
                      spinning={child.props?.spinning !== false}
                      type={child.props?.type || 'spinner'}
                      size={child.props?.size || 'md'}
                      color={child.props?.color || 'default'}
                      tip={child.props?.tip}
                      tipPosition={child.props?.tipPosition || 'bottom'}
                      backdrop={child.props?.backdrop}
                    />
                  );
                }
                if (child.element === 'Button') {
                  return (
                    <Button 
                      key={`ai-btn-${idx}`}
                      variant={child.props?.variant}
                      size={child.props?.size}
                      className="w-full mt-2"
                      onClick={() => alert('🎉 运行时点击响应：AI 控制的提交按钮被安全触发！符合全部微动效契约！')}
                    >
                      {child.props?.children}
                    </Button>
                  );
                }
                return null;
              })}
            </div>
            
            <div className="mt-4 pt-3 border-t border-dashed text-[10px] flex items-center justify-between text-slate-400" style={{ borderColor: tokens.colors.border }}>
              <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-indigo-500" /> Layer 5 解释器安全渲染</span>
              <span className="font-mono text-slate-300">CRC-785A</span>
            </div>
          </div>
        );
      }

      // 💥 模式二：AI 组装的高危拦截框说明
      if (schemaObj.type === 'RiskAlert') {
        const dismissOverlayValue = schemaObj.dismissOverlay !== undefined ? schemaObj.dismissOverlay : true;
        return (
          <div className="p-4 text-center border rounded-xl bg-slate-50/40" style={{ borderColor: tokens.colors.border }}>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              因模态窗口会造成全屏遮盖，请点击下方测试按钮，
              系统一键将其送入 Atomic 弹窗并观察拦截表现。
            </p>
            
            <Button 
              variant="danger" 
              size="md" 
              onClick={() => {
                // 读取当前 JSON Schema 里的安全行为锁
                // 将当前设计系统里的 behaviors.modalDismissOverlay 在内存中短暂重设为 schema 的安全拦截设定！
                // 这完美向 PM 演示了 AI 如何通过 Schema 特异性绑定和调整行为细节！
                tokens.behaviors.modalDismissOverlay = dismissOverlayValue;
                setRunTimeModalOpen(true);
              }}
              iconRight={<Play className="w-4 h-4 ml-1" />}
            >
              模拟呼出 AI 生成的 Risk 弹窗
            </Button>

            <p className="text-[10px] text-indigo-600 mt-2 font-medium leading-relaxed">
              💡 注：Schema 内 <code>dismissOverlay: {dismissOverlayValue.toString()}</code> 已动态装载。
              {dismissOverlayValue === false ? '点击灰色背景是【绝不退出的】，强迫双重确认安全！' : '允许点击遮罩层快速退出。'}
            </p>

            {/* 动态在运行时里面拉起模态实例 */}
            <Modal
              isOpen={runTimeModalOpen}
              onClose={() => setRunTimeModalOpen(false)}
              title={schemaObj.title}
              footer={
                <div className="flex gap-2 justify-end">
                  {schemaObj.buttons?.map((btn: any, idx: number) => (
                    <Button 
                      key={`ai-modal-btn-${idx}`}
                      variant={btn.props?.variant || 'outline'}
                      size="sm"
                      onClick={() => {
                        setRunTimeModalOpen(false);
                        if (btn.action !== 'close') {
                          alert(`🔥 触犯核心指令: "${btn.action}"！已被系统日志审计捕获并执行。`);
                        }
                      }}
                    >
                      {btn.props?.children}
                    </Button>
                  ))}
                </div>
              }
            >
              <div className="space-y-3">
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  {schemaObj.description}
                </p>
                <div className="p-3 bg-red-50 border border-red-150 rounded text-xs text-red-700 flex gap-1.5 items-start">
                  <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <strong>高危级别防御指示：</strong>
                    此操作通过 AI Schema 运行时组装并映射。当前弹框圆角 (<code>{tokens.borders.radiusLg}</code>) 完美自适应当前设计调性。
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        );
      }

      // 💥 模式三：AI 组装的高级检索筛选栏
      if (schemaObj.type === 'FilterLayout') {
        return (
          <div 
            className="p-5 border transition-all"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusMd,
              borderColor: tokens.colors.border,
            }}
          >
            <div className="mb-3">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Settings2 className="w-4 h-4 text-slate-400" />
                {schemaObj.title || '检索过滤器'}
              </h5>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemaObj.children?.filter((c: any) => c.element === 'Dropdown').map((child: any, idx: number) => (
                <Dropdown 
                  key={`ai-drop-${idx}`}
                  label={child.props?.label}
                  value={child.props?.value}
                  options={child.props?.options || []}
                  onChange={(val) => {
                    alert(`过滤更新参数值: ${val}`);
                  }}
                  size="sm"
                />
              ))}
            </div>

            <div className="flex justify-end gap-2.5 mt-4 pt-3 border-t border-slate-100" style={{ borderColor: tokens.colors.border }}>
              {schemaObj.children?.filter((c: any) => c.element === 'Button').map((child: any, idx: number) => (
                <Button 
                  key={`ai-drop-btn-${idx}`}
                  variant={child.props?.variant}
                  size="sm"
                  onClick={() => alert(`按钮事件联动: 执行行动 "${child.action}"`)}
                >
                  {child.props?.children}
                </Button>
              ))}
            </div>
          </div>
        );
      }

      // 💥 模式四：AI 组装的面包屑多层路径导航
      if (schemaObj.type === 'NavigationPath') {
        return (
          <div 
            className="p-5 border transition-all"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
            }}
          >
            <div className="mb-3.5 pb-2.5 border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
              <h5 className="text-xs font-bold tracking-wider flex items-center gap-1" style={{ color: tokens.colors.textSecondary }}>
                <Server className="w-4 h-4 text-indigo-500 shrink-0" />
                {schemaObj.title || '层级路径导航'}
              </h5>
            </div>
            
            <div className="py-2.5 px-3 rounded" style={{ backgroundColor: tokens.colors.bgPage }}>
              {schemaObj.children?.filter((c: any) => c.element === 'Breadcrumb').map((child: any, idx: number) => (
                <Breadcrumb
                  key={`ai-breadcrumb-${idx}`}
                  items={
                    child.props?.items?.map((item: any, i: number) => {
                      // 给首个项挂一个 Home 图标，体验更加真实
                      if (i === 0) {
                        return { ...item, icon: <Home size={14} /> };
                      }
                      return item;
                    }) || []
                  }
                  maxItems={child.props?.maxItems}
                  itemsBeforeCollapse={child.props?.itemsBeforeCollapse}
                  itemsAfterCollapse={child.props?.itemsAfterCollapse}
                  onItemClick={(item) => {
                    alert(`🚀 [Breadcrumb Runtime Click] 点击了契约节点: "${item.label}"`);
                  }}
                />
              ))}
            </div>
          </div>
        );
      }

      // 备份防空
      return <div className="text-xs text-slate-400">未知 Schema 结构变种</div>;

    } catch (e: any) {
      return (
        <div className="p-4 bg-orange-50 text-orange-850 rounded-lg border border-orange-200 text-xs">
          <strong>解释器崩溃报告：</strong> JSON 解析出了语法深度问题，无法映射为受约 React 树。
          <p className="mt-1 font-mono text-[10px]">{e.message}</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-6" id="scenario-sandbox-root">
      
      {/* 🧭 A. 三板块高亮切换页头 */}
      <div className="flex justify-between items-center border-b border-slate-150 pb-1 flex-wrap gap-3">
        <div className="flex gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSandboxMainTab('ai_runtime')}
            className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              sandboxMainTab === 'ai_runtime'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            AI Schema 运行时 Playground (五层架构实证)
          </button>
          
          <button
            onClick={() => setSandboxMainTab('form')}
            className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              sandboxMainTab === 'form'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4" />
            传统页面场景拼装 (计算节点初始化)
          </button>

          <button
            onClick={() => setSandboxMainTab('contract')}
            className={`py-2.5 px-4 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              sandboxMainTab === 'contract'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            AI 组件原子契约手册 (Registry Specification)
          </button>
        </div>

        {/* 右边小勋章证明一致性 */}
        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>契约自检已就绪 / 100% 一致</span>
        </div>
      </div>

      {/* ----------------------------------------------------
          🔥 板块一：AI Schema 声明式运行时 Playground
          ---------------------------------------------------- */}
      {sandboxMainTab === 'ai_runtime' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* 左侧：选择 AI prompt 与修改 Schema */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* ①. 选择 AI 意图 */}
            <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
              <h4 className="text-xs font-bold text-slate-700 tracking-wider uppercase mb-3 flex items-center gap-1">
                <Code2 className="w-4 h-4 text-indigo-600" /> 第一步：挑选自然语言意图 (PMPrompts)
              </h4>
              
              <div className="flex flex-col gap-2">
                {(['auth', 'risk', 'filter', 'navTree'] as const).map((id) => (
                  <button
                    key={id}
                    onClick={() => handleSelectAITemplate(id)}
                    className={`p-2.5 text-left text-xs rounded-lg border transition-all cursor-pointer flex flex-col gap-1 ${
                      activeAITemplate === id
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-150 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-1">
                      {activeAITemplate === id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />}
                      {AI_SAMPLE_PROMPTS[id].title}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate leading-relaxed">
                      {AI_SAMPLE_PROMPTS[id].prompt}
                    </span>
                  </button>
                ))}
              </div>

              {/* 概念解释气泡 */}
              <div className="mt-3.5 p-3 bg-indigo-50/70 text-indigo-805 rounded-lg text-[11px] leading-relaxed">
                <strong>PM 决策课堂 💡：</strong>
                AI 原型不一致的祸根，在于它直接生成前端 HTML 代码或 CSS。
                而在我们的系统下，AI 只负责读取我们提供的<strong>【组件原语契约】</strong>，并输出受约束的 <strong>【JSON Schema】</strong>，接着由我们的<strong>【声明式解编运行时】</strong>进行解析，这根治了漂移！
              </div>
            </div>

            {/* ②. 二进制协议 JSON 编辑器 */}
            <div className="p-4 bg-slate-900 text-slate-200 rounded-xl shadow-md flex flex-col gap-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-1">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileJson className="w-4 h-4 text-emerald-400" /> 
                  AI 输出的 JSON Schema (允许您实时编辑玩耍)
                </span>
                <button 
                  onClick={() => handleJSONChange(JSON.stringify(currentAIPayload.schema, null, 2))}
                  className="bg-slate-800 hover:bg-slate-700 text-white p-1 rounded text-[10px] flex items-center gap-1"
                  title="回滚重置数据"
                >
                  <RotateCcw className="w-3 h-3" /> 重设
                </button>
              </div>

              <textarea
                value={editableSchemaStr}
                onChange={(e) => handleJSONChange(e.target.value)}
                className="w-full h-96 font-mono text-[11px] bg-slate-950 p-3 leading-relaxed rounded border border-slate-800 text-emerald-350 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                placeholder="在此编写或修改你的 Schema 协议..."
              />
              
              <div className="text-[10px] text-slate-400 leading-normal">
                尝试修改上面的 <code>children</code> 数组、<code>placeholder</code> 或者是 <code>label</code> 文本，然后观察右侧如何秒级实时响应变化！
              </div>
            </div>

          </div>

          {/* 右侧：运行时解析出来的真实 React UI / 动效自适应 */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 视觉竞技场 */}
            <div className="p-6 bg-white border border-dashed border-slate-200 rounded-xl min-h-[360px] flex flex-col justify-center relative">
              <span className="absolute top-3 left-3 text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" /> Layer 5 AI-Native Declarative Runtime (运行时真实渲染)
              </span>

              {/* 实时解释渲染 */}
              <div className="w-full max-w-lg mx-auto py-8">
                {renderSchemaToUI()}
              </div>

              {/* 交互小提示 */}
              <div className="border-t border-slate-150 pt-3 text-slate-400 text-[10px] leading-relaxed">
                <strong>💡 一贯性一致性证明：</strong>
                试着点击右上角的主题面板切换极客单色风（终端黑）或萌圆风。
                你会发现：由 AI Schema 临时组装的这个控件，<strong>【它的圆角、颜色、聚焦和回弹比例，在没有任何人工修改代码的情况下，全部百分百完美适配最新的品牌性格】</strong>！证明它不是断裂的静态 UI。
              </div>
            </div>

            {/* 运行时自检分析 */}
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
              <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                运行时编译成效度量 (Performance Matrix)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                <div className="p-3 bg-slate-50/50 rounded border">
                  <div className="text-[10px] text-slate-400">大模型推理通信损耗</div>
                  <div className="text-xl font-mono font-bold text-indigo-600 mt-1">仅 2.4kb</div>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">AI 无需输出复杂的 JS/CSS，通信字节缩减至原本的 5% 以下！</p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded border">
                  <div className="text-[10px] text-slate-400">交互行为安全校验</div>
                  <div className="text-xl font-mono font-bold text-emerald-600 mt-1">100% 拦截</div>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">禁止随意使用外部生硬框架干扰，操作安全性通过系统机制深度保护。</p>
                </div>
                <div className="p-3 bg-slate-50/50 rounded border">
                  <div className="text-[10px] text-slate-400">开发交付耗费时长</div>
                  <div className="text-xl font-mono font-bold text-indigo-600 mt-1">瞬时交付</div>
                  <p className="text-[9px] text-slate-400 mt-0.5 leading-normal">JSON 直接做后端路由配置发布，前端实现彻底免去开发调试！</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          📂 板块二：传统云主机一键启动表单模拟场景
          ---------------------------------------------------- */}
      {sandboxMainTab === 'form' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-fade-in" id="scenario-sandbox">
          {/* 左外卡：12列响应式的主输入板块 */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
              <div className="flex items-center justify-between mb-5 border-b pb-4 border-slate-100">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: tokens.colors.brand, borderRadius: tokens.borders.radiusMd }}
                  >
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-slate-800">云服务容器计算节点一键初始化</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      基于原句原子组件模型拼接而成的静态高拟合真实场景。请调整测试数据并在弹窗里看自适应状态。
                    </p>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={handleResetForm} className="cursor-pointer">
                  重置表单表
                </Button>
              </div>

              {/* 双层高密度配置表单区 */}
              <div className="space-y-5">
                {/* 字段 A */}
                <Input
                  label="主机唯一标识名称 (Host Suffix Name)"
                  description="该名称用于生成唯一的 Docker & K8s 运行 Pod 状态机，格式必须合规"
                  placeholder="请输入集群子名称，如 app-web-node"
                  value={hostName}
                  onChange={(e) => {
                    setHostName(e.target.value);
                    if (hostError) setHostError('');
                  }}
                  error={hostError}
                  iconLeft={<Terminal className="w-4 h-4" />}
                />

                {/* 栅格横排多下拉组合 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Dropdown
                    label="部署隔离子网命名空间 (VPC Namespace)"
                    description="物理高度隔离的安全计算区环境"
                    options={regionOptions}
                    value={subnet}
                    onChange={setSubnet}
                    enableSearch={true}
                  />

                  <Dropdown
                    label="容器规格高阶套餐 (Computing Size)"
                    description="限制基础计算带宽吞吐核心包"
                    options={sizeOptions}
                    value={instanceSize}
                    onChange={setInstanceSize}
                  />
                </div>

                {/* 字段 B */}
                <Input
                  label="集群身份授权授权 Key"
                  description="管理密钥。经过非对称加密存储在 K8s 专配 secrets 文件中，高保障。"
                  placeholder="请在这里设置你的初始化口令..."
                  type="password"
                  value={accessKey}
                  onChange={(e) => {
                    setAccessKey(e.target.value);
                    if (accessError) setAccessError('');
                  }}
                  error={accessError}
                  iconLeft={<Cpu className="w-4 h-4" />}
                />

                {/* 字段 C: DatePicker 原子原语演示 */}
                <DatePicker
                  label="容器退役生命周期时间 (Retirement Schedule Date)"
                  description="当达到选择的指定物理时间后，Nexus 将安全收回租期并抹除缓存介质"
                  placeholder="请点击日历并设置自动退役时间..."
                  value={retirementDate}
                  onChange={(date, dateStr) => setRetirementDate(dateStr)}
                />

                {/* 字段 D: Slider 原子原语演示 */}
                <Slider
                  label="容器物理核心配额限额管理 (Container VCPU Limit Quota)"
                  description="拖动或微调该安全阀指明当前容器 Pod 允许调用的的最大 VCPU 运算资源"
                  min={1}
                  max={32}
                  step={1}
                  value={cpuLimit}
                  onChange={setCpuLimit}
                  showInput={true}
                  showTooltip={true}
                />

                {/* 页尾执行条 */}
                <div
                  className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t mt-6 pt-5"
                  style={{ borderColor: tokens.colors.border }}
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <HelpCircle className="w-4 h-4 text-slate-400" />
                    <span>该计算实例一旦拉起部署，安全审计自动挂起遥测。</span>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                      variant="primary"
                      onClick={handleOpenConfirm}
                      isLoading={isDeploying}
                      className="w-full sm:w-auto cursor-pointer"
                      iconRight={<ArrowRight className="w-4 h-4" />}
                    >
                      {isDeploying ? '云数据同步配置中...' : '提交配置并立即拉起'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 当处于点击拉起后的模拟实时日志跑板 */}
            {isDeploying && (
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs flex flex-col gap-2.5 shadow-md">
                <div className="flex items-center justify-between border-b pb-2 border-slate-800 mb-1">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <Settings2 className="w-3.5 h-3.5 animate-spin" /> 集群后台启动遥测服务 (K8s Deployer Logs)
                  </span>
                  <span className="text-slate-500 text-[10px]">CWD: /opt/cluster-deployer</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-slate-500">
                    [2026-05-29T13:48:57Z] [INF] Initializing atomic design variables validation...
                  </p>
                  <p className={deployStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}>
                    ✔ Step 1: Loaded client environment vars & verified theme Preset ({tokens.colors.name})
                  </p>
                  <p className={deployStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}>
                    {deployStep >= 2
                      ? `✔ Step 2: Injected borders (radiusMd: ${tokens.borders.radiusMd}) on container host "${hostName}"`
                      : '⌛ Step 2: Applying spacing scales, calculating margin allocations...'}
                  </p>
                  <p className={deployStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}>
                    {deployStep >= 3
                      ? `✔ Step 3: Deployment completed successfully on namespace: ${subnet}`
                      : '⌛ Step 3: Spinning up pods, authenticating secrets with cryptographic Root key...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 右外卡：页面右侧的一贯性报告面板 */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="p-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                设计系统一致性自检报告 (Consistency Audit)
              </h4>

              <div className="space-y-4 text-xs font-normal text-slate-550 leading-relaxed">
                <div className="flex gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">100% 静态色彩覆盖率</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      输入框框线、下拉检索着色、弹窗首选操作、背景色深灰，在暗色或柔暖色主题下被无瑕自适应，无多余野生色彩添加。
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 border-t pt-3 border-slate-100">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">100% 动态节奏保持</h5>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      当切换至【萌系糖果圆】时，所有的按压动作都会转为 160 毫秒高回弹性曲线；切换至【科技代码单色】时则彻底抹除，表现出极强的系统性自洽！
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 表单点击的二次警告提醒规范组件 Modal 实例 */}
          <Modal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            title="确认同步配置并拉起该可用区计算节点？"
            footer={
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsConfirmOpen(false)}>
                  暂返回修改
                </Button>
                <Button variant="primary" size="sm" onClick={handleStartDeploy}>
                  确定无误，同步配置
                </Button>
              </div>
            }
          >
            <div className="space-y-4 font-normal">
              <p className="text-sm text-slate-600 leading-relaxed">
                请最后核对以下为当前准备同步的集群参数。整个视图完美继承了当前{' '}
                <strong className="text-indigo-600 font-semibold">{tokens.name}</strong> 的全部视觉令牌：
              </p>

              <div
                className="p-4 rounded-lg space-y-2 border"
                style={{
                  backgroundColor: tokens.colors.bgPage,
                  borderColor: tokens.colors.border,
                  borderRadius: tokens.borders.radiusMd,
                }}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">实例 Hostname：</span>
                  <span className="font-mono font-semibold" style={{ color: tokens.colors.textPrimary }}>
                    {hostName}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t pt-2 border-dashed border-slate-200">
                  <span className="text-slate-400">子网可用物理区 (Subnet)：</span>
                  <span className="font-semibold" style={{ color: tokens.colors.textPrimary }}>
                    {regionOptions.find((o) => o.value === subnet)?.label || subnet}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t pt-2 border-dashed border-slate-200">
                  <span className="text-slate-400">规格套餐 (Computing Size)：</span>
                  <span className="font-semibold" style={{ color: tokens.colors.brand }}>
                    {sizeOptions.find((o) => o.value === instanceSize)?.label || instanceSize}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t pt-2 border-dashed border-slate-200">
                  <span className="text-slate-400">CPU 核心硬上限 (CPU Core Limit)：</span>
                  <span className="font-semibold font-mono text-emerald-600">
                    {cpuLimit} vCPU Cores
                  </span>
                </div>
              </div>

              <div className="p-3 bg-indigo-50 text-indigo-700 text-[11px] leading-relaxed rounded">
                🚀 <strong>微设计心智传达：</strong>
                本确认框的圆角跟随 <code>{tokens.borders.radiusLg}</code>，完美响应了行为令牌 <code>modalDismissOverlay</code> 设定规则，绝不制造碎片化冲突。
              </div>
            </div>
          </Modal>

        </div>
      )}

      {/* ----------------------------------------------------
          📂 板块三：AI 组件契约手册清单 (Registry Specifications)
          ---------------------------------------------------- */}
      {sandboxMainTab === 'contract' && (
        <div className="p-6 bg-white border border-[#E2E8F0] rounded-xl shadow-xs space-y-6 animate-fade-in">
          <div>
            <h3 className="text-md font-bold text-slate-800">Component Registry：AI 交互与原子契约清单</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              产品经理在给开发和 AI 编排制定契约时，需要制定如下规则手册。AI 只能在如下受限的 Props 属性和行为内拼装界面，严防无主设计。
            </p>
          </div>

          <div className="space-y-6">
            {/* ①. Button 契约 */}
            <div className="border rounded-lg p-4 bg-slate-50/20" style={{ borderColor: tokens.colors.border }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-600 text-white rounded text-[10px] font-mono px-2 py-0.5 font-bold">Layer 2 : Primitive</span>
                <h4 className="text-sm font-bold font-mono text-slate-800">Button (核心按钮)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-550 border-collapse">
                  <thead>
                    <tr className="border-b" style={{ borderColor: tokens.colors.border }}>
                      <th className="py-2 font-bold w-1/4 text-slate-700">属性 (Prop)</th>
                      <th className="py-2 font-bold w-1/4 text-slate-700">可接受数据范围</th>
                      <th className="py-2 font-bold text-slate-700">产品与交互语义 (中文释义)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">variant</td>
                      <td className="py-2.5 font-mono text-slate-500">'primary' | 'secondary' | 'outline' | 'text' | 'danger'</td>
                      <td className="py-2.5">按钮的视觉形态。默认 primary。danger 表示危险/毁灭性操作。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">size</td>
                      <td className="py-2.5 font-mono text-slate-500">'sm' | 'md' | 'lg'</td>
                      <td className="py-2.5">按钮的大小高度（自适应 spacing 令牌间隔）。默认中 md。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">isLoading</td>
                      <td className="py-2.5 font-mono text-slate-500">boolean (true | false)</td>
                      <td className="py-2.5">数据加载中状态（展示旋转图标，并且锁定其交互，防重复点击）。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">Press Scale</td>
                      <td className="py-2.5 font-mono text-slate-500">由 <code>behaviors.buttonPressScale</code> 控制</td>
                      <td className="py-2.5">交互行为令牌：用户按下手指收缩的比重，软萌糖果 93% 弹性，理性现代 97%。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ②. Input 契约 */}
            <div className="border rounded-lg p-4 bg-slate-50/20" style={{ borderColor: tokens.colors.border }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-600 text-white rounded text-[10px] font-mono px-2 py-0.5 font-bold">Layer 2 : Primitive</span>
                <h4 className="text-sm font-bold font-mono text-slate-800">Input (单行文本输入器)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-550 border-collapse">
                  <thead>
                    <tr className="border-b" style={{ borderColor: tokens.colors.border }}>
                      <th className="py-2 font-bold w-1/4 text-slate-700">属性 (Prop)</th>
                      <th className="py-2 font-bold w-1/4 text-slate-700">可接受数据范围</th>
                      <th className="py-2 font-bold text-slate-700">产品与交互语义 (中文释义)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">label</td>
                      <td className="py-2.5 font-mono text-slate-500">string</td>
                      <td className="py-2.5">顶置标题标签，阐明表单期望输入什么内容。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">description</td>
                      <td className="py-2.5 font-mono text-slate-500">string</td>
                      <td className="py-2.5">副说明信息，提供辅助参考。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">error</td>
                      <td className="py-2.5 font-mono text-slate-500">string</td>
                      <td className="py-2.5">校验失败的异常指示语，若有值，组件自适应高亮变红酒色或玫瑰粉红色。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">Focus Ring</td>
                      <td className="py-2.5 font-mono text-slate-500">由 <code>behaviors.inputFocusRing</code> 控制</td>
                      <td className="py-2.5">交互行为令牌：聚焦时是否扩散一圈 3px 主色发光雾环，代码终端强制禁用该发光。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 三. Dropdown 契约 */}
            <div className="border rounded-lg p-4 bg-slate-50/20" style={{ borderColor: tokens.colors.border }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-600 text-white rounded text-[10px] font-mono px-2 py-0.5 font-bold">Layer 2 : Primitive</span>
                <h4 className="text-sm font-bold font-mono text-slate-800">Dropdown (下拉弹框选择)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-550 border-collapse">
                  <thead>
                    <tr className="border-b" style={{ borderColor: tokens.colors.border }}>
                      <th className="py-2 font-bold w-1/4 text-slate-700">属性 (Prop)</th>
                      <th className="py-2 font-bold w-1/4 text-slate-700">可接受数据范围</th>
                      <th className="py-2 font-bold text-slate-700">产品与交互语义 (中文释义)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">options</td>
                      <td className="py-2.5 font-mono text-slate-500">Array&lt;{`{ label: string; value: string; description?: string }`}&gt;</td>
                      <td className="py-2.5">数据选项数组。每个选项支持二级 <code>description</code>，防止选项文案过长产生拥挤。</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">enableSearch</td>
                      <td className="py-2.5 font-mono text-slate-500">boolean</td>
                      <td className="py-2.5">是否内置模糊搜索条。对于超长、复杂的业务下拉极其实用。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 四. Modal 契约 */}
            <div className="border rounded-lg p-4 bg-slate-50/20" style={{ borderColor: tokens.colors.border }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-indigo-600 text-white rounded text-[10px] font-mono px-2 py-0.5 font-bold">Layer 2 : Primitive</span>
                <h4 className="text-sm font-bold font-mono text-slate-800">Modal (浮沉弹窗模态层)</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-550 border-collapse">
                  <thead>
                    <tr className="border-b" style={{ borderColor: tokens.colors.border }}>
                      <th className="py-2 font-bold w-1/4 text-slate-700">属性 (Prop)</th>
                      <th className="py-2 font-bold w-1/4 text-slate-700">可接受数据范围</th>
                      <th className="py-2 font-bold text-slate-700">产品与交互语义 (中文释义)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">dismissOverlay</td>
                      <td className="py-2.5 font-mono text-slate-500">boolean (来自 <code>behaviors.modalDismissOverlay</code>)</td>
                      <td className="py-2.5">交互核心：是否被允许点击旁边遮罩区闪退。高危警告框应该强行设置为 false！</td>
                    </tr>
                    <tr className="border-b border-dashed" style={{ borderColor: tokens.colors.border }}>
                      <td className="py-2.5 font-mono text-indigo-600">size</td>
                      <td className="py-2.5 font-mono text-slate-500">'sm' | 'md' | 'lg' | 'xl'</td>
                      <td className="py-2.5">对应 440px、512px、672px、896px。根据表格或表单复杂度合理挑选宽度。</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default ScenarioSandbox;
