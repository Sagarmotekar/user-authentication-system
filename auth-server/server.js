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
const allowedOrigins = [
  'http://localhost:5173', // Default Vite local port
  'http://localhost:3000', // Default React local port
  // 'https://your-frontend.vercel.app' // <-- ADD YOUR DEPLOYED FRONTEND URL HERE LATER
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Important if you ever use cookies/sessions
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