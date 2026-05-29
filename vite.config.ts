/**
 * =========================================================================
 * 文件名称: /vite.config.ts
 * 功能描述: Vite 核心编译与本地开发服务器配置文件
 * 目标受众: 产品经理、视觉设计专家、资深全栈工程师。
 * 
 * 💡 概念普及：为什么需要 “Vite” 编译配置？
 * 1. 现代浏览器虽然原生支持一些极简的 JS 模块加载，但它们完全看不懂高级语法（如 TypeScript、React JSX、
 *    Tailwind 高效原子类编译）。
 * 2. Vite 扮演着“超级魔法工厂”的角色：
 *    - ⚡ 本地开发阶段：借助极快的 ES Module 特性，做到毫秒级的启动。
 *    - 📦 生产发布阶段：调用 Rollup 工具对全部代码进行死码修剪（Tree-shaking）、合并拆包（Splitting）、
 *      最强极简混淆（Minification），吐出体积极小的静态包。
 * =========================================================================
 */

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    /**
     * 🔌 【编译器插件链配置】
     * 1. react(): 赋能 Vite 能够无暇看懂和解析 .tsx、组件状态，并在运行时配合 React 刷新。
     * 2. tailwindcss(): 引入了最新的 Tailwind v4 全新集成式 CSS 极速生成，直接将类名编译成高效的样式库。
     */
    plugins: [react(), tailwindcss()],

    /**
     * 🗺️ 【目录别名解析定位】
     * 将代码里的短称引用“@/”跟整个项目的本地根路径绑定。
     * 例如在子目录里想要引用根文件，写 `import ... from '@/src/components/...'` 替代
     * 让人头晕眼花的 `../../../../components` 相对寻找动作，大幅提高后期重构成功率。
     */
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    /**
     * 📡 【开发服务器与心跳配置】
     * 本段配置由 Google AI Studio 平台云跑道基础设施深度锁定与接管。如非必要，切勿擅动！
     */
    server: {
      // ⚠️ HMR (热重载/热模块替换):
      // 热模块在普通本地电脑可以让修改在浏览器里秒级不刷新更新，但在代理微处理器中频繁重叠，会造成中间过程闪退抖动。
      // 因此 AI Studio 在代理服务阶段会自动设置 DISABLE_HMR=true。
      hmr: process.env.DISABLE_HMR !== 'true',
      
      // ⚠️ 物理磁盘文件监听:
      // 当 DISABLE_HMR 是真时，锁定并释放物理文件监视（Watch），从而大幅释放服务器的运算 CPU 压力，
      // 省出更多系统内存支撑更加深度的人工智能代码生成。
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
