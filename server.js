// server.js
// Minimal API server. Deploy this on your VPS (Icosnet), behind HTTPS (nginx/Caddy reverse proxy).
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const boutiqueRoutes = require("./routes/boutique");

const app = express();

// Restrict CORS to your actual origins (WordPress site + Electron app's local host)
const allowedOrigins = [
  "https://hnaya.dz",
  "http://localhost:3000", // Electron dev/prod local server
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());

app.use("/api/search", boutiqueRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`hnaya search API listening on port ${PORT}`);
}); 
