import express from "express";
import mongoose from "mongoose";
import plantsRoute from "./routes/plantsRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({path:'./setup.env'});
const app = express();

app.use(express.json({extended: false}));
app.use(cors());

app.use("/plants", plantsRoute);

const uri = process.env.ATLAS_URI

//useCreateIndex: true,

mongoose.Promise = global.Promise
// mongoose.set('debug', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

mongoose
    .connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
        console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    });
