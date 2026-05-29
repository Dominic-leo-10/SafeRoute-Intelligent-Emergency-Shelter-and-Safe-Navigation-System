const express = require("express");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://10.144.1.138:3000",
    ],
  })
);

app.use(express.json());

/* ---------------- ROUTES ---------------- */

const shelterRoutes = require("./routes/shelter.routes");
const hospitalRoutes = require("./routes/hospital.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

app.use("/api", shelterRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ---------------- TEST ---------------- */

app.get("/", (req, res) => {
  res.send("✅ SafeRoute Backend Running");
});

/* ---------------- SERVER ---------------- */

app.listen(5000, () => {
  console.log(
    "🚀 Server running on http://localhost:5000"
  );
});