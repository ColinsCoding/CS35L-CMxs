import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import postsRoute from './routes/routes.js';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors());
app.use('/', postsRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to database")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch(() => {
        console.log(error)
    });