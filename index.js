const express = require("express");
const fetch = require("node-fetch");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const API_KEY = process.env.BYBIT_API_KEY;
const API_SECRET = process.env.BYBIT_API_SECRET;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Bybit Proxy läuft!");
});

app.get("/kline", async (req, res) => {
  const { category, symbol, interval, start, end, limit } = req.query;
  const url = `https://api.bybit.com/v5/market/kline?category=${category}&symbol=${symbol}&interval=${interval}${start ? `&start=${start}` : ""}${end ? `&end=${end}` : ""}${limit ? `&limit=${limit}` : ""}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fehler bei Kline", detail: err.message });
  }
});
