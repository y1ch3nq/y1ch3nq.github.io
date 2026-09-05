const projectData = {
  lrc: {
    kicker: { zh: "01 / FEATURED PRODUCT", en: "01 / FEATURED PRODUCT" },
    title: { zh: "LRC Visualizer 歌词视频生成器", en: "LRC Visualizer" },
    subhead: { zh: "浏览器端歌词视频制作器 · TypeScript · 2026", en: "Browser-based lyric video maker · TypeScript · 2026" },
    tags: ["TYPE SCRIPT", "LRC", "WEB CODECS", "LOCAL-FIRST"],
    description: {
      zh: "为重复且耗时的歌词视频制作流程设计的一站式工具。它支持音频与 LRC 导入、内置打轴、逐词动画、感知色彩提取、多比例模板以及后台逐帧导出；音频与图片均在浏览器本地处理。",
      en: "A browser-based tool built to remove repetitive editing from lyric-video production. It supports LRC timing, word-level animation, perceptual color extraction, multiple aspect-ratio templates, and frame-by-frame export while keeping media local."
    },
    before: { zh: "约 30 分钟手工剪辑", en: "~30 min manual edit" },
    after: { zh: "1–3 分钟操作，5 条成片验证", en: "1–3 min hands-on, validated on 5 videos" },
    flow: { zh: ["导入音频", "歌词打轴", "选择模板", "视觉参数", "后台导出"], en: ["Import", "Time lyrics", "Pick template", "Style", "Export"] },
    link: "https://github.com/y1ch3nq/lrc-visualizer",
    linkText: { zh: "查看 GitHub 项目", en: "View on GitHub" }
  },
  prompt: {
    kicker: { zh: "02 / WORKFLOW TOOL", en: "02 / WORKFLOW TOOL" },
    title: { zh: "Prompt Factory 提示词组合工具", en: "Prompt Factory" },
    subhead: { zh: "AI 视频提示词结构化工具 · 2026", en: "Structured AI-video prompting tool · 2026" },
    tags: ["PROMPT DESIGN", "FRONT-END", "BATCH WORKFLOW"],
    description: {
      zh: "把场景、人物、动作、镜头、画幅与风格拆成可复用字段，支持局部调整和批量组合。重点不是“帮 AI 写一句话”，而是让团队稳定复用已经验证过的制作逻辑。",
      en: "A reusable field system for scenes, characters, actions, camera language, aspect ratios, and styles. It turns proven prompting logic into a repeatable team workflow instead of one-off AI instructions."
    },
    before: { zh: "单条 3–4 分钟且格式易漂移", en: "3–4 min with unstable formatting" },
    after: { zh: "约 1 分钟，效率提升 67%–75%", en: "~1 min, 67%–75% faster" },
    flow: { zh: ["选择场景", "组合人物", "设定镜头", "追加约束", "一键生成"], en: ["Scene", "Character", "Camera", "Constraints", "Generate"] },
    link: "",
    linkText: { zh: "内部工作流项目", en: "Internal workflow project" }
  },
  hiphop: {
    kicker: { zh: "03 / CULTURAL STRATEGY", en: "03 / CULTURAL STRATEGY" },
    title: { zh: "跨文化 Hip-Hop 艺人企划", en: "Cross-Cultural Hip-Hop Artist Development" },
    subhead: { zh: "USC 课程项目 · 13 人团队 · 2025", en: "USC course project · Team of 13 · 2025" },
    tags: ["ARTIST IP", "AUDIENCE", "CULTURAL STRATEGY"],
    description: {
      zh: "以华裔、印裔身份与夏威夷移民史为叙事基础，构建兼具文化真实性和商业潜力的双人 Hip-Hop 艺人 IP。项目从受众心理与行业趋势出发，锁定第二代亚裔移民听众，并完成市场定位与营销策略。",
      en: "A hip-hop duo concept rooted in Chinese and Indian diasporic identities and Hawai‘i’s immigrant history. The team balanced cultural authenticity with commercial potential and developed a strategy for second-generation Asian diaspora listeners."
    },
    before: { zh: "多元身份容易沦为表面标签", en: "Cultural identity risks becoming surface-level branding" },
    after: { zh: "叙事、受众与商业路径形成闭环", en: "A coherent story, audience, and go-to-market path" },
    flow: { zh: ["文化研究", "受众洞察", "艺人设定", "市场定位", "传播策略"], en: ["Research", "Audience", "Artist IP", "Positioning", "Campaign"] },
    link: "",
    linkText: { zh: "课程策略项目", en: "Course strategy project" }
  },
  research: {
    kicker: { zh: "04 / INDEPENDENT RESEARCH", en: "04 / INDEPENDENT RESEARCH" },
    title: { zh: "女性流行艺人媒介与公关叙事研究", en: "Female Pop Artist Media & PR Narrative Study" },
    subhead: { zh: "独立混合方法研究 · 2024—2025", en: "Independent mixed-methods research · 2024–2025" },
    tags: ["MEDIA STUDIES", "PR", "MIXED METHODS"],
    description: {
      zh: "分析 2000—2024 年间 10 部女性歌手传记片与纪录片，结合定性内容分析与定量编码，比较不同媒介形式如何建构艺人形象；并以《Amy》和《Back to Black》讨论商业叙事中的受害化与性化倾向。",
      en: "An analysis of 10 female-artist documentaries and biopics released from 2000–2024. Qualitative analysis and quantitative coding were combined to compare image construction and examine recurring victimization and sexualization in commercial narratives."
    },
    before: { zh: "传记片与纪录片的形象机制缺少对照", en: "Limited comparison across documentary and biopic formats" },
    after: { zh: "形成艺人宣发与声誉风险洞察", en: "Insights for artist publicity and reputation risk" },
    flow: { zh: ["样本选择", "编码框架", "内容分析", "跨媒介比较", "公关启示"], en: ["Sample", "Coding", "Analysis", "Compare", "PR insight"] },
    link: "",
    linkText: { zh: "独立研究项目", en: "Independent research" }
  }
};

const i18n = {
  zh: {
    status: "可联系", navHome: "主页", navExperience: "经历", navProjects: "项目", navSkills: "技能", navPlay: "兴趣",
    openTo: "OPEN TO COLLABORATE", eyebrow: "CONTENT · CULTURE · CREATIVE TECH",
    heroLede: "我把跨文化洞察、内容运营与轻量 AI 工具连成一条工作流，让好故事更快、更准确地抵达全球受众。",
    viewWork: "查看项目", impact: "IMPACT SCORE", views: "内容播放", metricPublishing: "全球发布支持", metricAssets: "节目素材交付", metricEfficiency: "提示词效率", nowLabel: "NOW BUILDING", scroll: "向下浏览",
    experienceTitle: "实习与成长轨迹", experienceIntro: "从内容生产到全球渠道运营，再到为重复工作写工具：我关心创意，也关心创意如何被稳定交付。",
    allsaintsRole: "内容运营实习生 · Content Operations Intern", current: "进行中", allsaintsSummary: "负责 Viza、The Aidols 与 Vanso 的 AI 辅助短视频制作、多语言发布支持和海外平台搭建；同时把高频手工流程做成可复用的网页工具。",
    statVideos: "条视频内容", statAssets: "条节目素材", statOps: "条发布配置", statAccounts: "个海外账号", showDetails: "＋ 展开职责细节", hideDetails: "－ 收起职责细节",
    detail1: "为 TikTok、Instagram、YouTube 策划、生成、剪辑并发布内容，累计获得 30K+ 播放。", detail2: "完成小米国际、Vanso、OPPO 的 Push、冷启动与定时轮询配置，支持多语言本地化。", detail3: "负责 Vanso 英文稿件校对与 The Aidols 官方邮箱、海外平台账号的前期搭建。",
    magazineName: "校园杂志社", magazineRole: "主编 / 社团负责人", magazineSummary: "统筹月刊内容与社交媒体运营，带领 18 人编辑团队；读者增长 30%，连续两年获得校级社团荣誉。", uscRole: "传播学学士 · 预计 2029 年 5 月毕业", uscCourse: "课程关注传播科技、公众传播、人文研究与 Hip-Hop 文化。",
    projectsTitle: "项目档案", projectsIntro: "工具、内容和研究并列展示。点击左侧文件，右侧会展开问题、方法与结果。", selectedFiles: "SELECTED FILES",
    skillsTitle: "技能与工作方式", skillsIntro: "不是把软件堆成清单，而是说明我如何把它们组合成从想法到上线的流程。", skillContent: "内容与增长", skillContentDesc: "选题策划 · 短视频制作 · 社媒运营 · 多语言本地化 · 受众洞察", skillMedia: "制作与设计", skillMediaDesc: "视频剪辑 · 视觉排版 · 歌词视频 · 内容原型 · 演示表达", skillAI: "AI 与轻量开发", skillAIDesc: "提示词设计 · AI 素材工作流 · 浏览器端工具 · 快速测试与迭代", skillLanguage: "语言与跨文化沟通", skillLanguageDesc: "中文母语 · 英语流利（TOEFL 112）· 韩语入门 · 跨文化内容敏感度",
    playTitle: "下班后的频道", playIntro: "音乐、游戏、乐器与写作不是简历边角料，它们构成了我观察圈层、情绪与叙事的方式。", currentChannel: "CURRENT CHANNEL", music: "音乐", games: "游戏", instruments: "乐器", writing: "写作", musicCopy: "从舞台视觉到粉丝社群，关注音乐如何成为跨文化身份表达。", gameNote: "偏爱叙事型独立游戏，包括《主播女孩重度依赖》。", factInstrument: "三种乐器", factInstrumentSub: "钢琴 · 长号 · 古筝", factEdit: "2000+ 播放", factEditSub: "K‑Pop 女团舞台混剪", factWriting: "新概念作文二等奖",
    contactTitle: "一起做点好看的，也做点真正有用的。", contactCopy: "如果你正在寻找懂内容、跨文化语境，并愿意亲手把流程做顺的人，欢迎联系我。", savePdf: "保存为 PDF"
  },
  en: {
    status: "AVAILABLE", navHome: "Home", navExperience: "Work", navProjects: "Projects", navSkills: "Skills", navPlay: "Play",
    openTo: "OPEN TO COLLABORATE", eyebrow: "CONTENT · CULTURE · CREATIVE TECH",
    heroLede: "I connect cross-cultural insight, content operations, and lightweight AI tools—helping strong stories reach global audiences faster and more clearly.",
    viewWork: "View work", impact: "IMPACT SCORE", views: "content views", metricPublishing: "Global publishing", metricAssets: "Program assets", metricEfficiency: "Prompt efficiency", nowLabel: "NOW BUILDING", scroll: "SCROLL TO EXPLORE",
    experienceTitle: "Experience & growth", experienceIntro: "From content production and global channel operations to building tools for repetitive work—I care about the idea and how reliably it ships.",
    allsaintsRole: "Content Operations Intern", current: "CURRENT", allsaintsSummary: "Create AI-assisted short-form content for Viza, The Aidols, and Vanso; support multilingual publishing and overseas platform setup; turn repetitive manual work into reusable web tools.",
    statVideos: "video pieces", statAssets: "program assets", statOps: "publishing ops", statAccounts: "global accounts", showDetails: "+ Show role details", hideDetails: "− Hide role details",
    detail1: "Planned, generated, edited, and published content across TikTok, Instagram, and YouTube, earning 30K+ views.", detail2: "Supported Push, cold-start, and scheduled publishing across Xiaomi Global, Vanso, and OPPO, including multilingual localization.", detail3: "Edited Vanso English copy and set up The Aidols’ official mailbox and overseas platform accounts.",
    magazineName: "Campus Magazine Club", magazineRole: "Leader / Head Editor", magazineSummary: "Led monthly publishing, social content, and an 18-person editorial team; grew readership 30% and earned school-level honors for two consecutive years.", uscRole: "B.A. Communication · Expected May 2029", uscCourse: "Coursework in communication technology, public communication, humanistic inquiry, and hip-hop culture.",
    projectsTitle: "Selected project files", projectsIntro: "Tools, content, and research live side by side. Select a file to see the problem, method, and outcome.", selectedFiles: "SELECTED FILES",
    skillsTitle: "Skills & working style", skillsIntro: "Not just a software list—this is how I combine tools into a practical path from idea to launch.", skillContent: "Content & growth", skillContentDesc: "Editorial planning · Short-form video · Social operations · Localization · Audience insight", skillMedia: "Production & design", skillMediaDesc: "Video editing · Visual layout · Lyric video · Prototyping · Presentations", skillAI: "AI & lightweight development", skillAIDesc: "Prompt design · AI asset workflows · Browser tools · Rapid testing and iteration", skillLanguage: "Language & cross-cultural work", skillLanguageDesc: "Mandarin native · Fluent English (TOEFL 112) · Elementary Korean · Cross-cultural sensitivity",
    playTitle: "After-hours channels", playIntro: "Music, games, instruments, and writing shape how I understand communities, emotion, and storytelling.", currentChannel: "CURRENT CHANNEL", music: "Music", games: "Games", instruments: "Instruments", writing: "Writing", musicCopy: "From stage visuals to fan communities, I watch how music becomes a language for cross-cultural identity.", gameNote: "Especially fond of story-driven indie games, including Needy Streamer Overload.", factInstrument: "Three instruments", factInstrumentSub: "Piano · Trombone · Guzheng", factEdit: "2K+ views", factEditSub: "K-pop stage edit", factWriting: "New Concept Writing · 2nd Prize",
    contactTitle: "Let’s make something beautiful—and genuinely useful.", contactCopy: "If you need someone who understands content, cross-cultural context, and how to improve a workflow hands-on, I’d love to talk.", savePdf: "Save as PDF"
  }
};

const hobbyChannels = {
  zh: {
    music: ["K‑Pop & Performance", "从舞台视觉到粉丝社群，关注音乐如何成为跨文化身份表达。", "♫", "linear-gradient(145deg, #312847, #785f9e)"],
    games: ["Story-driven Games", "在互动叙事里观察选择、情绪反馈与玩家社群。Sky 100H+，鸣潮与旷野之息各 70H+。", "▶", "linear-gradient(145deg, #274d6a, #6eaac7)"],
    instruments: ["Piano · Trombone · Guzheng", "键盘、铜管和传统弦乐带来三种完全不同的听觉视角。", "♬", "linear-gradient(145deg, #6b3e58, #d27da6)"],
    writing: ["Essays & Editing", "从创意写作到杂志主编工作，我一直把文字当作理解人和组织复杂信息的方法。", "✎", "linear-gradient(145deg, #4a4a39, #b39b61)"]
  },
  en: {
    music: ["K‑Pop & Performance", "From stage visuals to fan communities, I watch how music becomes a language for cross-cultural identity.", "♫", "linear-gradient(145deg, #312847, #785f9e)"],
    games: ["Story-driven Games", "I study choice, emotion, and player communities through interactive stories—100H+ in Sky and 70H+ each in Wuthering Waves and Zelda: BOTW.", "▶", "linear-gradient(145deg, #274d6a, #6eaac7)"],
    instruments: ["Piano · Trombone · Guzheng", "Keyboard, brass, and traditional strings give me three very different ways to listen.", "♬", "linear-gradient(145deg, #6b3e58, #d27da6)"],
    writing: ["Essays & Editing", "From creative writing to leading a campus magazine, words remain how I understand people and organize complex ideas.", "✎", "linear-gradient(145deg, #4a4a39, #b39b61)"]
  }
};

let language = "zh";
let activeProject = "lrc";
let activeChannel = "music";

function renderProject(key) {
  activeProject = key;
  const item = projectData[key];
  const panel = document.querySelector("#project-panel");
  const steps = item.flow[language].map((step, index, all) => `<span>${step}</span>${index < all.length - 1 ? "<i>→</i>" : ""}`).join("");
  const link = item.link
    ? `<a class="pixel-button project-link" href="${item.link}" target="_blank" rel="noreferrer"><svg><use href="#i-github"></use></svg>${item.linkText[language]}<svg><use href="#i-external"></use></svg></a>`
    : `<span class="pixel-button project-link" aria-label="${item.linkText[language]}">${item.linkText[language]}</span>`;

  panel.innerHTML = `
    <div class="project-kicker">${item.kicker[language]}</div>
    <h3>${item.title[language]}</h3>
    <p class="project-subhead">${item.subhead[language]}</p>
    <div class="project-tags">${item.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    <p class="project-description">${item.description[language]}</p>
    <div class="project-result">
      <div><small>${language === "zh" ? "BEFORE / 问题" : "BEFORE / PROBLEM"}</small><strong>${item.before[language]}</strong></div>
      <div><small>${language === "zh" ? "AFTER / 结果" : "AFTER / OUTCOME"}</small><strong>${item.after[language]}</strong></div>
    </div>
    <div class="project-flow">${steps}</div>
    ${link}`;
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.querySelector("#language-toggle").textContent = language === "zh" ? "EN" : "中文";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (i18n[language][key]) element.textContent = i18n[language][key];
  });
  const toggle = document.querySelector(".details-toggle");
  toggle.textContent = toggle.getAttribute("aria-expanded") === "true" ? i18n[language].hideDetails : i18n[language].showDetails;
  renderProject(activeProject);
  renderChannel(activeChannel);
}

function renderChannel(key) {
  activeChannel = key;
  const [title, copy, icon, background] = hobbyChannels[language][key];
  document.querySelector("#channel-title").textContent = title;
  document.querySelector("#channel-copy").textContent = copy;
  const art = document.querySelector("#channel-art");
  art.querySelector("span").textContent = icon;
  art.style.background = background;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

document.querySelectorAll(".project-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".project-tab").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    renderProject(button.dataset.project);
  });
});

document.querySelectorAll(".channel-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".channel-button").forEach((item) => item.classList.toggle("active", item === button));
    renderChannel(button.dataset.channel);
  });
});

document.querySelector("#language-toggle").addEventListener("click", () => setLanguage(language === "zh" ? "en" : "zh"));

document.querySelector(".details-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const list = button.nextElementSibling;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  list.hidden = expanded;
  button.textContent = expanded ? i18n[language].showDetails : i18n[language].hideDetails;
});

document.querySelector("#copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("zoeyqian@usc.edu");
    showToast(language === "zh" ? "邮箱已复制" : "Email copied");
  } catch {
    window.location.href = "mailto:zoeyqian@usc.edu";
  }
});

document.querySelector("#print-page").addEventListener("click", () => window.print());

const clock = document.querySelector("#clock");
function updateClock() {
  clock.textContent = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" }).format(new Date()) + " LA";
}
updateClock();
window.setInterval(updateClock, 30000);
document.querySelector("#year").textContent = new Date().getFullYear();

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".dock-item")];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.section === visible.target.id));
}, { rootMargin: "-35% 0px -45%", threshold: [0, 0.25, 0.6] });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

renderProject("lrc");
renderChannel("music");
