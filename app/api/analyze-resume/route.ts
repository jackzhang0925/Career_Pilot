import { getRuntimeOpenAISettings } from "../../server/openai-key-store";

const profileSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    roles: { type: "array", items: { type: "string" }, minItems: 1, maxItems: 5 },
    seniority: { type: "string" },
    skills: { type: "array", items: { type: "string" }, maxItems: 12 },
    summary: { type: "string" },
  },
  required: ["roles", "seniority", "skills", "summary"],
};

function outputText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const response = payload as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  if (response.output_text) return response.output_text;
  return response.output?.flatMap((item) => item.content ?? []).find((item) => item.type === "output_text")?.text ?? "";
}

export async function GET() {
  const runtime = getRuntimeOpenAISettings();
  return Response.json({ configured: Boolean(runtime?.apiKey || process.env.OPENAI_API_KEY), model: runtime?.model || process.env.OPENAI_MODEL || "gpt-5.6-sol" });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { resumeText?: string } | null;
  const runtime = getRuntimeOpenAISettings();
  const apiKey = runtime?.apiKey || process.env.OPENAI_API_KEY;
  if (!apiKey) return Response.json({ error: "尚未配置 OpenAI API Key。" }, { status: 503 });
  const resumeText = body?.resumeText?.trim();
  if (!resumeText || resumeText.length < 80) return Response.json({ error: "简历文字不足，无法分析。" }, { status: 400 });
  const model = runtime?.model || process.env.OPENAI_MODEL || "gpt-5.6-sol";

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: "你是一名严谨的求职画像分析器。只根据简历中明确出现的职责、技能、职级和成果，推荐 3-5 个现实的目标职位。不要推断年龄、性别、种族、健康、宗教或其他敏感属性，不要编造经历。职位名称使用招聘市场常见的英文名称，解释使用中文。",
        },
        { role: "user", content: `请分析下面的简历并生成求职画像：\n\n${resumeText.slice(0, 30000)}` },
      ],
      text: { format: { type: "json_schema", name: "career_profile", strict: true, schema: profileSchema } },
      max_output_tokens: 900,
    }),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload === "object" && "error" in payload
      ? (payload as { error?: { message?: string } }).error?.message
      : undefined;
    return Response.json({ error: message || "AI 分析暂时不可用。" }, { status: response.status });
  }
  try {
    return Response.json(JSON.parse(outputText(payload)));
  } catch {
    return Response.json({ error: "AI 返回内容无法解析。" }, { status: 502 });
  }
}
