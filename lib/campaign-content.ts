import sanitizeHtml from "sanitize-html";
import juice from "juice";
import { convert } from "html-to-text";
import { z } from "zod";

export const audienceSchema = z.object({
  role: z.enum(["all", "alumni", "student"]).default("all"),
  batches: z.array(z.number().int().min(1900).max(2200)).max(100).default([]),
  branches: z.array(z.string().trim().min(1).max(150)).max(100).default([]),
});
export const contentSchema = z.object({
  name: z.string().trim().min(1, "Campaign name is required").max(120),
  subject: z.string().trim().min(1, "Subject is required").max(200).regex(/^[^\r\n]+$/, "Subject must be a single line"),
  html: z.string().trim().min(1, "Email content is required").max(200_000, "Template must be under 200 KB"),
  audience: audienceSchema,
});
export const idSchema = z.string().regex(/^[a-f\d]{24}$/i, "Invalid campaign ID");

// Email-safe inline styles; URLs, expressions and escape sequences are excluded.
const cssValue = /^(?!.*(?:url|expression|javascript|@import|\\))[a-z0-9\s#.,%()'"+\-/!]+$/i;
const styleProperties = ["background", "box-shadow", "opacity", "color", "background-color", "font-family", "font-size", "font-weight", "font-style", "line-height", "letter-spacing", "text-align", "text-decoration", "text-transform", "vertical-align", "width", "max-width", "min-width", "height", "max-height", "min-height", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "border", "border-top", "border-bottom", "border-left", "border-right", "border-color", "border-width", "border-style", "border-radius", "border-collapse", "border-spacing", "display", "list-style-type", "overflow", "word-break", "white-space", "box-sizing"];

export function cleanEmailHtml(input: string) {
  const source = input.trim().replace(/^```(?:html)?\s*\n?/i, "").replace(/\n?```$/, "");
  const inlined = juice(source, {
    removeStyleTags: true, preserveMediaQueries: false, preserveFontFaces: false,
    preserveKeyFrames: false, preservePseudos: false,
  });
  return sanitizeHtml(inlined, {
    allowedTags: ["html", "head", "body", "title", "table", "thead", "tbody", "tfoot", "tr", "td", "th", "caption", "colgroup", "col", "div", "span", "p", "br", "hr", "h1", "h2", "h3", "h4", "h5", "h6", "a", "img", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "blockquote", "pre", "code", "center", "small", "sup", "sub"],
    allowedAttributes: {
      "*": ["style", "align", "valign", "width", "height", "bgcolor", "dir", "lang", "role"],
      a: ["href", "title", "target", "rel", "style"],
      img: ["src", "alt", "width", "height", "style"],
      table: ["cellpadding", "cellspacing", "border", "width", "align", "bgcolor", "role", "style"],
      td: ["colspan", "rowspan", "width", "height", "align", "valign", "bgcolor", "style"],
      th: ["colspan", "rowspan", "scope", "style"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https", "http"] },
    allowProtocolRelative: false,
    allowedStyles: { "*": Object.fromEntries(styleProperties.map(property => [property, [cssValue]])) },
    transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }) },
  });
}
export function plainText(html: string) { return convert(html, { wordwrap: 100 }); }
export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
export function personalize(html: string, name: string) {
  return html.replace(/\{\{\s*fullname\s*\}\}/g, () => escapeHtml(name || "GECWC member"));
}
export function audienceFilter(audience: z.infer<typeof audienceSchema>) {
  return {
    isActive: "approved",
    role: audience.role === "all" ? { $in: ["alumni", "student"] } : audience.role,
    ...(audience.batches.length ? { batch: { $in: audience.batches } } : {}),
    ...(audience.branches.length ? { branch: { $in: audience.branches } } : {}),
  };
}
