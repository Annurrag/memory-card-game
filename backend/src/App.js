// Create a server

const express = require('express');
const aiRoutes = require('./routes/ai.routes');


const app = express();

app.use('/ai', aiRoutes);

module.exports = app;