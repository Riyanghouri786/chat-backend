import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Import cors
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const port = 8000;

// Replace with your valid API key
const apiKey = "AIzaSyBTdAgqRyaWCubG4IMqS_d6AquVI60t8UQ";

app.use();

// Use cors middleware
app.use(bodyParser.json());

// Endpoint to handle prompt requests
app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    console.log("Received prompt:", prompt); // Log the received prompt

    // Initialize Generative AI client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Retrieve the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Try generating content directly with the prompt
    const result = await model.generateContent(prompt);

    console.log("Generated result:", result); // Log the result

    // Check if response and candidates are defined
    if (
      result.response &&
      result.response.candidates &&
      result.response.candidates[0]
    ) {
      const content = result.response.candidates[0].content; // Access content
      res.json({ content });
    } else {
      // Handle missing content or candidates
      res
        .status(500)
        .json({ error: "Generated content not found in the response." });
    }
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
