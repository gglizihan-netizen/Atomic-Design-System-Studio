import React, { useState } from 'react';
import { useDesignTokens } from '../components/base/DesignTokensContext';
import Icon from '../components/atoms/Icon';

// 定义标书目录的数据结构
interface SubSection {
  id: string;
  title: string;
}

interface Section {
  id: string;
  title: string;
  subsections: SubSection[];
}

interface Chapter {
  id: string;
  title: string;
  pages: number;
  words: number;
  sections: Section[];
}

export const BidBuilderView: React.FC = () => {
  const { tokens } = useDesignTokens();

  // ==========================================
  // 1. 核心状态仓 (State Container)
  // ==========================================
  const [currentStep, setCurrentStep] = useState<3 | 4>(3); // 3-生成目录(截图1)，4-生成正文(截图2)
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch-1'); // 选中的编辑章节 (Step 4)
  const [selectedSectionId, setSelectedSectionId] = useState<string>('sec-1-1'); // 选中的编辑小节 (Step 4)
  
  // 剩余可用计算字数
  const [remainingWords, setRemainingWords] = useState<number>(24000);
  const [isRefreshingWords, setIsRefreshingWords] = useState<boolean>(false);

  // 项目基础信息
  const projectName = "江北新区沿江路快速化改造及配套跨线桥工程(一标段) 标书编制方案";

  // 右侧插图搜索和列表状态
  const [imageSearchQuery, setImageSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('全部');
  const [insertedImages, setInsertedImages] = useState<string[]>([]); // 暂存编辑器中已加的图片

  // ==========================================
  // Step 3: 其他建议候选章节列表数据
  // ==========================================
  const [suggestedChapters, setSuggestedChapters] = useState([
    { id: 'sug-1', title: '第三章 季节性（雨季/夏季）施工安全质量保证措施', pageEst: 15 },
    { id: 'sug-2', title: '第四章 施工应急预案与汛期安全响应防线', pageEst: 20 },
    { id: 'sug-3', title: '第五章 工程质保期满后的维修交接与后勤保障', pageEst: 10 },
    { id: 'sug-4', title: '第六章 技术资料及城建档案归档分类管理办法', pageEst: 8 },
    { id: 'sug-5', title: '第七章 智慧工地大屏监控及高噪防尘绿色施工方案', pageEst: 12 },
  ]);

  // ==========================================
  // 标书整体目录结构数据 (支持交互式调整)
  // ==========================================
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 'ch-1',
      title: '第一章 工程质量通病防控及细节攻坚措施',
      pages: 28,
      words: 14000,
      sections: [
        {
          id: 'sec-1-1',
          title: '第一节 道路工程质量通病防治与平整度控制',
          subsections: [
            { id: 'sub-1-1-1', title: '一、高填方路基沉降与桥台跳车综合防治措施' },
            { id: 'sub-1-1-2', title: '二、沥青混凝土路面反射裂缝与车辙深度预防技术' },
            { id: 'sub-1-1-3', title: '三、检查井周边基础塌陷下沉、松动开裂处理技术方案' },
          ]
        },
        {
          id: 'sec-1-2',
          title: '第二节 装饰装修与桥梁结构渗水开裂细节通病防治',
          subsections: [
            { id: 'sub-1-2-1', title: '一、清水混凝土外墙模板拼缝挂泪与蜂窝麻面控制' },
            { id: 'sub-1-2-2', title: '二、伸缩缝精细化防水层渗漏预防及后期维修工艺' },
          ]
        }
      ]
    },
    {
      id: 'ch-2',
      title: '第二章 施工总体部署、分段划分与关键节点工期保证',
      pages: 18,
      words: 9000,
      sections: [
        {
          id: 'sec-2-1',
          title: '第一节 施工段划分与多工序流水科学排程',
          subsections: [
            { id: 'sub-2-1-1', title: '一、一阶段跨线桥主拱圈拼装与引道并行施工段落划分' },
            { id: 'sub-2-1-2', title: '二、主要大型施工机械（架桥机、履带吊）科学配比' },
          ]
        }
      ]
    }
  ]);

  // 选中当前在 outline 中点击的条目 id (用于置顶/下移等微调)
  const [activeOutlineItemId, setActiveOutlineItemId] = useState<string>('ch-1');

  // ==========================================
  // Step 4: 章节正文编辑器数据源
  // ==========================================
  const [editorContents, setEditorContents] = useState<Record<string, string>>({
    'sec-1-1': `第一节 道路工程质量通病防治与平整度控制

一、高填方路基沉降与桥台跳车综合防治措施
针对本快速化改造工程中，软基路堤以及新老路面拼接位置易出现的不均匀下沉问题，编制组拟从三个维度建立通病攻坚防线：
    
1. 技术标准与设计优化：
在新老路基衔接面，采用1:1.5台阶法挖机切坡。阶梯宽度不小于1.0m，台阶立面涂刷聚合物改性乳化沥青防渗漏粘结层，再加铺双向高强玻纤土工格栅。格栅抗拉强度不低于80kN/m，确保荷载过渡段受力连续。
    
2. 填料与精细压实：
台背填筑材料优先选用轻质高强泡沫混凝土（湿容重控制在6.0-8.0kN/m³以内）或者洁净粗砂，压实度要求提高至≥97%。每层铺筑厚度严控在15cm以内，采用自带震频的大型振动压路机与冲击夯配合无死角压实。
    
3. 后期监测与工序留滞：
现场必须部署高精度雷达位移传感器，24小时跟踪位移沉降值。衔接段路基顶面预留不少于15天的观测期，唯沉降速率收敛至0.02mm/d以下时方可进行上部沥青结构物摊铺作业。
    
二、沥青混凝土路面反射裂缝与车辙深度预防技术
沿江路车流量巨大且重载车辆频繁通行，中下油层表面剪切力集中：
    
1. 改性树脂夹层铺装：
为了全面阻断地基基层裂隙上行发展，需在大面积摊铺SBS改性沥青细粒式罩面前，全局撒布1.5kg/m²的高温改性乳化地沥青，并随即满铺单向拉伸聚酯防裂贴，通过物理延展消除剪力破坏。
    
2. 车辙抑制骨料配比：
路面上面层胶结料强制添加0.4%比例的“高粘抗车辙颗粒”（海川抗车辙剂），并调整集料级配为骨架密实型SMA-13规范，使骨料嵌挤互力大幅跃升，高温抗变形模量提升至1500MPa以上。
    
三、检查井周边基础塌陷下沉、松动开裂处理技术方案
江北新区及路网地下管线混杂，井轴平整度一直是返修重灾区：
1. 采用“防坠落自调节重载式”井座，四周钢筋混凝土井环整体预制，避免现场泥水堆砌。
2. 井筒回填部位一律改用高标号C25微膨胀细石混凝土浇筑填实。面层沥青摊铺前，针对井圈1.0m轮廓进行梯形拉毛，使井圈与主路沥青粘合固结。`,
    'sec-1-2': `第二节 装饰装修与桥梁结构渗水开裂细节通病防治

一、清水混凝土外墙模板拼缝挂泪与蜂窝麻面控制
1. 清水模板拼装工艺提升：
主跨线桥立柱一律选用高抗剪镜面塑化多层板，单块模板面积不小于4.0㎡以最大化减少拼缝。模板拼缝间精密塞入自粘性高流平发泡橡胶棉，合模后采用双向拉条强制上紧，保证拼缝高差在0.5mm以内。
    
2. 拆模养护与精细修补：
严格执行拆模抗压强度标准。脱模后迅速利用定制保水薄膜进行包裹闭合，保湿抗紫外线。局部气孔使用同配合比水泥调配微硅粉砂浆精补。
    
二、伸缩缝精细化防水层渗漏预防及后期维修工艺
1. 高延性防水胶泥填充：
在梁底端缝交界核心带，清理槽深不小于12cm，底层大面积刷涂三遍高刚性聚氨酯水性防水膜，缝中热熔浇筑高弹粘土胶，拉伸延展率不低于450%。
2. 机械防护盖板配置：
采用防冲刷全天候合金齿形护板，井字型扣锁，并预设内置引水软管以保障雨水及时排出。`,
    'sec-2-1': `第一节 施工段划分与多工序流水科学排程

一、一阶段跨线桥主拱圈拼装与引道并行施工段落划分
1. 科学段落规划：
本标段依物理隔离线规划为三个宏观工序流水区。一工区（K1+200~K2+500）主攻跨线拱轴，二工区（K2+500~K4+100）部署南引道软基，三工区负责两侧雨污水管。
2. 平行穿插排程：
跨线桥钢箱梁拼装阶段，下部路基填筑可同步平行交叉作业，时间重叠度提升40%，大大压缩总工期节点。
    
二、主要大型施工机械（架桥机、履带吊）科学配比
1. 机械能级选配：
桥梁装配配置2台最大起重量500吨的液压大扁节吊机及1台双导梁高速架桥机。
2. 堆场与地基硬化：
临时钢构吊装受力范围均执行120mm泥结石垫铺＋220mm厚C30预制箱垫块垫支承重。`
  });

  const [currentEditorText, setCurrentEditorText] = useState<string>(
    editorContents['sec-1-1']
  );

  // 当选择不同子章节时，切换正文编辑器内容，同时保存上次修改
  const handleSelectSubchapter = (sectionId: string, chapterId: string) => {
    // 1. 保存当前编辑文本到仓库
    setEditorContents(prev => ({
      ...prev,
      [selectedSectionId]: currentEditorText
    }));

    // 2. 加载新章节正文
    setSelectedChapterId(chapterId);
    setSelectedSectionId(sectionId);
    const newText = editorContents[sectionId] || `${chapters.find(c => c.id === chapterId)?.sections.find(s => s.id === sectionId)?.title || ''}\n\n[ AI 正等待为此节生成深度正文，点击上方重新生成按钮启动智能填补 ]`;
    setCurrentEditorText(newText);
  };

  // ==========================================
  // 下拉、删除、添加等高频微交互行为逻辑
  // ==========================================
  
  // 3.1 从附加章节添加至正式标书目录
  const handleAddSuggestedToOutline = (sugId: string, title : string) => {
    // 创建一个新的Chapter节点
    const parts = title.split(' ');
    const displayNum = `第三章`; // 动态计算章名
    const cleanTitle = parts.slice(1).join(' ') || title;
    
    const newCh: Chapter = {
      id: `ch-added-${Date.now()}`,
      title: `新章节 ${cleanTitle}`,
      pages: 12,
      words: 6000,
      sections: [
        {
          id: `sec-added-${Date.now()}-1`,
          title: `第一节 项目特设专项管理与保证要点`,
          subsections: [
            { id: `sub-added-${Date.now()}-1-1`, title: `一、特设标准工艺流程与工匠制施工保障` },
            { id: `sub-added-${Date.now()}-1-2`, title: `二、针对特定敏感点和约束区域的应急保障` }
          ]
        }
      ]
    };

    setChapters(prev => [...prev, newCh]);
    setSuggestedChapters(prev => prev.filter(item => item.id !== sugId));
    
    // 扣减字数，模拟云端消耗
    setRemainingWords(prev => Math.max(0, prev - 1500));
  };

  // 3.2 目录节点上移与下移
  const handleMoveOutlineItem = (direction: 'up' | 'down') => {
    if (!activeOutlineItemId) return;
    const index = chapters.findIndex(c => c.id === activeOutlineItemId);
    if (index === -1) return;

    if (direction === 'up' && index > 0) {
      const updated = [...chapters];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      setChapters(updated);
    } else if (direction === 'down' && index < chapters.length - 1) {
      const updated = [...chapters];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      setChapters(updated);
    }
  };

  // 3.3 目录节点删除
  const handleDeleteChapter = (chId: string) => {
    const target = chapters.find(c => c.id === chId);
    if (!target) return;
    
    setChapters(prev => prev.filter(c => c.id !== chId));
    // 退回暂存区
    setSuggestedChapters(prev => [
      ...prev,
      { id: `sug-ret-${Date.now()}`, title: target.title, pageEst: target.pages }
    ]);
  };

  // 3.4 刷新剩余算力
  const handleRefreshWords = () => {
    setIsRefreshingWords(true);
    setTimeout(() => {
      setRemainingWords(24000);
      setIsRefreshingWords(false);
    }, 800);
  };

  // 3.5 AI一键优化目录
  const [isOptimizingOutline, setIsOptimizingOutline] = useState(false);
  const handleOptimizeOutline = () => {
    setIsOptimizingOutline(true);
    setTimeout(() => {
      // 模拟添加了一个细节子小节
      setChapters(prev => {
        return prev.map(ch => {
          if (ch.id === 'ch-1') {
            const updatedSecs = [...ch.sections];
            if (updatedSecs[0]) {
              updatedSecs[0] = {
                ...updatedSecs[0],
                subsections: [
                  ...updatedSecs[0].subsections,
                  { id: `sub-opt-${Date.now()}`, title: '四、[AI增补] K1+350新老桥涵跨线并行段高风险不均匀沉降攻攻要点' }
                ]
              };
            }
            return { ...ch, sections: updatedSecs };
          }
          return ch;
        });
      });
      setIsOptimizingOutline(false);
      alert('AI 智能大模型已成功对目录一键扩充：在“第一章第一节”增铺了跨线高风险沉降细节小节！');
    }, 1000);
  };

  // ==========================================
  // Step 4: 图片配图交互
  // ==========================================
  const mockImages = [
    { id: 'img-1', tag: '施工现场', title: '深基坑高跨重载架设防护平剖图', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=260' },
    { id: 'img-2', tag: '施工现场', title: '双向玻纤土工格栅搭接剪切节点图', url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=260' },
    { id: 'img-3', tag: '技术细节', title: '泡沫混凝土浇筑台背及软基防滑移模型', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=260' },
    { id: 'img-4', tag: 'BIM三维图', title: '检查井周围井圈自防跑偏混凝土加固图', url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7eed?auto=format&fit=crop&q=80&w=260' }
  ];

  // 搜索和标签过滤后的图片
  const filteredImages = mockImages.filter(img => {
    const matchesTag = selectedTag === '全部' || img.tag === selectedTag;
    const matchesKeyword = img.title.toLowerCase().includes(imageSearchQuery.toLowerCase());
    return matchesTag && matchesKeyword;
  });

  const handleInsertImageToEditor = (imgTitle: string) => {
    setCurrentEditorText(prev => prev + `\n\n【📷 已在此处成功嵌入插入配图： ${imgTitle}】\n`);
    // 增加已插入记录
    setInsertedImages(prev => [...prev, imgTitle]);
  };

  return (
    <div className="flex flex-col gap-6" id="bid-document-generator-app">
      {/* 👑 顶部标书工程状态与导航控制条 (Top Control Deck) */}
      <div 
        className="p-5 shadow-sm border border-slate-200"
        style={{
          backgroundColor: tokens.colors.bgCard,
          borderRadius: tokens.borders.radiusLg,
          borderColor: tokens.colors.border,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-md font-bold tracking-wider">
                AI 建筑工程标书工作台
              </span>
              <span className="text-xs text-slate-400">已自动适配我们提取的新底层令牌：</span>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                Royal Indigo Theme
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-850 truncate flex items-center gap-2">
              <Icon name="ai" size="lg" className="text-blue-600 focus:animate-bounce" />
              <span>{projectName}</span>
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              招标文件深度大纲生成与正文自动排版系统。请在下方对生成的目录做最后理定，一键交付高维度正文生成。
            </p>
          </div>

          {/* 剩余点数与充值操作区 */}
          <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100 p-3 rounded-lg shrink-0">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                云账户剩余算力字数
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm font-extrabold text-blue-700 font-mono">
                  {remainingWords.toLocaleString()} 字
                </span>
                <button 
                  onClick={handleRefreshWords}
                  title="刷新点数"
                  className={`p-1 hover:bg-slate-200 rounded transition-colors ${isRefreshingWords ? 'animate-spin' : ''}`}
                >
                  <Icon name="refresh" size="xs" variant="default" />
                </button>
              </div>
            </div>
            <button 
              onClick={() => {
                alert('充值系统已唤醒：感谢您的体验，当前已处于演示账户高级版。');
                setRemainingWords(prev => prev + 50000);
              }}
              className="text-white text-xs font-bold px-3 py-1.5 bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs active:scale-95"
              style={{
                borderRadius: tokens.borders.radiusMd,
                transitionDuration: `${tokens.behaviors.motionDurationFast}ms`
              }}
            >
              在线充值
            </button>
          </div>
        </div>

        {/* 2. 标书生成流程主导航航向线 (Progress Stepper) */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded">
              <span className="font-bold text-[10px] text-slate-500">1</span>
              <span>方案配置</span>
            </div>
            <Icon name="chevron-right" size="xs" variant="default" />
            <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded">
              <span className="font-bold text-[10px] text-slate-500">2</span>
              <span>解析招标要求</span>
            </div>
            <Icon name="chevron-right" size="xs" variant="default" />
            <button 
              onClick={() => setCurrentStep(3)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                currentStep === 3 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-[10px]">3</span>
              <span>推荐与生成目录</span>
            </button>
            <Icon name="chevron-right" size="xs" variant="default" />
            <button 
              onClick={() => setCurrentStep(4)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                currentStep === 4 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span className="text-[10px]">4</span>
              <span>智能一键生成正文</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            标书预估体量: <strong className="text-slate-700">1,860 页</strong> | 消耗耗材: <strong className="text-slate-700">930,000字</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 视图分流展现仓 */}
      {/* ========================================================================= */}
      
      {currentStep === 3 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="catalog-recommending-screen">
          {/* 3.1 左侧推荐备选目录卡口 Panel (33% 栅格: 4 列) */}
          <div 
            className="lg:col-span-4 p-5 flex flex-col gap-4"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="flex items-start justify-between border-b pb-3 border-slate-100">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-850 flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-blue-600 rounded-sm inline-block"></span>
                  招标文件 目录推荐
                </h3>
                <p className="text-[11px] text-slate-400 font-normal">
                  系统基于大语言模型AI深度检索，建议加铺的招标文件核心章节：
                </p>
              </div>
              <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                AI 实时探地
              </span>
            </div>

            {/* 其他建议章节列表 */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {suggestedChapters.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-slate-200 rounded-lg bg-slate-50">
                  <div className="text-2xl text-slate-300">✓</div>
                  <h4 className="text-xs font-bold text-slate-500 mt-2">备选建议库已清空</h4>
                  <p className="text-[10px] text-slate-400 mt-1">推荐的所有章节均已载入主招标的大纲目录中。</p>
                </div>
              ) : (
                suggestedChapters.map((sug) => (
                  <div 
                    key={sug.id}
                    className="p-3.5 rounded-lg border border-slate-100 hover:border-blue-100 hover:bg-blue-50/10 transition-all flex flex-col gap-2.5 group"
                  >
                    <div className="flex items-start gap-2 justify-between">
                      <span className="text-xs font-semibold text-slate-800 leading-normal line-clamp-2">
                        {sug.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100/50">
                      <span className="text-[10px] text-slate-400 font-mono">
                        预计生成页数: ~{sug.pageEst} 页
                      </span>
                      <button
                        onClick={() => handleAddSuggestedToOutline(sug.id, sug.title)}
                        className="text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors flex items-center gap-1 active:scale-95"
                      >
                        <Icon name="plus" size="xs" variant="primary" />
                        添加至目录
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-2 p-3 bg-blue-50/30 rounded-lg border border-blue-100/30">
              <h5 className="text-[11px] font-bold text-blue-800 flex items-center gap-1">
                <Icon name="info" size="xs" variant="primary" />
                大纲匹配度提示
              </h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                当前大纲已精准适配「跨线桥梁、深基坑、沥青摊铺」高危施工专项标准，合格率评估：99.5%。
              </p>
            </div>
          </div>

          {/* 3.2 右侧我的标书大纲 Outline Panel (66% 栅格: 8 列) */}
          <div 
            className="lg:col-span-8 p-5 flex flex-col gap-4"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            {/* 顶排：标书目录信息条 */}
            <div className="p-4 bg-blue-50/50 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-blue-100/20">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Icon name="checkbox-checked" size="xs" variant="primary" />
                  我的标书目录大纲 (Active Outline)
                </div>
                <div className="text-[11px] text-slate-400">
                  若对现有目录大纲不满意，可尝试追加备选章、拖拽上下微调、亦可让 AI 一键重写大纲。
                </div>
              </div>
              <span className="text-[11px] font-extrabold bg-blue-600 text-white px-2.5 py-1 rounded-sm shadow-xs self-start sm:self-auto shrink-0 animate-pulse">
                全文预计 1860 页 / 约 930k 字
              </span>
            </div>

            {/* 核心大纲目录明细树 (TreeView) */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {chapters.map((ch, chIdx) => {
                const isActive = activeOutlineItemId === ch.id;
                return (
                  <div 
                    key={ch.id}
                    onClick={() => setActiveOutlineItemId(ch.id)}
                    className={`p-4 rounded-xl transition-all border cursor-pointer ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50/[0.04] ring-1 ring-blue-500 shadow-xs' 
                        : 'border-slate-100 hover:border-slate-200 bg-white'
                    }`}
                  >
                    {/* 章标题栏 */}
                    <div className="flex items-center justify-between gap-2 border-b pb-3 border-slate-100/60 mb-3">
                      <div className="flex items-center gap-2">
                        <Icon name="drag" size="sm" className="text-slate-300 cursor-grab active:cursor-grabbing" />
                        <span className="text-xs font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                          章
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-850">
                          {ch.title}
                        </h4>
                      </div>
                      
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                          预设 {ch.pages} 页 / ~{ch.words}字
                        </span>
                        <button 
                          onClick={() => {
                            const newTitle = prompt('编辑章标题', ch.title);
                            if (newTitle) {
                              setChapters(prev => prev.map(item => item.id === ch.id ? { ...item, title: newTitle } : item));
                            }
                          }}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600"
                        >
                          <Icon name="pencil" size="xs" variant="default" />
                        </button>
                        <button 
                          onClick={() => handleDeleteChapter(ch.id)}
                          className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600"
                        >
                          <Icon name="trash" size="xs" variant="default" />
                        </button>
                      </div>
                    </div>

                    {/* 节及子小节 */}
                    <div className="space-y-3.5 pl-6 border-l-2 border-slate-100">
                      {ch.sections.map((sec, secIdx) => (
                        <div key={sec.id} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                            <div className="flex items-center gap-1">
                              <span className="text-[9px] text-indigo-700 bg-indigo-50 px-1 rounded">节</span>
                              <span>{sec.title}</span>
                            </div>
                          </div>

                          {/* 细分子目 (如一、二、三、) */}
                          <div className="space-y-1.5 pl-4">
                            {sec.subsections.map((sub) => (
                              <div 
                                key={sub.id} 
                                className="text-xs text-slate-500 font-normal py-1 px-2.5 rounded bg-slate-50/70 border border-slate-100/40 flex items-center justify-between group hover:border-blue-100 hover:bg-white transition-all"
                              >
                                <span className="truncate">{sub.title}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newSubTitle = prompt('编辑子项标题', sub.title);
                                    if (newSubTitle) {
                                      setChapters(prev => prev.map(c => {
                                        if (c.id === ch.id) {
                                          return {
                                            ...c,
                                            sections: c.sections.map(s => {
                                              if (s.id === sec.id) {
                                                return {
                                                  ...s,
                                                  subsections: s.subsections.map(subItem => subItem.id === sub.id ? { ...subItem, title: newSubTitle } : subItem)
                                                };
                                              }
                                              return s;
                                            })
                                          };
                                        }
                                        return c;
                                      }));
                                    }
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-blue-600 transition-opacity"
                                >
                                  <Icon name="pencil" size="xs" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 大纲行内浮动控制栏与 AI 按钮 */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* 大纲节点位移操作 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMoveOutlineItem('up')}
                  disabled={!activeOutlineItemId}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:pointer-events-none rounded transition-colors flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Icon name="chevron-left" size="xs" className="rotate-90 text-slate-500" />
                  上移章
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveOutlineItem('down')}
                  disabled={!activeOutlineItemId}
                  className="px-3 py-1.5 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:pointer-events-none rounded transition-colors flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Icon name="chevron-left" size="xs" className="-rotate-90 text-slate-500" />
                  下移章
                </button>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <button
                  onClick={handleOptimizeOutline}
                  disabled={isOptimizingOutline}
                  className="px-3 py-1.5 text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-60 rounded font-bold transition-all flex items-center gap-1.5 select-none active:scale-95 cursor-pointer"
                >
                  {isOptimizingOutline ? (
                    <Icon name="loader" size="xs" spinning className="text-indigo-600" />
                  ) : (
                    <Icon name="ai" size="xs" variant="primary" />
                  )}
                  {isOptimizingOutline ? '正在深度强化...' : 'AI 优化提质'}
                </button>
              </div>

              {/* 确认目录一键跃迁至 Step 4 */}
              <button 
                onClick={() => {
                  setCurrentStep(4);
                }}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                style={{
                  borderRadius: tokens.borders.radiusMd,
                  transitionDuration: `${tokens.behaviors.motionDurationFast}ms`
                }}
              >
                <span>确认大纲并自动生成正文</span>
                <Icon name="chevron-right" size="xs" className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="generate-body-screen">
          {/* 4.1 左侧目录大纲栏 (25% 栅格: 3 列) */}
          <div 
            className="lg:col-span-3 p-4 flex flex-col gap-4"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="border-b pb-3 border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Icon name="settings" size="xs" variant="default" />
                正文生成排版大纲
              </h3>
            </div>

            {/* 配置操作面板 */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <button 
                onClick={() => alert('已全局统一页数设置规范，全文平均每章预设20页。')}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                设置页数
              </button>
              <button 
                onClick={() => alert('目录章节序号格式已设定为国标通用格式：第一、第一节、一、(一)。')}
                className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded text-[11px] font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                序号规范
              </button>
            </div>

            {/* AI一键全书生成主按钮 */}
            <button
              onClick={() => {
                alert('启动智能全文深度排版生产引擎：正在并行渲染54个段落，字数配比128,800字。完成后将自动填充全文。');
                setRemainingWords(prev => Math.max(0, prev - 12000));
              }}
              className="py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-1.5 select-none active:scale-95 cursor-pointer"
              style={{ borderRadius: tokens.borders.radiusMd }}
            >
              <Icon name="ai" size="xs" className="text-white" />
              <span>智能一键生成全文正文</span>
            </button>

            {/* 可供切换的目录节点列表 */}
            <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
              {chapters.map((ch) => (
                <div key={ch.id} className="space-y-1.5">
                  <div className="text-[11px] font-extrabold text-slate-800 bg-slate-50 p-1.5 rounded flex items-center justify-between">
                    <span className="truncate">{ch.title}</span>
                    <span className="text-[9px] text-slate-400 shrink-0 font-mono">
                      {ch.pages}页
                    </span>
                  </div>

                  <div className="pl-2 space-y-1">
                    {ch.sections.map((sec) => {
                      const isSelected = selectedSectionId === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleSelectSubchapter(sec.id, ch.id)}
                          className={`w-full text-left p-2 rounded text-[11px] font-semibold transition-all flex flex-col gap-0.5 relative group cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-50/60 border border-blue-250 text-blue-800' 
                              : 'hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span className="line-clamp-1">{sec.title}</span>
                          <span className="text-[9px] text-slate-400 font-mono">
                            字数：~4,500字
                          </span>
                          
                          {/* 悬停隐藏操作图标 (listHoverReveal 令牌支持) */}
                          <div className="hidden group-hover:flex items-center gap-1.5 absolute right-1.5 top-2 bg-white/90 p-0.5 rounded shadow-xs">
                            <Icon name="pencil" size="xs" variant="default" className="hover:text-blue-600" />
                            <Icon name="trash" size="xs" variant="default" className="hover:text-red-500" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto border-t pt-3 border-slate-100 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-ping"></span>
              <span className="text-[10px] text-slate-400 font-medium font-mono">
                AI 协作者在线: GPT-4o Plus
              </span>
            </div>
          </div>

          {/* 4.2 中间高保真富文本编辑器 (50% 栅格: 6 列) */}
          <div 
            className="lg:col-span-6 p-5 flex flex-col gap-4"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            {/* 编辑器顶部分区控制头 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3.5 border-slate-100">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
                  字数统计：{currentEditorText.length.toLocaleString()} 字
                </span>
                <h4 className="text-sm font-bold text-slate-850 flex items-center gap-1.5">
                  <span className="w-1.5 h-3 bg-blue-600 rounded-sm"></span>
                  正在高保真自主编辑中...
                </h4>
              </div>

              {/* AI重新生成与导出功能 */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    alert('正在重新深度生成契合本小节工程的文字，请稍候...');
                    setRemainingWords(prev => Math.max(0, prev - 2400));
                  }}
                  className="px-2.5 py-1.5 text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded transition-colors flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <Icon name="ai" size="xs" variant="primary" />
                  章节重写
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <button 
                  onClick={() => alert(`单节导出 Word 格式成功：${chapters.find(c => c.id === selectedChapterId)?.sections.find(s => s.id === selectedSectionId)?.title || ''}`)}
                  className="px-2.5 py-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <Icon name="download" size="xs" variant="default" />
                  导出单节
                </button>
              </div>
            </div>

            {/* 高仿标书正文排版模拟书写编辑器 */}
            <div className="flex-1 flex flex-col min-h-[380px] border border-slate-150 rounded-lg bg-slate-50/40 p-4">
              <textarea
                value={currentEditorText}
                onChange={(e) => setCurrentEditorText(e.target.value)}
                className="w-full flex-1 bg-transparent text-slate-800 text-xs font-normal leading-relaxed focus:outline-none resize-none font-sans whitespace-pre-wrap selection:bg-blue-100 select-all"
                placeholder="请输入标书节段正文..."
              />
            </div>

            {/* 底排控制，支持导出整份标书 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button 
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-150 hover:bg-slate-200 rounded transition-colors cursor-pointer"
              >
                上一步（修改大纲）
              </button>

              <button 
                onClick={() => {
                  alert(`《${projectName}》\n已成功生成！\n\n- 总理定大纲页数：1,860 页\n- 实际生成高密文字数：1,288,000 字\n\n我们正在为您打包成标准的 Word 目录格式与 PDF 排版格式下载，感谢享受智能建筑工作流！`);
                }}
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                style={{
                  borderRadius: tokens.borders.radiusMd,
                  transitionDuration: `${tokens.behaviors.motionDurationFast}ms`
                }}
              >
                <Icon name="download" size="xs" className="text-white" />
                <span>一键导出整份高标书 (Docx)</span>
              </button>
            </div>
          </div>

          {/* 4.3 右侧智能配图匹配 Panel (25% 栅格: 3 列) */}
          <div 
            className="lg:col-span-3 p-4 flex flex-col gap-4"
            style={{
              backgroundColor: tokens.colors.bgCard,
              borderRadius: tokens.borders.radiusLg,
              borderColor: tokens.colors.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="border-b pb-3 border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Icon name="ai" size="xs" variant="primary" />
                智能匹配推荐配图
              </h3>
            </div>

            {/* 搜图组件 */}
            <div className="relative">
              <input 
                type="text"
                placeholder="键入关键词检索图表、CAD技术平面..."
                value={imageSearchQuery}
                onChange={(e) => setImageSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border rounded-md bg-slate-50 focus:bg-white focus:outline-none transition-colors border-slate-200"
              />
              <div className="absolute left-2.5 top-2">
                <Icon name="search" size="xs" variant="default" />
              </div>
            </div>

            {/* 过滤筛选胶囊组 */}
            <div className="flex flex-wrap gap-1">
              {['全部', '施工现场', '技术细节', 'BIM三维图'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full border transition-all cursor-pointer ${
                    selectedTag === tag 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* 匹配推荐配图列表 */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
              {filteredImages.length === 0 ? (
                <div className="py-12 px-2 text-center rounded-lg border border-dashed border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center gap-2">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h5 className="text-[11px] font-bold text-slate-500">暂无符合检索的推荐配图</h5>
                  <p className="text-[9px] text-slate-400">大模型正在实时渲染相关CAD细节示意图...</p>
                </div>
              ) : (
                filteredImages.map((img) => {
                  const wasInserted = insertedImages.includes(img.title);
                  return (
                    <div 
                      key={img.id}
                      className="p-2 border border-slate-150 rounded-lg group hover:border-blue-200 hover:bg-blue-50/5 transition-all flex flex-col gap-2 bg-white"
                    >
                      <div className="aspect-video relative overflow-hidden rounded-md bg-slate-100">
                        <img 
                          src={img.url} 
                          alt={img.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute left-1 px-1.5 py-0.2 rounded bg-indigo-600/80 text-white text-[8px] font-bold top-1">
                          {img.tag}
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <h5 className="text-[10px] font-extrabold text-slate-800 line-clamp-2 leading-tight">
                          {img.title}
                        </h5>
                        <p className="text-[9px] text-slate-400">施工方案必备插图，点击下方一键内嵌引用</p>
                      </div>

                      <button
                        onClick={() => handleInsertImageToEditor(img.title)}
                        className={`w-full py-1 text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors active:scale-95 ${
                          wasInserted 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                        }`}
                      >
                        {wasInserted ? (
                          <>
                            <Icon name="check" size="xs" className="text-white" />
                            <span>再度插入其引用</span>
                          </>
                        ) : (
                          <>
                            <Icon name="upload" size="xs" variant="primary" />
                            <span>一键插入本节正文</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* 实用的配图插入操作指引说明 */}
            <div className="mt-auto p-2.5 bg-indigo-50/50 rounded-lg border border-indigo-100/20 text-[10px] text-slate-500 leading-normal">
              配图在导出时将自适应 Word 页面中线，自动生成标准图题与说明，保证符合市政工程设计规范标准。
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidBuilderView;
