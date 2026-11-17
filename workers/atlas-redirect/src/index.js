// atlas.avarok.net -> REDIRECT_TARGET, for every method, path and query.
//
// The path and query are ignored, not appended: the target is one page (/engine), and
// atlasinference.io/engine/<anything> is a 404, so preserving the path would turn every deep
// link into a dead end. Every request lands on the engine page instead.
//
// `redirect` is pure (config in, response description out); the default export only adapts it
// to the Workers fetch handler.

const STATUSES = new Set([301, 302, 307, 308]);

/** Validates the Worker's vars. Returns the redirect, or the name of the field that is wrong. */
export function config(env) {
  const target = env?.REDIRECT_TARGET;
  const status = Number(env?.REDIRECT_STATUS);
  if (typeof target !== "string" || !target.startsWith("https://") || !URL.canParse(target)) {
    return { error: "REDIRECT_TARGET must be an absolute https URL" };
  }
  if (!STATUSES.has(status)) return { error: "REDIRECT_STATUS must be 301, 302, 307 or 308" };
  return { target, status };
}

/** The response for any request, given validated config. The request's URL plays no part. */
export function redirect(cfg) {
  return {
    status: cfg.status,
    headers: { Location: cfg.target, "Cache-Control": "public, max-age=86400" },
  };
}

export default {
  fetch(_request, env) {
    const cfg = config(env);
    if ("error" in cfg) {
      console.error(`atlas-avarok-redirect misconfigured: ${cfg.error}`);
      return new Response("misconfigured redirect\n", { status: 500 });
    }
    const r = redirect(cfg);
    return new Response(null, { status: r.status, headers: r.headers });
  },
};
