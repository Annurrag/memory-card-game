// listen the server or run the server

require('dotenv').config();
const app = require("./src/App");


const PORT  = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

