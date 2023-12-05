// backend/index.js
import express, { response } from "express";
import { PORT, mongoDBURL } from "./config/config.js";
import mongoose from "mongoose";
import postsRoute from './routes/routes.js';
import cors from 'cors';
import bodyParser from "body-parser";
import bcrypt from "bcryptjs"
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from "./models/user.js"



const app = express();
app.use(express.json())
app.use(cors());
app.use('/', postsRoute);
app.use(passport.initialize());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
