import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Auth Server is Running...");
});

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.use("/auth",authRoutes);

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
});