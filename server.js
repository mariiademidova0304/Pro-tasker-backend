require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/connection');
const routes = require('./routes/index');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/', routes);

const port = process.env.PORT || 3000;

db.once('open', () => {
    app.listen(port, () => console.log(`🌍Server is running at http://localhost:${port}`));
});