/* ============================================================
   六爻案例库 · 数据层（脱敏公开镜像）
   唯一数据源：本地 Markdown 库；本文件由同步流程生成/更新
   最后同步：2026-08-14
   ============================================================ */

const SITE = {
  title: '六爻案例库',
  subtitle: '断卦 · 复盘 · 进化 —— 可视化看板',
  updated: '2026-08-14',
  stats: {
    total: 5, right: 3.5, wrong: 1.5, acc: 70,
    categories: [
      { name: '射覆', count: 2, right: 1, wrong: 1, acc: '50%' },
      { name: '失物', count: 2, right: 1.5, wrong: 0.5, acc: '75%' },
      { name: '财运', count: 1, right: 1, wrong: 0, acc: '100%' },
      { name: '其他', count: 1, right: 0, wrong: 0, acc: '待验证' },
      { name: '婚姻/疾病/行人/官非/天气', count: 0, right: 0, wrong: 0, acc: '—' },
    ]
  },
  calibration: [
    { id: 'Case-001', cat: '射覆', conf: null, result: '错', note: '高置信犯错——警示逆推危害' },
    { id: 'Case-002', cat: '失物', conf: 70, result: '半对', note: '结论对（找到）合理；场所、应期错——细节推演需降置信' },
    { id: 'Case-003', cat: '射覆', conf: 75, result: '对', note: '多象6票汇聚，置信合理；化兄信号已正确定位为容器象' },
    { id: 'Case-004', cat: '财运', conf: 85, result: '对', note: '财空+兄弟持世双重否定信号叠加，高置信合理' },
    { id: 'Case-005', cat: '失物', conf: 75, result: '对', note: '结论/位置/形态全对；方位错，应期半对——细节推演仍须降置信' },
  ],
};

/* ---------- 流程 ---------- */
const FLOW = {
  steps: [
    { n: 1, t: '分类路由', d: '按问事内容归入射覆/失物/财运等分类，一卦只入一类' },
    { n: 2, t: '读库', d: '读总索引 → 定位分类案例库 → 应用纠偏规则' },
    { n: 3, t: '取象', d: '先查《取象速查表》，不足再翻典籍；涉定象先读核心方法论' },
    { n: 4, t: '断卦', d: '多象汇聚投票；平票或置信度低按《通用断卦细则》处理' },
    { n: 5, t: '附断', d: '除本问外必附"近事断验"段，分别记分' },
    { n: 6, t: '入库', d: '备份 → 录入 → 更新看板 → 简报' },
  ],
  loop: ['归因分析', '正确取象复盘', '提炼规则（三查）', '入分类错题本'],
  loopName: '断错必复盘 · 四件套',
};

/* ---------- 规则库 ---------- */
const RULES = [
  { id: 'R1', status: '生效', cat: '射覆', text: '动爻化的六亲是第一优先级信号：化子孙先想玩具娱乐之物，不要绕过它去套其他象', from: 'Case-001' },
  { id: 'R2', status: '生效', cat: '射覆', text: '五行先取"形状/性质"再取"材质"：酉金首先是方形有棱的硬物；现代塑料制品以形论金', from: 'Case-001' },
  { id: 'R3', status: '生效', cat: '射覆', text: '螣蛇发动优先取"变化、翻转、令人惊奇"之义，"弯曲缠绕"是次选', from: 'Case-001' },
  { id: 'R4', status: '生效', cat: '射覆', text: '本卦大象（上下卦组合）描述使用方式：艮为手为硬块、巽为工巧反复 → 以手运巧之物', from: 'Case-001' },
  { id: 'R5', status: '生效', cat: '射覆', text: '卦名含义常有直点：蛊=复原整饬；蒙=覆盖蒙蔽', from: 'Case-001' },
  { id: 'R6', status: '生效', cat: '射覆', text: '警惕"逆推陷阱"：不得先锚定候选物再找象；各步独立取象后汇聚投票', from: 'Case-001' },
  { id: 'R7', status: '假设', cat: '射覆', text: '化兄弟回头生动爻时，兄弟象"容器/包装/开口"而非否定动爻本象', from: 'Case-003' },
  { id: 'R8', status: '生效', cat: '失物', text: '用神父母两现（多现）时分工取象：一爻为物品本体，另一爻为所处环境，不可只用一爻兼断全部', from: 'Case-002' },
  { id: 'R9', status: '生效', cat: '失物', text: '环境父母之六神定场所：白虎=医院/道路；玄武=暗处/水边/电子设备；勾陈=老旧建筑；螣蛇=复杂缠绕之地', from: 'Case-002' },
  { id: 'R10', status: '生效', cat: '失物', text: '官鬼生用神 = 物品落在"官鬼所象之地"并被该处收留；官鬼旺而两现，场所与疾病医药官方相关', from: 'Case-002' },
  { id: 'R11', status: '生效', cat: '失物', text: '用神之下伏子孙 = 被人拾得收存（子孙=医生/拾遗归还者）；伏神逢冲得出之日即现身归还', from: 'Case-002' },
  { id: 'R12', status: '生效', cat: '失物', text: '位置推断优先级：环境六神+卦位（大场所）＞用神五行类象（周边质地）＞爻位高低（局部）', from: 'Case-002' },
  { id: 'R13', status: '生效', cat: '财运', text: '财空求财不得：妻财逢空主无所得，两财皆空信号倍增，可直断不得（★★★★★）', from: 'Case-004' },
  { id: 'R14', status: '生效', cat: '财运', text: '兄弟持世求财不遂：自身带劫财之气，与财空并见则双重否定（★★★★★）', from: 'Case-004' },
  { id: 'R15', status: '假设', cat: '财运', text: '三合局因用神空而破：吉象转虚——看似有机会实则落空，彩票投机类尤验', from: 'Case-004' },
  { id: 'R16', status: '假设', cat: '失物', text: '随身日用小物（钥匙等）可取妻财为用神：证件文书类取父母，日用财物类取财爻', from: 'Case-005' },
  { id: 'R17', status: '假设', cat: '失物', text: '应期兼看"日辰合官鬼/用神"：先查起卦日辰本身的冲合值，再推远日（冲合值三法并查）', from: 'Case-005' },
];

/* ---------- 白话注释词表 ---------- */
const GLOSSARY = {
  '妻财': '六亲之一，代表财物、饮食、我所使用掌控之物。占失物时多为日用物品；占求财时为钱财本身。',
  '官鬼': '六亲之一，代表官事、疾病、忧患、约束。失物占中常作"失物去向的线索爻"；亦主令人不安之处。',
  '父母': '六亲之一，代表文书证件、房屋车辆、衣物包袋、覆盖保护之物。失物占中常取为证件类用神或"环境爻"。',
  '兄弟': '六亲之一，代表同辈、竞争、劫财耗财。求财最忌；射覆中象"多孔、多部件、容器开口"。',
  '子孙': '六亲之一，代表福德、医药、解忧、玩乐之物；失物占中为"拾遗归还者、好心人"。',
  '世爻': '代表问卦人自身的爻位。世临何六亲、动静旺衰，皆与求测人直接相关。',
  '应爻': '代表对方/所问之事/物之所在的爻位，与世爻相对。',
  '动爻': '起卦时老阳（○）老阴（×）之爻，是全卦变化的核心信号，动则化出变爻。',
  '伏神': '卦中不现、藏于某爻（飞神）之下的六亲。伏=被遮盖、暗中；逢冲合值日可"得出"而显。',
  '空亡': '旬空之爻，主虚、无、暂不见。但"动不为空"，空亡本身也是象：中空、内藏、藏而不露。',
  '六合': '卦形的一种，主和合、合住、收存。失物遇六合多主物被"合住"未外流。',
  '六冲': '卦形的一种，主冲开、散动、分离。六冲变六合常象"封口待开"。',
  '六神': '青龙/朱雀/勾陈/螣蛇/白虎/玄武，按日起于初爻，赋予各爻"性质色彩"。',
  '纳甲': '将天干地支配入卦爻的装卦法，如"辛卯""己亥"，用于定五行生克。',
  '卦身': '代表所占之事本体的爻位；射覆中"卦身落动爻"是定位物品的强信号。',
  '驿马': '神煞，主移动、交通、常动之物。',
  '桃花': '神煞，主美观装饰、人缘、情感之事。',
  '月建': '月令地支，衡量爻之旺衰的第一权重。',
  '日辰': '占日地支，与爻的冲合值刑常定应期。',
  '应期': '断语应验的时间。取法：动爻值日/逢合、空亡出空/冲空、用神逢冲逢值等，取最近者。',
  '回头生': '动爻化出的变爻反生动爻，动爻得助力更强。',
  '回头克': '动爻化出的变爻反克动爻，动爻受伤。',
  '暗动': '静爻逢日辰相冲而暗中发动，力量次于明动。',
  '三合局': '申子辰合水等三支成局，主势力汇聚；若其中关键爻空亡则局破，吉象转虚。',
  '进神': '动爻化出同五行而更进一位的地支（如未化戌），主事情向前推进。',
  '用神': '占断的核心爻：问何事先定何六亲为用，旺衰动静定吉凶。',
  '射覆': '古代猜物游戏演变来的占法：覆盖一物，起卦猜之。是最考验取象功力的门类。',
  '纠偏规则': '从断错案例复盘中提炼的"下次必先检查"条款，编号 R1–R17，断卦前逐条对照。',
};

/* ---------- 案例 ---------- */
/* lines 自上而下（上爻→初爻）。yang:true 阳爻 false 阴爻；move:'o'/'x' 动爻；bian 变出爻 */
const CASES = [
  {
    id: 'Case-005', cat: '失物', date: '2026-08-14', result: '对', score: 1,
    title: '寻找车钥匙',
    question: '车钥匙不见了，去哪里了？',
    time: '丙午年 丙申月 丙辰日 癸巳时',
    kong: '子丑', shensha: '驿马寅 · 桃花酉 · 禄神巳',
    benName: '风火家人', benGong: '巽宫 · 三世',
    bianName: '地天泰', bianGong: '坤宫 · 六合',
    lines: [
      { god: '青龙', rel: '兄弟', gz: '辛卯', el: '木', yang: true, move: 'o', bian: { rel: '官鬼', gz: '癸酉', el: '金', yang: false } },
      { god: '玄武', rel: '子孙', gz: '辛巳', el: '火', yang: true, move: 'o', ying: true, bian: { rel: '父母', gz: '癸亥', el: '水', yang: false } },
      { god: '白虎', rel: '妻财', gz: '辛未', el: '土', yang: false, bian: { rel: '妻财', gz: '癸丑', el: '土', yang: false } },
      { god: '腾蛇', rel: '父母', gz: '己亥', el: '水', yang: true, fu: '官鬼 辛酉', bian: { rel: '妻财', gz: '甲辰', el: '土', yang: true } },
      { god: '勾陈', rel: '妻财', gz: '己丑', el: '土', yang: false, move: 'x', shi: true, kong: true, bian: { rel: '兄弟', gz: '甲寅', el: '木', yang: true } },
      { god: '朱雀', rel: '兄弟', gz: '己卯', el: '木', yang: true, bian: { rel: '父母', gz: '甲子', el: '水', yang: true } },
    ],
    duanyu: [
      { t: '能找到：变六合+地天泰，物未外流，必在身边', ok: true },
      { t: '自己随手放置遗忘：世爻临财发动化兄弟', ok: true },
      { t: '被遮盖夹藏于容器夹层：官鬼伏父母下+腾蛇+六合', ok: true },
      { t: '位置候选：车内缝隙＞包袋衣袋夹层＞抽屉柜缝——第二候选命中', ok: true },
      { t: '方位西或东北、低处', ok: false },
      { t: '应期丑/未/酉日——未中；但"近则当天"提示命中（当日丙辰日找到）', ok: 'half' },
    ],
    resultText: '起卦当日（丙辰日）癸巳时起卦后不久，在自己椅背挂着的书包里找到。',
    review: '应期真机制：日辰辰土合变爻官鬼酉金（辰酉合），线索当日被合出。教训：父母之"包袋容器"象与"车"象要平等排队；应期冲、合、值三法并查；爻位读位置前先看世爻是否只表"经手"。',
    newRules: ['R16', 'R17'],
  },
  {
    id: 'Case-002', cat: '失物', date: '2026-08-12', result: '半对', score: 0.5,
    title: '寻找证件',
    question: '证件丢失，丢在哪、能否找到？',
    time: '丙午年 乙未月 癸丑日 庚申时',
    kong: '寅卯', shensha: '（静卦，六爻安静）',
    benName: '天地否', benGong: '乾宫 · 六合',
    bianName: null, bianGong: null,
    lines: [
      { god: '白虎', rel: '父母', gz: '壬戌', el: '土', yang: true, ying: true },
      { god: '腾蛇', rel: '兄弟', gz: '壬申', el: '金', yang: true },
      { god: '勾陈', rel: '官鬼', gz: '壬午', el: '火', yang: true },
      { god: '朱雀', rel: '妻财', gz: '乙卯', el: '木', yang: false, shi: true, kong: true },
      { god: '青龙', rel: '官鬼', gz: '乙巳', el: '火', yang: false },
      { god: '玄武', rel: '父母', gz: '乙未', el: '土', yang: false, fu: '子孙 甲子' },
    ],
    duanyu: [
      { t: '能找到：六合静卦，物被收存未外流', ok: true },
      { t: '位置断为"家中衣物堆/包夹层等低暗处"', ok: false },
      { t: '应期断寅卯日或午未日', ok: false },
    ],
    resultText: '丙辰日在医疗机构的自助设备处找到，被工作人员捡到收存。',
    review: '漏读应爻父母戌土临白虎（=医药场所）这一场所信号；官鬼两现生父母未加利用；用神下伏子孙未解出"拾遗者收存"。教训：父母两现要分工（本体+环境），子孙伏下是拾者，官鬼生用是病地，应期兼看双用神。产出 R8–R12。',
    newRules: ['R8', 'R9', 'R10', 'R11', 'R12'],
  },
  {
    id: 'Case-004', cat: '财运', date: '2026-08-11', result: '对', score: 1,
    title: '彩票能否中奖',
    question: '刮彩票能不能中？（偏财类）',
    time: '丙午年 丙申月 丁巳日 戊申时',
    kong: '子丑', shensha: '月建申金子孙当令',
    benName: '山天大畜', benGong: '艮宫 · 三世',
    bianName: '山火贲', bianGong: '艮宫 · 六合',
    lines: [
      { god: '青龙', rel: '官鬼', gz: '丙寅', el: '木', yang: true, bian: { rel: '官鬼', gz: '丙寅', el: '木', yang: true } },
      { god: '玄武', rel: '妻财', gz: '丙子', el: '水', yang: false, kong: true, bian: { rel: '妻财', gz: '丙子', el: '水', yang: false, ying: true } },
      { god: '白虎', rel: '兄弟', gz: '丙戌', el: '土', yang: false, bian: { rel: '兄弟', gz: '丙戌', el: '土', yang: false } },
      { god: '腾蛇', rel: '兄弟', gz: '甲辰', el: '土', yang: true, shi: true, bian: { rel: '妻财', gz: '己亥', el: '水', yang: true } },
      { god: '勾陈', rel: '官鬼', gz: '甲寅', el: '木', yang: true, move: 'o', bian: { rel: '兄弟', gz: '己丑', el: '土', yang: false, kong: true, shi: true } },
      { god: '朱雀', rel: '妻财', gz: '甲子', el: '水', yang: true, kong: true, bian: { rel: '官鬼', gz: '己卯', el: '木', yang: true } },
    ],
    duanyu: [
      { t: '财空则无所求：两妻财子水皆逢日空（R13 首验）', ok: true },
      { t: '兄弟持世莫求财：世临辰土兄弟（R14 首验）', ok: true },
      { t: '申子辰三合财局因子水空而破，吉象转虚（R15）', ok: true },
      { t: '贲者虚华：外表光鲜内里空，恰如彩票', ok: true },
    ],
    resultText: '反馈：确实没中。✅',
    review: '财空+兄弟持世双重否定叠加，结论果断正确；"差点就中"的三合局破象意精准对应彩票心理。遗漏：未附近事断验段，下次须补。',
    newRules: ['R13', 'R14', 'R15'],
  },
  {
    id: 'Case-003', cat: '射覆', date: '2026-08-14', result: '对', score: 1,
    title: '射覆 · 罐装饮品',
    question: '所覆何物？（候选：硬币/可乐/玩具/牙签/手机）',
    time: '丙午年 丙申月 己未日 癸酉时',
    kong: '子丑', shensha: '卦身亥 · 驿马巳 · 桃花子',
    benName: '兑为泽', benGong: '兑宫 · 六冲',
    bianName: '水泽节', bianGong: '坎宫 · 六合',
    lines: [
      { god: '白虎', rel: '父母', gz: '丁未', el: '土', yang: false, shi: true, bian: { rel: '子孙', gz: '戊子', el: '水', yang: false } },
      { god: '玄武', rel: '兄弟', gz: '丁酉', el: '金', yang: true, bian: { rel: '父母', gz: '戊戌', el: '土', yang: true } },
      { god: '青龙', rel: '子孙', gz: '丁亥', el: '水', yang: true, move: 'o', bian: { rel: '兄弟', gz: '戊申', el: '金', yang: false } },
      { god: '朱雀', rel: '父母', gz: '丁丑', el: '土', yang: false, ying: true, kong: true, bian: { rel: '父母', gz: '丁丑', el: '土', yang: false } },
      { god: '勾陈', rel: '妻财', gz: '丁卯', el: '木', yang: true, bian: { rel: '妻财', gz: '丁卯', el: '木', yang: true } },
      { god: '腾蛇', rel: '官鬼', gz: '丁巳', el: '火', yang: true, bian: { rel: '官鬼', gz: '丁巳', el: '火', yang: true } },
    ],
    duanyu: [
      { t: '卦身亥恰落动爻：本体直接锁定动爻亥水', ok: true },
      { t: '亥=中空内藏流质、瓶装液体', ok: true },
      { t: '青龙临动爻=酒食饮品；纯兑=口、饮食器、甜味', ok: true },
      { t: '六冲变六合=封口待开的封装物；化兄=拉罐瓶口包装', ok: true },
    ],
    resultText: '断"可乐"✅，开覆确为罐装可乐。置信度 75%。',
    review: '多象 6 票汇聚。化兄弟回头生第一次被正确定位为"容器/包装"象，提炼 R7【假设】。',
    newRules: ['R7'],
  },
  {
    id: 'Case-001', cat: '射覆', date: '2026-08-11', result: '错', score: 0,
    title: '射覆 · 魔方案',
    question: '所覆何物？（候选：魔方/茶杯/苹果/抽纸/眼镜）',
    time: '丙午年 丙申月 丁巳日 己酉时',
    kong: '子丑', shensha: '卦身寅 · 驿马亥 · 桃花午',
    benName: '山风蛊', benGong: '巽宫 · 归魂',
    bianName: '山水蒙', bianGong: '离宫',
    lines: [
      { god: '青龙', rel: '兄弟', gz: '丙寅', el: '木', yang: true, ying: true, bian: { rel: '兄弟', gz: '丙寅', el: '木', yang: true } },
      { god: '玄武', rel: '妻财', gz: '丙子', el: '水', yang: false, bian: { rel: '妻财', gz: '丙子', el: '水', yang: false } },
      { god: '白虎', rel: '兄弟', gz: '丙戌', el: '土', yang: false, bian: { rel: '兄弟', gz: '丙戌', el: '土', yang: false } },
      { god: '腾蛇', rel: '官鬼', gz: '辛酉', el: '金', yang: true, shi: true, move: 'o', bian: { rel: '子孙', gz: '戊午', el: '火', yang: true } },
      { god: '勾陈', rel: '父母', gz: '辛亥', el: '水', yang: true, fu: '子孙 辛巳', bian: { rel: '官鬼', gz: '戊辰', el: '土', yang: true } },
      { god: '朱雀', rel: '妻财', gz: '辛丑', el: '土', yang: false, bian: { rel: '子孙', gz: '戊寅', el: '木', yang: false } },
    ],
    duanyu: [
      { t: '断为"眼镜"——见酉金锚定金属镜框（逆推）', ok: false },
      { t: '螣蛇只取"弯曲缠绕"（镜腿），漏"变化翻转"主象', ok: false },
      { t: '动化子孙午火（玩具娱乐定大类）信号被浪费', ok: false },
    ],
    resultText: '正确答案：魔方。高置信犯错。',
    review: '酉=方形棱角（魔方立方体）、螣蛇=千变万化、化子孙=玩具、艮+巽=以手运巧、蛊=复原。本案是全库"逆推陷阱"的奠基错题，产出 R1–R6。',
    newRules: ['R1', 'R2', 'R3', 'R4', 'R5', 'R6'],
  },
  {
    id: 'Case-003（外应）', cat: '其他', date: '2026-08-12', result: '待验证', score: null,
    title: '外应课 · 白蝶入发',
    question: '骑行途中一白底黑斑蝴蝶迎面飞来钻入头发不出，拨发后飞走——主何事？',
    time: '丙午年 丙申月 戊午日 庚申时',
    kong: '子丑', shensha: '干支象义课 + 物象起卦双轨',
    benName: '泽风大过', benGong: '震宫 · 游魂',
    bianName: '天风姤', bianGong: '乾宫',
    lines: [
      { god: '朱雀', rel: '妻财', gz: '丁未', el: '土', yang: false, move: 'o', bian: { rel: '妻财', gz: '壬戌', el: '土', yang: true } },
      { god: '青龙', rel: '官鬼', gz: '丁酉', el: '金', yang: true, bian: { rel: '兄弟', gz: '壬申', el: '金', yang: true } },
      { god: '玄武', rel: '父母', gz: '丁亥', el: '水', yang: true, shi: true, bian: { rel: '子孙', gz: '壬午', el: '火', yang: false } },
      { god: '白虎', rel: '官鬼', gz: '辛酉', el: '金', yang: true, bian: { rel: '官鬼', gz: '辛酉', el: '金', yang: true } },
      { god: '腾蛇', rel: '父母', gz: '辛亥', el: '水', yang: true, bian: { rel: '父母', gz: '辛亥', el: '水', yang: true } },
      { god: '勾陈', rel: '妻财', gz: '辛丑', el: '土', yang: false, ying: true, kong: true, bian: { rel: '妻财', gz: '辛丑', el: '土', yang: false } },
    ],
    duanyu: [
      { t: '朱雀财动化进+日合：近 1–3 日有音讯/邀约/财物饮食桃花相关喜讯', ok: 'pending' },
      { t: '用克体+官鬼两现：喜讯伴小压力；互卦双乾涉正式之事', ok: 'pending' },
      { t: '金旺克体木：注意头面呼吸道睡眠（"灭顶"或应头部之事）', ok: 'pending' },
      { t: '游魂变姤：外出途中转遇好事', ok: 'pending' },
    ],
    resultText: '⏳ 待验证（验证窗口 7 日内）',
    review: '干支象义课（壬戌柱叠象法）+ 淳于智物象起卦法双轨互证的外应课案例。待反馈后补记并纳入置信度校准。',
    newRules: [],
  },
];

/* ---------- 附录 ---------- */
const APPENDIX = [
  { file: 'appendix/取象定象核心方法论.md', name: '取象定象核心方法论', desc: '梅花系第一方法论：三易总纲、体用太极观、三步流程、七大铁律' },
  { file: 'appendix/取象速查表.md', name: '取象速查表', desc: '干支/六亲/六神/八卦万物类象速查' },
  { file: 'appendix/通用断卦细则.md', name: '通用断卦细则', desc: '特殊卦形处理、录入模板、近事断验、备份纪律' },
  { file: 'appendix/干支象义外应起课法.md', name: '干支象义外应起课法', desc: '外应起课全流程：事件→干支叠柱→物象起卦→双轨解读' },
];
