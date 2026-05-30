/**
 * ==========================================
 * 文件名称: /src/views/CustomPageTemplate.tsx
 * 功能描述: Atomix UI 官方标准业务页面模板 (独立隔离视图 - 拒绝库污染)
 * 目标受众: 后续接入的 AI Assistant / IDE 助手等
 * 
 * 💡 开发准则:
 * 1. 【隔离开发】: 请在此目录下创建你的新页面/业务功能级视图 (例如: Dashboard, Settings, Monitoring)。
 * 2. 【禁止污染】: 绝对禁止将繁杂的、临时的业务代码写入 /src/components/ Atoms 或 Sandbox 目录。
 * 3. 【令牌挂载】: 页面必须通过 useDesignTokens 统一拉取全局静态/行为令牌，支持 4 套风骨主题的实时无缝切换。
 * ==========================================
 */

import React, { useState } from 'react';
import { useDesignTokens } from '../components/base/DesignTokensContext';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Dropdown } from '../components/atoms/Dropdown';
import { 
  ShieldCheck, 
  Terminal, 
  Layout, 
  Rocket, 
  CheckCircle2,
  Info
} from 'lucide-react';

export const CustomPageTemplate: React.FC = () => {
  const { tokens } = useDesignTokens();
  
  // 业务状态定义
  const [tenantName, setTenantName] = useState('atomix-demo-tenant');
  const [selectedRole, setSelectedRole] = useState('developer');
  const [isEnabled, setIsEnabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const roleOptions = [
    { label: '系统架构管理员 (Administrator)', value: 'admin', description: '拥有云物理集群全控制权，高危访问限制' },
    { label: '应用开发者 (Developer)', value: 'developer', description: '标准应用微服务发布、沙盒实例调试权' },
    { label: '财务与审计官 (Auditor)', value: 'auditor', description: '仅具有各可用区账单审计、安全日志只读权' },
  ];

  const handleApplyConfig = () => {
    if (!tenantName.trim()) {
      setStatusMessage('⚠️ 配置激活失败：租户唯一标识不能为空！');
      return;
    }
    setStatusMessage(`🎉 配置已成功激活！[租户: ${tenantName}] 已绑定至权重级别 ${selectedRole}，完美适配当前 [${tokens.name}] 主题风格表现！`);
  };

  return (
    <div 
      className="p-6 transition-all duration-300"
      style={{
        backgroundColor: tokens.colors.bgCard,
        borderRadius: tokens.borders.radiusLg,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: tokens.colors.border,
        fontFamily: 'var(--font-family-body)',
      }}
    >
      {/* 栏目头部：无生硬直边界，留白均匀 */}
      <div className="flex items-start justify-between border-b pb-4 mb-6 border-slate-100/60">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" style={{ color: tokens.colors.brand }} />
            <h2 className="text-base font-bold" style={{ color: tokens.colors.textPrimary }}>
              业务隔离开发沙盒 · 租户虚拟网络控制台
            </h2>
          </div>
          <p className="text-xs mt-1" style={{ color: tokens.colors.textMuted }}>
            此视图存放在 <code className="px-1.5 py-0.5 bg-slate-50 border rounded text-[11px]">/src/views/</code> 独立隔离区中，专为保证后续业务代码与底层原子组件库解耦。
          </p>
        </div>
        <span 
          className="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
          style={{
            color: tokens.colors.brand,
            backgroundColor: `${tokens.colors.brand}0D`,
          }}
        >
          ISOLATED VIEW
        </span>
      </div>

      {/* 12列栅格布局演示 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 左侧控制输入块 (7列) */}
        <div className="md:col-span-7 space-y-5">
          <Input 
            label="租户网段唯一标识 (Tenant ID Key)"
            description="本标识将注册为命名隔离底盘，请务必保证唯一性"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
            placeholder="自定义网段标识，例如 client-alpha..."
          />

          <Dropdown 
            label="默认操作员预设角色 (Operator Preset)"
            description="控制台在完成初始化后，将自动向该角色授权根级子系统登录签名"
            options={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
          />

          <div className="pt-2 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold" style={{ color: tokens.colors.textPrimary }}>开启租户高压熔断拦截器</div>
              <p className="text-[11px]" style={{ color: tokens.colors.textMuted }}>当单实例并发流量突破阈值时，强制进行网络休眠自愈</p>
            </div>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer"
              style={{
                backgroundColor: isEnabled ? tokens.colors.brand : tokens.colors.bgInput,
                color: isEnabled ? '#ffffff' : tokens.colors.textMuted,
                borderRadius: tokens.borders.radiusMd,
              }}
            >
              {isEnabled ? '已启用自愈' : '已关闭熔断'}
            </button>
          </div>

          <div className="pt-4 flex gap-3">
            <Button 
              variant="primary" 
              size="md" 
              onClick={handleApplyConfig}
              className="flex-1 md:flex-none"
            >
              配置生效激活
            </Button>
            <Button 
              variant="secondary" 
              size="md" 
              onClick={() => {
                setTenantName('atomix-demo-tenant');
                setSelectedRole('developer');
                setIsEnabled(true);
                setStatusMessage('');
              }}
            >
              重置
            </Button>
          </div>
        </div>

        {/* 右侧环境信息面板与自锁监控 (5列) */}
        <div className="md:col-span-5 flex flex-col justify-between p-5 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
          <div className="space-y-4">
            <h3 className="text-xs font-bold flex items-center gap-1.5" style={{ color: tokens.colors.textPrimary }}>
              <Terminal className="w-4 h-4 text-slate-400" />
              设计语言同步遥测
            </h3>
            
            <div className="space-y-2 text-[11px] font-mono">
              <div className="flex justify-between border-b pb-1 border-slate-100">
                <span className="text-slate-400">当前激活风骨:</span>
                <span className="font-semibold text-slate-700">{tokens.name}</span>
              </div>
              <div className="flex justify-between border-b pb-1 border-slate-100">
                <span className="text-slate-400">品牌主色:</span>
                <span className="font-semibold" style={{ color: tokens.colors.brand }}>{tokens.colors.brand}</span>
              </div>
              <div className="flex justify-between border-b pb-1 border-slate-100">
                <span className="text-slate-400">按钮压下缩放:</span>
                <span className="text-slate-700">{tokens.behaviors.buttonPressScale}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400">过渡动效调性:</span>
                <span className="text-slate-700 uppercase">{tokens.behaviors.motionCurve}</span>
              </div>
            </div>

            <div className="p-3 bg-white/70 rounded-lg flex gap-2 items-start text-[11px] text-slate-500 shadow-2xs leading-relaxed">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>自动校正心率：</strong>当前页面在繁复的操作和动效转换中，没有编写任何内联固定参数，完完全全忠实地与底层设计资产同步收缩扩展并实现编译闭环。
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/50">
            <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1">
              SANDBOX METRICS
            </span>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              100% 隔离运行安全。无库污染行为。
            </div>
          </div>

        </div>

      </div>

      {/* 业务通知结果触发槽 */}
      {statusMessage && (
        <div 
          className="mt-6 p-4 text-xs font-medium rounded-lg animate-fade-in"
          style={{
            backgroundColor: `${tokens.colors.brand}0A`,
            color: tokens.colors.textPrimary,
            borderLeft: `4px solid ${tokens.colors.brand}`,
          }}
        >
          {statusMessage}
        </div>
      )}
    </div>
  );
};
