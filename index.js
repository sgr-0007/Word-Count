// index.js  (ESM syntax)
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// ---------- docs ----------
const docs = {
  name: "wordCount",
  description: "Return the number of words in a text string",
  input: {
    type: "string",
    description: "Any text you’d like counted",
    example: "The quick brown fox jumps over the lazy dog"
  },
  output: {
    type: "number",
    description: "How many words were found in the input",
    example: 9
  }
};
app.get("/wordCount", (req, res) => res.json(docs));

// ---------- function ----------
app.post("/wordCount", (req, res) => {
  const { input } = req.body ?? {};
  if (typeof input !== "string") {
    return res.status(400).json({ error: "`input` must be a string." });
  }
  const output = input.trim().split(/\s+/).filter(Boolean).length;
  res.json({ output });
});

// ---------- listen ----------
const PORT = process.env.PORT || 3000;         
app.listen(PORT, "0.0.0.0", () =>
  console.log(`API up on port ${PORT}`)
);
