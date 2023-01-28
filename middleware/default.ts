import { RateLimiter } from "limiter";
import { getRequestHeader } from "h3";
import cache from "memory-cache";
import { $st, setLang } from "../i18n/$st";

export default defineEventHandler(async (event) => {
  // i18n middleware
  await new Promise((resolve) => {
    const query = getQuery(event);

    const lang = String(query?.lang) || "en";

    setLang(lang);

    resolve(0);
  });

  // CORS middleware
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "*",
  });

  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content.";
    return "OK";
  }

  // Rate limiter middleware
  if (event.node.req.url?.includes("/api/")) {
    const ip = getRequestHeader(event, "x-forwarded-for");

    if (!cache.get(ip)) {
      const cachedLimiter = new RateLimiter({
        interval: 15000,
        tokensPerInterval: 9,
        fireImmediately: false,
      });

      cache.put(ip, cachedLimiter, 15000);
    } else {
      const cachedLimiter = cache.get(ip) as RateLimiter;

      if (Math.floor(cachedLimiter.getTokensRemaining()) > 1) {
        await cachedLimiter.removeTokens(1);

        cache.put(ip, cachedLimiter, 15000);
      } else {
        event.node.res.statusCode = 429;

        return {
          message: $st("alerts.too_many_requests"),
        };
      }
    }
  }
});
