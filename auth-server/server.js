import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// --- UPDATED CORS CONFIGURATION ---
// Add your local frontend URL and your deployed frontend URL here

// Replace your current cors block with this exact code:
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://user-authentication-system-psi.vercel.app' // <-- YOUR LIVE VERCEL URL
  ],
  credentials: true 
}));
// ----------------------------------

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth Server is Running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});