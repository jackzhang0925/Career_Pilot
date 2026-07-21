import { getRuntimeOpenAISettings } from "../../server/openai-key-store.ts";

const roadmapStage = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    duration: { type: "string" },
    outcomes: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 4 },
    project: { type: "string" },
  },
  required: ["title", "duration", "outcomes", "project"],
};

const coachSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    roadmap: { type: "array", items: roadmapStage, minItems: 3, maxItems: 5 },
  },
  required: ["reply", "roadmap"],
};

function outputText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const response = payload as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  return response.output_text || response.output?.flatMap((item) => item.content || []).find((item) => item.type === "output_text")?.text || "";
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { resumeText?: string; targetRole?: string; messages?: Array<{ role?: string; content?: string }> } | null;
  const resumeText = body?.resumeText?.trim();
  if (!resumeText || resumeText.length < 80) return Response.json({ error: "请先导入包含足够文字的简历。" }, { status: 400 });

  const runtime = getRuntimeOpenAISettings();
  const apiKey = runtime?.apiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error: "尚未配置 OpenAI API Key。" }, { status: 503 });
  const model = runtime?.model || process.env.OPENAI_MODEL || "gpt-5.6-sol";
  const history = (body?.messages || []).slice(-10).flatMap((message) => {
    const role = message.role === "assistant" ? "assistant" : message.role === "user" ? "user" : null;
    const content = message.content?.trim().slice(0, 4000);
    return role && content ? [{ role, content }] : [];
  });

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: "你是一名循证、友善但不盲目认同的职业教练。只把简历明确写出的事实当作事实；用问题确认职责、项目、个人贡献、结果和兴趣。帮助用户识别可迁移能力，也允许探索与当前经历不同的领域。不要推断敏感属性，不要保证就业结果，不要虚构经历、技能或市场事实。回复用简洁自然的中文，先回应用户，再指出一条有证据的观察，并提出 1-2 个最有价值的追问。每次同时给出可执行的阶段路线；路线中的学习结果必须能验证，每阶段都包含实践项目。",
        },
        {
          role: "user",
          content: `目标职位（可能仍在探索）：${body?.targetRole?.trim() || "尚未确定"}\n\n简历原文：\n${resumeText.slice(0, 30000)}`,
        },
        ...history,
      ],
      text: { format: { type: "json_schema", name: "career_coaching", strict: true, schema: coachSchema } },
      max_output_tokens: 1800,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload === "object" && "error" in payload ? (payload as { error?: { message?: string } }).error?.message : undefined;
    return Response.json({ error: message || "职业教练暂时不可用。" }, { status: response.status });
  }

  try {
    return Response.json(JSON.parse(outputText(payload)), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "职业教练返回内容无法解析。" }, { status: 502 });
  }
}
