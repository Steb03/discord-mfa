import 'dotenv/config';
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// Enable CORS for your Vercel frontend URL
const frontendUrl = process.env.FRONTEND_URL || "https://your-vercel-app.vercel.app"; // Update with your actual Vercel URL
app.use(cors({ origin: frontendUrl }));
app.use(express.json());

// POST endpoint to verify code
app.post("/api/verify", async (req, res) => {
  const { code } = req.body;

  try {
    const { error } = await supabase
      .from('verification_codes')
      .insert([{ code, status: "PENDING" }]); // You can change the status as per your logic

    if (error) throw error;

    res.json({ success: true });
    console.log(req.body);
  } catch (error) {
    console.error("Error saving verification code:", error);
    res.status(500).json({ error: "Failed to save verification code" });
  }
});

// GET endpoint to fetch codes
app.get("/api/codes", async (req, res) => {
  try {
    const { data: codes, error } = await supabase
      .from('verification_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(codes);
  } catch (error) {
    console.error("Error fetching codes:", error);
    res.status(500).json({ error: "Failed to fetch codes" });
  }
});

// Set the port to listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
