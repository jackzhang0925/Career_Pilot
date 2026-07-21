"use client";

import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  ExternalLink,
  FileText,
  Filter,
  Gauge,
  Inbox,
  LayoutDashboard,
  ListChecks,
  MapPin,
  MoreHorizontal,
  Play,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useEffect, useMemo, useRef, useState } from "react";

type Job = {
  id: number;
  company: string;
  initials: string;
  color: string;
  role: string;
  location: string;
  mode: string;
  salary: string;
  score: number;
  reason: string;
  tags: string[];
  source: string;
  url: string;
  posted: string;
  status: "待确认" | "已加入" | "已跳过";
};

type UserIdentity = { name: string; location: string; focus: string };
const defaultIdentity: UserIdentity = { name: "Jack Zhang", location: "Toronto", focus: "Product Design" };

const seedJobs: Job[] = [
  { id: 1, company: "Shopify", initials: "S", color: "#111111", role: "Senior Product Designer, AI", location: "Toronto, ON", mode: "远程", salary: "CA$145k–181k", score: 94, reason: "产品设计经验、AI 工作流和 B2B 背景高度匹配", tags: ["AI", "Design Systems", "B2B"], source: "Shopify Careers", url: "https://www.shopify.com/careers", posted: "2 小时前", status: "待确认" },
  { id: 2, company: "Cohere", initials: "C", color: "#39594d", role: "Product Designer", location: "Toronto, ON", mode: "混合", salary: "CA$130k–170k", score: 91, reason: "生成式 AI 产品经验与核心职责直接重合", tags: ["GenAI", "Research", "Prototyping"], source: "Ashby", url: "https://jobs.ashbyhq.com/cohere", posted: "今天", status: "待确认" },
  { id: 3, company: "Wealthsimple", initials: "W", color: "#6d5dfc", role: "Staff Product Designer", location: "Canada", mode: "远程", salary: "CA$151k–189k", score: 88, reason: "复杂产品和跨职能领导力是强项", tags: ["Fintech", "Mobile", "Strategy"], source: "Lever", url: "https://jobs.lever.co/wealthsimple", posted: "今天", status: "待确认" },
  { id: 4, company: "Stripe", initials: "S", color: "#635bff", role: "Product Designer, Growth", location: "Toronto, ON", mode: "混合", salary: "CA$154k–231k", score: 86, reason: "增长实验与设计系统能力匹配，行业经验略弱", tags: ["Growth", "Platform", "Systems"], source: "Stripe Jobs", url: "https://stripe.com/jobs/search?office_locations=North+America--Toronto", posted: "1 天前", status: "待确认" },
  { id: 5, company: "Clio", initials: "C", color: "#4b94c6", role: "Senior Product Designer", location: "Canada", mode: "远程", salary: "CA$128k–160k", score: 84, reason: "SaaS 端到端经验匹配，职级和薪资符合预期", tags: ["SaaS", "B2B", "UX"], source: "公司官网", url: "https://www.clio.com/about/careers/", posted: "1 天前", status: "待确认" },
  { id: 6, company: "Ada", initials: "A", color: "#ef755f", role: "Senior Product Designer, AI", location: "Toronto, ON", mode: "远程", salary: "CA$135k–165k", score: 82, reason: "对话式 AI 方向契合，需要补强企业客户案例", tags: ["Conversational AI", "B2B"], source: "公司官网", url: "https://www.ada.cx/careers", posted: "2 天前", status: "待确认" },
];

const nav = [
  { id: "overview", label: "今日雷达", icon: LayoutDashboard },
  { id: "jobs", label: "职位池", icon: BriefcaseBusiness, count: 38 },
  { id: "queue", label: "申请队列", icon: ListChecks, count: 6 },
  { id: "materials", label: "材料库", icon: FileText },
];

export function CareerDashboard() {
  const [active, setActive] = useState("overview");
  const [jobs, setJobs] = useState(seedJobs);
  const [selected, setSelected] = useState<Job | null>(null);
  const [running, setRunning] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [currentProfile, setCurrentProfile] = useState<JobProfile>(defaultProfile);
  const [scanStats, setScanStats] = useState({ scanned: seedJobs.length, sources: 6 });
  const [identity, setIdentity] = useState<UserIdentity>(defaultIdentity);

  useEffect(() => {
    const saved = localStorage.getItem("cat-career-jobs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Job[];
        setJobs(parsed.map((job) => ({ ...seedJobs.find((seed) => seed.id === job.id), ...job } as Job)));
      } catch { localStorage.removeItem("cat-career-jobs"); }
    }
    const savedScanStats = localStorage.getItem("cat-career-scan-stats");
    if (savedScanStats) {
      try { setScanStats(JSON.parse(savedScanStats)); } catch { localStorage.removeItem("cat-career-scan-stats"); }
    }
    const savedProfile = localStorage.getItem("cat-career-profile");
    if (savedProfile) {
      try { setCurrentProfile({ ...defaultProfile, ...JSON.parse(savedProfile) }); } catch { localStorage.removeItem("cat-career-profile"); }
    }
    const savedIdentity = localStorage.getItem("cat-career-identity");
    if (savedIdentity) {
      try { setIdentity({ ...defaultIdentity, ...JSON.parse(savedIdentity) }); } catch { localStorage.removeItem("cat-career-identity"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cat-career-jobs", JSON.stringify(jobs));
  }, [jobs]);

  const visibleJobs = useMemo(
    () => jobs.filter((job) => `${job.company} ${job.role} ${job.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [jobs, query],
  );

  function updateStatus(id: number, status: Job["status"]) {
    setJobs((current) => current.map((job) => (job.id === id ? { ...job, status } : job)));
    setSelected((current) => (current?.id === id ? { ...current, status } : current));
    setNotice(status === "已加入" ? "已加入申请队列，最终提交前仍需你确认。" : "已从今日推荐中跳过。");
    window.setTimeout(() => setNotice(null), 2600);
  }

  async function scanForProfile(profile: JobProfile, profileChanged = false) {
    setRunning(true);
    if (profileChanged) {
      setJobs((current) => current.filter((job) => job.status === "已加入"));
      setActive("overview");
      setNotice("新画像已保存，正在重新扫描真实职位…");
    }
    try {
      const response = await fetch("/api/scan-jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
      if (!response.ok) throw new Error("scan-failed");
      const result = await response.json() as { jobs: Job[]; scanned: number; sources: number };
      setJobs((current) => {
        const currentByUrl = new Map(current.map((job) => [job.url, job]));
        const refreshed = result.jobs.map((job) => ({ ...job, status: currentByUrl.get(job.url)?.status || job.status }));
        const returnedUrls = new Set(refreshed.map((job) => job.url));
        const preservedQueue = current.filter((job) => job.status === "已加入" && !returnedUrls.has(job.url));
        return [...refreshed, ...preservedQueue];
      });
      const nextStats = { scanned: result.scanned, sources: result.sources };
      setScanStats(nextStats);
      localStorage.setItem("cat-career-scan-stats", JSON.stringify(nextStats));
      setNotice(`扫描完成：从 ${result.sources} 个公开职位板读取 ${result.scanned} 个岗位，并按新画像重新排序。`);
    } catch {
      setNotice(profileChanged ? "旧推荐已失效，但职位扫描暂时不可用。请稍后重试。" : "职位扫描暂时不可用，请稍后重试。");
    } finally {
      setRunning(false);
      window.setTimeout(() => setNotice(null), 3200);
    }
  }

  function runScan() {
    void scanForProfile(currentProfile);
  }

  function handleProfileChanged(profile: JobProfile) {
    setCurrentProfile(profile);
    void scanForProfile(profile, true);
  }

  function updateIdentity(next: UserIdentity) {
    setIdentity(next);
    localStorage.setItem("cat-career-identity", JSON.stringify(next));
  }

  const queued = jobs.filter((job) => job.status === "已加入").length;
  const reviewed = jobs.filter((job) => job.status === "已加入" || job.status === "已跳过").length;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">猫</div><div><strong>猫猫王求职</strong><span>CAREER COPILOT</span></div></div>
        <nav className="primary-nav" aria-label="主导航">
          <p>工作台</p>
          {nav.map(({ id, label, icon: Icon, count }) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{count && <b>{id === "queue" ? queued : count}</b>}
            </button>
          ))}
          <p>个人设置</p>
          <button className={active === "profile" ? "active" : ""} onClick={() => setActive("profile")}><UserRound size={18} /><span>求职画像</span></button>
          <button className={active === "sources" ? "active" : ""} onClick={() => setActive("sources")}><Zap size={18} /><span>职位来源</span></button>
          <button className={active === "settings" ? "active" : ""} onClick={() => setActive("settings")}><Settings size={18} /><span>自动化设置</span></button>
        </nav>
        <div className="privacy-card"><ShieldCheck size={19} /><div><strong>数据留在本机</strong><span>简历和申请记录默认不上传</span></div></div>
        <button className="user-card" onClick={() => setActive("settings")}><div className="avatar">{identity.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U"}</div><div><strong>{identity.name || "未设置姓名"}</strong><span>{[identity.location, identity.focus].filter(Boolean).join(" · ") || "完善个人信息"}</span></div><MoreHorizontal size={18} /></button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><Search size={18} /><input aria-label="搜索职位" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索职位、公司或技能…" /><kbd>⌘ K</kbd></div>
          <div className="top-actions"><button aria-label="帮助"><CircleHelp size={19} /></button><button aria-label="通知" className="notification"><Bell size={19} /><i /></button><button className="scan-button" onClick={runScan} disabled={running}><Play size={16} fill="currentColor" />{running ? "正在扫描…" : "立即扫描"}</button></div>
        </header>

        {active === "overview" || active === "jobs" || active === "queue" ? (
          <DashboardContent jobs={visibleJobs} queued={queued} reviewed={reviewed} active={active} running={running} scanStats={scanStats} userName={identity.name} setSelected={setSelected} updateStatus={updateStatus} runScan={runScan} onViewAll={() => setActive("jobs")} />
        ) : active === "profile" ? (
          <ProfilePanel onProfileChanged={handleProfileChanged} />
        ) : active === "materials" ? (
          <MaterialsPanel jobs={jobs} onOpenProfile={() => setActive("profile")} onOpenQueue={() => setActive("queue")} />
        ) : active === "sources" ? (
          <SourcesPanel />
        ) : (
          <AutomationPanel identity={identity} onIdentityChange={updateIdentity} />
        )}
      </main>

      {selected && <JobDrawer job={selected} onClose={() => setSelected(null)} onStatus={updateStatus} />}
      {notice && <div className="toast"><Check size={17} />{notice}</div>}
    </div>
  );
}

function DashboardContent({ jobs, queued, reviewed, active, running, scanStats, userName, setSelected, updateStatus, runScan, onViewAll }: { jobs: Job[]; queued: number; reviewed: number; active: string; running: boolean; scanStats: { scanned: number; sources: number }; userName: string; setSelected: (job: Job) => void; updateStatus: (id: number, status: Job["status"]) => void; runScan: () => void; onViewAll: () => void }) {
  const highMatches = jobs.filter((job) => job.score >= 80);
  const shown = active === "queue" ? jobs.filter((j) => j.status === "已加入") : active === "overview" ? highMatches.slice(0, 10) : jobs;
  const acceptanceRate = reviewed > 0 ? Math.round((queued / reviewed) * 100) : null;
  return <div className="content">
    <section className="page-heading"><div><p className="eyebrow">TUESDAY, JULY 21</p><h1>{active === "queue" ? "申请队列" : active === "jobs" ? "全部职位" : `早上好，${userName.trim().split(/\s+/)[0] || "朋友"}`}</h1><p>{active === "queue" ? "检查材料，准备好后再进入投递步骤。" : "雷达已经完成今日筛选，下面是最值得你花时间的机会。"}</p></div><div className="next-run"><Clock3 size={18} /><div><span>下次自动扫描</span><strong>明天 08:30</strong></div></div></section>

    <section className="stats-grid">
      <div className="stat"><div className="stat-icon coral"><Search size={19} /></div><div><span>本次扫描职位</span><strong>{scanStats.scanned}</strong><small>来自 {scanStats.sources} 个公开职位板</small></div></div>
      <div className="stat"><div className="stat-icon violet"><Sparkles size={19} /></div><div><span>高匹配推荐</span><strong>{highMatches.length}</strong><small>匹配度 80% 以上</small></div></div>
      <div className="stat"><div className="stat-icon green"><ListChecks size={19} /></div><div><span>待确认申请</span><strong>{queued}</strong><small>提交前由你审核</small></div></div>
      <div className="stat"><div className="stat-icon blue"><Gauge size={19} /></div><div><span>推荐采纳率</span><strong>{acceptanceRate === null ? "—" : `${acceptanceRate}%`}</strong><small>{reviewed > 0 ? `已采纳 ${queued} / 已审阅 ${reviewed}` : "审阅推荐后自动计算"}</small></div></div>
    </section>

    {active !== "queue" && <section className="radar-card"><div className="radar-copy"><div className="radar-icon"><Sparkles size={24} /></div><div><span className="pill">今日任务</span><h2>{running ? "正在按最新画像重新扫描…" : `${highMatches.length} 个机会，已经按当前简历排好优先级`}</h2><p>综合目标职位、地点偏好和岗位描述实时评分。更换简历后会清除旧结果并重新扫描。</p><div className="pipeline"><span><b>{scanStats.scanned}</b> 已抓取</span><i /><span><b>{jobs.length}</b> 进入职位池</span><i /><span><b>{highMatches.length}</b> 高匹配</span></div></div></div><button onClick={runScan} disabled={running}>{running ? "分析中…" : "重新扫描"}<ArrowUpRight size={17} /></button></section>}

    <section className="jobs-section"><div className="section-header"><div><h2>{active === "queue" ? `待确认申请 · ${shown.length}` : "今日最佳匹配"}</h2><p>{active === "queue" ? "系统只会准备材料，不会未经确认点击最终提交。" : "按综合匹配度排序 · 更新于 9:12 AM"}</p></div><div className="filter-actions"><button><Filter size={16} />筛选</button><button><SlidersHorizontal size={16} />排序：匹配度<ChevronDown size={14} /></button></div></div>
      <div className="jobs-table" role="table">
        <div className="table-head" role="row"><span>公司 / 职位</span><span>地点</span><span>薪资范围</span><span>匹配度</span><span>状态</span><span /></div>
        {shown.length === 0 ? <div className="empty-state"><Inbox size={28} /><h3>{running ? "正在刷新推荐" : active === "queue" ? "队列还是空的" : "当前画像暂无 80 分以上职位"}</h3><p>{running ? "正在读取公开职位板并按新简历重新评分。" : active === "queue" ? "在职位右侧点击“加入”，合适的机会就会出现在这里。" : "你仍可在职位池查看较低匹配岗位，或点击重新扫描。"}</p></div> : shown.map((job) => <div className="job-row" role="row" key={job.id} onClick={() => setSelected(job)}>
          <div className="job-main"><div className="company-logo" style={{ background: job.color }}>{job.initials}</div><div><strong>{job.role}</strong><span>{job.company} · {job.source} · {job.posted}</span><div className="tags">{job.tags.slice(0, 2).map((tag) => <em key={tag}>{tag}</em>)}</div></div></div>
          <div className="muted-cell"><MapPin size={15} /><span>{job.location}<small>{job.mode}</small></span></div>
          <div className="salary">{job.salary}<small>估算年薪</small></div>
          <div className="score"><div style={{ "--score": `${job.score}%` } as React.CSSProperties}><span>{job.score}</span></div><small>{job.score >= 90 ? "极佳" : job.score >= 85 ? "优秀" : "很合适"}</small></div>
          <div><span className={`status ${job.status}`}>{job.status}</span></div>
          <div className="row-actions" onClick={(e) => e.stopPropagation()}><a className="external-job-link" href={job.url} target="_blank" rel="noreferrer" aria-label={`打开 ${job.company} 原岗位`} title="查看原岗位"><ExternalLink size={16} /></a>{job.status === "待确认" ? <><button className="approve" aria-label="加入队列" onClick={() => updateStatus(job.id, "已加入")}><Check size={16} /></button><button aria-label="跳过" onClick={() => updateStatus(job.id, "已跳过")}><X size={16} /></button></> : <button className="more" aria-label="更多"><MoreHorizontal size={18} /></button>}</div>
        </div>)}
      </div>
      {active === "overview" && <button className="view-all" onClick={onViewAll}>查看全部 {jobs.length} 个合格职位 <ArrowUpRight size={16} /></button>}
    </section>
  </div>;
}

type SavedResume = { name: string; size: number; text: string; importedAt: string };
type JobProfile = { roleKeywords: string; location: string; minSalary: string; workMode: string };
type ResumeAnalysis = { roles: string[]; seniority: string; skills: string[]; summary: string };

const defaultProfile: JobProfile = {
  roleKeywords: "Senior Product Designer, Staff Product Designer",
  location: "Toronto, Canada Remote",
  minSalary: "CA$130,000",
  workMode: "hybrid",
};

function inferRolesLocally(text: string) {
  const normalized = text.toLowerCase();
  if (/product owner|产品负责人/.test(normalized)) return ["Senior Product Owner", "Product Owner", "Product Manager"];
  if (/product design|ux designer|ui\/ux|用户体验/.test(normalized)) return ["Senior Product Designer", "Product Designer", "UX Designer"];
  if (/product manager|产品经理/.test(normalized)) return ["Senior Product Manager", "Product Manager", "Technical Product Manager"];
  if (/software engineer|developer|软件工程/.test(normalized)) return ["Senior Software Engineer", "Software Engineer", "Full Stack Engineer"];
  if (/data scientist|machine learning|数据科学/.test(normalized)) return ["Data Scientist", "Machine Learning Engineer", "Applied Scientist"];
  if (/data analyst|business intelligence|数据分析/.test(normalized)) return ["Senior Data Analyst", "Data Analyst", "Business Intelligence Analyst"];
  if (/marketing|growth|市场营销/.test(normalized)) return ["Growth Marketing Manager", "Product Marketing Manager", "Marketing Manager"];
  if (/project manager|项目经理/.test(normalized)) return ["Senior Project Manager", "Project Manager", "Program Manager"];
  return ["Senior Specialist", "Program Manager", "Operations Manager"];
}

async function extractResumeText(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension === "txt" || extension === "md") return file.text();
  if (extension === "docx") {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }
  if (extension === "pdf") {
    const pdfjs = await import("pdfjs-dist");
    pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
    const document = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
    }
    return pages.join("\n\n");
  }
  throw new Error("请选择 PDF、DOCX、TXT 或 Markdown 文件。 ");
}

function ProfilePanel({ onProfileChanged }: { onProfileChanged: (profile: JobProfile) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<SavedResume | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "reading" | "error">("idle");
  const [uploadError, setUploadError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [profile, setProfile] = useState<JobProfile>(defaultProfile);
  const [profileNotice, setProfileNotice] = useState("");
  const [analysisState, setAnalysisState] = useState<"idle" | "analyzing">("idle");
  const [analysisMessage, setAnalysisMessage] = useState("");
  const [apiConfigured, setApiConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cat-career-resume");
    let importedResume: SavedResume | null = null;
    let importedProfile = defaultProfile;
    if (saved) {
      try { importedResume = JSON.parse(saved); setResume(importedResume); } catch { localStorage.removeItem("cat-career-resume"); }
    }
    const savedProfile = localStorage.getItem("cat-career-profile");
    if (savedProfile) {
      try { importedProfile = { ...defaultProfile, ...JSON.parse(savedProfile) }; setProfile(importedProfile); } catch { localStorage.removeItem("cat-career-profile"); }
    }
    fetch("/api/analyze-resume").then((response) => response.json()).then((data) => {
      const configured = Boolean(data.configured);
      const analysisSource = localStorage.getItem("cat-career-profile-analysis-source");
      setApiConfigured(configured);
      if (importedResume && (!savedProfile || (configured && analysisSource !== "ai" && analysisSource !== "manual"))) void analyzeResume(importedResume.text, importedProfile);
    }).catch(() => {
      setApiConfigured(false);
      if (importedResume && !savedProfile) void analyzeResume(importedResume.text, importedProfile);
    });
  // Resume/profile hydration and optional first analysis run only once on mount.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function analyzeResume(text: string, baseProfile = profile) {
    setAnalysisState("analyzing");
    setAnalysisMessage("正在根据简历分析目标职位…");
    try {
      const response = await fetch("/api/analyze-resume", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resumeText: text }) });
      if (!response.ok) throw new Error(response.status === 503 ? "not-configured" : "api-error");
      const analysis = await response.json() as ResumeAnalysis;
      const updated = { ...baseProfile, roleKeywords: analysis.roles.join(", ") };
      setProfile(updated);
      localStorage.setItem("cat-career-profile", JSON.stringify(updated));
      localStorage.setItem("cat-career-profile-analysis-source", "ai");
      onProfileChanged(updated);
      setAnalysisMessage(`AI 已根据简历推荐：${analysis.roles.join("、")}`);
      setApiConfigured(true);
    } catch (error) {
      const roles = inferRolesLocally(text);
      const updated = { ...baseProfile, roleKeywords: roles.join(", ") };
      setProfile(updated);
      localStorage.setItem("cat-career-profile", JSON.stringify(updated));
      localStorage.setItem("cat-career-profile-analysis-source", "local");
      onProfileChanged(updated);
      setAnalysisMessage(error instanceof Error && error.message === "not-configured" ? `已用本地规则推荐：${roles.join("、")}。配置 API key 后可重新精细分析。` : `AI 暂时不可用，已用本地规则推荐：${roles.join("、")}`);
    } finally {
      setAnalysisState("idle");
    }
  }

  async function handleFile(file?: File) {
    if (!file) return;
    setUploadError("");
    if (file.size > 10 * 1024 * 1024) {
      setUploadState("error");
      setUploadError("文件超过 10 MB，请上传精简后的简历。");
      return;
    }
    setUploadState("reading");
    try {
      const text = (await extractResumeText(file)).replace(/\s+\n/g, "\n").trim();
      if (text.length < 80) throw new Error("没有读到足够的文字；如果是扫描版 PDF，请先进行 OCR。");
      const saved: SavedResume = { name: file.name, size: file.size, text, importedAt: new Date().toISOString() };
      localStorage.setItem("cat-career-resume", JSON.stringify(saved));
      setResume(saved);
      await analyzeResume(text);
      setUploadState("idle");
    } catch (error) {
      setUploadState("error");
      setUploadError(error instanceof Error ? error.message : "无法读取这个文件，请尝试其他格式。");
    }
  }

  function removeResume() {
    localStorage.removeItem("cat-career-resume");
    setResume(null);
    setUploadError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function saveProfile() {
    localStorage.setItem("cat-career-profile", JSON.stringify(profile));
    localStorage.setItem("cat-career-profile-analysis-source", "manual");
    onProfileChanged(profile);
    setProfileNotice("画像已保存到本机");
    window.setTimeout(() => setProfileNotice(""), 2500);
  }

  return <div className="content narrow"><section className="page-heading"><div><p className="eyebrow">PERSONAL CONTEXT</p><h1>求职画像</h1><p>管理目标职位、地点、薪资和工作偏好；主简历只作为画像分析依据。</p></div></section><div className="settings-grid"><section
    className={`panel resume-drop ${dragging ? "dragging" : ""} ${resume ? "has-resume" : ""}`}
    onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
    onDragLeave={() => setDragging(false)}
    onDrop={(event) => { event.preventDefault(); setDragging(false); void handleFile(event.dataTransfer.files[0]); }}
  >
    <input ref={inputRef} className="file-input" type="file" accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(event) => void handleFile(event.target.files?.[0])} />
    {resume ? <>
      <div className="large-icon success"><Check size={25} /></div><h2>画像依据已导入</h2><div className="resume-file"><FileText size={20} /><div><strong>{resume.name}</strong><span>{(resume.size / 1024).toFixed(0)} KB · 已读取 {resume.text.length.toLocaleString()} 个字符</span></div></div><p>这里用简历提取求职画像；文件版本和定制材料请到“材料库”管理。</p><div className="resume-actions"><button onClick={() => inputRef.current?.click()}>更换文件</button><button className="secondary" onClick={removeResume}>移除</button></div>
    </> : <>
      <div className="large-icon"><Upload size={25} /></div><h2>{uploadState === "reading" ? "正在读取简历…" : dragging ? "松开即可导入" : "导入你的主简历"}</h2><p>支持 PDF、DOCX、TXT 或 Markdown。也可以把文件直接拖到这里。</p><button disabled={uploadState === "reading"} onClick={() => inputRef.current?.click()}>{uploadState === "reading" ? "解析中…" : "选择简历文件"}</button><small>最大 10 MB · 文件内容仅保存在本机</small>
    </>}
    {uploadError && <div className="upload-error">{uploadError}</div>}
  </section><section className="panel form-panel"><div className="profile-title"><div><h2>目标职位</h2><span className={`api-status ${apiConfigured ? "ready" : ""}`}><i />{apiConfigured === null ? "检查 AI 配置" : apiConfigured ? "AI 已连接" : "AI 未配置"}</span></div>{resume && <button className="analyze-button" disabled={analysisState === "analyzing"} onClick={() => void analyzeResume(resume.text)}><Sparkles size={14} />{analysisState === "analyzing" ? "分析中…" : "重新分析简历"}</button>}</div>{analysisMessage && <div className="analysis-message"><Sparkles size={15} /><span>{analysisMessage}</span></div>}<label>职位关键词<input value={profile.roleKeywords} onChange={(event) => setProfile({ ...profile, roleKeywords: event.target.value })} /></label><label>地点<input value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} /></label><div className="two-col"><label>最低年薪<input value={profile.minSalary} onChange={(event) => setProfile({ ...profile, minSalary: event.target.value })} /></label><label>工作方式<select value={profile.workMode} onChange={(event) => setProfile({ ...profile, workMode: event.target.value })}><option value="hybrid">远程或混合</option><option value="remote">仅远程</option><option value="onsite">接受现场办公</option></select></label></div><div className="save-row"><button className="primary" onClick={saveProfile}>保存画像</button>{profileNotice && <span><Check size={14} />{profileNotice}</span>}</div>{apiConfigured === false && <p className="api-hint">要启用 AI 自动分析，请在项目的 <code>.env.local</code> 中设置 <code>OPENAI_API_KEY</code>，然后重启本地服务。</p>}</section></div></div>;
}

function MaterialsPanel({ jobs, onOpenProfile, onOpenQueue }: { jobs: Job[]; onOpenProfile: () => void; onOpenQueue: () => void }) {
  const [resume] = useState<SavedResume | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("cat-career-resume");
    if (!saved) return null;
    try { return JSON.parse(saved); } catch { localStorage.removeItem("cat-career-resume"); return null; }
  });
  const queuedJobs = jobs.filter((job) => job.status === "已加入");

  return <div className="content narrow materials-page">
    <section className="page-heading"><div><p className="eyebrow">APPLICATION ASSETS</p><h1>材料库</h1><p>管理主简历，以及每个申请对应的定制简历、求职信和开放题草稿。</p></div></section>
    <section className="materials-summary">
      <div><span>主简历</span><strong>{resume ? "1" : "0"}</strong><small>{resume ? "已导入" : "尚未导入"}</small></div>
      <div><span>待定制职位</span><strong>{queuedJobs.length}</strong><small>来自申请队列</small></div>
      <div><span>已完成材料</span><strong>0</strong><small>生成并审核后计数</small></div>
    </section>
    <section className="panel master-resume-card">
      <div className="material-card-icon"><FileText size={22} /></div>
      <div className="material-card-copy"><span className="material-kicker">MASTER RESUME</span><h2>{resume?.name ?? "还没有主简历"}</h2><p>{resume ? `${(resume.size / 1024).toFixed(0)} KB · ${resume.text.length.toLocaleString()} 个字符 · 导入于 ${new Date(resume.importedAt).toLocaleDateString("zh-CN")}` : "先在求职画像中导入简历，系统才能进行匹配和生成定制版本。"}</p></div>
      <button className="secondary-action" onClick={onOpenProfile}>{resume ? "更换或重新分析" : "前往导入"}<ArrowUpRight size={15} /></button>
    </section>
    <section className="panel tailored-materials">
      <div className="section-header"><div><h2>职位定制材料</h2><p>加入申请队列的职位会出现在这里；未生成的内容不会冒充成已完成。</p></div><button onClick={onOpenQueue}>查看申请队列</button></div>
      {queuedJobs.length === 0 ? <div className="materials-empty"><Sparkles size={25} /><h3>还没有待定制职位</h3><p>先从今日雷达选择合适职位并加入申请队列。</p><button className="primary" onClick={onOpenQueue}>前往申请队列</button></div> : <div className="material-list">{queuedJobs.map((job) => <div className="material-job" key={job.id}>
        <div className="company-logo" style={{ background: job.color }}>{job.initials}</div><div className="material-job-copy"><strong>{job.role}</strong><span>{job.company} · 匹配度 {job.score}%</span><small>定制简历 · 求职信 · 开放题草稿</small></div><span className="material-state">待生成</span>
      </div>)}</div>}
    </section>
  </div>;
}

function SourcesPanel() {
  type LinkedInConfig = { enabled: boolean; keywords: string; location: string; workplace: string; datePosted: string; experience: string[]; employment: string; easyApply: boolean; mostRecent: boolean; sessionVerified: boolean };
  const defaultLinkedIn: LinkedInConfig = { enabled: false, keywords: "", location: "Toronto, Canada", workplace: "hybrid-remote", datePosted: "day", experience: ["4", "5"], employment: "F", easyApply: false, mostRecent: true, sessionVerified: false };
  const [sourceEnabled, setSourceEnabled] = useState<Record<string, boolean>>({ Greenhouse: true, Lever: true, Ashby: true, LinkedIn: false });
  const [linkedIn, setLinkedIn] = useState<LinkedInConfig>(defaultLinkedIn);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [sourceNotice, setSourceNotice] = useState("");
  const [loginCheckOpened, setLoginCheckOpened] = useState(false);

  useEffect(() => {
    const savedSources = localStorage.getItem("cat-career-sources");
    const savedLinkedIn = localStorage.getItem("cat-career-linkedin");
    const savedProfile = localStorage.getItem("cat-career-profile");
    if (savedSources) {
      try { setSourceEnabled((current) => ({ ...current, ...JSON.parse(savedSources) })); } catch { localStorage.removeItem("cat-career-sources"); }
    }
    if (savedLinkedIn) {
      try { const parsed = { ...defaultLinkedIn, ...JSON.parse(savedLinkedIn) }; setLinkedIn(parsed); setShowLinkedIn(parsed.enabled); } catch { localStorage.removeItem("cat-career-linkedin"); }
    } else if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile) as JobProfile;
        setLinkedIn((current) => ({ ...current, keywords: profile.roleKeywords, location: profile.location }));
      } catch { /* profile remains optional */ }
    }
  // Source settings are hydrated once from browser-local state.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleSource(name: string, enabled: boolean) {
    const updated = { ...sourceEnabled, [name]: enabled };
    setSourceEnabled(updated);
    localStorage.setItem("cat-career-sources", JSON.stringify(updated));
    if (name === "LinkedIn") {
      const config = { ...linkedIn, enabled };
      setLinkedIn(config);
      setShowLinkedIn(enabled);
      localStorage.setItem("cat-career-linkedin", JSON.stringify(config));
    }
  }

  function linkedInUrl() {
    const params = new URLSearchParams();
    if (linkedIn.keywords.trim()) params.set("keywords", linkedIn.keywords.trim());
    if (linkedIn.location.trim()) params.set("location", linkedIn.location.trim());
    if (linkedIn.datePosted === "day") params.set("f_TPR", "r86400");
    if (linkedIn.datePosted === "week") params.set("f_TPR", "r604800");
    if (linkedIn.datePosted === "month") params.set("f_TPR", "r2592000");
    if (linkedIn.workplace === "remote") params.set("f_WT", "2");
    if (linkedIn.workplace === "hybrid") params.set("f_WT", "3");
    if (linkedIn.workplace === "onsite") params.set("f_WT", "1");
    if (linkedIn.workplace === "hybrid-remote") params.set("f_WT", "2,3");
    if (linkedIn.experience.length) params.set("f_E", linkedIn.experience.join(","));
    if (linkedIn.employment) params.set("f_JT", linkedIn.employment);
    if (linkedIn.easyApply) params.set("f_AL", "true");
    if (linkedIn.mostRecent) params.set("sortBy", "DD");
    return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
  }

  function saveLinkedIn() {
    const config = { ...linkedIn, enabled: true };
    const sources = { ...sourceEnabled, LinkedIn: true };
    setLinkedIn(config);
    setSourceEnabled(sources);
    localStorage.setItem("cat-career-linkedin", JSON.stringify(config));
    localStorage.setItem("cat-career-sources", JSON.stringify(sources));
    setSourceNotice("LinkedIn 搜索配置已保存");
    window.setTimeout(() => setSourceNotice(""), 2500);
  }

  function openLinkedInCheck() {
    setLoginCheckOpened(true);
    window.open(linkedInUrl(), "_blank", "noopener,noreferrer");
  }

  function confirmLinkedInSession(confirmed: boolean) {
    const config = { ...linkedIn, sessionVerified: confirmed };
    setLinkedIn(config);
    localStorage.setItem("cat-career-linkedin", JSON.stringify(config));
    setSourceNotice(confirmed ? "已记录：你确认 LinkedIn 登录可用" : "已撤销登录确认");
    window.setTimeout(() => setSourceNotice(""), 2500);
  }

  function toggleExperience(value: string) {
    setLinkedIn((current) => ({ ...current, experience: current.experience.includes(value) ? current.experience.filter((item) => item !== value) : [...current.experience, value] }));
  }

  const sources = [{ name: "Greenhouse", detail: "5 个公司职位板" }, { name: "Lever", detail: "4 个公司职位板" }, { name: "Ashby", detail: "3 个公司职位板" }, { name: "LinkedIn", detail: linkedIn.sessionVerified ? "你已确认浏览器可用" : "等待你确认浏览器登录" }];
  return <div className="content narrow"><section className="page-heading"><div><p className="eyebrow">JOB SOURCES</p><h1>职位来源</h1><p>优先使用公开职位接口；LinkedIn 使用你的浏览器登录会话和已保存搜索。</p></div></section><section className="panel source-list"><div className="section-header"><div><h2>已配置来源</h2><p>扫描时会自动去重并过滤过期链接。</p></div><button>+ 添加公司</button></div>{sources.map((source) => <div className={`source-row ${source.name === "LinkedIn" && showLinkedIn ? "selected" : ""}`} key={source.name}><div className={`source-symbol ${source.name === "LinkedIn" ? "linkedin" : ""}`}>{source.name === "LinkedIn" ? <span className="linkedin-glyph">in</span> : source.name[0]}</div><div><strong>{source.name}</strong><span>{source.detail}</span></div>{source.name === "LinkedIn" && <button className="source-config" onClick={() => setShowLinkedIn((current) => !current)}>{showLinkedIn ? "收起" : "配置"}</button>}<label className="switch"><input type="checkbox" checked={Boolean(sourceEnabled[source.name])} onChange={(event) => toggleSource(source.name, event.target.checked)} /><i /></label></div>)}</section>
    {showLinkedIn && <section className="panel linkedin-panel"><div className="linkedin-heading"><div><div className="linkedin-title"><span className="linkedin-glyph large">in</span><h2>LinkedIn 搜索配置</h2></div><p>本地应用不能读取 LinkedIn Cookie；请在打开的页面中检查登录状态，再回来确认。</p></div><span className={`session-badge ${linkedIn.sessionVerified ? "verified" : ""}`}><i />{linkedIn.sessionVerified ? "已由你确认" : "等待你确认"}</span></div>
      <div className="linkedin-steps"><div className="done"><b>1</b><span>设置搜索条件</span></div><i /><div className={linkedIn.sessionVerified ? "done" : ""}><b>2</b><span>人工确认登录</span></div><i /><div><b>3</b><span>每日打开并筛选</span></div></div>
      <div className="linkedin-form"><label>职位关键词<input value={linkedIn.keywords} onChange={(event) => setLinkedIn({ ...linkedIn, keywords: event.target.value })} placeholder="例如：Senior Product Owner, Product Manager" /></label><label>地点<input value={linkedIn.location} onChange={(event) => setLinkedIn({ ...linkedIn, location: event.target.value })} placeholder="例如：Toronto, Canada" /></label><div className="linkedin-grid"><label>工作地点<select value={linkedIn.workplace} onChange={(event) => setLinkedIn({ ...linkedIn, workplace: event.target.value })}><option value="hybrid-remote">远程或混合</option><option value="remote">仅远程</option><option value="hybrid">仅混合</option><option value="onsite">仅现场</option><option value="all">不限</option></select></label><label>发布时间<select value={linkedIn.datePosted} onChange={(event) => setLinkedIn({ ...linkedIn, datePosted: event.target.value })}><option value="day">过去 24 小时</option><option value="week">过去一周</option><option value="month">过去一个月</option><option value="any">不限</option></select></label><label>雇佣类型<select value={linkedIn.employment} onChange={(event) => setLinkedIn({ ...linkedIn, employment: event.target.value })}><option value="F">全职</option><option value="C">合同</option><option value="P">兼职</option><option value="">不限</option></select></label></div>
        <fieldset><legend>经验级别</legend><div className="chip-options">{[["2","初级"],["3","助理"],["4","中高级"],["5","总监"],["6","高管"]].map(([value,label]) => <button type="button" className={linkedIn.experience.includes(value) ? "active" : ""} key={value} onClick={() => toggleExperience(value)}>{linkedIn.experience.includes(value) && <Check size={12} />}{label}</button>)}</div></fieldset>
        <div className="linkedin-checks"><label><input type="checkbox" checked={linkedIn.easyApply} onChange={(event) => setLinkedIn({ ...linkedIn, easyApply: event.target.checked })} /><span><strong>仅 Easy Apply</strong><small>只显示可在 LinkedIn 内申请的职位</small></span></label><label><input type="checkbox" checked={linkedIn.mostRecent} onChange={(event) => setLinkedIn({ ...linkedIn, mostRecent: event.target.checked })} /><span><strong>最新发布优先</strong><small>优先发现刚发布的机会</small></span></label></div>
      </div>
      <div className="linkedin-login-help"><strong>如何确认登录？</strong><ol><li>点击“打开登录检查”。</li><li>在 LinkedIn 页面确认能看到右上角头像和职位列表。</li><li>回到这里点击“我能看到职位结果”。</li></ol>{loginCheckOpened && !linkedIn.sessionVerified && <p><Check size={14} />检查页面已打开；确认页面正常后完成第 3 步。</p>}</div>
      <div className="linkedin-actions"><button className="secondary-action" onClick={openLinkedInCheck}><ExternalLink size={15} />打开登录检查</button><button className={`secondary-action ${linkedIn.sessionVerified ? "confirmed" : ""}`} onClick={() => confirmLinkedInSession(!linkedIn.sessionVerified)}><Check size={15} />{linkedIn.sessionVerified ? "撤销登录确认" : "我能看到职位结果"}</button><button className="primary" onClick={saveLinkedIn}>保存 LinkedIn 配置</button>{sourceNotice && <span className="source-saved"><Check size={14} />{sourceNotice}</span>}</div>
      <div className="linkedin-note"><ShieldCheck size={17} /><p><strong>不会保存 LinkedIn 密码或 Cookie。</strong>受浏览器同源安全限制，这里的状态是“由你确认”，不是系统读取登录凭证后的自动验证。最终申请仍需你确认。</p></div>
    </section>}
  </div>;
}

function AutomationPanel({ identity, onIdentityChange }: { identity: UserIdentity; onIdentityChange: (identity: UserIdentity) => void }) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5.6");
  const [hasKey, setHasKey] = useState(false);
  const [keyStatus, setKeyStatus] = useState<"idle" | "checking" | "saved" | "error">("idle");
  const [keyMessage, setKeyMessage] = useState("");

  useEffect(() => {
    // Remove keys saved by older local-only builds; secrets now stay server-side.
    localStorage.removeItem("cat-career-openai-key");
    localStorage.removeItem("cat-career-openai-model");
    fetch("/api/openai-key").then((response) => response.json()).then((result) => {
      setHasKey(Boolean(result.configured));
      if (result.model) setModel(String(result.model));
    }).catch(() => setHasKey(false));
  }, []);

  async function validateAndSaveKey() {
    if (!apiKey.trim()) { setKeyStatus("error"); setKeyMessage("请输入 API Key。"); return; }
    setKeyStatus("checking");
    setKeyMessage("正在验证 Key 和模型权限…");
    try {
      const response = await fetch("/api/openai-key", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey: apiKey.trim(), model: model.trim() }) });
      const result = await response.json() as { valid?: boolean; error?: string };
      if (!response.ok || !result.valid) throw new Error(result.error || "验证失败。");
      setHasKey(true);
      setApiKey("");
      setKeyStatus("saved");
      setKeyMessage("API Key 已验证，并保存在本地服务的当前运行会话。");
    } catch (error) {
      setKeyStatus("error");
      setKeyMessage(error instanceof Error ? error.message : "无法验证 API Key。");
    }
  }

  async function removeKey() {
    await fetch("/api/openai-key", { method: "DELETE" }).catch(() => null);
    setApiKey("");
    setHasKey(false);
    setKeyStatus("idle");
    setKeyMessage("会话 Key 已从本地服务移除。");
  }

  return <div className="content narrow"><section className="page-heading"><div><p className="eyebrow">SETTINGS</p><h1>个人与自动化设置</h1><p>个人信息会即时同步到侧栏；API Key 只保存在当前浏览器。</p></div></section>
    <div className="settings-sections">
      <section className="panel settings-card"><div className="settings-card-heading"><div className="settings-card-icon"><UserRound size={18} /></div><div><h2>个人显示信息</h2><p>修改后立即更新侧栏和欢迎语。</p></div></div><div className="identity-grid"><label>姓名<input value={identity.name} onChange={(event) => onIdentityChange({ ...identity, name: event.target.value })} placeholder="例如：Jack Zhang" /></label><label>城市<input value={identity.location} onChange={(event) => onIdentityChange({ ...identity, location: event.target.value })} placeholder="例如：Toronto" /></label><label>职业方向<input value={identity.focus} onChange={(event) => onIdentityChange({ ...identity, focus: event.target.value })} placeholder="例如：Product Operations" /></label></div><div className="live-preview"><div className="avatar">{identity.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U"}</div><div><strong>{identity.name || "未设置姓名"}</strong><span>{[identity.location, identity.focus].filter(Boolean).join(" · ") || "完善个人信息"}</span></div><em>实时预览</em></div></section>

      <section className="panel settings-card"><div className="settings-card-heading"><div className="settings-card-icon ai"><Sparkles size={18} /></div><div><h2>OpenAI API</h2><p>用于简历画像分析；没有 Key 时自动使用本地规则。</p></div><span className={`api-status ${hasKey ? "ready" : ""}`}><i />{hasKey ? "本地服务已配置" : "未配置"}</span></div><div className="api-key-grid"><label>API Key<input type="password" autoComplete="off" value={apiKey} onChange={(event) => { setApiKey(event.target.value); setKeyStatus("idle"); }} placeholder={hasKey ? "输入新 Key 可替换当前会话 Key" : "sk-…"} /></label><label>模型 ID<input value={model} onChange={(event) => setModel(event.target.value)} placeholder="gpt-5.6" /></label></div><div className="api-key-actions"><button className="primary" disabled={keyStatus === "checking"} onClick={() => void validateAndSaveKey()}>{keyStatus === "checking" ? "验证中…" : "验证并使用"}</button><button className="secondary-action danger" disabled={!hasKey} onClick={() => void removeKey()}>移除会话 Key</button>{keyMessage && <span className={keyStatus === "error" ? "error" : ""}>{keyStatus === "saved" && <Check size={14} />}{keyMessage}</span>}</div><div className="local-key-note"><ShieldCheck size={16} /><p>Key 不会进入浏览器存储、项目文件或 Git；页面刷新后仍可使用，但本地服务重启后会清除。需要持久化时请使用被 Git 忽略的 <code>.env.local</code>。</p></div></section>

      <section className="panel automation"><div className="automation-row"><div><strong>每日自动扫描</strong><span>工作日 08:30 · America/Toronto</span></div><label className="switch"><input type="checkbox" defaultChecked /><i /></label></div><div className="automation-row"><div><strong>自动生成定制材料</strong><span>只对 80 分以上且通过硬条件的职位执行</span></div><label className="switch"><input type="checkbox" defaultChecked /><i /></label></div><div className="automation-row"><div><strong>自动填充申请表</strong><span>实验性功能；遇到开放题、验证码或异常时暂停</span></div><label className="switch"><input type="checkbox" /><i /></label></div><div className="automation-row locked"><div><strong>自动点击最终提交</strong><span>默认关闭。建议保留人工确认，防止错投或错误声明。</span></div><ShieldCheck size={20} /></div></section>
    </div><section className="guardrail"><ShieldCheck size={21} /><div><strong>你的确认是最后一道门</strong><p>系统可以筛选、改写和填表，但任何对外提交都会在申请队列中等待你确认。</p></div></section></div>;
}

function JobDrawer({ job, onClose, onStatus }: { job: Job; onClose: () => void; onStatus: (id: number, status: Job["status"]) => void }) {
  return <div className="drawer-layer" onMouseDown={onClose}><aside className="drawer" onMouseDown={(e) => e.stopPropagation()}><button className="drawer-close" onClick={onClose}><X size={20} /></button><div className="drawer-company"><div className="company-logo big" style={{ background: job.color }}>{job.initials}</div><div><span>{job.company}</span><h2>{job.role}</h2><p><MapPin size={14} />{job.location} · {job.mode}</p><a className="drawer-job-link" href={job.url} target="_blank" rel="noreferrer">查看原岗位 <ExternalLink size={14} /></a></div></div><div className="drawer-score"><div><span>综合匹配</span><strong>{job.score}<small>/100</small></strong></div><div className="score-bar"><i style={{ width: `${job.score}%` }} /></div><p>{job.reason}</p></div><section><h3>为什么值得申请</h3><ul><li>核心技能覆盖度高，简历中有直接证据</li><li>薪资和地点均满足你的硬性条件</li><li>职级与最近两段经历的职责范围一致</li></ul></section><section><h3>定制材料计划</h3><div className="material"><FileText size={18} /><div><strong>一页式定制简历</strong><span>突出 {job.tags.slice(0, 2).join("、")} 相关经历</span></div><span>待生成</span></div><div className="material"><Sparkles size={18} /><div><strong>开放题答案草稿</strong><span>仅使用画像中可验证的事实</span></div><span>待生成</span></div></section><div className="drawer-footer"><a className="source-job-button" href={job.url} target="_blank" rel="noreferrer"><ExternalLink size={16} />打开原岗位</a><button onClick={() => onStatus(job.id, "已跳过")}>跳过</button><button className="primary" onClick={() => onStatus(job.id, "已加入")}><Check size={17} />加入申请队列</button></div></aside></div>;
}
