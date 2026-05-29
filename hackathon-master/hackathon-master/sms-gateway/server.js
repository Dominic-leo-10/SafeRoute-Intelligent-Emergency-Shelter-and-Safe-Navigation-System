const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

/* ---------------- CONFIG ---------------- */

const PORT = 5050;

const GOVERNMENT_BACKEND =
  "http://localhost:5000/sos";

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- MEMORY QUEUE ---------------- */

let smsQueue = [];

/* ---------------- BASE ROUTE ---------------- */

app.get("/", (req, res) => {
  res.send("📡 SMS Gateway Running");
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/health", (req, res) => {
  res.json({
    status: "SMS Gateway Running",
    queuedMessages: smsQueue.length,
  });
});

/* ---------------- SMS RECEIVER ---------------- */

app.post("/sms-receiver", async (req, res) => {
  try {
    const { payload } = req.body;

    console.log("\n📩 Incoming SMS Payload:");
    console.log(payload);

    if (!payload) {
      return res.status(400).json({
        error: "payload required",
      });
    }

    try {
      console.log(
        "📡 Forwarding to Government Backend..."
      );

      const response = await axios.post(
        GOVERNMENT_BACKEND,
        { payload }
      );

      console.log("✅ ACK Received:");
      console.log(response.data);

      return res.json(response.data);

    } catch (backendError) {

      console.log(
        "⚠ Government backend unavailable"
      );

      console.log("📥 SMS queued");

      smsQueue.push(payload);

      return res.json({
        queued: true,
        queueSize: smsQueue.length,
      });
    }

  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      error: "SMS Gateway Error",
    });
  }
});

/* ---------------- RETRY QUEUE ---------------- */

setInterval(async () => {

  if (smsQueue.length === 0) {
    return;
  }

  console.log(
    `\n🔁 Retrying ${smsQueue.length} queued SMS`
  );

  const remainingQueue = [];

  for (const payload of smsQueue) {
    try {

      const response = await axios.post(
        GOVERNMENT_BACKEND,
        { payload }
      );

      console.log(
        "✅ Delivered queued SMS"
      );

      console.log(response.data);

    } catch {

      console.log(
        "❌ Backend still unavailable"
      );

      remainingQueue.push(payload);
    }
  }

  smsQueue = remainingQueue;

}, 10000);

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(
    `📡 SMS Gateway running on http://localhost:${PORT}`
  );
});