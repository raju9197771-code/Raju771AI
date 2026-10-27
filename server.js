import express from "express";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const question = req.body.message;

    if (!question || !question.trim()) {
      return res.status(400).json({ error: "Savol yozing." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: question
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini xatosi:", error.message);
    res.status(500).json({
      error: "AI javob bera olmadi: " + error.message
    });
  }
});

app.listen(port, () => {
  console.log("Raju771 AI ishga tushdi: http://localhost:3000");
});