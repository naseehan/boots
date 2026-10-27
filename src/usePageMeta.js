import { useEffect } from "react";
import { metaTags } from "./seo";

/**
 * Sets the page's title, description, canonical URL, social tags and structured data.
 * Prerendered pages already have these in their HTML; this keeps them right during
 * in-app navigation and on pages that weren't prerendered.
 */
export default function usePageMeta(meta) {
  const key = meta ? JSON.stringify(meta) : "";

  useEffect(() => {
    if (!meta) return;
    const tags = metaTags(meta);
    document.title = tags.title;

    for (const [attr, name, content] of tags.meta) {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    }
    // og:url is left out for pages without a path (e.g. 404)
    if (!meta.path) document.head.querySelector('meta[property="og:url"]')?.remove();

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (tags.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = tags.canonical;
    } else {
      canonical?.remove();
    }

    let jsonLd = document.getElementById("page-jsonld");
    if (tags.jsonLd) {
      if (!jsonLd) {
        jsonLd = document.createElement("script");
        jsonLd.type = "application/ld+json";
        jsonLd.id = "page-jsonld";
        document.head.appendChild(jsonLd);
      }
      jsonLd.textContent = JSON.stringify(tags.jsonLd);
    } else {
      jsonLd?.remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
}
