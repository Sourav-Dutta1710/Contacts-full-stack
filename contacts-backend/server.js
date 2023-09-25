import express from "express";
import { config } from 'dotenv';
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
import cors from "cors";

config();
connectDb();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});