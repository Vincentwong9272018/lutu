/**
 * SpaceXAI proxy for Lutu.
 * Set XAI_API_KEY in Netlify site env vars.
 * Optional XAI_MODEL (default grok-4.7).
 *
 * Chat Completions is the legacy endpoint; Responses API is preferred
 * for new work. This function uses Chat Completions so the browser and
 * optional LM Studio custom endpoints share one message format.
 * Docs: https://docs.x.ai/developers/model-capabilities/legacy/chat-completions
 */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return json(500, {
      error: "未設定 XAI_API_KEY。請到 Netlify → Site settings → Environment variables 加入。",
    });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const messages = Array.isArray(payload.messages) ? payload.messages : null;
  if (!messages || !messages.length) {
    return json(400, { error: "messages required" });
  }

  const model = process.env.XAI_MODEL || "grok-4.7";
  const temperature =
    typeof payload.temperature === "number" ? payload.temperature : 0.7;

  try {
    const resp = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: messages.slice(0, 40),
        temperature,
        stream: false,
      }),
    });
    const data = await resp.json();
    return {
      statusCode: resp.status,
      headers: { "Content-Type": "application/json", ...CORS },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return json(502, { error: "無法連接 SpaceXAI：" + (err.message || "network") });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", ...CORS },
    body: JSON.stringify(body),
  };
}
