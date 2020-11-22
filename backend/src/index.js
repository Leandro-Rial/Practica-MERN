const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server working on port: ', PORT)
});


// Middelware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();


// Route
app.use('/posts', require('./routes/posts'));


// MongoDB
const CONNECTING_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vzdjj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(CONNECTING_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

const connected = mongoose.connection;

connected.once('open', () => {
    console.log('Connected to Database')
})