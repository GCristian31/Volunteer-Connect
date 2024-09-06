const app = require('./app');
const dot = require("dotenv");
const connectDatabase = require("./config/database");
const { createAdmin } = require("./controllers/adminController");

//Config
dot.config({path:"config/config.env"})

//Connecting to database
connectDatabase();

createAdmin();



const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});


