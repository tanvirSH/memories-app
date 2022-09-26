import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

// Post routes
app.use('/posts', postRoutes); // base path is http://localhost:5000/posts

// User routes
app.use('/user', userRoutes); // base path is http://localhost:5000/user

app.get('/', (req, res) => {
    res.send('Hello to Memories API');
});

//const CONNECTION_URL = 'mongodb+srv://javascriptmastery:javascriptmastery123@cluster0.jtn9g.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    })
    .catch((err) => console.log(err.message));

//mongoose.set('useFindAndUpdate', false);
