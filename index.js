import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/quote", async (req, res) => {
  try {
    const response = await fetch("https://api.houdiniswap.com/v1/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy failed", details: err.message });
  }
});

export default app;
