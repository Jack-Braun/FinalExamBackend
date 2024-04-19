//Jack Braun
//300349282

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

//default page to check if backend is connected and deployed properly
app.get('/', (req, res) => {
    res.send('Backend is operational, use /api/ for the routes');
})

//main route being used
app.use('/api', routes);

const URI = process.env.MONGODB_URI

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

module.exports.app;