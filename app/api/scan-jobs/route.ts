type ScanProfile = { roleKeywords?: string; location?: string; workMode?: string; sources?: string[] };

type Candidate = {
  externalId: string;
  company: string;
  role: string;
  location: string;
  mode: string;
  source: string;
  url: string;
  publishedAt?: string;
  description?: string;
};

const greenhouseBoards = [
  { company: "Stripe", board: "stripe", color: "#635bff" },
  { company: "MongoDB", board: "mongodb", color: "#00a35c" },
  { company: "Figma", board: "figma", color: "#7c5cff" },
  { company: "Okta", board: "okta", color: "#1662dd" },
];

const leverBoards = [
  { company: "Wealthsimple", board: "wealthsimple", color: "#6d5dfc" },
];

const companyColors = new Map(greenhouseBoards.map((source) => [source.company, source.color]));
for (const source of leverBoards) companyColors.set(source.company, source.color);
companyColors.set("Cohere", "#39594d");

function cleanHtml(value = "") {
  return value.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&amp;|&#39;|&quot;/g, " ").replace(/\s+/g, " ").trim();
}

function stableId(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) hash = Math.imul(hash ^ value.charCodeAt(index), 16777619);
  return Math.abs(hash >>> 0);
}

function roleFamily(value: string) {
  const text = value.toLowerCase();
  if (/design|designer|ux|ui/.test(text)) return "design";
  if (/engineer|developer|software|machine learning|data scientist/.test(text)) return "engineering";
  if (/product owner|product manager|product lead|program manager/.test(text)) return "product";
  if (/business analyst|data analyst|analytics|business intelligence/.test(text)) return "analysis";
  if (/operations|process|loan|lending|enablement|strategy/.test(text)) return "operations";
  if (/marketing|growth|content|brand/.test(text)) return "marketing";
  if (/sales|account executive|customer success/.test(text)) return "commercial";
  return "other";
}

function tokens(value: string) {
  const ignored = new Set(["senior", "staff", "lead", "principal", "manager", "and", "the", "for", "product"]);
  return [...new Set(value.toLowerCase().replace(/[^a-z0-9]+/g, " ").split(" ").filter((token) => token.length > 2 && !ignored.has(token)))];
}

function scoreCandidate(candidate: Candidate, profile: ScanProfile) {
  const targets = (profile.roleKeywords || "").split(/[,;\n]/).map((item) => item.trim()).filter(Boolean);
  const targetText = targets.join(" ");
  const targetFamilies = new Set(targets.map(roleFamily));
  const family = roleFamily(candidate.role);
  const targetTokens = tokens(targetText);
  const candidateTokens = tokens(`${candidate.role} ${candidate.description || ""}`);
  const overlap = targetTokens.filter((token) => candidateTokens.includes(token));
  const exactRole = targets.some((target) => candidate.role.toLowerCase().includes(target.toLowerCase()) || target.toLowerCase().includes(candidate.role.toLowerCase()));
  const sameFamily = family !== "other" && targetFamilies.has(family);
  const preferredLocation = (profile.location || "").toLowerCase();
  const locationText = candidate.location.toLowerCase();
  const locationMatch = ["toronto", "canada", "remote"].some((place) => preferredLocation.includes(place) && locationText.includes(place));

  let score = 38;
  if (exactRole) score += 38;
  else if (sameFamily) score += 29;
  score += Math.min(18, overlap.length * 6);
  if (locationMatch) score += 6;
  if (/toronto|canada|remote/i.test(locationText)) score += 3;
  if (/people operations|human resources|talent|recruit/i.test(candidate.role) && !/people|human resources|talent|recruit/i.test(targetText)) score -= 22;
  if (/canada|toronto/i.test(preferredLocation) && /\bus\b|united states/i.test(locationText) && !/canada|toronto|worldwide|global/i.test(locationText)) score -= 12;
  score = Math.max(35, Math.min(97, score));

  const reason = exactRole
    ? `职位名称与目标画像直接重合${locationMatch ? "，地点也符合偏好" : ""}`
    : sameFamily
      ? `属于同一目标职能，重合关键词：${overlap.slice(0, 3).join("、") || "职责方向"}`
      : overlap.length
        ? `部分经历可迁移，重合关键词：${overlap.slice(0, 3).join("、")}`
        : "与当前画像关联较弱，仅保留在职位池供你复核";

  return { score, reason, tags: overlap.slice(0, 3).map((tag) => tag.replace(/^./, (letter) => letter.toUpperCase())) };
}

function relativeDate(value?: string) {
  if (!value) return "近期";
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000));
  if (days === 0) return "今天";
  if (days === 1) return "1 天前";
  if (days < 30) return `${days} 天前`;
  return "30 天内";
}

async function fetchGreenhouse(company: string, board: string): Promise<Candidate[]> {
  const response = await fetch(`https://boards-api.greenhouse.io/v1/boards/${board}/jobs?content=true`, { signal: AbortSignal.timeout(12_000) });
  if (!response.ok) throw new Error(`${company} Greenhouse returned ${response.status}`);
  const payload = await response.json() as { jobs?: Array<{ id: number; title: string; absolute_url: string; updated_at?: string; location?: { name?: string }; content?: string }> };
  return (payload.jobs || []).map((job) => ({
    externalId: `${board}-${job.id}`,
    company,
    role: job.title,
    location: job.location?.name || "Location on posting",
    mode: /remote/i.test(job.location?.name || "") ? "远程" : "职位页查看",
    source: "Greenhouse",
    url: job.absolute_url,
    publishedAt: job.updated_at,
    description: cleanHtml(job.content),
  }));
}

async function fetchLever(company: string, board: string): Promise<Candidate[]> {
  const response = await fetch(`https://api.lever.co/v0/postings/${board}?mode=json`, { signal: AbortSignal.timeout(12_000) });
  if (!response.ok) throw new Error(`${company} Lever returned ${response.status}`);
  const payload = await response.json() as Array<{ id: string; text: string; hostedUrl: string; createdAt?: number; categories?: { location?: string; commitment?: string }; descriptionPlain?: string; additionalPlain?: string }>;
  return payload.filter((job) => job.hostedUrl).map((job) => ({
    externalId: `${board}-${job.id}`,
    company,
    role: job.text,
    location: job.categories?.location || "Location on posting",
    mode: /remote/i.test(job.categories?.location || "") ? "远程" : "职位页查看",
    source: "Lever",
    url: job.hostedUrl,
    publishedAt: job.createdAt ? new Date(job.createdAt).toISOString() : undefined,
    description: [job.descriptionPlain, job.additionalPlain, job.categories?.commitment].filter(Boolean).join(" "),
  }));
}

async function fetchCohere(): Promise<Candidate[]> {
  const response = await fetch("https://api.ashbyhq.com/posting-api/job-board/cohere", { signal: AbortSignal.timeout(12_000) });
  if (!response.ok) throw new Error(`Cohere Ashby returned ${response.status}`);
  const payload = await response.json() as { jobs?: Array<{ id: string; title: string; location?: string; secondaryLocations?: Array<{ location?: string }>; isRemote?: boolean; workplaceType?: string; publishedAt?: string; jobUrl: string; descriptionHtml?: string }> };
  return (payload.jobs || []).filter((job) => job.jobUrl).map((job) => ({
    externalId: `cohere-${job.id}`,
    company: "Cohere",
    role: job.title,
    location: [job.location, ...(job.secondaryLocations || []).map((item) => item.location)].filter(Boolean).join(" · ") || "Location on posting",
    mode: job.isRemote || /remote/i.test(job.workplaceType || "") ? "远程" : "职位页查看",
    source: "Ashby",
    url: job.jobUrl,
    publishedAt: job.publishedAt,
    description: cleanHtml(job.descriptionHtml),
  }));
}

export async function POST(request: Request) {
  const profile = await request.json().catch(() => ({})) as ScanProfile;
  const requested = Array.isArray(profile.sources) ? profile.sources : ["Greenhouse", "Lever", "Ashby"];
  const requestedSources = new Set(requested.filter((source) => ["Greenhouse", "Lever", "Ashby"].includes(source)));
  const fetchers = [
    ...greenhouseBoards.filter(() => requestedSources.has("Greenhouse")).map((source) => ({ name: `${source.company} · Greenhouse`, run: () => fetchGreenhouse(source.company, source.board) })),
    ...leverBoards.filter(() => requestedSources.has("Lever")).map((source) => ({ name: `${source.company} · Lever`, run: () => fetchLever(source.company, source.board) })),
    ...(requestedSources.has("Ashby") ? [{ name: "Cohere · Ashby", run: fetchCohere }] : []),
  ];
  if (!fetchers.length) {
    return Response.json({ error: "请至少启用一个可自动扫描的公开职位来源。" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const batches = await Promise.allSettled(fetchers.map((source) => source.run()));
  const candidates = batches.flatMap((batch) => batch.status === "fulfilled" ? batch.value : []);
  const failures = batches.flatMap((batch, index) => batch.status === "rejected" ? [fetchers[index].name] : []);
  const succeeded = batches.length - failures.length;
  if (succeeded === 0) {
    return Response.json({ error: "所有职位来源暂时不可用。", failures, fetchedAt: new Date().toISOString() }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const deduplicated = [...new Map(candidates.map((candidate) => [candidate.url, candidate])).values()];
  const ranked = deduplicated.map((candidate) => {
    const match = scoreCandidate(candidate, profile);
    return {
      id: stableId(candidate.externalId),
      company: candidate.company,
      initials: candidate.company.slice(0, 1).toUpperCase(),
      color: companyColors.get(candidate.company) || "#33363d",
      role: candidate.role,
      location: candidate.location,
      mode: candidate.mode,
      salary: "职位页查看",
      score: match.score,
      reason: match.reason,
      tags: match.tags.length ? match.tags : [roleFamily(candidate.role)],
      source: candidate.source,
      url: candidate.url,
      posted: relativeDate(candidate.publishedAt),
      status: "待确认" as const,
    };
  }).sort((a, b) => b.score - a.score || a.company.localeCompare(b.company));

  return Response.json(
    { jobs: ranked.slice(0, 38), scanned: deduplicated.length, sources: succeeded, attemptedSources: fetchers.length, failures, fetchedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
