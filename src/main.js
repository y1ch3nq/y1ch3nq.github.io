import "./styles.css";
import { initCatScene, initWalkmanScene, initPianoScene } from "./scenes.js";

const translations = {
  zh: {
    navEducation: "教育",
    navExperience: "实习经历",
    navProjects: "项目",
    navSkills: "技能",
    navResume: "简历",
    navContact: "联系",
    heroEyebrow: "传播 · 产品 · 媒体",
    heroHello: "你好，我是",
    heroRole: "传播学学生 & 产品导向的创作者",
    heroStatement: "我将受众与市场洞察转化为产品概念、工作流工具和跨平台内容策略，在产品、媒体与技术的交叉处，打造实用且以用户为中心的数字体验。",
    exploreWork: "查看精选项目",
    catInstruction: "拖动猫头旋转",
    waterTitle: "触碰水面。",
    waterCopy: "划出涟漪、移动球体，观察光线穿过水面。推荐使用支持 WebGPU 的浏览器体验。",
    waterHint: "点击 · 拖动 · 涟漪",
    waterCredit: "水体实验由 Evan Wallace 创作，jeantimex 移植 · MIT License",
    sectionEducation: "教育",
    educationKicker: "知识基础",
    educationTitle: "理解思想如何影响人。",
    degree: "传播学文学学士",
    courseLabel: "相关课程",
    courseOne: "传播与科技",
    courseTwo: "人文探究研讨课",
    expected: "预计毕业",
    gradDate: "2029 年 5 月",
    sectionExperience: "实习经历",
    experienceKicker: "从内容到系统",
    experienceTitle: "发现摩擦，设计更好的流程。",
    currentRole: "当前职位",
    present: "至今",
    roleTitle: "内容运营实习生",
    roleOverview: "为 Viza、The Aidols 和 Vanso 等全球音乐与娱乐产品提供 AI 辅助内容制作、工作流开发和多语言发布支持。",
    contentProduction: "内容制作",
    contentProductionCopy: "为 TikTok、Instagram 和 YouTube 策划、制作并发布短视频，覆盖创意构思、素材生成、视觉筛选、剪辑、文案与发布全流程。",
    viewsProof: "次播放 · 16 条短视频 · 约 200 个制作素材",
    workflowDevelopment: "工作流与产品开发",
    workflowDevelopmentCopy: "把反复出现的制作痛点转化为 Prompt Factory 和 LRC Visualizer；通过 AI 辅助开发，负责问题定义、产品逻辑、界面决策、测试与迭代。",
    workflowProof: "提示词工作量减少 · 歌词视频手工剪辑从约 30 分钟缩短至 1–3 分钟",
    globalOperations: "全球内容运营",
    globalOperationsCopy: "支持多语言内容发布、英文文案审核、推送通知、冷启动活动、定时轮询、审批流程和发布配置。",
    operationsProof: "项发布与配置任务 · 4 个海外平台账号",
    relatedWork: "相关项目",
    sectionProjects: "项目",
    projectsKicker: "精选作品",
    projectsTitle: "可使用的产品，可行动的策略。",
    projectsIntro: "一组聚焦实用网页工具、受众策略与媒体研究的作品。",
    walkmanInstruction: "点击 3D 按键或下方控制键",
    jumpProject: "跳转到项目",
    productCategory: "产品与网页项目",
    lrcDescription: "一款浏览器端歌词视频制作工具，把音频、时间轴歌词、字体、色彩、版式和导出控制整合进同一个可定制工作流。",
    roleLabel: "职责",
    lrcRole: "产品定义 · 工作流设计 · 界面规划 · 测试与迭代",
    viewCaseStudy: "查看项目详解",
    promptDescription: "一款浏览器端提示词组装工具，将可复用的场景、人物、动作、镜头与风格输入组合成用于 AI 视频制作的结构化提示词。",
    problemLabel: "问题",
    promptProblem: "重复编写提示词、输出格式不一致，局部修改效率低。",
    decisionLabel: "决策",
    promptDecision: "把提示词拆分为可调整组件，为复用和批量制作而设计。",
    outcomeLabel: "结果",
    promptOutcome: "提示词开发时间从约 3–4 分钟缩短到约 1 分钟。",
    strategyCategory: "营销与媒体策略",
    hiphopTitle: "跨文化 Hip-Hop 艺人发展企划",
    hiphopDescription: "以华裔、印裔离散身份与夏威夷移民史为基础，构建兼顾文化真实性与商业潜力的 Hip-Hop 双人组合概念。",
    projectType: "项目类型",
    hiphopType: "艺人发展与营销提案 · 13 人团队",
    hiphopPointOne: "目标受众：第二代亚裔离散群体听众",
    hiphopPointTwo: "文化定位、视觉方向、推广策略与商业可行性",
    researchTitle: "女性流行艺人媒体与公关叙事分析",
    researchDescription: "分析女性流行艺人在传记片与纪录片中的形象建构，重点关注受害化、性化、宣传和声誉风险。",
    methodLabel: "研究方法",
    researchMethod: "定性内容分析 + 定量编码",
    researchPointOne: "2000—2024 年发行的 10 部艺人传记片与纪录片",
    researchPointTwo: "重点比较《Amy》与《Back to Black》",
    sectionSkills: "技能",
    skillsKicker: "一件工作的乐器",
    skillsTitle: "不同琴键，同一套完整方法。",
    skillsIntro: "点击钢琴键，浏览我在产品与媒体工作中组合运用的能力。",
    pianoInstruction: "点击琴键 · 声音已开启",
    nowPlaying: "正在播放",
    contactKicker: "保持联系",
    contactTitle: "对产品、媒体与创意科技感兴趣？",
    contactCopy: "欢迎来信，也很期待听听你正在做什么。",
    linkedinPlaceholder: "LinkedIn · 即将补充",
    resumeRequest: "简历 · 邮件索取",
    footerLine: "以秩序设计 · 以好奇心构建",
    backTop: "回到顶部",
  },
};

const tracks = [
  {
    title: { en: "LRC Visualizer", zh: "LRC Visualizer" },
    category: { en: "PRODUCT & WEB PROJECTS", zh: "产品与网页项目" },
    description: {
      en: "A browser-based lyric-video production tool that turns a repetitive editing workflow into a flexible, customizable system.",
      zh: "一款浏览器端歌词视频制作工具，把重复的剪辑步骤转化为灵活、可定制的制作系统。",
    },
    target: "lrc-project",
  },
  {
    title: { en: "Prompt Factory", zh: "Prompt Factory" },
    category: { en: "PRODUCT & WEB PROJECTS", zh: "产品与网页项目" },
    description: {
      en: "A modular prompt assembly tool designed around reuse, consistent formats, and faster partial revisions.",
      zh: "围绕复用、格式一致性和快速局部修改而设计的模块化提示词组装工具。",
    },
    target: "prompt-project",
  },
  {
    title: { en: "Cross-Cultural Hip-Hop", zh: "跨文化 Hip-Hop 艺人企划" },
    category: { en: "MARKETING & MEDIA STRATEGY", zh: "营销与媒体策略" },
    description: {
      en: "An artist-development pitch connecting diasporic identity, audience psychology, visual direction, and commercial potential.",
      zh: "一份连接离散身份、受众心理、视觉方向与商业潜力的艺人发展提案。",
    },
    target: "hiphop-project",
  },
  {
    title: { en: "Media & PR Narratives", zh: "媒体与公关叙事研究" },
    category: { en: "MARKETING & MEDIA STRATEGY", zh: "营销与媒体策略" },
    description: {
      en: "Mixed-methods research on how commercial media constructs female pop artists—and the reputation risks that follow.",
      zh: "研究商业媒体如何建构女性流行艺人形象，以及由此产生的声誉风险。",
    },
    target: "research-project",
  },
];

const skills = [
  {
    title: { en: "Product & Strategy", zh: "产品与策略" },
    items: {
      en: ["Product concept development", "User and market research", "Workflow design", "Audience analysis", "Marketing strategy", "Media and PR analysis"],
      zh: ["产品概念开发", "用户与市场研究", "工作流设计", "受众分析", "营销策略", "媒体与公关分析"],
    },
  },
  {
    title: { en: "AI & Automation", zh: "AI 与自动化" },
    items: {
      en: ["AI-assisted workflow development", "Codex", "AI-assisted web prototyping", "Prompt-system design", "AI image and video generation"],
      zh: ["AI 辅助工作流开发", "Codex", "AI 辅助网页原型", "提示词系统设计", "AI 图像与视频生成"],
    },
  },
  {
    title: { en: "Creative & Production", zh: "创意与制作" },
    items: {
      en: ["Adobe Premiere Pro", "Final Cut Pro", "Canva", "Content production", "Editorial planning"],
      zh: ["Adobe Premiere Pro", "Final Cut Pro", "Canva", "内容制作", "编辑策划"],
    },
  },
  {
    title: { en: "Productivity", zh: "效率工具" },
    items: {
      en: ["Microsoft Excel", "Microsoft PowerPoint", "Microsoft Word", "GitHub"],
      zh: ["Microsoft Excel", "Microsoft PowerPoint", "Microsoft Word", "GitHub"],
    },
  },
  {
    title: { en: "Languages", zh: "语言" },
    items: {
      en: ["Mandarin Chinese — Native", "English — Fluent; TOEFL 112", "Korean — Elementary"],
      zh: ["中文 — 母语", "英语 — 流利；TOEFL 112", "韩语 — 初级"],
    },
  },
];

let language = "en";
let activeTrack = 0;
let activeSkill = 0;

function renderTrack() {
  const track = tracks[activeTrack];
  document.querySelector("#track-number").textContent = String(activeTrack + 1).padStart(2, "0");
  document.querySelector("#track-category").textContent = track.category[language];
  document.querySelector("#track-title").textContent = track.title[language];
  document.querySelector("#track-description").textContent = track.description[language];
  document.querySelector("#track-link").href = `#${track.target}`;
}

function changeTrack(direction) {
  activeTrack = (activeTrack + direction + tracks.length) % tracks.length;
  renderTrack();
}

function openTrack() {
  document.getElementById(tracks[activeTrack].target)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderSkill(index = activeSkill) {
  activeSkill = Number(index);
  const skill = skills[activeSkill];
  document.querySelector("#skill-index").textContent = `${String(activeSkill + 1).padStart(2, "0")} / 05`;
  document.querySelector("#skill-title").textContent = skill.title[language];
  document.querySelector("#skill-list").innerHTML = skill.items[language].map((item) => `<li>${item}</li>`).join("");
  document.querySelectorAll("[data-skill]").forEach((button) => button.classList.toggle("active", Number(button.dataset.skill) === activeSkill));
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  document.body.classList.toggle("language-zh", next === "zh");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (next === "zh" && translations.zh[key]) {
      element.textContent = translations.zh[key];
    } else if (element.dataset.originalText) {
      element.textContent = element.dataset.originalText;
    }
  });
  const toggle = document.querySelector(".language-toggle");
  toggle.querySelector(".language-current").textContent = next === "en" ? "EN" : "中文";
  toggle.querySelector(".language-next").textContent = next === "en" ? "中文" : "EN";
  toggle.setAttribute("aria-label", toggle.dataset[`aria${next === "en" ? "En" : "Zh"}`]);
  renderTrack();
  renderSkill();
}

document.querySelectorAll("[data-i18n]").forEach((element) => { element.dataset.originalText = element.textContent; });

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("open", !open);
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.querySelector(".language-toggle").addEventListener("click", () => setLanguage(language === "en" ? "zh" : "en"));
document.querySelector("#previous-track").addEventListener("click", () => changeTrack(-1));
document.querySelector("#next-track").addEventListener("click", () => changeTrack(1));
document.querySelector("#play-track").addEventListener("click", openTrack);

const pianoCanvas = document.querySelector("#piano-canvas");
document.querySelectorAll("[data-skill]").forEach((button) => button.addEventListener("click", () => {
  const index = Number(button.dataset.skill);
  renderSkill(index);
  pianoCanvas.setSkill?.(index, true);
}));

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove("show"), 2600);
}
document.querySelectorAll(".resume-trigger").forEach((button) => button.addEventListener("click", () => {
  showToast(language === "en" ? "The web-ready PDF is coming soon. Email me for a current copy." : "网页版 PDF 即将补充，欢迎邮件索取最新简历。 ");
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .08, rootMargin: "0px 0px -5%" });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (!visible) return;
  sectionLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`));
}, { threshold: [0,.2,.55], rootMargin: "-30% 0px -60%" });
document.querySelectorAll("main > section[id]").forEach((section) => sectionObserver.observe(section));

document.querySelector("#year").textContent = new Date().getFullYear();
setLanguage("en");
initCatScene(document.querySelector("#cat-canvas"));
initWalkmanScene(document.querySelector("#walkman-canvas"), {
  onPrevious: () => changeTrack(-1),
  onNext: () => changeTrack(1),
  onOpen: openTrack,
});
initPianoScene(pianoCanvas, (index) => renderSkill(index));
