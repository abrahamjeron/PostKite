const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes')
const postDataRoutes = require('./postDataRoutes')
const authUser = require('./userAuth')
const cors = require('cors');
const { connectDb, checkConnected } = require('./db');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use(express.static('public'))
app.use('/auth',authUser)
app.use('/users', userRoutes);
app.use('/posts',postRoutes);
app.use('/postsData',postDataRoutes)

app.get('/', (req, res) => {
    if (checkConnected()) {
        res.send("MongoDB connected...");
    } else {
        res.send("MongoDB not connected...!");
    }
});

app.get('/test', (req, res) => {
    res.send("Server is running...");
});

const startServer = async () => {
    await connectDb();

    if (checkConnected()) {
        console.log('Database is connected.');
    } else {
        console.log('Failed to connect to the database.');
    }

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();
