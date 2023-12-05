// backend/index.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongoDBURL } from "./config/keys.js";
import authRoutes from './routes/routes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/routes', authRoutes); // Add the auth routes

mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("Connected to database");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
