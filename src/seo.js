/**
 * Page titles, descriptions, canonical URLs and structured data.
 * Used by usePageMeta (in the browser) and scripts/prerender.js (to write them into each page's HTML),
 * so search engines get the right tags without running JavaScript.
 */

export const SITE_URL = "https://www.signaturesports.shop";
export const SITE_NAME = "Signature Sports";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export const STORE = {
  "@type": "SportingGoodsStore",
  "@id": `${SITE_URL}/#store`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.webp`,
  image: DEFAULT_IMAGE,
  telephone: "+917034546546",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Road",
    addressLocality: "Kallambalam",
    addressRegion: "Kerala",
    postalCode: "695605",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 8.763725, longitude: 76.792335 },
  hasMap: "https://www.google.com/maps?q=8.763724781573522,76.79233498368549",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "21:00",
  },
};

export const PAGES = {
  "/": {
    title: "Signature Sports | Sports Shop in Kallambalam, Kerala",
    description:
      "Signature Sports is Kallambalam's sports store for football boots, badminton racquets from Yonex and Victor, sports balls, sportswear and board games. Visit us or order on WhatsApp.",
    jsonLd: [STORE, { "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/` }],
  },
  "/products": {
    title: "Football Boots, Badminton Racquets & Sports Gear | Signature Sports",
    description:
      "Browse football boots from Anza and Nivia, Yonex and Victor badminton racquets, footballs, track pants and chess sets with prices at Signature Sports, Kallambalam.",
  },
  "/about": {
    title: "About Us | Signature Sports Kallambalam",
    description:
      "Signature Sports is a local sports store on Main Road, Kallambalam, selling genuine sports gear with expert advice for players of every level.",
  },
  "/contact": {
    title: "Contact & Store Location | Signature Sports Kallambalam",
    description:
      "Call or WhatsApp Signature Sports on +91 7034546546, or visit our store on Main Road, Kallambalam, Kerala. Open every day, 9 AM to 9 PM.",
    jsonLd: [STORE],
  },
};

export const NOT_FOUND = {
  title: "Page Not Found | Signature Sports",
  description: "The page you are looking for does not exist.",
  robots: "noindex",
};

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`);

const truncate = (text, max) => {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, clean.lastIndexOf(" ", max - 1)) + "…";
};

export function pageMeta(path) {
  const page = PAGES[path];
  return page ? { ...page, path } : null;
}

export function productMeta(product) {
  const path = `/products/${product.slug}`;
  const price = Number(product.price).toLocaleString("en-IN");
  const image = absolute(product.imageUrl || product.image || "/og-image.jpg");
  return {
    title: `${product.name} – ₹${price} | ${SITE_NAME} Kallambalam`,
    description: truncate(
      `Buy ${product.name} for ₹${price} at Signature Sports, Kallambalam. ${product.overview || product.desc || ""}`,
      160
    ),
    path,
    image,
    type: "product",
    jsonLd: [
      {
        "@type": "Product",
        name: product.name,
        image,
        description: product.overview || product.desc || product.name,
        sku: product.slug,
        category: product.category,
        url: `${SITE_URL}${path}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}${path}`,
          seller: { "@id": `${SITE_URL}/#store` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${SITE_URL}/products` },
          { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}${path}` },
        ],
      },
    ],
  };
}

/** The tags each page sets: [attribute selector key, attribute value, content]. */
export function metaTags(meta) {
  const url = meta.path ? `${SITE_URL}${meta.path === "/" ? "/" : meta.path}` : null;
  const image = meta.image || DEFAULT_IMAGE;
  return {
    title: meta.title,
    canonical: meta.robots ? null : url,
    jsonLd: meta.jsonLd ? { "@context": "https://schema.org", "@graph": meta.jsonLd } : null,
    meta: [
      ["name", "description", meta.description],
      ["name", "robots", meta.robots || "index, follow"],
      ["property", "og:type", meta.type || "website"],
      ["property", "og:site_name", SITE_NAME],
      ["property", "og:title", meta.title],
      ["property", "og:description", meta.description],
      ["property", "og:url", url],
      ["property", "og:image", image],
      ["property", "og:locale", "en_IN"],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", meta.title],
      ["name", "twitter:description", meta.description],
      ["name", "twitter:image", image],
    ].filter(([, , content]) => content),
  };
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** HTML for the <head>, written into each prerendered page. */
export function renderHeadTags(meta) {
  const tags = metaTags(meta);
  const lines = [`<title>${escapeHtml(tags.title)}</title>`];
  for (const [attr, key, content] of tags.meta) {
    lines.push(`<meta ${attr}="${key}" content="${escapeHtml(content)}" />`);
  }
  if (tags.canonical) lines.push(`<link rel="canonical" href="${tags.canonical}" />`);
  if (tags.jsonLd) {
    lines.push(
      `<script type="application/ld+json" id="page-jsonld">${JSON.stringify(tags.jsonLd).replace(/</g, "\\u003c")}</script>`
    );
  }
  return lines.join("\n    ");
}
