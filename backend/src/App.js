// Create a server

const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express();

// enable cors for all origins
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'],
    Credentials: true,
})
);

app.use(express.json());
app.use('/ai', aiRoutes);

app.get("/", (req, res)=>{
    res.send("AI Backend Is Running");
});

module.exports = app;