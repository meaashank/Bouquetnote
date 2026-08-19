import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI Poem / Note Generation
app.post("/api/generate-poem", async (req, res) => {
  try {
    const { flowers, recipient, sender, occasion } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback if no API key is provided
      return res.json({
        poem: `Dearest ${recipient || 'Friend'},\n\nLike these ${flowers?.join(', ') || 'flowers'}, may your days bloom with quiet joy and gentle light.\n\nWith all my love,\n${sender || 'Anonymous'}`,
        title: "A Gentle Whisper of Petals"
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const flowerNames = flowers?.join(', ') || 'mixed garden flowers';
    const prompt = `Write a short, exquisite, poetic gift card note and a poetic title for a digital bouquet containing: ${flowerNames}.
    Recipient: ${recipient || 'Friend'}
    Sender: ${sender || 'Someone special'}
    Occasion: ${occasion || 'Thought of you'}
    
    Format the response as JSON with keys "title" and "poem". Keep the poem under 4 lines, deeply elegant, botanical, and intimate.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(resultText);
    res.json(data);
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate note",
      poem: `Dearest ${req.body?.recipient || 'Friend'},\n\nMay this digital arrangement bring a touch of eternal spring to your heart.\n\nWarmly,\n${req.body?.sender || 'Someone who cares'}`,
      title: "Botanical Reverie"
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
