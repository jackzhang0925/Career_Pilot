type RuntimeOpenAISettings = { apiKey: string; model: string };

const runtime = globalThis as typeof globalThis & { __catCareerOpenAI?: RuntimeOpenAISettings };

export function getRuntimeOpenAISettings() {
  return runtime.__catCareerOpenAI;
}

export function setRuntimeOpenAISettings(settings: RuntimeOpenAISettings) {
  runtime.__catCareerOpenAI = settings;
}

export function clearRuntimeOpenAISettings() {
  delete runtime.__catCareerOpenAI;
}
