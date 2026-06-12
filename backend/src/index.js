require("dotenv").config();
const express  = require("express");
const cors     = require("cors");

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000",
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/admin",    require("./routes/admin"));
app.use("/api/auth",     require("./routes/auth"));
app.use("/api/labs",     require("./routes/labs"));
app.use("/api/tests",    require("./routes/tests"));
app.use("/api/packages", require("./routes/packages"));
app.use("/api/bookings", require("./routes/bookings"));

// Health check
app.get("/api/health", (_req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));

// 404
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ LabEase API running on port ${PORT}`));
