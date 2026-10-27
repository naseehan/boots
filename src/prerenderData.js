import { createContext, useContext } from "react";

/**
 * Data a prerendered page was built with (e.g. the product on a product page).
 * scripts/prerender.js embeds it as window.__PRERENDER_DATA__ so the browser's first render
 * matches the HTML, then pages refresh it from the API as usual.
 */
export const PrerenderDataContext = createContext({});

export const usePrerenderData = () => useContext(PrerenderDataContext);
