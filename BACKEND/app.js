import express from "express";
import mongoose from "mongoose";

const app = express();

mongoose
    .connect(
'mongodb+srv://admin:R7UcZdU9M95OxTVw@cluster0.4ljaknh.mongodb.net/?retryWrites=true&w=majority')
.then(()=>app.listen(5000,() =>
    console.log("Connected To Database and Server Is running")
)
)
.catch((e) => console.log(e));



