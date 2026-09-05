import "./styles.css";
import "./project.css";

const zh = {
  backPortfolio: "返回作品集", caseLede: "一款浏览器端歌词视频制作工具，把音频、时间轴歌词、字体、色彩、版式与导出控制整合进同一个可定制工作流。",
  role: "职责", roleValue: "产品定义、工作流设计、界面决策、测试与迭代", timeline: "时间", tools: "工具", status: "状态", statusValue: "已上线 · 持续迭代", openProduct: "打开线上产品",
  context: "背景", contextTitle: "从真实工作流内部生长出来。", contextCopy: "这个项目源于我在 AllSaints Music Group 亲手制作歌词视频的经历。不断重复打轴、格式设置、预览与导出，让机会变得清晰：这个流程需要一个专门设计的产品，而不是又一种剪辑补丁。",
  problem: "问题", problemTitle: "创意工作，被埋在重复制作里。", problemOneTitle: "手动打轴", problemOneCopy: "歌词时间与换行需要反复、逐帧地确认。", problemTwoTitle: "控制分散", problemTwoCopy: "音频、歌词、字体、色彩、版式与格式决策散落在不同步骤。", problemThreeTitle: "修改缓慢", problemThreeCopy: "很小的视觉修改也可能触发新一轮漫长的编辑和导出。", problemFourTitle: "输出不一致", problemFourCopy: "重复的手工设置让跨歌曲、跨平台复用格式更加困难。",
  approach: "产品方法", approachTitle: "把每一个剪辑决策转化为可复用的控制。", approachCopy: "我梳理了原有制作顺序，把反复出现的决策与歌曲特定输入分开，再将它们转化为一个带有可复用模板、从预览直达导出的浏览器工作流。", flowImport: "导入音频与歌词", flowTime: "编辑或标记歌词时间", flowStyle: "样式与画幅", flowPreview: "预览", flowExport: "导出",
  features: "功能与决策", featuresTitle: "在创作者需要选择时保持灵活，在需要效率时提供结构。", featureImport: "LRC 与文本导入", featureImportCopy: "导入带时间轴的 LRC、纯文本歌词或粘贴文本，进入内置打轴流程。", featureTime: "逐行或逐词打轴", featureTimeCopy: "根据滚动、波浪或逐词格式选择适合的时间精度。", featureStyle: "字体与色彩控制", featureStyleCopy: "在同一处调整字体、层级、颜色、对齐、背景与歌词强调。", featureFormat: "模板与画幅", featureFormatCopy: "在滚动、波浪和黑白逐词视觉之间复用设计系统。", featureLocal: "浏览器本地处理", featureLocalCopy: "在支持时于本地处理媒体，减少文件流转并保护原始素材。", featureExport: "后台导出", featureExportCopy: "设置完成后独立运行导出，让创作者不必继续逐帧操作。",
  outputs: "精选输出", outputsTitle: "一个系统，多种视觉语言。", outputsCopy: "至少 5 条成片用于验证这套制作流程。作品集没有收到可公开使用的视频文件，因此下方仅展示已经验证的输出格式，不冒充真实样片。", outputScroll: "滚动歌词视频", outputWave: "单行波浪歌词", outputWord: "黑白逐词打轴", outputVanso: "Vanso 歌词视觉",
  impact: "效果", impactTitle: "减少手工剪辑，把时间留给创意决策。", beforeWorkflow: "原有手工剪辑流程", afterWorkflow: "主动设置与编辑", exportTime: "根据输出格式在后台导出", validation: "用于验证流程的完成视频",
  process: "职责与过程", processTitle: "产品判断由我负责，开发由 AI 辅助。", processCopy: "我负责问题定义、流程梳理、功能优先级、界面决策、测试与迭代。AI 辅助开发帮助把这些决策转化为可运行的浏览器产品，但它没有替代产品判断或制作验证。", processQuote: "“目标不是自动化创意，而是移除围绕创意反复出现的步骤。”",
  reflection: "复盘与下一步", reflectionTitle: "一个能用的工具，是产品学习的开始。", worked: "有效之处", workedCopy: "从真实制作流程出发，让决策始终保持实用。可复用控制缩短了主动编辑时间，也保留了视觉灵活性。", limits: "当前局限", limitsCopy: "浏览器编码支持与导出性能因设备而异，高级时间标记仍需要仔细复核。", next: "下一步测试", nextCopy: "更多创作者测试、更清晰的首次使用引导、更强的预设管理，以及跨浏览器和低性能设备测试。", tryProduct: "体验 LRC Visualizer", moreProjects: "更多项目", footer: "产品 · 媒体 · 创意科技", backTop: "回到顶部",
};

document.querySelectorAll("[data-i18n]").forEach((element) => { element.dataset.originalText = element.textContent; });
let language = "en";
const toggle = document.querySelector(".language-toggle");
function setLanguage(next) {
  language = next;
  document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = next === "zh" && zh[key] ? zh[key] : element.dataset.originalText;
  });
  toggle.querySelector(".language-current").textContent = next === "en" ? "EN" : "中文";
  toggle.querySelector(".language-next").textContent = next === "en" ? "中文" : "EN";
  toggle.setAttribute("aria-label", next === "en" ? "切换到中文" : "Switch to English");
}
toggle.addEventListener("click", () => setLanguage(language === "en" ? "zh" : "en"));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold:.07 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
setLanguage("en");
