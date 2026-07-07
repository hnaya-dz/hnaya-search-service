// routes/boutique.js
// Proxy endpoint for PSE #2 (boutique / e-commerce sites .dz)
// Replaces the direct client-side call to googleapis.com/customsearch/v1
// The API key never leaves the server.

const express = require("express");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;       // set in .env, never in client code
const GOOGLE_CX_BOUTIQUE = process.env.GOOGLE_CX_BOUTIQUE; // "213728a58395143b8"

// Simple in-memory cache to reduce Google API calls for repeated queries (optional but recommended)
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

router.get("/boutique", async (req, res) => {
  const q = (req.query.q || "").trim();
  const lang = (req.query.lang || "fr").trim();

  if (!q) {
    return res.status(400).json({ error: "Missing required query parameter: q" });
  }
  if (!GOOGLE_API_KEY || !GOOGLE_CX_BOUTIQUE) {
    console.error("GOOGLE_API_KEY or GOOGLE_CX_BOUTIQUE not configured in environment");
    return res.status(500).json({ error: "Search service misconfigured" });
  }

  const cacheKey = `${q}::${lang}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.json(cached.data);
  }

  const params = new URLSearchParams({
    key: GOOGLE_API_KEY,
    cx: GOOGLE_CX_BOUTIQUE,
    cr: "countryDZ",
    lr: `lang_${lang}`,
    q,
  });

  try {
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?${params.toString()}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google CSE API error:", response.status, errorBody);
      return res.status(502).json({ error: "Upstream search service error" });
    }

    const data = await response.json();

    // Return only what the client needs (avoids leaking Google's internal metadata)
    const results = (data.items || []).map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      displayLink: item.displayLink,
      thumbnail: item.pagemap?.cse_thumbnail?.[0]?.src || null,
    }));

    const payload = {
      query: q,
      totalResults: data.searchInformation?.totalResults || "0",
      results,
    };

    cache.set(cacheKey, { data: payload, timestamp: Date.now() });

    return res.json(payload);
  } catch (err) {
    console.error("Boutique search proxy failed:", err);
    return res.status(502).json({ error: "Search request failed" });
  }
});

module.exports = router;
