import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
const port = 4000;
app.get("/", (req, res) => {
  res.send("Auth Server is Running...");
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://sagar2004:sagar906794@sagarfirst.nfa023p.mongodb.net/authdb")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

app.use("/auth",authRoutes);

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
});