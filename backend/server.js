// listen the server or run the server

require('dotenv').config();
const app = require("./src/App");

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});

app.get("/", (req, res)=>{
    res.send("Welcome to the Memory Card Game Backend!");
});