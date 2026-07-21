import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/scan-jobs/route.ts";
import { POST as coach } from "../app/api/career-coach/route.ts";
import { POST as setApiKey } from "../app/api/openai-key/route.ts";

function scanRequest(body) {
  return new Request("http://localhost/api/scan-jobs", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("scan respects selected sources and normalizes Lever jobs", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => { globalThis.fetch = originalFetch; });
  globalThis.fetch = async (url) => {
    assert.match(String(url), /api\.lever\.co/);
    return Response.json([{
      id: "job-1",
      text: "Senior Product Designer",
      hostedUrl: "https://jobs.lever.co/wealthsimple/job-1",
      createdAt: Date.now(),
      categories: { location: "Toronto, Canada", commitment: "Full-time" },
      descriptionPlain: "Design customer-facing product experiences",
    }]);
  };

  const response = await POST(scanRequest({ roleKeywords: "Senior Product Designer", location: "Toronto", sources: ["Lever"] }));
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(payload.sources, 1);
  assert.equal(payload.attemptedSources, 1);
  assert.equal(payload.jobs.length, 1);
  assert.equal(payload.jobs[0].source, "Lever");
  assert.equal(payload.jobs[0].company, "Wealthsimple");
  assert.match(payload.fetchedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test("scan returns a clear error when every public source is disabled", async () => {
  const response = await POST(scanRequest({ sources: [] }));
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.match(payload.error, /至少启用一个/);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("scan reports a partial upstream outage without discarding healthy results", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => { globalThis.fetch = originalFetch; });
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    if (calls > 1) throw new Error("upstream unavailable");
    return Response.json({ jobs: [{ id: 1, title: "Product Designer", absolute_url: "https://example.com/job", location: { name: "Remote Canada" }, content: "Product design" }] });
  };

  const response = await POST(scanRequest({ roleKeywords: "Product Designer", sources: ["Greenhouse"] }));
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.sources, 1);
  assert.equal(payload.failures.length, 3);
  assert.equal(payload.jobs.length, 1);
});

test("career coach requires a substantive resume before using AI", async () => {
  const response = await coach(scanRequest({ resumeText: "too short", messages: [] }));
  const payload = await response.json();

  assert.equal(response.status, 400);
  assert.match(payload.error, /足够文字/);
});

test("temporary API keys are rejected outside a loopback host", async () => {
  const request = new Request("https://career-pilot.example/api/openai-key", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ apiKey: "synthetic-test-key", model: "gpt-5.6-sol" }),
  });
  const response = await setApiKey(request);
  const payload = await response.json();

  assert.equal(response.status, 403);
  assert.equal(payload.valid, false);
  assert.match(payload.error, /localhost/);
});
