// ---------------------------------------------
// backend/index.js   –  BMSAITools API server
// ---------------------------------------------
// Prereqs:
//   • package.json has  "type": "module"
//   • npm packages installed:
//       express cors dotenv @supabase/supabase-js
//   • .env contains PORT, SUPABASE_URL, SUPABASE_KEY
// ---------------------------------------------

import express from 'express';
import cors from 'cors';
import 'dotenv/config';                     // reads .env
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// Supabase client
// ─────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// Health-check  →  http://localhost:5000/api/health
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get first 10 projects  →  http://localhost:5000/api/projects
app.get('/api/projects', async (_, res) => {
  const { data, error } = await supabase.from('projects').select('*').limit(10);
  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// ─────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
