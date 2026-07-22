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
  KeyRound,
  LayoutDashboard,
  ListChecks,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Play,
  Route,
  Search,
  Send,
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
  description?: string;
};

type UserIdentity = { name: string; location: string; focus: string };
type ScanStats = { scanned: number; sources: number; fetchedAt: string | null; failures: string[]; isDemo: boolean };
type LinkedInConfig = { enabled: boolean; keywords: string; location: string; workplace: string; datePosted: string; experience: string[]; employment: string; easyApply: boolean; mostRecent: boolean };
type LinkedInImport = { company: string; role: string; location: string; url: string; description: string };
const defaultIdentity: UserIdentity = { name: "Jack Zhang", location: "Toronto", focus: "Product Design" };
const defaultLinkedIn: LinkedInConfig = { enabled: false, keywords: "", location: "Toronto, Canada", workplace: "hybrid-remote", datePosted: "day", experience: ["4", "5"], employment: "F", easyApply: false, mostRecent: true };
const isStaticDemo = import.meta.env.VITE_STATIC_DEMO === "true";

function linkedInSearchUrl(config: LinkedInConfig) {
  const params = new URLSearchParams();
  if (config.keywords.trim()) params.set("keywords", config.keywords.trim());
  if (config.location.trim()) params.set("location", config.location.trim());
  if (config.datePosted === "day") params.set("f_TPR", "r86400");
  if (config.datePosted === "week") params.set("f_TPR", "r604800");
  if (config.datePosted === "month") params.set("f_TPR", "r2592000");
  if (config.workplace === "remote") params.set("f_WT", "2");
  if (config.workplace === "hybrid") params.set("f_WT", "3");
  if (config.workplace === "onsite") params.set("f_WT", "1");
  if (config.workplace === "hybrid-remote") params.set("f_WT", "2,3");
  if (config.experience.length) params.set("f_E", config.experience.join(","));
  if (config.employment) params.set("f_JT", config.employment);
  if (config.easyApply) params.set("f_AL", "true");
  if (config.mostRecent) params.set("sortBy", "DD");
  return `https://www.linkedin.com/jobs/search/?${params.toString()}`;
}

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
  { id: "coach", label: "职业教练", icon: MessageCircle },
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
  const [scanStats, setScanStats] = useState<ScanStats>({ scanned: seedJobs.length, sources: 0, fetchedAt: null, failures: [], isDemo: true });
  const [identity, setIdentity] = useState<UserIdentity>(defaultIdentity);
  const [hydrated, setHydrated] = useState(false);
  const [showApiTest, setShowApiTest] = useState(false);
  const [linkedInConfig, setLinkedInConfig] = useState<LinkedInConfig>(defaultLinkedIn);
  const scanRequest = useRef<{ id: number; controller: AbortController } | null>(null);

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
      try { setScanStats({ scanned: seedJobs.length, sources: 0, fetchedAt: null, failures: [], isDemo: true, ...JSON.parse(savedScanStats) }); } catch { localStorage.removeItem("cat-career-scan-stats"); }
    }
    const savedProfile = localStorage.getItem("cat-career-profile");
    if (savedProfile) {
      try { setCurrentProfile({ ...defaultProfile, ...JSON.parse(savedProfile) }); } catch { localStorage.removeItem("cat-career-profile"); }
    }
    const savedIdentity = localStorage.getItem("cat-career-identity");
    if (savedIdentity) {
      try { setIdentity({ ...defaultIdentity, ...JSON.parse(savedIdentity) }); } catch { localStorage.removeItem("cat-career-identity"); }
    }
    const savedLinkedIn = localStorage.getItem("cat-career-linkedin");
    if (savedLinkedIn) {
      try { setLinkedInConfig({ ...defaultLinkedIn, ...JSON.parse(savedLinkedIn) }); } catch { localStorage.removeItem("cat-career-linkedin"); }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("cat-career-jobs", JSON.stringify(jobs));
  }, [hydrated, jobs]);

  const visibleJobs = useMemo(
    () => jobs.filter((job) => `${job.company} ${job.role} ${job.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())),
    [jobs, query],
  );

  function updateStatus(id: number, status: Job["status"]) {
    setJobs((current) => current.map((job) => (job.id === id ? { ...job, status } : job)));
    setSelected((current) => (current?.id === id ? { ...current, status } : current));
    setNotice(status === "已加入" ? "已加入申请队列，最终提交前仍需你确认。" : status === "已跳过" ? "已从今日推荐中跳过。" : "已恢复为待确认状态。");
    window.setTimeout(() => setNotice(null), 2600);
  }

  async function scanForProfile(profile: JobProfile, profileChanged = false, silent = false) {
    scanRequest.current?.controller.abort();
    const request = { id: (scanRequest.current?.id || 0) + 1, controller: new AbortController() };
    scanRequest.current = request;
    setRunning(true);
    if (profileChanged) {
      setJobs((current) => current.filter((job) => job.status === "已加入" || job.source === "LinkedIn · 用户导入").map((job) => {
        if (job.source !== "LinkedIn · 用户导入" || !job.description) return job;
        const rescored = buildImportedLinkedInJob({ company: job.company, role: job.role, location: job.location, url: job.url, description: job.description }, profile);
        return { ...rescored, id: job.id, status: job.status };
      }));
      setActive("overview");
      setNotice("新画像已保存，正在重新扫描真实职位…");
    }
    try {
      const savedSources = localStorage.getItem("cat-career-sources");
      let sources = ["Greenhouse", "Lever", "Ashby"];
      if (savedSources) {
        try {
          const enabled = JSON.parse(savedSources) as Record<string, boolean>;
          sources = sources.filter((source) => enabled[source] !== false);
        } catch { localStorage.removeItem("cat-career-sources"); }
      }
      const response = await fetch("/api/scan-jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...profile, sources }), signal: request.controller.signal, cache: "no-store" });
      const result = await response.json() as { jobs?: Job[]; scanned?: number; sources?: number; fetchedAt?: string; failures?: string[]; error?: string };
      if (!response.ok || !result.jobs) throw new Error(result.error || "职位扫描失败");
      if (scanRequest.current?.id !== request.id) return;
      setJobs((current) => {
        const currentByUrl = new Map(current.map((job) => [job.url, job]));
        const refreshed = result.jobs!.map((job) => ({ ...job, status: currentByUrl.get(job.url)?.status || job.status }));
        const returnedUrls = new Set(refreshed.map((job) => job.url));
        const preservedLocal = current.filter((job) => (job.status === "已加入" || job.source === "LinkedIn · 用户导入") && !returnedUrls.has(job.url));
        return [...refreshed, ...preservedLocal];
      });
      setSelected((current) => current ? result.jobs!.find((job) => job.url === current.url) || current : null);
      const nextStats: ScanStats = { scanned: result.scanned || 0, sources: result.sources || 0, fetchedAt: result.fetchedAt || new Date().toISOString(), failures: result.failures || [], isDemo: false };
      setScanStats(nextStats);
      localStorage.setItem("cat-career-scan-stats", JSON.stringify(nextStats));
      if (!silent) setNotice(`刷新完成：从 ${nextStats.sources} 个公开职位板读取 ${nextStats.scanned} 个岗位${nextStats.failures.length ? `；${nextStats.failures.length} 个来源暂时不可用` : ""}。`);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      if (!silent) setNotice(profileChanged ? "旧推荐已失效，但实时职位刷新暂时不可用。请稍后重试。" : error instanceof Error ? error.message : "职位刷新暂时不可用，请稍后重试。");
    } finally {
      if (scanRequest.current?.id === request.id) {
        setRunning(false);
        if (!silent) window.setTimeout(() => setNotice(null), 3200);
      }
    }
  }

  useEffect(() => {
    if (!hydrated || isStaticDemo) return;
    void scanForProfile(currentProfile, false, true);
    const refresh = () => { if (document.visibilityState === "visible") void scanForProfile(currentProfile, false, true); };
    const timer = window.setInterval(refresh, 5 * 60 * 1000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
      scanRequest.current?.controller.abort();
    };
  // Start one live refresh after browser state is restored, then refresh while the dashboard is in use.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

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

  function importLinkedInJob(input: LinkedInImport) {
    const job = buildImportedLinkedInJob(input, currentProfile);
    setJobs((current) => [job, ...current.filter((existing) => existing.url !== job.url)]);
    setActive("jobs");
    setNotice(`已导入并评分：${job.company} · ${job.role}（${job.score} 分）`);
    window.setTimeout(() => setNotice(null), 3600);
  }

  function removeImportedJob(id: number) {
    setJobs((current) => current.filter((job) => job.id !== id));
    setSelected(null);
    setNotice("已从本地职位池移除用户导入的 LinkedIn 职位。");
    window.setTimeout(() => setNotice(null), 2800);
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
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>{count && <b>{id === "queue" ? queued : id === "jobs" ? jobs.length : count}</b>}
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
          <div className="top-actions">{isStaticDemo && <span className="demo-badge">GITHUB LIVE DEMO</span>}<button aria-label="帮助" onClick={() => setActive("coach")}><CircleHelp size={19} /></button><button aria-label="通知" className="notification" onClick={() => { setNotice(scanStats.failures.length ? `${scanStats.failures.length} 个职位来源暂时不可用，健康来源仍已更新。` : isStaticDemo ? "这是免费的静态演示版；实时公开职位扫描只在本地或服务端版本中运行。" : "没有新的系统通知，职位数据会在页面可见时自动刷新。"); window.setTimeout(() => setNotice(null), 3200); }}><Bell size={19} />{scanStats.failures.length > 0 && <i />}</button><button className="api-test-button" aria-label="本地 API 测试" title="本地 API 测试" onClick={() => setShowApiTest(true)}><KeyRound size={18} /></button><button className="scan-button" onClick={runScan} disabled={running || isStaticDemo} title={isStaticDemo ? "静态 Demo 不运行服务端职位扫描" : undefined}><Play size={16} fill="currentColor" />{isStaticDemo ? "演示数据" : running ? "正在扫描…" : "立即扫描"}</button></div>
        </header>

        {active === "overview" || active === "jobs" || active === "queue" ? (
          <DashboardContent jobs={visibleJobs} queued={queued} reviewed={reviewed} active={active} running={running} scanStats={scanStats} linkedIn={linkedInConfig} userName={identity.name} setSelected={setSelected} updateStatus={updateStatus} runScan={runScan} onViewAll={() => setActive("jobs")} onOpenSources={() => setActive("sources")} />
        ) : active === "profile" ? (
          <ProfilePanel onProfileChanged={handleProfileChanged} onOpenCoach={() => setActive("coach")} />
        ) : active === "coach" ? (
          <CareerCoachPanel onOpenProfile={() => setActive("profile")} />
        ) : active === "materials" ? (
          <MaterialsPanel jobs={jobs} onOpenProfile={() => setActive("profile")} onOpenQueue={() => setActive("queue")} />
        ) : active === "sources" ? (
          <SourcesPanel onRefresh={runScan} onLinkedInChange={setLinkedInConfig} onLinkedInImport={importLinkedInJob} />
        ) : (
          <AutomationPanel identity={identity} onIdentityChange={updateIdentity} />
        )}
      </main>

      {selected && <JobDrawer job={selected} onClose={() => setSelected(null)} onStatus={updateStatus} onRemoveImported={removeImportedJob} />}
      {showApiTest && <LocalApiKeyDialog onClose={() => setShowApiTest(false)} onOpenCoach={() => { setShowApiTest(false); setActive("coach"); }} />}
      {notice && <div className="toast"><Check size={17} />{notice}</div>}
    </div>
  );
}

function LocalApiKeyDialog({ onClose, onOpenCoach }: { onClose: () => void; onOpenCoach: () => void }) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5.6-sol");
  const [configured, setConfigured] = useState(false);
  const [localRequest, setLocalRequest] = useState(true);
  const [state, setState] = useState<"idle" | "checking" | "ready" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/openai-key", { cache: "no-store" }).then((response) => response.json()).then((result) => {
      setConfigured(Boolean(result.configured));
      setLocalRequest(Boolean(result.localRequest));
      if (result.model) setModel(result.model);
    }).catch(() => { setState("error"); setMessage("无法读取本地 API 状态。"); });
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  async function validateKey() {
    if (!apiKey.trim()) { setState("error"); setMessage("请输入 API Key。"); return; }
    setState("checking");
    setMessage("正在验证 Key 与模型权限…");
    try {
      const response = await fetch("/api/openai-key", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ apiKey: apiKey.trim(), model: model.trim() }) });
      const result = await response.json() as { valid?: boolean; model?: string; error?: string };
      if (!response.ok || !result.valid) throw new Error(result.error || "验证失败。");
      setApiKey("");
      setConfigured(true);
      setState("ready");
      setMessage(`验证成功，${result.model || model} 已可用于当前本地服务会话。`);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "验证失败，请检查 Key 和网络。");
    }
  }

  async function removeKey() {
    const response = await fetch("/api/openai-key", { method: "DELETE" });
    const result = await response.json() as { configured?: boolean; error?: string };
    if (!response.ok) { setState("error"); setMessage(result.error || "移除失败。"); return; }
    setConfigured(Boolean(result.configured));
    setState("idle");
    setMessage(result.configured ? "临时 Key 已移除；服务端环境变量仍提供 API Key。" : "临时 API Key 已从当前本地服务会话移除。");
  }

  return <div className="api-test-layer" role="presentation"><section className="api-test-dialog" role="dialog" aria-modal="true" aria-labelledby="api-test-title">
    <button className="api-test-close" aria-label="关闭本地 API 测试" onClick={onClose}><X size={18} /></button>
    <div className="api-test-heading"><div><KeyRound size={22} /></div><span><h2 id="api-test-title">本地 API Key 测试</h2><p>安全验证后，直接测试简历分析和职业教练。</p></span></div>
    <div className="api-safety-note"><ShieldCheck size={17} /><p><strong>只用于当前本地服务进程</strong>Key 不写入 localStorage、Cookie、文件或 Git；重启服务或点击移除后即清除。验证请求会直接发送到 OpenAI。</p></div>
    {!localRequest && <div className="api-test-error">此窗口只允许在 localhost 或 127.0.0.1 使用。</div>}
    <label>OpenAI API Key<input type="password" autoComplete="off" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="sk-…" disabled={!localRequest} /></label>
    <label>模型 ID<input value={model} onChange={(event) => setModel(event.target.value)} placeholder="gpt-5.6-sol" disabled={!localRequest} /></label>
    <div className="api-test-actions"><button className="primary" disabled={!localRequest || state === "checking"} onClick={() => void validateKey()}>{state === "checking" ? "验证中…" : "验证并用于本次会话"}</button>{configured && <button className="secondary-action" onClick={onOpenCoach}>打开职业教练测试</button>}{configured && <button className="secondary-action danger" onClick={() => void removeKey()}>移除临时 Key</button>}</div>
    {message && <p className={`api-test-message ${state === "error" ? "error" : state === "ready" ? "ready" : ""}`} aria-live="polite">{message}</p>}
  </section></div>;
}

function DashboardContent({ jobs, queued, reviewed, active, running, scanStats, linkedIn, userName, setSelected, updateStatus, runScan, onViewAll, onOpenSources }: { jobs: Job[]; queued: number; reviewed: number; active: string; running: boolean; scanStats: ScanStats; linkedIn: LinkedInConfig; userName: string; setSelected: (job: Job) => void; updateStatus: (id: number, status: Job["status"]) => void; runScan: () => void; onViewAll: () => void; onOpenSources: () => void }) {
  const [highOnly, setHighOnly] = useState(false);
  const [sortMode, setSortMode] = useState<"score" | "company">("score");
  const highMatches = jobs.filter((job) => job.score >= 80);
  const shownBase = active === "queue" ? jobs.filter((j) => j.status === "已加入") : active === "overview" ? highMatches.slice(0, 10) : highOnly ? highMatches : jobs;
  const shown = [...shownBase].sort((a, b) => sortMode === "company" ? a.company.localeCompare(b.company) : b.score - a.score);
  const acceptanceRate = reviewed > 0 ? Math.round((queued / reviewed) * 100) : null;
  return <div className="content">
    <section className="page-heading"><div><p className="eyebrow" suppressHydrationWarning>{new Intl.DateTimeFormat("zh-CN", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</p><h1>{active === "queue" ? "申请队列" : active === "jobs" ? "全部职位" : `早上好，${userName.trim().split(/\s+/)[0] || "朋友"}`}</h1><p>{active === "queue" ? "检查材料，准备好后再进入投递步骤。" : running ? "正在从公开职位板获取最新岗位，已有结果会保留到刷新完成。" : "下面是根据最新公开职位数据筛选出的优先机会。"}</p></div><div className="next-run"><Clock3 size={18} /><div><span>{running ? "实时刷新中" : "数据状态"}</span><strong>{scanStats.isDemo ? "演示数据" : scanStats.fetchedAt ? `更新于 ${new Date(scanStats.fetchedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}` : "等待刷新"}</strong></div></div></section>

    <section className="stats-grid">
      <div className="stat"><div className="stat-icon coral"><Search size={19} /></div><div><span>本次扫描职位</span><strong>{scanStats.scanned}</strong><small>{scanStats.isDemo ? "首次实时刷新后替换演示数据" : `来自 ${scanStats.sources} 个公开职位板`}</small></div></div>
      <div className="stat"><div className="stat-icon violet"><Sparkles size={19} /></div><div><span>高匹配推荐</span><strong>{highMatches.length}</strong><small>匹配度 80% 以上</small></div></div>
      <div className="stat"><div className="stat-icon green"><ListChecks size={19} /></div><div><span>待确认申请</span><strong>{queued}</strong><small>提交前由你审核</small></div></div>
      <div className="stat"><div className="stat-icon blue"><Gauge size={19} /></div><div><span>推荐采纳率</span><strong>{acceptanceRate === null ? "—" : `${acceptanceRate}%`}</strong><small>{reviewed > 0 ? `已采纳 ${queued} / 已审阅 ${reviewed}` : "审阅推荐后自动计算"}</small></div></div>
    </section>

    {active !== "queue" && <section className="radar-card"><div className="radar-copy"><div className="radar-icon"><Sparkles size={24} /></div><div><span className="pill">今日任务</span><h2>{running ? "正在按最新画像重新扫描…" : `${highMatches.length} 个机会，已经按当前简历排好优先级`}</h2><p>综合目标职位、地点偏好和岗位描述实时评分。更换简历后会清除旧结果并重新扫描。</p><div className="pipeline"><span><b>{scanStats.scanned}</b> 已抓取</span><i /><span><b>{jobs.length}</b> 进入职位池</span><i /><span><b>{highMatches.length}</b> 高匹配</span></div></div></div><button onClick={runScan} disabled={running}>{running ? "分析中…" : "重新扫描"}<ArrowUpRight size={17} /></button></section>}

    {active !== "queue" && <section className={`linkedin-dashboard-card ${linkedIn.enabled ? "configured" : ""}`}><div className="linkedin-dashboard-logo">in</div><div className="linkedin-dashboard-copy"><span>LINKEDIN JOBS</span><h2>{linkedIn.enabled ? linkedIn.keywords || "LinkedIn 职位搜索" : "把 LinkedIn 搜索加入 Dashboard"}</h2><p>{linkedIn.enabled ? `${linkedIn.location || "不限地点"} · ${linkedIn.datePosted === "day" ? "过去 24 小时" : linkedIn.datePosted === "week" ? "过去一周" : linkedIn.datePosted === "month" ? "过去一个月" : "不限时间"}${linkedIn.easyApply ? " · Easy Apply" : ""}` : "保存关键词与地点后，这里会固定显示你的 LinkedIn 搜索入口。"}</p></div><span className="linkedin-dashboard-status">{linkedIn.enabled ? "已显示在 Dashboard" : "未配置"}</span>{linkedIn.enabled ? <a href={linkedInSearchUrl(linkedIn)} target="_blank" rel="noreferrer">查看 LinkedIn 职位<ExternalLink size={15} /></a> : <button onClick={onOpenSources}>配置 LinkedIn<ArrowUpRight size={15} /></button>}<div className="linkedin-dashboard-boundary"><ShieldCheck size={14} />LinkedIn 职位页由 LinkedIn 提供；当前应用不抓取登录数据。</div></section>}

    <section className="jobs-section"><div className="section-header"><div><h2>{active === "queue" ? `待确认申请 · ${shown.length}` : "今日最佳匹配"}</h2><p>{active === "queue" ? "系统只会准备材料，不会未经确认点击最终提交。" : running ? "正在同步最新结果…" : scanStats.fetchedAt ? `最新数据 · ${new Date(scanStats.fetchedAt).toLocaleString("zh-CN")}` : "等待首次实时刷新"}</p></div><div className="filter-actions"><button onClick={() => setHighOnly((current) => !current)} aria-pressed={highOnly}><Filter size={16} />{highOnly ? "仅 80+" : "全部分数"}</button><button onClick={() => setSortMode((current) => current === "score" ? "company" : "score")}><SlidersHorizontal size={16} />排序：{sortMode === "score" ? "匹配度" : "公司"}<ChevronDown size={14} /></button></div></div>
      <div className="jobs-table" role="table">
        <div className="table-head" role="row"><span>公司 / 职位</span><span>地点</span><span>薪资范围</span><span>匹配度</span><span>状态</span><span /></div>
        {shown.length === 0 ? <div className="empty-state"><Inbox size={28} /><h3>{running ? "正在刷新推荐" : active === "queue" ? "队列还是空的" : "当前画像暂无 80 分以上职位"}</h3><p>{running ? "正在读取公开职位板并按新简历重新评分。" : active === "queue" ? "在职位右侧点击“加入”，合适的机会就会出现在这里。" : "你仍可在职位池查看较低匹配岗位，或点击重新扫描。"}</p></div> : shown.map((job) => <div className="job-row" role="row" key={job.id} onClick={() => setSelected(job)}>
          <div className="job-main"><div className="company-logo" style={{ background: job.color }}>{job.initials}</div><div><strong>{job.role}</strong><span>{job.company} · {job.source} · {job.posted}</span><div className="tags">{job.tags.slice(0, 2).map((tag) => <em key={tag}>{tag}</em>)}</div></div></div>
          <div className="muted-cell"><MapPin size={15} /><span>{job.location}<small>{job.mode}</small></span></div>
          <div className="salary">{job.salary}<small>估算年薪</small></div>
          <div className="score"><div style={{ "--score": `${job.score}%` } as React.CSSProperties}><span>{job.score}</span></div><small>{job.score >= 90 ? "极佳" : job.score >= 85 ? "优秀" : "很合适"}</small></div>
          <div><span className={`status ${job.status}`}>{job.status}</span></div>
          <div className="row-actions" onClick={(e) => e.stopPropagation()}><a className="external-job-link" href={job.url} target="_blank" rel="noreferrer" aria-label={`打开 ${job.company} 原岗位`} title="查看原岗位"><ExternalLink size={16} /></a>{job.status === "待确认" ? <><button className="approve" aria-label="加入队列" onClick={() => updateStatus(job.id, "已加入")}><Check size={16} /></button><button aria-label="跳过" onClick={() => updateStatus(job.id, "已跳过")}><X size={16} /></button></> : <button className="more" aria-label="恢复为待确认" title="恢复为待确认" onClick={() => updateStatus(job.id, "待确认")}><MoreHorizontal size={18} /></button>}</div>
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

function buildImportedLinkedInJob(input: LinkedInImport, profile: JobProfile): Job {
  const ignored = new Set(["senior", "staff", "lead", "principal", "manager", "and", "the", "for", "product", "with", "you", "your"]);
  const tokenize = (value: string) => [...new Set(value.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((token) => token.length > 2 && !ignored.has(token)))];
  const targets = profile.roleKeywords.split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);
  const targetTokens = tokenize(targets.join(" "));
  const candidateText = `${input.role} ${input.description}`;
  const candidateTokens = tokenize(candidateText);
  const overlap = targetTokens.filter((token) => candidateTokens.includes(token));
  const exactRole = targets.some((target) => input.role.toLowerCase().includes(target.toLowerCase()) || target.toLowerCase().includes(input.role.toLowerCase()));
  const locationMatch = profile.location.toLowerCase().split(/[,\s]+/).filter((part) => part.length > 3).some((part) => input.location.toLowerCase().includes(part));
  const score = Math.max(35, Math.min(97, 48 + (exactRole ? 30 : 0) + Math.min(15, overlap.length * 5) + (locationMatch ? 4 : 0)));
  const reason = exactRole
    ? `用户导入的职位名称与目标画像直接重合${locationMatch ? "，地点也符合偏好" : ""}`
    : overlap.length
      ? `用户导入的职位与目标关键词重合：${overlap.slice(0, 3).join("、")}`
      : "用户导入的职位与当前画像关联较弱，建议人工复核完整描述";
  return {
    id: Date.now(),
    company: input.company.trim(),
    initials: input.company.trim().slice(0, 1).toUpperCase() || "L",
    color: "#0a66c2",
    role: input.role.trim(),
    location: input.location.trim(),
    mode: /remote|远程/i.test(`${input.location} ${input.description}`) ? "远程" : "职位页查看",
    salary: "职位页查看",
    score,
    reason,
    tags: overlap.slice(0, 3).map((tag) => tag.replace(/^./, (letter) => letter.toUpperCase())),
    source: "LinkedIn · 用户导入",
    url: input.url.trim(),
    posted: "刚刚导入",
    status: "待确认",
    description: input.description.trim(),
  };
}

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

function ProfilePanel({ onProfileChanged, onOpenCoach }: { onProfileChanged: (profile: JobProfile) => void; onOpenCoach: () => void }) {
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
      onOpenCoach();
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
      <div className="large-icon"><Upload size={25} /></div><h2>{uploadState === "reading" ? "正在读取简历…" : dragging ? "松开即可导入" : "导入你的主简历"}</h2><p>支持 PDF、DOCX、TXT 或 Markdown。也可以把文件直接拖到这里。</p><button disabled={uploadState === "reading"} onClick={() => inputRef.current?.click()}>{uploadState === "reading" ? "解析中…" : "选择简历文件"}</button><small>最大 10 MB · 文件保存在本机；启用 AI 时文字会发送到配置的 OpenAI API</small>
    </>}
    {uploadError && <div className="upload-error">{uploadError}</div>}
  </section><section className="panel form-panel"><div className="profile-title"><div><h2>目标职位</h2><span className={`api-status ${apiConfigured ? "ready" : ""}`}><i />{apiConfigured === null ? "检查 AI 配置" : apiConfigured ? "AI 已连接" : "AI 未配置"}</span></div>{resume && <button className="analyze-button" disabled={analysisState === "analyzing"} onClick={() => void analyzeResume(resume.text)}><Sparkles size={14} />{analysisState === "analyzing" ? "分析中…" : "重新分析简历"}</button>}</div>{analysisMessage && <div className="analysis-message"><Sparkles size={15} /><span>{analysisMessage}</span></div>}<label>职位关键词<input value={profile.roleKeywords} onChange={(event) => setProfile({ ...profile, roleKeywords: event.target.value })} /></label><label>地点<input value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} /></label><div className="two-col"><label>最低年薪<input value={profile.minSalary} onChange={(event) => setProfile({ ...profile, minSalary: event.target.value })} /></label><label>工作方式<select value={profile.workMode} onChange={(event) => setProfile({ ...profile, workMode: event.target.value })}><option value="hybrid">远程或混合</option><option value="remote">仅远程</option><option value="onsite">接受现场办公</option></select></label></div><div className="save-row"><button className="primary" onClick={saveProfile}>保存画像</button>{profileNotice && <span><Check size={14} />{profileNotice}</span>}</div>{apiConfigured === false && <p className="api-hint">要启用 AI 自动分析，请在项目的 <code>.env.local</code> 中设置 <code>OPENAI_API_KEY</code>，然后重启本地服务。</p>}</section></div></div>;
}

type CoachMessage = { id: string; role: "user" | "assistant"; content: string };
type RoadmapStage = { title: string; duration: string; outcomes: string[]; project: string };

function buildLocalRoadmap(target: string): RoadmapStage[] {
  const role = target || "目标职位";
  return [
    { title: "确认方向与差距", duration: "第 1–2 周", outcomes: [`拆解 10 个真实 ${role} 职位描述`, "标记已有证据、待验证经验和技能缺口"], project: "产出一页能力差距表，并选择一个最想解决的真实问题。" },
    { title: "补齐核心能力", duration: "第 3–6 周", outcomes: ["完成 1 门针对最高优先级缺口的课程", "每周用小练习验证知识，而不是只看课程"], project: `完成一个贴近 ${role} 日常工作的迷你项目。` },
    { title: "做出可展示案例", duration: "第 7–10 周", outcomes: ["记录问题、约束、决策、迭代和结果", "邀请 2 位从业者给出反馈并完成一次迭代"], project: "发布一个包含过程证据与复盘的作品案例。" },
    { title: "进入市场验证", duration: "第 11–12 周", outcomes: ["更新简历与个人资料中的可迁移证据", "完成 3 次信息访谈和 2 次模拟面试"], project: `用定向申请验证 ${role} 方向，并根据反馈调整下一轮计划。` },
  ];
}

function CareerCoachPanel({ onOpenProfile }: { onOpenProfile: () => void }) {
  const [resume] = useState<SavedResume | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(localStorage.getItem("cat-career-resume") || "null"); } catch { return null; }
  });
  const [target, setTarget] = useState(() => {
    if (typeof window === "undefined") return "";
    try { return localStorage.getItem("cat-career-coach-target") || (JSON.parse(localStorage.getItem("cat-career-profile") || "null") as JobProfile | null)?.roleKeywords?.split(",")[0]?.trim() || ""; } catch { return ""; }
  });
  const [messages, setMessages] = useState<CoachMessage[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("cat-career-coach-messages") || "[]"); } catch { return []; }
  });
  const [roadmap, setRoadmap] = useState<RoadmapStage[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("cat-career-coach-roadmap") || "[]"); } catch { return []; }
  });
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [coachMode, setCoachMode] = useState<"ai" | "local" | null>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resume || messages.length) return;
    const roles = inferRolesLocally(resume.text);
    const introduction: CoachMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: `我已读取《${resume.name}》。从明确出现的经历看，你可能适合 ${roles.slice(0, 2).join(" 或 ")}。不过职位名称并不能说明你真正喜欢什么：你最有成就感的一个项目是什么？你在其中亲自做了哪些决定，又产生了什么结果？`,
    };
    setMessages([introduction]);
    setRoadmap(buildLocalRoadmap(target || roles[0]));
    setCoachMode("local");
  // Start a new evidence-based conversation only when this resume has no saved conversation.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  useEffect(() => {
    localStorage.setItem("cat-career-coach-messages", JSON.stringify(messages));
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("cat-career-coach-roadmap", JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem("cat-career-coach-target", target);
  }, [target]);

  async function sendMessage(suggested?: string) {
    const content = (suggested || draft).trim();
    if (!content || !resume || sending) return;
    const userMessage: CoachMessage = { id: crypto.randomUUID(), role: "user", content };
    const history = [...messages, userMessage];
    setMessages(history);
    setDraft("");
    setSending(true);
    try {
      const response = await fetch("/api/career-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: resume.text, targetRole: target, messages: history.slice(-10).map(({ role, content: text }) => ({ role, content: text })) }),
      });
      const result = await response.json() as { reply?: string; roadmap?: RoadmapStage[]; error?: string };
      if (!response.ok || !result.reply) throw new Error(result.error || "AI coach unavailable");
      setMessages((current) => [...current, { id: crypto.randomUUID(), role: "assistant", content: result.reply! }]);
      if (result.roadmap?.length) setRoadmap(result.roadmap);
      setCoachMode("ai");
    } catch {
      const roles = inferRolesLocally(resume.text);
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `我先用本地教练模式继续。你提到“${content.slice(0, 80)}”。为了判断这段经验能否迁移到 ${target || roles[0]}，请补充三个证据：你解决了谁的问题、你亲自做了什么、结果如何衡量？有了这些信息，我可以帮助你把经历改写成目标岗位能理解的案例。`,
      }]);
      setRoadmap(buildLocalRoadmap(target || roles[0]));
      setCoachMode("local");
    } finally {
      setSending(false);
    }
  }

  function resetConversation() {
    const roles = inferRolesLocally(resume.text);
    setMessages([{ id: crypto.randomUUID(), role: "assistant", content: `我们重新开始。简历显示你具备与 ${roles[0]} 相关的经验，但我不会仅凭职位名称替你决定方向。你现在最想保留的工作内容是什么，最想摆脱的又是什么？` }]);
    setRoadmap(buildLocalRoadmap(target));
    localStorage.removeItem("cat-career-coach-messages");
  }

  if (!resume) return <div className="content narrow"><section className="page-heading"><div><p className="eyebrow">CAREER COACH</p><h1>AI 职业教练</h1><p>先导入简历，教练才会基于真实经历提问，而不是给出泛泛建议。</p></div></section><section className="panel coach-empty"><MessageCircle size={30} /><h2>导入简历后开始对话</h2><p>我们会识别可迁移经验、探索转行方向，并生成可执行的学习路线。</p><button className="primary" onClick={onOpenProfile}>前往导入简历</button></section></div>;

  return <div className="content coach-page">
    <section className="page-heading"><div><p className="eyebrow">CAREER COACH</p><h1>职业方向对话</h1><p>基于简历证据探索下一步，也可以讨论完全不同的职业方向。</p></div><span className={`coach-mode ${coachMode === "ai" ? "ai" : ""}`}><i />{coachMode === "ai" ? "AI 深度教练" : "本地教练模式"}</span></section>
    <section className="coach-layout">
      <div className="panel coach-chat">
        <div className="coach-toolbar"><div><MessageCircle size={18} /><span><strong>{resume.name}</strong><small>对话保存在当前浏览器</small></span></div><button onClick={resetConversation}>重新开始</button></div>
        <div className="coach-messages" aria-live="polite">{messages.map((message) => <div className={`coach-message ${message.role}`} key={message.id}><span>{message.role === "assistant" ? "教练" : "你"}</span><p>{message.content}</p></div>)}{sending && <div className="coach-message assistant thinking"><span>教练</span><p>正在梳理你的经历与目标…</p></div>}<div ref={messagesEnd} /></div>
        <div className="coach-prompts"><button onClick={() => void sendMessage("我不喜欢现在的工作，想探索可以转去哪些领域。")}>我想转行</button><button onClick={() => void sendMessage("请挑战一下我当前的目标职位是否现实。")}>检验目标</button><button onClick={() => void sendMessage("请根据我的经历追问一个最关键的项目。")}>深挖项目</button></div>
        <form className="coach-composer" onSubmit={(event) => { event.preventDefault(); void sendMessage(); }}><textarea aria-label="给职业教练发送消息" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="例如：我做了 5 年运营，但想转到产品管理，我该从哪里开始？" rows={3} /><button type="submit" disabled={!draft.trim() || sending} aria-label="发送"><Send size={17} /></button></form>
        <p className="coach-privacy"><ShieldCheck size={13} />对话保存在本机；启用 AI 教练时，简历文字与最近对话会发送到你配置的 OpenAI API。</p>
      </div>
      <aside className="panel roadmap-panel"><div className="roadmap-heading"><Route size={20} /><div><h2>目标学习路线</h2><p>路线会随对话和目标更新</p></div></div><label>目标职位<input value={target} onChange={(event) => setTarget(event.target.value)} onBlur={(event) => setRoadmap(buildLocalRoadmap(event.target.value))} placeholder="例如：Product Manager" /></label><div className="roadmap-list">{roadmap.map((stage, index) => <article key={`${stage.title}-${index}`}><div className="roadmap-index">{index + 1}</div><div><span>{stage.duration}</span><h3>{stage.title}</h3><ul>{stage.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><p><strong>实践项目</strong>{stage.project}</p></div></article>)}</div></aside>
    </section>
  </div>;
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

function SourcesPanel({ onRefresh, onLinkedInChange, onLinkedInImport }: { onRefresh: () => void; onLinkedInChange: (config: LinkedInConfig) => void; onLinkedInImport: (input: LinkedInImport) => void }) {
  const [sourceEnabled, setSourceEnabled] = useState<Record<string, boolean>>({ Greenhouse: true, Lever: true, Ashby: true, LinkedIn: false });
  const [linkedIn, setLinkedIn] = useState<LinkedInConfig>(defaultLinkedIn);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [sourceNotice, setSourceNotice] = useState("");
  const [linkedInImport, setLinkedInImport] = useState<LinkedInImport>({ company: "", role: "", location: "", url: "", description: "" });

  useEffect(() => {
    const savedSources = localStorage.getItem("cat-career-sources");
    const savedLinkedIn = localStorage.getItem("cat-career-linkedin");
    const savedProfile = localStorage.getItem("cat-career-profile");
    if (savedSources) {
      try { setSourceEnabled((current) => ({ ...current, ...JSON.parse(savedSources) })); } catch { localStorage.removeItem("cat-career-sources"); }
    }
    if (savedLinkedIn) {
      try {
        const parsed = { ...defaultLinkedIn, ...JSON.parse(savedLinkedIn) };
        setLinkedIn(parsed);
        setShowLinkedIn(parsed.enabled);
        onLinkedInChange(parsed);
      } catch { localStorage.removeItem("cat-career-linkedin"); }
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
      onLinkedInChange(config);
    } else {
      window.setTimeout(onRefresh, 0);
    }
  }

  function saveLinkedIn() {
    if (!linkedIn.keywords.trim() || !linkedIn.location.trim()) {
      setSourceNotice("请先填写职位关键词和地点");
      return false;
    }
    const config = { ...linkedIn, enabled: true };
    const sources = { ...sourceEnabled, LinkedIn: true };
    setLinkedIn(config);
    setSourceEnabled(sources);
    onLinkedInChange(config);
    localStorage.setItem("cat-career-linkedin", JSON.stringify(config));
    localStorage.setItem("cat-career-sources", JSON.stringify(sources));
    setSourceNotice("LinkedIn 搜索已保存并显示在 Dashboard");
    window.setTimeout(() => setSourceNotice(""), 2500);
    return true;
  }

  function toggleExperience(value: string) {
    setLinkedIn((current) => ({ ...current, experience: current.experience.includes(value) ? current.experience.filter((item) => item !== value) : [...current.experience, value] }));
  }

  function importJob() {
    if (!linkedInImport.company.trim() || !linkedInImport.role.trim() || !linkedInImport.location.trim() || !linkedInImport.description.trim()) {
      setSourceNotice("导入评分需要公司、职位、地点和完整职位描述");
      return;
    }
    try {
      const url = new URL(linkedInImport.url);
      if (!/(^|\.)linkedin\.com$/i.test(url.hostname)) throw new Error("not LinkedIn");
    } catch {
      setSourceNotice("请输入有效的 LinkedIn 职位链接");
      return;
    }
    onLinkedInImport(linkedInImport);
    setLinkedInImport({ company: "", role: "", location: "", url: "", description: "" });
  }

  const sources = [{ name: "Greenhouse", detail: "4 个公司职位板 · 自动实时刷新" }, { name: "Lever", detail: "1 个公司职位板 · 自动实时刷新" }, { name: "Ashby", detail: "1 个公司职位板 · 自动实时刷新" }, { name: "LinkedIn", detail: linkedIn.enabled ? "搜索入口已显示在 Dashboard" : "配置后显示在 Dashboard" }];
  return <div className="content narrow"><section className="page-heading"><div><p className="eyebrow">JOB SOURCES</p><h1>职位来源</h1><p>公开职位板会在 Dashboard 自动刷新；LinkedIn 会生成并保存搜索链接，由你在已登录的浏览器中查看。</p></div></section><section className="panel source-list"><div className="section-header"><div><h2>已配置来源</h2><p>公开职位板扫描时会自动去重；LinkedIn 不会被后台抓取。</p></div></div>{sources.map((source) => <div className={`source-row ${source.name === "LinkedIn" && showLinkedIn ? "selected" : ""}`} key={source.name}><div className={`source-symbol ${source.name === "LinkedIn" ? "linkedin" : ""}`}>{source.name === "LinkedIn" ? <span className="linkedin-glyph">in</span> : source.name[0]}</div><div><strong>{source.name}</strong><span>{source.detail}</span></div>{source.name === "LinkedIn" && <button className="source-config" onClick={() => setShowLinkedIn((current) => !current)}>{showLinkedIn ? "收起" : "配置"}</button>}<label className="switch"><input type="checkbox" checked={Boolean(sourceEnabled[source.name])} onChange={(event) => toggleSource(source.name, event.target.checked)} /><i /></label></div>)}</section>
    {showLinkedIn && <section className="panel linkedin-panel"><div className="linkedin-heading"><div><div className="linkedin-title"><span className="linkedin-glyph large">in</span><h2>LinkedIn Dashboard 搜索</h2></div><p>设置搜索条件并保存后，Dashboard 会持续显示这个 LinkedIn 搜索入口。</p></div><span className={`session-badge ${linkedIn.enabled ? "verified" : ""}`}><i />{linkedIn.enabled ? "已加入 Dashboard" : "待配置"}</span></div>
      <div className="linkedin-steps"><div className="done"><b>1</b><span>设置搜索条件</span></div><i /><div className={linkedIn.enabled ? "done" : ""}><b>2</b><span>保存到 Dashboard</span></div></div>
      <div className="linkedin-form"><label>职位关键词<input value={linkedIn.keywords} onChange={(event) => setLinkedIn({ ...linkedIn, keywords: event.target.value })} placeholder="例如：Senior Product Owner, Product Manager" /></label><label>地点<input value={linkedIn.location} onChange={(event) => setLinkedIn({ ...linkedIn, location: event.target.value })} placeholder="例如：Toronto, Canada" /></label><div className="linkedin-grid"><label>工作地点<select value={linkedIn.workplace} onChange={(event) => setLinkedIn({ ...linkedIn, workplace: event.target.value })}><option value="hybrid-remote">远程或混合</option><option value="remote">仅远程</option><option value="hybrid">仅混合</option><option value="onsite">仅现场</option><option value="all">不限</option></select></label><label>发布时间<select value={linkedIn.datePosted} onChange={(event) => setLinkedIn({ ...linkedIn, datePosted: event.target.value })}><option value="day">过去 24 小时</option><option value="week">过去一周</option><option value="month">过去一个月</option><option value="any">不限</option></select></label><label>雇佣类型<select value={linkedIn.employment} onChange={(event) => setLinkedIn({ ...linkedIn, employment: event.target.value })}><option value="F">全职</option><option value="C">合同</option><option value="P">兼职</option><option value="">不限</option></select></label></div>
        <fieldset><legend>经验级别</legend><div className="chip-options">{[["2","初级"],["3","助理"],["4","中高级"],["5","总监"],["6","高管"]].map(([value,label]) => <button type="button" className={linkedIn.experience.includes(value) ? "active" : ""} key={value} onClick={() => toggleExperience(value)}>{linkedIn.experience.includes(value) && <Check size={12} />}{label}</button>)}</div></fieldset>
        <div className="linkedin-checks"><label><input type="checkbox" checked={linkedIn.easyApply} onChange={(event) => setLinkedIn({ ...linkedIn, easyApply: event.target.checked })} /><span><strong>仅 Easy Apply</strong><small>只显示可在 LinkedIn 内申请的职位</small></span></label><label><input type="checkbox" checked={linkedIn.mostRecent} onChange={(event) => setLinkedIn({ ...linkedIn, mostRecent: event.target.checked })} /><span><strong>最新发布优先</strong><small>优先发现刚发布的机会</small></span></label></div>
      </div>
      <div className="linkedin-actions"><button className="primary" onClick={saveLinkedIn}><Check size={15} />保存到 Dashboard</button>{linkedIn.keywords.trim() && linkedIn.location.trim() && <a className="secondary-action" href={linkedInSearchUrl(linkedIn)} target="_blank" rel="noreferrer"><ExternalLink size={15} />预览 LinkedIn 搜索</a>}{sourceNotice && <span className="source-saved"><Check size={14} />{sourceNotice}</span>}</div>
      <div className="linkedin-note"><ShieldCheck size={17} /><p><strong>Dashboard 会显示搜索入口和筛选条件。</strong>职位结果仍由 LinkedIn 提供；当前应用不抓取已登录页面、不截取搜索结果，也不保存密码或 Cookie。获得 LinkedIn 授权职位读取 API 后，可再升级为职位列表同步。</p></div>
      <div className="linkedin-import"><div><span className="linkedin-glyph large">in</span><div><h3>导入 LinkedIn 职位并评分</h3><p>从职位页复制完整描述；系统会按当前求职画像评分，并把结果加入 Dashboard。</p></div></div><div className="linkedin-import-grid"><label>公司<input value={linkedInImport.company} onChange={(event) => setLinkedInImport({ ...linkedInImport, company: event.target.value })} placeholder="例如：Acme" /></label><label>职位名称<input value={linkedInImport.role} onChange={(event) => setLinkedInImport({ ...linkedInImport, role: event.target.value })} placeholder="例如：Senior Product Designer" /></label><label>地点<input value={linkedInImport.location} onChange={(event) => setLinkedInImport({ ...linkedInImport, location: event.target.value })} placeholder="例如：Toronto, Canada" /></label><label>LinkedIn 职位链接<input value={linkedInImport.url} onChange={(event) => setLinkedInImport({ ...linkedInImport, url: event.target.value })} placeholder="https://www.linkedin.com/jobs/view/…" /></label></div><label>完整职位描述<textarea value={linkedInImport.description} onChange={(event) => setLinkedInImport({ ...linkedInImport, description: event.target.value })} rows={7} placeholder="粘贴 Responsibilities、Qualifications 等完整职位文字，描述越完整，评分越可靠。" /></label><div className="linkedin-import-actions"><button className="primary" onClick={importJob}><Sparkles size={15} />导入、评分并显示在 Dashboard</button><small>评分只基于你提供的文字和当前画像；不会访问 LinkedIn 会话。</small></div></div>
    </section>}
  </div>;
}

function AutomationPanel({ identity, onIdentityChange }: { identity: UserIdentity; onIdentityChange: (identity: UserIdentity) => void }) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5.6-sol");
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

      <section className="panel settings-card"><div className="settings-card-heading"><div className="settings-card-icon ai"><Sparkles size={18} /></div><div><h2>OpenAI API</h2><p>用于简历画像分析；没有 Key 时自动使用本地规则。</p></div><span className={`api-status ${hasKey ? "ready" : ""}`}><i />{hasKey ? "本地服务已配置" : "未配置"}</span></div><div className="api-key-grid"><label>API Key<input type="password" autoComplete="off" value={apiKey} onChange={(event) => { setApiKey(event.target.value); setKeyStatus("idle"); }} placeholder={hasKey ? "输入新 Key 可替换当前会话 Key" : "sk-…"} /></label><label>模型 ID<input value={model} onChange={(event) => setModel(event.target.value)} placeholder="gpt-5.6-sol" /></label></div><div className="api-key-actions"><button className="primary" disabled={keyStatus === "checking"} onClick={() => void validateAndSaveKey()}>{keyStatus === "checking" ? "验证中…" : "验证并使用"}</button><button className="secondary-action danger" disabled={!hasKey} onClick={() => void removeKey()}>移除会话 Key</button>{keyMessage && <span className={keyStatus === "error" ? "error" : ""}>{keyStatus === "saved" && <Check size={14} />}{keyMessage}</span>}</div><div className="local-key-note"><ShieldCheck size={16} /><p>Key 不会进入浏览器存储、项目文件或 Git；页面刷新后仍可使用，但本地服务重启后会清除。需要持久化时请使用被 Git 忽略的 <code>.env.local</code>。</p></div></section>

      <section className="panel automation"><div className="automation-row"><div><strong>每日自动扫描</strong><span>工作日 08:30 · America/Toronto</span></div><label className="switch"><input type="checkbox" defaultChecked /><i /></label></div><div className="automation-row"><div><strong>自动生成定制材料</strong><span>只对 80 分以上且通过硬条件的职位执行</span></div><label className="switch"><input type="checkbox" defaultChecked /><i /></label></div><div className="automation-row"><div><strong>自动填充申请表</strong><span>实验性功能；遇到开放题、验证码或异常时暂停</span></div><label className="switch"><input type="checkbox" /><i /></label></div><div className="automation-row locked"><div><strong>自动点击最终提交</strong><span>默认关闭。建议保留人工确认，防止错投或错误声明。</span></div><ShieldCheck size={20} /></div></section>
    </div><section className="guardrail"><ShieldCheck size={21} /><div><strong>你的确认是最后一道门</strong><p>系统可以筛选、改写和填表，但任何对外提交都会在申请队列中等待你确认。</p></div></section></div>;
}

function JobDrawer({ job, onClose, onStatus, onRemoveImported }: { job: Job; onClose: () => void; onStatus: (id: number, status: Job["status"]) => void; onRemoveImported: (id: number) => void }) {
  return <div className="drawer-layer" onMouseDown={onClose}><aside className="drawer" onMouseDown={(e) => e.stopPropagation()}><button className="drawer-close" onClick={onClose}><X size={20} /></button><div className="drawer-company"><div className="company-logo big" style={{ background: job.color }}>{job.initials}</div><div><span>{job.company}</span><h2>{job.role}</h2><p><MapPin size={14} />{job.location} · {job.mode}</p><a className="drawer-job-link" href={job.url} target="_blank" rel="noreferrer">查看原岗位 <ExternalLink size={14} /></a></div></div><div className="drawer-score"><div><span>综合匹配</span><strong>{job.score}<small>/100</small></strong></div><div className="score-bar"><i style={{ width: `${job.score}%` }} /></div><p>{job.reason}</p></div><section><h3>为什么值得申请</h3><ul><li>核心技能覆盖度高，简历中有直接证据</li><li>薪资和地点均满足你的硬性条件</li><li>职级与最近两段经历的职责范围一致</li></ul></section><section><h3>定制材料计划</h3><div className="material"><FileText size={18} /><div><strong>一页式定制简历</strong><span>突出 {job.tags.slice(0, 2).join("、")} 相关经历</span></div><span>待生成</span></div><div className="material"><Sparkles size={18} /><div><strong>开放题答案草稿</strong><span>仅使用画像中可验证的事实</span></div><span>待生成</span></div></section><div className="drawer-footer"><a className="source-job-button" href={job.url} target="_blank" rel="noreferrer"><ExternalLink size={16} />打开原岗位</a>{job.source === "LinkedIn · 用户导入" && <button onClick={() => onRemoveImported(job.id)}>移除导入</button>}<button onClick={() => onStatus(job.id, "已跳过")}>跳过</button><button className="primary" onClick={() => onStatus(job.id, "已加入")}><Check size={17} />加入申请队列</button></div></aside></div>;
}
