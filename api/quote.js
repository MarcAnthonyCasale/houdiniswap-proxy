import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await fetch("https://api.houdiniswap.com/v1/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text(); // catch the HTML
      return res.status(502).json({
        error: "Invalid JSON response from upstream",
        body: text.slice(0, 500) // just the first 500 chars, don’t nuke the logs
      });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error("Proxy fetch failed:", error);
    return res.status(500).json({
      error: "Proxy Server Error",
      message: error.message
    });
  }
}
