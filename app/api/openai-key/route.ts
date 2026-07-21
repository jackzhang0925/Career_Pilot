import { clearRuntimeOpenAISettings, getRuntimeOpenAISettings, setRuntimeOpenAISettings } from "../../server/openai-key-store.ts";

function isLocalRequest(request: Request) {
  const hostname = new URL(request.url).hostname;
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1" || hostname === "[::1]";
}

export async function GET(request: Request) {
  const runtime = getRuntimeOpenAISettings();
  return Response.json({ configured: Boolean(runtime?.apiKey || process.env.OPENAI_API_KEY), model: runtime?.model || process.env.OPENAI_MODEL || "gpt-5.6-sol", localRequest: isLocalRequest(request) });
}

export async function POST(request: Request) {
  if (!isLocalRequest(request)) return Response.json({ valid: false, error: "临时 API Key 只能在本机 localhost 使用。" }, { status: 403 });
  const body = await request.json().catch(() => null) as { apiKey?: string; model?: string } | null;
  const apiKey = body?.apiKey?.trim();
  const model = body?.model?.trim().slice(0, 80) || "gpt-5.6-sol";
  if (!apiKey) return Response.json({ valid: false, error: "请输入 API Key。" }, { status: 400 });

  const response = await fetch(`https://api.openai.com/v1/models/${encodeURIComponent(model)}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    signal: AbortSignal.timeout(12_000),
  }).catch(() => null);

  if (!response) return Response.json({ valid: false, error: "无法连接 OpenAI，请检查网络后重试。" }, { status: 502 });
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: { message?: string } } | null;
    return Response.json({ valid: false, error: payload?.error?.message || "API Key 或模型不可用。" }, { status: response.status });
  }
  setRuntimeOpenAISettings({ apiKey, model });
  return Response.json({ valid: true, model });
}

export async function DELETE(request: Request) {
  if (!isLocalRequest(request)) return Response.json({ removed: false, error: "临时 API Key 只能在本机 localhost 移除。" }, { status: 403 });
  clearRuntimeOpenAISettings();
  return Response.json({ removed: true, configured: Boolean(process.env.OPENAI_API_KEY) });
}
