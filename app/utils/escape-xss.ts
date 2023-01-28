export function escapeXSS(possibleXSS: string) {
  return possibleXSS
    .replace(/\&/g, "&amp;")
    .replace(/\</g, "&lt;")
    .replace(/\>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .replaceAll(
      "(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta",
      ""
    );
}
